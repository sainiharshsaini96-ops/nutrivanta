import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';

export const AuthModal = () => {
  const {
    isAuthenticated,
    authMode,
    isLoading,
    authError,
    register,
    login,
    switchAuthMode,
    setAuthError
  } = useAuth();

  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const firstInputRef = useRef(null);

  // Reset form when mode switches
  useEffect(() => {
    setForm({ name: '', email: '', password: '' });
    setShowPassword(false);
    setSuccessMsg('');
    setTimeout(() => firstInputRef.current?.focus(), 150);
  }, [authMode]);

  // Don't render if already authenticated
  if (isAuthenticated) return null;

  const handleChange = (e) => {
    setAuthError(null);
    setSuccessMsg('');
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg('');

    // Client-side validation
    if (isSignup) {
      if (!form.name.trim()) {
        setAuthError('Please enter your full name.');
        return;
      }
      if (form.password.length < 6) {
        setAuthError('Password must be at least 6 characters.');
        return;
      }
    } else {
      if (!form.email.trim()) {
        setAuthError('Please enter your email address.');
        return;
      }
      if (!form.password) {
        setAuthError('Please enter your password.');
        return;
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setAuthError('Please enter a valid email address.');
      return;
    }

    let result;
    if (isSignup) {
      result = await register({ name: form.name, email: form.email, password: form.password });
    } else {
      result = await login({ email: form.email, password: form.password });
    }

    if (result?.success) {
      setSuccessMsg(result.message);
    }
  };

  const isSignup = authMode === 'signup';

  return (
    // Full-screen mandatory auth wall — NO backdrop click to close, NO escape to close
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto">
      {/* Blurred background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 animate-fadeIn">
        {/* Decorative blobs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/20 rounded-full blur-3xl opacity-60" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-tertiary/10 rounded-full blur-2xl" />
      </div>

      {/* Modal Card */}
      <div className="relative w-full max-w-md my-auto animate-slideUp">
        {/* Brand header above card */}
        <div className="flex flex-col items-center mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
              <span className="material-symbols-outlined text-on-primary text-[22px]">bolt</span>
            </div>
            <span className="text-2xl font-black text-white tracking-tight">ElectroMart</span>
          </div>
          <p className="text-slate-400 text-sm">Your premium electronics destination</p>
        </div>

        <div className="bg-white dark:bg-surface rounded-3xl shadow-2xl overflow-hidden border border-white/10">
          {/* Gradient top strip */}
          <div className="h-1 w-full bg-gradient-to-r from-primary via-secondary to-tertiary" />

          <div className="px-8 pt-7 pb-8">
            {/* Tab switcher */}
            <div className="flex bg-slate-100 rounded-2xl p-1 mb-7">
              <button
                type="button"
                onClick={() => switchAuthMode('signin')}
                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  !isSignup
                    ? 'bg-white text-on-surface shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                id="switch-to-signup-btn"
                onClick={() => switchAuthMode('signup')}
                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isSignup
                    ? 'bg-white text-on-surface shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Title */}
            <div className="mb-6">
              <h2 className="text-xl font-bold text-on-surface">
                {isSignup ? 'Create your account' : 'Welcome back! 👋'}
              </h2>
              <p className="text-sm text-on-surface-variant mt-1">
                {isSignup
                  ? 'Join thousands of happy shoppers'
                  : 'Sign in to continue to ElectroMart'}
              </p>
            </div>

            {/* Success message */}
            {successMsg && (
              <div className="mb-5 flex items-center gap-3 p-3.5 rounded-xl bg-green-50 border border-green-200">
                <span className="material-symbols-outlined text-[18px] text-green-600 flex-shrink-0">check_circle</span>
                <p className="text-sm text-green-700 font-medium">{successMsg}</p>
              </div>
            )}

            {/* Error message */}
            {authError && (
              <div className="mb-5 flex items-center gap-3 p-3.5 rounded-xl bg-red-50 border border-red-200">
                <span className="material-symbols-outlined text-[18px] text-red-500 flex-shrink-0">error</span>
                <p className="text-sm text-red-600 font-medium">{authError}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
              {/* Name field — signup only */}
              {isSignup && (
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-on-surface-variant" htmlFor="auth-name">
                    Full Name
                  </label>
                  <div className="flex items-center gap-3 h-12 bg-slate-50 rounded-xl border border-slate-200 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/15 transition-all px-4">
                    <span className="material-symbols-outlined text-[18px] text-slate-400">person</span>
                    <input
                      ref={isSignup ? firstInputRef : undefined}
                      id="auth-name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Alex Morgan"
                      autoComplete="name"
                      className="flex-1 bg-transparent text-sm text-on-surface placeholder:text-slate-400 focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* Email field */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-on-surface-variant" htmlFor="auth-email">
                  Email Address
                </label>
                <div className="flex items-center gap-3 h-12 bg-slate-50 rounded-xl border border-slate-200 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/15 transition-all px-4">
                  <span className="material-symbols-outlined text-[18px] text-slate-400">mail</span>
                  <input
                    ref={!isSignup ? firstInputRef : undefined}
                    id="auth-email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    autoComplete="email"
                    className="flex-1 bg-transparent text-sm text-on-surface placeholder:text-slate-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Password field */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-on-surface-variant" htmlFor="auth-password">
                  Password
                </label>
                <div className="flex items-center gap-3 h-12 bg-slate-50 rounded-xl border border-slate-200 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/15 transition-all px-4">
                  <span className="material-symbols-outlined text-[18px] text-slate-400">lock</span>
                  <input
                    id="auth-password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={form.password}
                    onChange={handleChange}
                    placeholder={isSignup ? 'At least 6 characters' : '••••••••'}
                    autoComplete={isSignup ? 'new-password' : 'current-password'}
                    className="flex-1 bg-transparent text-sm text-on-surface placeholder:text-slate-400 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(p => !p)}
                    className="text-slate-400 hover:text-on-surface transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
                {isSignup && form.password && (
                  <PasswordStrength password={form.password} />
                )}
              </div>

              {/* Submit button */}
              <button
                type="submit"
                id={isSignup ? 'signup-submit-btn' : 'signin-submit-btn'}
                disabled={isLoading}
                className="mt-2 h-12 rounded-xl bg-primary text-on-primary font-bold text-sm flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-primary/25"
              >
                {isLoading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-on-primary/30 border-t-on-primary rounded-full animate-spin" />
                    {isSignup ? 'Creating account...' : 'Signing in...'}
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[18px]">
                      {isSignup ? 'person_add' : 'login'}
                    </span>
                    {isSignup ? 'Create Account' : 'Sign In'}
                  </>
                )}
              </button>
            </form>

            {/* Terms for signup */}
            {isSignup && (
              <p className="text-center text-xs text-on-surface-variant mt-5 leading-relaxed">
                By creating an account, you agree to our{' '}
                <span className="text-primary cursor-pointer hover:underline">Terms of Service</span>{' '}
                and{' '}
                <span className="text-primary cursor-pointer hover:underline">Privacy Policy</span>.
              </p>
            )}
          </div>
        </div>

        {/* Footer note */}
        <p className="text-center text-xs text-slate-500 mt-4">
          🔒 Your data is encrypted and secure
        </p>
      </div>
    </div>
  );
};

// Password strength indicator
const PasswordStrength = ({ password }) => {
  const getStrength = (pwd) => {
    let score = 0;
    if (pwd.length >= 6) score++;
    if (pwd.length >= 10) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    return score;
  };

  const strength = getStrength(password);
  const labels = ['', 'Very Weak', 'Weak', 'Fair', 'Strong', 'Very Strong'];
  const colors = ['', 'bg-red-500', 'bg-orange-400', 'bg-yellow-400', 'bg-green-400', 'bg-green-600'];
  const textColors = ['', 'text-red-500', 'text-orange-400', 'text-yellow-500', 'text-green-600', 'text-green-700'];

  return (
    <div className="flex items-center gap-2 mt-1.5">
      <div className="flex-1 flex gap-1">
        {[1, 2, 3, 4, 5].map(i => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= strength ? colors[strength] : 'bg-slate-200'}`}
          />
        ))}
      </div>
      <span className={`text-xs font-medium ${textColors[strength]}`}>
        {labels[strength]}
      </span>
    </div>
  );
};

export default AuthModal;
