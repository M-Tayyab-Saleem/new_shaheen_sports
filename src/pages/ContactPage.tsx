import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Clock,
  ExternalLink,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
} from 'lucide-react';
import { ACADEMY_INFO } from '../data/academyData';
import { AcademyLogo } from '../components/common/AcademyLogo';

export function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 lg:px-10 space-y-14">
      <header className="flex flex-col sm:flex-row sm:items-center gap-6 max-w-4xl">
        <AcademyLogo variant="large" />
        <div className="space-y-3">
          <p className="text-xs font-semibold tracking-wider text-[#FF6F26]">
            Contact &amp; Ground Desk
          </p>
          <h1 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-[#F8FAFC]">
            Direct Communication With New Shaheen Sports
          </h1>
          <p className="text-base sm:text-lg leading-relaxed text-[#94A3B8]">
            Reach academy management directly via telephone or WhatsApp on either official academy
            line, or submit your membership application online.
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-[14px] border border-white/[0.08] bg-[#161B28] p-7 space-y-4">
          <Phone className="h-6 w-6 text-[#FF5500]" strokeWidth={1.75} />
          <div className="space-y-1">
            <h2 className="font-display text-lg font-bold text-[#F8FAFC]">Direct Phone Lines</h2>
            <p className="text-sm text-[#94A3B8]">
              Call during academy hours for ground directions, coaching inquiries, or batch
              verification.
            </p>
          </div>
          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs text-[#64748B]">Primary Desk</span>
              <a
                href={`tel:${ACADEMY_INFO.phoneDisplay.replace(/\s/g, '')}`}
                className="font-mono-code text-sm font-semibold text-[#F8FAFC] hover:text-[#FF6F26] transition-colors tabular-nums"
              >
                {ACADEMY_INFO.phoneDisplay}
              </a>
            </div>
            <div className="flex items-center justify-between gap-2 border-t border-white/[0.06] pt-2">
              <span className="text-xs text-[#64748B]">Coach Kausar Ali Tirmizi</span>
              <a
                href={`tel:${ACADEMY_INFO.secondaryPhoneDisplay.replace(/\s/g, '')}`}
                className="font-mono-code text-sm font-semibold text-[#F8FAFC] hover:text-[#FF6F26] transition-colors tabular-nums"
              >
                {ACADEMY_INFO.secondaryPhoneDisplay}
              </a>
            </div>
          </div>
        </div>

        <div className="rounded-[14px] border border-white/[0.08] bg-[#161B28] p-7 space-y-4">
          <MessageCircle className="h-6 w-6 text-[#10B981]" strokeWidth={1.75} />
          <div className="space-y-1">
            <h2 className="font-display text-lg font-bold text-[#F8FAFC]">WhatsApp Desks</h2>
            <p className="text-sm text-[#94A3B8]">
              Message academy coordinators directly on WhatsApp with your application reference.
            </p>
          </div>
          <div className="flex flex-col gap-2.5 pt-1">
            <a
              href={ACADEMY_INFO.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-between gap-2 rounded-lg border border-white/15 bg-white/[0.04] px-4 py-2.5 text-xs font-semibold text-[#F8FAFC] hover:border-white/30 transition-colors"
            >
              <span>WhatsApp · {ACADEMY_INFO.phoneDisplay}</span>
              <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.75} />
            </a>
            <a
              href={ACADEMY_INFO.secondaryWhatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-between gap-2 rounded-lg border border-white/15 bg-white/[0.04] px-4 py-2.5 text-xs font-semibold text-[#F8FAFC] hover:border-white/30 transition-colors"
            >
              <span>WhatsApp · {ACADEMY_INFO.secondaryPhoneDisplay}</span>
              <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.75} />
            </a>
          </div>
        </div>

        <div className="rounded-[14px] border border-white/[0.08] bg-[#161B28] p-7 space-y-4">
          <MapPin className="h-6 w-6 text-[#00E5FF]" strokeWidth={1.75} />
          <div className="space-y-1">
            <h2 className="font-display text-lg font-bold text-[#F8FAFC]">Academy Ground</h2>
            <p className="text-sm text-[#94A3B8]">{ACADEMY_INFO.address}</p>
          </div>
          <a
            href={ACADEMY_INFO.mapsQueryUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#00E5FF] hover:underline"
          >
            Google Maps Directions
            <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.75} />
          </a>
        </div>
      </div>

      {/* Unified Application Funnel Notice */}
      <section className="rounded-[14px] border border-white/[0.08] bg-[#111520] p-8 sm:p-10 grid grid-cols-1 gap-8 lg:grid-cols-12 items-center">
        <div className="lg:col-span-8 space-y-3">
          <p className="inline-flex items-center gap-2 text-xs font-semibold text-[#00E5FF]">
            <ShieldCheck className="h-4 w-4" strokeWidth={1.75} />
            Centralized Membership Admissions
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#F8FAFC]">
            Looking to Join Training? Apply Online in Minutes.
          </h2>
          <p className="text-sm sm:text-base leading-relaxed text-[#94A3B8]">
            To prevent lost inquiries, New Shaheen Sports processes all new athlete admissions
            through a single centralized application form. Submitting online generates an official
            reference code and allows coaches to evaluate your profile before your trial session.
          </p>
          <div className="flex items-center gap-2 pt-1 text-xs text-[#94A3B8]">
            <Clock className="h-4 w-4 text-[#FF5500]" strokeWidth={1.75} />
            <span>Ground Visiting Hours: Monday – Saturday, 4:00 PM – 8:30 PM</span>
          </div>
        </div>
        <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
          <Link
            to="/apply"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#FF5500] px-6 py-3.5 text-sm font-semibold text-white hover:bg-[#FF6F26] transition-colors"
          >
            Go to Membership Application
            <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
          </Link>
          <a
            href={ACADEMY_INFO.facebookUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-[#F8FAFC] hover:border-white/30 transition-colors"
          >
            Follow Volleyball by Ammar
            <ExternalLink className="h-4 w-4" strokeWidth={1.75} />
          </a>
        </div>
      </section>
    </div>
  );
}
