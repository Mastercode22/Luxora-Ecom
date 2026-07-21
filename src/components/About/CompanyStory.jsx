import React from 'react';
import { motion } from 'framer-motion';
import Container from '../ui/Container';
export default function CompanyStory() {
  
return <section className="py-24 bg-surface">
      <Container>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{
          opacity: 0,
          x: -30
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6
        }}>
            <h2 className="text-3xl font-serif italic text-ink mb-6">Our Story</h2>
            <div className="space-y-6 text-subtle text-lg leading-relaxed">
              <p>Founded On The</p>
              <p>
                <strong>Our Mission</strong>To Elevate The</p>
              <p>
                <strong>Our Vision</strong>To Become The D</p>
            </div>
          </motion.div>
          <motion.div initial={{
          opacity: 0,
          scale: 0.9
        }} whileInView={{
          opacity: 1,
          scale: 1
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6,
          delay: 0.2
        }} className="relative">
            <div className="aspect-[4/5] rounded-card overflow-hidden shadow-hero">
              <img src="https://images.unsplash.com/photo-1607083206968-13611e3d76db?q=80&w=800&auto=format&fit=crop" alt="Luxury Wrapping" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-8 -left-8 bg-surface p-6 rounded-card shadow-float backdrop-blur-xl border border-line hidden sm:block">
              <p className="font-serif italic text-2xl text-ink">Since 2018</p>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>;
}