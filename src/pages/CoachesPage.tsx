import { Link } from 'react-router-dom';
import { ArrowRight, Phone } from 'lucide-react';
import { COACHING_STAFF } from '../data/academyData';
import { ImageWithFallback } from '../components/common/ImageWithFallback';
import { AcademyLogo } from '../components/common/AcademyLogo';

export function CoachesPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 lg:px-10 space-y-14">
      <header className="flex flex-col sm:flex-row sm:items-center gap-6 max-w-4xl">
        <AcademyLogo variant="large" />
        <div className="space-y-3">
          <p className="text-xs font-semibold tracking-wider text-[#FF6F26]">
            Coaching Roster
          </p>
          <h1 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-[#F8FAFC]">
            Led by National Playing Experience &amp; Court Mentors
          </h1>
          <p className="text-base sm:text-lg leading-relaxed text-[#94A3B8]">
            Our coaching panel combines national-level match intelligence with patient,
            fundamentals-first teaching so young athletes develop correct habits from day one.
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-8">
        {COACHING_STAFF.map((coach) => (
          <article
            key={coach.id}
            className="rounded-[14px] border border-white/[0.08] bg-[#161B28] overflow-hidden grid grid-cols-1 md:grid-cols-12"
          >
            <div className="md:col-span-4 bg-[#0D111A]">
              <ImageWithFallback
                src={coach.image}
                alt={`${coach.name} — ${coach.role}`}
                className="h-full w-full object-cover object-top max-h-[380px] md:max-h-none"
              />
            </div>
            <div className="md:col-span-8 p-7 sm:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <p className="text-xs font-semibold text-[#FF6F26]">{coach.role}</p>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#F8FAFC]">
                  {coach.name}
                </h2>
                <p className="text-xs font-medium text-[#00E5FF]">{coach.credentials}</p>
                <p className="pt-2 text-sm sm:text-base leading-relaxed text-[#94A3B8]">
                  {coach.bio}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 border-t border-white/[0.08] pt-6 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold text-[#64748B]">Primary Specialization</p>
                  <p className="mt-1 text-sm font-medium text-[#F8FAFC]">
                    {coach.specialization}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#64748B]">Key Coaching Focus</p>
                  <p className="mt-1 text-sm font-medium text-[#CBD5E1]">
                    {coach.focusAreas.join(' · ')}
                  </p>
                  {coach.phoneDisplay && (
                    <a
                      href={`tel:${coach.phoneDisplay.replace(/\s/g, '')}`}
                      className="mt-2 inline-flex items-center gap-1.5 font-mono-code text-xs font-semibold text-[#FF6F26] hover:underline tabular-nums"
                    >
                      <Phone className="h-3.5 w-3.5" strokeWidth={1.75} />
                      {coach.phoneDisplay}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="rounded-[14px] border border-white/[0.08] bg-[#111520] p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div className="space-y-1">
          <h2 className="font-display text-xl font-bold text-[#F8FAFC]">
            Train Directly With Our Coaching Staff
          </h2>
          <p className="text-sm text-[#94A3B8]">
            Submit your membership application to schedule an on-court assessment.
          </p>
        </div>
        <Link
          to="/apply"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#FF5500] px-6 py-3 text-sm font-semibold text-white hover:bg-[#FF6F26] transition-colors whitespace-nowrap shrink-0"
        >
          Apply Now
          <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
        </Link>
      </div>
    </div>
  );
}
