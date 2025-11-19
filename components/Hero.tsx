'use client';

import { motion } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';
import Quote from './lotr/Quote';
import ParticleBackground from './lotr/ParticleBackground';
import { personalInfo, quotes } from '@/lib/content';

export default function Hero() {
  const scrollToAbout = () => {
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      data-testid="hero-section"
    >
      {/* Particle Background */}
      <ParticleBackground />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-cinzel text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-gondor-white mb-6"
          data-testid="hero-name"
        >
          {personalInfo.name}
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-gondor-silver text-xl sm:text-2xl md:text-3xl mb-8 font-light"
          data-testid="hero-tagline"
        >
          {personalInfo.tagline}
        </motion.p>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="w-32 h-px bg-gradient-to-r from-transparent via-gondor-gold to-transparent mx-auto mb-12"
        />

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="max-w-3xl mx-auto mb-16"
        >
          <Quote
            text={quotes.hero.text}
            author={quotes.hero.author}
          />
        </motion.div>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          onClick={scrollToAbout}
          className="group relative inline-flex items-center gap-3 px-8 py-4
                     bg-transparent border-2 border-gondor-gold text-gondor-gold
                     hover:bg-gondor-gold hover:text-gondor-dark
                     transition-all duration-300 font-cinzel text-lg
                     overflow-hidden"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          data-testid="hero-cta"
        >
          <span className="relative z-10">Scroll Down</span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="relative z-10"
          >
            <FaChevronDown size={20} />
          </motion.div>

          {/* Hover effect background */}
          <span className="absolute inset-0 bg-gondor-gold transform scale-x-0
                           group-hover:scale-x-100 transition-transform duration-300
                           origin-left -z-0"></span>
        </motion.button>
      </div>

      {/* Parallax gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gondor-dark to-transparent"></div>
    </section>
  );
}
