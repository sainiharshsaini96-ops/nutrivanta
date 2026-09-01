import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BRAND_INFO } from '../data/mockData';

export default function CheckoutPage() {
  const { user, nutritionist, selectedPackage, bookConsultation, setActivePage } = useApp();

  const [patientDetails, setPatientDetails] = useState({
    name: user.name || '',
    phone: user.phone || '',
    email: user.email || ''
  });

  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi' | 'card' | 'netbanking'
  const [selectedSlot, setSelectedSlot] = useState({
    date: "25 Aug 2026",
    time: "10:30 AM (IST)"
  });
  const [isProcessing, setIsProcessing] = useState(false);

  // Card details state
  const [cardInfo, setCardInfo] = useState({
    cardNumber: '4532 •••• •••• 8821',
    expiry: '09/28',
    cvv: '•••'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      bookConsultation({
        patientName: patientDetails.name,
        email: patientDetails.email,
        phone: patientDetails.phone,
        paymentMethod: paymentMethod,
        date: selectedSlot.date,
        time: selectedSlot.time
      });
      setIsProcessing(false);
    }, 1200);
  };

  return (
    <main className="w-full max-w-6xl mx-auto px-margin-mobile md:px-margin-desktop py-10 md:py-16">
      {/* Top Logo */}
      <div className="flex justify-center mb-8">
        <button onClick={() => setActivePage('home')} className="flex items-center gap-2 group">
          <img alt="NutriVanta Logo" className="h-12 w-12 object-contain" src={BRAND_INFO.logoUrl} />
          <span className="text-2xl font-bold text-primary dark:text-primary-fixed">{BRAND_INFO.name}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left Column: Booking Summary (5 cols) */}
        <section className="md:col-span-5 bg-surface-container-lowest dark:bg-inverse-surface rounded-20px shadow-ambient border border-surface-variant p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-surface-variant">
              <h2 className="text-lg font-bold text-primary dark:text-primary-fixed">Booking Summary</h2>
              <span className="text-xs bg-brand-mint text-primary font-bold px-2.5 py-1 rounded-md">Live Slot</span>
            </div>

            {/* Doctor Info */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-surface-variant shrink-0 border-2 border-primary/20">
                <img
                  className="w-full h-full object-cover"
                  src={nutritionist.avatar}
                  alt={nutritionist.name}
                />
              </div>
              <div>
                <h3 className="text-base font-bold text-on-surface">{nutritionist.name}</h3>
                <p className="text-xs text-on-surface-variant">{nutritionist.role}</p>
                <span className="text-[11px] text-primary font-semibold">Verified Clinical Specialist</span>
              </div>
            </div>

            {/* Session Highlights */}
            <div className="space-y-4 mb-8 bg-surface-container-low dark:bg-surface-container p-4 rounded-xl">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-xl mt-0.5">timer</span>
                <div>
                  <p className="text-xs font-bold text-on-surface">{selectedPackage.title} ({selectedPackage.duration})</p>
                  <p className="text-[11px] text-on-surface-variant">{selectedPackage.description}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-xl mt-0.5">calendar_today</span>
                <div>
                  <p className="text-xs font-bold text-on-surface">{selectedSlot.date}</p>
                  <p className="text-[11px] text-on-surface-variant">Tuesday • Confirmed Schedule</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-xl mt-0.5">videocam</span>
                <div>
                  <p className="text-xs font-bold text-on-surface">{selectedSlot.time}</p>
                  <p className="text-[11px] text-on-surface-variant">Secure Telehealth Link emailed instantly</p>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Breakdown */}
          <div className="border-t border-surface-variant pt-4 mt-auto">
            <div className="space-y-1.5 text-xs text-on-surface-variant mb-3">
              <div className="flex justify-between">
                <span>Consultation Fee:</span>
                <span>₹{Math.round(selectedPackage.price / 1.18)}</span>
              </div>
              <div className="flex justify-between">
                <span>Healthcare GST (18%):</span>
                <span>₹{selectedPackage.price - Math.round(selectedPackage.price / 1.18)}</span>
              </div>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-surface-variant">
              <span className="text-sm font-bold text-on-surface">Total Payable</span>
              <span className="text-2xl font-bold text-primary dark:text-primary-fixed">₹{selectedPackage.price}</span>
            </div>
            <p className="text-[10px] text-on-surface-variant text-right mt-1">Includes all taxes & platform fees</p>
          </div>
        </section>

        {/* Right Column: Checkout & Payment (7 cols) */}
        <section className="md:col-span-7 bg-surface-container-lowest dark:bg-inverse-surface rounded-20px shadow-ambient border border-surface-variant p-6 sm:p-8">
          <h1 className="text-xl sm:text-2xl font-bold text-on-surface mb-6">Complete Your Booking</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Patient Details */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-primary uppercase tracking-wider">Patient Details</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-on-surface mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={patientDetails.name}
                    onChange={(e) => setPatientDetails({ ...patientDetails, name: e.target.value })}
                    className="w-full form-input p-2.5 text-sm bg-surface-bright text-on-surface"
                    placeholder="Anchal Sharma"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-on-surface mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={patientDetails.phone}
                    onChange={(e) => setPatientDetails({ ...patientDetails, phone: e.target.value })}
                    className="w-full form-input p-2.5 text-sm bg-surface-bright text-on-surface"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-on-surface mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={patientDetails.email}
                  onChange={(e) => setPatientDetails({ ...patientDetails, email: e.target.value })}
                  className="w-full form-input p-2.5 text-sm bg-surface-bright text-on-surface"
                  placeholder="anchal.s@example.com"
                />
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-bold text-primary uppercase tracking-wider">Select Payment Method</h3>
              
              <div className="grid grid-cols-3 gap-3">
                {/* UPI */}
                <label className={`flex flex-col items-center justify-center p-3 border-2 rounded-xl cursor-pointer transition-all ${
                  paymentMethod === 'upi'
                    ? 'border-primary bg-brand-mint/30 shadow-sm'
                    : 'border-outline-variant hover:bg-surface-variant'
                }`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="upi"
                    checked={paymentMethod === 'upi'}
                    onChange={() => setPaymentMethod('upi')}
                    className="sr-only"
                  />
                  <span className="material-symbols-outlined text-2xl text-primary mb-1">qr_code_scanner</span>
                  <span className="text-xs font-bold text-on-surface">UPI / QR</span>
                </label>

                {/* Card */}
                <label className={`flex flex-col items-center justify-center p-3 border-2 rounded-xl cursor-pointer transition-all ${
                  paymentMethod === 'card'
                    ? 'border-primary bg-brand-mint/30 shadow-sm'
                    : 'border-outline-variant hover:bg-surface-variant'
                }`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                    className="sr-only"
                  />
                  <span className="material-symbols-outlined text-2xl text-primary mb-1">credit_card</span>
                  <span className="text-xs font-bold text-on-surface">Cards</span>
                </label>

                {/* Net Banking */}
                <label className={`flex flex-col items-center justify-center p-3 border-2 rounded-xl cursor-pointer transition-all ${
                  paymentMethod === 'netbanking'
                    ? 'border-primary bg-brand-mint/30 shadow-sm'
                    : 'border-outline-variant hover:bg-surface-variant'
                }`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="netbanking"
                    checked={paymentMethod === 'netbanking'}
                    onChange={() => setPaymentMethod('netbanking')}
                    className="sr-only"
                  />
                  <span className="material-symbols-outlined text-2xl text-primary mb-1">account_balance</span>
                  <span className="text-xs font-bold text-on-surface">Net Banking</span>
                </label>
              </div>

              {/* Payment Method Details Sub-view */}
              {paymentMethod === 'upi' && (
                <div className="p-4 rounded-xl bg-surface-container-low dark:bg-surface-container border border-surface-variant flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-on-surface">Scan with any UPI App</p>
                    <p className="text-[11px] text-on-surface-variant">Google Pay, PhonePe, Paytm, BHIM</p>
                  </div>
                  <span className="material-symbols-outlined text-primary text-3xl">qr_code_2</span>
                </div>
              )}

              {paymentMethod === 'card' && (
                <div className="p-4 rounded-xl bg-surface-container-low dark:bg-surface-container border border-surface-variant space-y-3">
                  <div>
                    <label className="block text-[11px] font-medium text-on-surface mb-1">Card Number</label>
                    <input
                      type="text"
                      value={cardInfo.cardNumber}
                      onChange={(e) => setCardInfo({ ...cardInfo, cardNumber: e.target.value })}
                      className="w-full form-input p-2 text-xs bg-white text-on-surface"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-medium text-on-surface mb-1">Valid Thru</label>
                      <input
                        type="text"
                        value={cardInfo.expiry}
                        onChange={(e) => setCardInfo({ ...cardInfo, expiry: e.target.value })}
                        className="w-full form-input p-2 text-xs bg-white text-on-surface"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-on-surface mb-1">CVV</label>
                      <input
                        type="password"
                        value={cardInfo.cvv}
                        onChange={(e) => setCardInfo({ ...cardInfo, cvv: e.target.value })}
                        className="w-full form-input p-2 text-xs bg-white text-on-surface"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Submit Action */}
            <div className="pt-4 border-t border-surface-variant">
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-primary text-white font-bold text-base py-3.5 rounded-xl hover:bg-primary-container hover-lift shadow-elevated flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>Processing Secure Payment...</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-lg fill">lock</span>
                    <span>Pay ₹{selectedPackage.price}</span>
                  </>
                )}
              </button>

              <div className="flex justify-center items-center gap-2 mt-3 text-xs text-on-surface-variant">
                <span className="material-symbols-outlined text-primary text-base fill">verified_user</span>
                <span>256-Bit SSL Encrypted Healthcare Checkout</span>
              </div>
            </div>
          </form>

          {/* Refund & Cancellation policies */}
          <div className="mt-6 pt-4 border-t border-surface-variant flex justify-center gap-6 text-xs text-primary">
            <button onClick={() => setActivePage('contact')} className="hover:underline">
              Cancellation Policy
            </button>
            <span>•</span>
            <button onClick={() => setActivePage('contact')} className="hover:underline">
              100% Refund Terms
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
