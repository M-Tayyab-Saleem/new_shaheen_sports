import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, MapPin, ShieldCheck, Users } from 'lucide-react';
import {
  ACADEMY_IMAGES,
  ACADEMY_INFO,
  COACHING_STAFF,
  TRAINING_PROGRAMS,
  TRAINING_SCHEDULE,
} from '../data/academyData';
import { ImageWithFallback } from '../components/common/ImageWithFallback';
import { AcademyLogo } from '../components/common/AcademyLogo';

export function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-white/[0.08]">
        <div className="absolute inset-0">
          <ImageWithFallback
            src={ACADEMY_IMAGES.heroCourt}
            alt="Volleyball athlete spiking at the net under floodlights"
            className="h-full w-full object-cover object-center opacity-55"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080A0F] via-[#080A0F]/85 to-[#080A0F]/45" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080A0F] via-transparent to-[#080A0F]/40" />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28 lg:px-10 lg:py-32">
          <div className="max-w-3xl space-y-6">
            <div className="flex items-center gap-4">
              <AcademyLogo variant="emblem" />
              <p className="text-xs font-semibold tracking-wider text-[#94A3B8]">
                Karachi Volleyball Academy · Shah Faisal Colony · Official Crest
              </p>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.75rem] font-extrabold leading-[1.06] tracking-[-0.03em] text-[#F8FAFC]">
              Building skills. Developing athletes.{' '}
              <span className="text-[#FF5500]">Strengthening teams.</span>
            </h1>

            <p className="max-w-2xl text-base sm:text-lg leading-relaxed text-[#CBD5E1]">
              New Shaheen Sports delivers structured, high-discipline volleyball coaching for
              boys and girls in Karachi across beginner, intermediate, and competitive squad
              pathways.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/apply"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#FF5500] px-7 py-3.5 text-sm font-semibold text-white transition-all duration-150 hover:bg-[#FF6F26] hover:-translate-y-0.5 shadow-[0_8px_24px_rgba(255,85,0,0.28)] whitespace-nowrap"
              >
                Apply for Academy
                <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
              </Link>
              <Link
                to="/training"
                className="inline-flex items-center justify-center rounded-lg border border-white/15 bg-white/[0.04] px-6 py-3.5 text-sm font-semibold text-[#F8FAFC] transition-colors hover:border-white/30 hover:bg-white/[0.08] whitespace-nowrap"
              >
                Explore Training Programs
              </Link>
            </div>
          </div>

          {/* Full-width Academy Pillars Strip below Hero */}
          <div className="mt-14 grid grid-cols-1 gap-4 border-t border-white/10 pt-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="font-display text-lg font-bold text-[#F8FAFC]">Boys &amp; Girls Batches</p>
              <p className="mt-1 text-sm text-[#94A3B8]">
                Dedicated supervised court slots for junior and senior athletes
              </p>
            </div>
            <div>
              <p className="font-display text-lg font-bold text-[#F8FAFC]">3 Skill Tiers</p>
              <p className="mt-1 text-sm text-[#94A3B8]">
                Progressive curriculum from ball control to 5-1 match systems
              </p>
            </div>
            <div>
              <p className="font-display text-lg font-bold text-[#F8FAFC]">National Leadership</p>
              <p className="mt-1 text-sm text-[#94A3B8]">
                Led by Syed Ammar Ali, Syed Kausar Ali Tirmizi &amp; Syed Akbar Ali
              </p>
            </div>
            <div>
              <p className="font-display text-lg font-bold text-[#F8FAFC]">Shah Faisal Colony</p>
              <p className="mt-1 text-sm text-[#94A3B8]">
                Block 4, near Water Pump · Floodlit evening training sessions
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Training Pathways Bento Grid */}
      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8 lg:px-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <p className="text-xs font-semibold tracking-wider text-[#FF6F26]">
              Curriculum &amp; Progression
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#F8FAFC]">
              Structured Development Across Every Stage
            </h2>
          </div>
          <Link
            to="/training"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#F8FAFC] hover:text-[#FF6F26] transition-colors whitespace-nowrap"
          >
            View full curriculum
            <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Featured visual training card */}
          <div className="lg:col-span-5 rounded-[14px] border border-white/[0.08] bg-[#161B28] overflow-hidden flex flex-col">
            <div className="aspect-[4/3] w-full overflow-hidden">
              <ImageWithFallback
                src={ACADEMY_IMAGES.trainingAction}
                alt="Youth athletes practicing volleyball passing formations on court"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-7 flex-1 flex flex-col justify-between space-y-5">
              <div className="space-y-2.5">
                <p className="text-xs font-medium text-[#94A3B8]">
                  Court Philosophy · Discipline &amp; Repetition
                </p>
                <h3 className="font-display text-xl font-bold text-[#F8FAFC]">
                  Fundamentals Before Flair
                </h3>
                <p className="text-sm leading-relaxed text-[#94A3B8]">
                  Every player is evaluated on footwork, passing angle, and court communication
                  before advancing to specialized attacking or setting roles.
                </p>
              </div>
              <div className="pt-2 border-t border-white/[0.07] flex items-center justify-between text-xs text-[#94A3B8]">
                <span>Boys &amp; Girls Equal Opportunity</span>
                <Link
                  to="/about"
                  className="font-semibold text-[#F8FAFC] hover:text-[#FF6F26] transition-colors"
                >
                  Our story &rarr;
                </Link>
              </div>
            </div>
          </div>

          {/* 3 Structured tiers */}
          <div className="lg:col-span-7 grid grid-cols-1 gap-5">
            {TRAINING_PROGRAMS.map((program) => (
              <div
                key={program.id}
                className="rounded-[14px] border border-white/[0.08] bg-[#161B28] p-7 transition-all duration-200 hover:border-[#FF5500]/40 hover:bg-[#1A2030]"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display text-xl font-bold text-[#F8FAFC]">
                    {program.indexLabel}. {program.title}
                  </h3>
                  <span className="text-xs font-medium text-[#94A3B8] tabular-nums">
                    {program.duration}
                  </span>
                </div>
                <p className="mt-1 text-xs font-medium text-[#00E5FF]">{program.audience}</p>
                <p className="mt-3 text-sm leading-relaxed text-[#94A3B8]">
                  {program.focusSummary}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#CBD5E1]">
                  {program.skills.slice(0, 3).map((skill, idx) => (
                    <span key={skill} className="inline-flex items-center gap-2">
                      {idx > 0 && <span className="text-[#475569]" aria-hidden="true">·</span>}
                      <span>{skill}</span>
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coaching & Founder Spotlight */}
      <section className="border-y border-white/[0.08] bg-[#111520]">
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 lg:px-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="space-y-2">
              <p className="text-xs font-semibold tracking-wider text-[#FF6F26]">
                Leadership &amp; Coaching
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#F8FAFC]">
                Guided by National Experience
              </h2>
            </div>
            <Link
              to="/founder"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#F8FAFC] hover:text-[#FF6F26] transition-colors whitespace-nowrap"
            >
              Read founder biography
              <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {COACHING_STAFF.map((coach) => (
              <article
                key={coach.id}
                className="rounded-[14px] border border-white/[0.08] bg-[#161B28] overflow-hidden flex flex-col"
              >
                <div className="aspect-[4/4] sm:aspect-[3/3.4] w-full overflow-hidden bg-[#0D111A]">
                  <ImageWithFallback
                    src={coach.image}
                    alt={`${coach.name} — ${coach.role}`}
                    className="h-full w-full object-cover object-top"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <p className="text-xs font-medium text-[#94A3B8]">{coach.role}</p>
                    <h3 className="mt-1 font-display text-xl font-bold text-[#F8FAFC]">
                      {coach.name}
                    </h3>
                    <p className="mt-1 text-xs font-medium text-[#00E5FF]">{coach.credentials}</p>
                    <p className="mt-3 text-sm leading-relaxed text-[#94A3B8]">{coach.bio}</p>
                  </div>
                  <p className="pt-3 border-t border-white/[0.07] text-xs text-[#CBD5E1]">
                    Focus: {coach.focusAreas.join(' · ')}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Ground & Schedule Preview */}
      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8 lg:px-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-stretch">
          <div className="lg:col-span-6 rounded-[14px] border border-white/[0.08] bg-[#161B28] overflow-hidden flex flex-col">
            <div className="aspect-[16/9] w-full overflow-hidden">
              <ImageWithFallback
                src={ACADEMY_IMAGES.facilityCourt}
                alt="New Shaheen Sports regulation volleyball court under evening floodlights"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-7 flex-1 flex flex-col justify-between space-y-5">
              <div className="space-y-2">
                <p className="text-xs font-semibold tracking-wider text-[#FF6F26]">
                  Training Ground
                </p>
                <h2 className="font-display text-2xl font-bold text-[#F8FAFC]">
                  Shah Faisal Colony, Block 4
                </h2>
                <p className="text-sm leading-relaxed text-[#94A3B8]">
                  Located near Water Pump in Shah Faisal Colony, Karachi. Our floodlit court
                  accommodates evening technical drills, jump conditioning, and weekend trial
                  assessments.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/schedule"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#F8FAFC] hover:text-[#FF6F26] transition-colors"
                >
                  <MapPin className="h-4 w-4 text-[#FF5500]" strokeWidth={1.75} />
                  View directions &amp; map
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#94A3B8] hover:text-[#F8FAFC] transition-colors"
                >
                  Contact ground desk
                </Link>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 rounded-[14px] border border-white/[0.08] bg-[#161B28] p-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold tracking-wider text-[#FF6F26]">
                    Weekly Schedule
                  </p>
                  <h2 className="mt-1 font-display text-2xl font-bold text-[#F8FAFC]">
                    Batch Timings &amp; Divisions
                  </h2>
                </div>
                <Calendar className="h-5 w-5 text-[#94A3B8]" strokeWidth={1.75} />
              </div>

              <div className="mt-6 divide-y divide-white/[0.07]">
                {TRAINING_SCHEDULE.map((slot) => (
                  <div key={slot.id} className="py-4 first:pt-0 last:pb-0">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="font-display text-base font-semibold text-[#F8FAFC]">
                        {slot.batch}
                      </h3>
                      <span className="font-mono-code text-xs font-medium text-[#FF6F26] tabular-nums">
                        {slot.timing}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-[#94A3B8]">
                      {slot.days} · {slot.ageGroup} · {slot.level}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-white/[0.07] flex flex-wrap items-center justify-between gap-4">
              <p className="inline-flex items-center gap-2 text-xs text-[#94A3B8]">
                <Users className="h-4 w-4 text-[#00E5FF]" strokeWidth={1.75} />
                Separate supervised slots for girls &amp; junior boys
              </p>
              <Link
                to="/schedule"
                className="text-sm font-semibold text-[#F8FAFC] hover:text-[#FF6F26] transition-colors"
              >
                Full schedule &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final Enrollment CTA */}
      <section className="border-t border-white/[0.08] bg-[#111520]">
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 lg:px-10">
          <div className="rounded-[14px] border border-white/10 bg-[#161B28] p-8 sm:p-12 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="max-w-2xl space-y-3">
              <p className="inline-flex items-center gap-2 text-xs font-semibold text-[#00E5FF]">
                <ShieldCheck className="h-4 w-4" strokeWidth={1.75} />
                Unified Digital Membership Intake
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#F8FAFC]">
                Ready for Your Court Assessment in Karachi?
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-[#94A3B8]">
                Submit your official membership application with your passport photo, preferred
                court position, and digital signature. Applications are reviewed directly by
                academy management to assign your trial batch.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4 shrink-0">
              <Link
                to="/apply"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#FF5500] px-7 py-3.5 text-sm font-semibold text-white transition-all duration-150 hover:bg-[#FF6F26] hover:-translate-y-0.5 whitespace-nowrap"
              >
                Start Application
                <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
              </Link>
              <a
                href={ACADEMY_INFO.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-lg border border-white/15 bg-white/[0.03] px-5 py-3.5 text-sm font-semibold text-[#F8FAFC] hover:border-white/30 transition-colors whitespace-nowrap"
              >
                WhatsApp Inquiries
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
