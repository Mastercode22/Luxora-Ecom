import React from 'react';
import { motion } from 'framer-motion';
import Container from '../ui/Container';
import { FiInstagram, FiTwitter, FiFacebook, FiYoutube, FiLinkedin } from 'react-icons/fi';
const socials = [{
  icon: FiInstagram,
  name: "Instagram"
}, {
  icon: FiTwitter,
  name: "Twitter"
}, {
  icon: FiFacebook,
  name: "Facebook"
}, {
  icon: FiYoutube,
  name: "YouTube"
}, {
  icon: FiLinkedin,
  name: "LinkedIn"
}];
export default function SocialLinks() {
  
return <section className="py-24 bg-deals-banner text-white relative overflow-hidden text-center">
      <div className="absolute inset-0 bg-black/40"></div>
      <Container className="relative z-10">
        <h2 className="text-3xl font-serif italic mb-12">Connect With Us</h2>
        <div className="flex flex-wrap items-center justify-center gap-6">
          {socials.map((social, idx) => <motion.a href="#" key={social.name} initial={{
          opacity: 0,
          scale: 0.8
        }} whileInView={{
          opacity: 1,
          scale: 1
        }} viewport={{
          once: true
        }} transition={{
          delay: idx * 0.1,
          type: 'spring'
        }} className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-primary hover:border-primary hover:-translate-y-2 transition-all duration-300" aria-label={social.name}>
              <social.icon size={24} />
            </motion.a>)}
        </div>
      </Container>
    </section>;
}