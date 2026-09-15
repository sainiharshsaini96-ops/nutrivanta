import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

export const BottomNav = () => {
  const location = useLocation();
  const { itemsCount, setIsCartOpen } = useCart();

  const isHome = location.pathname === '/';
  const isCheckout = location.pathname === '/checkout';

  // Do not show bottom navigation on checkout screen to preserve payment focus
  if (isCheckout) return null;

  return (
    <nav className="fixed bottom-0 w-full z-40 pb-safe bg-surface/85 backdrop-blur-xl shadow-[0_-1px_8px_rgba(0,0,0,0.04)] border-t border-surface-container-high md:hidden">
      <div className="flex justify-around items-center h-16 px-space-xs">
        {/* Home */}
        <Link
          to="/"
          className={`flex-1 flex flex-col items-center justify-center h-14 min-w-[44px] transition-colors gap-0.5 ${
            isHome ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-primary'
          }`}
        >
          <span className="material-symbols-outlined text-[22px]">home</span>
          <span className="font-body-sm text-[11px]">Home</span>
        </Link>

        {/* Categories */}
        <a
          href="#categories"
          className="flex-1 flex flex-col items-center justify-center h-14 min-w-[44px] text-on-surface-variant hover:text-primary transition-colors gap-0.5"
        >
          <span className="material-symbols-outlined text-[22px]">grid_view</span>
          <span className="font-body-sm text-[11px]">Categories</span>
        </a>

        {/* Deals */}
        <a
          href="#flash-deals"
          className="flex-1 flex flex-col items-center justify-center h-14 min-w-[44px] text-on-surface-variant hover:text-tertiary transition-colors gap-0.5 relative"
        >
          <span className="material-symbols-outlined text-[22px] text-tertiary">local_fire_department</span>
          <span className="absolute top-1 right-[22%] w-2 h-2 rounded-full bg-tertiary"></span>
          <span className="font-body-sm text-[11px] text-tertiary font-semibold">Deals</span>
        </a>

        {/* Cart Trigger */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="flex-1 flex flex-col items-center justify-center h-14 min-w-[44px] text-on-surface-variant hover:text-primary transition-colors gap-0.5 relative"
        >
          <span className="material-symbols-outlined text-[22px]">shopping_cart</span>
          {itemsCount > 0 && (
            <span className="absolute top-1 right-[22%] min-w-[14px] h-3.5 px-0.5 rounded-full bg-primary-container text-on-primary font-badge text-[9px] flex items-center justify-center leading-none font-bold">
              {itemsCount}
            </span>
          )}
          <span className="font-body-sm text-[11px]">Cart</span>
        </button>

        {/* Account */}
        <button
          onClick={() => alert('ElectroMart Account: Welcome back Alex Morgan!')}
          className="flex-1 flex flex-col items-center justify-center h-14 min-w-[44px] text-on-surface-variant hover:text-primary transition-colors gap-0.5"
        >
          <span className="material-symbols-outlined text-[22px]">person</span>
          <span className="font-body-sm text-[11px]">Account</span>
        </button>
      </div>
    </nav>
  );
};
