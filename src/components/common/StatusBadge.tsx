import { CheckCircle2, Clock, PhoneCall, Sparkles, XCircle } from 'lucide-react';
import type { ApplicationStatus } from '../../services/api';

const STATUS_STYLES: Record<
  ApplicationStatus,
  { bg: string; border: string; text: string; Icon: typeof Clock }
> = {
  New: {
    bg: 'bg-[#00E5FF]/10',
    border: 'border-[#00E5FF]/30',
    text: 'text-[#00E5FF]',
    Icon: Sparkles,
  },
  'Under Review': {
    bg: 'bg-[#F59E0B]/10',
    border: 'border-[#F59E0B]/30',
    text: 'text-[#F59E0B]',
    Icon: Clock,
  },
  Contacted: {
    bg: 'bg-[#3B82F6]/10',
    border: 'border-[#3B82F6]/30',
    text: 'text-[#60A5FA]',
    Icon: PhoneCall,
  },
  Approved: {
    bg: 'bg-[#10B981]/10',
    border: 'border-[#10B981]/30',
    text: 'text-[#10B981]',
    Icon: CheckCircle2,
  },
  Rejected: {
    bg: 'bg-[#EF4444]/10',
    border: 'border-[#EF4444]/30',
    text: 'text-[#F87171]',
    Icon: XCircle,
  },
};

export function StatusBadge({ status }: { status: ApplicationStatus }) {
  const style = STATUS_STYLES[status] || STATUS_STYLES.New;
  const Icon = style.Icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold tracking-wide whitespace-nowrap shrink-0 ${style.bg} ${style.border} ${style.text}`}
    >
      <Icon className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
      {status}
    </span>
  );
}
