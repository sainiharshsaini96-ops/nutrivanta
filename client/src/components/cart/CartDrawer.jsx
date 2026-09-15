import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

export const CartDrawer = () => {
  const {
    items,
    itemsCount,
    subtotal,
    discountAmount,
    tax,
    total,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    toggleItemWarranty
  } = useCart();

  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-on-surface/40 backdrop-blur-sm transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-surface flex flex-col shadow-2xl">
          {/* Drawer Header */}
          <div className="p-space-md border-b border-surface-container-high flex items-center justify-between bg-surface-container-lowest">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[24px]">shopping_bag</span>
              <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                Shopping Cart ({itemsCount})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="w-9 h-9 rounded-full flex items-center justify-center text-outline hover:text-on-surface hover:bg-surface-container transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-space-md space-y-3">
            {items.length === 0 ? (
              <div className="py-16 flex flex-col items-center justify-center text-center space-y-3 text-on-surface-variant">
                <span className="material-symbols-outlined text-[64px] text-outline-variant">shopping_cart_off</span>
                <p className="font-headline-sm text-headline-sm font-semibold text-on-surface">Your cart is empty</p>
                <p className="font-body-sm text-body-sm text-outline max-w-xs">
                  Browse flagship smartphones, pro laptops, and audio gear to find your next upgrade.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-2 px-5 py-2.5 rounded-xl bg-primary text-on-primary font-label-md text-label-md font-bold hover:bg-primary-container transition-colors"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={`${item.id}-${item.color}`}
                  className="bg-surface-container-lowest rounded-xl p-3.5 shadow-sm border border-surface-container-high/60 flex flex-col gap-2.5"
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-contain rounded-lg bg-surface-container-low p-1 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="font-label-md text-label-md font-bold text-on-surface leading-tight line-clamp-2">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id, item.color)}
                          className="text-outline hover:text-tertiary transition-colors -mt-0.5"
                          title="Remove item"
                        >
                          <span className="material-symbols-outlined text-[18px]">delete</span>
                        </button>
                      </div>

                      <span className="font-body-sm text-[12px] text-on-surface-variant block mt-0.5">
                        Color: <strong className="text-primary font-semibold">{item.color}</strong>
                      </span>

                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="font-price-card text-[17px] font-bold text-primary">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                        {item.originalPrice && (
                          <span className="font-price-strikethrough text-[12px] text-outline line-through">
                            ${(item.originalPrice * item.quantity).toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Quantity and Protection Section */}
                  <div className="pt-2 border-t border-surface-container-high flex items-center justify-between">
                    <div className="flex items-center bg-surface-container-high rounded-lg p-0.5">
                      <button
                        onClick={() => updateQuantity(item.id, item.color, -1)}
                        className="w-7 h-7 rounded flex items-center justify-center text-on-surface hover:bg-surface-container-lowest transition-colors"
                      >
                        <span className="material-symbols-outlined text-[14px]">remove</span>
                      </button>
                      <span className="font-label-md text-label-md font-bold px-2.5 text-on-surface min-w-[24px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.color, 1)}
                        className="w-7 h-7 rounded flex items-center justify-center text-on-surface hover:bg-surface-container-lowest transition-colors"
                      >
                        <span className="material-symbols-outlined text-[14px]">add</span>
                      </button>
                    </div>

                    {item.warrantyPrice > 0 && (
                      <button
                        onClick={() => toggleItemWarranty(item.id, item.color)}
                        className={`px-2 py-1 rounded-md text-[11px] font-bold flex items-center gap-1 transition-colors ${
                          item.hasWarranty
                            ? 'bg-secondary-fixed text-on-secondary-fixed'
                            : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[14px]">shield</span>
                        {item.hasWarranty ? 'Warranty Protected' : '+ Protection Plan'}
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer & Checkout Action */}
          {items.length > 0 && (
            <div className="p-space-md bg-surface-container-lowest border-t border-surface-container-high space-y-3">
              <div className="space-y-1.5 font-body-sm text-[13px] text-on-surface-variant">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-on-surface">${subtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-secondary font-semibold">
                    <span>Discount</span>
                    <span>- ${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Tax</span>
                  <span className="font-semibold text-on-surface">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Express Shipping</span>
                  <span className="font-bold text-secondary uppercase">FREE</span>
                </div>
                <div className="pt-2 border-t border-surface-container-high flex justify-between items-baseline">
                  <span className="font-headline-sm text-headline-sm font-bold text-on-surface">Total</span>
                  <span className="font-price-card text-[22px] font-extrabold text-primary-container">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={handleCheckoutClick}
                className="w-full h-12 rounded-xl bg-primary-container hover:bg-primary text-on-primary font-headline-sm text-[16px] font-bold shadow-md shadow-primary-container/20 flex items-center justify-center gap-2 active:scale-98 transition-all"
              >
                <span>Proceed to Checkout</span>
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
