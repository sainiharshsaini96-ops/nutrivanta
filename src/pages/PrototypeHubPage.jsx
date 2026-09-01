import React from 'react';
import { useApp } from '../context/AppContext';
import { PROTOTYPE_SCREENS, BRAND_INFO } from '../data/mockData';

export default function PrototypeHubPage() {
  const { setActivePage, setSelectedPackage } = useApp();

  const handleLaunchScreen = (screenId) => {
    setActivePage(screenId);
  };

  const subfolderBreakdown = [
    {
      name: "nutrivanta_elite",
      type: "Design System & Tokens",
      status: "Integrated",
      description: "DESIGN.md containing colors, Manrope typography, ambient shadows, spacing grid, and shape guidelines.",
      actionPage: "home"
    },
    {
      name: "home_page",
      type: "Landing & Hero Screen",
      status: "Converted",
      description: "Hero with satisfaction metrics, nutritionist imagery, value props, and call-to-action triggers.",
      actionPage: "home"
    },
    {
      name: "nutrivanta_personalized_nutrition_platform",
      type: "Platform Overview",
      status: "Converted",
      description: "Alternate platform landing view with clinical specialty pillars.",
      actionPage: "home"
    },
    {
      name: "about_page",
      type: "Company & Mission",
      status: "Converted",
      description: "Split-screen hero, 4 Bento Advantage cards, and 5 Core Values matrix with abstract imagery.",
      actionPage: "about"
    },
    {
      name: "nutritionist_profile",
      type: "Doctor Clinical Profile",
      status: "Converted",
      description: "Dr. Priya Sharma profile, verified badge, tabbed bio/experience/reviews, and ₹799 vs ₹1,299 packages.",
      actionPage: "nutritionists"
    },
    {
      name: "checkout_page",
      type: "Booking & Payment",
      status: "Converted",
      description: "Patient details form, UPI/Card/NetBanking options, 256-bit SSL encryption, and instant confirmation.",
      actionPage: "checkout"
    },
    {
      name: "contact_page",
      type: "Support & FAQs",
      status: "Converted",
      description: "Bento contact form, direct support channels, and expandable accordion FAQ section.",
      actionPage: "contact"
    },
    {
      name: "user_profile_dashboard_1",
      type: "Patient Member Portal",
      status: "Converted",
      description: "Profile sidebar, health goal chips, 3 Metric stats widgets, and Upcoming Consultation card.",
      actionPage: "dashboard"
    },
    {
      name: "user_profile_dashboard_2",
      type: "Patient Dashboard Alt",
      status: "Converted",
      description: "Integrated telehealth call launcher and edit profile modal workflows.",
      actionPage: "dashboard"
    },
    {
      name: "payment_history_dashboard",
      type: "Billing & Ledger",
      status: "Converted",
      description: "Financial summary metrics, filterable/searchable transaction table, and downloadable tax invoice modal.",
      actionPage: "payments"
    },
    {
      name: "interactive_prototype_hub",
      type: "Screen Navigation Matrix",
      status: "Converted",
      description: "Interactive prototype matrix linking all screens together with active state tracking.",
      actionPage: "prototype_hub"
    },
    {
      name: "nutrivanta_logo",
      type: "Brand Identity Assets",
      status: "Preserved",
      description: "High-resolution NutriVanta brand logo vectors and icons.",
      actionPage: "home"
    },
    {
      name: "a_professional_female_nutritionist...",
      type: "Clinical Photography Asset",
      status: "Preserved",
      description: "High-resolution hero photography asset featured across hero and profile sections.",
      actionPage: "home"
    }
  ];

  return (
    <main className="w-full max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-10 md:py-16">
      {/* Hub Hero */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 bg-brand-mint text-primary px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
          <span className="material-symbols-outlined text-sm">hub</span>
          <span>13 Subfolders Converted to React</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold text-on-surface tracking-tight">
          Interactive Prototype Hub
        </h1>
        <p className="text-sm sm:text-base text-on-surface-variant mt-3 leading-relaxed">
          Welcome to the unified NutriVanta React platform. Every single subfolder from the original Stitch export has been analyzed, modularized, and converted into high-performance, responsive React components.
        </p>
      </div>

      {/* Quick Launch Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {PROTOTYPE_SCREENS.map((scr) => (
          <div
            key={scr.id}
            onClick={() => handleLaunchScreen(scr.id)}
            className="bg-surface-container-lowest dark:bg-inverse-surface rounded-20px p-6 shadow-ambient border border-surface-variant hover-lift cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-brand-mint text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-2xl">{scr.icon}</span>
              </div>
              <h3 className="text-base font-bold text-on-surface mb-1">{scr.label}</h3>
              <p className="text-xs text-on-surface-variant font-mono">{scr.folder}</p>
            </div>
            <button className="w-full mt-4 py-2.5 rounded-xl bg-surface-container-low dark:bg-surface-container text-primary font-bold text-xs group-hover:bg-primary group-hover:text-white transition-colors flex items-center justify-center gap-1">
              <span>Open Screen</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        ))}
      </div>

      {/* Subfolder Inventory Breakdown */}
      <div className="bg-surface-container-lowest dark:bg-inverse-surface rounded-20px p-6 sm:p-8 shadow-ambient border border-surface-variant">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-6 pb-4 border-b border-surface-variant">
          <div>
            <h2 className="text-xl font-bold text-on-surface">Stitch Subfolder Conversion Inventory</h2>
            <p className="text-xs text-on-surface-variant">Complete mapping of all 13 subfolders to React components</p>
          </div>
          <span className="text-xs bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold px-3 py-1 rounded-full">
            13 / 13 Completed
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {subfolderBreakdown.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-surface-container-low dark:bg-surface-container border border-surface-variant flex flex-col justify-between hover:border-primary/40 transition-colors"
            >
              <div>
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-mono font-bold text-primary truncate max-w-[200px]" title={item.name}>
                    📁 {item.name}
                  </span>
                  <span className="text-[10px] bg-brand-mint text-primary font-bold px-2 py-0.5 rounded">
                    {item.status}
                  </span>
                </div>
                <p className="text-xs font-semibold text-on-surface mb-1">{item.type}</p>
                <p className="text-[11px] text-on-surface-variant leading-relaxed">{item.description}</p>
              </div>

              <button
                onClick={() => handleLaunchScreen(item.actionPage)}
                className="mt-3 text-xs text-primary font-bold hover:underline flex items-center gap-1 self-start"
              >
                <span>Launch in App</span>
                <span className="material-symbols-outlined text-xs">open_in_new</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
