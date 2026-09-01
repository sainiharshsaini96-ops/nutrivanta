import React from 'react';
import { useApp } from '../context/AppContext';
import { BRAND_INFO, ADVANTAGES, FEATURED_NUTRITIONIST } from '../data/mockData';

export default function HomePage() {
  const { setActivePage, setSelectedPackage } = useApp();

  const handleBookDirect = (pkg) => {
    setSelectedPackage(pkg);
    setActivePage('checkout');
  };

  return (
    <main className="w-full overflow-hidden">
      {/* Hero Section */}
      <section className="relative w-full min-h-[85vh] flex items-center bg-surface-container-low dark:bg-surface-container-highest/20 px-margin-mobile md:px-margin-desktop py-12 md:py-20 overflow-hidden">
        {/* Background Ambient Glows */}
        <div className="absolute inset-0 opacity-40 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] lg:w-[800px] h-[600px] lg:h-[800px] bg-secondary-fixed-dim rounded-full blur-[140px] -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-[500px] lg:w-[600px] h-[500px] lg:h-[600px] bg-primary-fixed-dim rounded-full blur-[120px] translate-y-1/3 -translate-x-1/4"></div>
        </div>

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 relative z-10 items-center">
          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-7 flex flex-col gap-6 lg:gap-8">
            <div className="flex flex-col gap-3">
              <span className="text-primary-container dark:text-primary-fixed font-label-md text-xs sm:text-sm tracking-wider uppercase flex items-center gap-1.5 font-bold">
                <span className="material-symbols-outlined fill text-[18px]">verified</span>
                Premium Nutrition Care
              </span>
              <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-bold text-on-surface dark:text-inverse-on-surface tracking-tight leading-[1.15]">
                Nutrition Guidance Designed Around You.
              </h1>
              <p className="text-base sm:text-lg text-on-surface-variant dark:text-outline-variant max-w-xl leading-relaxed mt-2">
                Connect with trusted, certified clinical nutritionists and receive personalized, evidence-based nutrition guidance built specifically around your metabolic profile and lifestyle.
              </p>
            </div>

            {/* CTA Button Group */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => setActivePage('nutritionists')}
                className="bg-primary-container text-on-primary font-bold text-sm sm:text-base px-8 py-3.5 rounded-xl hover:-translate-y-1 hover:shadow-elevated transition-all duration-300 flex items-center gap-2 shadow-sm"
              >
                <span>Find a Nutritionist</span>
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </button>
              <button
                onClick={() => setActivePage('about')}
                className="bg-brand-mint text-primary-container dark:bg-secondary-container dark:text-on-secondary-container font-bold text-sm sm:text-base px-8 py-3.5 rounded-xl hover:bg-secondary-fixed transition-colors flex items-center gap-2"
              >
                <span>Explore How It Works</span>
                <span className="material-symbols-outlined text-base">insights</span>
              </button>
            </div>

            {/* Quick Metrics Strip */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-surface-variant/60 max-w-lg">
              <div>
                <p className="text-2xl font-bold text-primary dark:text-primary-fixed">98%</p>
                <p className="text-xs text-on-surface-variant">Patient Satisfaction</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary dark:text-primary-fixed">1,200+</p>
                <p className="text-xs text-on-surface-variant">Consultations</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary dark:text-primary-fixed">100%</p>
                <p className="text-xs text-on-surface-variant">Evidence-Backed</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual with Floating Pill Cards */}
          <div className="lg:col-span-5 relative w-full h-[460px] sm:h-[540px] lg:h-[580px] rounded-20px">
            <img
              className="w-full h-full object-cover rounded-20px shadow-elevated border border-white/50"
              alt="Professional female nutritionist in a modern sunlit clinical office"
              src={BRAND_INFO.heroImage}
            />

            {/* Floating Satisfaction Card (Top Left) */}
            <div className="absolute -left-4 sm:-left-8 top-12 sm:top-16 bg-white/95 dark:bg-inverse-surface/95 backdrop-blur-md p-3.5 sm:p-4 rounded-20px shadow-elevated flex items-center gap-3 border border-surface-variant animate-float">
              <div className="w-11 h-11 rounded-full bg-brand-mint flex items-center justify-center text-primary-container">
                <span className="material-symbols-outlined fill text-xl">star</span>
              </div>
              <div>
                <p className="text-lg font-bold text-on-surface">98%</p>
                <p className="text-xs text-on-surface-variant font-medium">Satisfaction Rate</p>
              </div>
            </div>

            {/* Floating Consultations Card (Bottom Right) */}
            <div className="absolute -right-4 sm:-right-6 bottom-12 sm:bottom-16 bg-white/95 dark:bg-inverse-surface/95 backdrop-blur-md p-3.5 sm:p-4 rounded-20px shadow-elevated flex items-center gap-3 border border-surface-variant animate-float-delayed">
              <div className="w-11 h-11 rounded-full bg-brand-mint flex items-center justify-center text-primary-container">
                <span className="material-symbols-outlined fill text-xl">group</span>
              </div>
              <div>
                <p className="text-lg font-bold text-on-surface">1,200+</p>
                <p className="text-xs text-on-surface-variant font-medium">Consultations Done</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Clinical Specialist Highlight */}
      <section className="py-16 px-margin-mobile md:px-margin-desktop bg-surface dark:bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs uppercase font-bold tracking-widest text-primary-container bg-brand-mint px-3 py-1 rounded-full">
              Featured Nutritionist
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-on-surface mt-3">
              Consult With Our Top Clinical Expert
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mt-2">
              Book a 1-on-1 personalized telehealth session with Dr. Priya Sharma and receive a customized dietary blueprint.
            </p>
          </div>

          <div className="bg-surface-container-lowest dark:bg-inverse-surface rounded-20px p-6 sm:p-8 shadow-ambient border border-surface-variant grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4 flex flex-col items-center text-center">
              <img
                src={FEATURED_NUTRITIONIST.avatar}
                alt={FEATURED_NUTRITIONIST.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-surface shadow-md"
              />
              <h3 className="font-bold text-xl text-on-surface mt-3 flex items-center gap-1.5">
                <span>{FEATURED_NUTRITIONIST.name}</span>
                <span className="material-symbols-outlined fill text-primary text-lg">verified</span>
              </h3>
              <p className="text-sm text-primary-container font-medium">{FEATURED_NUTRITIONIST.role}</p>
              <p className="text-xs text-on-surface-variant mt-1">{FEATURED_NUTRITIONIST.degree}</p>

              <div className="flex items-center gap-3 mt-4 text-xs bg-surface-container-low px-3 py-1.5 rounded-full">
                <span className="flex items-center text-amber-500 font-bold">
                  <span className="material-symbols-outlined fill text-sm mr-0.5">star</span>
                  {FEATURED_NUTRITIONIST.rating} ({FEATURED_NUTRITIONIST.reviewsCount} reviews)
                </span>
                <span>•</span>
                <span className="text-on-surface font-semibold">{FEATURED_NUTRITIONIST.experience} Exp</span>
              </div>
            </div>

            <div className="lg:col-span-8 flex flex-col justify-between space-y-6">
              <div>
                <h4 className="font-bold text-sm text-on-surface uppercase tracking-wider mb-2">Clinical Specialization</h4>
                <div className="flex flex-wrap gap-2">
                  {FEATURED_NUTRITIONIST.expertise.map((exp, i) => (
                    <span key={i} className="text-xs bg-brand-mint text-primary font-semibold px-3 py-1 rounded-full border border-primary/15">
                      {exp}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {FEATURED_NUTRITIONIST.packages.map((pkg) => (
                  <div
                    key={pkg.id}
                    className={`p-4 rounded-xl border transition-all ${
                      pkg.popular
                        ? 'border-primary bg-primary/5 shadow-sm'
                        : 'border-surface-variant bg-surface'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-xs font-bold text-primary uppercase">{pkg.duration}</span>
                      <span className="text-base font-bold text-on-surface">₹{pkg.price}</span>
                    </div>
                    <h5 className="font-bold text-sm text-on-surface">{pkg.title}</h5>
                    <p className="text-xs text-on-surface-variant mt-1 line-clamp-2">{pkg.description}</p>
                    <button
                      onClick={() => handleBookDirect(pkg)}
                      className={`w-full mt-3 py-2 rounded-lg text-xs font-bold transition-all ${
                        pkg.popular
                          ? 'bg-primary text-white hover:bg-primary-container shadow-sm'
                          : 'bg-surface-container-high text-on-surface hover:bg-primary hover:text-white'
                      }`}
                    >
                      Book for ₹{pkg.price}
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-surface-variant text-xs">
                <span className="text-on-surface-variant">Next Slot: <strong className="text-primary">{FEATURED_NUTRITIONIST.nextAvailable}</strong></span>
                <button
                  onClick={() => setActivePage('nutritionists')}
                  className="text-primary font-bold hover:underline flex items-center gap-1"
                >
                  <span>View Full Doctor Profile</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Pillars Advantage Bento Grid */}
      <section className="py-16 px-margin-mobile md:px-margin-desktop bg-surface-container-low dark:bg-surface-container-highest/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-4xl font-bold text-primary dark:text-primary-fixed">
              The NutriVanta Advantage
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mt-2">
              Why thousands trust NutriVanta for personalized clinical healthcare and dietetics.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ADVANTAGES.map((adv, idx) => (
              <div
                key={idx}
                className="bg-surface rounded-20px p-6 shadow-ambient hover-lift border border-surface-variant group flex flex-col justify-between"
              >
                <div>
                  <div className="h-12 w-12 rounded-xl bg-primary-container/10 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined fill text-2xl">{adv.icon}</span>
                  </div>
                  <h3 className="text-lg font-bold text-on-surface mb-2">{adv.title}</h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">{adv.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
