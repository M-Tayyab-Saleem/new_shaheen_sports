import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { ArrowRight, ExternalLink, MapPin, Menu, Phone, X } from 'lucide-react';
import { ACADEMY_INFO } from '../../data/academyData';
import { AcademyLogo } from '../common/AcademyLogo';

const TOP_NAV_LINKS = [
  { to: '/about', label: 'About' },
  { to: '/training', label: 'Training' },
  { to: '/coaches', label: 'Coaches' },
  { to: '/schedule', label: 'Schedule' },
  { to: '/contact', label: 'Contact' },
];

const ALL_PUBLIC_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/training', label: 'Training & Programs' },
  { to: '/coaches', label: 'Coaches' },
  { to: '/founder', label: 'Founder' },
  { to: '/schedule', label: 'Schedule & Location' },
  { to: '/contact', label: 'Contact' },
  { to: '/privacy', label: 'Privacy Policy' },
];

export function PublicLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mobileMenuOpen]);

  return (
    <div className="min-h-screen flex flex-col bg-[#080A0F] text-[#F8FAFC]">
      <header className="sticky top-0 z-40 h-[72px] border-b border-white/[0.08] bg-[#080A0F]/90 backdrop-blur-md">
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-8 px-5 md:px-8 lg:px-10">
          {/* Zone 1: Clean wordmark with official crest */}
          <Link
            to="/"
            className="inline-flex items-center gap-2.5 font-display text-base sm:text-lg font-extrabold tracking-tight text-[#F8FAFC] whitespace-nowrap shrink-0 hover:text-white transition-colors"
          >
            <AcademyLogo variant="compact" />
            <span>New Shaheen Sports</span>
          </Link>

          {/* Zone 2: 5 concise single-line text links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-[#94A3B8]"
          >
            {TOP_NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `relative py-1 whitespace-nowrap shrink-0 transition-colors hover:text-[#F8FAFC] ${
                    isActive
                      ? 'text-[#F8FAFC] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#FF5500]'
                      : ''
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Zone 3: 1 primary CTA + mobile drawer toggle */}
          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/apply"
              className="hidden sm:inline-flex items-center justify-center rounded-lg bg-[#FF5500] px-5 py-2.5 text-sm font-semibold text-white whitespace-nowrap shrink-0 transition-all duration-150 hover:bg-[#FF6F26] hover:-translate-y-0.5 shadow-[0_4px_16px_rgba(255,85,0,0.22)]"
            >
              Apply Now
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              className="md:hidden inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-[#111520] text-[#F8FAFC] hover:border-white/25 transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" strokeWidth={1.75} />
              ) : (
                <Menu className="h-5 w-5" strokeWidth={1.75} />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 top-[72px] z-30 bg-[#080A0F]/98 backdrop-blur-lg md:hidden overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
        >
          <nav className="flex flex-col px-6 py-8 gap-2">
            {ALL_PUBLIC_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `flex items-center justify-between rounded-lg px-4 py-3.5 text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-[#161B28] text-[#F8FAFC] border border-white/10'
                      : 'text-[#94A3B8] hover:bg-[#111520] hover:text-[#F8FAFC]'
                  }`
                }
              >
                <span>{link.label}</span>
                <ArrowRight className="h-4 w-4 text-[#64748B]" strokeWidth={1.75} />
              </NavLink>
            ))}

            <div className="mt-6 pt-6 border-t border-white/[0.08]">
              <Link
                to="/apply"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#FF5500] px-6 py-3.5 text-base font-semibold text-white hover:bg-[#FF6F26] transition-colors"
              >
                Apply for Academy
                <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
              </Link>
            </div>
          </nav>
        </div>
      )}

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-white/[0.08] bg-[#111520]">
        <div className="mx-auto max-w-7xl px-5 py-14 md:px-8 lg:px-10">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
            <div className="md:col-span-5 space-y-4">
              <Link
                to="/"
                className="inline-flex items-center gap-3.5 font-display text-xl font-extrabold tracking-tight text-[#F8FAFC]"
              >
                <AcademyLogo variant="emblem" />
                <span>New Shaheen Sports</span>
              </Link>
              <p className="max-w-md text-sm leading-relaxed text-[#94A3B8]">
                Structured volleyball academy in Karachi developing boys and girls across
                beginner, intermediate, and competitive squad pathways under Syed Ammar Ali,
                Syed Kausar Ali Tirmizi, and Syed Akbar Ali.
              </p>
              <div className="space-y-2 pt-1 text-sm text-[#94A3B8]">
                <p className="flex items-start gap-2.5">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#FF5500]" strokeWidth={1.75} />
                  <span>{ACADEMY_INFO.address}</span>
                </p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
                  <p className="flex items-center gap-2">
                    <Phone className="h-4 w-4 shrink-0 text-[#FF5500]" strokeWidth={1.75} />
                    <a
                      href={`tel:${ACADEMY_INFO.phoneDisplay.replace(/\s/g, '')}`}
                      className="hover:text-[#F8FAFC] transition-colors tabular-nums"
                    >
                      {ACADEMY_INFO.phoneDisplay}
                    </a>
                  </p>
                  <span className="text-[#475569]" aria-hidden="true">/</span>
                  <p className="flex items-center gap-2">
                    <a
                      href={`tel:${ACADEMY_INFO.secondaryPhoneDisplay.replace(/\s/g, '')}`}
                      className="hover:text-[#F8FAFC] transition-colors tabular-nums"
                    >
                      {ACADEMY_INFO.secondaryPhoneDisplay}
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div className="md:col-span-3 space-y-3">
              <h2 className="font-display text-sm font-bold text-[#F8FAFC]">Academy</h2>
              <ul className="space-y-2.5 text-sm text-[#94A3B8]">
                <li>
                  <Link to="/about" className="hover:text-[#F8FAFC] transition-colors">
                    About the Academy
                  </Link>
                </li>
                <li>
                  <Link to="/training" className="hover:text-[#F8FAFC] transition-colors">
                    Training &amp; Programs
                  </Link>
                </li>
                <li>
                  <Link to="/coaches" className="hover:text-[#F8FAFC] transition-colors">
                    Coaching Staff
                  </Link>
                </li>
                <li>
                  <Link to="/founder" className="hover:text-[#F8FAFC] transition-colors">
                    Founder Story
                  </Link>
                </li>
                <li>
                  <Link to="/schedule" className="hover:text-[#F8FAFC] transition-colors">
                    Schedule &amp; Ground
                  </Link>
                </li>
              </ul>
            </div>

            <div className="md:col-span-4 space-y-3">
              <h2 className="font-display text-sm font-bold text-[#F8FAFC]">
                Membership &amp; Connect
              </h2>
              <ul className="space-y-2.5 text-sm text-[#94A3B8]">
                <li>
                  <Link to="/apply" className="font-medium text-[#FF6F26] hover:text-[#FF5500] transition-colors">
                    Membership Application Form
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-[#F8FAFC] transition-colors">
                    Ground Directions &amp; Contact
                  </Link>
                </li>
                <li>
                  <a
                    href={ACADEMY_INFO.whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 hover:text-[#F8FAFC] transition-colors"
                  >
                    WhatsApp Admissions
                    <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.75} />
                  </a>
                </li>
                <li>
                  <a
                    href={ACADEMY_INFO.facebookUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 hover:text-[#F8FAFC] transition-colors"
                  >
                    Volleyball by Ammar (Facebook)
                    <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.75} />
                  </a>
                </li>
                <li>
                  <Link to="/privacy" className="hover:text-[#F8FAFC] transition-colors">
                    Privacy &amp; Minor Data Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-4 border-t border-white/[0.08] pt-6 sm:flex-row sm:items-center sm:justify-between text-xs text-[#64748B]">
            <p>
              &copy; {new Date().getFullYear()} New Shaheen Sports Volleyball Academy. Karachi,
              Pakistan.
            </p>
            <div className="flex items-center gap-6">
              <Link to="/privacy" className="hover:text-[#94A3B8] transition-colors">
                Privacy Policy
              </Link>
              <Link to="/admin/login" className="hover:text-[#94A3B8] transition-colors">
                Admin Console
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
