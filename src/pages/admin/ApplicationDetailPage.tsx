import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Check,
  ExternalLink,
  Maximize2,
  MessageCircle,
  Phone,
  Save,
  X,
} from 'lucide-react';
import {
  fetchApplicationDetails,
  getPrivateFileUrl,
  updateApplicationRecord,
  type ApplicationRecord,
  type ApplicationStatus,
  type AuditLogRecord,
} from '../../services/api';
import {
  calculateAgeFromDob,
  cmToFeetInches,
  formatFullDateTime,
  formatWhatsAppLink,
} from '../../utils/validation';
import { StatusBadge } from '../../components/common/StatusBadge';

const ALL_STATUSES: ApplicationStatus[] = [
  'New',
  'Under Review',
  'Contacted',
  'Approved',
  'Rejected',
];

export function ApplicationDetailPage() {
  const { id } = useParams<{ id: string }>();

  const [application, setApplication] = useState<ApplicationRecord | null>(null);
  const [auditLogs, setAuditLogs] = useState<AuditLogRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [status, setStatus] = useState<ApplicationStatus>('New');
  const [adminNote, setAdminNote] = useState('');
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [zoomedPhoto, setZoomedPhoto] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetchApplicationDetails(id)
      .then((res) => {
        setApplication(res.application);
        setAuditLogs(res.auditLogs);
        setStatus(res.application.status);
        setAdminNote(res.application.admin_note || '');
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : 'Unable to load application details.');
      })
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (!zoomedPhoto) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setZoomedPhoto(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [zoomedPhoto]);

  async function handleSaveChanges(nextStatus?: ApplicationStatus) {
    if (!application) return;
    setSaving(true);
    setSaveMessage('');
    try {
      const res = await updateApplicationRecord({
        id: application.id,
        status: nextStatus ?? status,
        admin_note: adminNote,
      });
      setApplication(res.application);
      setAuditLogs(res.auditLogs);
      setStatus(res.application.status);
      setSaveMessage('Changes saved');
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save changes.');
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-10 w-56 rounded-lg bg-[#161B28] animate-pulse" />
        <div className="h-96 rounded-[14px] bg-[#161B28] animate-pulse" />
      </div>
    );
  }

  if (error || !application) {
    return (
      <div className="space-y-4">
        <Link
          to="/admin/applications"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[#94A3B8] hover:text-[#F8FAFC]"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={1.75} />
          Back to Applications
        </Link>
        <div className="rounded-xl border border-[#EF4444]/40 bg-[#EF4444]/10 p-6 text-sm text-[#FCA5A5]">
          {error || 'Application not found.'}
        </div>
      </div>
    );
  }

  const age = calculateAgeFromDob(application.date_of_birth);
  const heightFt = cmToFeetInches(application.height_cm);
  const photoUrl = getPrivateFileUrl(application.passport_photo_url);
  const signatureUrl = getPrivateFileUrl(application.signature_url);
  const whatsappUrl = formatWhatsAppLink(
    application.contact_number,
    application.full_name,
    application.application_reference
  );

  return (
    <div className="space-y-8">
      {/* Top Breadcrumb & Quick Communication */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1.5">
          <Link
            to="/admin/applications"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#94A3B8] hover:text-[#F8FAFC] transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.75} />
            All Applications
          </Link>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-[#F8FAFC]">
              {application.full_name}
            </h1>
            <StatusBadge status={application.status} />
          </div>
          <p className="font-mono-code text-xs text-[#94A3B8] tabular-nums">
            {application.application_reference} · Submitted{' '}
            {formatFullDateTime(application.submitted_at)}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-[#10B981]/15 border border-[#10B981]/35 px-4 py-2.5 text-xs font-semibold text-[#10B981] hover:bg-[#10B981]/25 transition-colors whitespace-nowrap"
          >
            <MessageCircle className="h-4 w-4" strokeWidth={1.75} />
            WhatsApp Applicant
            <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.75} />
          </a>
          <a
            href={`tel:${application.contact_number}`}
            className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/[0.04] px-4 py-2.5 text-xs font-semibold text-[#F8FAFC] hover:border-white/30 transition-colors whitespace-nowrap"
          >
            <Phone className="h-4 w-4" strokeWidth={1.75} />
            Call Applicant
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left 7 cols: Athlete Profile & Private Media */}
        <div className="lg:col-span-7 space-y-6">
          <section className="rounded-[14px] border border-white/[0.08] bg-[#161B28] p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <button
                type="button"
                onClick={() => setZoomedPhoto(true)}
                className="group relative shrink-0 overflow-hidden rounded-xl border border-white/15 bg-[#0D111A]"
                title="Click to enlarge passport photo"
              >
                <img
                  src={photoUrl}
                  alt={`Passport photo of ${application.full_name}`}
                  className="h-36 w-32 object-cover"
                />
                <span className="absolute bottom-2 right-2 rounded-md bg-black/75 p-1 text-white opacity-80 group-hover:opacity-100">
                  <Maximize2 className="h-3.5 w-3.5" strokeWidth={1.75} />
                </span>
              </button>

              <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2 text-sm">
                <div>
                  <p className="text-xs text-[#64748B]">Date of Birth &amp; Age</p>
                  <p className="mt-1 font-medium text-[#F8FAFC] tabular-nums">
                    {application.date_of_birth} {age !== null ? `(${age} yrs)` : ''}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[#64748B]">Height</p>
                  <p className="mt-1 font-medium text-[#F8FAFC] tabular-nums">
                    {application.height_cm} cm {heightFt ? `(${heightFt})` : ''}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[#64748B]">CNIC / B-Form Number</p>
                  <p className="mt-1 font-mono-code font-medium text-[#F8FAFC] tabular-nums">
                    {application.nic_number}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[#64748B]">Primary Contact</p>
                  <p className="mt-1 font-mono-code font-medium text-[#F8FAFC] tabular-nums">
                    {application.contact_number}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 border-t border-white/[0.08] pt-5 sm:grid-cols-2 text-sm">
              <div>
                <p className="text-xs text-[#64748B]">Preferred Position</p>
                <p className="mt-1 font-semibold text-[#00E5FF]">
                  {application.playing_position}
                </p>
              </div>
              <div>
                <p className="text-xs text-[#64748B]">Experience Level</p>
                <p className="mt-1 font-semibold text-[#F8FAFC]">
                  {application.experience_level}
                </p>
              </div>
              <div>
                <p className="text-xs text-[#64748B]">Emergency Contact</p>
                <p className="mt-1 font-mono-code font-medium text-[#F8FAFC] tabular-nums">
                  {application.emergency_contact_number}
                </p>
              </div>
              <div>
                <p className="text-xs text-[#64748B]">Residential Address</p>
                <p className="mt-1 text-[#CBD5E1]">{application.address}</p>
              </div>
            </div>

            {application.guardian_name && (
              <div className="rounded-xl border border-[#F59E0B]/30 bg-[#F59E0B]/5 p-5 space-y-3">
                <p className="text-xs font-semibold text-[#F59E0B]">
                  Minor Guardian Authorization Verified
                </p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 text-sm">
                  <div>
                    <p className="text-xs text-[#94A3B8]">Guardian Name</p>
                    <p className="mt-0.5 font-semibold text-[#F8FAFC]">
                      {application.guardian_name}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[#94A3B8]">Relationship</p>
                    <p className="mt-0.5 font-medium text-[#F8FAFC]">
                      {application.guardian_relationship}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[#94A3B8]">Guardian Phone</p>
                    <p className="mt-0.5 font-mono-code text-[#F8FAFC] tabular-nums">
                      {application.guardian_contact}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="border-t border-white/[0.08] pt-5 space-y-2">
              <p className="text-xs font-semibold text-[#94A3B8]">
                Applicant Digital Signature
              </p>
              <div className="rounded-xl border border-white/10 bg-[#0A0E17] p-4 flex items-center justify-center">
                <img
                  src={signatureUrl}
                  alt={`Digital signature of ${application.full_name}`}
                  className="max-h-36 w-auto object-contain"
                />
              </div>
            </div>
          </section>
        </div>

        {/* Right 5 cols: Status Control, Notes & Audit Log */}
        <div className="lg:col-span-5 space-y-6">
          <section className="rounded-[14px] border border-white/[0.08] bg-[#161B28] p-6 space-y-5">
            <h2 className="font-display text-lg font-bold text-[#F8FAFC]">
              Evaluation &amp; Status Control
            </h2>

            <div className="space-y-2">
              <label htmlFor="status-select" className="block text-xs font-semibold text-[#94A3B8]">
                Application Status
              </label>
              <select
                id="status-select"
                value={status}
                onChange={(e) => {
                  const next = e.target.value as ApplicationStatus;
                  setStatus(next);
                  handleSaveChanges(next);
                }}
                className="w-full h-11 rounded-lg border border-white/15 bg-[#0D111A] px-3.5 text-sm font-semibold text-[#F8FAFC] focus:outline-none focus:border-[#FF5500]"
              >
                {ALL_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="admin-note" className="block text-xs font-semibold text-[#94A3B8]">
                Private Coach &amp; Admin Notes
              </label>
              <textarea
                id="admin-note"
                rows={4}
                value={adminNote}
                onChange={(e) => setAdminNote(e.target.value)}
                placeholder="Record trial performance notes, batch assignment, or follow-up dates..."
                className="w-full rounded-lg border border-white/12 bg-[#0D111A] p-3.5 text-sm text-[#F8FAFC] placeholder-[#64748B] focus:outline-none focus:border-[#FF5500]"
              />
            </div>

            <div className="flex items-center justify-between gap-4">
              <div className="text-xs font-medium text-[#10B981]">
                {saveMessage && (
                  <span className="inline-flex items-center gap-1.5">
                    <Check className="h-4 w-4" strokeWidth={2} />
                    {saveMessage}
                  </span>
                )}
              </div>
              <button
                type="button"
                disabled={saving}
                onClick={() => handleSaveChanges()}
                className="inline-flex items-center gap-2 rounded-lg bg-[#FF5500] px-5 py-2.5 text-xs font-semibold text-white hover:bg-[#FF6F26] transition-colors disabled:opacity-60"
              >
                <Save className="h-3.5 w-3.5" strokeWidth={1.75} />
                {saving ? 'Saving...' : 'Save Evaluation'}
              </button>
            </div>
          </section>

          <section className="rounded-[14px] border border-white/[0.08] bg-[#161B28] p-6 space-y-4">
            <h2 className="font-display text-lg font-bold text-[#F8FAFC]">Activity History</h2>
            <div className="divide-y divide-white/[0.06]">
              {auditLogs.map((log) => (
                <div key={log.id} className="py-3 first:pt-0 last:pb-0 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold text-[#F8FAFC]">{log.action}</span>
                    <span className="font-mono-code text-[11px] text-[#64748B] tabular-nums">
                      {formatFullDateTime(log.created_at)}
                    </span>
                  </div>
                  {log.note && <p className="text-xs text-[#94A3B8]">{log.note}</p>}
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Photo Zoom Lightbox */}
      {zoomedPhoto && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Enlarged applicant passport photo"
          onClick={() => setZoomedPhoto(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-6 backdrop-blur-sm"
        >
          <div className="relative max-w-lg" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setZoomedPhoto(false)}
              aria-label="Close photo preview"
              className="absolute -top-12 right-0 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 bg-[#161B28] text-white hover:bg-[#1E2538]"
            >
              <X className="h-5 w-5" strokeWidth={1.75} />
            </button>
            <img
              src={photoUrl}
              alt={application.full_name}
              className="max-h-[80vh] w-auto rounded-xl border border-white/15 object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
