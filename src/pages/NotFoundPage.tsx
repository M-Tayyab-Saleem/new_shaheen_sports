import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export function NotFoundPage() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-28 text-center space-y-6">
      <p className="font-mono-code text-xs font-semibold text-[#FF6F26]">404 · Page Not Found</p>
      <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#F8FAFC]">
        That Court Line Doesn’t Exist
      </h1>
      <p className="text-base text-[#94A3B8]">
        The page you requested could not be found. Return to the academy homepage or go straight
        to the membership application.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-[#F8FAFC] hover:border-white/30 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={1.75} />
          Back to Home
        </Link>
        <Link
          to="/apply"
          className="inline-flex items-center rounded-lg bg-[#FF5500] px-6 py-3 text-sm font-semibold text-white hover:bg-[#FF6F26] transition-colors"
        >
          Apply for Academy
        </Link>
      </div>
    </div>
  );
}
