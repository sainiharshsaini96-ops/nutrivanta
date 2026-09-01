import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import NotificationToast from './components/NotificationToast';
import PrototypeNavDrawer from './components/PrototypeNavDrawer';
import EditProfileModal from './components/EditProfileModal';
import VideoCallModal from './components/VideoCallModal';
import InvoiceModal from './components/InvoiceModal';

// Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import NutritionistProfilePage from './pages/NutritionistProfilePage';
import CheckoutPage from './pages/CheckoutPage';
import ContactPage from './pages/ContactPage';
import UserProfileDashboard from './pages/UserProfileDashboard';
import PaymentHistoryDashboard from './pages/PaymentHistoryDashboard';
import PrototypeHubPage from './pages/PrototypeHubPage';

function MainRouter() {
  const { activePage } = useApp();

  const renderCurrentPage = () => {
    switch (activePage) {
      case 'home':
        return <HomePage />;
      case 'about':
        return <AboutPage />;
      case 'nutritionists':
        return <NutritionistProfilePage />;
      case 'checkout':
        return <CheckoutPage />;
      case 'contact':
        return <ContactPage />;
      case 'dashboard':
        return <UserProfileDashboard />;
      case 'payments':
        return <PaymentHistoryDashboard />;
      case 'prototype_hub':
        return <PrototypeHubPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-on-background transition-colors duration-200">
      <Navbar />
      <div className="flex-grow">
        {renderCurrentPage()}
      </div>
      <Footer />

      {/* Global Modals & Notifications */}
      <EditProfileModal />
      <VideoCallModal />
      <InvoiceModal />
      <NotificationToast />
      <PrototypeNavDrawer />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainRouter />
    </AppProvider>
  );
}
