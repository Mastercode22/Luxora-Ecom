import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiLoader, FiShield, FiCheckCircle, FiLock, FiInfo } from 'react-icons/fi';
import CheckoutHeader from '../components/Checkout/CheckoutHeader';
import ExpressCheckout from '../components/Checkout/ExpressCheckout';
import ShippingForm from '../components/Checkout/ShippingForm';
import DeliveryTimeline, { calculateDeliveryDate } from '../components/Checkout/DeliveryTimeline';
import PaymentSection from '../components/Checkout/PaymentSection';
import OrderSummary from '../components/Checkout/OrderSummary';
import RecommendedAddons from '../components/Checkout/RecommendedAddons';
import TrustIndicators from '../components/Checkout/TrustIndicators';
import MobileCheckoutBar from '../components/Checkout/MobileCheckoutBar';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { orderService } from '../services/orderService';
import { products } from '../data/products';
import Container from '../components/ui/Container';

const CHECKOUT_DRAFT_KEY = 'luxora_checkout_draft';

const processingSteps = [
  'Validating Order & Customer Details...',
  'Verifying Bank & Payment Encryption...',
  'Reserving Luxury Inventory Items...',
  'Generating Official Order Receipt...',
];

export default function Checkout() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const { items, subtotal, addItem, clearCart } = useCart();
  const navigate = useNavigate();

  const initialized = useRef(false);
  useEffect(() => {
    if (!authLoading && !initialized.current && items.length === 0 && products.length >= 2) {
      initialized.current = true;
      addItem({ ...products[0], qty: 1 });
      addItem({ ...products[1], qty: 1 });
    }
  }, [authLoading, items.length, addItem]);

  // Disable two-finger touch gestures & pinch-zoom on Checkout page
  useEffect(() => {
    const handleTouchStart = (e) => {
      if (e.touches && e.touches.length > 1) {
        e.preventDefault();
      }
    };
    const handleTouchMove = (e) => {
      if (e.touches && e.touches.length > 1) {
        e.preventDefault();
      }
    };
    const handleGesture = (e) => {
      e.preventDefault();
    };

    document.addEventListener('touchstart', handleTouchStart, { passive: false });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('gesturestart', handleGesture, { passive: false });
    document.addEventListener('gesturechange', handleGesture, { passive: false });
    document.addEventListener('gestureend', handleGesture, { passive: false });

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('gesturestart', handleGesture);
      document.removeEventListener('gesturechange', handleGesture);
      document.removeEventListener('gestureend', handleGesture);
    };
  }, []);

  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  const [restoredToast, setRestoredToast] = useState(false);
  const [error, setError] = useState('');

  // Checkout State
  const [shippingData, setShippingData] = useState({
    fullName: user?.profile?.fullName || '',
    phone: user?.profile?.phone || '',
    street: '',
    apartment: '',
    city: '',
    region: '',
    postalCode: '',
    orderNotes: '',
  });

  const [shippingMethod, setShippingMethod] = useState('standard');
  const [shippingCost, setShippingCost] = useState(15.0);
  const [customGiftDate, setCustomGiftDate] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [appliedCoupon, setAppliedCoupon] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [sameAsShipping, setSameAsShipping] = useState(true);

  // Auto-Restore Draft on Mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(CHECKOUT_DRAFT_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.shippingData) setShippingData((prev) => ({ ...prev, ...parsed.shippingData }));
        if (parsed.shippingMethod) setShippingMethod(parsed.shippingMethod);
        if (parsed.shippingCost !== undefined) setShippingCost(parsed.shippingCost);
        if (parsed.paymentMethod) setPaymentMethod(parsed.paymentMethod);
        if (parsed.appliedCoupon) setAppliedCoupon(parsed.appliedCoupon);
        if (parsed.discountAmount) setDiscountAmount(parsed.discountAmount);
        if (parsed.customGiftDate) setCustomGiftDate(parsed.customGiftDate);

        setRestoredToast(true);
        const timer = setTimeout(() => setRestoredToast(false), 4000);
        return () => clearTimeout(timer);
      }
    } catch (e) {
      console.error('Failed to load checkout draft', e);
    }
  }, []);

  // Auto-Save Draft to Local Storage
  useEffect(() => {
    const draft = {
      shippingData,
      shippingMethod,
      shippingCost,
      paymentMethod,
      appliedCoupon,
      discountAmount,
      customGiftDate,
    };
    localStorage.setItem(CHECKOUT_DRAFT_KEY, JSON.stringify(draft));
  }, [
    shippingData,
    shippingMethod,
    shippingCost,
    paymentMethod,
    appliedCoupon,
    discountAmount,
    customGiftDate,
  ]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface pt-[80px]">
        <FiLoader className="animate-spin text-4xl text-primary" />
      </div>
    );
  }

  const handleShippingChange = (name, value) => {
    setShippingData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMethodChange = (methodId, price) => {
    setShippingMethod(methodId);
    setShippingCost(price);
  };

  const handleApplyCoupon = (code, amount) => {
    setAppliedCoupon(code);
    setDiscountAmount(amount);
  };

  const currentEstArrival = calculateDeliveryDate(shippingMethod, customGiftDate);

  const displayItems =
    items && items.length > 0
      ? items
      : [
          { ...products[0], qty: 1 },
          { ...products[1], qty: 1 },
        ];

  const currentSubtotal =
    subtotal > 0
      ? subtotal
      : displayItems.reduce((acc, i) => acc + i.price * (i.qty || 1), 0);

  const tax = currentSubtotal * 0.08;
  const grandTotal = Math.max(0, currentSubtotal + shippingCost + tax - discountAmount);

  const handlePlaceOrder = async () => {
    setError('');

    // Validation
    const requiredFields = ['fullName', 'phone', 'street', 'city', 'region', 'postalCode'];
    for (const field of requiredFields) {
      if (!shippingData[field]) {
        setError('Please fill in all required shipping fields before completing your order.');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
    }

    setIsProcessing(true);
    setProcessingStep(0);

    // Multi-stage animation steps
    const stepInterval = setInterval(() => {
      setProcessingStep((prev) => {
        if (prev < processingSteps.length - 1) return prev + 1;
        clearInterval(stepInterval);
        return prev;
      });
    }, 900);

    try {
      const orderData = {
        items: displayItems,
        subtotal: currentSubtotal,
        shipping: shippingCost,
        tax,
        discount: discountAmount,
        couponCode: appliedCoupon,
        total: grandTotal,
        shippingAddress: shippingData,
        shippingMethod,
        estimatedDelivery: currentEstArrival,
        paymentMethod,
        pointsEarned: Math.floor(grandTotal * 10),
      };

      setTimeout(async () => {
        try {
          const order = await orderService.createOrder(orderData);
          localStorage.removeItem(CHECKOUT_DRAFT_KEY);
          clearCart();
          navigate(`/success?orderId=${order.id}`);
        } catch (err) {
          setError(err.message || 'Failed to place order.');
          setIsProcessing(false);
        }
      }, 3800);
    } catch (err) {
      setError(err.message || 'Failed to place order.');
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface pt-[100px] pb-12 sm:pb-16 relative">
      {/* Restoration Toast Notification */}
      <AnimatePresence>
        {restoredToast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-24 right-6 z-50 p-4 rounded-2xl bg-black/90 text-white border border-primary/40 shadow-2xl flex items-center gap-3"
          >
            <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center">
              <FiInfo size={16} />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Checkout Restored</p>
              <p className="text-[11px] text-white/70">
                Your saved information has been automatically restored.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Container>
        {/* Animated Page Header */}
        <CheckoutHeader />

        {/* Express Checkout Section */}
        <ExpressCheckout />

        {/* Validation Error Alert */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-500 text-sm font-medium flex items-center gap-3 shadow-md"
          >
            <FiInfo size={18} />
            <span>{error}</span>
          </motion.div>
        )}

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Form Column */}
          <div className="lg:col-span-7 space-y-10">
            {/* Customer & Shipping Details Form */}
            <div className="p-6 sm:p-8 rounded-3xl bg-surface/60 backdrop-blur-xl border border-line/70 shadow-2xl">
              <ShippingForm
                formData={shippingData}
                onChange={handleShippingChange}
                selectedMethod={shippingMethod}
                onMethodChange={handleMethodChange}
                customDate={customGiftDate}
                onDateChange={setCustomGiftDate}
              />

              {/* Delivery Timeline */}
              <DeliveryTimeline
                method={shippingMethod}
                customDate={customGiftDate}
              />
            </div>

            {/* Payment Section */}
            <div className="p-6 sm:p-8 rounded-3xl bg-surface/60 backdrop-blur-xl border border-line/70 shadow-2xl">
              <PaymentSection
                method={paymentMethod}
                onChange={setPaymentMethod}
                onApplyCoupon={handleApplyCoupon}
                appliedCoupon={appliedCoupon}
                discountAmount={discountAmount}
                sameAsShipping={sameAsShipping}
                onSameAsShippingChange={setSameAsShipping}
              />
            </div>

            {/* Place Order CTA Button */}
            <div className="space-y-4">
              <button
                onClick={handlePlaceOrder}
                disabled={isProcessing}
                className="w-full py-4 px-8 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold text-base shadow-[0_10px_30px_-5px_rgba(233,30,99,0.4)] transition-all duration-300 flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <>
                    <FiLoader className="animate-spin text-xl" />
                    <span>Processing Order...</span>
                  </>
                ) : (
                  <>
                    <span>Place Secure Order</span>
                    <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              {/* Trust Badges Section */}
              <TrustIndicators />
            </div>
          </div>

          {/* Right Sticky Order Summary Column */}
          <div className="lg:col-span-5 space-y-2">
            <OrderSummary
              shippingCost={shippingCost}
              discountAmount={discountAmount}
              couponCode={appliedCoupon}
              estimatedArrival={currentEstArrival}
            />

            {/* Recommended Add-ons */}
            <RecommendedAddons />
          </div>
        </div>
      </Container>

      {/* Sticky Mobile Floating Checkout Bar */}
      <MobileCheckoutBar
        totalAmount={grandTotal}
        onPlaceOrder={handlePlaceOrder}
        isProcessing={isProcessing}
      />

      {/* Multi-step Morphing Processing Overlay */}
      <AnimatePresence>
        {isProcessing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-2xl flex items-center justify-center p-4 text-center"
          >
            <div className="max-w-md w-full p-8 rounded-3xl bg-surface border border-line/60 shadow-2xl space-y-6">
              <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center shadow-[0_0_40px_rgba(233,30,99,0.3)]">
                <FiLoader className="animate-spin text-4xl text-primary" />
              </div>

              <div>
                <h3 className="text-2xl font-serif italic text-ink font-bold">
                  Securing Your Purchase
                </h3>
                <p className="text-ink/60 text-xs mt-1 font-medium">
                  Please do not refresh or close your browser window...
                </p>
              </div>

              {/* Animated Progress Bar */}
              <div className="w-full bg-secondary rounded-full h-2.5 overflow-hidden border border-line/40">
                <motion.div
                  initial={{ width: '0%' }}
                  animate={{
                    width: `${((processingStep + 1) / processingSteps.length) * 100}%`,
                  }}
                  transition={{ duration: 0.6 }}
                  className="h-full bg-primary shadow-md"
                />
              </div>

              {/* Current Step Description */}
              <p className="text-sm font-bold text-primary animate-pulse">
                {processingSteps[processingStep]}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}