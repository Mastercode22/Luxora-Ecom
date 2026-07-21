import React from 'react';
import { motion } from 'framer-motion';
import { FiShield, FiLock, FiClock, FiCheck } from 'react-icons/fi';

export default function CheckoutHeader() {
  return (
    <div className="mb-8 pb-6 border-b border-line/60">
      {/* Badges Bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-wrap items-center gap-2.5 mb-4"
      >
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-bold tracking-wider uppercase shadow-sm">
          <FiShield className="text-primary animate-pulse" size={13} />
          Secure Checkout
        </span>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-xs font-semibold tracking-wider">
          <FiLock size={12} />
          256-Bit SSL Encrypted
        </span>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/80 text-ink/70 border border-line/50 text-xs font-medium">
          <FiClock className="text-primary" size={12} />
          Est. Checkout Time: <strong>&lt; 2 Mins</strong>
        </span>
      </motion.div>

      {/* Main Title & Subtitle */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-serif italic text-ink font-bold tracking-tight"
          >
            Luxury Purchasing Experience
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-ink/60 text-sm mt-1.5 max-w-xl"
          >
            Complete your order securely in under 2 minutes with priority express shipping and guaranteed buyer protection.
          </motion.p>
        </div>

        {/* Guarantee Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="hidden sm:flex items-center gap-2 text-xs font-semibold text-ink/80 bg-surface/80 px-4 py-2 rounded-2xl border border-line/60 shadow-sm shrink-0"
        >
          <div className="w-5 h-5 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center">
            <FiCheck size={12} />
          </div>
          <span>Money-Back Guarantee Protected</span>
        </motion.div>
      </div>
    </div>
  );
}
