import React, { createContext, useContext, useState } from 'react';
import { INITIAL_USER, FEATURED_NUTRITIONIST, INITIAL_TRANSACTIONS } from '../data/mockData';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [activePage, setActivePage] = useState('home');
  const [user, setUser] = useState(INITIAL_USER);
  const [nutritionist, setNutritionist] = useState(FEATURED_NUTRITIONIST);
  const [selectedPackage, setSelectedPackage] = useState(FEATURED_NUTRITIONIST.packages[1]); // Default 60-min
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isVideoCallOpen, setIsVideoCallOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [isPrototypeDrawerOpen, setIsPrototypeDrawerOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type, id: Date.now() });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const updateUserProfile = (updatedData) => {
    setUser(prev => ({
      ...prev,
      ...updatedData
    }));
    showToast("Profile information updated successfully!");
  };

  const bookConsultation = (bookingDetails) => {
    const newTxn = {
      id: `TXN-${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      doctor: nutritionist.name,
      doctorInitials: nutritionist.name.split(' ').map(n => n[0]).join(''),
      service: selectedPackage.title,
      amount: selectedPackage.price,
      method: bookingDetails.paymentMethod ? bookingDetails.paymentMethod.toUpperCase() : 'UPI',
      status: 'Paid',
      invoiceUrl: '#'
    };

    setTransactions(prev => [newTxn, ...prev]);
    setUser(prev => ({
      ...prev,
      stats: {
        ...prev.stats,
        totalConsultations: prev.stats.totalConsultations + 1,
        totalSpent: prev.stats.totalSpent + selectedPackage.price
      },
      upcomingConsultation: {
        doctorName: nutritionist.name,
        doctorRole: nutritionist.role,
        doctorAvatar: nutritionist.avatar,
        date: bookingDetails.date || "25 Aug 2026",
        time: bookingDetails.time || "10:30 AM (IST)",
        type: "Video Call",
        status: "Confirmed"
      }
    }));

    showToast(`Payment of ₹${selectedPackage.price} Successful! Consultation confirmed.`);
    setActivePage('dashboard');
  };

  const toggleDarkMode = () => {
    setDarkMode(prev => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return next;
    });
  };

  const navigateTo = (page, data = null) => {
    if (page === 'checkout' && data?.pkg) {
      setSelectedPackage(data.pkg);
    }
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AppContext.Provider
      value={{
        activePage,
        setActivePage: navigateTo,
        user,
        updateUserProfile,
        nutritionist,
        setNutritionist,
        selectedPackage,
        setSelectedPackage,
        transactions,
        bookConsultation,
        isEditProfileOpen,
        setIsEditProfileOpen,
        isVideoCallOpen,
        setIsVideoCallOpen,
        selectedInvoice,
        setSelectedInvoice,
        toastMessage,
        showToast,
        isPrototypeDrawerOpen,
        setIsPrototypeDrawerOpen,
        darkMode,
        toggleDarkMode
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
