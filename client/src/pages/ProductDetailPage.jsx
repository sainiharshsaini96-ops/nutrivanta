import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { fetchProductById } from '../services/api';

export const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [hasWarranty, setHasWarranty] = useState(false);
  const [isSpecsOpen, setIsSpecsOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(1);

  // Delivery order countdown ticker
  const [orderCountdown, setOrderCountdown] = useState({ hours: 2, minutes: 45, seconds: 18 });

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    fetchProductById(id || 'sony-wh-1000xm5').then((data) => {
      setProduct(data);
      if (data && data.colors && data.colors.length > 0) {
        setSelectedColor(data.colors[0]);
      }
      setLoading(false);
    });
  }, [id]);

  useEffect(() => {
    const timer = setInterval(() => {
      setOrderCountdown(prev => {
        let total = prev.hours * 3600 + prev.minutes * 60 + prev.seconds - 1;
        if (total <= 0) total = 3600 * 3;
        return {
          hours: Math.floor(total / 3600),
          minutes: Math.floor((total % 3600) / 60),
          seconds: total % 60
        };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh] pt-20">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <span className="font-label-md text-label-md text-on-surface-variant font-medium">Loading hardware specs...</span>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-28 px-margin-mobile text-center py-20">
        <h2 className="font-headline-md text-headline-md font-bold text-on-surface">Product Not Found</h2>
        <button
          onClick={() => navigate('/')}
          className="mt-4 px-6 py-2.5 rounded-xl bg-primary text-on-primary font-bold"
        >
          Return Home
        </button>
      </div>
    );
  }

  const isFav = isWishlisted(product.id);
  const warrantyCost = 29.99;
  const currentTotal = (product.price * quantity + (hasWarranty ? warrantyCost : 0)).toFixed(2);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor ? selectedColor.name : 'Default', hasWarranty);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedColor ? selectedColor.name : 'Default', hasWarranty);
    navigate('/checkout');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: product.name, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Product link copied to clipboard!');
    }
  };

  return (
    <div className="flex flex-col relative w-full pt-16 bg-surface pb-28">
      {/* Product Image Stage */}
      <section className="relative w-full bg-surface-container-low overflow-hidden rounded-b-xl shadow-sm">
        <div className="relative w-full aspect-square flex items-center justify-center p-space-md">
          {/* Top Left Badges */}
          <div className="absolute top-space-md left-space-md flex flex-col gap-space-xs z-10">
            {product.discount && (
              <span className="px-2 py-1 rounded bg-tertiary text-on-tertiary font-badge text-badge tracking-wider uppercase font-bold shadow-sm">
                Save {product.discount.replace(/[^0-9%]/g, '')}
              </span>
            )}
            {product.isFlashDeal && (
              <span className="px-2 py-1 rounded bg-secondary text-on-secondary font-badge text-badge tracking-wider uppercase flex items-center gap-1 shadow-sm">
                <span className="material-symbols-outlined text-[14px]">bolt</span> Flash Deal
              </span>
            )}
          </div>

          {/* Top Right Action Buttons */}
          <div className="absolute top-space-md right-space-md flex flex-col gap-space-sm z-10">
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`w-10 h-10 rounded-full bg-surface-container-lowest/90 backdrop-blur-md shadow-md flex items-center justify-center transition-transform active:scale-90 ${
                isFav ? 'text-tertiary' : 'text-on-surface hover:text-tertiary'
              }`}
              title="Wishlist"
            >
              <span className={`material-symbols-outlined text-[20px] ${isFav ? 'material-symbols-fill' : ''}`}>
                favorite
              </span>
            </button>
            <button
              onClick={handleShare}
              className="w-10 h-10 rounded-full bg-surface-container-lowest/90 backdrop-blur-md shadow-md flex items-center justify-center text-on-surface hover:text-primary transition-transform active:scale-90"
              title="Share"
            >
              <span className="material-symbols-outlined text-[20px]">share</span>
            </button>
          </div>

          {/* Main Product Image Stage */}
          <div className="w-full h-full flex items-center justify-center transition-all duration-300 transform">
            <img
              src={product.image}
              alt={product.fullName || product.name}
              className="w-full h-full object-contain drop-shadow-xl transition-all duration-500 hover:scale-105"
            />
          </div>

          {/* 360 View Indicator */}
          <button className="absolute bottom-space-md left-space-md px-3 py-1.5 rounded-full bg-surface-container-lowest/90 backdrop-blur-md shadow-sm flex items-center gap-1.5 text-on-surface active:scale-95 transition-all">
            <span className="material-symbols-outlined text-primary text-[18px]">360</span>
            <span className="font-label-md text-label-md font-semibold">360° View</span>
          </button>

          {/* Image carousel index */}
          <div className="absolute bottom-space-md right-space-md px-2.5 py-1 rounded-full bg-inverse-surface/80 backdrop-blur-sm text-inverse-on-surface font-badge text-badge">
            <span>{activeImageIndex}</span> / 5
          </div>
        </div>

        {/* Carousel Indicators */}
        <div className="flex items-center justify-center gap-2 pb-space-sm">
          {[1, 2, 3, 4, 5].map((idx) => (
            <button
              key={idx}
              onClick={() => setActiveImageIndex(idx)}
              className={`h-1.5 rounded-full transition-all ${
                activeImageIndex === idx ? 'w-6 bg-primary-container' : 'w-1.5 bg-outline-variant'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Main Content Info */}
      <div className="px-margin-mobile flex flex-col gap-space-lg pt-space-md">
        {/* Brand & Title */}
        <section className="flex flex-col gap-space-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="px-2 py-0.5 rounded bg-surface-container-high text-primary font-label-md text-label-md font-semibold flex items-center gap-1">
                {product.brand}
                <span className="material-symbols-outlined text-[15px] text-primary material-symbols-fill">verified</span>
              </span>
              <span className="text-on-surface-variant font-body-sm text-body-sm">Official Flagship Store</span>
            </div>
            {product.isTopRated && (
              <span className="px-2 py-0.5 rounded bg-primary-fixed text-on-primary-fixed-variant font-badge text-badge font-bold uppercase">
                Top Rated
              </span>
            )}
          </div>

          <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface tracking-tight leading-snug">
            {product.fullName || product.name}
          </h1>

          <p className="font-body-sm text-body-sm text-on-surface-variant">
            {product.description}
          </p>

          <div className="flex items-center flex-wrap gap-space-sm pt-1">
            <div className="flex items-center gap-1 bg-surface-container px-2 py-1 rounded">
              <div className="flex items-center text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined text-[16px] material-symbols-fill">
                    star
                  </span>
                ))}
              </div>
              <span className="font-label-md text-label-md font-bold text-on-surface">{product.rating}</span>
              <span className="text-on-surface-variant font-body-sm text-body-sm">
                ({product.reviewCount ? product.reviewCount.toLocaleString() : '4,829'})
              </span>
            </div>
            <span className="text-on-surface-variant text-body-sm">•</span>
            <div className="flex items-center gap-1 text-secondary font-label-md text-label-md">
              <span className="material-symbols-outlined text-[16px]">local_fire_department</span>
              <span>{product.monthlySales || '500+ bought this month'}</span>
            </div>
          </div>
        </section>

        {/* Pricing Card */}
        <section className="p-space-md rounded-xl bg-surface-container-low shadow-sm flex flex-col gap-space-sm border border-surface-container-high/40">
          <div className="flex items-baseline gap-2">
            <span className="font-price-hero text-price-hero text-on-surface font-extrabold">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="font-price-strikethrough text-price-strikethrough text-on-surface-variant line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
            {product.originalPrice && (
              <span className="px-2 py-0.5 rounded-full bg-error-container text-on-error-container font-badge text-badge font-bold">
                -${(product.originalPrice - product.price).toFixed(2)} ({product.discount})
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5 text-secondary">
            <span className="material-symbols-outlined text-[18px]">trending_down</span>
            <span className="font-label-md text-label-md font-semibold">Lowest price in 30 days</span>
          </div>

          <div className="mt-1 p-2.5 rounded-lg bg-surface-container-highest flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[20px]">credit_card</span>
              <span className="font-body-sm text-body-sm text-on-surface">
                or <strong className="font-semibold text-primary">${(product.price / 12).toFixed(2)}/mo</strong> with 0% APR via{' '}
                <span className="font-bold tracking-tight text-primary">ElectroPay</span>
              </span>
            </div>
            <button className="font-label-md text-label-md text-primary font-semibold flex items-center">
              Details <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            </button>
          </div>
        </section>

        {/* Color Options */}
        {product.colors && product.colors.length > 0 && (
          <section className="flex flex-col gap-space-sm">
            <div className="flex items-center justify-between">
              <span className="font-label-md text-label-md text-on-surface font-bold">
                Color: <span className="text-primary font-semibold">{selectedColor?.name}</span>
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                {product.colors.length} finishes
              </span>
            </div>

            <div className="grid grid-cols-3 gap-space-sm">
              {product.colors.map((c) => {
                const isSelected = selectedColor?.name === c.name;
                return (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c)}
                    className={`p-2 rounded-xl shadow-sm flex flex-col items-center gap-1.5 transition-all border ${
                      isSelected
                        ? 'bg-primary-fixed/20 border-primary shadow-sm'
                        : 'bg-surface-container-low border-transparent opacity-85 hover:opacity-100'
                    }`}
                  >
                    <div
                      className="w-8 h-8 rounded-full shadow-inner flex items-center justify-center"
                      style={{ backgroundColor: c.hex }}
                    >
                      {isSelected && (
                        <span className="material-symbols-outlined text-white text-[16px] font-bold">check</span>
                      )}
                    </div>
                    <span
                      className={`font-body-sm text-[12px] truncate w-full text-center ${
                        isSelected ? 'font-semibold text-on-surface' : 'text-on-surface-variant'
                      }`}
                    >
                      {c.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {/* Delivery & Prime Information */}
        <section className="p-space-md rounded-xl bg-surface-container-low shadow-sm flex flex-col gap-space-md border border-surface-container-high/40">
          <div className="flex items-start gap-space-sm">
            <div className="w-9 h-9 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[20px]">local_shipping</span>
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-label-md text-label-md font-bold text-on-surface">FREE Next-Day Delivery</span>
                <span className="px-2 py-0.2 rounded bg-surface-container-high text-primary font-badge text-badge font-bold">
                  PRIME+
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                Get it tomorrow, <strong className="text-on-surface font-semibold">by 8 PM</strong> to{' '}
                <span className="text-primary underline cursor-pointer">New York 10001</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 p-2 rounded-lg bg-surface-container">
            <span className="material-symbols-outlined text-secondary text-[18px]">schedule</span>
            <span className="font-body-sm text-body-sm text-on-surface">
              In Stock — Order within{' '}
              <strong className="text-secondary font-bold">
                {orderCountdown.hours}h {orderCountdown.minutes}m {orderCountdown.seconds}s
              </strong>
            </span>
          </div>

          <div className="grid grid-cols-2 gap-space-sm pt-1">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary text-[18px]">verified_user</span>
              <span className="font-body-sm text-body-sm text-on-surface-variant leading-tight">30-Day Free Returns</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary text-[18px]">lock</span>
              <span className="font-body-sm text-body-sm text-on-surface-variant leading-tight">ElectroMart Protected</span>
            </div>
          </div>
        </section>

        {/* Protection Plan */}
        <section className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-space-sm border border-surface-container-high/60">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[22px]">shield</span>
              <span className="font-label-md text-label-md font-bold text-on-surface">Add Protection Plan</span>
            </div>
            <span className="font-badge text-badge uppercase text-primary font-bold">Recommended</span>
          </div>

          <label className="flex items-center justify-between p-3 rounded-lg bg-surface-container-low cursor-pointer transition-all hover:bg-surface-container">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={hasWarranty}
                onChange={(e) => setHasWarranty(e.target.checked)}
                className="w-5 h-5 rounded text-primary focus:ring-primary accent-primary cursor-pointer"
              />
              <div className="flex flex-col">
                <span className="font-label-md text-label-md font-semibold text-on-surface">
                  2-Year Accidental Damage Protection
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  Zero deductible, drops &amp; spills coverage
                </span>
              </div>
            </div>
            <span className="font-label-md text-label-md font-bold text-primary shrink-0">+$29.99</span>
          </label>
        </section>

        {/* Engineered Highlights */}
        {product.highlights && product.highlights.length > 0 && (
          <section className="flex flex-col gap-space-sm">
            <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">Engineered Highlights</h2>
            <div className="grid grid-cols-1 gap-space-sm">
              {product.highlights.map((h, i) => (
                <div
                  key={i}
                  className="p-space-md rounded-xl bg-surface-container-low shadow-sm flex items-start gap-3.5 border border-surface-container-high/40"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[24px]">{h.icon}</span>
                  </div>
                  <div className="flex flex-col">
                    <h3 className="font-label-md text-label-md font-bold text-on-surface">{h.title}</h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">{h.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Technical Specifications Accordion */}
        {product.specs && (
          <section className="rounded-xl bg-surface-container-low shadow-sm overflow-hidden mb-4 border border-surface-container-high/40">
            <button
              onClick={() => setIsSpecsOpen(!isSpecsOpen)}
              className="w-full p-space-md flex items-center justify-between text-left transition-colors hover:bg-surface-container"
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[22px]">tune</span>
                <span className="font-label-md text-label-md font-bold text-on-surface">Technical Specifications</span>
              </div>
              <span
                className={`material-symbols-outlined text-on-surface-variant transition-transform duration-300 ${
                  isSpecsOpen ? 'rotate-180' : ''
                }`}
              >
                expand_more
              </span>
            </button>

            {isSpecsOpen && (
              <div className="px-space-md pb-space-md flex flex-col gap-2">
                {Object.entries(product.specs).map(([specKey, specVal]) => (
                  <div
                    key={specKey}
                    className="flex items-center justify-between py-2 border-none bg-surface-container-lowest px-3 rounded-lg"
                  >
                    <span className="font-body-sm text-body-sm text-on-surface-variant">{specKey}</span>
                    <span className="font-body-sm text-body-sm font-semibold text-on-surface">{specVal}</span>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}
      </div>

      {/* Sticky Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-surface/95 backdrop-blur-xl shadow-[0_-8px_20px_rgba(0,0,0,0.06)] pb-safe border-t border-surface-container-high">
        <div className="max-w-md mx-auto px-margin-mobile py-2.5 flex items-center gap-space-sm">
          {/* Quantity Stepper */}
          <div className="flex items-center bg-surface-container-highest rounded-lg p-1 shrink-0">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="w-8 h-8 rounded flex items-center justify-center text-on-surface hover:bg-surface-container-lowest active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[16px]">remove</span>
            </button>
            <span className="font-label-md text-label-md font-bold px-2 text-on-surface min-w-[20px] text-center">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((q) => Math.min(10, q + 1))}
              className="w-8 h-8 rounded flex items-center justify-center text-on-surface hover:bg-surface-container-lowest active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[16px]">add</span>
            </button>
          </div>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            className="flex-1 h-11 px-3 rounded-lg bg-surface-container-highest hover:bg-surface-variant text-on-surface font-label-md text-label-md font-bold flex items-center justify-center gap-1.5 active:scale-98 transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
            <span>Add to Cart</span>
          </button>

          {/* Buy Now */}
          <button
            onClick={handleBuyNow}
            className="flex-1 h-11 px-3 rounded-lg bg-primary-container hover:bg-primary text-on-primary font-label-md text-label-md font-bold flex items-center justify-center gap-1 shadow-md shadow-primary/20 active:scale-98 transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">bolt</span>
            <span>Buy Now</span>
          </button>
        </div>
      </div>
    </div>
  );
};
