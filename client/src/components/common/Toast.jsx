import React from 'react';
import { useCart } from '../../context/CartContext';

export const Toast = () => {
  const { toastMessage } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-full bg-inverse-surface text-inverse-on-surface font-label-md text-label-md shadow-2xl flex items-center gap-2 animate-bounce transition-all duration-300 pointer-events-none">
      <span className="material-symbols-outlined text-secondary-fixed-dim text-[18px]">check_circle</span>
      <span>{toastMessage}</span>
    </div>
  );
};
