import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaApple, FaPaypal, FaGoogle } from 'react-icons/fa';
import { FiZap, FiSmartphone, FiCheck, FiLock } from 'react-icons/fi';

const expressMethods = [
  {
    id: 'apple_pay',
    name: 'Apple Pay',
    sub: '1-Touch Express',
    icon: FaApple,
    color: 'from-gray-900 to-black text-white dark:from-gray-800 dark:to-gray-950',
    badge: 'Coming Soon',
  },
  {
    id: 'google_pay',
    name: 'Google Pay',
    sub: 'Fast & Secure',
    icon: FaGoogle,
    color: 'from-blue-600 to-blue-700 text-white',
    badge: 'Coming Soon',
  },
  {
    id: 'paypal',
    name: 'PayPal',
    sub: 'Buyer Protection',
    icon: FaPaypal,
    color: 'from-sky-500 to-blue-600 text-white',
    badge: 'Coming Soon',
  },
  {
    id: 'shop_pay',
    name: 'Shop Pay',
    sub: 'Installments',
    icon: FiZap,
    color: 'from-purple-600 to-indigo-700 text-white',
    badge: 'Coming Soon',
  },
  {
    id: 'mobile_money',
    name: 'Mobile Money',
    sub: 'Instant Transfer',
    icon: FiSmartphone,
    color: 'from-emerald-600 to-teal-700 text-white',
    badge: 'Coming Soon',
  },
];

export default function ExpressCheckout({ onSelectMethod }) {
  const [clickedId, setClickedId] = useState(null);

  const handleClick = (method) => {
    setClickedId(method.id);
    setTimeout(() => setClickedId(null), 1000);
    if (onSelectMethod) onSelectMethod(method.id);
  };

  return (
    <div className="mb-6 p-6 sm:p-8 rounded-3xl bg-surface/60 backdrop-blur-xl border border-line/70 shadow-2xl relative overflow-hidden">
      {/* Background Subtle Gradient Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-line/40">
        <div>
          <span className="text-xs font-bold text-primary uppercase tracking-widest flex items-center gap-1.5 mb-1">
            <FiZap className="text-primary animate-bounce" /> Express One-Touch Checkout
          </span>
          <h3 className="text-xl font-serif italic text-ink font-semibold">
            Complete your purchase in seconds using Express Checkout.
          </h3>
        </div>
        <span className="text-[11px] font-semibold text-ink/50 bg-secondary px-3 py-1 rounded-full border border-line/40 shrink-0 self-start sm:self-auto flex items-center gap-1">
          <FiLock size={11} /> 1-Click Verification
        </span>
      </div>

      {/* Grid of Express Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        {expressMethods.map((method) => {
          const Icon = method.icon;
          const isClicked = clickedId === method.id;

          return (
            <motion.button
              key={method.id}
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => handleClick(method)}
              className={`relative group overflow-hidden p-4 rounded-2xl bg-gradient-to-br ${method.color} shadow-lg hover:shadow-[0_12px_25px_-5px_rgba(0,0,0,0.3)] transition-all duration-300 flex flex-col justify-between text-left min-h-[105px] border border-white/10 cursor-pointer`}
            >
              {/* Ripple Effect Background on Click */}
              <AnimatePresence>
                {isClicked && (
                  <motion.span
                    initial={{ scale: 0, opacity: 0.8 }}
                    animate={{ scale: 4, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-white/40 rounded-full pointer-events-none"
                  />
                )}
              </AnimatePresence>

              <div className="flex items-center justify-between w-full mb-2">
                <Icon size={22} className="group-hover:scale-110 transition-transform duration-300" />
                {method.badge && (
                  <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/20">
                    {method.badge}
                  </span>
                )}
              </div>

              <div>
                <p className="text-xs font-bold leading-tight">{method.name}</p>
                <p className="text-[10px] text-white/70 mt-0.5 font-medium">{method.sub}</p>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* OR Continue with Standard Checkout Divider */}
      <div className="relative my-8 flex items-center justify-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-line/60" />
        </div>
        <div className="relative px-4 bg-surface text-xs font-bold uppercase tracking-widest text-ink/50 rounded-full border border-line/60 shadow-sm py-1">
          OR Continue with Standard Checkout
        </div>
      </div>
    </div>
  );
}
