import React, { createContext, useContext, useState, useEffect } from 'react';
import { validatePromoCode } from '../services/api';

const CartContext = createContext();

const INITIAL_CART = [
  {
    id: "sony-wh-1000xm5",
    name: "Sony WH-1000XM5 Wireless",
    price: 278.00,
    originalPrice: 399.99,
    color: "Midnight Blue",
    quantity: 1,
    hasWarranty: false,
    warrantyPrice: 29.99,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAg65t1Wbaz-1B_BtX8e-2iIrK5SazVwqnYPaOXcqpZRW8z0wHvBA2_ZGtGTMw4Smel8nqS3N-79UCkr_fzJdLU1fKl0jOLndSOgKiq-n8mFWa8PCITogbX0ycpGhG__EloHjPVNjpLQ-Fs2StrbZpqcFP4bdRYncj0a4sCwJyEhclJmgHZDH466gIrfnelkUIVVLh9MlraPEGuspxNiTo0ekl1betHd40JAZUsdTixzt-_2aD8Hypx7w"
  },
  {
    id: "anker-65w-gan-charger",
    name: "Anker 65W GaN Fast Charger",
    price: 39.99,
    originalPrice: 49.99,
    color: "Black",
    quantity: 1,
    hasWarranty: false,
    warrantyPrice: 0,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAoNWqiyP1rvvGeWaVoPXX2_OBEi2BLzL5zIEmL6Tq2xiUxiCaJcEGex6NfFUToSnplxYJoeg_q2RqFXA4B2dbcGsUwtMbAanRO3pRewjvAB2rNJxezEsG6SbOlm850M3qWgMjBX4m2sEjbzKvG_-Zqy06QWSmYVyka4-xr8sMmlv27Xz3xyn-O-MAav8XEpkqSRBx7_hcb0aRfnVCah5QhZx15ebTJ6oeAbQC6SYEja1sc6iukTA7OOQ"
  }
];

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem('electromart_cart');
      return saved ? JSON.parse(saved) : INITIAL_CART;
    } catch {
      return INITIAL_CART;
    }
  });

  const [appliedCoupon, setAppliedCoupon] = useState({
    code: 'TECH10',
    discountAmount: 20.00,
    description: '$20.00 off order'
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('electromart_cart', JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [items]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const addToCart = (product, quantity = 1, color = 'Standard', hasWarranty = false) => {
    setItems(prevItems => {
      const existingIndex = prevItems.findIndex(
        item => item.id === product.id && item.color === color
      );

      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex].quantity += quantity;
        if (hasWarranty) updated[existingIndex].hasWarranty = true;
        return updated;
      } else {
        return [
          ...prevItems,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            originalPrice: product.originalPrice,
            image: product.image,
            color: color || (product.colors && product.colors[0]?.name) || 'Default',
            quantity: quantity,
            hasWarranty: hasWarranty,
            warrantyPrice: 29.99
          }
        ];
      }
    });
    showToast(`Added ${product.name} to cart`);
  };

  const removeFromCart = (id, color) => {
    setItems(prev => prev.filter(item => !(item.id === id && item.color === color)));
  };

  const updateQuantity = (id, color, delta) => {
    setItems(prev => prev.map(item => {
      if (item.id === id && item.color === color) {
        const newQty = Math.max(1, Math.min(10, item.quantity + delta));
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const toggleItemWarranty = (id, color) => {
    setItems(prev => prev.map(item => {
      if (item.id === id && item.color === color) {
        return { ...item, hasWarranty: !item.hasWarranty };
      }
      return item;
    }));
  };

  const clearCart = () => {
    setItems([]);
  };

  const applyCouponCode = async (code) => {
    const res = await validatePromoCode(code, subtotal);
    if (res.success) {
      setAppliedCoupon(res.data);
      showToast(res.message);
      return { success: true, message: res.message };
    } else {
      showToast(res.message || 'Invalid coupon code');
      return { success: false, message: res.message };
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Promo code removed');
  };

  // Calculations
  const itemsCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const subtotal = items.reduce((acc, item) => {
    const itemTotal = item.price * item.quantity;
    const warrantyTotal = item.hasWarranty ? (item.warrantyPrice || 29.99) : 0;
    return acc + itemTotal + warrantyTotal;
  }, 0);

  const discountAmount = appliedCoupon ? appliedCoupon.discountAmount : 0;
  const taxableAmount = Math.max(0, subtotal - discountAmount);
  // NY 8.875% tax rate
  const tax = taxableAmount > 0 ? +(taxableAmount * 0.08875).toFixed(2) : 0;
  const shipping = 0.00; // Free express delivery
  const total = +(taxableAmount + tax + shipping).toFixed(2);

  return (
    <CartContext.Provider value={{
      items,
      itemsCount,
      subtotal,
      discountAmount,
      tax,
      shipping,
      total,
      appliedCoupon,
      isCartOpen,
      setIsCartOpen,
      toastMessage,
      addToCart,
      removeFromCart,
      updateQuantity,
      toggleItemWarranty,
      clearCart,
      applyCouponCode,
      removeCoupon,
      showToast
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
