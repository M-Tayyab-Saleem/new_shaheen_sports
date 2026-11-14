import { Link } from 'react-router-dom';
import { ArrowRight, Check, Users } from 'lucide-react';
import { ACADEMY_IMAGES, TRAINING_PROGRAMS } from '../data/academyData';
import { ImageWithFallback } from '../components/common/ImageWithFallback';

export function TrainingPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 lg:px-10 space-y-16">
      <header className="max-w-3xl space-y-4">
        <p className="text-xs font-semibold tracking-wider text-[#FF6F26]">
          Training &amp; Programs
        </p>
        <h1 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-[#F8FAFC]">
          Developmental Curriculum Built for Match Readiness
        </h1>
        <p className="text-base sm:text-lg leading-relaxed text-[#94A3B8]">
          Whether picking up a volleyball for the first time or sharpening competitive 5-1
          rotational tactics, every athlete trains within a clearly defined skill tier.
        </p>
      </header>

      {/* Tier Cards */}
      <section className="space-y-8">
        {TRAINING_PROGRAMS.map((program) => (
          <article
            key={program.id}
            className="rounded-[14px] border border-white/[0.08] bg-[#161B28] p-7 sm:p-10"
          >
            <div className="flex flex-col gap-4 border-b border-white/[0.08] pb-6 md:flex-row md:items-end md:justify-between">
              <div className="space-y-1.5">
                <p className="text-xs font-semibold text-[#00E5FF]">{program.audience}</p>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#F8FAFC]">
                  {program.indexLabel}. {program.title}
                </h2>
              </div>
              <p className="font-mono-code text-xs font-medium text-[#FF6F26] tabular-nums">
                {program.duration}
              </p>
            </div>

            <p className="mt-6 max-w-3xl text-base leading-relaxed text-[#94A3B8]">
              {program.focusSummary}
            </p>

            <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="space-y-3">
                <h3 className="font-display text-sm font-bold tracking-wide text-[#F8FAFC]">
                  Technical Skills Covered
                </h3>
                <ul className="space-y-2.5">
                  {program.skills.map((skill) => (
                    <li key={skill} className="flex items-start gap-2.5 text-sm text-[#CBD5E1]">
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-[#FF5500]"
                        strokeWidth={2}
                      />
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3">
                <h3 className="font-display text-sm font-bold tracking-wide text-[#F8FAFC]">
                  Expected Athlete Outcomes
                </h3>
                <ul className="space-y-2.5">
                  {program.outcomes.map((outcome) => (
                    <li key={outcome} className="flex items-start gap-2.5 text-sm text-[#CBD5E1]">
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-[#10B981]"
                        strokeWidth={2}
                      />
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* Boys & Girls Participation */}
      <section className="rounded-[14px] border border-white/[0.08] bg-[#111520] overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <ImageWithFallback
            src={ACADEMY_IMAGES.facilityCourt}
            alt="Floodlit academy volleyball court prepared for boys and girls sessions"
            className="h-full w-full object-cover min-h-[260px]"
          />
        </div>
        <div className="lg:col-span-7 p-8 sm:p-10 space-y-5 flex flex-col justify-center">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#00E5FF]">
            <Users className="h-4 w-4" strokeWidth={1.75} />
            Inclusive Youth Pathways
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#F8FAFC]">
            Dedicated Training Batches for Boys &amp; Girls
          </h2>
          <p className="text-sm sm:text-base leading-relaxed text-[#94A3B8]">
            New Shaheen Sports actively trains both boys and girls in Karachi. Separate scheduled
            batches ensure comfortable, focused court time for female athletes while maintaining
            the exact same coaching standards, drill intensity, and positional instruction.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              to="/schedule"
              className="inline-flex items-center rounded-lg border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-[#F8FAFC] hover:border-white/30 transition-colors"
            >
              View Batch Schedule
            </Link>
            <Link
              to="/apply"
              className="inline-flex items-center gap-2 rounded-lg bg-[#FF5500] px-6 py-3 text-sm font-semibold text-white hover:bg-[#FF6F26] transition-colors"
            >
              Apply for Trial Batch
              <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
