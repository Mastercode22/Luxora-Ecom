import React from "react";
import { motion } from "framer-motion";
import ContactHero from "../components/Contact/ContactHero";
import ContactInfo from "../components/Contact/ContactInfo";
import ContactForm from "../components/Contact/ContactForm";
import SupportCards from "../components/Contact/SupportCards";
import SocialLinks from "../components/Contact/SocialLinks";

export default function Contact() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen"
    >
      <ContactHero />
      <SupportCards />
      <ContactInfo />
      <ContactForm />
      <SocialLinks />
    </motion.div>
  );
}
