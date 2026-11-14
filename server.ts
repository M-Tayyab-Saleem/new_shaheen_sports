import 'dotenv/config';
import express from 'express';
import crypto from 'node:crypto';
import path from 'node:path';
import { createServer as createViteServer } from 'vite';
import {
  checkLoginRateLimit,
  clearFailedLogins,
  clearSessionCookie,
  getAdminUsername,
  getAuthenticatedAdmin,
  recordFailedLogin,
  requireAdmin,
  setSessionCookie,
  signSessionToken,
  verifyAdminPassword,
} from './server/auth.ts';
import {
  generateNextReference,
  getApplicationById,
  getAuditLogsByApplicationId,
  initDatabase,
  insertApplication,
  listApplications,
  pingDatabase,
  updateApplication,
  type ApplicationStatus,
} from './server/db.ts';
import {
  resolvePrivateFile,
  saveApplicantPhoto,
  saveApplicantSignature,
} from './server/storage.ts';
import {
  APPLICATION_STATUSES,
  validateSubmissionPayload,
} from './server/validation.ts';

async function startServer() {
  await initDatabase();

  const app = express();
  const PORT = 3000;

  app.set('trust proxy', 1);
  app.use(express.json({ limit: '10mb' }));

  // --- Healthcheck ---
  app.get('/api/health', async (_req, res) => {
    try {
      const ok = await pingDatabase();
      res.json({ ok, database: 'neon-postgres' });
    } catch (err) {
      res.status(500).json({
        ok: false,
        error: err instanceof Error ? err.message : 'Database connection error',
      });
    }
  });

  // --- Auth Endpoints ---
  app.post('/api/auth/login', (req, res) => {
    const clientIp = req.ip || req.socket.remoteAddress || 'unknown';
    const limitCheck = checkLoginRateLimit(clientIp);
    if (!limitCheck.allowed) {
      res.status(429).json({
        error: `Too many failed login attempts. Try again in ${Math.ceil(
          (limitCheck.retryAfterSeconds || 60) / 60
        )} minutes.`,
      });
      return;
    }

    const username = typeof req.body?.username === 'string' ? req.body.username.trim() : '';
    const password = typeof req.body?.password === 'string' ? req.body.password : '';

    if (username !== getAdminUsername() || !verifyAdminPassword(password)) {
      recordFailedLogin(clientIp);
      res.status(401).json({ error: 'Invalid administrator credentials.' });
      return;
    }

    clearFailedLogins(clientIp);
    const token = signSessionToken(username);
    setSessionCookie(req, res, token);
    res.json({ authenticated: true, username });
  });

  app.post('/api/auth/logout', (req, res) => {
    clearSessionCookie(req, res);
    res.json({ success: true });
  });

  app.get('/api/auth/session', (req, res) => {
    const session = getAuthenticatedAdmin(req);
    if (!session) {
      res.status(401).json({ authenticated: false });
      return;
    }
    res.json({ authenticated: true, username: session.sub });
  });

  // --- Public Application Submission ---
  app.post('/api/applications/submit', async (req, res) => {
    try {
      const validation = validateSubmissionPayload(req.body || {});
      if (!validation.valid || !validation.data) {
        res.status(400).json({
          error: 'Please review the highlighted fields and try again.',
          fieldErrors: validation.errors,
        });
        return;
      }

      const data = validation.data;
      const applicationId = crypto.randomUUID();
      const photoPath = await saveApplicantPhoto(applicationId, data.passportPhotoDataUrl);
      const signaturePath = await saveApplicantSignature(applicationId, data.signatureDataUrl);
      const reference = await generateNextReference();

      const record = await insertApplication({
        id: applicationId,
        application_reference: reference,
        full_name: data.fullName,
        date_of_birth: data.dateOfBirth,
        height_cm: data.heightCm,
        nic_number: data.nicNumber,
        contact_number: data.contactNumber,
        address: data.address,
        playing_position: data.playingPosition,
        experience_level: data.experienceLevel,
        emergency_contact_number: data.emergencyContactNumber,
        passport_photo_url: photoPath,
        signature_url: signaturePath,
        guardian_name: data.guardianName ?? null,
        guardian_relationship: data.guardianRelationship ?? null,
        guardian_contact: data.guardianContact ?? null,
        guardian_consent: Boolean(data.guardianConsent),
      });

      res.status(201).json({
        success: true,
        reference: record.application_reference,
        submittedAt: record.submitted_at,
        applicantName: record.full_name,
      });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Unable to submit application at this time.';
      res.status(400).json({ error: message });
    }
  });

  // --- Protected Admin Endpoints ---
  app.get('/api/applications/list', requireAdmin, async (req, res) => {
    try {
      const status = typeof req.query.status === 'string' ? req.query.status : 'All';
      const search = typeof req.query.search === 'string' ? req.query.search : '';
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 15;
      const sortParam = req.query.sort;
      const sort =
        sortParam === 'oldest' || sortParam === 'name' ? sortParam : 'newest';

      const result = await listApplications({ status, search, page, limit, sort });
      res.json(result);
    } catch (err) {
      res.status(500).json({
        error: err instanceof Error ? err.message : 'Failed to fetch applications.',
      });
    }
  });

  app.get('/api/applications/details', requireAdmin, async (req, res) => {
    try {
      const id = typeof req.query.id === 'string' ? req.query.id : '';
      if (!id) {
        res.status(400).json({ error: 'Application ID is required.' });
        return;
      }

      const record = await getApplicationById(id);
      if (!record) {
        res.status(404).json({ error: 'Application record not found.' });
        return;
      }

      const auditLogs = await getAuditLogsByApplicationId(id);
      res.json({ application: record, auditLogs });
    } catch (err) {
      res.status(500).json({
        error: err instanceof Error ? err.message : 'Failed to load application details.',
      });
    }
  });

  app.post('/api/applications/update', requireAdmin, async (req, res) => {
    try {
      const id = typeof req.body?.id === 'string' ? req.body.id : '';
      if (!id) {
        res.status(400).json({ error: 'Application ID is required.' });
        return;
      }

      const updates: { status?: ApplicationStatus; admin_note?: string | null } = {};

      if (req.body?.status !== undefined) {
        const status = String(req.body.status);
        if (!APPLICATION_STATUSES.includes(status as ApplicationStatus)) {
          res.status(400).json({ error: 'Invalid status value.' });
          return;
        }
        updates.status = status as ApplicationStatus;
      }

      if (req.body?.admin_note !== undefined) {
        updates.admin_note =
          req.body.admin_note === null ? null : String(req.body.admin_note);
      }

      const updated = await updateApplication(id, updates);
      if (!updated) {
        res.status(404).json({ error: 'Application record not found.' });
        return;
      }

      const auditLogs = await getAuditLogsByApplicationId(id);
      res.json({ application: updated, auditLogs });
    } catch (err) {
      res.status(500).json({
        error: err instanceof Error ? err.message : 'Failed to update application.',
      });
    }
  });

  // --- Protected Private File Retrieval ---
  app.get('/api/files/get', requireAdmin, async (req, res) => {
    try {
      const filePath = typeof req.query.path === 'string' ? req.query.path : '';
      const resolved = await resolvePrivateFile(filePath);
      if (!resolved) {
        res.status(404).json({ error: 'File not found.' });
        return;
      }

      res.setHeader('Content-Type', resolved.contentType);
      res.setHeader('Cache-Control', 'private, no-store');
      res.send(resolved.data);
    } catch (err) {
      res.status(500).json({
        error: err instanceof Error ? err.message : 'Failed to load file.',
      });
    }
  });

  // --- Vite Middleware (Dev) or Static Assets (Prod) ---
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`New Shaheen Sports server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
