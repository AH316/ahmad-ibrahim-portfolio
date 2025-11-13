'use client';

import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import Quote from './lotr/Quote';

const projects = [
  {
    title: 'Sistahology Journaling App',
    description: 'A full-stack journaling application built for women&apos;s wellness, featuring user authentication, real-time data sync, and comprehensive end-to-end testing. Implemented secure CRUD operations with Row Level Security.',
    technologies: ['React', 'TypeScript', 'Supabase', 'PostgreSQL', 'Playwright', 'TailwindCSS'],
    github: 'https://github.com/AH316',
    demo: null,
    image: '/images/sistahology.jpg', // Placeholder - add actual image
  },
  {
    title: 'Gateway Automation Tool',
    description: 'Python-based automation framework for testing Linux gateways and network devices. Built RESTful API endpoints for TR-181 data model interactions, enabling automated testing and configuration management.',
    technologies: ['Python', 'REST API', 'Linux', 'TR-181', 'Pytest', 'JSON'],
    github: 'https://github.com/AH316',
    demo: null,
    image: '/images/gateway-tool.jpg', // Placeholder - add actual image
  },
  {
    title: 'TR-181 Data Model Converter',
    description: 'Developed a conversion tool for transforming TR-181 data model specifications into executable Python code. Streamlined the testing process by automatically generating test cases from data model definitions.',
    technologies: ['Python', 'XML Parsing', 'Data Modeling', 'Automation'],
    github: 'https://github.com/AH316',
    demo: null,
    image: '/images/tr181-converter.jpg', // Placeholder - add actual image
  },
  {
    title: 'Personal Portfolio',
    description: 'This very website! A Next.js portfolio with a subtle Lord of the Rings "Gondor Noble" aesthetic. Features smooth animations, responsive design, and a particle background system.',
    technologies: ['Next.js', 'TypeScript', 'TailwindCSS', 'Framer Motion'],
    github: 'https://github.com/AH316',
    demo: null,
    image: '/images/portfolio.jpg', // Placeholder - add actual image
  },
];

export default function Projects() {
  return (
    <section
      id="projects"
      className="py-20 md:py-32 bg-gondor-dark relative"
      data-testid="projects-section"
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
            Projects
          </h2>
          <div className="w-24 h-px bg-gondor-gold mx-auto" aria-hidden="true"></div>
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
            text="It's the job that's never started that takes longest to finish"
            author="Sam Gamgee"
          />
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gondor-stone border border-gondor-gold/30 overflow-hidden
                         hover:border-gondor-gold/60 transition-all duration-300 group
                         flex flex-col"
              data-testid={`project-card-${index}`}
            >
              {/* Project Image Placeholder */}
              <div className="relative h-48 bg-gondor-dark/50 border-b border-gondor-gold/30
                              flex items-center justify-center overflow-hidden group-hover:bg-gondor-dark/70
                              transition-colors duration-300">
                <div className="text-gondor-gold/30 font-cinzel text-6xl group-hover:text-gondor-gold/50
                                transition-colors duration-300" aria-hidden="true">
                  {index + 1}
                </div>
                {/* Overlay effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-gondor-stone/80 to-transparent" aria-hidden="true"></div>
              </div>

              {/* Project Content */}
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="font-cinzel text-2xl text-gondor-white mb-3 group-hover:text-gondor-gold
                               transition-colors duration-300">
                  {project.title}
                </h3>

                <p className="text-gondor-silver leading-relaxed mb-4 flex-1">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-gondor-dark border border-gondor-gold/20
                                 text-gondor-silver text-xs font-jetbrains
                                 hover:border-gondor-gold/50 transition-colors duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3
                               bg-transparent border-2 border-gondor-gold text-gondor-gold
                               hover:bg-gondor-gold hover:text-gondor-dark
                               transition-all duration-300 font-cinzel text-sm
                               relative overflow-hidden group/btn"
                  >
                    <FaGithub size={18} />
                    <span className="relative z-10">View Code</span>
                    <span className="absolute inset-0 bg-gondor-gold transform scale-x-0
                                     group-hover/btn:scale-x-100 transition-transform duration-300
                                     origin-left -z-0"></span>
                  </a>

                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3
                                 bg-gondor-gold text-gondor-dark
                                 hover:bg-gondor-gold/90 hover:shadow-[0_0_20px_rgba(212,175,55,0.5)]
                                 transition-all duration-300 font-cinzel text-sm"
                    >
                      <FaExternalLinkAlt size={16} />
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
