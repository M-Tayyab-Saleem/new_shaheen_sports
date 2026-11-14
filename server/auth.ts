import crypto from 'node:crypto';
import bcrypt from 'bcryptjs';
import { parseCookie, stringifySetCookie } from 'cookie';
import type { Request, Response, NextFunction } from 'express';

const COOKIE_NAME = 'nss_admin_session';
const SESSION_TTL_SECONDS = 8 * 60 * 60; // 8 hours
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_FAILED_ATTEMPTS = 5;

// Ephemeral fallback secret if SESSION_SECRET is not provided in environment
const FALLBACK_SESSION_SECRET = crypto.randomBytes(32).toString('hex');
// Ephemeral fallback hash for local preview when ADMIN_PASSWORD_HASH is unset ("Shaheen@2026")
const FALLBACK_PASSWORD_HASH = bcrypt.hashSync('Shaheen@2026', 10);

interface RateLimitEntry {
  attempts: number;
  resetAt: number;
}

const failedLoginMap = new Map<string, RateLimitEntry>();

function getSessionSecret(): string {
  return process.env.SESSION_SECRET && process.env.SESSION_SECRET.length >= 16
    ? process.env.SESSION_SECRET
    : FALLBACK_SESSION_SECRET;
}

export function getAdminUsername(): string {
  return process.env.ADMIN_USERNAME || 'kausar_tirmizi';
}

export function verifyAdminPassword(password: string): boolean {
  const configuredHash = process.env.ADMIN_PASSWORD_HASH;
  if (configuredHash && configuredHash.startsWith('$2')) {
    return bcrypt.compareSync(password, configuredHash);
  }
  return bcrypt.compareSync(password, FALLBACK_PASSWORD_HASH);
}

export function checkLoginRateLimit(ip: string): { allowed: boolean; retryAfterSeconds?: number } {
  const now = Date.now();
  const entry = failedLoginMap.get(ip);
  if (!entry) return { allowed: true };

  if (now > entry.resetAt) {
    failedLoginMap.delete(ip);
    return { allowed: true };
  }

  if (entry.attempts >= MAX_FAILED_ATTEMPTS) {
    return {
      allowed: false,
      retryAfterSeconds: Math.ceil((entry.resetAt - now) / 1000),
    };
  }

  return { allowed: true };
}

export function recordFailedLogin(ip: string): void {
  const now = Date.now();
  const entry = failedLoginMap.get(ip);
  if (!entry || now > entry.resetAt) {
    failedLoginMap.set(ip, {
      attempts: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
  } else {
    entry.attempts += 1;
  }
}

export function clearFailedLogins(ip: string): void {
  failedLoginMap.delete(ip);
}

interface SessionPayload {
  sub: string;
  role: 'admin';
  exp: number;
}

export function signSessionToken(username: string): string {
  const payload: SessionPayload = {
    sub: username,
    role: 'admin',
    exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS,
  };
  const encodedPayload = Buffer.from(JSON.stringify(payload), 'utf8').toString('base64url');
  const signature = crypto
    .createHmac('sha256', getSessionSecret())
    .update(encodedPayload)
    .digest('base64url');

  return `${encodedPayload}.${signature}`;
}

export function verifySessionToken(token: string): SessionPayload | null {
  if (!token || !token.includes('.')) return null;
  const parts = token.split('.');
  if (parts.length !== 2) return null;

  const [encodedPayload, signature] = parts;
  const expectedSig = crypto
    .createHmac('sha256', getSessionSecret())
    .update(encodedPayload)
    .digest('base64url');

  const sigBuf = Buffer.from(signature);
  const expectedBuf = Buffer.from(expectedSig);
  if (sigBuf.length !== expectedBuf.length) return null;
  if (!crypto.timingSafeEqual(sigBuf, expectedBuf)) return null;

  try {
    const decoded = JSON.parse(
      Buffer.from(encodedPayload, 'base64url').toString('utf8')
    ) as SessionPayload;

    if (decoded.role !== 'admin' || !decoded.exp || decoded.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }
    return decoded;
  } catch {
    return null;
  }
}

export function setSessionCookie(req: Request, res: Response, token: string): void {
  const isHttps =
    req.secure ||
    req.headers['x-forwarded-proto'] === 'https' ||
    process.env.NODE_ENV === 'production';

  res.setHeader(
    'Set-Cookie',
    stringifySetCookie({
      name: COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: isHttps,
      sameSite: 'lax',
      path: '/',
      maxAge: SESSION_TTL_SECONDS,
    })
  );
}

export function clearSessionCookie(req: Request, res: Response): void {
  const isHttps =
    req.secure ||
    req.headers['x-forwarded-proto'] === 'https' ||
    process.env.NODE_ENV === 'production';

  res.setHeader(
    'Set-Cookie',
    stringifySetCookie({
      name: COOKIE_NAME,
      value: '',
      httpOnly: true,
      secure: isHttps,
      sameSite: 'lax',
      path: '/',
      maxAge: 0,
    })
  );
}

export function getAuthenticatedAdmin(req: Request): SessionPayload | null {
  const rawCookie = req.headers.cookie;
  if (!rawCookie) return null;
  const parsed = parseCookie(rawCookie);
  const token = parsed[COOKIE_NAME];
  if (!token) return null;
  return verifySessionToken(token);
}

export function requireAdmin(req: Request, res: Response, next: NextFunction): void {
  const session = getAuthenticatedAdmin(req);
  if (!session) {
    res.status(401).json({ error: 'Unauthorized. Administrative login required.' });
    return;
  }
  next();
}
