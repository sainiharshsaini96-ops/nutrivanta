import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { fetchProducts, fetchCategories, fetchBrands, fetchReviews } from '../services/api';

export const HomePage = ({ searchTerm }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState(null);

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 22, seconds: 15 });

  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const navigate = useNavigate();

  useEffect(() => {
    // Initial data fetching
    fetchProducts({ category: selectedCategory, search: searchTerm }).then(setProducts);
    fetchCategories().then(setCategories);
    fetchBrands().then(setBrands);
    fetchReviews().then(setReviews);
  }, [selectedCategory, searchTerm]);

  // Flash deals countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let total = prev.hours * 3600 + prev.minutes * 60 + prev.seconds - 1;
        if (total <= 0) total = 86400; // Reset
        return {
          hours: Math.floor(total / 3600),
          minutes: Math.floor((total % 3600) / 60),
          seconds: total % 60
        };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      alert('Please enter a valid email address');
      return;
    }
    setNewsletterStatus('Success! $20 voucher TECH10 added to your account.');
    setNewsletterEmail('');
  };

  return (
    <div className="flex flex-col w-full pb-24 space-y-6 pt-36">
      {/* 1. PROMOTIONAL HERO BANNER */}
      <section className="px-margin-mobile pt-3">
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary via-primary-container to-secondary p-space-md text-on-primary shadow-md">
          <div className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full bg-secondary-container/20 blur-2xl pointer-events-none" />
          <div className="absolute -top-12 -left-12 w-36 h-36 rounded-full bg-primary-fixed/20 blur-xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col space-y-3">
            {/* Live Tag Badge */}
            <div className="flex items-center space-x-2">
              <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-surface-container-lowest/15 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-secondary-container animate-pulse" />
                <span className="font-badge text-badge tracking-wider uppercase text-on-primary font-bold">
                  TechFest 2025 Live
                </span>
              </div>
              <span className="font-body-sm text-body-sm text-primary-fixed font-medium">Limited Drops</span>
            </div>

            {/* Headline & Subtitle */}
            <div className="space-y-1">
              <h1 className="font-headline-xl-mobile md:font-headline-xl text-headline-xl-mobile md:text-headline-xl font-bold tracking-tight text-on-primary">
                Upgrade Your Tech
              </h1>
              <p className="font-body-md text-body-md text-primary-fixed/90 max-w-[320px] leading-snug">
                Discover next-gen electronics with up to <span className="font-bold text-secondary-fixed">45% off</span> &amp; same-day delivery.
              </p>
            </div>

            {/* Image Showcase Composite */}
            <div className="relative w-full h-40 my-1 rounded-lg overflow-hidden bg-surface-container-lowest/10 backdrop-blur-sm flex items-center justify-center">
              <img
                className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-500"
                alt="Tech flagship showcase composition"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxfyAYascUhDqhmVBl913vLatBH8hpdr8c-k0zmp1fV8qgkTmzwS-nhG7YjwKpGAE7lfWYsx699pCzvGkYW76PT1oA8UM_2u5sIsW9x1bkEvEi2DKqMesl_h4mAqyBQpXkxV2VOWKbdjJwK12ZpRF7NULNOiXBAHQ6hh8XXT2nbRJEBkLotds7NOXgrQk-yYY94-jNbewqOdLW9eg9i_0dKhkTkjtrgBRRtm9rbht-naDtqQQ_H0l8rQ"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />
              <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between">
                <span className="font-label-md text-label-md text-surface-bright flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-secondary-container">bolt</span> Flagship Lineup
                </span>
                <span className="font-badge text-badge px-2 py-0.5 rounded-full bg-tertiary text-on-tertiary font-bold">
                  Ends Tonight
                </span>
              </div>
            </div>

            {/* Dual Action Buttons */}
            <div className="flex items-center gap-2 pt-1">
              <a
                href="#flash-deals"
                className="flex-1 h-11 px-4 rounded-lg bg-surface-container-lowest text-primary font-label-md text-label-md font-bold shadow-sm active:scale-[0.98] transition-transform flex items-center justify-center gap-1.5 hover:bg-surface-container-low text-center"
              >
                <span>Shop Now</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </a>
              <a
                href="#flash-deals"
                className="flex-1 h-11 px-4 rounded-lg bg-surface-container-lowest/15 backdrop-blur-md text-on-primary font-label-md text-label-md font-medium active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 hover:bg-surface-container-lowest/25 text-center"
              >
                <span className="material-symbols-outlined text-[18px]">local_fire_department</span>
                <span>Explore Deals</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SHOP BY CATEGORY */}
      <section id="categories" className="flex flex-col space-y-2.5">
        <div className="px-margin-mobile flex items-center justify-between">
          <div>
            <h2 className="font-headline-md text-headline-md font-bold text-on-surface">Categories</h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant">Browse pro-grade gear &amp; everyday essentials</p>
          </div>
          <button 
            onClick={() => setSelectedCategory('all')} 
            className="font-label-md text-label-md text-primary font-bold hover:underline flex items-center gap-0.5"
          >
            See All <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>
        </div>

        {/* Horizontal Category Rail */}
        <div className="flex overflow-x-auto no-scrollbar px-margin-mobile space-x-3 py-1">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className="flex flex-col items-center flex-shrink-0 group focus:outline-none"
              >
                <div
                  className={`w-16 h-16 rounded-xl flex items-center justify-center transition-all group-active:scale-95 shadow-sm ${
                    isActive
                      ? 'bg-primary text-on-primary shadow-md'
                      : 'bg-surface-container-high text-on-surface hover:bg-surface-variant'
                  }`}
                >
                  <span className={`material-symbols-outlined text-[28px] ${isActive ? 'text-on-primary' : 'text-primary'}`}>
                    {cat.icon}
                  </span>
                </div>
                <span
                  className={`font-label-md text-label-md mt-1.5 transition-colors ${
                    isActive ? 'text-primary font-bold' : 'text-on-surface-variant font-medium'
                  }`}
                >
                  {cat.name}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. TODAY'S FLASH DEALS */}
      <section id="flash-deals" className="px-margin-mobile flex flex-col space-y-3">
        {/* Header with Countdown Bar */}
        <div className="flex items-center justify-between bg-surface-container-high p-space-sm rounded-xl">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-tertiary text-on-tertiary flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-[20px] material-symbols-fill">local_fire_department</span>
            </div>
            <div>
              <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface leading-tight">Flash Deals</h2>
              <span className="font-body-sm text-body-sm text-tertiary font-semibold">Special Pricing</span>
            </div>
          </div>

          {/* Live Countdown Blocks */}
          <div className="flex items-center space-x-1 font-label-md text-label-md">
            <span className="px-1.5 py-0.5 rounded bg-inverse-surface text-inverse-on-surface font-mono font-bold">
              {String(timeLeft.hours).padStart(2, '0')}
            </span>
            <span className="text-on-surface-variant font-bold">:</span>
            <span className="px-1.5 py-0.5 rounded bg-inverse-surface text-inverse-on-surface font-mono font-bold">
              {String(timeLeft.minutes).padStart(2, '0')}
            </span>
            <span className="text-on-surface-variant font-bold">:</span>
            <span className="px-1.5 py-0.5 rounded bg-tertiary text-on-tertiary font-mono font-bold">
              {String(timeLeft.seconds).padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* Product Grid (2 columns on mobile, 3-4 on desktop) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter-mobile">
          {products.map((product) => {
            const isFav = isWishlisted(product.id);
            return (
              <div
                key={product.id}
                className="flex flex-col bg-surface-container-lowest rounded-xl p-space-sm shadow-sm hover:shadow-md transition-shadow relative border border-surface-container-high/40"
              >
                {/* Discount Tag & Wishlist */}
                <div className="flex items-center justify-between w-full mb-1">
                  <span className="font-badge text-badge px-2 py-0.5 rounded bg-tertiary text-on-tertiary font-bold leading-none">
                    {product.discount}
                  </span>
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className={`w-7 h-7 rounded-full bg-surface-container-low flex items-center justify-center transition-colors ${
                      isFav ? 'text-tertiary' : 'text-on-surface-variant hover:text-tertiary'
                    }`}
                    title={isFav ? 'Remove from wishlist' : 'Add to wishlist'}
                  >
                    <span className={`material-symbols-outlined text-[16px] ${isFav ? 'material-symbols-fill' : ''}`}>
                      favorite
                    </span>
                  </button>
                </div>

                {/* Product Image (clickable) */}
                <Link
                  to={`/product/${product.id}`}
                  className="w-full aspect-square rounded-lg bg-surface-container-low overflow-hidden flex items-center justify-center p-2 mb-2 group"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </Link>

                {/* Meta & Title */}
                <div className="flex flex-col flex-1 justify-between space-y-1.5">
                  <div>
                    <div className="flex items-center space-x-1 text-amber-500 mb-0.5">
                      <span className="material-symbols-outlined text-[14px] material-symbols-fill">star</span>
                      <span className="font-label-md text-label-md text-on-surface font-bold">{product.rating}</span>
                      <span className="font-body-sm text-body-sm text-outline">({(product.reviewCount / 1000).toFixed(1)}k)</span>
                    </div>
                    <Link
                      to={`/product/${product.id}`}
                      className="font-label-md text-label-md text-on-surface font-semibold line-clamp-2 leading-snug hover:text-primary transition-colors"
                    >
                      {product.name}
                    </Link>
                  </div>

                  {/* Stock Progress Bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between font-body-sm text-body-sm">
                      <span className="text-tertiary font-semibold text-[11px]">{product.badge || 'Fast Selling'}</span>
                      <span className="text-outline text-[11px]">{product.soldPercent}% sold</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-surface-container-high overflow-hidden">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${product.soldPercent}%` }}
                      />
                    </div>
                  </div>

                  {/* Price & Add Action */}
                  <div className="pt-1">
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-price-card text-price-card text-primary font-bold">
                        ${product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="font-price-strikethrough text-price-strikethrough text-outline line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => addToCart(product, 1)}
                      className="mt-2 w-full h-9 rounded-lg bg-primary-container hover:bg-primary text-on-primary font-label-md text-label-md font-semibold flex items-center justify-center gap-1 active:scale-95 transition-all shadow-sm"
                    >
                      <span className="material-symbols-outlined text-[16px]">add_shopping_cart</span>
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. TOP BRANDS SHOWCASE */}
      <section className="flex flex-col space-y-2.5">
        <div className="px-margin-mobile flex items-center justify-between">
          <div>
            <h2 className="font-headline-md text-headline-md font-bold text-on-surface">Top Tech Brands</h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant">Authorized official flagship partners</p>
          </div>
          <span className="font-badge text-badge px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-bold">
            100% Verified
          </span>
        </div>

        {/* Horizontal Brand Scroller */}
        <div className="flex overflow-x-auto no-scrollbar px-margin-mobile space-x-2.5 py-1">
          {brands.map((b, i) => (
            <div
              key={i}
              className="flex items-center px-4 py-2.5 rounded-xl bg-surface-container-lowest shadow-sm flex-shrink-0 space-x-2 hover:bg-surface-container-low transition-colors cursor-pointer border border-surface-container-high/40"
            >
              <span className="material-symbols-outlined text-primary text-[20px]">verified</span>
              <span className="font-label-md text-label-md font-bold text-on-surface">{b.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 5. WHY SHOP WITH ELECTROMART (TRUST FEATURES) */}
      <section className="px-margin-mobile">
        <div className="bg-surface-container-high rounded-xl p-space-md space-y-3">
          <div className="flex items-center space-x-2">
            <span className="material-symbols-outlined text-primary text-[22px]">shield</span>
            <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">The ElectroMart Promise</h3>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div className="bg-surface-container-lowest p-3 rounded-lg flex flex-col space-y-1 shadow-sm">
              <div className="w-8 h-8 rounded-lg bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">local_shipping</span>
              </div>
              <span className="font-label-md text-label-md font-bold text-on-surface">Express Delivery</span>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Free same-day shipping on orders over $50.</p>
            </div>

            <div className="bg-surface-container-lowest p-3 rounded-lg flex flex-col space-y-1 shadow-sm">
              <div className="w-8 h-8 rounded-lg bg-primary-fixed text-on-primary-fixed flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">published_with_changes</span>
              </div>
              <span className="font-label-md text-label-md font-bold text-on-surface">30-Day Returns</span>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Instant, hassle-free returns &amp; direct swaps.</p>
            </div>

            <div className="bg-surface-container-lowest p-3 rounded-lg flex flex-col space-y-1 shadow-sm">
              <div className="w-8 h-8 rounded-lg bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">verified_user</span>
              </div>
              <span className="font-label-md text-label-md font-bold text-on-surface">100% Genuine</span>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Factory sealed with full OEM warranty.</p>
            </div>

            <div className="bg-surface-container-lowest p-3 rounded-lg flex flex-col space-y-1 shadow-sm">
              <div className="w-8 h-8 rounded-lg bg-primary-fixed text-on-primary-fixed flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">support_agent</span>
              </div>
              <span className="font-label-md text-label-md font-bold text-on-surface">24/7 Tech Squad</span>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Live hardware expert guidance anytime.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. COMMUNITY REVIEWS CAROUSEL */}
      <section className="flex flex-col space-y-2.5">
        <div className="px-margin-mobile flex items-center justify-between">
          <div>
            <h2 className="font-headline-md text-headline-md font-bold text-on-surface">Verified Enthusiasts</h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant">Rated 4.9/5 by 45,000+ tech lovers</p>
          </div>
          <div className="flex items-center text-amber-500 font-label-md text-label-md font-bold">
            <span className="material-symbols-outlined text-[18px] material-symbols-fill">star</span>
            <span>4.9</span>
          </div>
        </div>

        <div className="flex overflow-x-auto no-scrollbar px-margin-mobile space-x-3 py-1">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="min-w-[260px] max-w-[280px] bg-surface-container-lowest p-3.5 rounded-xl shadow-sm flex flex-col justify-between space-y-2 flex-shrink-0 border border-surface-container-high/40"
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-500 text-[14px]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <span key={i} className="material-symbols-outlined text-[16px] material-symbols-fill">
                        star
                      </span>
                    ))}
                  </div>
                  <span className="font-body-sm text-body-sm text-outline">{rev.date}</span>
                </div>
                <p className="font-body-md text-body-md text-on-surface italic line-clamp-2">
                  "{rev.comment}"
                </p>
              </div>

              <div className="flex items-center space-x-2 pt-1">
                <div className="w-7 h-7 rounded-full bg-primary-fixed text-primary font-bold flex items-center justify-center text-xs">
                  {rev.avatar}
                </div>
                <div>
                  <div className="font-label-md text-label-md text-on-surface font-semibold leading-tight">{rev.author}</div>
                  <span className="font-body-sm text-body-sm text-secondary font-medium">Verified Buyer</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. NEWSLETTER SUBSCRIPTION CARD */}
      <section className="px-margin-mobile">
        <div className="bg-gradient-to-r from-inverse-surface to-on-surface text-inverse-on-surface rounded-xl p-space-md shadow-md relative overflow-hidden">
          <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-[110px] text-surface-container-lowest/5 select-none pointer-events-none">
            electric_bolt
          </span>
          <div className="relative z-10 space-y-2.5">
            <div className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-fixed font-badge text-badge font-bold">
              <span className="material-symbols-outlined text-[14px]">redeem</span>
              <span>Instant Welcome Perk</span>
            </div>
            <div className="space-y-0.5">
              <h3 className="font-headline-sm text-headline-sm font-bold text-inverse-on-surface">
                Get $20 Off Your First Order
              </h3>
              <p className="font-body-sm text-body-sm text-outline-variant">
                Subscribe for early drop access, VIP flash deals, and hardware giveaways.
              </p>
            </div>

            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2 pt-1">
              <div className="flex-1 h-11 bg-surface-container-lowest rounded-lg px-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-outline text-[18px]">mail</span>
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your tech email"
                  className="flex-1 bg-transparent font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="h-11 px-5 rounded-lg bg-primary-container hover:bg-primary text-on-primary font-label-md text-label-md font-bold shadow-sm active:scale-95 transition-all flex items-center justify-center gap-1"
              >
                <span>Claim $20 Off</span>
                <span className="material-symbols-outlined text-[16px]">bolt</span>
              </button>
            </form>

            {newsletterStatus && (
              <p className="text-secondary-fixed text-xs font-semibold">{newsletterStatus}</p>
            )}

            <p className="font-body-sm text-[11px] text-outline-variant text-center sm:text-left">
              Zero spam. Unsubscribe anytime with 1 click.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
