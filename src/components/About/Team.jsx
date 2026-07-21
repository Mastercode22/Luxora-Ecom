import React from 'react';
import { motion } from 'framer-motion';
import Container from '../ui/Container';
const team = [{
  name: "Eleanor Wright",
  role: "Founder & CEO",
  image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop"
}, {
  name: "Marcus Chen",
  role: "Head of Curation",
  image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop"
}, {
  name: "Sophia Martinez",
  role: "Design Director",
  image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=600&auto=format&fit=crop"
}];
export default function Team() {
  
return <section className="py-24 bg-section">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif italic text-ink mb-4">Meet Our Team</h2>
          <p className="text-subtle max-w-2xl mx-auto">The Visionaries</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {team.map((member, idx) => <motion.div key={member.name} initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          delay: idx * 0.15,
          duration: 0.6
        }} className="group cursor-pointer">
              <div className="relative aspect-[3/4] overflow-hidden rounded-image mb-6 shadow-float">
                <img src={member.image} alt={member.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <h3 className="text-2xl font-serif italic text-ink">{member.name}</h3>
              <p className="text-primary text-sm font-medium tracking-wide uppercase mt-1">{member.role}</p>
            </motion.div>)}
        </div>
      </Container>
    </section>;
}