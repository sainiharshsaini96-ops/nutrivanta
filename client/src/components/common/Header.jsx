import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';

export const Header = ({ searchTerm, setSearchTerm, onOpenFilters }) => {
  const { itemsCount, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, isAuthenticated, logout, openAuthModal } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  const isHome = location.pathname === '/';

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <header className="fixed top-0 w-full z-50 bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] pt-safe">
      <div className={`px-margin-mobile flex flex-col justify-between ${isHome ? 'h-36 py-space-xs' : 'h-16'}`}>
        {/* Top Row: Brand & Icons */}
        <div className="flex items-center justify-between gap-space-xs h-16">
          <div className="flex items-center gap-space-xs">
            {!isHome && (
              <button 
                onClick={() => navigate(-1)} 
                className="w-10 h-10 flex items-center justify-center text-on-surface hover:text-primary transition-colors -ml-1 rounded-full active:bg-surface-container"
                title="Back"
              >
                <span className="material-symbols-outlined text-[24px]">arrow_back</span>
              </button>
            )}
            
            <Link to="/" className="flex items-center gap-2 group">
              <img
                alt="ElectroMart Logo"
                className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBe7zLsjSSlurjtUtFUqtrS3DFxlDInTOn9imUd2zehR76Qk35W4kVFwyXe1GzrH5stVp5N0hYquUF-RihTycl94wVxdKWWwJ9MuqAVJcSP3B7H-pRX_3o84K-zq_PtYT646yj_DCTvL4V2TjVhNpVJ1Zxa_Hx9InRpO6BJSR9umFIYKDNWyTFTtihcrZtrRwZ4xfQN7dfz4UhkiWJPyLMutbfrxyiJagB94VY4etQFhNR0ABB98FvXrw"
              />
              <div className="flex flex-col">
                <span className="font-headline-sm text-headline-sm font-bold tracking-tight text-on-surface leading-none">
                  ElectroMart
                </span>
                {isHome && (
                  <button className="flex items-center gap-0.5 text-on-surface-variant hover:text-primary transition-colors text-left mt-0.5">
                    <span className="material-symbols-outlined text-[13px] text-primary">location_on</span>
                    <span className="font-body-sm text-[11px] text-on-surface-variant truncate max-w-[120px]">Deliver to NY 10001</span>
                    <span className="material-symbols-outlined text-[13px]">expand_more</span>
                  </button>
                )}
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-1">
            {/* Wishlist Button */}
            <Link
              to="/#deals"
              className="relative w-10 h-10 flex items-center justify-center text-on-surface hover:text-primary transition-colors rounded-full"
              title="Wishlist"
            >
              <span className="material-symbols-outlined text-[22px]">favorite</span>
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 min-w-[16px] h-4 px-1 rounded-full bg-tertiary text-on-tertiary font-badge text-[10px] flex items-center justify-center leading-none font-bold">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative w-10 h-10 flex items-center justify-center text-on-surface hover:text-primary transition-colors rounded-full"
              title="Cart"
            >
              <span className="material-symbols-outlined text-[22px]">shopping_bag</span>
              {itemsCount > 0 && (
                <span className="absolute top-1 right-1 min-w-[16px] h-4 px-1 rounded-full bg-primary-container text-on-primary font-badge text-[10px] flex items-center justify-center leading-none font-bold">
                  {itemsCount}
                </span>
              )}
            </button>

            {/* Profile / Auth Button */}
            <div className="relative" ref={profileRef}>
              {isAuthenticated ? (
                <>
                  <button
                    id="profile-avatar-btn"
                    onClick={() => setProfileOpen(p => !p)}
                    className="w-9 h-9 ml-1 flex items-center justify-center rounded-full overflow-hidden ring-2 ring-transparent hover:ring-primary/40 transition-all bg-primary/10 text-primary font-bold text-sm select-none"
                    title={user?.name || 'Profile'}
                    aria-label="Profile menu"
                  >
                    {user?.avatar || user?.name?.[0]?.toUpperCase() || '?'}
                  </button>
                  {profileOpen && (
                    <div className="absolute right-0 top-11 w-52 bg-surface rounded-2xl shadow-xl border border-outline-variant/40 z-50 overflow-hidden animate-slideUp">
                      <div className="px-4 py-3 border-b border-outline-variant/30">
                        <p className="font-semibold text-sm text-on-surface truncate">{user?.name}</p>
                        <p className="text-xs text-on-surface-variant truncate">{user?.email}</p>
                      </div>
                      <div className="p-1.5">
                        <button
                          id="signout-btn"
                          onClick={() => { logout(); setProfileOpen(false); }}
                          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-on-surface hover:bg-surface-container-high transition-colors"
                        >
                          <span className="material-symbols-outlined text-[18px] text-on-surface-variant">logout</span>
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <button
                  id="signin-header-btn"
                  onClick={() => openAuthModal('signin')}
                  className="ml-1 h-9 px-4 rounded-full bg-primary text-on-primary text-sm font-semibold flex items-center gap-1.5 hover:brightness-110 transition-all active:scale-95 shadow-sm"
                  aria-label="Sign In"
                >
                  <span className="material-symbols-outlined text-[16px]">person</span>
                  <span className="hidden sm:inline">Sign In</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Search Bar Row (Home Screen) */}
        {isHome && (
          <div className="flex items-center gap-space-xs pb-space-xs">
            <div className="flex-1 flex items-center h-11 bg-surface-container-lowest rounded-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] px-space-sm gap-space-xs border border-transparent focus-within:border-primary/40 transition-colors">
              <span className="material-symbols-outlined text-outline text-[20px]">search</span>
              <input
                type="text"
                value={searchTerm || ''}
                onChange={(e) => setSearchTerm && setSearchTerm(e.target.value)}
                placeholder="Search laptops, GPUs, phones..."
                className="flex-1 bg-transparent font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none"
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm && setSearchTerm('')} 
                  className="w-6 h-6 flex items-center justify-center text-outline hover:text-on-surface"
                >
                  <span className="material-symbols-outlined text-[16px]">close</span>
                </button>
              )}
              <button 
                type="button" 
                className="w-8 h-8 flex items-center justify-center text-outline hover:text-primary transition-colors"
                title="Voice search"
              >
                <span className="material-symbols-outlined text-[18px]">mic</span>
              </button>
              <button 
                type="button" 
                className="w-8 h-8 flex items-center justify-center text-outline hover:text-primary transition-colors"
                title="Visual search"
              >
                <span className="material-symbols-outlined text-[18px]">photo_camera</span>
              </button>
            </div>
            
            <button 
              onClick={onOpenFilters} 
              className="h-11 px-space-sm bg-surface-container-high hover:bg-surface-variant text-on-surface rounded-xl flex items-center gap-1 transition-colors active:scale-95"
            >
              <span className="material-symbols-outlined text-[18px] text-primary">tune</span>
              <span className="font-label-md text-label-md hidden xs:inline">All</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
