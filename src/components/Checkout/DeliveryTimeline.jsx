import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiTruck, FiClock, FiCheckCircle, FiPackage, FiCalendar } from 'react-icons/fi';

export function calculateDeliveryDate(method, customDate) {
  const today = new Date();
  if (method === 'same_day') {
    return 'Today, ' + today.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }
  if (method === 'express') {
    const d = new Date(today);
    d.setDate(d.getDate() + 2);
    return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  }
  if (method === 'gift' && customDate) {
    const d = new Date(customDate);
    return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  }
  // Default standard 3-5 business days
  const d = new Date(today);
  d.setDate(d.getDate() + 4);
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

export default function DeliveryTimeline({ method = 'standard', customDate }) {
  const estimatedDateStr = calculateDeliveryDate(method, customDate);

  // Countdown state: 1 hour 45 minutes countdown simulator
  const [timeLeft, setTimeLeft] = useState({ hours: 1, minutes: 45, seconds: 30 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const steps = [
    { label: 'Today', sub: 'Order Placed', active: true, done: true },
    { label: 'Confirmed', sub: 'Instant Sync', active: true, done: true },
    { label: 'Packed', sub: 'Luxury Boxed', active: true, done: true },
    { label: 'Shipped', sub: 'In Transit', active: method === 'express' || method === 'same_day', done: false },
    { label: 'Delivered', sub: estimatedDateStr, active: false, done: false, highlight: true },
  ];

  return (
    <div className="mt-6 p-6 rounded-3xl bg-surface/50 border border-line/60 backdrop-blur-md shadow-lg">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-line/40">
        <div>
          <span className="text-xs font-bold text-primary uppercase tracking-widest flex items-center gap-1.5 mb-1">
            <FiTruck className="text-primary" /> Guaranteed Arrival Pipeline
          </span>
          <AnimatePresence mode="wait">
            <motion.h4
              key={estimatedDateStr}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="text-2xl font-serif italic text-ink font-bold"
            >
              {estimatedDateStr}
            </motion.h4>
          </AnimatePresence>
        </div>

        {/* Live Shipping Countdown Banner */}
        <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-primary/10 border border-primary/20 text-xs font-semibold text-primary self-start sm:self-auto shadow-sm">
          <FiClock className="animate-spin text-primary shrink-0" size={16} />
          <span>
            Order within{' '}
            <strong className="tabular-nums">
              {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
            </strong>{' '}
            for same-day priority dispatch.
          </span>
        </div>
      </div>

      {/* Visual Timeline Pipeline */}
      <div className="relative flex items-center justify-between gap-2 overflow-x-auto py-2 custom-scrollbar">
        {steps.map((step, idx) => (
          <div key={step.label} className="flex-1 flex flex-col items-center text-center min-w-[75px] relative">
            {/* Connecting Line */}
            {idx < steps.length - 1 && (
              <div
                className={`absolute top-4 left-[50%] right-[-50%] h-[2px] z-0 transition-colors duration-500 ${
                  step.active ? 'bg-primary' : 'bg-line/50'
                }`}
              />
            )}

            {/* Step Icon / Dot */}
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              key={`${method}-${step.label}`}
              className={`relative z-10 w-9 h-9 rounded-full flex items-center justify-center text-xs transition-all duration-300 ${
                step.highlight
                  ? 'bg-primary text-white ring-4 ring-primary/20 shadow-lg animate-pulse'
                  : step.done
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-surface border border-line text-ink/30'
              }`}
            >
              {step.highlight ? (
                <FiPackage size={15} />
              ) : step.done ? (
                <FiCheckCircle size={15} />
              ) : (
                idx + 1
              )}
            </motion.div>

            {/* Labels */}
            <p className="mt-2 text-xs font-bold text-ink leading-tight">
              {step.label}
            </p>
            <p className="text-[10px] text-ink/60 leading-none mt-0.5 truncate max-w-[85px]">
              {step.sub}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
