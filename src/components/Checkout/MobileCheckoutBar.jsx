import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiLock, FiShield } from 'react-icons/fi';

export default function MobileCheckoutBar({ totalAmount = 0, onPlaceOrder, isProcessing }) {
  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-surface/90 backdrop-blur-2xl border-t border-line/70 p-4 shadow-[0_-10px_30px_rgba(0,0,0,0.15)]"
    >
      <div className="flex items-center justify-between gap-4 max-w-md mx-auto">
        <div>
          <span className="text-[10px] font-semibold text-ink/50 uppercase tracking-widest block">
            Total Payable
          </span>
          <span className="text-xl font-serif italic font-bold text-ink tabular-nums">
            ${totalAmount.toFixed(2)}
          </span>
        </div>

        <button
          onClick={onPlaceOrder}
          disabled={isProcessing}
          className="flex-1 py-3.5 px-6 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold text-sm shadow-lg transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
        >
          <span>{isProcessing ? 'Processing...' : 'Place Secure Order'}</span>
          <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
}
