import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BRAND_INFO } from '../data/mockData';

export default function Navbar() {
  const { activePage, setActivePage, user, showToast, darkMode, toggleDarkMode } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'nutritionists', label: 'Nutritionists' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      showToast(`Searching for "${searchQuery}" in nutritionists & health topics...`, 'info');
      setActivePage('nutritionists');
      setShowSearch(false);
      setSearchQuery('');
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-surface/95 dark:bg-inverse-surface/95 backdrop-blur-md shadow-[0px_4px_20px_rgba(23,107,82,0.06)] border-b border-surface-variant/40 transition-colors">
      <nav className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-3.5 flex justify-between items-center w-full">
        {/* Brand Logo */}
        <div className="flex items-center gap-gutter">
          <button
            onClick={() => setActivePage('home')}
            className="flex items-center gap-sm cursor-pointer group focus:outline-none"
          >
            <img
              alt="NutriVanta Logo"
              className="h-9 w-9 object-contain group-hover:scale-105 transition-transform"
              src={BRAND_INFO.logoUrl}
            />
            <span className="text-headline-md font-bold text-primary dark:text-primary-fixed tracking-tight">
              {BRAND_INFO.name}
            </span>
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-md ml-lg">
            {navLinks.map((link) => {
              const isActive = activePage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => setActivePage(link.id)}
                  className={`font-label-md text-label-md transition-all py-1.5 cursor-pointer relative ${
                    isActive
                      ? 'text-primary dark:text-primary-fixed font-bold border-b-2 border-primary dark:border-primary-fixed'
                      : 'text-on-surface-variant dark:text-outline-variant font-medium hover:text-primary dark:hover:text-primary-fixed'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            className="p-2 rounded-full text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-colors"
          >
            <span className="material-symbols-outlined text-[22px]">
              {darkMode ? 'light_mode' : 'dark_mode'}
            </span>
          </button>

          {/* Search Trigger */}
          <div className="relative">
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="hidden sm:flex items-center justify-center p-2 rounded-full text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-colors"
              title="Search"
            >
              <span className="material-symbols-outlined text-[22px]">search</span>
            </button>

            {showSearch && (
              <div className="absolute right-0 top-12 w-72 bg-surface-container-lowest dark:bg-inverse-surface rounded-xl shadow-elevated border border-surface-variant p-3 z-50">
                <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Search doctors, diet plans..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                    className="w-full text-xs sm:text-sm bg-surface-container-low dark:bg-surface-container rounded-lg px-3 py-2 text-on-surface outline-none focus:ring-1 focus:ring-primary"
                  />
                  <button type="submit" className="bg-primary text-white p-2 rounded-lg text-xs hover:bg-primary-container">
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="flex items-center justify-center p-2 rounded-full text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-colors relative"
              title="Notifications"
            >
              <span className="material-symbols-outlined text-[22px]">notifications</span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full ring-2 ring-white"></span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 top-12 w-80 bg-surface-container-lowest dark:bg-inverse-surface rounded-2xl shadow-elevated border border-surface-variant p-4 z-50">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-bold text-sm text-on-surface">Notifications</h4>
                  <span className="text-xs bg-brand-mint text-primary px-2 py-0.5 rounded-full font-semibold">1 New</span>
                </div>
                <div className="space-y-2">
                  <div
                    onClick={() => {
                      setActivePage('dashboard');
                      setShowNotifications(false);
                    }}
                    className="p-2.5 rounded-xl bg-surface-container-low dark:bg-surface-container hover:bg-surface-container cursor-pointer transition-colors"
                  >
                    <p className="text-xs font-semibold text-primary">Consultation Confirmed</p>
                    <p className="text-xs text-on-surface-variant mt-0.5">Your video consultation with Dr. Priya Sharma is scheduled for 25 Aug at 10:00 AM.</p>
                    <span className="text-[10px] text-outline mt-1 block">10 mins ago</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Book Consultation Button */}
          <button
            onClick={() => setActivePage('nutritionists')}
            className="bg-primary-container text-on-primary font-label-md text-label-md px-4 py-2 rounded-lg hover:opacity-90 hover:shadow-md transition-all hidden sm:flex items-center gap-1.5 shadow-sm"
          >
            <span className="material-symbols-outlined text-base">calendar_month</span>
            <span>Book Consultation</span>
          </button>

          {/* User Profile Avatar with dropdown shortcut */}
          <button
            onClick={() => setActivePage('dashboard')}
            title="Go to Patient Dashboard"
            className="flex items-center gap-2 group cursor-pointer focus:outline-none"
          >
            <img
              alt={`${user.name}'s Profile Avatar`}
              className={`h-9 w-9 rounded-full object-cover border-2 transition-all ${
                activePage === 'dashboard'
                  ? 'border-primary ring-2 ring-primary/30'
                  : 'border-surface-variant group-hover:border-primary'
              }`}
              src={user.avatar}
            />
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-primary rounded-lg hover:bg-surface-variant transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            <span className="material-symbols-outlined text-2xl">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-surface-container-lowest dark:bg-inverse-surface border-b border-surface-variant px-margin-mobile py-4 space-y-2">
          {navLinks.map((link) => {
            const isActive = activePage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => {
                  setActivePage(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center justify-between ${
                  isActive
                    ? 'bg-brand-mint text-primary font-bold'
                    : 'text-on-surface hover:bg-surface-container-low'
                }`}
              >
                <span>{link.label}</span>
                {isActive && <span className="material-symbols-outlined text-sm">chevron_right</span>}
              </button>
            );
          })}
          
          <div className="pt-2 border-t border-surface-variant space-y-2">
            <button
              onClick={() => {
                setActivePage('dashboard');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-4 py-2.5 rounded-lg text-sm text-on-surface hover:bg-surface-container-low flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-primary text-base">person</span>
              <span>Patient Dashboard</span>
            </button>
            <button
              onClick={() => {
                setActivePage('payments');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-4 py-2.5 rounded-lg text-sm text-on-surface hover:bg-surface-container-low flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-primary text-base">receipt_long</span>
              <span>Payment History</span>
            </button>
            <button
              onClick={() => {
                setActivePage('nutritionists');
                setMobileMenuOpen(false);
              }}
              className="w-full bg-primary-container text-on-primary py-2.5 rounded-lg text-sm font-semibold text-center mt-2 shadow-sm"
            >
              Book Consultation
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
