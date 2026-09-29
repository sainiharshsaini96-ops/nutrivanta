import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function SignInModal() {
  const { isSignInOpen, setIsSignInOpen, signIn, showToast } = useApp();
  const [tab, setTab] = useState('signin'); // 'signin' | 'signup'
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);

  if (!isSignInOpen) return null;

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      showToast('Please fill in all required fields.', 'error');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      signIn({ name: form.name || form.email.split('@')[0], email: form.email });
      setLoading(false);
      setIsSignInOpen(false);
      showToast(tab === 'signup' ? 'Account created! Welcome to NutriVanta 🎉' : 'Welcome back! Signed in successfully ✅');
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setIsSignInOpen(false)}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-md bg-surface dark:bg-inverse-surface rounded-3xl shadow-2xl border border-surface-variant overflow-hidden animate-fade-in-up">

        {/* Header gradient bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-primary via-emerald-400 to-teal-500" />

        <div className="p-8">
          {/* Logo + Title */}
          <div className="flex flex-col items-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-brand-mint flex items-center justify-center mb-3 shadow-md">
              <span className="material-symbols-outlined text-primary text-3xl">nutrition</span>
            </div>
            <h2 className="text-headline-md font-bold text-on-surface dark:text-inverse-on-surface">
              {tab === 'signin' ? 'Welcome back' : 'Create account'}
            </h2>
            <p className="text-sm text-on-surface-variant mt-1">
              {tab === 'signin' ? 'Sign in to your NutriVanta account' : 'Start your health journey today'}
            </p>
          </div>

          {/* Tabs */}
          <div className="flex bg-surface-container-low dark:bg-surface-container rounded-xl p-1 mb-6">
            {['signin', 'signup'].map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
                  tab === t
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {t === 'signin' ? 'Sign In' : 'Sign Up'}
              </button>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {tab === 'signup' && (
              <div>
                <label className="block text-xs font-semibold text-on-surface-variant mb-1.5 uppercase tracking-wider">
                  Full Name
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">person</span>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-surface-container-low dark:bg-surface-container border border-surface-variant focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm text-on-surface transition-all"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-on-surface-variant mb-1.5 uppercase tracking-wider">
                Email Address
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">mail</span>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-surface-container-low dark:bg-surface-container border border-surface-variant focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm text-on-surface transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-on-surface-variant mb-1.5 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">lock</span>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-surface-container-low dark:bg-surface-container border border-surface-variant focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm text-on-surface transition-all"
                />
              </div>
            </div>

            {tab === 'signin' && (
              <div className="text-right">
                <button type="button" className="text-xs text-primary font-semibold hover:underline">
                  Forgot password?
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-primary text-white font-bold text-sm hover:opacity-90 hover:shadow-lg transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-70"
            >
              {loading ? (
                <span className="material-symbols-outlined animate-spin text-lg">progress_activity</span>
              ) : (
                <>
                  <span className="material-symbols-outlined text-lg">
                    {tab === 'signin' ? 'login' : 'person_add'}
                  </span>
                  {tab === 'signin' ? 'Sign In' : 'Create Account'}
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-surface-variant" />
            <span className="text-xs text-on-surface-variant font-medium">or continue with</span>
            <div className="flex-1 h-px bg-surface-variant" />
          </div>

          {/* Google SSO (decorative) */}
          <button
            type="button"
            onClick={() => {
              setLoading(true);
              setTimeout(() => {
                signIn({ name: 'Google User', email: 'user@gmail.com' });
                setLoading(false);
                setIsSignInOpen(false);
                showToast('Signed in with Google ✅');
              }, 800);
            }}
            className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-surface-variant bg-surface hover:bg-surface-container-low transition-all text-sm font-semibold text-on-surface"
          >
            <svg width="18" height="18" viewBox="0 0 48 48">
              <path fill="#FFC107" d="M43.6 20H24v8h11.3C33.6 33.1 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.5 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 19.6-8 19.6-20 0-1.3-.1-2.7-.4-4z"/>
              <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 16 19 13 24 13c3 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.5 29.3 4 24 4 16.3 4 9.6 8.3 6.3 14.7z"/>
              <path fill="#4CAF50" d="M24 44c5.2 0 9.9-1.9 13.5-5l-6.2-5.2C29.4 35.5 26.8 36 24 36c-5.2 0-9.7-2.9-11.7-7.2L6 33.8C9.4 39.7 16.2 44 24 44z"/>
              <path fill="#1976D2" d="M43.6 20H24v8h11.3c-.9 2.5-2.6 4.6-4.8 6L37 39.4C41.1 35.5 44 30.1 44 24c0-1.3-.1-2.7-.4-4z"/>
            </svg>
            Continue with Google
          </button>
        </div>

        {/* Close button */}
        <button
          onClick={() => setIsSignInOpen(false)}
          className="absolute top-4 right-4 p-1.5 rounded-full text-on-surface-variant hover:bg-surface-container-low transition-colors"
        >
          <span className="material-symbols-outlined text-xl">close</span>
        </button>
      </div>
    </div>
  );
}
