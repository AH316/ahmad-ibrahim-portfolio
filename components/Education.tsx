'use client';

import { motion } from 'framer-motion';
import { FaGraduationCap, FaCertificate } from 'react-icons/fa';

const education = {
  degree: {
    title: 'B.Sc Computer Science & Information Technology',
    honor: '2nd Class Honours',
    institution: 'Open University',
    location: 'Muscat, Oman',
    year: '2020',
    coursework: [
      'Data Structures & Algorithms',
      'Object-Oriented Programming',
      'Programming with Java & Python',
    ],
  },
  certifications: [
    {
      title: 'C# & Azure Cloud Development',
      issuer: 'Skillspire | Microsoft',
      date: 'April 2024 – August 2024',
    },
    {
      title: 'Embracing AI',
      issuer: 'Skillspire | Microsoft',
      date: 'July 2025 – September 2025',
    },
  ],
};

export default function Education() {
  return (
    <section
      id="education"
      className="py-20 md:py-32 bg-gondor-stone relative"
      data-testid="education-section"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
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

        {/* Degree */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
          data-testid="degree-card"
        >
          <div className="bg-gondor-dark border border-gondor-gold/30 p-8 relative overflow-hidden group
                          hover:border-gondor-gold/60 transition-all duration-300">
            {/* Decorative corner elements */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-gondor-gold/50" aria-hidden="true"></div>
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-gondor-gold/50" aria-hidden="true"></div>

            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 text-gondor-gold group-hover:scale-110 transition-transform duration-300" aria-hidden="true">
                <FaGraduationCap size={48} />
              </div>

              <div className="flex-1">
                <div className="flex flex-wrap items-baseline gap-3 mb-2">
                  <h3 className="font-cinzel text-2xl md:text-3xl text-gondor-white">
                    {education.degree.title}
                  </h3>
                  <span className="text-gondor-gold text-lg font-cinzel">
                    {education.degree.honor}
                  </span>
                </div>

                <div className="text-gondor-silver text-lg mb-4">
                  <span className="font-semibold">{education.degree.institution}</span>
                  <span className="mx-2">•</span>
                  <span>{education.degree.location}</span>
                  <span className="mx-2">•</span>
                  <span className="text-gondor-gold">{education.degree.year}</span>
                </div>

                <div className="mt-4">
                  <h4 className="text-gondor-gold font-cinzel text-sm uppercase tracking-wider mb-3">
                    Relevant Coursework
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {education.degree.coursework.map((course, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gondor-stone border border-gondor-gold/20
                                   text-gondor-silver text-sm"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

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

        {/* Certifications */}
        <div className="space-y-6">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="font-cinzel text-2xl md:text-3xl text-gondor-white text-center mb-8"
          >
            Certifications
          </motion.h3>

          {education.certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              className="bg-gondor-dark border border-gondor-gold/30 p-6
                         hover:border-gondor-gold/60 transition-all duration-300 group"
              data-testid={`certification-card-${index}`}
            >
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0 text-gondor-gold group-hover:scale-110 transition-transform duration-300" aria-hidden="true">
                  <FaCertificate size={32} />
                </div>

                <div className="flex-1">
                  <h4 className="font-cinzel text-xl text-gondor-white mb-2">
                    {cert.title}
                  </h4>
                  <p className="text-gondor-silver text-base mb-1">
                    {cert.issuer}
                  </p>
                  <p className="text-gondor-gold text-sm font-cinzel">
                    {cert.date}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
