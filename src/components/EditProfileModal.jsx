import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function EditProfileModal() {
  const { user, updateUserProfile, isEditProfileOpen, setIsEditProfileOpen } = useApp();

  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    dob: user.dob,
    gender: user.gender,
    location: user.location,
    healthGoals: user.healthGoals.join(', ')
  });

  if (!isEditProfileOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserProfile({
      ...formData,
      healthGoals: formData.healthGoals.split(',').map(g => g.trim()).filter(Boolean)
    });
    setIsEditProfileOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setIsEditProfileOpen(false)}
      />

      {/* Modal Card */}
      <div className="relative bg-surface-container-lowest dark:bg-inverse-surface w-full max-w-lg rounded-20px shadow-elevated border border-surface-variant p-6 sm:p-8 z-10 animate-scale-up">
        <div className="flex justify-between items-center pb-4 border-b border-surface-variant mb-6">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-2xl">edit_note</span>
            <h2 className="text-headline-md font-bold text-on-surface">Edit Profile Details</h2>
          </div>
          <button
            onClick={() => setIsEditProfileOpen(false)}
            className="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-on-surface-variant mb-1">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full form-input p-2.5 text-sm bg-surface-bright text-on-surface"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-on-surface-variant mb-1">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full form-input p-2.5 text-sm bg-surface-bright text-on-surface"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-on-surface-variant mb-1">Phone</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
                className="w-full form-input p-2.5 text-sm bg-surface-bright text-on-surface"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-on-surface-variant mb-1">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                required
                className="w-full form-input p-2.5 text-sm bg-surface-bright text-on-surface"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-on-surface-variant mb-1">Date of Birth</label>
              <input
                type="text"
                value={formData.dob}
                onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                className="w-full form-input p-2.5 text-sm bg-surface-bright text-on-surface"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-on-surface-variant mb-1">Gender</label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                className="w-full form-input p-2.5 text-sm bg-surface-bright text-on-surface"
              >
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Non-Binary">Non-Binary</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-on-surface-variant mb-1">
              Health Goals (Comma separated)
            </label>
            <input
              type="text"
              value={formData.healthGoals}
              onChange={(e) => setFormData({ ...formData, healthGoals: e.target.value })}
              className="w-full form-input p-2.5 text-sm bg-surface-bright text-on-surface"
              placeholder="e.g. Weight Management, PCOS, Gut Health"
            />
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-surface-variant">
            <button
              type="button"
              onClick={() => setIsEditProfileOpen(false)}
              className="px-4 py-2 rounded-lg border border-outline-variant text-sm font-semibold hover:bg-surface-container-low transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-lg bg-primary-container text-white text-sm font-semibold hover:opacity-90 transition-opacity shadow-sm"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
