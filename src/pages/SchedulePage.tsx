import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Clock, ExternalLink, MapPin } from 'lucide-react';
import { ACADEMY_INFO, TRAINING_SCHEDULE } from '../data/academyData';

export function SchedulePage() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 lg:px-10 space-y-16">
      <header className="max-w-3xl space-y-4">
        <p className="text-xs font-semibold tracking-wider text-[#FF6F26]">
          Schedule &amp; Ground Location
        </p>
        <h1 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-[#F8FAFC]">
          Court Timings in Shah Faisal Colony, Karachi
        </h1>
        <p className="text-base sm:text-lg leading-relaxed text-[#94A3B8]">
          Training batches are structured by age group, experience level, and dedicated division
          slots so every athlete receives focused coaching repetitions.
        </p>
      </header>

      {/* Weekly Timetable */}
      <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {TRAINING_SCHEDULE.map((slot) => (
          <article
            key={slot.id}
            className="rounded-[14px] border border-white/[0.08] bg-[#161B28] p-7 space-y-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-semibold text-[#00E5FF]">{slot.category}</span>
              <span className="font-mono-code text-xs font-semibold text-[#FF6F26] tabular-nums">
                {slot.timing}
              </span>
            </div>
            <h2 className="font-display text-xl font-bold text-[#F8FAFC]">{slot.batch}</h2>
            <div className="grid grid-cols-2 gap-4 border-t border-white/[0.08] pt-4 text-sm">
              <div>
                <p className="text-xs text-[#64748B]">Training Days</p>
                <p className="mt-1 font-medium text-[#CBD5E1]">{slot.days}</p>
              </div>
              <div>
                <p className="text-xs text-[#64748B]">Eligibility</p>
                <p className="mt-1 font-medium text-[#CBD5E1]">
                  {slot.ageGroup} · {slot.level}
                </p>
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* Ground Location & Map */}
      <section className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-stretch">
        <div className="lg:col-span-5 rounded-[14px] border border-white/[0.08] bg-[#161B28] p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <p className="text-xs font-semibold tracking-wider text-[#FF6F26]">
              Ground Address &amp; Landmarks
            </p>
            <h2 className="font-display text-2xl font-bold text-[#F8FAFC]">
              Shah Faisal Colony, Block 4
            </h2>
            <div className="space-y-3 text-sm text-[#94A3B8]">
              <p className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#FF5500]" strokeWidth={1.75} />
                <span>{ACADEMY_INFO.address}</span>
              </p>
              <p className="flex items-start gap-2.5">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[#00E5FF]" strokeWidth={1.75} />
                <span>
                  Ground arrival opens 15 minutes before each scheduled session. First-time
                  applicants attend weekend trials upon confirmation.
                </span>
              </p>
            </div>
          </div>

          <div className="space-y-4 border-t border-white/[0.08] pt-6">
            <h3 className="font-display text-sm font-bold text-[#F8FAFC]">
              What to Bring on Day One
            </h3>
            <ul className="space-y-2 text-sm text-[#CBD5E1]">
              {[
                'Non-marking court sneakers or athletic sports shoes',
                'Breathable athletic t-shirt and training shorts/track pants',
                'Personal 1-liter water bottle and small court towel',
                'Optional knee pads for defensive & libero drills',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <CheckCircle2
                    className="mt-0.5 h-4 w-4 shrink-0 text-[#10B981]"
                    strokeWidth={1.75}
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href={ACADEMY_INFO.mapsQueryUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/[0.04] px-5 py-2.5 text-sm font-semibold text-[#F8FAFC] hover:border-white/30 transition-colors"
            >
              Open in Google Maps
              <ExternalLink className="h-4 w-4" strokeWidth={1.75} />
            </a>
            <Link
              to="/apply"
              className="inline-flex items-center gap-2 rounded-lg bg-[#FF5500] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#FF6F26] transition-colors"
            >
              Book Trial via Application
              <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
            </Link>
          </div>
        </div>

        <div className="lg:col-span-7 rounded-[14px] border border-white/[0.08] bg-[#161B28] overflow-hidden min-h-[380px]">
          <iframe
            title="New Shaheen Sports Ground Location Map — Shah Faisal Colony Block 4 Karachi"
            src={ACADEMY_INFO.mapsEmbedUrl}
            className="h-full w-full min-h-[380px] border-0 grayscale contrast-125 opacity-90"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </div>
  );
}
