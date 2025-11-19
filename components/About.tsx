'use client';

import { motion } from 'framer-motion';
import Icon from './lotr/Icon';
import { personalInfo, aboutSkills, aboutStats, funFact } from '@/lib/content';

export default function About() {
  return (
    <section
      id="about"
      className="py-20 md:py-32 bg-gondor-dark relative"
      data-testid="about-section"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-cinzel text-4xl md:text-5xl text-gondor-white mb-4">
            About Me
          </h2>
          <div className="w-24 h-px bg-gondor-gold mx-auto"></div>
        </motion.div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {personalInfo.bio.journey.map((paragraph, index) => (
              <p key={index} className="text-gondor-silver text-lg leading-relaxed">
                {paragraph}
              </p>
            ))}

            {/* Professional Summary Section */}
            {/* <div className="mt-8 pt-8 border-t border-gondor-gold/20">
              <h3 className="text-xl font-cinzel text-gondor-gold mb-4">Professional Summary</h3>
              <p className="text-gondor-silver/90 leading-relaxed">
                {personalInfo.professionalSummary}
              </p>
            </div> */}

            <div className="pt-6 border-t border-gondor-gold/20">
              <p className="text-gondor-silver text-base italic">
                <span className="text-gondor-gold font-cinzel">Fun Fact:</span> {funFact}
              </p>
            </div>
          </motion.div>

          {/* Skills Overview */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            <div>
              <h3 className="font-cinzel text-2xl text-gondor-white mb-6">Core Strengths</h3>
              <div className="grid grid-cols-1 gap-6">
                {aboutSkills.map((skill, index) => (
                  <motion.div
                    key={skill.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    className="flex items-center gap-4 p-4 bg-gondor-stone/50 border border-gondor-gold/20
                               hover:border-gondor-gold/50 transition-all duration-300 group"
                    data-testid={`skill-card-${index}`}
                  >
                    <div className="flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <Icon type={skill.icon} size={32} />
                    </div>
                    <span className="text-gondor-silver text-lg font-inter group-hover:text-gondor-white transition-colors">
                      {skill.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-gondor-gold/20">
              <div className="text-center">
                <div className="font-cinzel text-3xl text-gondor-gold mb-2">{aboutStats.years}</div>
                <div className="text-gondor-silver text-sm uppercase tracking-wide">Years</div>
              </div>
              <div className="text-center border-x border-gondor-gold/20">
                <div className="font-cinzel text-3xl text-gondor-gold mb-2">{aboutStats.projects}</div>
                <div className="text-gondor-silver text-sm uppercase tracking-wide">Projects</div>
              </div>
              <div className="text-center">
                <div className="font-cinzel text-3xl text-gondor-gold mb-2">{aboutStats.techStacks}</div>
                <div className="text-gondor-silver text-sm uppercase tracking-wide">Tech Stacks</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
