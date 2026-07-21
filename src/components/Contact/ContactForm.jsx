import React from 'react';
import { motion } from 'framer-motion';
import Container from '../ui/Container';
export default function ContactForm() {
  
return <section className="py-24 bg-section border-y border-line relative overflow-hidden">
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-accent/10 blur-[150px] rounded-full pointer-events-none"></div>
      <Container>
        <div className="max-w-4xl mx-auto flex flex-col lg:flex-row gap-16 relative z-10">
          <motion.div initial={{
          opacity: 0,
          x: -30
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true
        }} className="flex-1">
            <h2 className="text-3xl font-serif italic text-ink mb-6">Send Us A Messa</h2>
            <p className="text-subtle mb-8 leading-relaxed">Whether You Hav</p>
            
            <form className="space-y-6" onSubmit={e => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-ink uppercase tracking-wide">First Name</label>
                  <input type="text" className="w-full bg-surface border border-line rounded-input p-4 text-ink focus:outline-none focus:border-primary transition-colors" placeholder="Jane" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-ink uppercase tracking-wide">Last Name</label>
                  <input type="text" className="w-full bg-surface border border-line rounded-input p-4 text-ink focus:outline-none focus:border-primary transition-colors" placeholder="Doe" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-ink uppercase tracking-wide">Email Address</label>
                <input type="email" className="w-full bg-surface border border-line rounded-input p-4 text-ink focus:outline-none focus:border-primary transition-colors" placeholder="Janedoeexampl" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-ink uppercase tracking-wide">Subject</label>
                <select className="w-full bg-surface border border-line rounded-input p-4 text-ink focus:outline-none focus:border-primary transition-colors appearance-none">
                  <option>Order Inquiry</option>
                  <option>Product Informa</option>
                  <option>Bespoke Service</option>
                  <option>Press Partner</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-ink uppercase tracking-wide">Message</label>
                <textarea rows="5" className="w-full bg-surface border border-line rounded-input p-4 text-ink focus:outline-none focus:border-primary transition-colors resize-none" placeholder="How Can We Assi"></textarea>
              </div>
              <button type="submit" className="btn-primary w-full md:w-auto">Send Message</button>
            </form>
          </motion.div>
          
          <motion.div initial={{
          opacity: 0,
          x: 30
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true
        }} className="w-full lg:w-1/3 flex flex-col gap-8">
             <div className="bg-surface p-8 rounded-card border border-line h-full flex flex-col justify-center">
                <h3 className="text-2xl font-serif italic text-ink mb-6">Business Hours</h3>
                <ul className="space-y-4 text-subtle">
                  <li className="flex justify-between border-b border-line pb-4">
                    <span>Mon Fri</span>
                    <span className="font-medium text-ink">900 Am 800</span>
                  </li>
                  <li className="flex justify-between border-b border-line pb-4">
                    <span>Saturday</span>
                    <span className="font-medium text-ink">1000 Am 500</span>
                  </li>
                  <li className="flex justify-between pt-2">
                    <span>Sunday</span>
                    <span className="font-medium text-primary">Closed</span>
                  </li>
                </ul>
             </div>
          </motion.div>
        </div>
      </Container>
    </section>;
}