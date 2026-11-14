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
  guardian_consent: number;
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

export interface ApplicationsListResponse {
  items: ApplicationRecord[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  counts: StatusCounts;
}

export interface SubmitApplicationRequest {
  fullName: string;
  dateOfBirth: string;
  heightCm: number;
  nicNumber: string;
  contactNumber: string;
  address: string;
  playingPosition: string;
  experienceLevel: ExperienceLevel;
  emergencyContactNumber: string;
  passportPhotoDataUrl: string;
  signatureDataUrl: string;
  guardianName?: string;
  guardianRelationship?: string;
  guardianContact?: string;
  guardianConsent?: boolean;
  declarationAccepted: boolean;
}

export interface SubmitApplicationResponse {
  success: boolean;
  reference: string;
  submittedAt: string;
  applicantName: string;
}

async function parseJsonResponse<T>(res: Response): Promise<T> {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const error = new Error(
      typeof data?.error === 'string' ? data.error : `Request failed (${res.status})`
    ) as Error & { fieldErrors?: Record<string, string>; status?: number };
    error.fieldErrors = data?.fieldErrors;
    error.status = res.status;
    throw error;
  }
  return data as T;
}

export async function submitApplication(
  payload: SubmitApplicationRequest
): Promise<SubmitApplicationResponse> {
  const res = await fetch('/api/applications/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return parseJsonResponse<SubmitApplicationResponse>(res);
}

export async function loginAdmin(username: string, password: string) {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ username, password }),
  });
  return parseJsonResponse<{ authenticated: boolean; username: string }>(res);
}

export async function logoutAdmin() {
  const res = await fetch('/api/auth/logout', {
    method: 'POST',
    credentials: 'include',
  });
  return parseJsonResponse<{ success: boolean }>(res);
}

export async function checkAdminSession(): Promise<{
  authenticated: boolean;
  username?: string;
}> {
  const res = await fetch('/api/auth/session', {
    method: 'GET',
    credentials: 'include',
  });
  if (!res.ok) {
    return { authenticated: false };
  }
  return res.json();
}

export async function fetchApplicationsList(params: {
  status?: string;
  search?: string;
  page?: number;
  limit?: number;
  sort?: 'newest' | 'oldest' | 'name';
}): Promise<ApplicationsListResponse> {
  const qs = new URLSearchParams();
  if (params.status) qs.set('status', params.status);
  if (params.search) qs.set('search', params.search);
  if (params.page) qs.set('page', String(params.page));
  if (params.limit) qs.set('limit', String(params.limit));
  if (params.sort) qs.set('sort', params.sort);

  const res = await fetch(`/api/applications/list?${qs.toString()}`, {
    credentials: 'include',
  });
  return parseJsonResponse<ApplicationsListResponse>(res);
}

export async function fetchApplicationDetails(id: string): Promise<{
  application: ApplicationRecord;
  auditLogs: AuditLogRecord[];
}> {
  const res = await fetch(`/api/applications/details?id=${encodeURIComponent(id)}`, {
    credentials: 'include',
  });
  return parseJsonResponse<{
    application: ApplicationRecord;
    auditLogs: AuditLogRecord[];
  }>(res);
}

export async function updateApplicationRecord(payload: {
  id: string;
  status?: ApplicationStatus;
  admin_note?: string | null;
}): Promise<{
  application: ApplicationRecord;
  auditLogs: AuditLogRecord[];
}> {
  const res = await fetch('/api/applications/update', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(payload),
  });
  return parseJsonResponse<{
    application: ApplicationRecord;
    auditLogs: AuditLogRecord[];
  }>(res);
}

export function getPrivateFileUrl(relativePath: string): string {
  return `/api/files/get?path=${encodeURIComponent(relativePath)}`;
}
