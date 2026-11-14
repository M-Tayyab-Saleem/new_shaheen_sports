-- New Shaheen Sports Volleyball Academy — PostgreSQL Schema (Neon Lakebase Postgres)

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
