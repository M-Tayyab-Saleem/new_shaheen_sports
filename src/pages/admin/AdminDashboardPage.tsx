import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Inbox } from 'lucide-react';
import {
  fetchApplicationsList,
  getPrivateFileUrl,
  type ApplicationRecord,
  type StatusCounts,
} from '../../services/api';
import { formatDateTime } from '../../utils/validation';
import { StatusBadge } from '../../components/common/StatusBadge';

export function AdminDashboardPage() {
  const [counts, setCounts] = useState<StatusCounts>({
    total: 0,
    new: 0,
    underReview: 0,
    contacted: 0,
    approved: 0,
    rejected: 0,
  });
  const [recent, setRecent] = useState<ApplicationRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchApplicationsList({ page: 1, limit: 8, sort: 'newest' })
      .then((res) => {
        setCounts(res.counts);
        setRecent(res.items);
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : 'Unable to load dashboard data.');
      })
      .finally(() => setLoading(false));
  }, []);

  const kpiCards = [
    { label: 'Total Applications', value: counts.total, filter: 'All', accent: 'text-[#F8FAFC]' },
    { label: 'New', value: counts.new, filter: 'New', accent: 'text-[#00E5FF]' },
    { label: 'Under Review', value: counts.underReview, filter: 'Under Review', accent: 'text-[#F59E0B]' },
    { label: 'Contacted', value: counts.contacted, filter: 'Contacted', accent: 'text-[#60A5FA]' },
    { label: 'Approved', value: counts.approved, filter: 'Approved', accent: 'text-[#10B981]' },
    { label: 'Rejected', value: counts.rejected, filter: 'Rejected', accent: 'text-[#F87171]' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-[#F8FAFC]">
            Admissions Overview
          </h1>
          <p className="mt-1 text-sm text-[#94A3B8]">
            Monitor incoming player registrations, coordinate trials, and manage induction status.
          </p>
        </div>
        <Link
          to="/admin/applications"
          className="inline-flex items-center gap-2 rounded-lg bg-[#FF5500] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#FF6F26] transition-colors whitespace-nowrap shrink-0"
        >
          Manage All Applications
          <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
        </Link>
      </div>

      {error && (
        <div className="rounded-xl border border-[#EF4444]/40 bg-[#EF4444]/10 p-4 text-sm text-[#FCA5A5]">
          {error}
        </div>
      )}

      {/* 6 KPI Stat Cards */}
      <section aria-label="Application Metrics" className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        {kpiCards.map((card) => (
          <Link
            key={card.label}
            to={`/admin/applications?status=${encodeURIComponent(card.filter)}`}
            className="rounded-[12px] border border-white/[0.08] bg-[#161B28] p-5 transition-colors hover:border-[#FF5500]/40"
          >
            <p className="text-xs font-medium text-[#94A3B8]">{card.label}</p>
            <p className={`mt-2 font-mono-code text-3xl font-bold tabular-nums ${card.accent}`}>
              {loading ? '—' : card.value}
            </p>
          </Link>
        ))}
      </section>

      {/* Recent Applications */}
      <section className="rounded-[14px] border border-white/[0.08] bg-[#161B28] overflow-hidden">
        <div className="flex items-center justify-between border-b border-white/[0.08] px-6 py-4">
          <h2 className="font-display text-lg font-bold text-[#F8FAFC]">
            Recent Submissions
          </h2>
          <Link
            to="/admin/applications"
            className="text-xs font-semibold text-[#FF6F26] hover:underline"
          >
            View full directory &rarr;
          </Link>
        </div>

        {loading ? (
          <div className="p-6 space-y-3">
            {[1, 2, 3].map((row) => (
              <div key={row} className="h-12 rounded-lg bg-[#111520] animate-pulse" />
            ))}
          </div>
        ) : recent.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <Inbox className="mx-auto h-9 w-9 text-[#64748B]" strokeWidth={1.75} />
            <h3 className="font-display text-base font-bold text-[#F8FAFC]">
              No Applications Submitted Yet
            </h3>
            <p className="mx-auto max-w-md text-sm text-[#94A3B8]">
              Submitted player applications from the public membership form will appear here for
              inspection and trial scheduling.
            </p>
            <div className="pt-2">
              <Link
                to="/apply"
                className="inline-flex items-center rounded-lg border border-white/15 bg-white/[0.04] px-4 py-2 text-xs font-semibold text-[#F8FAFC] hover:border-white/30"
              >
                Open Public Application Form
              </Link>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/[0.08] bg-[#111520] text-xs font-semibold text-[#94A3B8]">
                  <th className="py-3 px-5">Reference</th>
                  <th className="py-3 px-5">Applicant</th>
                  <th className="py-3 px-5">Position &amp; Level</th>
                  <th className="py-3 px-5">Submitted</th>
                  <th className="py-3 px-5">Status</th>
                  <th className="py-3 px-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06] text-sm">
                {recent.map((app) => (
                  <tr key={app.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3.5 px-5 font-mono-code text-xs font-semibold text-[#CBD5E1] tabular-nums whitespace-nowrap">
                      {app.application_reference}
                    </td>
                    <td className="py-3.5 px-5">
                      <div className="flex items-center gap-3">
                        <img
                          src={getPrivateFileUrl(app.passport_photo_url)}
                          alt={app.full_name}
                          className="h-9 w-9 rounded-lg object-cover border border-white/10 shrink-0 bg-[#0D111A]"
                        />
                        <div>
                          <p className="font-semibold text-[#F8FAFC]">{app.full_name}</p>
                          <p className="font-mono-code text-xs text-[#64748B] tabular-nums">
                            {app.contact_number}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-5 text-xs text-[#CBD5E1]">
                      {app.playing_position} · {app.experience_level}
                    </td>
                    <td className="py-3.5 px-5 text-xs text-[#94A3B8] tabular-nums whitespace-nowrap">
                      {formatDateTime(app.submitted_at)}
                    </td>
                    <td className="py-3.5 px-5">
                      <StatusBadge status={app.status} />
                    </td>
                    <td className="py-3.5 px-5 text-right">
                      <Link
                        to={`/admin/applications/${app.id}`}
                        className="inline-flex items-center rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-semibold text-[#F8FAFC] hover:border-[#FF5500]/50 transition-colors whitespace-nowrap"
                      >
                        Inspect File
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
