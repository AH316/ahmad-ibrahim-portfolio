'use client';

import { motion } from 'framer-motion';
import { FaGraduationCap, FaCertificate, FaExternalLinkAlt } from 'react-icons/fa';
import { education } from '@/lib/content';

export default function Education() {
  return (
    <section
      id="education"
      className="py-20 md:py-32 bg-gondor-stone relative"
      data-testid="education-section"
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
            Education
          </h2>
          <div className="w-24 h-px bg-gondor-gold mx-auto" aria-hidden="true"></div>
        </motion.div>

        {/* Degrees Grid (Horizontal on desktop, stack on mobile) */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6 mb-12">
          {education.degrees.map((degree, degreeIndex) => (
            <motion.div
              key={degreeIndex}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 + degreeIndex * 0.1 }}
              data-testid={`degree-card-${degreeIndex}`}
            >
              <div className="bg-gondor-dark border border-gondor-gold/30 p-6 md:p-8 relative overflow-hidden group
                              hover:border-gondor-gold/60 transition-all duration-300 h-full flex flex-col">
                {/* Decorative corner elements */}
                <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-gondor-gold/50" aria-hidden="true"></div>
                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-gondor-gold/50" aria-hidden="true"></div>

                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 text-gondor-gold group-hover:scale-110 transition-transform duration-300" aria-hidden="true">
                    <FaGraduationCap size={40} />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-cinzel text-xl md:text-2xl text-gondor-white mb-2 leading-tight">
                      {degree.title}
                    </h3>
                    <span className="text-gondor-gold text-base font-cinzel">
                      {degree.honor}
                    </span>
                  </div>
                </div>

                <div className="text-gondor-silver text-sm mb-4">
                  <div className="font-semibold">{degree.institution}</div>
                  <div className="mt-1">
                    <span>{degree.location}</span>
                    <span className="mx-2">•</span>
                    <span className="text-gondor-gold">{degree.year}</span>
                  </div>
                </div>

                {degree.coursework.length > 0 && (
                  <div className="mt-auto">
                    <h4 className="text-gondor-gold font-cinzel text-xs uppercase tracking-wider mb-3">
                      Relevant Coursework
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {degree.coursework.map((course, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gondor-stone border border-gondor-gold/20
                                     text-gondor-silver text-xs"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Architectural Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative h-12 my-12 flex items-center justify-center"
          aria-hidden="true"
        >
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gondor-gold/30"></div>
          </div>
          <div className="relative bg-gondor-stone px-6">
            <div className="w-3 h-3 border border-gondor-gold rotate-45"></div>
          </div>
        </motion.div>

        {/* Certifications Grid (Horizontal on desktop, stack on mobile) */}
        <div>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="font-cinzel text-2xl md:text-3xl text-gondor-white text-center mb-8"
          >
            Certifications
          </motion.h3>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
            {education.certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                className="bg-gondor-dark border border-gondor-gold/30 p-6
                           hover:border-gondor-gold/60 transition-all duration-300 group h-full flex flex-col"
                data-testid={`certification-card-${index}`}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 text-gondor-gold group-hover:scale-110 transition-transform duration-300" aria-hidden="true">
                    <FaCertificate size={32} />
                  </div>

                  <div className="flex-1">
                    <h4 className="font-cinzel text-lg md:text-xl text-gondor-white mb-2 leading-tight">
                      {cert.title}
                    </h4>
                    <p className="text-gondor-silver text-sm mb-1">
                      {cert.issuer}
                    </p>
                    <p className="text-gondor-gold text-xs font-cinzel mb-3">
                      {cert.date}
                    </p>
                  </div>
                </div>

                {cert.description && (
                  <p className="text-gondor-silver text-sm leading-relaxed mb-3">
                    {cert.description}
                  </p>
                )}

                {cert.skills && cert.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {cert.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-2 py-1 bg-gondor-stone border border-gondor-gold/20
                                   text-gondor-silver text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}

                {cert.certificateUrl && (
                  <a
                    href={cert.certificateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 px-4 py-2
                               bg-transparent border-2 border-gondor-gold text-gondor-gold
                               hover:bg-gondor-gold hover:text-gondor-dark
                               transition-all duration-300 font-cinzel text-sm"
                  >
                    <FaExternalLinkAlt className="text-sm" />
                    View Certificate
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
