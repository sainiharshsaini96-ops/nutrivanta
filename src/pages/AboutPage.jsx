import React from 'react';
import { useApp } from '../context/AppContext';
import { BRAND_INFO, ADVANTAGES, CORE_VALUES } from '../data/mockData';

export default function AboutPage() {
  const { setActivePage } = useApp();

  return (
    <main className="w-full">
      {/* Hero Section: Split Screen */}
      <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[75vh]">
        <div className="flex flex-col justify-center px-margin-mobile md:px-margin-desktop py-12 lg:py-20 bg-surface-container-low dark:bg-surface-container-highest/20">
          <span className="text-xs uppercase tracking-widest font-bold text-primary mb-3 flex items-center gap-1.5">
            <span className="material-symbols-outlined text-base">spa</span>
            About NutriVanta
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold text-primary dark:text-primary-fixed mb-4 tracking-tight leading-tight max-w-xl">
            Better Nutrition Starts With Better Guidance.
          </h1>
          <p className="text-base sm:text-lg text-on-surface-variant dark:text-outline-variant max-w-xl mb-8 leading-relaxed">
            We bridge the gap between scientific precision and sustainable, everyday wellness. NutriVanta connects you with elite nutritional experts to craft actionable, data-driven health strategies tailored uniquely to your lifestyle.
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setActivePage('nutritionists')}
              className="bg-primary-container text-on-primary rounded-xl px-8 py-3.5 font-bold text-sm hover:bg-tertiary-container shadow-sm hover:shadow-md transition-all"
            >
              Meet Our Experts
            </button>
            <a
              href="#mission"
              className="bg-transparent border border-primary text-primary dark:text-primary-fixed dark:border-primary-fixed rounded-xl px-8 py-3.5 font-bold text-sm hover:bg-secondary-fixed transition-all flex items-center gap-1"
            >
              <span>Our Mission</span>
              <span className="material-symbols-outlined text-sm">arrow_downward</span>
            </a>
          </div>
        </div>
        <div className="relative min-h-[350px] lg:min-h-full">
          <img
            className="absolute inset-0 w-full h-full object-cover"
            alt="Doctor consulting with patient in modern clinic"
            src={BRAND_INFO.aboutHeroImage}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-surface-container-low to-transparent w-24 hidden lg:block"></div>
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission" className="py-16 md:py-24 px-margin-mobile md:px-margin-desktop bg-surface dark:bg-background text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center justify-center bg-brand-mint text-primary px-4 py-1.5 rounded-full mb-6">
            <span className="text-xs uppercase tracking-widest font-bold">Our Mission</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-on-surface mb-6">
            Accessible, Personalized, Science-Based Guidance.
          </h2>
          <p className="text-base sm:text-lg text-on-surface-variant dark:text-outline-variant leading-relaxed">
            We believe that optimal health isn't a guessing game. Our mission is to democratize elite nutritional guidance by providing a seamless platform where scientific precision meets human empathy. We empower individuals to make informed decisions about their health through transparent, evidence-based consultations that respect the organic complexity of every human body.
          </p>
        </div>
      </section>

      {/* Feature Bento Cards */}
      <section className="py-16 px-margin-mobile md:px-margin-desktop bg-surface-container-low dark:bg-surface-container-highest/20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-4xl font-bold text-primary dark:text-primary-fixed mb-12 text-center">
            The NutriVanta Advantage
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ADVANTAGES.map((adv, idx) => (
              <div
                key={idx}
                className="bg-surface dark:bg-inverse-surface rounded-20px p-6 shadow-ambient hover-lift border border-surface-variant group flex flex-col justify-between"
              >
                <div className="h-12 w-12 rounded-xl bg-primary-container/10 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined fill text-2xl">{adv.icon}</span>
                </div>
                <h3 className="text-lg font-bold text-on-surface mb-2">{adv.title}</h3>
                <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">{adv.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24 px-margin-mobile md:px-margin-desktop bg-surface dark:bg-background">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Abstract Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-20px overflow-hidden shadow-elevated h-[450px] sm:h-[550px] border border-surface-variant">
              <img
                className="w-full h-full object-cover"
                alt="NutriVanta Core Values artwork"
                src={BRAND_INFO.valuesAbstractImage}
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-brand-mint rounded-full blur-3xl opacity-60 -z-10"></div>
          </div>

          {/* 5 Core Values List */}
          <div className="lg:col-span-7">
            <span className="text-xs uppercase tracking-widest font-bold text-primary-container bg-brand-mint px-3 py-1 rounded-full">
              Guiding Principles
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-primary dark:text-primary-fixed my-4">
              Core Values That Drive Us
            </h2>
            <div className="space-y-6 mt-6">
              {CORE_VALUES.map((val, idx) => (
                <div key={idx} className="flex gap-4 sm:gap-6 pb-6 border-b border-surface-variant last:border-0">
                  <div className="text-primary font-bold text-2xl sm:text-3xl opacity-30 font-mono w-10 shrink-0">
                    {val.number}
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-on-surface mb-1">{val.title}</h4>
                    <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">{val.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 px-margin-mobile md:px-margin-desktop bg-primary-container text-on-primary text-center relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "24px 24px"
          }}
        ></div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-bold mb-4 text-white">
            Meet Our Nutrition Experts
          </h2>
          <p className="text-base sm:text-lg text-emerald-100 opacity-90 max-w-xl mx-auto mb-8">
            Take the first step towards a scientifically optimized lifestyle. Connect with our vetted professionals today.
          </p>
          <button
            onClick={() => setActivePage('nutritionists')}
            className="bg-white text-primary rounded-xl px-8 py-4 font-bold text-sm hover:bg-emerald-50 shadow-elevated hover:scale-105 transition-all uppercase tracking-wider"
          >
            Explore Nutritionists & Plans
          </button>
        </div>
      </section>
    </main>
  );
}
