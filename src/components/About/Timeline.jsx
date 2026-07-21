import React from 'react';
import { motion } from 'framer-motion';
import Container from '../ui/Container';
const milestones = [{
  year: "2018",
  title: "The Founding",
  desc: "LuxoraGift was born from a desire to redefine luxury gifting."
}, {
  year: "2020",
  title: "Global Expansion",
  desc: "Opened our first international fulfillment centers to serve clients worldwide."
}, {
  year: "2023",
  title: "New Collections",
  desc: "Launched exclusive artisan partnerships and limited-edition curations."
}, {
  year: "2026",
  title: "Future Vision",
  desc: "Continuing to innovate with sustainable luxury packaging and personalized experiences."
}];
export default function Timeline() {
  
return <section className="py-24 bg-surface">
      <Container>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif italic text-ink mb-4">Our Journey</h2>
          </div>
          <div className="relative border-l border-primary/30 pl-8 ml-4 md:ml-0 md:pl-0 md:border-none space-y-12">
            {/* Desktop center line */}
            <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-px bg-primary/30 -translate-x-1/2"></div>
            
            {milestones.map((m, idx) => <motion.div key={m.year} initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.6
          }} className={`relative flex flex-col md:flex-row items-center justify-between ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                {/* Dot */}
                <div className="absolute left-[-37px] md:left-1/2 w-4 h-4 rounded-full bg-primary md:-translate-x-1/2 shadow-[0_0_0_4px_var(--color-surface),0_0_0_6px_var(--color-primary-light)] z-10"></div>
                
                <div className="w-full md:w-[45%] text-left">
                  <div className={`bg-section p-6 rounded-card border border-line ${idx % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <span className="text-primary font-bold tracking-widest">{m.year}</span>
                    <h3 className="text-xl font-serif italic text-ink mt-2 mb-3">{m.title}</h3>
                    <p className="text-subtle text-sm leading-relaxed">{m.desc}</p>
                  </div>
                </div>
              </motion.div>)}
          </div>
        </div>
      </Container>
    </section>;
}