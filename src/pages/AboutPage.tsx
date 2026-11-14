import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Shield } from 'lucide-react';
import { ACADEMY_IMAGES, CORE_VALUES } from '../data/academyData';
import { ImageWithFallback } from '../components/common/ImageWithFallback';
import { AcademyLogo } from '../components/common/AcademyLogo';

export function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 lg:px-10 space-y-20">
      {/* Page Header */}
      <section className="grid grid-cols-1 gap-10 lg:grid-cols-12 items-center">
        <div className="lg:col-span-7 space-y-5">
          <div className="flex items-center gap-4">
            <AcademyLogo variant="emblem" />
            <p className="text-xs font-semibold tracking-wider text-[#FF6F26]">
              About the Academy
            </p>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-[#F8FAFC]">
            Raising the Standard of Grassroots Volleyball in Karachi
          </h1>
          <p className="text-base sm:text-lg leading-relaxed text-[#94A3B8]">
            New Shaheen Sports was established in Shah Faisal Colony by Syed Ammar Ali, Syed
            Kausar Ali Tirmizi, and Syed Akbar Ali to bridge the gap between informal street play
            and structured, national-level volleyball coaching. Associated with the widely followed{' '}
            <strong className="text-[#F8FAFC]">Volleyball by Ammar</strong> community, our court
            serves dedicated boys and girls seeking real technical growth.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              to="/apply"
              className="inline-flex items-center gap-2 rounded-lg bg-[#FF5500] px-6 py-3 text-sm font-semibold text-white hover:bg-[#FF6F26] transition-colors"
            >
              Apply for Membership
              <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
            </Link>
            <Link
              to="/founder"
              className="inline-flex items-center rounded-lg border border-white/15 bg-white/[0.03] px-6 py-3 text-sm font-semibold text-[#F8FAFC] hover:border-white/30 transition-colors"
            >
              Meet the Founders
            </Link>
          </div>
        </div>

        <div className="lg:col-span-5 rounded-[14px] border border-white/[0.08] bg-[#161B28] overflow-hidden">
          <ImageWithFallback
            src={ACADEMY_IMAGES.trainingAction}
            alt="New Shaheen Sports athletes during court drills"
            className="aspect-[4/3] w-full object-cover"
          />
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-[14px] border border-white/[0.08] bg-[#161B28] p-8 space-y-3">
          <p className="text-xs font-semibold tracking-wider text-[#00E5FF]">Our Mission</p>
          <h2 className="font-display text-2xl font-bold text-[#F8FAFC]">
            Structured Coaching Accessible to Dedicated Youth
          </h2>
          <p className="text-sm sm:text-base leading-relaxed text-[#94A3B8]">
            To cultivate technically sound, physically resilient, and disciplined volleyball
            players in Karachi through progressive coaching tiers, verified safety protocols, and
            consistent match preparation.
          </p>
        </div>

        <div className="rounded-[14px] border border-white/[0.08] bg-[#161B28] p-8 space-y-3">
          <p className="text-xs font-semibold tracking-wider text-[#FF6F26]">Our Vision</p>
          <h2 className="font-display text-2xl font-bold text-[#F8FAFC]">
            Building Karachi’s Next Generation of Representative Athletes
          </h2>
          <p className="text-sm sm:text-base leading-relaxed text-[#94A3B8]">
            To produce club, provincial, and national-caliber volleyball players—both young men
            and young women—who carry athletic integrity on and off the court.
          </p>
        </div>
      </section>

      {/* Core Values */}
      <section className="space-y-8">
        <div className="max-w-2xl space-y-2">
          <p className="text-xs font-semibold tracking-wider text-[#FF6F26]">Core Values</p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#F8FAFC]">
            Four Pillars of Every Training Session
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CORE_VALUES.map((val) => (
            <div
              key={val.index}
              className="rounded-[14px] border border-white/[0.08] bg-[#161B28] p-6 space-y-3"
            >
              <p className="font-mono-code text-xs font-semibold text-[#FF6F26]">{val.index}</p>
              <h3 className="font-display text-xl font-bold text-[#F8FAFC]">{val.title}</h3>
              <p className="text-sm leading-relaxed text-[#94A3B8]">{val.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Court Culture & Safety */}
      <section className="rounded-[14px] border border-white/[0.08] bg-[#111520] p-8 sm:p-10 grid grid-cols-1 gap-8 lg:grid-cols-12 items-center">
        <div className="lg:col-span-7 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#10B981]">
            <Shield className="h-4 w-4" strokeWidth={1.75} />
            Safe &amp; Supervised Court Environment
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#F8FAFC]">
            Parental Confidence &amp; Minor Protection Standards
          </h2>
          <p className="text-sm sm:text-base leading-relaxed text-[#94A3B8]">
            Every student under 18 requires verified parent or legal guardian authorization prior
            to court induction. Girls and junior boys train in scheduled, coach-supervised
            sessions with mandatory warm-ups, hydration breaks, and injury-prevention footwork.
          </p>
        </div>
        <div className="lg:col-span-5 space-y-3">
          {[
            'Dedicated girls training slots with direct supervision',
            'Mandatory emergency contact & guardian consent for minors',
            'Progressive jump-landing and ankle-stability drills',
            'Zero-tolerance policy for unsportsmanlike conduct',
          ].map((item) => (
            <div
              key={item}
              className="flex items-start gap-3 rounded-lg border border-white/[0.07] bg-[#161B28] px-4 py-3 text-sm text-[#CBD5E1]"
            >
              <CheckCircle2
                className="mt-0.5 h-4 w-4 shrink-0 text-[#10B981]"
                strokeWidth={1.75}
              />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
