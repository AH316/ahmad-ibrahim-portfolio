'use client';

import { motion } from 'framer-motion';
import Quote from './lotr/Quote';

const experiences = [
  {
    title: 'Software Engineer',
    company: 'Intellica Inc.',
    location: 'Redmond, WA',
    period: 'Feb 2025 – June 2025',
    responsibilities: [
      'Developed and maintained Python-based gateway automation tools for Linux system testing',
      'Built RESTful APIs for TR-181 data model interactions and device management',
      'Implemented comprehensive testing suites ensuring 95%+ code coverage',
      'Collaborated with cross-functional teams to deliver scalable automation solutions',
    ],
  },
  {
    title: 'IT Technician',
    company: 'Denali Advanced Integration',
    location: 'Bellevue, WA',
    period: 'Aug 2024 – Feb 2025',
    responsibilities: [
      'Provided technical support and troubleshooting for enterprise systems',
      'Managed system deployments and configurations across multiple environments',
      'Automated routine maintenance tasks using scripting and batch processes',
      'Maintained documentation for IT procedures and system architectures',
    ],
  },
  {
    title: 'Network & Systems Administrator',
    company: 'MAPS',
    location: 'Muscat, Oman',
    period: 'July 2022 – Aug 2024',
    responsibilities: [
      'Administered Windows Server and Active Directory for 100+ users',
      'Configured and maintained network infrastructure including VPNs and firewalls',
      'Implemented security protocols and conducted regular system audits',
      'Automated user provisioning and backup processes using PowerShell',
    ],
  },
];

export default function Experience() {
  return (
    <section
      id="experience"
      className="py-20 md:py-32 bg-gondor-dark relative"
      data-testid="experience-section"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
            text="Even the smallest person can change the course of the future"
            author="Galadriel"
          />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gondor-gold/30
                          transform md:-translate-x-1/2" />

          {/* Experience items */}
          <div className="space-y-16">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`relative flex flex-col md:flex-row gap-8 ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
                data-testid={`experience-item-${index}`}
              >
                {/* Timeline dot */}
                <div className={`absolute left-8 md:left-1/2 transform -translate-x-1/2
                                flex items-center justify-center`}>
                  <div className="w-4 h-4 rounded-full bg-gondor-gold border-4 border-gondor-dark
                                  shadow-[0_0_0_4px_rgba(212,175,55,0.2)]" />
                </div>

                {/* Content */}
                <div className={`flex-1 ml-20 md:ml-0 ${
                  index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:pl-12'
                }`}>
                  <div className={`bg-gondor-stone border border-gondor-gold/30 p-6 md:p-8
                                  hover:border-gondor-gold/60 transition-all duration-300 group
                                  relative overflow-hidden`}>
                    {/* Decorative accent */}
                    <div className={`absolute top-0 ${
                      index % 2 === 0 ? 'md:right-0' : 'md:left-0'
                    } left-0 w-2 h-full bg-gondor-gold/30 group-hover:bg-gondor-gold/60
                                    transition-colors duration-300`} />

                    {/* Header */}
                    <div className="mb-4">
                      <h3 className="font-cinzel text-2xl md:text-3xl text-gondor-white mb-2">
                        {exp.title}
                      </h3>
                      <div className="text-gondor-gold text-lg font-semibold mb-1">
                        {exp.company}
                      </div>
                      <div className="text-gondor-silver text-sm">
                        <span>{exp.location}</span>
                        <span className="mx-2">•</span>
                        <span className="font-cinzel">{exp.period}</span>
                      </div>
                    </div>

                    {/* Responsibilities */}
                    <ul className={`space-y-3 ${
                      index % 2 === 0 ? 'md:text-right' : 'md:text-left'
                    }`}>
                      {exp.responsibilities.map((resp, respIndex) => (
                        <li
                          key={respIndex}
                          className="text-gondor-silver leading-relaxed flex items-start gap-3"
                        >
                          <span className={`text-gondor-gold mt-1.5 flex-shrink-0 ${
                            index % 2 === 0 ? 'md:order-2' : ''
                          }`}>
                            ▸
                          </span>
                          <span className="flex-1">{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Spacer for timeline alignment */}
                <div className="hidden md:block flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
