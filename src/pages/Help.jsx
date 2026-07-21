import React from "react";
import { motion } from "framer-motion";
import HelpHero from "../components/Help/HelpHero";
import HelpCategories from "../components/Help/HelpCategories";
import FAQ from "../components/Help/FAQ";
import ReturnsProcess from "../components/Help/ReturnsProcess";
import ShippingInfo from "../components/Help/ShippingInfo";
import PaymentMethods from "../components/Help/PaymentMethods";

export default function Help() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen"
    >
      <HelpHero />
      <HelpCategories />
      <FAQ />
      <ShippingInfo />
      <ReturnsProcess />
      <PaymentMethods />
    </motion.div>
  );
}
