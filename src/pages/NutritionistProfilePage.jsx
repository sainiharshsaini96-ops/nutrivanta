import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FEATURED_NUTRITIONIST } from '../data/mockData';

export default function NutritionistProfilePage() {
  const { setActivePage, setSelectedPackage } = useApp();
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'experience' | 'reviews'
  const [selectedConsultation, setSelectedConsultation] = useState(FEATURED_NUTRITIONIST.packages[1]);

  const doc = FEATURED_NUTRITIONIST;

  const handleBookNow = (pkg) => {
    setSelectedPackage(pkg || selectedConsultation);
    setActivePage('checkout');
  };

  return (
    <main className="w-full max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-10 md:py-16">
      {/* Breadcrumb / Back button */}
      <div className="flex items-center gap-2 mb-6 text-on-surface-variant text-xs sm:text-sm">
        <button onClick={() => setActivePage('home')} className="hover:text-primary transition-colors">
          Home
        </button>
        <span>/</span>
        <span className="text-primary font-semibold">Doctor Profile</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Profile Card & Quick Info (4 cols) */}
        <aside className="lg:col-span-4 flex flex-col gap-6">
          {/* Main Hero Card */}
          <div className="bg-surface-container-lowest dark:bg-inverse-surface rounded-20px shadow-ambient border border-surface-variant p-6 flex flex-col items-center text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-24 bg-brand-mint/40 dark:bg-emerald-950/40"></div>
            
            {/* Avatar */}
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-white dark:border-zinc-800 mt-6 mb-3 shadow-md">
              <img
                src={doc.avatar}
                alt={doc.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Name & Badge */}
            <div className="flex items-center gap-1.5 mb-1">
              <h1 className="text-xl sm:text-2xl font-bold text-on-surface">{doc.name}</h1>
              <span className="material-symbols-outlined text-primary text-xl fill">verified</span>
            </div>
            <p className="text-xs sm:text-sm font-medium text-primary-container dark:text-primary-fixed mb-4">
              {doc.role}
            </p>

            {/* Metric Pills Grid */}
            <div className="w-full grid grid-cols-2 gap-2.5 mb-4 text-left">
              <div className="flex items-center gap-2 bg-surface-container-low dark:bg-surface-container p-2.5 rounded-xl">
                <span className="material-symbols-outlined text-primary text-lg">school</span>
                <div>
                  <p className="text-[10px] text-on-surface-variant uppercase font-semibold">Degree</p>
                  <p className="text-xs font-bold text-on-surface">M.Sc. RD</p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-surface-container-low dark:bg-surface-container p-2.5 rounded-xl">
                <span className="material-symbols-outlined text-primary text-lg">work_history</span>
                <div>
                  <p className="text-[10px] text-on-surface-variant uppercase font-semibold">Experience</p>
                  <p className="text-xs font-bold text-on-surface">{doc.experience}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-surface-container-low dark:bg-surface-container p-2.5 rounded-xl">
                <span className="material-symbols-outlined text-amber-500 text-lg fill">star</span>
                <div>
                  <p className="text-[10px] text-on-surface-variant uppercase font-semibold">Rating</p>
                  <p className="text-xs font-bold text-on-surface">{doc.rating} ({doc.reviewsCount})</p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-surface-container-low dark:bg-surface-container p-2.5 rounded-xl">
                <span className="material-symbols-outlined text-primary text-lg">location_on</span>
                <div>
                  <p className="text-[10px] text-on-surface-variant uppercase font-semibold">Location</p>
                  <p className="text-xs font-bold text-on-surface">Delhi NCR</p>
                </div>
              </div>
            </div>

            <div className="w-full h-px bg-surface-variant my-2"></div>
            
            {/* Availability */}
            <div className="w-full flex justify-between items-center py-1 text-xs">
              <span className="text-on-surface-variant font-medium">Next Available Slot:</span>
              <span className="text-primary font-bold bg-brand-mint px-2.5 py-1 rounded-md">
                {doc.nextAvailable}
              </span>
            </div>
          </div>

          {/* Areas of Expertise Bento Box */}
          <div className="bg-surface-container-lowest dark:bg-inverse-surface rounded-20px shadow-ambient border border-surface-variant p-6">
            <h3 className="text-sm font-bold text-on-surface uppercase tracking-wider mb-3">
              Areas of Expertise
            </h3>
            <div className="flex flex-wrap gap-2">
              {doc.expertise.map((item, idx) => (
                <span
                  key={idx}
                  className="bg-brand-mint/60 dark:bg-emerald-950/60 text-primary dark:text-primary-fixed text-xs font-semibold px-3 py-1.5 rounded-full border border-primary/20"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </aside>

        {/* Right Column: Tabbed Information & Booking (8 cols) */}
        <section className="lg:col-span-8 flex flex-col gap-6">
          {/* Tabs Navigation */}
          <div className="flex border-b border-surface-variant gap-4 sm:gap-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-3 text-sm font-bold transition-all relative ${
                activeTab === 'overview'
                  ? 'border-b-2 border-primary text-primary dark:text-primary-fixed'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              Overview & Bio
            </button>
            <button
              onClick={() => setActiveTab('experience')}
              className={`pb-3 text-sm font-bold transition-all relative ${
                activeTab === 'experience'
                  ? 'border-b-2 border-primary text-primary dark:text-primary-fixed'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              Qualifications & Experience
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-3 text-sm font-bold transition-all relative ${
                activeTab === 'reviews'
                  ? 'border-b-2 border-primary text-primary dark:text-primary-fixed'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              Patient Reviews ({doc.reviews.length})
            </button>
          </div>

          {/* Tab 1: Overview */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-fade-in">
              <div className="bg-surface-container-lowest dark:bg-inverse-surface rounded-20px shadow-ambient border border-surface-variant p-6">
                <h2 className="text-lg font-bold text-on-surface mb-3">About Dr. Priya</h2>
                <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
                  {doc.about}
                </p>
              </div>

              {/* Consultation Packages Selection */}
              <div>
                <h2 className="text-lg font-bold text-on-surface mb-4 flex items-center justify-between">
                  <span>Choose Consultation Package</span>
                  <span className="text-xs text-primary font-normal">Video Consultation via Secure Portal</span>
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {doc.packages.map((pkg) => {
                    const isSelected = selectedConsultation.id === pkg.id;
                    return (
                      <div
                        key={pkg.id}
                        onClick={() => setSelectedConsultation(pkg)}
                        className={`bg-surface-container-lowest dark:bg-inverse-surface rounded-20px p-6 shadow-ambient border-2 transition-all cursor-pointer flex flex-col justify-between relative ${
                          isSelected
                            ? 'border-primary ring-2 ring-primary/20 shadow-elevated'
                            : 'border-surface-variant hover:border-primary/40'
                        }`}
                      >
                        {pkg.popular && (
                          <div className="absolute top-0 right-0 bg-primary text-white text-[11px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                            Most Popular
                          </div>
                        )}
                        <div>
                          <div className="flex justify-between items-start mb-3">
                            <span className="text-xs font-bold bg-brand-mint text-primary px-2.5 py-1 rounded-lg">
                              {pkg.duration}
                            </span>
                            <span className="text-2xl font-bold text-on-surface">₹{pkg.price}</span>
                          </div>
                          <h3 className="text-base font-bold text-on-surface mb-1">{pkg.title}</h3>
                          <p className="text-xs text-on-surface-variant mb-4">{pkg.description}</p>
                          
                          <ul className="space-y-2 mb-6">
                            {pkg.features.map((feat, i) => (
                              <li key={i} className="flex items-center gap-2 text-xs text-on-surface-variant">
                                <span className="material-symbols-outlined text-primary text-base fill">check_circle</span>
                                <span>{feat}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleBookNow(pkg);
                          }}
                          className={`w-full py-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                            isSelected
                              ? 'bg-primary text-white hover:bg-primary-container shadow-md'
                              : 'bg-surface-container-high text-on-surface hover:bg-primary hover:text-white'
                          }`}
                        >
                          Book {pkg.duration} for ₹{pkg.price}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Experience & Education */}
          {activeTab === 'experience' && (
            <div className="space-y-6 animate-fade-in">
              <div className="bg-surface-container-lowest dark:bg-inverse-surface rounded-20px shadow-ambient border border-surface-variant p-6">
                <h3 className="text-base font-bold text-on-surface mb-4">Academic Background & Certifications</h3>
                <div className="space-y-4">
                  {doc.education.map((edu, idx) => (
                    <div key={idx} className="flex items-start gap-3 pb-4 border-b border-surface-variant last:border-0 last:pb-0">
                      <div className="w-8 h-8 rounded-lg bg-brand-mint text-primary flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-base">school</span>
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-on-surface">{edu.title}</h4>
                        <p className="text-xs text-on-surface-variant">{edu.institution}</p>
                        <span className="text-[11px] text-outline font-semibold">Completed: {edu.year}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-surface-container-lowest dark:bg-inverse-surface rounded-20px shadow-ambient border border-surface-variant p-6">
                <h3 className="text-base font-bold text-on-surface mb-3">Clinical Speciality Focus</h3>
                <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                  Over 8+ years practicing evidence-based metabolic therapeutics, glycemic control, gut microbiota modulation, and post-bariatric dietary rehabilitation across prominent hospitals in Delhi NCR.
                </p>
              </div>
            </div>
          )}

          {/* Tab 3: Reviews */}
          {activeTab === 'reviews' && (
            <div className="space-y-4 animate-fade-in">
              <div className="bg-surface-container-lowest dark:bg-inverse-surface rounded-20px shadow-ambient border border-surface-variant p-6">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-on-surface">Verified Patient Reviews</h3>
                    <p className="text-xs text-on-surface-variant">Real feedback from patients after completing consultations</p>
                  </div>
                  <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-950/40 text-amber-600 px-3 py-1.5 rounded-full font-bold text-sm border border-amber-200">
                    <span className="material-symbols-outlined fill text-base">star</span>
                    <span>4.9 / 5.0</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {doc.reviews.map((rev) => (
                    <div key={rev.id} className="p-4 rounded-xl bg-surface-container-low dark:bg-surface-container border border-surface-variant">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2.5">
                          <div className="w-9 h-9 rounded-full bg-secondary-container text-on-secondary-container font-bold text-xs flex items-center justify-center">
                            {rev.initials}
                          </div>
                          <div>
                            <h4 className="text-xs sm:text-sm font-bold text-on-surface">{rev.name}</h4>
                            <span className="text-[10px] text-outline">{rev.date}</span>
                          </div>
                        </div>
                        <div className="flex text-amber-500 text-sm">
                          {[...Array(rev.rating)].map((_, i) => (
                            <span key={i} className="material-symbols-outlined fill text-base">star</span>
                          ))}
                        </div>
                      </div>
                      <p className="text-xs sm:text-sm text-on-surface-variant italic">"{rev.comment}"</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
