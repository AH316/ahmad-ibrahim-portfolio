'use client';

import { motion } from 'framer-motion';
import Quote from './lotr/Quote';
import { experiences, quotes } from '@/lib/content';

export default function Experience() {
  return (
    <section
      id="experience"
      className="py-20 md:py-32 bg-gondor-dark relative"
      data-testid="experience-section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-cinzel text-4xl md:text-5xl text-gondor-white mb-4">
            Experience
          </h2>
          <div className="w-24 h-px bg-gondor-gold mx-auto"></div>
        </motion.div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <Quote
            text={quotes.experience.text}
            author={quotes.experience.author}
          />
        </motion.div>

        {/* Experience Cards Grid */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gondor-stone border border-gondor-gold/30 p-6
                         hover:border-gondor-gold/60 transition-all duration-300 group
                         relative overflow-hidden flex flex-col h-full"
              data-testid={`experience-item-${index}`}
            >
              {/* Decorative corner accent */}
              <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-gondor-gold/50" aria-hidden="true"></div>

              {/* Decorative left border */}
              <div className="absolute left-0 top-0 w-1 h-full bg-gondor-gold/30
                              group-hover:bg-gondor-gold/60 transition-colors duration-300" />

              {/* Header */}
              <div className="mb-4 pl-4">
                <h3 className="font-cinzel text-xl md:text-2xl text-gondor-white mb-2 leading-tight">
                  {exp.title}
                </h3>
                <div className="text-gondor-gold text-base font-semibold mb-1">
                  {exp.company}
                </div>
                <div className="text-gondor-silver text-sm">
                  <div>{exp.location}</div>
                  <div className="font-cinzel mt-1">{exp.period}</div>
                </div>
              </div>

              {/* Responsibilities */}
              <ul className="space-y-3 pl-4 flex-1">
                {exp.responsibilities.map((resp, respIndex) => (
                  <li
                    key={respIndex}
                    className="text-gondor-silver text-sm leading-relaxed flex items-start gap-2"
                  >
                    <span className="text-gondor-gold mt-1 flex-shrink-0 text-xs">▸</span>
                    <span className="flex-1">{resp}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
