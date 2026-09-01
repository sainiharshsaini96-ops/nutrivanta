import React from 'react';
import { useApp } from '../context/AppContext';
import { PROTOTYPE_SCREENS } from '../data/mockData';

export default function PrototypeNavDrawer() {
  const { activePage, setActivePage, isPrototypeDrawerOpen, setIsPrototypeDrawerOpen } = useApp();

  return (
    <>
      {/* Floating Trigger Button on Bottom Left */}
      <button
        onClick={() => setIsPrototypeDrawerOpen(true)}
        className="fixed bottom-6 left-6 z-40 bg-primary-container text-white px-4 py-2.5 rounded-full shadow-elevated hover:scale-105 active:scale-95 transition-all flex items-center gap-2 border border-emerald-600/30 text-xs sm:text-sm font-semibold cursor-pointer group"
        title="Browse All Converted Stitch Screens"
      >
        <span className="material-symbols-outlined text-base sm:text-lg animate-spin-slow">hub</span>
        <span className="hidden sm:inline">Stitch Prototype Matrix</span>
        <span className="sm:hidden">Screens</span>
        <span className="bg-emerald-800 text-emerald-200 text-[10px] px-1.5 py-0.5 rounded-full font-bold">13 Folders</span>
      </button>

      {/* Slide-over / Modal Drawer */}
      {isPrototypeDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
            onClick={() => setIsPrototypeDrawerOpen(false)}
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-surface-container-lowest dark:bg-inverse-surface border-l border-surface-variant p-6 shadow-2xl flex flex-col justify-between overflow-y-auto">
              <div>
                {/* Header */}
                <div className="flex justify-between items-center pb-4 border-b border-surface-variant mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-xl bg-brand-mint text-primary flex items-center justify-center">
                      <span className="material-symbols-outlined">hub</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-on-surface dark:text-inverse-on-surface text-base">Stitch Screen Navigator</h3>
                      <p className="text-xs text-on-surface-variant dark:text-outline-variant">Converted 13 folders into modular React</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsPrototypeDrawerOpen(false)}
                    className="p-1 rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors"
                  >
                    <span className="material-symbols-outlined">close</span>
                  </button>
                </div>

                {/* Subfolder Screen List */}
                <div className="space-y-2 mb-6">
                  <p className="text-xs font-bold uppercase tracking-wider text-outline mb-2">Available Screens</p>
                  {PROTOTYPE_SCREENS.map((scr) => {
                    const isActive = activePage === scr.id;
                    return (
                      <button
                        key={scr.id}
                        onClick={() => {
                          setActivePage(scr.id);
                          setIsPrototypeDrawerOpen(false);
                        }}
                        className={`w-full text-left p-3 rounded-xl border transition-all flex items-start gap-3 ${
                          isActive
                            ? 'bg-brand-mint/40 border-primary shadow-sm'
                            : 'bg-surface dark:bg-surface-container border-surface-variant hover:border-primary/40 hover:bg-surface-container-low'
                        }`}
                      >
                        <div className={`p-2 rounded-lg ${isActive ? 'bg-primary text-white' : 'bg-surface-variant text-primary'}`}>
                          <span className="material-symbols-outlined text-lg">{scr.icon}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className={`text-sm font-semibold truncate ${isActive ? 'text-primary' : 'text-on-surface'}`}>
                              {scr.label}
                            </h4>
                            {isActive && (
                              <span className="text-[10px] bg-primary text-white px-2 py-0.5 rounded-full font-bold">Active</span>
                            )}
                          </div>
                          <p className="text-[11px] text-on-surface-variant truncate mt-0.5">
                            📁 <span className="font-mono">{scr.folder}</span>
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Quick Flow Presets */}
                <div className="p-4 rounded-xl bg-surface-container-low dark:bg-surface-container border border-surface-variant space-y-3">
                  <h4 className="text-xs font-bold uppercase text-primary tracking-wider">End-to-End Test Flows</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        setActivePage('home');
                        setIsPrototypeDrawerOpen(false);
                      }}
                      className="text-xs text-left p-2.5 rounded-lg bg-surface hover:bg-white border border-surface-variant font-medium text-on-surface"
                    >
                      🚀 1. Patient Journey (Home &rarr; Profile)
                    </button>
                    <button
                      onClick={() => {
                        setActivePage('checkout');
                        setIsPrototypeDrawerOpen(false);
                      }}
                      className="text-xs text-left p-2.5 rounded-lg bg-surface hover:bg-white border border-surface-variant font-medium text-on-surface"
                    >
                      💳 2. Payment Checkout Flow
                    </button>
                    <button
                      onClick={() => {
                        setActivePage('dashboard');
                        setIsPrototypeDrawerOpen(false);
                      }}
                      className="text-xs text-left p-2.5 rounded-lg bg-surface hover:bg-white border border-surface-variant font-medium text-on-surface"
                    >
                      👤 3. Patient Dashboard & Call
                    </button>
                    <button
                      onClick={() => {
                        setActivePage('payments');
                        setIsPrototypeDrawerOpen(false);
                      }}
                      className="text-xs text-left p-2.5 rounded-lg bg-surface hover:bg-white border border-surface-variant font-medium text-on-surface"
                    >
                      🧾 4. Ledger & Invoice Export
                    </button>
                  </div>
                </div>
              </div>

              {/* Drawer Footer */}
              <div className="pt-4 border-t border-surface-variant mt-6 flex justify-between items-center text-xs text-on-surface-variant">
                <span>Design System: <strong>NutriVanta Elite</strong></span>
                <span className="text-primary font-semibold">100% React + Tailwind</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
