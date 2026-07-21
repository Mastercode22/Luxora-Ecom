import React from 'react';
import { motion } from 'framer-motion';
import Container from '../ui/Container';
import { FiStar } from 'react-icons/fi';
const reviews = [{
  name: "Victoria H.",
  text: "The presentation and quality of the gifts are unparalleled. Luxora is my go-to for corporate gifting."
}, {
  name: "James L.",
  text: "Exceptional service from start to finish. The recipient was completely blown away by the unboxing experience."
}, {
  name: "Elena R.",
  text: "A truly curated selection. It's rare to find such exquisite items all in one place."
}];
export default function Testimonials() {
  
return <section className="py-24 bg-deals-banner text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-black/40"></div>
      <Container className="relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif italic mb-4">Client Expressi</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => <motion.div key={rev.name} initial={{
          opacity: 0,
          scale: 0.95
        }} whileInView={{
          opacity: 1,
          scale: 1
        }} viewport={{
          once: true
        }} transition={{
          delay: idx * 0.2,
          duration: 0.6
        }} className="bg-white/10 backdrop-blur-md p-8 rounded-card border border-white/20">
              <div className="flex gap-1 text-accent mb-4">
                {[...Array(5)].map((_, i) => <FiStar key={i} fill="currentColor" />)}
              </div>
              <p className="text-white/90 italic font-serif text-lg leading-relaxed mb-6">"{rev.text}"</p>
              <p className="font-semibold tracking-wide text-sm uppercase">— {rev.name}</p>
            </motion.div>)}
        </div>
      </Container>
    </section>;
}