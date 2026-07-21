import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiCheckCircle,
  FiPackage,
  FiShoppingBag,
  FiDownload,
  FiPrinter,
  FiMapPin,
  FiAward,
  FiTruck,
  FiArrowRight,
  FiClock,
  FiCheck,
} from 'react-icons/fi';
import Container from '../components/ui/Container';

export default function SuccessPage() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId') || 'LX-982402';
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadReceipt = () => {
    alert(`Receipt for Order #${orderId} has been generated and sent to your email!`);
  };

  return (
    <div className="min-h-screen bg-surface pt-[120px] pb-24 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Floating Micro-Confetti Particles */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
          {[...Array(24)].map((_, i) => (
            <motion.div
              key={i}
              initial={{
                x: Math.random() * window.innerWidth,
                y: -20,
                rotate: 0,
                scale: Math.random() * 0.8 + 0.4,
              }}
              animate={{
                y: window.innerHeight + 50,
                rotate: 360,
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                ease: 'linear',
                delay: Math.random() * 2,
              }}
              className={`absolute w-3 h-3 rounded-full ${
                i % 3 === 0
                  ? 'bg-primary'
                  : i % 3 === 1
                  ? 'bg-amber-400'
                  : 'bg-emerald-400'
              }`}
            />
          ))}
        </div>
      )}

      {/* Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <Container className="max-w-3xl text-center">
        {/* Animated Checkmark Badge */}
        <motion.div
          initial={{ scale: 0.4, opacity: 0, rotate: -20 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ type: 'spring', bounce: 0.5, duration: 0.8 }}
          className="w-24 h-24 bg-gradient-to-tr from-green-500/20 to-emerald-400/20 border-2 border-green-500/40 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_60px_rgba(34,197,94,0.35)]"
        >
          <FiCheckCircle size={50} />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-4xl sm:text-5xl font-serif italic text-ink font-bold mb-3"
        >
          Order Successfully Placed
        </motion.h1>

        {/* Subtitle */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-1 mb-8"
        >
          <p className="text-ink text-lg font-medium">
            Thank you for shopping with Luxora Market.
          </p>
          <p className="text-ink/60 text-sm max-w-lg mx-auto">
            We've received your order and sent a detailed invoice to your email. Your luxury items are currently being prepared for priority express dispatch.
          </p>
        </motion.div>

        {/* Order Summary Confirmation Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-surface/70 backdrop-blur-2xl p-6 sm:p-8 rounded-3xl border border-line/70 shadow-2xl mb-10 text-left space-y-4 max-w-xl mx-auto"
        >
          <div className="flex justify-between items-center pb-3 border-b border-line/40">
            <span className="text-xs text-ink/60 font-semibold uppercase tracking-wider">
              Order Reference
            </span>
            <span className="font-mono font-bold text-ink text-sm bg-secondary px-3 py-1 rounded-full border border-line/50">
              #{orderId}
            </span>
          </div>

          <div className="flex justify-between items-center pb-3 border-b border-line/40">
            <span className="text-xs text-ink/60 font-semibold uppercase tracking-wider flex items-center gap-1.5">
              <FiTruck className="text-primary" /> Est. Delivery Arrival
            </span>
            <span className="font-bold text-ink text-sm">
              3–5 Business Days
            </span>
          </div>

          <div className="flex justify-between items-center pb-3 border-b border-line/40">
            <span className="text-xs text-ink/60 font-semibold uppercase tracking-wider flex items-center gap-1.5">
              <FiAward className="text-amber-400" /> Reward Points Earned
            </span>
            <span className="font-bold text-amber-400 text-sm">
              +250 VIP Points
            </span>
          </div>

          {/* Mini Pipeline Preview */}
          <div className="pt-2 pb-2">
            <span className="text-[11px] font-bold text-ink/60 uppercase tracking-widest block mb-2">
              Shipment Status
            </span>
            <div className="flex items-center gap-2 text-xs">
              <span className="px-2.5 py-1 rounded-lg bg-green-500/10 text-green-500 font-bold border border-green-500/20 flex items-center gap-1">
                <FiCheck size={12} /> Confirmed
              </span>
              <span className="text-ink/30">→</span>
              <span className="px-2.5 py-1 rounded-lg bg-primary/10 text-primary font-bold border border-primary/20 flex items-center gap-1">
                <FiClock size={12} className="animate-spin" /> Processing
              </span>
              <span className="text-ink/30">→</span>
              <span className="text-ink/40 font-medium">Shipped</span>
            </div>
          </div>

          <div className="pt-2 border-t border-line/40 flex items-start gap-2 text-xs text-ink/70">
            <FiMapPin className="text-primary shrink-0 mt-0.5" />
            <span>
              Delivery Address: <strong>123 Luxury Way, New York, NY 10001</strong>
            </span>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-3 max-w-xl mx-auto"
        >
          <Link
            to="/account/orders"
            className="btn-primary flex items-center justify-center gap-2 px-6 py-3.5 shadow-lg flex-1 min-w-[160px]"
          >
            <FiPackage /> View & Track Orders
          </Link>

          <Link
            to="/shop"
            className="px-6 py-3.5 rounded-full bg-secondary hover:bg-secondary/80 text-ink font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 border border-line/60 flex-1 min-w-[160px]"
          >
            <FiShoppingBag /> Continue Shopping
          </Link>

          <button
            onClick={handleDownloadReceipt}
            className="px-5 py-3 rounded-full bg-surface border border-line/60 hover:border-primary/50 text-ink text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
          >
            <FiDownload size={14} /> Download Receipt
          </button>

          <button
            onClick={handlePrint}
            className="px-5 py-3 rounded-full bg-surface border border-line/60 hover:border-primary/50 text-ink text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
          >
            <FiPrinter size={14} /> Print Invoice
          </button>
        </motion.div>
      </Container>
    </div>
  );
}