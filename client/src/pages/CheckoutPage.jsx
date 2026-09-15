import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { submitOrder } from '../services/api';

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const {
    items,
    itemsCount,
    subtotal,
    discountAmount,
    tax,
    total,
    appliedCoupon,
    applyCouponCode,
    removeCoupon,
    clearCart
  } = useCart();

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [promoInput, setPromoInput] = useState('TECH10');
  const [isOrderSummaryOpen, setIsOrderSummaryOpen] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderConfirmation, setOrderConfirmation] = useState(null);

  // Form states
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [expiry, setExpiry] = useState('09/27');
  const [cvv, setCvv] = useState('888');
  const [saveCard, setSaveCard] = useState(true);

  const handleApplyPromo = async () => {
    if (!promoInput) return;
    await applyCouponCode(promoInput);
  };

  const handlePlaceOrder = async () => {
    setIsSubmitting(true);

    const payload = {
      items,
      shippingAddress: {
        name: 'Alex Morgan',
        address: '742 Evergreen Terrace, Apt 4B, New York, NY 10001',
        phone: '+1 (555) 924-8182'
      },
      paymentMethod: 
        paymentMethod === 'card' ? 'Credit Card (ending 4242)' :
        paymentMethod === 'digital-wallet' ? 'Apple / Google Pay' :
        paymentMethod === 'bnpl' ? 'ElectroMart BNPL (4 payments)' :
        paymentMethod === 'wallet' ? 'PayPal / Venmo' : 'Cash on Delivery',
      totals: {
        subtotal,
        discount: discountAmount,
        tax,
        shipping: 0,
        total
      }
    };

    setTimeout(async () => {
      const response = await submitOrder(payload);
      setIsSubmitting(false);
      if (response.success) {
        setOrderConfirmation(response.data);
        clearCart();
      }
    }, 1200);
  };

  if (orderConfirmation) {
    return (
      <div className="pt-24 px-margin-mobile max-w-lg mx-auto pb-16">
        <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-md border border-surface-container-high text-center space-y-4">
          <div className="w-16 h-16 bg-secondary-container/40 text-secondary rounded-full flex items-center justify-center mx-auto">
            <span className="material-symbols-outlined text-[36px] material-symbols-fill">check_circle</span>
          </div>

          <div className="space-y-1">
            <span className="font-badge text-badge px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-bold uppercase">
              Confirmed
            </span>
            <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface">Order Placed!</h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              We've sent the order receipt and tracking updates to your registered email.
            </p>
          </div>

          <div className="bg-surface-container-low rounded-xl p-4 text-left space-y-2 border border-surface-container-high/60">
            <div className="flex justify-between font-label-md text-label-md">
              <span className="text-on-surface-variant">Order Number:</span>
              <strong className="text-primary font-bold">{orderConfirmation.orderId}</strong>
            </div>
            <div className="flex justify-between font-label-md text-label-md">
              <span className="text-on-surface-variant">Estimated Delivery:</span>
              <strong className="text-secondary font-bold">{orderConfirmation.estimatedDelivery}</strong>
            </div>
            <div className="flex justify-between font-label-md text-label-md">
              <span className="text-on-surface-variant">Payment Method:</span>
              <span className="text-on-surface font-medium">{orderConfirmation.paymentMethod}</span>
            </div>
            <div className="flex justify-between font-label-md text-label-md pt-2 border-t border-surface-container-high">
              <span className="font-bold text-on-surface">Total Charged:</span>
              <strong className="text-primary-container font-extrabold text-[18px]">
                ${orderConfirmation.totals?.total?.toFixed(2) || total.toFixed(2)}
              </strong>
            </div>
          </div>

          <button
            onClick={() => navigate('/')}
            className="w-full h-12 rounded-xl bg-primary text-on-primary font-headline-sm text-[16px] font-bold shadow-md hover:bg-primary-container transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col relative w-full pt-16 bg-surface">
      <div className="flex flex-col w-full px-margin-mobile pb-16 max-w-2xl mx-auto">
        {/* Stepper Progress Tracker */}
        <section className="mt-4 mb-5 bg-surface-container-lowest rounded-xl p-4 shadow-sm border border-surface-container-high/40">
          <div className="flex items-center justify-between relative">
            {/* Line Behind Steps */}
            <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2 h-1 bg-surface-container-high z-0" />
            <div className="absolute left-4 w-2/3 top-1/2 -translate-y-1/2 h-1 bg-primary-container z-0 transition-all duration-300" />

            {/* Step 1: Address (Completed) */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary flex items-center justify-center shadow-sm">
                <span className="material-symbols-outlined text-[18px]">check</span>
              </div>
              <span className="font-badge text-badge text-primary-container mt-1 font-semibold">Address</span>
            </div>

            {/* Step 2: Delivery (Completed) */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary flex items-center justify-center shadow-sm">
                <span className="material-symbols-outlined text-[18px]">check</span>
              </div>
              <span className="font-badge text-badge text-primary-container mt-1 font-semibold">Delivery</span>
            </div>

            {/* Step 3: Payment (Active) */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-surface-container-lowest text-primary-container shadow-md flex items-center justify-center font-headline-sm text-headline-sm font-bold border-2 border-primary-container">
                <span className="w-3 h-3 rounded-full bg-primary-container animate-pulse" />
              </div>
              <span className="font-badge text-badge text-on-surface mt-1 font-bold">Payment</span>
            </div>

            {/* Step 4: Review (Pending) */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-surface-container-high text-outline flex items-center justify-center font-label-md text-label-md">
                4
              </div>
              <span className="font-badge text-badge text-outline mt-1">Review</span>
            </div>
          </div>
        </section>

        {/* Accordion Group: Shipping Address & Delivery Method */}
        <section className="flex flex-col gap-space-sm mb-5">
          {/* Shipping Address Summary Card */}
          <div className="bg-surface-container-lowest rounded-xl p-4 shadow-sm flex items-start justify-between border border-surface-container-high/40">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-surface-container-low text-primary flex items-center justify-center shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-[20px]">location_on</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">Alex Morgan</h3>
                  <span className="bg-surface-container-high text-on-surface-variant font-badge text-badge px-2 py-0.5 rounded-full">
                    Home
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                  742 Evergreen Terrace, Apt 4B<br />
                  New York, NY 10001
                </p>
                <span className="font-body-sm text-body-sm text-outline mt-1 inline-block">+1 (555) 924-8182</span>
              </div>
            </div>
            <button className="font-label-md text-label-md text-primary-container hover:text-primary font-semibold flex items-center gap-0.5 pt-1">
              Edit
            </button>
          </div>

          {/* Delivery Method Summary Card */}
          <div className="bg-surface-container-lowest rounded-xl p-4 shadow-sm flex items-center justify-between border border-surface-container-high/40">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">bolt</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-label-md text-label-md font-bold text-on-surface">ElectroMart Express</span>
                  <span className="bg-secondary-fixed text-on-secondary-fixed font-badge text-badge px-1.5 py-0.5 rounded-full font-bold">
                    FREE
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-secondary font-medium">Estimated Tomorrow by 2:00 PM</p>
              </div>
            </div>
            <button className="font-label-md text-label-md text-primary-container hover:text-primary font-semibold">
              Change
            </button>
          </div>
        </section>

        {/* Expandable Cart Preview Section */}
        <section className="bg-surface-container-lowest rounded-xl p-4 shadow-sm mb-5 border border-surface-container-high/40">
          <div
            onClick={() => setIsOrderSummaryOpen(!isOrderSummaryOpen)}
            className="flex items-center justify-between cursor-pointer select-none"
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[20px]">shopping_basket</span>
              <span className="font-headline-sm text-headline-sm font-bold text-on-surface">
                Order Summary ({itemsCount} {itemsCount === 1 ? 'Item' : 'Items'})
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-on-surface-variant">
              <span className="font-label-md text-label-md font-semibold text-primary-container">
                ${subtotal.toFixed(2)}
              </span>
              <span
                className={`material-symbols-outlined text-[20px] transition-transform duration-300 ${
                  isOrderSummaryOpen ? '' : '-rotate-90'
                }`}
              >
                expand_more
              </span>
            </div>
          </div>

          {/* Collapsible Mini Item List */}
          {isOrderSummaryOpen && (
            <div className="flex flex-col gap-3 mt-4 pt-3 border-t border-surface-container-high">
              {items.map((item) => (
                <div
                  key={`${item.id}-${item.color}`}
                  className="flex items-center gap-3 bg-surface-container-low p-2.5 rounded-lg"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 object-contain rounded-lg bg-surface-container-lowest p-1 shrink-0"
                  />
                  <div className="flex flex-col flex-1 min-w-0">
                    <h4 className="font-label-md text-label-md font-bold text-on-surface truncate">
                      {item.name}
                    </h4>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      {item.color} • Qty {item.quantity}
                    </span>
                    <span className="font-price-card text-price-card font-extrabold text-on-surface mt-0.5">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Payment Methods Selection */}
        <section className="bg-surface-container-lowest rounded-xl p-4 shadow-sm mb-5 border border-surface-container-high/40">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">Payment Method</h2>
            <span className="flex items-center gap-1 font-body-sm text-body-sm text-on-surface-variant">
              <span className="material-symbols-outlined text-[16px] text-secondary">lock</span>
              Encrypted
            </span>
          </div>

          <div className="flex flex-col gap-3">
            {/* Option 1: Credit / Debit Card (Selected) */}
            <div
              className={`rounded-xl p-3.5 transition-all duration-200 border ${
                paymentMethod === 'card'
                  ? 'bg-surface-container-low border-primary/40 shadow-sm'
                  : 'bg-surface-container-lowest border-surface-container-high'
              }`}
            >
              <label
                onClick={() => setPaymentMethod('card')}
                className="flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment_method"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                    className="w-5 h-5 text-primary-container accent-primary-container cursor-pointer"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-label-md text-label-md font-bold text-on-surface">Credit / Debit Card</span>
                      <span className="bg-primary-fixed text-on-primary-fixed font-badge text-badge px-1.5 py-0.5 rounded-md font-bold">
                        Fast
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">Visa, Mastercard, Amex</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-primary text-[24px]">credit_card</span>
              </label>

              {paymentMethod === 'card' && (
                <div className="mt-4 pt-3 border-t border-surface-container-high flex flex-col gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="font-body-sm text-body-sm font-semibold text-on-surface-variant">Card Number</label>
                    <div className="relative flex items-center">
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full h-11 bg-surface-container-lowest rounded-lg px-3 pl-10 font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm border border-surface-container-high"
                      />
                      <span className="material-symbols-outlined absolute left-3 text-[20px] text-primary">credit_card</span>
                      <span className="absolute right-3 font-badge text-badge text-secondary font-bold uppercase bg-secondary-fixed/50 px-1.5 py-0.5 rounded">
                        Visa
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1">
                      <label className="font-body-sm text-body-sm font-semibold text-on-surface-variant">Expiry Date</label>
                      <input
                        type="text"
                        value={expiry}
                        onChange={(e) => setExpiry(e.target.value)}
                        placeholder="MM/YY"
                        className="w-full h-11 bg-surface-container-lowest rounded-lg px-3 font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm border border-surface-container-high"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="font-body-sm text-body-sm font-semibold text-on-surface-variant flex items-center justify-between">
                        <span>CVV / CVC</span>
                        <span className="material-symbols-outlined text-[16px] text-outline cursor-pointer" title="3-digit security code">
                          info
                        </span>
                      </label>
                      <div className="relative flex items-center">
                        <input
                          type="password"
                          value={cvv}
                          maxLength={4}
                          onChange={(e) => setCvv(e.target.value)}
                          placeholder="•••"
                          className="w-full h-11 bg-surface-container-lowest rounded-lg px-3 font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 tracking-widest shadow-sm border border-surface-container-high"
                        />
                        <span className="material-symbols-outlined absolute right-3 text-[18px] text-outline">lock</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-1">
                    <input
                      type="checkbox"
                      id="save_card"
                      checked={saveCard}
                      onChange={(e) => setSaveCard(e.target.checked)}
                      className="w-4 h-4 rounded text-primary-container accent-primary-container cursor-pointer"
                    />
                    <label htmlFor="save_card" className="font-body-sm text-body-sm text-on-surface-variant select-none cursor-pointer">
                      Save card securely with 256-bit AES encryption
                    </label>
                  </div>
                </div>
              )}
            </div>

            {/* Option 2: 1-Tap Apple / Google Pay */}
            <div
              onClick={() => setPaymentMethod('digital-wallet')}
              className={`rounded-xl p-3.5 transition-colors cursor-pointer border ${
                paymentMethod === 'digital-wallet'
                  ? 'bg-surface-container-low border-primary/40 shadow-sm'
                  : 'bg-surface-container-lowest border-surface-container-high hover:bg-surface-container-low'
              }`}
            >
              <label className="flex items-center justify-between cursor-pointer">
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment_method"
                    value="digital-wallet"
                    checked={paymentMethod === 'digital-wallet'}
                    onChange={() => setPaymentMethod('digital-wallet')}
                    className="w-5 h-5 text-primary-container accent-primary-container cursor-pointer"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-label-md text-label-md font-bold text-on-surface">Apple Pay / Google Pay</span>
                      <span className="bg-secondary-fixed text-on-secondary-fixed font-badge text-badge px-1.5 py-0.5 rounded-md font-bold">
                        1-Tap
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">Instant biometric checkout</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-outline text-[22px]">contactless</span>
              </label>
            </div>

            {/* Option 3: ElectroMart BNPL */}
            <div
              onClick={() => setPaymentMethod('bnpl')}
              className={`rounded-xl p-3.5 transition-colors cursor-pointer border ${
                paymentMethod === 'bnpl'
                  ? 'bg-surface-container-low border-primary/40 shadow-sm'
                  : 'bg-surface-container-lowest border-surface-container-high hover:bg-surface-container-low'
              }`}
            >
              <label className="flex items-center justify-between cursor-pointer">
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment_method"
                    value="bnpl"
                    checked={paymentMethod === 'bnpl'}
                    onChange={() => setPaymentMethod('bnpl')}
                    className="w-5 h-5 text-primary-container accent-primary-container cursor-pointer"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-label-md text-label-md font-bold text-on-surface">ElectroMart Pay Later</span>
                      <span className="bg-surface-container-high text-primary font-badge text-badge px-1.5 py-0.5 rounded-md font-bold">
                        0% APR
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-secondary font-medium">
                      4 interest-free payments of ${(total / 4).toFixed(2)}
                    </p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-secondary text-[22px]">calendar_month</span>
              </label>
            </div>

            {/* Option 4: Digital Wallets */}
            <div
              onClick={() => setPaymentMethod('wallet')}
              className={`rounded-xl p-3.5 transition-colors cursor-pointer border ${
                paymentMethod === 'wallet'
                  ? 'bg-surface-container-low border-primary/40 shadow-sm'
                  : 'bg-surface-container-lowest border-surface-container-high hover:bg-surface-container-low'
              }`}
            >
              <label className="flex items-center justify-between cursor-pointer">
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment_method"
                    value="wallet"
                    checked={paymentMethod === 'wallet'}
                    onChange={() => setPaymentMethod('wallet')}
                    className="w-5 h-5 text-primary-container accent-primary-container cursor-pointer"
                  />
                  <div>
                    <span className="font-label-md text-label-md font-bold text-on-surface">PayPal / Venmo</span>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">Connect and checkout securely</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-outline text-[22px]">account_balance_wallet</span>
              </label>
            </div>

            {/* Option 5: Cash on Delivery */}
            <div
              onClick={() => setPaymentMethod('cod')}
              className={`rounded-xl p-3.5 transition-colors cursor-pointer border ${
                paymentMethod === 'cod'
                  ? 'bg-surface-container-low border-primary/40 shadow-sm'
                  : 'bg-surface-container-lowest border-surface-container-high hover:bg-surface-container-low'
              }`}
            >
              <label className="flex items-center justify-between cursor-pointer">
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment_method"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="w-5 h-5 text-primary-container accent-primary-container cursor-pointer"
                  />
                  <div>
                    <span className="font-label-md text-label-md font-bold text-on-surface">Pay on Arrival</span>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">Cash or Card upon handoff</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-outline text-[22px]">payments</span>
              </label>
            </div>
          </div>
        </section>

        {/* Promo Code Voucher Section */}
        <section className="bg-surface-container-lowest rounded-xl p-4 shadow-sm mb-5 border border-surface-container-high/40">
          <label className="font-label-md text-label-md font-bold text-on-surface mb-2 block">Promo Code or Voucher</label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                placeholder="TRY TECH10 OR FLASH50"
                className="w-full h-11 bg-surface-container-low uppercase rounded-lg px-3 pl-9 font-body-md text-body-md font-bold text-primary focus:outline-none focus:bg-surface-bright border border-surface-container-high"
              />
              <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-[18px] text-primary">
                sell
              </span>
            </div>
            <button
              onClick={handleApplyPromo}
              className="h-11 px-5 rounded-lg bg-surface-container-high text-on-surface font-label-md text-label-md font-bold hover:bg-surface-variant transition-colors"
            >
              {appliedCoupon ? 'Applied' : 'Apply'}
            </button>
          </div>

          {/* Active Promo Tag Pill */}
          {appliedCoupon && (
            <div className="flex items-center justify-between mt-2.5 bg-secondary-fixed/30 text-on-secondary-fixed px-3 py-1.5 rounded-lg">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px] text-secondary">check_circle</span>
                <span className="font-label-md text-label-md font-bold">{appliedCoupon.code} applied</span>
                <span className="font-body-sm text-body-sm text-on-secondary-fixed-variant">
                  - ${appliedCoupon.discountAmount.toFixed(2)} off order
                </span>
              </div>
              <button
                onClick={removeCoupon}
                className="text-on-secondary-fixed hover:text-error flex items-center"
                title="Remove discount"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            </div>
          )}
        </section>

        {/* Price Details Breakdown */}
        <section className="bg-surface-container-lowest rounded-xl p-4 shadow-sm mb-5 flex flex-col gap-2.5 border border-surface-container-high/40">
          <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface mb-1">Price Details</h3>
          <div className="flex justify-between items-center font-body-md text-body-md text-on-surface-variant">
            <span>Items Subtotal ({itemsCount} items)</span>
            <span className="font-semibold text-on-surface">${subtotal.toFixed(2)}</span>
          </div>

          {discountAmount > 0 && (
            <div className="flex justify-between items-center font-body-md text-body-md text-secondary">
              <span className="flex items-center gap-1">
                <span>Coupon Savings</span>
                <span className="bg-secondary-fixed text-on-secondary-fixed font-badge text-badge px-1.5 py-0.2 rounded font-bold">
                  {appliedCoupon?.code}
                </span>
              </span>
              <span className="font-semibold">- ${discountAmount.toFixed(2)}</span>
            </div>
          )}

          <div className="flex justify-between items-center font-body-md text-body-md text-on-surface-variant">
            <span className="flex items-center gap-1">
              Estimated Tax
              <span className="font-body-sm text-body-sm text-outline">(NY 8.875%)</span>
            </span>
            <span className="font-semibold text-on-surface">${tax.toFixed(2)}</span>
          </div>

          <div className="flex justify-between items-center font-body-md text-body-md text-on-surface-variant">
            <span>Shipping &amp; Express Handling</span>
            <div className="flex items-center gap-1.5">
              <span className="font-price-strikethrough text-price-strikethrough text-outline line-through">$9.99</span>
              <span className="font-semibold text-secondary uppercase font-label-md text-label-md">FREE</span>
            </div>
          </div>

          <div className="h-0.5 bg-surface-container-high my-1" />

          <div className="flex justify-between items-baseline pt-1">
            <div>
              <span className="font-headline-sm text-headline-sm font-bold text-on-surface block">Order Total</span>
              <span className="font-body-sm text-body-sm text-outline">Includes all local applicable taxes</span>
            </div>
            <span className="font-price-hero text-price-hero font-extrabold text-primary-container">
              ${total.toFixed(2)}
            </span>
          </div>
        </section>

        {/* Security & Trust Indicators */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="flex items-center gap-2 bg-surface-container-lowest rounded-lg p-2.5 shadow-sm border border-surface-container-high/40">
            <span className="material-symbols-outlined text-secondary text-[22px]">verified_user</span>
            <div className="flex flex-col">
              <span className="font-label-md text-label-md font-bold text-on-surface">256-Bit SSL</span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">Bank-grade security</span>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-surface-container-lowest rounded-lg p-2.5 shadow-sm border border-surface-container-high/40">
            <span className="material-symbols-outlined text-primary text-[22px]">shield</span>
            <div className="flex flex-col">
              <span className="font-label-md text-label-md font-bold text-on-surface">Buyer Protection</span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">100% money back</span>
            </div>
          </div>
        </div>

        {/* Primary CTA Action Area */}
        <div className="sticky bottom-3 z-40 bg-surface/90 backdrop-blur-md p-1 -mx-1">
          <button
            onClick={handlePlaceOrder}
            disabled={isSubmitting || items.length === 0}
            className="w-full h-14 bg-primary-container hover:bg-primary text-on-primary rounded-xl font-headline-sm text-headline-sm font-bold shadow-lg shadow-primary-container/25 flex items-center justify-center gap-2 active:scale-[0.98] transition-all duration-150 disabled:opacity-60"
          >
            {isSubmitting ? (
              <>
                <span className="w-5 h-5 border-2 border-on-primary border-t-transparent rounded-full animate-spin" />
                <span>Securing Transaction...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[22px]">lock</span>
                <span>Place Order &amp; Pay ${total.toFixed(2)}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
