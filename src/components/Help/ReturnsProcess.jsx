import React from 'react';
import { motion } from 'framer-motion';
import Container from '../ui/Container';
const steps = [{
  step: "01",
  title: "Initiate Return",
  desc: "Log in to your account and select the order to start the return process."
}, {
  step: "02",
  title: "Print Label",
  desc: "Download and print your pre-paid luxury return shipping label."
}, {
  step: "03",
  title: "Package",
  desc: "Carefully repack the item in its original pristine packaging."
}, {
  step: "04",
  title: "Ship",
  desc: "Drop off at any authorized carrier location or schedule a pickup."
}];
export default function ReturnsProcess() {
  
return <section className="py-24 bg-surface">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl font-serif italic text-ink mb-4">Returns Made Si</h2>
          <p className="text-subtle max-w-2xl mx-auto">Our Hasslefree</p>
        </div>
        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((s, idx) => <motion.div key={s.step} initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          delay: idx * 0.1,
          duration: 0.5
        }} className="relative text-center group">
              <div className="w-16 h-16 mx-auto rounded-full bg-section border border-line flex items-center justify-center mb-6 relative z-10 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                <span className="font-serif text-xl font-bold">{s.step}</span>
              </div>
              <h3 className="text-lg font-semibold text-ink mb-3">{s.title}</h3>
              <p className="text-sm text-subtle">{s.desc}</p>
              
              {/* Connecting line */}
              {idx < steps.length - 1 && <div className="hidden md:block absolute top-8 left-1/2 w-full h-px bg-line -z-10"></div>}
            </motion.div>)}
        </div>
      </Container>
    </section>;
}