import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiTruck,
  FiZap,
  FiClock,
  FiGift,
  FiCheck,
  FiGlobe,
  FiUser,
  FiPhone,
  FiMapPin,
  FiCalendar,
  FiCheckCircle,
} from 'react-icons/fi';

const countries = [
  { code: 'US', name: 'United States 🇺🇸' },
  { code: 'CA', name: 'Canada 🇨🇦' },
  { code: 'GB', name: 'United Kingdom 🇬🇧' },
  { code: 'AU', name: 'Australia 🇦🇺' },
  { code: 'DE', name: 'Germany 🇩🇪' },
  { code: 'FR', name: 'France 🇫🇷' },
  { code: 'NG', name: 'Nigeria 🇳🇬' },
  { code: 'AE', name: 'United Arab Emirates 🇦🇪' },
];

const shippingOptions = [
  {
    id: 'standard',
    name: 'Standard Delivery',
    time: '3–5 Business Days',
    price: 15.0,
    icon: FiTruck,
    badge: 'Popular Choice',
  },
  {
    id: 'express',
    name: 'Express Priority',
    time: '1–2 Business Days',
    price: 25.0,
    icon: FiZap,
    badge: 'Fastest Transit',
  },
  {
    id: 'same_day',
    name: 'Same-Day Delivery',
    time: 'Delivered Today',
    price: 35.0,
    icon: FiClock,
    badge: 'Ultra Fast',
  },
  {
    id: 'gift',
    name: 'Gift Scheduled Delivery',
    time: 'Choose Custom Date',
    price: 20.0,
    icon: FiGift,
    badge: 'Gift Special',
  },
];

export default function ShippingForm({
  formData = {},
  onChange,
  selectedMethod = 'standard',
  onMethodChange,
  customDate = '',
  onDateChange,
}) {
  const [country, setCountry] = useState('US');

  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  const isFieldValid = (val) => val && String(val).trim().length > 1;

  return (
    <div className="space-y-8">
      {/* Customer Information Section */}
      <div>
        <h3 className="text-xl font-serif italic text-ink font-semibold mb-4 pb-2 border-b border-line/60 flex items-center justify-between">
          <span>Customer & Contact Details</span>
          <span className="text-xs font-sans not-italic text-ink/40 flex items-center gap-1">
            <FiUser size={12} /> Contact Information
          </span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Full Name */}
          <div className="relative group">
            <label className="text-xs font-bold text-ink mb-1.5 flex items-center justify-between">
              <span>Full Name <span className="text-primary">*</span></span>
              {isFieldValid(formData.fullName) && (
                <FiCheckCircle className="text-green-500" size={13} />
              )}
            </label>
            <div className="relative">
              <input
                type="text"
                name="fullName"
                autoComplete="name"
                placeholder="e.g. Emmanuel Vance"
                value={formData.fullName || ''}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-surface border border-line rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all text-sm shadow-sm"
                required
              />
              <FiUser className="absolute right-3.5 top-3.5 text-ink/30" size={14} />
            </div>
          </div>

          {/* Phone Number */}
          <div className="relative group">
            <label className="text-xs font-bold text-ink mb-1.5 flex items-center justify-between">
              <span>Phone Number <span className="text-primary">*</span></span>
              {isFieldValid(formData.phone) && (
                <FiCheckCircle className="text-green-500" size={13} />
              )}
            </label>
            <div className="relative">
              <input
                type="tel"
                name="phone"
                autoComplete="tel"
                placeholder="+1 (555) 000-0000"
                value={formData.phone || ''}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-surface border border-line rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all text-sm shadow-sm"
                required
              />
              <FiPhone className="absolute right-3.5 top-3.5 text-ink/30" size={14} />
            </div>
          </div>
        </div>
      </div>

      {/* Shipping Address Section */}
      <div>
        <h3 className="text-xl font-serif italic text-ink font-semibold mb-4 pb-2 border-b border-line/60 flex items-center justify-between">
          <span>Shipping Address</span>
          <span className="text-xs font-sans not-italic text-ink/40 flex items-center gap-1">
            <FiMapPin size={12} /> Delivery Destination
          </span>
        </h3>

        <div className="space-y-4">
          {/* Country Selector */}
          <div>
            <label className="text-xs font-bold text-ink block mb-1.5">Country / Region</label>
            <div className="relative">
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full px-4 py-3 bg-surface border border-line rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all text-sm shadow-sm appearance-none"
              >
                {countries.map((c) => (
                  <option key={c.code} value={c.code}>{c.name}</option>
                ))}
              </select>
              <FiGlobe className="absolute right-3.5 top-3.5 text-ink/40 pointer-events-none" size={16} />
            </div>
          </div>

          {/* Street Address & Apartment */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="text-xs font-bold text-ink mb-1.5 flex items-center justify-between">
                <span>Street Address <span className="text-primary">*</span></span>
                {isFieldValid(formData.street) && (
                  <FiCheckCircle className="text-green-500" size={13} />
                )}
              </label>
              <input
                type="text"
                name="street"
                autoComplete="street-address"
                placeholder="123 Luxury Way, Fifth Avenue"
                value={formData.street || ''}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-surface border border-line rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all text-sm shadow-sm"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold text-ink mb-1.5 block">Apt / Suite / Unit</label>
              <input
                type="text"
                name="apartment"
                placeholder="Suite 4B (Optional)"
                value={formData.apartment || ''}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-surface border border-line rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all text-sm shadow-sm"
              />
            </div>
          </div>

          {/* City, State, Zip */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-bold text-ink mb-1.5 flex items-center justify-between">
                <span>City <span className="text-primary">*</span></span>
                {isFieldValid(formData.city) && (
                  <FiCheckCircle className="text-green-500" size={13} />
                )}
              </label>
              <input
                type="text"
                name="city"
                autoComplete="address-level2"
                placeholder="New York"
                value={formData.city || ''}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-surface border border-line rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all text-sm shadow-sm"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold text-ink mb-1.5 flex items-center justify-between">
                <span>State / Region <span className="text-primary">*</span></span>
                {isFieldValid(formData.region) && (
                  <FiCheckCircle className="text-green-500" size={13} />
                )}
              </label>
              <input
                type="text"
                name="region"
                placeholder="NY"
                value={formData.region || ''}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-surface border border-line rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all text-sm shadow-sm"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold text-ink mb-1.5 flex items-center justify-between">
                <span>Postal Code <span className="text-primary">*</span></span>
                {isFieldValid(formData.postalCode) && (
                  <FiCheckCircle className="text-green-500" size={13} />
                )}
              </label>
              <input
                type="text"
                name="postalCode"
                autoComplete="postal-code"
                placeholder="10001"
                value={formData.postalCode || ''}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-surface border border-line rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all text-sm shadow-sm"
                required
              />
            </div>
          </div>
        </div>
      </div>

      {/* Delivery Options */}
      <div>
        <h3 className="text-xl font-serif italic text-ink font-semibold mb-4 pb-2 border-b border-line/60 flex items-center justify-between">
          <span>Select Shipping Option</span>
          <span className="text-xs font-sans not-italic text-primary font-bold">
            Insured Express Courier
          </span>
        </h3>

        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {shippingOptions.map((opt) => {
            const Icon = opt.icon;
            const isSelected = selectedMethod === opt.id;

            return (
              <motion.div
                key={opt.id}
                whileHover={{ y: -3, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onMethodChange(opt.id, opt.price)}
                className={`cursor-pointer p-3 sm:p-4 rounded-2xl border transition-all duration-300 relative flex flex-col justify-between ${
                  isSelected
                    ? 'bg-primary/10 border-primary shadow-[0_8px_25px_-5px_rgba(233,30,99,0.3)] ring-2 ring-primary/60'
                    : 'bg-surface/60 border-line/60 hover:border-primary/40'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div
                      className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                        isSelected ? 'bg-primary text-white shadow-md' : 'bg-secondary text-ink/70'
                      }`}
                    >
                      <Icon size={16} className="sm:text-xl" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-ink truncate leading-tight">{opt.name}</h4>
                      <p className="text-[10px] sm:text-[11px] text-ink/60 mt-0.5 truncate">{opt.time}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:flex-col sm:items-end">
                    <span className="text-xs sm:text-sm font-bold text-ink">
                      ${opt.price.toFixed(2)}
                    </span>
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-primary text-white flex items-center justify-center sm:mt-1"
                      >
                        <FiCheck size={10} />
                      </motion.div>
                    )}
                  </div>
                </div>

                {opt.badge && (
                  <span className="self-start text-[8px] sm:text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-secondary text-ink/70 border border-line/40 mt-1 truncate max-w-full">
                    {opt.badge}
                  </span>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Custom Gift Date Input */}
        {selectedMethod === 'gift' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-4 p-4 rounded-2xl bg-surface border border-primary/30 shadow-md flex flex-col sm:flex-row items-center gap-3"
          >
            <FiCalendar className="text-primary" size={20} />
            <div className="flex-1 w-full">
              <label className="text-xs font-bold text-ink block mb-1">
                Select Preferred Gift Delivery Date:
              </label>
              <input
                type="date"
                value={customDate}
                onChange={(e) => onDateChange(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-3 py-2 bg-surface border border-line rounded-lg text-sm text-ink focus:outline-none focus:border-primary"
              />
            </div>
          </motion.div>
        )}
      </div>

      {/* Special Gift Notes */}
      <div>
        <label className="text-xs font-semibold text-ink block mb-1">
          Special Delivery Instructions or Gift Note (Optional)
        </label>
        <textarea
          name="orderNotes"
          rows={2}
          placeholder="Include a gift message or special handling instructions..."
          value={formData.orderNotes || ''}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-surface border border-line rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all text-sm shadow-sm"
        />
      </div>
    </div>
  );
}