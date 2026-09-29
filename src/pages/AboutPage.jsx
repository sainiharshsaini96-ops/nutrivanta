import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BRAND_INFO, ADVANTAGES, CORE_VALUES } from '../data/mockData';

const STATS = [
  { value: '10,000+', label: 'Patients Served', icon: 'groups' },
  { value: '98%', label: 'Satisfaction Rate', icon: 'thumb_up' },
  { value: '50+', label: 'Expert Nutritionists', icon: 'medical_services' },
  { value: '8+', label: 'Years of Excellence', icon: 'workspace_premium' },
];

const TEAM = [
  {
    name: 'Dr. Anchal',
    role: 'Senior Clinical Nutritionist',
    badge: 'M.Sc. Clinical Nutrition, RD',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuByZdtP7zLZpAWTBv8ka3nlF31p0c3bJnR_FPIzMZtKRviMWeeDeDT6vjIgfCEWfBKHjIwFZkYbQunvYhblITFPxCV9qWRXawd1ceFa1dVnyd-IoYQOiVd-phQlzJJfPM4YzXmimJEViJtpr4_Ov8_gLn32aZvE5HF0XQO7X8M0U70hhGdlWf_Ci9zCh2PT6o0eg6aWzPgPpA1Lc8uRo5FLFpn18vbLlu5eNzp16NksovPJwQw-XThk9g',
    specialty: 'Diabetes & Metabolic Health',
    color: 'from-emerald-400 to-teal-500',
  },
  {
    name: 'Dr. Amit Kumar',
    role: 'Sports & Performance Nutritionist',
    badge: 'Ph.D. Sports Nutrition',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD0J7d05OelEi5i1siN_UhYKDv1U0PFbQtd85D5WpV6ZLtQ0Y_YX384_VIEjrVxh5ZNyZeZ5Vidbao4yO-4L_vArPqGARo7vxkZxREaS2YdTGnRTd0SNG6OoGC3bb0AqMIetPFNXFgH7CHsDyKWAXcXUnVs5KGZg3cqXyy580oX_-qXOHggyAcrGjYOPSzKCdPQyEA9H9L-Oy6ZHLiHtO2R9ZTeTNvXMTX1iAWcVomfZlL8ddpkv3yhrw',
    specialty: 'Athletic Performance & Recovery',
    color: 'from-blue-400 to-indigo-500',
  },
  {
    name: 'Dr. Sneha Reddy',
    role: 'Gut Health Specialist',
    badge: 'M.D. Gastroenterology',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBmJMsyXuq7utxM-tkYzErxnJhOYMvvc3OHkKrbiG6UuXKx-Bn0WKGSB_pUfyoLS5cUbnYVJOaLsX7Nc4AAXMcKAnp7IRXZMTGgPdxgx5Xx2-xozJGl666V7R4H_CgiOGorgodPm5uUJBcoCFdx9feFsFjNZumFOgThjtpYzjo_QxzelZHNaCrwW22-qyD2YTmwx-kDQBb8GWLDDCKrwZZSd3wo7Rb5G7P3GjYtxKMR2S30FeSaiozvaw',
    specialty: 'Gut Microbiome & Digestive Wellness',
    color: 'from-violet-400 to-purple-500',
  },
];

export default function AboutPage() {
  const { setActivePage } = useApp();
  const [activeValue, setActiveValue] = useState(0);

  return (
    <main className="w-full overflow-x-hidden">

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative min-h-[88vh] flex items-center overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-emerald-950/40 dark:via-background dark:to-teal-950/30">
        {/* Background decorative blobs */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-100 dark:bg-emerald-900/20 rounded-full blur-3xl opacity-50 translate-x-1/3 -translate-y-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal-100 dark:bg-teal-900/20 rounded-full blur-3xl opacity-40 -translate-x-1/3 translate-y-1/4 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">
          {/* Left: Text */}
          <div className="flex flex-col gap-6">
            <span className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900/40 text-primary dark:text-emerald-300 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full w-fit border border-emerald-200 dark:border-emerald-800">
              <span className="material-symbols-outlined text-sm">spa</span>
              About NutriVanta
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-on-surface dark:text-inverse-on-surface leading-[1.1] tracking-tight">
              Better Nutrition{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-teal-500">
                Starts With
              </span>{' '}
              Better Guidance.
            </h1>

            <p className="text-base sm:text-lg text-on-surface-variant dark:text-outline-variant leading-relaxed max-w-lg">
              We bridge the gap between scientific precision and sustainable everyday wellness. NutriVanta connects you with elite nutritional experts to craft actionable, data-driven health strategies — tailored uniquely to <em>you</em>.
            </p>

            <div className="flex flex-wrap gap-4 mt-2">
              <button
                onClick={() => setActivePage('nutritionists')}
                className="flex items-center gap-2 bg-primary text-white rounded-xl px-7 py-3.5 font-bold text-sm hover:opacity-90 hover:shadow-lg transition-all shadow-md"
              >
                <span className="material-symbols-outlined text-base">group</span>
                Meet Our Experts
              </button>
              <a
                href="#mission"
                className="flex items-center gap-2 border-2 border-primary text-primary dark:text-emerald-300 dark:border-emerald-400 rounded-xl px-7 py-3.5 font-bold text-sm hover:bg-emerald-50 dark:hover:bg-emerald-900/30 transition-all"
              >
                Our Mission
                <span className="material-symbols-outlined text-sm">arrow_downward</span>
              </a>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {['ISO 27001 Certified', 'HIPAA Compliant', 'RD Verified Experts'].map(badge => (
                <span key={badge} className="inline-flex items-center gap-1.5 bg-white dark:bg-surface-container text-xs font-semibold text-on-surface px-3 py-1.5 rounded-full border border-surface-variant shadow-sm">
                  <span className="material-symbols-outlined text-primary text-xs">verified</span>
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Hero image */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/50 dark:border-white/10 h-[420px] lg:h-[520px]">
              <img
                src={BRAND_INFO.aboutHeroImage}
                alt="Doctor consulting with patient"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>
            {/* Floating card */}
            <div className="absolute -bottom-6 -left-6 bg-white dark:bg-inverse-surface rounded-2xl shadow-elevated p-4 flex items-center gap-3 border border-surface-variant">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-2xl">star</span>
              </div>
              <div>
                <p className="text-sm font-bold text-on-surface dark:text-inverse-on-surface">4.9 / 5.0</p>
                <p className="text-xs text-on-surface-variant">From 2,400+ reviews</p>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 bg-primary text-white rounded-2xl shadow-elevated px-4 py-3 text-center">
              <p className="text-xl font-extrabold">10K+</p>
              <p className="text-xs font-medium opacity-80">Happy Patients</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ────────────────────────────────────────── */}
      <section className="bg-primary text-white py-10 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((s, i) => (
            <div key={i} className="flex flex-col items-center text-center gap-2">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-1">
                <span className="material-symbols-outlined text-white text-2xl">{s.icon}</span>
              </div>
              <p className="text-3xl font-extrabold tracking-tight">{s.value}</p>
              <p className="text-sm font-medium text-emerald-100 opacity-90">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── MISSION ──────────────────────────────────────────── */}
      <section id="mission" className="py-20 md:py-28 px-6 md:px-12 bg-surface dark:bg-background">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-900/30 text-primary text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6 border border-emerald-200 dark:border-emerald-800">
            <span className="material-symbols-outlined text-sm">flag</span>
            Our Mission
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-on-surface dark:text-inverse-on-surface mb-6 leading-tight">
            Accessible. Personalized.{' '}
            <span className="text-primary">Science-Based.</span>
          </h2>
          <p className="text-base sm:text-lg text-on-surface-variant dark:text-outline-variant leading-relaxed mb-10">
            We believe that optimal health isn't a guessing game. Our mission is to democratize elite nutritional guidance — providing a seamless platform where scientific precision meets human empathy. We empower individuals to make informed decisions through transparent, evidence-based consultations that respect the organic complexity of every human body.
          </p>
          {/* Mission pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
            {[
              { icon: 'science', title: 'Evidence-Based', desc: 'Every recommendation backed by peer-reviewed research.' },
              { icon: 'favorite', title: 'Human-Centered', desc: 'Your lifestyle, preferences, and goals come first.' },
              { icon: 'trending_up', title: 'Results-Driven', desc: 'Measurable outcomes, not generic advice.' },
            ].map((p, i) => (
              <div key={i} className="flex flex-col gap-3 p-6 rounded-2xl bg-surface-container-low dark:bg-surface-container border border-surface-variant">
                <div className="w-11 h-11 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-xl">{p.icon}</span>
                </div>
                <h3 className="font-bold text-on-surface dark:text-inverse-on-surface text-base">{p.title}</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ADVANTAGES ───────────────────────────────────────── */}
      <section className="py-20 px-6 md:px-12 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 bg-white dark:bg-surface-container text-primary text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-4 border border-surface-variant shadow-sm">
              <span className="material-symbols-outlined text-sm">workspace_premium</span>
              Why NutriVanta
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-on-surface dark:text-inverse-on-surface">
              The NutriVanta <span className="text-primary">Advantage</span>
            </h2>
            <p className="text-base text-on-surface-variant mt-4 max-w-xl mx-auto">
              What sets us apart from generic nutrition platforms and one-size-fits-all diets.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ADVANTAGES.map((adv, idx) => (
              <div
                key={idx}
                className="group bg-white dark:bg-inverse-surface rounded-2xl p-6 shadow-sm hover:shadow-xl border border-surface-variant hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 flex flex-col gap-4"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/40 dark:to-teal-900/40 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="material-symbols-outlined text-primary text-2xl">{adv.icon}</span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-on-surface dark:text-inverse-on-surface mb-2">{adv.title}</h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed">{adv.description}</p>
                </div>
                <div className="mt-auto pt-3 border-t border-surface-variant">
                  <span className="text-xs text-primary font-semibold flex items-center gap-1">
                    Learn more <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CORE VALUES ──────────────────────────────────────── */}
      <section className="py-20 md:py-28 px-6 md:px-12 bg-surface dark:bg-background">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image */}
          <div className="relative order-2 lg:order-1">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-surface-variant h-[480px]">
              <img
                src={BRAND_INFO.valuesAbstractImage}
                alt="NutriVanta core values"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-emerald-200 dark:bg-emerald-900/40 rounded-full blur-3xl opacity-60 pointer-events-none" />
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-teal-200 dark:bg-teal-900/40 rounded-full blur-2xl opacity-50 pointer-events-none" />
          </div>

          {/* Right: Values */}
          <div className="order-1 lg:order-2">
            <span className="inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-900/30 text-primary text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-4 border border-emerald-200 dark:border-emerald-800">
              <span className="material-symbols-outlined text-sm">format_list_numbered</span>
              Guiding Principles
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-on-surface dark:text-inverse-on-surface mb-2 leading-tight">
              Core Values That <span className="text-primary">Drive Us</span>
            </h2>
            <p className="text-sm text-on-surface-variant mb-8 leading-relaxed">
              Everything we do is grounded in these five principles.
            </p>

            <div className="space-y-3">
              {CORE_VALUES.map((val, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveValue(idx)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 ${
                    activeValue === idx
                      ? 'bg-primary text-white border-primary shadow-lg scale-[1.01]'
                      : 'bg-surface-container-low dark:bg-surface-container border-surface-variant hover:border-primary/40 hover:bg-emerald-50 dark:hover:bg-emerald-900/20'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className={`text-2xl font-extrabold font-mono w-10 shrink-0 ${activeValue === idx ? 'text-white/60' : 'text-primary/30'}`}>
                      {val.number}
                    </span>
                    <div className="flex-1">
                      <h4 className={`font-bold text-base mb-1 ${activeValue === idx ? 'text-white' : 'text-on-surface dark:text-inverse-on-surface'}`}>
                        {val.title}
                      </h4>
                      <p className={`text-sm leading-relaxed ${activeValue === idx ? 'text-white/80' : 'text-on-surface-variant'}`}>
                        {val.description}
                      </p>
                    </div>
                    <span className={`material-symbols-outlined text-lg ${activeValue === idx ? 'text-white' : 'text-primary'}`}>
                      {activeValue === idx ? 'check_circle' : 'arrow_forward_ios'}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TEAM ─────────────────────────────────────────────── */}
      <section className="py-20 px-6 md:px-12 bg-surface-container-low dark:bg-surface-container">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 bg-white dark:bg-surface-container text-primary text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-4 border border-surface-variant shadow-sm">
              <span className="material-symbols-outlined text-sm">group</span>
              Our Team
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-on-surface dark:text-inverse-on-surface">
              Meet the <span className="text-primary">Experts</span>
            </h2>
            <p className="text-base text-on-surface-variant mt-4 max-w-lg mx-auto">
              Our hand-picked nutritionists bring decades of clinical excellence to every consultation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {TEAM.map((member, idx) => (
              <div
                key={idx}
                className="group bg-white dark:bg-inverse-surface rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-surface-variant hover:border-primary/30 transition-all duration-300 hover:-translate-y-2"
              >
                <div className={`h-3 w-full bg-gradient-to-r ${member.color}`} />
                <div className="p-6 flex flex-col items-center text-center gap-4">
                  <div className="relative">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-24 h-24 rounded-2xl object-cover border-4 border-white dark:border-surface-container shadow-md"
                    />
                    <span className="absolute -bottom-2 -right-2 bg-primary text-white rounded-full p-1 shadow-md">
                      <span className="material-symbols-outlined text-sm">verified</span>
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-on-surface dark:text-inverse-on-surface">{member.name}</h3>
                    <p className="text-sm text-primary font-semibold">{member.role}</p>
                    <span className="inline-block mt-2 bg-emerald-50 dark:bg-emerald-900/30 text-primary text-xs font-semibold px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                      {member.badge}
                    </span>
                  </div>
                  <p className="text-xs text-on-surface-variant text-center">
                    Specializes in <strong className="text-on-surface dark:text-inverse-on-surface">{member.specialty}</strong>
                  </p>
                  <button
                    onClick={() => setActivePage('nutritionists')}
                    className="w-full mt-1 py-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 text-primary font-bold text-sm hover:bg-primary hover:text-white transition-all border border-emerald-200 dark:border-emerald-800"
                  >
                    Book Consultation
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="relative py-24 px-6 md:px-12 bg-gradient-to-br from-primary to-teal-600 text-white overflow-hidden">
        {/* Dot pattern */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '28px 28px' }}
        />
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-400/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 bg-white/20 text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6 backdrop-blur-sm">
            <span className="material-symbols-outlined text-sm">rocket_launch</span>
            Start Today
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-4 leading-tight">
            Ready to Transform<br />Your Health?
          </h2>
          <p className="text-lg text-emerald-100 opacity-90 max-w-xl mx-auto mb-10 leading-relaxed">
            Take the first step toward a scientifically optimized lifestyle. Connect with our vetted professionals and get a personalized plan built just for you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setActivePage('nutritionists')}
              className="flex items-center gap-2 bg-white text-primary rounded-xl px-8 py-4 font-bold text-sm hover:bg-emerald-50 shadow-elevated hover:scale-105 transition-all"
            >
              <span className="material-symbols-outlined text-base">calendar_month</span>
              Book a Consultation
            </button>
            <button
              onClick={() => setActivePage('contact')}
              className="flex items-center gap-2 bg-white/20 text-white border border-white/30 backdrop-blur-sm rounded-xl px-8 py-4 font-bold text-sm hover:bg-white/30 transition-all"
            >
              <span className="material-symbols-outlined text-base">chat</span>
              Talk to Us
            </button>
          </div>
        </div>
      </section>

    </main>
  );
}
