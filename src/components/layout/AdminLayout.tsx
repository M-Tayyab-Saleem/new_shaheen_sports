import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { ExternalLink, LogOut } from 'lucide-react';
import { checkAdminSession, logoutAdmin } from '../../services/api';
import { AcademyLogo } from '../common/AcademyLogo';

export function AdminLayout() {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);
  const [username, setUsername] = useState<string>('');
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    let active = true;
    checkAdminSession()
      .then((res) => {
        if (!active) return;
        if (!res.authenticated) {
          navigate('/admin/login', { replace: true });
          return;
        }
        setUsername(res.username || 'admin');
        setChecking(false);
      })
      .catch(() => {
        if (active) navigate('/admin/login', { replace: true });
      });

    return () => {
      active = false;
    };
  }, [navigate]);

  async function handleLogout() {
    setLoggingOut(true);
    try {
      await logoutAdmin();
    } finally {
      navigate('/admin/login', { replace: true });
    }
  }

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#080A0F] text-[#94A3B8]">
        <div className="flex flex-col items-center gap-3">
          <div className="h-7 w-7 animate-spin rounded-full border-2 border-[#FF5500] border-t-transparent" />
          <span className="text-sm font-medium">Verifying administrative session...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#080A0F] text-[#F8FAFC]">
      <header className="sticky top-0 z-30 h-16 border-b border-white/[0.08] bg-[#111520]/95 backdrop-blur-md">
        <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between gap-6 px-5 md:px-8">
          <div className="flex items-center gap-6 min-w-0">
            <Link
              to="/admin"
              className="inline-flex items-center gap-2.5 font-display text-base font-bold tracking-tight text-[#F8FAFC] whitespace-nowrap shrink-0"
            >
              <AcademyLogo variant="compact" />
              <span>New Shaheen Sports</span>
            </Link>
            <span className="hidden sm:inline text-xs text-[#64748B]" aria-hidden="true">
              /
            </span>
            <nav aria-label="Admin Navigation" className="flex items-center gap-5 text-sm">
              <NavLink
                to="/admin"
                end
                className={({ isActive }) =>
                  `whitespace-nowrap shrink-0 font-medium transition-colors ${
                    isActive ? 'text-[#FF6F26]' : 'text-[#94A3B8] hover:text-[#F8FAFC]'
                  }`
                }
              >
                Overview
              </NavLink>
              <NavLink
                to="/admin/applications"
                className={({ isActive }) =>
                  `whitespace-nowrap shrink-0 font-medium transition-colors ${
                    isActive ? 'text-[#FF6F26]' : 'text-[#94A3B8] hover:text-[#F8FAFC]'
                  }`
                }
              >
                Applications
              </NavLink>
            </nav>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <span className="hidden md:inline text-xs text-[#94A3B8]">
              Signed in as <strong className="text-[#F8FAFC]">{username}</strong>
            </span>
            <Link
              to="/"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-[#94A3B8] hover:text-[#F8FAFC] hover:border-white/20 transition-colors whitespace-nowrap shrink-0"
            >
              Public Site
              <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.75} />
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              disabled={loggingOut}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#EF4444]/30 bg-[#EF4444]/10 px-3 py-1.5 text-xs font-semibold text-[#F87171] hover:bg-[#EF4444]/20 transition-colors whitespace-nowrap shrink-0 disabled:opacity-50"
            >
              <LogOut className="h-3.5 w-3.5" strokeWidth={1.75} />
              {loggingOut ? 'Signing Out...' : 'Sign Out'}
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 mx-auto w-full max-w-[1440px] px-5 py-8 md:px-8">
        <Outlet />
      </main>
    </div>
  );
}
