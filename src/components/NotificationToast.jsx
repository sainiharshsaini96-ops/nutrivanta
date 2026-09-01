import React from 'react';
import { useApp } from '../context/AppContext';

export default function NotificationToast() {
  const { toastMessage } = useApp();

  if (!toastMessage) return null;

  const isSuccess = toastMessage.type === 'success';
  const isInfo = toastMessage.type === 'info';

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-short">
      <div className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-elevated border text-sm font-medium ${
        isSuccess
          ? 'bg-emerald-900 text-emerald-50 border-emerald-700'
          : isInfo
          ? 'bg-sky-900 text-sky-50 border-sky-700'
          : 'bg-zinc-900 text-white border-zinc-700'
      }`}>
        <span className="material-symbols-outlined text-lg fill">
          {isSuccess ? 'check_circle' : isInfo ? 'info' : 'notifications'}
        </span>
        <span>{toastMessage.message}</span>
      </div>
    </div>
  );
}
