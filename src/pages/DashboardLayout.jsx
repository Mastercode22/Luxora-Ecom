import { Outlet } from "react-router-dom";
import Container from "../components/ui/Container";
import Sidebar from "../components/dashboard/Sidebar";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";

export default function DashboardLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="pt-[110px] pb-24 min-h-screen">
      <Container>
        {/* Mobile menu toggle */}
        <div className="lg:hidden flex items-center justify-between mb-6 bg-surface/50 backdrop-blur-md border border-line/60 p-4 rounded-2xl">
          <h1 className="font-serif italic text-xl text-white">My Account</h1>
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-secondary/50 text-white hover:bg-secondary transition-colors"
          >
            <FiMenu size={20} />
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 relative items-start">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-72 shrink-0 sticky top-[130px]">
            <Sidebar />
          </div>

          {/* Mobile Sidebar Drawer */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setMobileMenuOpen(false)}
                  className="fixed inset-0 bg-ink/70 backdrop-blur-sm z-[9999] lg:hidden"
                />
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  className="fixed inset-y-0 left-0 w-[280px] bg-surface border-r border-line/60 z-[10000] lg:hidden overflow-y-auto"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-8">
                      <h2 className="font-serif italic text-2xl text-white">Menu</h2>
                      <button
                        onClick={() => setMobileMenuOpen(false)}
                        className="p-2 text-white/70 hover:text-white"
                      >
                        <FiX size={24} />
                      </button>
                    </div>
                    <Sidebar onNavigate={() => setMobileMenuOpen(false)} />
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Main Content Area */}
          <div className="flex-1 min-w-0 w-full">
            <Outlet />
          </div>
        </div>
      </Container>
    </div>
  );
}
