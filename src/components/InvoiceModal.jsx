import React from 'react';
import { useApp } from '../context/AppContext';
import { BRAND_INFO } from '../data/mockData';

export default function InvoiceModal() {
  const { user, selectedInvoice, setSelectedInvoice, showToast } = useApp();

  if (!selectedInvoice) return null;

  const basePrice = Math.round(selectedInvoice.amount / 1.18);
  const gst = selectedInvoice.amount - basePrice;

  const handlePrint = () => {
    showToast(`Downloading Tax Invoice ${selectedInvoice.id}.pdf...`);
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setSelectedInvoice(null)}
      />

      {/* Invoice Modal Card */}
      <div className="relative bg-white text-zinc-900 w-full max-w-2xl rounded-20px shadow-2xl border border-zinc-200 p-6 sm:p-8 z-10 animate-scale-up max-h-[90vh] overflow-y-auto">
        {/* Actions Bar (Top) */}
        <div className="flex justify-between items-center pb-4 border-b border-zinc-200 mb-6 print:hidden">
          <span className="text-xs font-bold uppercase text-primary tracking-wider flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">receipt</span>
            Official Healthcare Invoice
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-semibold flex items-center gap-1 transition-colors"
            >
              <span className="material-symbols-outlined text-sm">print</span>
              Print / Save PDF
            </button>
            <button
              onClick={() => setSelectedInvoice(null)}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
        </div>

        {/* Invoice Printable Content */}
        <div className="space-y-6">
          {/* Header */}
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <img src={BRAND_INFO.logoUrl} alt="Logo" className="h-10 w-10 object-contain" />
              <div>
                <h1 className="font-bold text-xl text-emerald-900">{BRAND_INFO.name} Healthcare</h1>
                <p className="text-xs text-zinc-500">Sector 44, Gurugram NCR, Haryana 122003</p>
                <p className="text-xs text-zinc-500">GSTIN: 07AAACN1234F1Z8</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-full uppercase">
                {selectedInvoice.status}
              </span>
              <p className="text-sm font-bold text-zinc-800 mt-2">{selectedInvoice.id}</p>
              <p className="text-xs text-zinc-500">Date: {selectedInvoice.date}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-zinc-50 text-xs">
            <div>
              <p className="font-semibold text-zinc-500 uppercase tracking-wider mb-1">Billed To (Patient):</p>
              <p className="font-bold text-sm text-zinc-900">{user.name}</p>
              <p className="text-zinc-600">{user.email}</p>
              <p className="text-zinc-600">{user.phone}</p>
              <p className="text-zinc-600">{user.location}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-zinc-500 uppercase tracking-wider mb-1">Service Provider:</p>
              <p className="font-bold text-sm text-emerald-900">{selectedInvoice.doctor}</p>
              <p className="text-zinc-600">Senior Clinical Nutrition Specialist</p>
              <p className="text-zinc-600">Payment Mode: {selectedInvoice.method}</p>
            </div>
          </div>

          {/* Line Items Table */}
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-300 text-zinc-500 uppercase">
                <th className="py-2 font-semibold">Description</th>
                <th className="py-2 font-semibold text-center">Qty</th>
                <th className="py-2 font-semibold text-right">Rate</th>
                <th className="py-2 font-semibold text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200">
              <tr>
                <td className="py-3">
                  <p className="font-semibold text-zinc-900">{selectedInvoice.service}</p>
                  <p className="text-zinc-500 text-[11px]">Telehealth consultation & customized clinical dietary guide</p>
                </td>
                <td className="py-3 text-center">1</td>
                <td className="py-3 text-right">₹{basePrice}</td>
                <td className="py-3 text-right font-medium">₹{basePrice}</td>
              </tr>
            </tbody>
          </table>

          {/* Calculation */}
          <div className="flex justify-end pt-2 border-t border-zinc-200">
            <div className="w-64 space-y-1.5 text-xs">
              <div className="flex justify-between text-zinc-600">
                <span>Subtotal:</span>
                <span>₹{basePrice}</span>
              </div>
              <div className="flex justify-between text-zinc-600">
                <span>Integrated GST (18%):</span>
                <span>₹{gst}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-emerald-950 pt-2 border-t border-zinc-300">
                <span>Total Paid:</span>
                <span>₹{selectedInvoice.amount}</span>
              </div>
            </div>
          </div>

          <div className="text-[11px] text-zinc-500 text-center pt-4 border-t border-zinc-200">
            This is a computer-generated tax invoice. NutriVanta Telehealth Consultation Services.
          </div>
        </div>
      </div>
    </div>
  );
}
