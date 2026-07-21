import React from 'react';
import { motion } from 'framer-motion';
import {
  FiShield,
  FiRefreshCw,
  FiHeadphones,
  FiLock,
  FiAward,
  FiTruck,
  FiCheckCircle,
  FiCheck,
} from 'react-icons/fi';

const trustItems = [
  { icon: FiShield, title: 'SSL Secured Checkout', desc: 'Bank-Grade 256-Bit Encryption' },
  { icon: FiRefreshCw, title: '30-Day Returns', desc: 'Hassle-Free Refunds & Exchanges' },
  { icon: FiHeadphones, title: '24/7 Concierge Support', desc: 'Dedicated Luxury Assistance' },
  { icon: FiLock, title: 'Encrypted Payments', desc: '100% Protected Transactions' },
  { icon: FiAward, title: 'Authentic Products', desc: 'Guaranteed Verified Quality' },
  { icon: FiTruck, title: 'Fast Global Courier', desc: 'Insured Express Shipping' },
  { icon: FiCheckCircle, title: 'Buyer Protection', desc: 'Full Money-Back Guarantee' },
  { icon: FiCheck, title: 'Safe & Secure Checkout', desc: 'Zero Fraud Guarantee' },
];

export default function TrustIndicators({ compact = false }) {
  if (compact) {
    return (
      <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-line/50">
        {trustItems.slice(0, 4).map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="flex items-start gap-2 p-2 rounded-xl bg-surface/50 border border-line/30 hover:border-primary/30 transition-colors"
            >
              <Icon className="text-primary shrink-0 mt-0.5" size={13} />
              <div>
                <p className="text-[11px] font-bold text-ink leading-tight">{item.title}</p>
                <p className="text-[9px] text-ink/50 leading-none mt-0.5">{item.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="mt-8 p-6 sm:p-8 rounded-3xl bg-surface/50 border border-line/60 backdrop-blur-xl shadow-xl">
      <div className="flex items-center gap-2 mb-6 text-xs font-bold text-ink uppercase tracking-widest pb-3 border-b border-line/40">
        <FiShield className="text-primary animate-pulse" size={18} /> Trust & Security Guarantee
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        {trustItems.map((item) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.title}
              whileHover={{ y: -4, scale: 1.02 }}
              className="p-4 rounded-2xl bg-surface/80 border border-line/40 shadow-sm hover:shadow-lg hover:border-primary/40 transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-3 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                <Icon size={16} />
              </div>
              <div>
                <p className="text-xs font-bold text-ink leading-tight">{item.title}</p>
                <p className="text-[10px] text-ink/50 leading-snug mt-0.5">{item.desc}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
