import fs from 'node:fs';
import path from 'node:path';
import { getPrivateFileRecord, savePrivateFileRecord } from './db.ts';

const PRIVATE_UPLOADS_ROOT = path.resolve(process.cwd(), '.private_uploads');

if (!fs.existsSync(PRIVATE_UPLOADS_ROOT)) {
  fs.mkdirSync(PRIVATE_UPLOADS_ROOT, { recursive: true });
}

const ALLOWED_PHOTO_MIMES: Record<string, { ext: string; contentType: string }> = {
  'image/jpeg': { ext: 'jpg', contentType: 'image/jpeg' },
  'image/jpg': { ext: 'jpg', contentType: 'image/jpeg' },
  'image/png': { ext: 'png', contentType: 'image/png' },
  'image/webp': { ext: 'webp', contentType: 'image/webp' },
};

const MAX_PHOTO_BYTES = 3 * 1024 * 1024; // 3 MB
const MAX_SIGNATURE_BYTES = 1 * 1024 * 1024; // 1 MB

interface ParsedDataUrl {
  mime: string;
  buffer: Buffer;
}

function parseDataUrl(dataUrl: string): ParsedDataUrl | null {
  const match = /^data:(image\/[a-zA-Z0-9+.-]+);base64,([A-Za-z0-9+/=]+)$/.exec(
    dataUrl.trim()
  );
  if (!match) return null;
  const mime = match[1].toLowerCase();
  const buffer = Buffer.from(match[2], 'base64');
  return { mime, buffer };
}

export async function saveApplicantPhoto(
  applicationId: string,
  dataUrl: string
): Promise<string> {
  const parsed = parseDataUrl(dataUrl);
  if (!parsed) {
    throw new Error('Invalid passport photo format. Please upload a JPG, PNG, or WebP image.');
  }

  const meta = ALLOWED_PHOTO_MIMES[parsed.mime];
  if (!meta) {
    throw new Error('Unsupported photo file type. Allowed formats: JPEG, PNG, WebP.');
  }

  if (parsed.buffer.byteLength === 0 || parsed.buffer.byteLength > MAX_PHOTO_BYTES) {
    throw new Error('Passport photo must be smaller than 3 MB.');
  }

  const relativePath = `applications/${applicationId}/photo.${meta.ext}`;
  const dir = path.join(PRIVATE_UPLOADS_ROOT, 'applications', applicationId);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(PRIVATE_UPLOADS_ROOT, relativePath), parsed.buffer);

  await savePrivateFileRecord(relativePath, meta.contentType, parsed.buffer);
  return relativePath;
}

export async function saveApplicantSignature(
  applicationId: string,
  dataUrl: string
): Promise<string> {
  const parsed = parseDataUrl(dataUrl);
  if (!parsed || parsed.mime !== 'image/png') {
    throw new Error('Invalid signature format. Digital signature must be rendered as PNG.');
  }

  if (parsed.buffer.byteLength === 0 || parsed.buffer.byteLength > MAX_SIGNATURE_BYTES) {
    throw new Error('Digital signature exceeds the 1 MB limit.');
  }

  const relativePath = `applications/${applicationId}/signature.png`;
  const dir = path.join(PRIVATE_UPLOADS_ROOT, 'applications', applicationId);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(PRIVATE_UPLOADS_ROOT, relativePath), parsed.buffer);

  await savePrivateFileRecord(relativePath, 'image/png', parsed.buffer);
  return relativePath;
}

export async function resolvePrivateFile(
  relativePath: string
): Promise<{ contentType: string; data: Buffer } | null> {
  if (!relativePath || relativePath.includes('..')) return null;

  const fullPath = path.resolve(PRIVATE_UPLOADS_ROOT, relativePath);
  if (!fullPath.startsWith(PRIVATE_UPLOADS_ROOT + path.sep)) {
    return null;
  }

  if (fs.existsSync(fullPath)) {
    const ext = path.extname(fullPath).toLowerCase();
    const contentType =
      ext === '.jpg' || ext === '.jpeg'
        ? 'image/jpeg'
        : ext === '.webp'
        ? 'image/webp'
        : 'image/png';
    return { contentType, data: fs.readFileSync(fullPath) };
  }

  return getPrivateFileRecord(relativePath);
}
