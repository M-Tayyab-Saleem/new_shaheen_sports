import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AlertCircle, ArrowLeft, Lock } from 'lucide-react';
import { checkAdminSession, loginAdmin } from '../../services/api';
import { AcademyLogo } from '../../components/common/AcademyLogo';

export function AdminLoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    checkAdminSession()
      .then((res) => {
        if (res.authenticated) {
          navigate('/admin', { replace: true });
        }
      })
      .catch(() => {});
  }, [navigate]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!username.trim() || !password) {
      setError('Enter both administrator username and password.');
      return;
    }

    setSubmitting(true);
    try {
      await loginAdmin(username.trim(), password);
      navigate('/admin', { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#080A0F] px-5 py-12 text-[#F8FAFC]">
      <div className="w-full max-w-md space-y-6">
        <div className="space-y-3 text-center">
          <div className="flex justify-center">
            <AcademyLogo variant="emblem" />
          </div>
          <p className="font-display text-sm font-bold tracking-wide text-[#FF6F26]">
            New Shaheen Sports
          </p>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-[#F8FAFC]">
            Administration Console
          </h1>
          <p className="text-sm text-[#94A3B8]">
            Sign in to review athlete membership applications and private documents.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-[14px] border border-white/[0.08] bg-[#161B28] p-7 space-y-5"
        >
          {error && (
            <div
              role="alert"
              className="flex items-start gap-2.5 rounded-lg border border-[#EF4444]/40 bg-[#EF4444]/10 p-3.5 text-xs font-medium text-[#FCA5A5]"
            >
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#EF4444]" strokeWidth={1.75} />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="admin-username" className="block text-sm font-semibold text-[#F8FAFC]">
              Username
            </label>
            <input
              id="admin-username"
              type="text"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              className="w-full h-[46px] rounded-lg border border-white/12 bg-[#0D111A] px-3.5 text-sm text-[#F8FAFC] placeholder-[#64748B] focus:outline-none focus:border-[#FF5500] focus:ring-2 focus:ring-[#FF5500]/20"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="admin-password" className="block text-sm font-semibold text-[#F8FAFC]">
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full h-[46px] rounded-lg border border-white/12 bg-[#0D111A] px-3.5 text-sm text-[#F8FAFC] placeholder-[#64748B] focus:outline-none focus:border-[#FF5500] focus:ring-2 focus:ring-[#FF5500]/20"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#FF5500] px-6 py-3 text-sm font-semibold text-white hover:bg-[#FF6F26] transition-colors disabled:opacity-60"
          >
            <Lock className="h-4 w-4" strokeWidth={1.75} />
            {submitting ? 'Authenticating...' : 'Sign In to Console'}
          </button>
        </form>

        <div className="text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#94A3B8] hover:text-[#F8FAFC] transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.75} />
            Return to Public Academy Website
          </Link>
        </div>
      </div>
    </div>
  );
}
