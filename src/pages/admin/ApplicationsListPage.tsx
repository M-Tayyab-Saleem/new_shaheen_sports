import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Inbox, Search } from 'lucide-react';
import {
  fetchApplicationsList,
  getPrivateFileUrl,
  type ApplicationRecord,
  type StatusCounts,
} from '../../services/api';
import { formatDateTime } from '../../utils/validation';
import { StatusBadge } from '../../components/common/StatusBadge';

const STATUS_TABS = ['All', 'New', 'Under Review', 'Contacted', 'Approved', 'Rejected'] as const;

export function ApplicationsListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialStatus = searchParams.get('status') || 'All';

  const [statusFilter, setStatusFilter] = useState<string>(initialStatus);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sort, setSort] = useState<'newest' | 'oldest' | 'name'>('newest');
  const [page, setPage] = useState<number>(1);

  const [items, setItems] = useState<ApplicationRecord[]>([]);
  const [counts, setCounts] = useState<StatusCounts | null>(null);
  const [total, setTotal] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const paramStatus = searchParams.get('status');
    if (paramStatus && STATUS_TABS.includes(paramStatus as (typeof STATUS_TABS)[number])) {
      setStatusFilter(paramStatus);
    }
  }, [searchParams]);

  useEffect(() => {
    let active = true;
    setLoading(true);
    const timer = setTimeout(() => {
      fetchApplicationsList({
        status: statusFilter,
        search: searchQuery,
        page,
        limit: 12,
        sort,
      })
        .then((res) => {
          if (!active) return;
          setItems(res.items);
          setCounts(res.counts);
          setTotal(res.total);
          setTotalPages(res.totalPages);
          setError('');
        })
        .catch((err) => {
          if (!active) return;
          setError(err instanceof Error ? err.message : 'Unable to fetch applications.');
        })
        .finally(() => {
          if (active) setLoading(false);
        });
    }, 180);

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [statusFilter, searchQuery, page, sort]);

  function handleSelectStatus(next: string) {
    setStatusFilter(next);
    setPage(1);
    setSearchParams(next === 'All' ? {} : { status: next });
  }

  function getTabCount(tab: string): number | undefined {
    if (!counts) return undefined;
    if (tab === 'All') return counts.total;
    if (tab === 'New') return counts.new;
    if (tab === 'Under Review') return counts.underReview;
    if (tab === 'Contacted') return counts.contacted;
    if (tab === 'Approved') return counts.approved;
    if (tab === 'Rejected') return counts.rejected;
    return undefined;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-[#F8FAFC]">
            Applications Directory
          </h1>
          <p className="mt-1 text-sm text-[#94A3B8]">
            Search by athlete name, reference number, phone, or CNIC / B-Form.
          </p>
        </div>
        <p className="font-mono-code text-xs text-[#94A3B8] tabular-nums">
          {total} matching {total === 1 ? 'record' : 'records'}
        </p>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="rounded-[14px] border border-white/[0.08] bg-[#161B28] p-4 space-y-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative flex-1 max-w-lg">
            <Search
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#64748B]"
              strokeWidth={1.75}
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPage(1);
              }}
              placeholder="Search name, NSS-2026-..., phone, or CNIC..."
              aria-label="Search applications"
              className="w-full h-11 rounded-lg border border-white/12 bg-[#0D111A] pl-10 pr-4 text-sm text-[#F8FAFC] placeholder-[#64748B] focus:outline-none focus:border-[#FF5500]"
            />
          </div>

          <div className="flex items-center gap-3">
            <label htmlFor="sort-select" className="text-xs font-medium text-[#94A3B8]">
              Sort:
            </label>
            <select
              id="sort-select"
              value={sort}
              onChange={(e) => {
                setSort(e.target.value as 'newest' | 'oldest' | 'name');
                setPage(1);
              }}
              className="h-11 rounded-lg border border-white/12 bg-[#0D111A] px-3 text-xs font-semibold text-[#F8FAFC] focus:outline-none focus:border-[#FF5500]"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="name">Name (A–Z)</option>
            </select>
          </div>
        </div>

        {/* Status Segmented Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          {STATUS_TABS.map((tab) => {
            const active = statusFilter === tab;
            const tabCount = getTabCount(tab);
            return (
              <button
                key={tab}
                type="button"
                onClick={() => handleSelectStatus(tab)}
                className={`inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                  active
                    ? 'bg-[#FF5500] text-white'
                    : 'bg-[#0D111A] text-[#94A3B8] hover:text-[#F8FAFC] border border-white/[0.06]'
                }`}
              >
                <span>{tab}</span>
                {tabCount !== undefined && (
                  <span
                    className={`font-mono-code tabular-nums ${
                      active ? 'text-white/90' : 'text-[#64748B]'
                    }`}
                  >
                    {tabCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {error && (
        <div className="rounded-xl border border-[#EF4444]/40 bg-[#EF4444]/10 p-4 text-sm text-[#FCA5A5]">
          {error}
        </div>
      )}

      {/* Dense Applications Table */}
      <div className="rounded-[14px] border border-white/[0.08] bg-[#161B28] overflow-hidden">
        {loading ? (
          <div className="p-6 space-y-3">
            {[1, 2, 3, 4, 5].map((r) => (
              <div key={r} className="h-12 rounded-lg bg-[#111520] animate-pulse" />
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <Inbox className="mx-auto h-9 w-9 text-[#64748B]" strokeWidth={1.75} />
            <h2 className="font-display text-base font-bold text-[#F8FAFC]">
              No Matching Applications
            </h2>
            <p className="text-sm text-[#94A3B8]">
              Try clearing your search filter or switching to a different status tab.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/[0.08] bg-[#111520] text-xs font-semibold text-[#94A3B8]">
                  <th className="py-3 px-5">Reference</th>
                  <th className="py-3 px-5">Applicant</th>
                  <th className="py-3 px-5">Contact</th>
                  <th className="py-3 px-5">Position &amp; Level</th>
                  <th className="py-3 px-5">Submitted</th>
                  <th className="py-3 px-5">Status</th>
                  <th className="py-3 px-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06] text-sm">
                {items.map((app) => (
                  <tr key={app.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 px-5 font-mono-code text-xs font-semibold text-[#CBD5E1] tabular-nums whitespace-nowrap">
                      {app.application_reference}
                    </td>
                    <td className="py-3 px-5">
                      <div className="flex items-center gap-3">
                        <img
                          src={getPrivateFileUrl(app.passport_photo_url)}
                          alt={app.full_name}
                          className="h-9 w-9 rounded-lg object-cover border border-white/10 shrink-0 bg-[#0D111A]"
                        />
                        <div>
                          <p className="font-semibold text-[#F8FAFC]">{app.full_name}</p>
                          <p className="font-mono-code text-xs text-[#64748B] tabular-nums">
                            {app.nic_number}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-5 font-mono-code text-xs text-[#CBD5E1] tabular-nums whitespace-nowrap">
                      {app.contact_number}
                    </td>
                    <td className="py-3 px-5 text-xs text-[#CBD5E1]">
                      {app.playing_position} · {app.experience_level}
                    </td>
                    <td className="py-3 px-5 text-xs text-[#94A3B8] tabular-nums whitespace-nowrap">
                      {formatDateTime(app.submitted_at)}
                    </td>
                    <td className="py-3 px-5">
                      <StatusBadge status={app.status} />
                    </td>
                    <td className="py-3 px-5 text-right">
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

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-white/[0.08] px-5 py-3.5 text-xs text-[#94A3B8]">
            <span className="tabular-nums">
              Page {page} of {totalPages}
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-[#0D111A] px-3 py-1.5 font-semibold text-[#F8FAFC] disabled:opacity-40"
              >
                <ChevronLeft className="h-3.5 w-3.5" strokeWidth={1.75} />
                Prev
              </button>
              <button
                type="button"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-[#0D111A] px-3 py-1.5 font-semibold text-[#F8FAFC] disabled:opacity-40"
              >
                Next
                <ChevronRight className="h-3.5 w-3.5" strokeWidth={1.75} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
