import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import GlobalBackground from '../ui/GlobalBackground';

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-surface overflow-x-hidden w-full relative z-0">
      <Navbar />
      <main className="flex-1 relative z-10 w-full max-w-[100vw]">
        <GlobalBackground />
        {children}
      </main>
      <Footer />
    </div>
  );
}
