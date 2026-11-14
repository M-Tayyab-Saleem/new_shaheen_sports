import { Pool, type PoolConfig } from 'pg';
import crypto from 'node:crypto';

export type ApplicationStatus =
  | 'New'
  | 'Under Review'
  | 'Contacted'
  | 'Approved'
  | 'Rejected';

export type ExperienceLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export interface ApplicationRecord {
  id: string;
  application_reference: string;
  full_name: string;
  date_of_birth: string;
  height_cm: number;
  nic_number: string;
  contact_number: string;
  address: string;
  playing_position: string;
  experience_level: ExperienceLevel;
  emergency_contact_number: string;
  passport_photo_url: string;
  signature_url: string;
  guardian_name: string | null;
  guardian_relationship: string | null;
  guardian_contact: string | null;
  guardian_consent: number | boolean;
  status: ApplicationStatus;
  admin_note: string | null;
  submitted_at: string;
  updated_at: string;
}

export interface AuditLogRecord {
  id: string;
  application_id: string;
  action: string;
  previous_status: string | null;
  new_status: string | null;
  note: string | null;
  actor: string;
  created_at: string;
}

export interface StatusCounts {
  total: number;
  new: number;
  underReview: number;
  contacted: number;
  approved: number;
  rejected: number;
}

function createPool(connectionString: string): Pool {
  const config: PoolConfig = {
    connectionString,
    ssl: { rejectUnauthorized: false },
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 15000,
  };
  return new Pool(config);
}

const directUrl = process.env.DATABASE_URL || '';
const pooledUrl = process.env.DATABASE_URL_POOLED || directUrl;

if (!pooledUrl) {
  throw new Error('DATABASE_URL or DATABASE_URL_POOLED must be configured in .env');
}

// Per Neon best practices: use pooled connection for app queries, direct for DDL migrations
const appPool = createPool(pooledUrl);

let initialized = false;

export async function initDatabase(): Promise<void> {
  if (initialized) return;

  const migrationPool = directUrl ? createPool(directUrl) : appPool;
  try {
    await migrationPool.query(`
      CREATE TABLE IF NOT EXISTS applications (
        id UUID PRIMARY KEY,
        application_reference VARCHAR(32) NOT NULL UNIQUE,
        full_name VARCHAR(255) NOT NULL,
        date_of_birth DATE NOT NULL,
        height_cm NUMERIC(5,1) NOT NULL,
        nic_number VARCHAR(64) NOT NULL,
        contact_number VARCHAR(32) NOT NULL,
        address TEXT NOT NULL,
        playing_position VARCHAR(64) NOT NULL,
        experience_level VARCHAR(32) NOT NULL CHECK (experience_level IN ('Beginner', 'Intermediate', 'Advanced')),
        emergency_contact_number VARCHAR(32) NOT NULL,
        passport_photo_url TEXT NOT NULL,
        signature_url TEXT NOT NULL,
        guardian_name VARCHAR(255),
        guardian_relationship VARCHAR(64),
        guardian_contact VARCHAR(32),
        guardian_consent BOOLEAN NOT NULL DEFAULT FALSE,
        status VARCHAR(32) NOT NULL DEFAULT 'New' CHECK (status IN ('New', 'Under Review', 'Contacted', 'Approved', 'Rejected')),
        admin_note TEXT,
        submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );

      CREATE INDEX IF NOT EXISTS idx_applications_ref ON applications(application_reference);
      CREATE INDEX IF NOT EXISTS idx_applications_status ON applications(status);
      CREATE INDEX IF NOT EXISTS idx_applications_submitted ON applications(submitted_at DESC);

      CREATE TABLE IF NOT EXISTS application_audit_logs (
        id UUID PRIMARY KEY,
        application_id UUID NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
        action VARCHAR(64) NOT NULL,
        previous_status VARCHAR(32),
        new_status VARCHAR(32),
        note TEXT,
        actor VARCHAR(64) NOT NULL DEFAULT 'admin',
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );

      CREATE INDEX IF NOT EXISTS idx_audit_logs_app_id ON application_audit_logs(application_id, created_at DESC);

      CREATE TABLE IF NOT EXISTS reference_sequences (
        year INTEGER PRIMARY KEY,
        last_seq INTEGER NOT NULL DEFAULT 100
      );

      CREATE TABLE IF NOT EXISTS applicant_files (
        path TEXT PRIMARY KEY,
        content_type VARCHAR(64) NOT NULL,
        data BYTEA NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);
    initialized = true;
  } finally {
    if (migrationPool !== appPool) {
      await migrationPool.end();
    }
  }
}

export async function pingDatabase(): Promise<boolean> {
  const result = await appPool.query('SELECT 1 AS ok');
  return result.rows[0]?.ok === 1;
}

function normalizeApplicationRow(row: Record<string, unknown>): ApplicationRecord {
  const dob = row.date_of_birth instanceof Date
    ? row.date_of_birth.toISOString().slice(0, 10)
    : String(row.date_of_birth);
  const submittedAt = row.submitted_at instanceof Date
    ? row.submitted_at.toISOString()
    : String(row.submitted_at);
  const updatedAt = row.updated_at instanceof Date
    ? row.updated_at.toISOString()
    : String(row.updated_at);

  return {
    id: String(row.id),
    application_reference: String(row.application_reference),
    full_name: String(row.full_name),
    date_of_birth: dob,
    height_cm: Number(row.height_cm),
    nic_number: String(row.nic_number),
    contact_number: String(row.contact_number),
    address: String(row.address),
    playing_position: String(row.playing_position),
    experience_level: row.experience_level as ExperienceLevel,
    emergency_contact_number: String(row.emergency_contact_number),
    passport_photo_url: String(row.passport_photo_url),
    signature_url: String(row.signature_url),
    guardian_name: row.guardian_name ? String(row.guardian_name) : null,
    guardian_relationship: row.guardian_relationship ? String(row.guardian_relationship) : null,
    guardian_contact: row.guardian_contact ? String(row.guardian_contact) : null,
    guardian_consent: row.guardian_consent ? 1 : 0,
    status: row.status as ApplicationStatus,
    admin_note: row.admin_note ? String(row.admin_note) : null,
    submitted_at: submittedAt,
    updated_at: updatedAt,
  };
}

export async function generateNextReference(): Promise<string> {
  const year = new Date().getUTCFullYear();
  const res = await appPool.query<{ last_seq: number }>(
    `
    INSERT INTO reference_sequences (year, last_seq)
    VALUES ($1, 101)
    ON CONFLICT (year) DO UPDATE
      SET last_seq = reference_sequences.last_seq + 1
    RETURNING last_seq
    `,
    [year]
  );
  const seq = res.rows[0].last_seq;
  return `NSS-${year}-${String(seq).padStart(6, '0')}`;
}

export interface CreateApplicationInput {
  id: string;
  application_reference: string;
  full_name: string;
  date_of_birth: string;
  height_cm: number;
  nic_number: string;
  contact_number: string;
  address: string;
  playing_position: string;
  experience_level: ExperienceLevel;
  emergency_contact_number: string;
  passport_photo_url: string;
  signature_url: string;
  guardian_name: string | null;
  guardian_relationship: string | null;
  guardian_contact: string | null;
  guardian_consent: boolean;
}

export async function insertApplication(
  input: CreateApplicationInput
): Promise<ApplicationRecord> {
  const client = await appPool.connect();
  try {
    await client.query('BEGIN');

    const inserted = await client.query(
      `
      INSERT INTO applications (
        id, application_reference, full_name, date_of_birth, height_cm,
        nic_number, contact_number, address, playing_position, experience_level,
        emergency_contact_number, passport_photo_url, signature_url,
        guardian_name, guardian_relationship, guardian_contact, guardian_consent,
        status, admin_note
      ) VALUES (
        $1, $2, $3, $4, $5,
        $6, $7, $8, $9, $10,
        $11, $12, $13,
        $14, $15, $16, $17,
        'New', NULL
      )
      RETURNING id, application_reference, full_name, date_of_birth, height_cm,
        nic_number, contact_number, address, playing_position, experience_level,
        emergency_contact_number, passport_photo_url, signature_url,
        guardian_name, guardian_relationship, guardian_contact, guardian_consent,
        status, admin_note, submitted_at, updated_at
      `,
      [
        input.id,
        input.application_reference,
        input.full_name,
        input.date_of_birth,
        input.height_cm,
        input.nic_number,
        input.contact_number,
        input.address,
        input.playing_position,
        input.experience_level,
        input.emergency_contact_number,
        input.passport_photo_url,
        input.signature_url,
        input.guardian_name,
        input.guardian_relationship,
        input.guardian_contact,
        input.guardian_consent,
      ]
    );

    await client.query(
      `
      INSERT INTO application_audit_logs (
        id, application_id, action, previous_status, new_status, note, actor
      ) VALUES ($1, $2, $3, NULL, 'New', $4, 'applicant')
      `,
      [
        crypto.randomUUID(),
        input.id,
        'Application Submitted',
        'Initial digital membership submission received.',
      ]
    );

    await client.query('COMMIT');
    return normalizeApplicationRow(inserted.rows[0]);
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}

export async function getApplicationById(id: string): Promise<ApplicationRecord | undefined> {
  const res = await appPool.query(
    `
    SELECT id, application_reference, full_name, date_of_birth, height_cm,
      nic_number, contact_number, address, playing_position, experience_level,
      emergency_contact_number, passport_photo_url, signature_url,
      guardian_name, guardian_relationship, guardian_contact, guardian_consent,
      status, admin_note, submitted_at, updated_at
    FROM applications
    WHERE id = $1
    `,
    [id]
  );
  if (res.rows.length === 0) return undefined;
  return normalizeApplicationRow(res.rows[0]);
}

export async function getAuditLogsByApplicationId(
  applicationId: string
): Promise<AuditLogRecord[]> {
  const res = await appPool.query(
    `
    SELECT id, application_id, action, previous_status, new_status, note, actor, created_at
    FROM application_audit_logs
    WHERE application_id = $1
    ORDER BY created_at DESC
    `,
    [applicationId]
  );
  return res.rows.map((row) => ({
    id: String(row.id),
    application_id: String(row.application_id),
    action: String(row.action),
    previous_status: row.previous_status ? String(row.previous_status) : null,
    new_status: row.new_status ? String(row.new_status) : null,
    note: row.note ? String(row.note) : null,
    actor: String(row.actor),
    created_at:
      row.created_at instanceof Date ? row.created_at.toISOString() : String(row.created_at),
  }));
}

export interface ListApplicationsParams {
  status?: string;
  search?: string;
  page?: number;
  limit?: number;
  sort?: 'newest' | 'oldest' | 'name';
}

export async function getStatusCounts(): Promise<StatusCounts> {
  const res = await appPool.query<{ status: ApplicationStatus; count: string }>(
    'SELECT status, COUNT(*)::text AS count FROM applications GROUP BY status'
  );

  const counts: StatusCounts = {
    total: 0,
    new: 0,
    underReview: 0,
    contacted: 0,
    approved: 0,
    rejected: 0,
  };

  for (const row of res.rows) {
    const num = Number(row.count) || 0;
    counts.total += num;
    if (row.status === 'New') counts.new = num;
    else if (row.status === 'Under Review') counts.underReview = num;
    else if (row.status === 'Contacted') counts.contacted = num;
    else if (row.status === 'Approved') counts.approved = num;
    else if (row.status === 'Rejected') counts.rejected = num;
  }

  return counts;
}

export async function listApplications(params: ListApplicationsParams) {
  const page = Math.max(1, params.page || 1);
  const limit = Math.min(50, Math.max(1, params.limit || 15));
  const offset = (page - 1) * limit;

  const conditions: string[] = [];
  const values: unknown[] = [];

  if (params.status && params.status !== 'All') {
    values.push(params.status);
    conditions.push(`status = $${values.length}`);
  }

  if (params.search && params.search.trim().length > 0) {
    values.push(`%${params.search.trim()}%`);
    const idx = values.length;
    conditions.push(
      `(full_name ILIKE $${idx} OR application_reference ILIKE $${idx} OR contact_number ILIKE $${idx} OR nic_number ILIKE $${idx})`
    );
  }

  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
  const orderBy =
    params.sort === 'oldest'
      ? 'submitted_at ASC'
      : params.sort === 'name'
      ? 'full_name ASC'
      : 'submitted_at DESC';

  const countRes = await appPool.query<{ count: string }>(
    `SELECT COUNT(*)::text AS count FROM applications ${whereClause}`,
    values
  );
  const total = Number(countRes.rows[0]?.count || 0);

  const limitIdx = values.length + 1;
  const offsetIdx = values.length + 2;

  const itemsRes = await appPool.query(
    `
    SELECT id, application_reference, full_name, date_of_birth, height_cm,
      nic_number, contact_number, address, playing_position, experience_level,
      emergency_contact_number, passport_photo_url, signature_url,
      guardian_name, guardian_relationship, guardian_contact, guardian_consent,
      status, admin_note, submitted_at, updated_at
    FROM applications
    ${whereClause}
    ORDER BY ${orderBy}
    LIMIT $${limitIdx} OFFSET $${offsetIdx}
    `,
    [...values, limit, offset]
  );

  const counts = await getStatusCounts();

  return {
    items: itemsRes.rows.map(normalizeApplicationRow),
    total,
    page,
    limit,
    totalPages: Math.max(1, Math.ceil(total / limit)),
    counts,
  };
}

export async function updateApplication(
  id: string,
  updates: { status?: ApplicationStatus; admin_note?: string | null }
): Promise<ApplicationRecord | undefined> {
  const existing = await getApplicationById(id);
  if (!existing) return undefined;

  const nextStatus = updates.status ?? existing.status;
  const nextNote =
    updates.admin_note !== undefined ? updates.admin_note : existing.admin_note;

  const client = await appPool.connect();
  try {
    await client.query('BEGIN');

    const updatedRes = await client.query(
      `
      UPDATE applications
      SET status = $1, admin_note = $2, updated_at = NOW()
      WHERE id = $3
      RETURNING id, application_reference, full_name, date_of_birth, height_cm,
        nic_number, contact_number, address, playing_position, experience_level,
        emergency_contact_number, passport_photo_url, signature_url,
        guardian_name, guardian_relationship, guardian_contact, guardian_consent,
        status, admin_note, submitted_at, updated_at
      `,
      [nextStatus, nextNote, id]
    );

    const statusChanged = nextStatus !== existing.status;
    const noteChanged =
      updates.admin_note !== undefined && updates.admin_note !== existing.admin_note;

    if (statusChanged || noteChanged) {
      const action = statusChanged
        ? `Status Updated to ${nextStatus}`
        : 'Admin Notes Updated';
      await client.query(
        `
        INSERT INTO application_audit_logs (
          id, application_id, action, previous_status, new_status, note, actor
        ) VALUES ($1, $2, $3, $4, $5, $6, 'admin')
        `,
        [
          crypto.randomUUID(),
          id,
          action,
          existing.status,
          nextStatus,
          noteChanged ? nextNote : null,
        ]
      );
    }

    await client.query('COMMIT');
    return normalizeApplicationRow(updatedRes.rows[0]);
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}

export async function savePrivateFileRecord(
  relativePath: string,
  contentType: string,
  buffer: Buffer
): Promise<void> {
  await appPool.query(
    `
    INSERT INTO applicant_files (path, content_type, data)
    VALUES ($1, $2, $3)
    ON CONFLICT (path) DO UPDATE
      SET content_type = EXCLUDED.content_type, data = EXCLUDED.data
    `,
    [relativePath, contentType, buffer]
  );
}

export async function getPrivateFileRecord(
  relativePath: string
): Promise<{ contentType: string; data: Buffer } | null> {
  const res = await appPool.query<{ content_type: string; data: Buffer }>(
    'SELECT content_type, data FROM applicant_files WHERE path = $1',
    [relativePath]
  );
  if (res.rows.length === 0) return null;
  return {
    contentType: res.rows[0].content_type,
    data: res.rows[0].data,
  };
}
