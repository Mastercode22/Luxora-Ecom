import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiCreditCard,
  FiLock,
  FiTag,
  FiCheck,
  FiShield,
  FiHelpCircle,
  FiX,
  FiLoader,
  FiSmartphone,
  FiZap,
} from 'react-icons/fi';
import { FaPaypal, FaApple, FaGoogle } from 'react-icons/fa';

export default function PaymentSection({
  method = 'credit_card',
  onChange,
  onApplyCoupon,
  appliedCoupon = '',
  discountAmount = 0,
  sameAsShipping = true,
  onSameAsShippingChange,
}) {
  const [couponInput, setCouponInput] = useState('');
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');
  const [showCvvTooltip, setShowCvvTooltip] = useState(false);

  // Card input state
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');

  // Detect Card Brand
  const getCardBrand = (num) => {
    const clean = num.replace(/\s+/g, '');
    if (/^4/.test(clean)) return 'VISA';
    if (/^5[1-5]/.test(clean)) return 'MASTERCARD';
    if (/^3[47]/.test(clean)) return 'AMEX';
    return null;
  };

  const cardBrand = getCardBrand(cardNumber);

  // Format Card Number (adds space every 4 digits)
  const handleCardNumberChange = (e) => {
    let val = e.target.value.replace(/\D/g, '').slice(0, 16);
    let formatted = val.match(/.{1,4}/g)?.join(' ') || val;
    setCardNumber(formatted);
  };

  // Format Expiry MM/YY
  const handleExpiryChange = (e) => {
    let val = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (val.length >= 3) {
      val = `${val.slice(0, 2)}/${val.slice(2)}`;
    }
    setCardExpiry(val);
  };

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    setCouponError('');
    setCouponSuccess('');
    const code = couponInput.trim().toUpperCase();
    if (!code) return;

    setCouponLoading(true);

    setTimeout(() => {
      setCouponLoading(false);
      if (code === 'LUXORA10' || code === 'WELCOME10') {
        onApplyCoupon(code, 10);
        setCouponSuccess('Coupon applied: $10.00 OFF!');
      } else if (code === 'LUXORA20' || code === 'VIP20') {
        onApplyCoupon(code, 20);
        setCouponSuccess('Coupon applied: $20.00 OFF!');
      } else if (code === 'FREESHIP') {
        onApplyCoupon(code, 15);
        setCouponSuccess('Coupon applied: Free Shipping Credit ($15.00 OFF)!');
      } else {
        setCouponError('Invalid promo code. Try LUXORA10 or VIP20.');
      }
    }, 600);
  };

  return (
    <div className="space-y-8">
      {/* Coupon Application Box */}
      <div className="p-5 rounded-2xl bg-surface/60 border border-line/60 backdrop-blur-md shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-ink uppercase tracking-wider flex items-center gap-1.5">
            <FiTag className="text-primary" /> Promo / Gift Code
          </span>
          {appliedCoupon && (
            <span className="text-[10px] font-bold text-green-500 bg-green-500/10 px-2 py-0.5 rounded-full border border-green-500/20">
              Active: {appliedCoupon}
            </span>
          )}
        </div>

        <form onSubmit={handleApplyCoupon} className="flex gap-2">
          <input
            type="text"
            placeholder="Try LUXORA10 or VIP20"
            value={couponInput}
            onChange={(e) => setCouponInput(e.target.value)}
            className="flex-1 px-4 py-2.5 bg-surface border border-line rounded-xl text-sm focus:outline-none focus:border-primary uppercase tracking-wider font-mono shadow-sm"
          />
          <button
            type="submit"
            disabled={couponLoading}
            className="px-5 py-2.5 bg-primary text-white font-bold text-xs rounded-xl hover:bg-primary/90 transition-all shadow-md flex items-center gap-1.5"
          >
            {couponLoading ? (
              <FiLoader className="animate-spin" size={14} />
            ) : (
              'Apply Code'
            )}
          </button>
        </form>

        <AnimatePresence mode="wait">
          {couponSuccess && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-xs text-green-500 font-semibold mt-2.5 flex items-center gap-1"
            >
              <FiCheck /> {couponSuccess}
            </motion.p>
          )}
          {couponError && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-xs text-red-500 font-semibold mt-2.5"
            >
              {couponError}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Payment Selection Options */}
      <div>
        <h3 className="text-xl font-serif italic text-ink font-semibold mb-4 pb-2 border-b border-line/60 flex items-center justify-between">
          <span>Payment Method</span>
          <span className="text-xs font-sans not-italic text-ink/50 flex items-center gap-1">
            <FiLock size={12} className="text-emerald-500" /> 256-Bit Encrypted
          </span>
        </h3>

        <div className="space-y-3">
          {/* Credit / Debit Card Option */}
          <motion.div
            whileHover={{ scale: 1.005 }}
            onClick={() => onChange('credit_card')}
            className={`p-4 rounded-2xl border transition-all cursor-pointer ${
              method === 'credit_card'
                ? 'bg-primary/10 border-primary shadow-lg ring-2 ring-primary/60'
                : 'bg-surface/60 border-line/60 hover:border-primary/40'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={method === 'credit_card'}
                  onChange={() => onChange('credit_card')}
                  className="accent-primary h-4 w-4"
                />
                <span className="text-xs font-bold text-ink">Credit / Debit Card</span>
              </div>
              <div className="flex items-center gap-2">
                {cardBrand && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-primary text-white">
                    {cardBrand}
                  </span>
                )}
                <FiCreditCard className="text-ink/60" size={20} />
              </div>
            </div>

            {method === 'credit_card' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-4 pt-4 border-t border-line/40 space-y-3.5"
              >
                <div>
                  <label className="text-[11px] font-bold text-ink block mb-1">
                    Card Number
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="4000 1234 5678 9010"
                      value={cardNumber}
                      onChange={handleCardNumberChange}
                      className="w-full px-3.5 py-2.5 bg-surface border border-line rounded-xl text-sm focus:outline-none focus:border-primary tracking-wider font-mono shadow-sm"
                    />
                    <FiLock className="absolute right-3.5 top-3.5 text-ink/30" size={14} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-ink block mb-1">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      placeholder="MM / YY"
                      value={cardExpiry}
                      onChange={handleExpiryChange}
                      className="w-full px-3.5 py-2.5 bg-surface border border-line rounded-xl text-sm focus:outline-none focus:border-primary font-mono shadow-sm"
                    />
                  </div>

                  <div className="relative">
                    <label className="text-[11px] font-bold text-ink mb-1 flex items-center justify-between">
                      <span>CVC / CVV</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowCvvTooltip(!showCvvTooltip);
                        }}
                        className="text-primary hover:underline text-[10px] flex items-center gap-0.5"
                      >
                        <FiHelpCircle size={11} /> What is this?
                      </button>
                    </label>
                    <input
                      type="password"
                      placeholder="123"
                      maxLength={4}
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value.slice(0, 4))}
                      className="w-full px-3.5 py-2.5 bg-surface border border-line rounded-xl text-sm focus:outline-none focus:border-primary font-mono shadow-sm"
                    />

                    {showCvvTooltip && (
                      <div className="absolute bottom-full right-0 mb-2 w-48 p-2.5 rounded-xl bg-black text-white text-[10px] shadow-xl z-20">
                        The 3 or 4 digit security code located on the back of your card (or front for Amex).
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* PayPal Option */}
          <div
            onClick={() => onChange('paypal')}
            className={`p-4 rounded-2xl border transition-all cursor-pointer ${
              method === 'paypal'
                ? 'bg-primary/10 border-primary shadow-lg ring-2 ring-primary/60'
                : 'bg-surface/60 border-line/60 hover:border-primary/40'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={method === 'paypal'}
                  onChange={() => onChange('paypal')}
                  className="accent-primary h-4 w-4"
                />
                <span className="text-xs font-bold text-ink">PayPal Express</span>
              </div>
              <FaPaypal className="text-sky-500" size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Billing Address Option */}
      <div className="p-4 rounded-2xl bg-surface/50 border border-line/50 flex items-center gap-3">
        <input
          type="checkbox"
          id="sameAsShipping"
          checked={sameAsShipping}
          onChange={(e) => onSameAsShippingChange(e.target.checked)}
          className="accent-primary h-4 w-4 rounded cursor-pointer"
        />
        <label htmlFor="sameAsShipping" className="text-xs font-semibold text-ink cursor-pointer">
          Billing address is identical to shipping address
        </label>
      </div>
    </div>
  );
}