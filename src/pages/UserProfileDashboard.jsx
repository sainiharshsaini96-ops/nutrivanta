import React from 'react';
import { useApp } from '../context/AppContext';

export default function UserProfileDashboard() {
  const { user, setIsEditProfileOpen, setIsVideoCallOpen, setActivePage } = useApp();

  return (
    <main className="w-full max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-10 md:py-16">
      {/* Top Welcome Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-on-surface">Patient Portal</h1>
          <p className="text-xs sm:text-sm text-on-surface-variant">Manage your personalized clinical consultations and health profile.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActivePage('payments')}
            className="bg-surface-container-low dark:bg-surface-container text-primary font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-surface-variant hover:border-primary transition-all flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-base">receipt_long</span>
            <span>Billing & Invoices</span>
          </button>
          <button
            onClick={() => setActivePage('nutritionists')}
            className="bg-primary-container text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl hover:opacity-90 transition-opacity shadow-sm flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-base">add_circle</span>
            <span>New Appointment</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Profile Sidebar (4 cols) */}
        <aside className="lg:col-span-4 flex flex-col gap-6">
          {/* User Card */}
          <div className="bg-surface-container-lowest dark:bg-inverse-surface rounded-20px p-6 sm:p-8 shadow-ambient border border-surface-variant flex flex-col items-center text-center">
            <div className="relative mb-4">
              <img
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-surface shadow-sm"
                src={user.avatar}
                alt={user.name}
              />
              <button
                onClick={() => setIsEditProfileOpen(true)}
                className="absolute bottom-0 right-0 bg-primary-container text-on-primary rounded-full p-2 shadow-md hover:bg-primary transition-colors cursor-pointer"
                title="Edit Avatar"
              >
                <span className="material-symbols-outlined text-sm">edit</span>
              </button>
            </div>

            <h2 className="text-xl font-bold text-on-surface mb-0.5">Hi, {user.name} 👋</h2>
            <p className="text-xs sm:text-sm text-primary-container font-semibold mb-6">{user.role}</p>

            <button
              onClick={() => setIsEditProfileOpen(true)}
              className="w-full bg-brand-mint text-primary-container font-bold text-xs sm:text-sm py-3 rounded-xl hover:bg-secondary-fixed transition-colors shadow-sm"
            >
              Edit Profile Information
            </button>
          </div>

          {/* Health Goals Box */}
          <div className="bg-surface-container-lowest dark:bg-inverse-surface rounded-20px p-6 shadow-ambient border border-surface-variant">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-xs font-bold text-on-surface uppercase tracking-wider text-outline">
                Health Goals
              </h3>
              <button
                onClick={() => setIsEditProfileOpen(true)}
                className="text-xs text-primary font-bold hover:underline"
              >
                Edit
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {user.healthGoals.map((goal, idx) => (
                <span
                  key={idx}
                  className="bg-brand-mint text-primary-container font-semibold px-3 py-1.5 rounded-full text-xs border border-primary/10"
                >
                  {goal}
                </span>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Dashboard Area (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Dashboard Stats Bento (3 cards) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-surface-container-lowest dark:bg-inverse-surface rounded-20px p-5 sm:p-6 shadow-ambient border border-surface-variant flex items-center gap-4 hover-lift">
              <div className="w-12 h-12 rounded-2xl bg-brand-mint text-primary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined fill text-2xl">event_available</span>
              </div>
              <div>
                <p className="text-xs text-on-surface-variant font-medium">Consultations</p>
                <p className="text-2xl font-bold text-on-surface">{user.stats.totalConsultations}</p>
              </div>
            </div>

            <div className="bg-surface-container-lowest dark:bg-inverse-surface rounded-20px p-5 sm:p-6 shadow-ambient border border-surface-variant flex items-center gap-4 hover-lift">
              <div className="w-12 h-12 rounded-2xl bg-brand-mint text-primary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined fill text-2xl">monitor_heart</span>
              </div>
              <div>
                <p className="text-xs text-on-surface-variant font-medium">Active Plans</p>
                <p className="text-2xl font-bold text-on-surface">{user.stats.activePlans}</p>
              </div>
            </div>

            <div className="bg-surface-container-lowest dark:bg-inverse-surface rounded-20px p-5 sm:p-6 shadow-ambient border border-surface-variant flex items-center gap-4 hover-lift">
              <div className="w-12 h-12 rounded-2xl bg-brand-mint text-primary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined fill text-2xl">payments</span>
              </div>
              <div>
                <p className="text-xs text-on-surface-variant font-medium">Total Spent</p>
                <p className="text-2xl font-bold text-on-surface">₹{user.stats.totalSpent}</p>
              </div>
            </div>
          </div>

          {/* 2 Bento Columns: Personal Info & Upcoming Consultation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Info Card */}
            <div className="bg-surface-container-lowest dark:bg-inverse-surface rounded-20px p-6 shadow-ambient border border-surface-variant flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-base font-bold text-on-surface">Personal Details</h2>
                  <button
                    onClick={() => setIsEditProfileOpen(true)}
                    className="p-1 rounded-lg text-primary hover:bg-brand-mint transition-colors"
                    title="Edit Personal Information"
                  >
                    <span className="material-symbols-outlined text-lg">edit_note</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-y-4 gap-x-3 text-xs">
                  <div>
                    <p className="text-outline uppercase font-semibold text-[10px] mb-0.5">Full Name</p>
                    <p className="font-bold text-on-surface text-sm">{user.name}</p>
                  </div>

                  <div>
                    <p className="text-outline uppercase font-semibold text-[10px] mb-0.5">Email</p>
                    <p className="font-bold text-on-surface text-xs truncate" title={user.email}>{user.email}</p>
                  </div>

                  <div>
                    <p className="text-outline uppercase font-semibold text-[10px] mb-0.5">Phone</p>
                    <p className="font-bold text-on-surface">{user.phone}</p>
                  </div>

                  <div>
                    <p className="text-outline uppercase font-semibold text-[10px] mb-0.5">Date of Birth</p>
                    <p className="font-bold text-on-surface">{user.dob}</p>
                  </div>

                  <div>
                    <p className="text-outline uppercase font-semibold text-[10px] mb-0.5">Gender</p>
                    <p className="font-bold text-on-surface">{user.gender}</p>
                  </div>

                  <div>
                    <p className="text-outline uppercase font-semibold text-[10px] mb-0.5">Location</p>
                    <p className="font-bold text-on-surface">{user.location}</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-surface-variant mt-4 text-[11px] text-on-surface-variant flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm text-primary">verified</span>
                <span>Verified Patient Account</span>
              </div>
            </div>

            {/* Upcoming Consultation Card */}
            <div className="bg-surface-container-lowest dark:bg-inverse-surface rounded-20px p-6 shadow-ambient border border-surface-variant flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-28 h-28 bg-brand-mint/30 rounded-bl-full -mr-6 -mt-6 pointer-events-none"></div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-base font-bold text-on-surface">Next Consultation</h2>
                  <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold px-2 py-0.5 rounded-full uppercase">
                    {user.upcomingConsultation.status}
                  </span>
                </div>

                <div className="flex items-center gap-3 p-3 bg-surface-container-low dark:bg-surface-container rounded-xl border border-surface-variant mb-4">
                  <img
                    className="w-12 h-12 rounded-full object-cover border border-primary/20"
                    src={user.upcomingConsultation.doctorAvatar}
                    alt={user.upcomingConsultation.doctorName}
                  />
                  <div>
                    <p className="text-xs font-bold text-on-surface">{user.upcomingConsultation.doctorName}</p>
                    <p className="text-[11px] text-primary font-medium">{user.upcomingConsultation.doctorRole}</p>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-on-surface-variant mb-4">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-base">calendar_month</span>
                    <span className="font-semibold text-on-surface">{user.upcomingConsultation.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-base">schedule</span>
                    <span>{user.upcomingConsultation.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-base">videocam</span>
                    <span>Encrypted Video Call</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsVideoCallOpen(true)}
                className="w-full bg-primary text-white font-bold text-xs sm:text-sm py-3 rounded-xl hover:bg-primary-container hover-lift shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">video_call</span>
                <span>Join Video Call</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
