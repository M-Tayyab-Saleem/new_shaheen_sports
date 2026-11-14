import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink, Phone } from 'lucide-react';
import { ACADEMY_IMAGES, ACADEMY_INFO } from '../data/academyData';
import { ImageWithFallback } from '../components/common/ImageWithFallback';
import { AcademyLogo } from '../components/common/AcademyLogo';

export function FounderPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 lg:px-10 space-y-20">
      {/* Founder Editorial Lead */}
      <section className="grid grid-cols-1 gap-10 lg:grid-cols-12 items-start">
        <div className="lg:col-span-5 rounded-[14px] border border-white/[0.08] bg-[#161B28] overflow-hidden">
          <ImageWithFallback
            src={ACADEMY_IMAGES.founderAmmar}
            alt="Syed Ammar Ali — Founder and National Volleyball Player"
            className="aspect-[3/4] w-full object-cover object-top"
          />
        </div>

        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <p className="text-xs font-semibold tracking-wider text-[#FF6F26]">
              Founder &amp; Head Coach · National Volleyball Player
            </p>
            <h1 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-[#F8FAFC]">
              Syed Ammar Ali
            </h1>
            <p className="text-sm font-medium text-[#00E5FF]">
              Associated Social Identity: {ACADEMY_INFO.socialIdentity}
            </p>
          </div>

          <div className="space-y-4 text-base leading-relaxed text-[#CBD5E1]">
            <p>
              As a national-level Pakistani volleyball player, Syed Ammar Ali experienced firsthand
              what separates casual playground volleyball from high-performance competitive play:
              consistent biomechanical fundamentals, tactical awareness, and daily court discipline.
            </p>
            <p>
              Recognizing that talented young players in Karachi often lacked access to structured
              drills and position-specific mentorship, he built the digital platform{' '}
              <strong className="text-[#F8FAFC]">Volleyball by Ammar</strong> to share technical
              breakdowns and match knowledge—and established{' '}
              <strong className="text-[#F8FAFC]">New Shaheen Sports</strong> alongside co-founders{' '}
              <strong className="text-[#F8FAFC]">Syed Kausar Ali Tirmizi</strong> and{' '}
              <strong className="text-[#F8FAFC]">Syed Akbar Ali</strong> to bring real on-court
              coaching directly to Shah Faisal Colony.
            </p>
          </div>

          <div className="rounded-[14px] border border-white/[0.08] bg-[#111520] p-6 space-y-3">
            <p className="text-xs font-semibold tracking-wider text-[#94A3B8]">
              Founder’s Message to Youth &amp; Parents
            </p>
            <blockquote className="text-base italic leading-relaxed text-[#F8FAFC]">
              “Talent gets you noticed for a single rally, but disciplined fundamentals keep you on
              the court for years. At New Shaheen Sports, we treat every young athlete with
              respect, structure, and honest coaching—whether they are touching a volleyball for
              the first time or preparing for national trials.”
            </blockquote>
            <p className="text-xs font-medium text-[#94A3B8]">— Syed Ammar Ali</p>
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              to="/apply"
              className="inline-flex items-center gap-2 rounded-lg bg-[#FF5500] px-6 py-3 text-sm font-semibold text-white hover:bg-[#FF6F26] transition-colors"
            >
              Apply to Train Under Coach Ammar
              <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
            </Link>
            <a
              href={ACADEMY_INFO.facebookUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-[#F8FAFC] hover:border-white/30 transition-colors"
            >
              Volleyball by Ammar
              <ExternalLink className="h-4 w-4" strokeWidth={1.75} />
            </a>
          </div>
        </div>
      </section>

      {/* Co-Founders Feature */}
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-[14px] border border-white/[0.08] bg-[#161B28] p-8 space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <p className="text-xs font-semibold tracking-wider text-[#00E5FF]">
                Co-Founder &amp; Coach
              </p>
              <AcademyLogo variant="compact" />
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#F8FAFC]">
              Syed Kausar Ali Tirmizi
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-[#94A3B8]">
              Serving as Co-Founder and Coach at New Shaheen Sports, Syed Kausar Ali Tirmizi leads
              technical passing and serve drills, new athlete evaluations, and daily court
              discipline alongside Head Coach Syed Ammar Ali.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.08] pt-4">
            <a
              href={`tel:${ACADEMY_INFO.secondaryPhoneDisplay.replace(/\s/g, '')}`}
              className="inline-flex items-center gap-2 font-mono-code text-sm font-semibold text-[#FF6F26] hover:underline tabular-nums"
            >
              <Phone className="h-4 w-4" strokeWidth={1.75} />
              {ACADEMY_INFO.secondaryPhoneDisplay}
            </a>
            <Link
              to="/coaches"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#F8FAFC] hover:text-[#FF6F26] transition-colors"
            >
              Coaching roster
              <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
            </Link>
          </div>
        </div>

        <div className="rounded-[14px] border border-white/[0.08] bg-[#161B28] overflow-hidden grid grid-cols-1 sm:grid-cols-12">
          <div className="sm:col-span-7 p-8 space-y-4 flex flex-col justify-center">
            <p className="text-xs font-semibold tracking-wider text-[#00E5FF]">
              Co-Founder &amp; Senior Director
            </p>
            <h2 className="font-display text-2xl font-bold text-[#F8FAFC]">
              Syed Akbar Ali
            </h2>
            <p className="text-sm leading-relaxed text-[#94A3B8]">
              Co-founding New Shaheen Sports, Syed Akbar Ali leads academy governance, court
              safety, batch organization, and direct parent engagement for boys’ and girls’
              programs.
            </p>
          </div>
          <div className="sm:col-span-5 bg-[#0D111A]">
            <ImageWithFallback
              src={ACADEMY_IMAGES.coachAkbar}
              alt="Syed Akbar Ali — Co-Founder and Senior Director"
              className="h-full w-full object-cover object-top max-h-[300px] sm:max-h-none"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
