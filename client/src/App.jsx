import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/AuthContext';
import { Header } from './components/common/Header';
import { BottomNav } from './components/common/BottomNav';
import { Toast } from './components/common/Toast';
import { CartDrawer } from './components/cart/CartDrawer';
import { AuthModal } from './components/common/AuthModal';
import { HomePage } from './pages/HomePage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CheckoutPage } from './pages/CheckoutPage';

// Full-screen loading spinner shown while verifying JWT on app mount
function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="flex flex-col items-center gap-5">
        <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center shadow-xl shadow-primary/40 animate-pulse">
          <span className="material-symbols-outlined text-on-primary text-[32px]">bolt</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="text-2xl font-black text-white tracking-tight">ElectroMart</span>
          <span className="text-slate-400 text-sm">Loading your session...</span>
        </div>
        <div className="flex gap-1.5 mt-2">
          <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '150ms' }} />
          <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
}

// The main app — only rendered when user is authenticated
function AppContent() {
  const [searchTerm, setSearchTerm] = useState('');
  const { isAuthenticated, isVerifying } = useAuth();

  // While checking token with server → show loading
  if (isVerifying) return <LoadingScreen />;

  // Not authenticated → show mandatory auth wall (can't be dismissed)
  if (!isAuthenticated) return <AuthModal />;

  // Authenticated → show full app
  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface">
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <main className="flex-1 w-full max-w-7xl mx-auto">
        <Routes>
          <Route path="/" element={<HomePage searchTerm={searchTerm} />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
      </main>
      <CartDrawer />
      <BottomNav />
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <WishlistProvider>
          <CartProvider>
            <AppContent />
          </CartProvider>
        </WishlistProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
