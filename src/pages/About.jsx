import React from "react";
import { motion } from "framer-motion";
import AboutHero from "../components/About/AboutHero";
import CompanyStory from "../components/About/CompanyStory";
import CoreValues from "../components/About/CoreValues";
import Statistics from "../components/About/Statistics";
import Team from "../components/About/Team";
import Timeline from "../components/About/Timeline";
import Testimonials from "../components/About/Testimonials";

export default function About() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen"
    >
      <AboutHero />
      <CompanyStory />
      <Statistics />
      <CoreValues />
      <Timeline />
      <Team />
      <Testimonials />
    </motion.div>
  );
}
