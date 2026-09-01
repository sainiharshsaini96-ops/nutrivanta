import React from 'react';
import { useApp } from '../context/AppContext';
import { BRAND_INFO } from '../data/mockData';

export default function Footer() {
  const { setActivePage, setIsPrototypeDrawerOpen } = useApp();

  return (
    <footer className="bg-surface-container-low dark:bg-inverse-surface w-full py-xl px-margin-mobile md:px-margin-desktop border-t border-surface-variant transition-colors mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
        {/* Brand Column */}
        <div className="md:col-span-2 flex flex-col gap-sm">
          <button
            onClick={() => setActivePage('home')}
            className="flex items-center gap-sm mb-sm text-left focus:outline-none w-fit group"
          >
            <img
              alt="NutriVanta Logo"
              className="h-8 w-8 object-contain group-hover:scale-105 transition-transform"
              src={BRAND_INFO.logoUrl}
            />
            <span className="text-headline-md font-bold text-primary dark:text-primary-fixed tracking-tight">
              {BRAND_INFO.name}
            </span>
          </button>
          <p className="text-body-md text-on-surface-variant dark:text-outline-variant max-w-sm">
            Empowering healthier lives through clinical precision, bespoke dietary science, and verified nutritional experts.
          </p>
          <div className="flex items-center gap-3 mt-2 text-primary dark:text-primary-fixed">
            <span className="inline-flex items-center gap-1 text-xs bg-brand-mint text-primary font-semibold px-2.5 py-1 rounded-full">
              <span className="material-symbols-outlined text-xs fill">verified</span>
              ISO 27001 Certified Health Platform
            </span>
          </div>
          <p className="text-label-sm text-outline mt-4">
            © {new Date().getFullYear()} NutriVanta Healthcare Inc. All rights reserved.
          </p>
        </div>

        {/* Platform Links */}
        <div className="flex flex-col gap-2.5">
          <h4 className="font-semibold text-on-surface dark:text-inverse-on-surface text-sm mb-1 uppercase tracking-wider">
            Platform
          </h4>
          <button onClick={() => setActivePage('home')} className="text-left text-sm text-on-surface-variant dark:text-outline-variant hover:text-primary dark:hover:text-primary-fixed transition-colors">
            Home Overview
          </button>
          <button onClick={() => setActivePage('about')} className="text-left text-sm text-on-surface-variant dark:text-outline-variant hover:text-primary dark:hover:text-primary-fixed transition-colors">
            About Our Mission
          </button>
          <button onClick={() => setActivePage('nutritionists')} className="text-left text-sm text-on-surface-variant dark:text-outline-variant hover:text-primary dark:hover:text-primary-fixed transition-colors">
            Find Nutritionists
          </button>
          <button onClick={() => setActivePage('prototype_hub')} className="text-left text-sm text-on-surface-variant dark:text-outline-variant hover:text-primary dark:hover:text-primary-fixed transition-colors flex items-center gap-1">
            <span>Prototype Hub</span>
            <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.2 rounded font-bold">ALL</span>
          </button>
        </div>

        {/* For Clients */}
        <div className="flex flex-col gap-2.5">
          <h4 className="font-semibold text-on-surface dark:text-inverse-on-surface text-sm mb-1 uppercase tracking-wider">
            For Clients
          </h4>
          <button onClick={() => setActivePage('dashboard')} className="text-left text-sm text-on-surface-variant dark:text-outline-variant hover:text-primary dark:hover:text-primary-fixed transition-colors">
            Patient Dashboard
          </button>
          <button onClick={() => setActivePage('payments')} className="text-left text-sm text-on-surface-variant dark:text-outline-variant hover:text-primary dark:hover:text-primary-fixed transition-colors">
            Payment History & Invoices
          </button>
          <button onClick={() => setActivePage('contact')} className="text-left text-sm text-on-surface-variant dark:text-outline-variant hover:text-primary dark:hover:text-primary-fixed transition-colors">
            Contact Support & FAQ
          </button>
        </div>

        {/* Legal & Compliance */}
        <div className="flex flex-col gap-2.5">
          <h4 className="font-semibold text-on-surface dark:text-inverse-on-surface text-sm mb-1 uppercase tracking-wider">
            Legal
          </h4>
          <button onClick={() => setActivePage('contact')} className="text-left text-sm text-on-surface-variant dark:text-outline-variant hover:text-primary dark:hover:text-primary-fixed transition-colors">
            Privacy Policy
          </button>
          <button onClick={() => setActivePage('contact')} className="text-left text-sm text-on-surface-variant dark:text-outline-variant hover:text-primary dark:hover:text-primary-fixed transition-colors">
            Terms of Service
          </button>
          <button onClick={() => setActivePage('contact')} className="text-left text-sm text-on-surface-variant dark:text-outline-variant hover:text-primary dark:hover:text-primary-fixed transition-colors">
            Refund & Cancellation
          </button>
          <button
            onClick={() => setIsPrototypeDrawerOpen(true)}
            className="text-left text-xs text-primary font-bold hover:underline mt-2 flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-sm">hub</span>
            <span>Switch Screen View</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
