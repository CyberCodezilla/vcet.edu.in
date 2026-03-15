import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminLogin: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from =
    (location.state as { from?: { pathname: string } })?.from?.pathname ??
    "/admin";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login({ username, password, remember });
      navigate(from, { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white font-sans text-slate-900">
      {/* ── Left Section: Branding ─────────────────────────────────────────── */}
      <div className="hidden lg:flex lg:w-[55%] bg-[#0f172a] relative overflow-hidden flex-col justify-between p-20 select-none">
        {/* Dot Grid Overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(#fff 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* Top: Logo/Icon */}
        <div className="relative z-10">
          <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-2xl">
            <img
              src="/images/VCET logo.jpeg "
              alt="VCET LOGO"
              className="w-10 h-10"
            />
          </div>
        </div>

        {/* Center: Hero Text */}
        <div className="relative z-10 max-w-lg">
          <h1 className="text-white text-6xl md:text-7xl font-serif leading-[1.1] tracking-tight">
            VCET:
            <br />
            <span className="text-slate-400 italic">Empowering</span>
            <br />
            Administration
          </h1>
          <p className="mt-8 text-slate-400 text-lg leading-relaxed max-w-sm">
            Centralized command for college operations. Manage students,
            faculty, and institutional data with precision.
          </p>
        </div>

        {/* Bottom: Versioning */}
        <div className="relative z-10 flex items-center gap-6">
          <div className="h-px w-12 bg-slate-700" />
          <span className="text-slate-500 text-[10px] uppercase tracking-[0.4em] font-bold">
            Admin Portal V1.0
          </span>
        </div>
      </div>

      {/* ── Right Section: Login Form ─────────────────────────────────────── */}
      <div className="w-full lg:w-[45%] flex flex-col justify-center px-8 sm:px-12 md:px-20 lg:px-24 xl:px-32">
        <div className="w-full max-w-sm mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h2 className="text-3xl font-black tracking-tight text-slate-900 mb-2">
              Administrator Login
            </h2>
            <p className="text-slate-400 font-medium">
              Welcome back. Please authenticate to proceed.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Email Address */}
            <div className="space-y-3">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#0f172a] transition-colors">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  placeholder="admin@vcet.edu"
                  className="w-full bg-[#f8fafc] border-0 ring-1 ring-slate-100 focus:ring-2 focus:ring-[#0f172a] rounded-[1.25rem] pl-14 pr-6 py-4.5 text-sm transition-all outline-none font-medium placeholder:text-slate-300"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-3">
              <div className="flex items-center justify-between px-1">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                  Password
                </label>
                <Link
                  to="#"
                  className="text-[10px] font-black text-blue-600 uppercase tracking-wider hover:text-blue-700 transition-colors"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="relative group">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#0f172a] transition-colors">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full bg-[#f8fafc] border-0 ring-1 ring-slate-100 focus:ring-2 focus:ring-[#0f172a] rounded-[1.25rem] pl-14 pr-14 py-4.5 text-sm transition-all outline-none font-medium placeholder:text-slate-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.046m4.596-4.596A9.964 9.964 0 0112 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      <path d="M3 3l18 18" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-100 rounded-2xl px-5 py-4 flex items-center gap-3 text-red-600 animate-shake">
                <svg
                  className="w-5 h-5 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span className="text-[10px] font-black uppercase tracking-wide">
                  {error}
                </span>
              </div>
            )}

            {/* Remember & Settings */}
            <div className="flex items-center ml-1">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center justify-center">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="peer sr-only"
                  />
                  <div className="w-5 h-5 border-2 border-slate-200 rounded-full group-hover:border-slate-400 peer-checked:border-[#0f172a] peer-checked:bg-[#0f172a] transition-all" />
                  <svg
                    className="absolute w-3 h-3 text-white scale-0 peer-checked:scale-100 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={4}
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-xs font-bold text-slate-500 group-hover:text-slate-800 transition-colors">
                  Remember session
                </span>
              </label>
            </div>

            {/* Action Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1e3a8a] hover:bg-[#1e40af] disabled:opacity-50 text-white font-black py-5 rounded-[1.25rem] text-[10px] uppercase tracking-[0.2em] transition-all shadow-xl shadow-blue-100 hover:shadow-2xl hover:shadow-blue-200 hover:-translate-y-1 active:translate-y-0.5"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-3">
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  <span>Authenticating...</span>
                </div>
              ) : (
                "Access VCET Dashboard"
              )}
            </button>
          </form>

          {/* Footer Info */}
          <div className="mt-20 pt-10 border-t border-slate-100/60 text-center">
            <div className="flex items-center justify-center gap-2 text-[#2563eb] mb-3">
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                viewBox="0 0 24 24"
              >
                <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-[10px] font-black uppercase tracking-widest">
                Single Sign-On Secure
              </span>
            </div>
            <p className="text-[10px] text-slate-300 font-bold uppercase tracking-tighter leading-relaxed">
              &copy; VCET Administration Portal. <br />
              Authorized access only. Private system.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&display=swap');
        .font-serif { font-family: 'Playfair Display', serif; }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
        .animate-shake { animation: shake 0.4s ease-in-out; }

        input::placeholder { font-weight: 500; font-size: 0.875rem; }
        .py-4.5 { padding-top: 1.125rem; padding-bottom: 1.125rem; }
      `}</style>
    </div>
  );
};

export default AdminLogin;
