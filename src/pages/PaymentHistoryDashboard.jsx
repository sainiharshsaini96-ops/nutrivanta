import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function PaymentHistoryDashboard() {
  const { transactions, setSelectedInvoice, setActivePage } = useApp();
  const [filterStatus, setFilterStatus] = useState('ALL'); // 'ALL' | 'Paid' | 'Pending'
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTransactions = transactions.filter(txn => {
    const matchesStatus = filterStatus === 'ALL' || txn.status.toLowerCase() === filterStatus.toLowerCase();
    const matchesSearch = txn.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          txn.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          txn.service.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const totalSpent = transactions.reduce((acc, curr) => acc + (curr.status === 'Paid' ? curr.amount : 0), 0);
  const completedCount = transactions.filter(t => t.status === 'Paid').length;

  return (
    <main className="w-full max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-10 md:py-16">
      {/* Page Header with Back Navigation */}
      <div className="mb-8">
        <button
          onClick={() => setActivePage('dashboard')}
          className="flex items-center gap-2 mb-3 text-on-surface-variant hover:text-primary transition-colors text-xs sm:text-sm font-semibold group cursor-pointer"
        >
          <span className="material-symbols-outlined text-base group-hover:-translate-x-1 transition-transform">arrow_back</span>
          <span>Back to Dashboard</span>
        </button>
        <h1 className="text-2xl sm:text-3xl font-bold text-on-surface">Payment History</h1>
        <p className="text-xs sm:text-sm text-on-surface-variant">View, filter, and download your NutriVanta healthcare transactions.</p>
      </div>

      {/* Summary Cards (Bento Style 3 cols) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Total Spent */}
        <div className="bg-surface-container-lowest dark:bg-inverse-surface rounded-20px shadow-ambient border border-surface-variant p-6 flex flex-col justify-between hover-lift">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Total Spent</span>
            <div className="w-10 h-10 rounded-full bg-brand-mint text-primary flex items-center justify-center">
              <span className="material-symbols-outlined fill text-xl">account_balance_wallet</span>
            </div>
          </div>
          <div className="text-3xl font-bold text-on-surface">₹{totalSpent}</div>
          <span className="text-[11px] text-primary font-semibold mt-1">Across all completed sessions</span>
        </div>

        {/* Completed Consultations */}
        <div className="bg-surface-container-lowest dark:bg-inverse-surface rounded-20px shadow-ambient border border-surface-variant p-6 flex flex-col justify-between hover-lift">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Completed Sessions</span>
            <div className="w-10 h-10 rounded-full bg-brand-mint text-primary flex items-center justify-center">
              <span className="material-symbols-outlined fill text-xl">check_circle</span>
            </div>
          </div>
          <div className="text-3xl font-bold text-on-surface">{completedCount}</div>
          <span className="text-[11px] text-outline font-semibold mt-1">100% verified doctor consults</span>
        </div>

        {/* Refunds */}
        <div className="bg-surface-container-lowest dark:bg-inverse-surface rounded-20px shadow-ambient border border-surface-variant p-6 flex flex-col justify-between hover-lift">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Refunds & Disputed</span>
            <div className="w-10 h-10 rounded-full bg-surface-variant text-on-surface-variant flex items-center justify-center">
              <span className="material-symbols-outlined fill text-xl">history</span>
            </div>
          </div>
          <div className="text-3xl font-bold text-on-surface-variant">₹0</div>
          <span className="text-[11px] text-emerald-600 font-semibold mt-1">Zero unresolved disputes</span>
        </div>
      </div>

      {/* Transactions Table Container */}
      <div className="bg-surface-container-lowest dark:bg-inverse-surface rounded-20px shadow-ambient border border-surface-variant overflow-hidden">
        {/* Table Action Bar */}
        <div className="p-4 sm:p-6 border-b border-surface-variant flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-surface-container-lowest dark:bg-inverse-surface">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-on-surface">Recent Transactions</h2>
            <p className="text-xs text-on-surface-variant">Showing {filteredTransactions.length} of {transactions.length} records</p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-64">
              <input
                type="text"
                placeholder="Search txn ID, doctor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full text-xs bg-surface-container-low dark:bg-surface-container rounded-xl pl-8 pr-3 py-2 text-on-surface border border-surface-variant outline-none focus:ring-1 focus:ring-primary"
              />
              <span className="material-symbols-outlined text-xs text-outline absolute left-2.5 top-2.5">search</span>
            </div>

            {/* Status Filter Chips */}
            <div className="flex items-center bg-surface-container-low dark:bg-surface-container rounded-xl p-1 border border-surface-variant text-xs">
              {['ALL', 'Paid', 'Pending'].map((st) => (
                <button
                  key={st}
                  onClick={() => setFilterStatus(st)}
                  className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                    filterStatus === st
                      ? 'bg-primary text-white shadow-sm'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[750px] text-xs sm:text-sm">
            <thead>
              <tr className="bg-surface-container-low dark:bg-surface-container border-b border-surface-variant text-on-surface-variant font-semibold text-[11px] uppercase tracking-wider">
                <th className="px-6 py-3.5">Transaction ID</th>
                <th className="px-6 py-3.5">Date</th>
                <th className="px-6 py-3.5">Nutritionist</th>
                <th className="px-6 py-3.5">Service Type</th>
                <th className="px-6 py-3.5">Amount</th>
                <th className="px-6 py-3.5">Method</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5 text-center">Tax Invoice</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-variant">
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-6 py-12 text-center text-on-surface-variant text-sm">
                    No transactions match your search filter.
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((txn) => {
                  const isPaid = txn.status === 'Paid';
                  return (
                    <tr key={txn.id} className="hover:bg-surface-container-low/50 dark:hover:bg-surface-container/50 transition-colors group">
                      <td className="px-6 py-4 font-mono font-semibold text-primary dark:text-primary-fixed">
                        {txn.id}
                      </td>
                      <td className="px-6 py-4 text-on-surface-variant">
                        {txn.date}
                      </td>
                      <td className="px-6 py-4 text-on-surface">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-brand-mint text-primary flex items-center justify-center font-bold text-xs shrink-0">
                            {txn.doctorInitials}
                          </div>
                          <span className="font-semibold">{txn.doctor}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-on-surface-variant">
                        {txn.service}
                      </td>
                      <td className="px-6 py-4 font-bold text-on-surface">
                        ₹{txn.amount}
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 rounded-md bg-surface-container-low dark:bg-surface-container text-on-surface text-xs font-medium">
                          {txn.method}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                          isPaid
                            ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                            : 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${isPaid ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                          {txn.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => setSelectedInvoice(txn)}
                          className="px-3 py-1.5 rounded-lg bg-surface-container hover:bg-primary hover:text-white text-on-surface transition-colors inline-flex items-center gap-1 text-xs font-medium cursor-pointer"
                          title="View & Download Invoice"
                        >
                          <span className="material-symbols-outlined text-sm">receipt</span>
                          <span>Invoice</span>
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
