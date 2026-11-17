import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { CartDrawer } from './CartDrawer';
import { SearchOverlay } from './SearchOverlay';
import { ToastContainer } from './ToastContainer';
import { MobileBottomNav } from './MobileBottomNav';
import { BasketDrop } from '../common/BasketDrop';

export function MainLayout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-[#e9e7df] text-[#16193a]">
      <Navbar />
      <main className="flex-1 pb-16 md:pb-0">{children}</main>
      <Footer />
      <MobileBottomNav />
      <CartDrawer />
      <SearchOverlay />
      <BasketDrop />
      <ToastContainer />
    </div>
  );
}
