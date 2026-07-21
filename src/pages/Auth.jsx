import React from 'react';
import { motion } from 'framer-motion';
import AuthCard from '../components/Auth/AuthCard';
import { FiShield, FiHeart, FiPackage, FiZap, FiStar } from 'react-icons/fi';
import { Link } from 'react-router-dom';
const benefits = [{
  icon: FiShield,
  title: "Secure Shopping",
  desc: "Enterprise-grade encryption for all transactions."
}, {
  icon: FiHeart,
  title: "Wishlist Sync",
  desc: "Access your saved items across all your devices."
}, {
  icon: FiPackage,
  title: "Order Tracking",
  desc: "Real-time updates on your luxury deliveries."
}, {
  icon: FiZap,
  title: "Fast Checkout",
  desc: "Save your details for one-click purchases."
}];
export default function Auth() {
  
return <div className="min-h-screen bg-surface flex items-center justify-center relative overflow-hidden pt-[100px] pb-12">
      
      {/* Animated Background Elements - Theme Aware */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-surface to-surface"></div>
        <motion.div animate={{
        scale: [1, 1.2, 1],
        opacity: [0.1, 0.2, 0.1]
      }} transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }} className="absolute top-1/4 -right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <motion.div animate={{
        scale: [1, 1.5, 1],
        opacity: [0.1, 0.3, 0.1]
      }} transition={{
        duration: 10,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 1
      }} className="absolute bottom-0 left-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-6xl px-4 md:px-8 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-24">
        
        {/* Left Side - Visual & Branding */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center text-center lg:items-start lg:text-left">
          <Link to="/" className="inline-block mb-8 lg:mb-12 group">
            <span className="text-3xl font-serif tracking-wider text-ink group-hover:text-primary transition-colors">Luxora</span>
          </Link>
          
          <motion.h1 initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.2
        }} className="text-4xl lg:text-5xl xl:text-6xl font-serif italic mb-2 leading-tight text-ink">Elevate Your<br />Shopping Experi</motion.h1>
          
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.3
        }} className="bg-section/80 backdrop-blur-md border border-line/50 rounded-xl p-3 mb-2 lg:mb-0 w-full max-w-xs shadow-sm">
            <div className="grid grid-cols-2 gap-3">
              {benefits.map((benefit, idx) => <div key={idx} className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-surface flex items-center justify-center shrink-0 text-primary border border-line/50 shadow-sm">
                    <benefit.icon size={12} />
                  </div>
                  <h3 className="font-medium text-ink text-[11px] leading-tight">{benefit.title}</h3>
                </div>)}
            </div>
          </motion.div>
        </div>

        {/* Right Side - Auth Forms */}
        <div className="w-full lg:w-1/2 flex items-center justify-center lg:justify-end">
          <AuthCard />
        </div>

      </div>
    </div>;
}