import { ACADEMY_INFO } from '../../data/academyData';

interface AcademyLogoProps {
  variant?: 'compact' | 'emblem' | 'large';
  className?: string;
}

export function AcademyLogo({ variant = 'compact', className = '' }: AcademyLogoProps) {
  if (variant === 'compact') {
    return (
      <span
        className={`inline-flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white p-0.5 ring-1 ring-white/20 shadow-sm ${className}`}
      >
        <img
          src={ACADEMY_INFO.logoUrl}
          alt="New Shaheen Sports Emblem"
          referrerPolicy="no-referrer"
          className="h-full w-full object-contain"
        />
      </span>
    );
  }

  if (variant === 'large') {
    return (
      <div
        className={`inline-flex items-center justify-center overflow-hidden rounded-2xl bg-white p-3 ring-1 ring-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.45)] ${className}`}
      >
        <img
          src={ACADEMY_INFO.logoUrl}
          alt="New Shaheen Sports Official Crest"
          referrerPolicy="no-referrer"
          className="h-24 w-24 sm:h-28 sm:w-28 object-contain"
        />
      </div>
    );
  }

  return (
    <div
      className={`inline-flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white p-1.5 ring-1 ring-white/15 shadow-md ${className}`}
    >
      <img
        src={ACADEMY_INFO.logoUrl}
        alt="New Shaheen Sports Official Crest"
        referrerPolicy="no-referrer"
        className="h-full w-full object-contain"
      />
    </div>
  );
}
