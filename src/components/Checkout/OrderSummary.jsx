import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import {
  FiShield,
  FiLock,
  FiTruck,
  FiTag,
  FiPlus,
  FiMinus,
  FiTrash2,
  FiChevronDown,
  FiChevronUp,
} from 'react-icons/fi';
import TrustIndicators from './TrustIndicators';
import { products } from '../../data/products';

export default function OrderSummary({
  shippingCost = 15.0,
  discountAmount = 0,
  couponCode = '',
  estimatedArrival = '',
}) {
  const { items: cartItems, subtotal: cartSubtotal, updateQty, removeItem } = useCart();
  const [isExpanded, setIsExpanded] = useState(true);

  // Fallback demo items if cart is empty
  const displayItems =
    cartItems && cartItems.length > 0
      ? cartItems
      : [
          { ...products[0], qty: 1 },
          { ...products[1], qty: 1 },
        ];

  const subtotal =
    cartSubtotal > 0
      ? cartSubtotal
      : displayItems.reduce((acc, i) => acc + i.price * (i.qty || 1), 0);

  const tax = subtotal * 0.08;
  const finalTotal = Math.max(0, subtotal + shippingCost + tax - discountAmount);

  return (
    <div className="sticky top-[110px] p-6 sm:p-8 rounded-3xl bg-surface/70 backdrop-blur-2xl border border-line/70 shadow-2xl transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-line/50">
        <div className="flex items-center gap-2">
          <h3 className="text-xl font-serif italic text-ink font-bold">
            Order Summary
          </h3>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-ink/60 hover:text-ink p-1 rounded-md"
            aria-label="Toggle items"
          >
            {isExpanded ? <FiChevronUp size={18} /> : <FiChevronDown size={18} />}
          </button>
        </div>

        <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
          {displayItems.length} {displayItems.length === 1 ? 'Item' : 'Items'}
        </span>
      </div>

      {/* Expandable Product List with Quantity Edit & Delete */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4 mb-6 max-h-[260px] overflow-y-auto pr-1.5 custom-scrollbar"
          >
            {displayItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3.5 p-2 rounded-2xl bg-surface/40 border border-line/30 group hover:border-primary/30 transition-all"
              >
                <div className="relative w-14 h-14 rounded-xl bg-secondary/40 overflow-hidden shrink-0 border border-line/50">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-ink truncate leading-tight">
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-ink/50 mt-0.5 font-medium">
                    ${item.price} each
                  </p>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2 mt-1.5">
                    <div className="flex items-center rounded-lg bg-surface border border-line/50">
                      <button
                        onClick={() => updateQty && updateQty(item.id, Math.max(1, (item.qty || 1) - 1))}
                        className="px-1.5 py-0.5 text-ink/60 hover:text-ink"
                        aria-label="Decrease quantity"
                      >
                        <FiMinus size={10} />
                      </button>
                      <span className="text-[11px] font-bold px-1.5 text-ink">
                        {item.qty || 1}
                      </span>
                      <button
                        onClick={() => updateQty && updateQty(item.id, (item.qty || 1) + 1)}
                        className="px-1.5 py-0.5 text-ink/60 hover:text-ink"
                        aria-label="Increase quantity"
                      >
                        <FiPlus size={10} />
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem && removeItem(item.id)}
                      className="text-red-500/70 hover:text-red-500 p-1 text-[11px]"
                      title="Remove Item"
                    >
                      <FiTrash2 size={12} />
                    </button>
                  </div>
                </div>

                <span className="text-xs font-bold text-ink tabular-nums">
                  ${((item.price) * (item.qty || 1)).toFixed(2)}
                </span>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cost Breakdown */}
      <div className="space-y-3 pt-4 border-t border-line/50 text-xs">
        <div className="flex justify-between text-ink/70">
          <span>Subtotal</span>
          <span className="font-bold text-ink tabular-nums">${subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-ink/70">
          <span className="flex items-center gap-1">
            <FiTruck size={12} className="text-primary" /> Express Shipping
          </span>
          <span className="font-bold text-ink">
            {shippingCost === 0 ? (
              <span className="text-green-500 font-bold">FREE</span>
            ) : (
              `$${shippingCost.toFixed(2)}`
            )}
          </span>
        </div>

        <div className="flex justify-between text-ink/70">
          <span>Estimated Tax (8%)</span>
          <span className="font-bold text-ink tabular-nums">${tax.toFixed(2)}</span>
        </div>

        {discountAmount > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="flex justify-between text-green-500 font-bold"
          >
            <span className="flex items-center gap-1">
              <FiTag size={12} /> Coupon ({couponCode || 'PROMO'})
            </span>
            <span className="tabular-nums">-${discountAmount.toFixed(2)}</span>
          </motion.div>
        )}
      </div>

      {/* Estimated Delivery Highlight */}
      {estimatedArrival && (
        <div className="mt-4 p-3 rounded-2xl bg-primary/5 border border-primary/20 flex items-center justify-between text-xs shadow-sm">
          <span className="text-ink/70 font-medium">Estimated Delivery</span>
          <span className="font-bold text-primary">{estimatedArrival}</span>
        </div>
      )}

      {/* Grand Total */}
      <div className="mt-6 pt-5 border-t border-line/60">
        <div className="flex justify-between items-baseline">
          <div>
            <span className="text-sm font-bold text-ink">Grand Total</span>
            <p className="text-[10px] text-ink/40">Includes taxes & duties</p>
          </div>
          <AnimatePresence mode="wait">
            <motion.span
              key={finalTotal}
              initial={{ scale: 1.1, color: '#e91e63' }}
              animate={{ scale: 1, color: 'currentColor' }}
              className="text-3xl font-serif italic font-bold text-ink tabular-nums"
            >
              ${finalTotal.toFixed(2)}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      {/* Accepted Payment Icons */}
      <div className="mt-6 pt-4 border-t border-line/40 flex items-center justify-center gap-2 opacity-80">
        <span className="text-[10px] font-semibold text-ink/50 uppercase tracking-widest mr-1">
          Accepted:
        </span>
        <span className="text-[11px] font-bold text-ink/70 bg-surface px-2 py-0.5 rounded border border-line/50">VISA</span>
        <span className="text-[11px] font-bold text-ink/70 bg-surface px-2 py-0.5 rounded border border-line/50">MC</span>
        <span className="text-[11px] font-bold text-ink/70 bg-surface px-2 py-0.5 rounded border border-line/50">AMEX</span>
        <span className="text-[11px] font-bold text-ink/70 bg-surface px-2 py-0.5 rounded border border-line/50">PAYPAL</span>
      </div>

      {/* Compact Trust Indicators */}
      <TrustIndicators compact />
    </div>
  );
}