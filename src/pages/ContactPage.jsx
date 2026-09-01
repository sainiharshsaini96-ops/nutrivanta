import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FAQS } from '../data/mockData';

export default function ContactPage() {
  const { showToast } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Consultation Inquiry',
    message: ''
  });

  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    showToast(`Thank you ${formData.name}! Your message has been sent to our clinical support team.`);
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: 'Consultation Inquiry',
      message: ''
    });
  };

  const toggleFaq = (idx) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  return (
    <main className="w-full flex-grow flex flex-col items-center py-12 md:py-20 px-margin-mobile md:px-margin-desktop gap-12 max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="text-center w-full max-w-3xl mx-auto flex flex-col items-center gap-3">
        <span className="text-xs uppercase font-bold tracking-widest text-primary-container bg-brand-mint px-3 py-1 rounded-full">
          24/7 Clinical Support
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold text-on-surface tracking-tight">
          We're Here to Help.
        </h1>
        <p className="text-base sm:text-lg text-on-surface-variant max-w-2xl leading-relaxed">
          Connect with our team of clinical nutritionists and support staff. Whether you have questions about our plans, need technical assistance, or want to explore enterprise wellness solutions, we're ready to assist you.
        </p>
      </section>

      {/* Bento Grid: Contact Form & Info Cards */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form Area (7 cols) */}
        <div className="lg:col-span-7 bg-surface-container-lowest dark:bg-inverse-surface rounded-20px shadow-ambient border border-surface-variant p-6 sm:p-8">
          <h2 className="text-xl font-bold text-on-surface mb-6">Send Us a Message</h2>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-on-surface-variant" htmlFor="c-name">
                  Full Name
                </label>
                <input
                  id="c-name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Jane Doe"
                  className="form-input text-sm p-3 bg-surface-container-lowest dark:bg-surface-container text-on-surface"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-on-surface-variant" htmlFor="c-email">
                  Email Address
                </label>
                <input
                  id="c-email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="jane@example.com"
                  className="form-input text-sm p-3 bg-surface-container-lowest dark:bg-surface-container text-on-surface"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-on-surface-variant" htmlFor="c-phone">
                  Phone Number (Optional)
                </label>
                <input
                  id="c-phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="form-input text-sm p-3 bg-surface-container-lowest dark:bg-surface-container text-on-surface"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-on-surface-variant" htmlFor="c-subject">
                  Subject
                </label>
                <select
                  id="c-subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="form-input text-sm p-3 bg-surface-container-lowest dark:bg-surface-container text-on-surface"
                >
                  <option>Consultation Inquiry</option>
                  <option>Technical Support</option>
                  <option>Billing Question</option>
                  <option>Corporate Partnership</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-on-surface-variant" htmlFor="c-msg">
                Message
              </label>
              <textarea
                id="c-msg"
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="How can our clinical team help you today?"
                className="form-input text-sm p-3 bg-surface-container-lowest dark:bg-surface-container text-on-surface resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-primary-container text-on-primary font-bold text-sm py-3 px-6 rounded-xl hover:opacity-90 transition-opacity w-full sm:w-auto self-start mt-2 flex items-center justify-center gap-2 hover-lift shadow-sm"
            >
              <span>Send Message</span>
              <span className="material-symbols-outlined text-sm">send</span>
            </button>
          </form>
        </div>

        {/* Info Cards Grid (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {/* Email Card */}
          <div className="bg-surface-container-lowest dark:bg-inverse-surface rounded-20px shadow-ambient border border-surface-variant p-6 flex items-start gap-4 hover-lift">
            <div className="w-12 h-12 rounded-2xl bg-brand-mint text-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined fill text-2xl">mail</span>
            </div>
            <div>
              <h3 className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1">
                Email Support
              </h3>
              <a
                href="mailto:support@nutrivanta.com"
                className="text-base font-bold text-on-surface hover:text-primary transition-colors"
              >
                support@nutrivanta.com
              </a>
              <p className="text-xs text-on-surface-variant mt-1">Average response within 2-4 hours.</p>
            </div>
          </div>

          {/* Phone Card */}
          <div className="bg-surface-container-lowest dark:bg-inverse-surface rounded-20px shadow-ambient border border-surface-variant p-6 flex items-start gap-4 hover-lift">
            <div className="w-12 h-12 rounded-2xl bg-brand-mint text-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined fill text-2xl">call</span>
            </div>
            <div>
              <h3 className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1">
                Phone Support
              </h3>
              <a
                href="tel:+911145678900"
                className="text-base font-bold text-on-surface hover:text-primary transition-colors"
              >
                +91 11 4567 8900
              </a>
              <p className="text-xs text-on-surface-variant mt-1">Mon - Sat, 9:00 AM - 7:00 PM IST</p>
            </div>
          </div>

          {/* Head Office Card */}
          <div className="bg-surface-container-lowest dark:bg-inverse-surface rounded-20px shadow-ambient border border-surface-variant p-6 flex items-start gap-4 hover-lift">
            <div className="w-12 h-12 rounded-2xl bg-brand-mint text-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined fill text-2xl">location_on</span>
            </div>
            <div>
              <h3 className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1">
                Headquarters
              </h3>
              <p className="text-base font-bold text-on-surface">New Delhi NCR, India</p>
              <p className="text-xs text-on-surface-variant mt-1">Sector 44, Gurugram NCR, Haryana 122003</p>
            </div>
          </div>
        </div>
      </div>

      {/* Accordion FAQ Section */}
      <section className="w-full max-w-4xl mt-6 flex flex-col gap-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-on-surface text-center">
          Frequently Asked Questions
        </h2>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="bg-surface-container-lowest dark:bg-inverse-surface rounded-20px shadow-ambient border border-surface-variant overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex justify-between items-center p-5 text-left text-sm sm:text-base font-bold text-on-surface hover:bg-surface-container-low transition-colors"
                >
                  <span>{faq.question}</span>
                  <span
                    className={`material-symbols-outlined text-primary text-xl transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  >
                    expand_more
                  </span>
                </button>
                {isOpen && (
                  <div className="p-5 pt-0 text-xs sm:text-sm text-on-surface-variant leading-relaxed border-t border-surface-variant/40 animate-fade-in">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
