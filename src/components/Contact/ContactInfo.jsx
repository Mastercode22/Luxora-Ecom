import React from 'react';
import { motion } from 'framer-motion';
import Container from '../ui/Container';
import { FiMapPin, FiPhoneCall, FiMail } from 'react-icons/fi';

const contactDetails = [
  { icon: FiMapPin, title: "Global Headquarters", detail: "450 Luxury Ave, Suite 100\nNew York, NY 10001", action: "Get Directions" },
  { icon: FiPhoneCall, title: "Telephone", detail: "+1 (800) 555-0199\n+1 (212) 555-0198", action: "Call Us" },
  { icon: FiMail, title: "Email Address", detail: "concierge@luxoragift.com\npress@luxoragift.com", action: "Send Email" }
];

export default function ContactInfo() {
  return (
    <section className="py-24 bg-surface">
      <Container>
        <div className="grid md:grid-cols-3 gap-8">
          {contactDetails.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="bg-section p-8 rounded-card border border-line flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
                <item.icon size={24} />
              </div>
              <h3 className="text-xl font-semibold text-ink mb-4">{item.title}</h3>
              <p className="text-subtle whitespace-pre-line mb-8 flex-1">{item.detail}</p>
              <button className="text-primary font-medium tracking-wide uppercase text-sm hover:underline underline-offset-4 transition-all">
                {item.action}
              </button>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
