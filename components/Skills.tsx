'use client';

import { motion } from 'framer-motion';
import Icon from './lotr/Icon';

const skillCategories = [
  {
    title: 'Test Automation & Development',
    icon: 'sword' as const,
    skills: [
      { name: 'Python', icon: 'sword' as const },
      { name: 'RESTful APIs', icon: 'scroll' as const },
      { name: 'Playwright', icon: 'shield' as const },
      { name: 'Linux Gateway Testing', icon: 'tower' as const },
      { name: 'TR-181 Data Models', icon: 'scroll' as const },
      { name: 'Test Automation Frameworks', icon: 'shield' as const },
    ],
  },
  {
    title: 'Full-Stack Development',
    icon: 'scroll' as const,
    skills: [
      { name: 'React', icon: 'scroll' as const },
      { name: 'TypeScript', icon: 'scroll' as const },
      { name: 'Next.js', icon: 'scroll' as const },
      { name: 'PostgreSQL', icon: 'tower' as const },
      { name: 'Supabase', icon: 'ring' as const },
      { name: 'TailwindCSS', icon: 'scroll' as const },
    ],
  },
  {
    title: 'Cloud & DevOps',
    icon: 'tower' as const,
    skills: [
      { name: 'Azure Cloud Services', icon: 'tower' as const },
      { name: 'GitHub', icon: 'ring' as const },
      { name: 'CI/CD Pipelines', icon: 'ring' as const },
      { name: 'Docker', icon: 'tower' as const },
      { name: 'PowerShell', icon: 'scroll' as const },
      { name: 'Windows Server', icon: 'castle' as const },
    ],
  },
];

export default function Skills() {
  return (
    <section
      id="skills"
      className="py-20 md:py-32 bg-gondor-stone relative"
      data-testid="skills-section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-cinzel text-4xl md:text-5xl text-gondor-white mb-4">
            Skills & Technologies
          </h2>
          <div className="w-24 h-px bg-gondor-gold mx-auto"></div>
        </motion.div>

        {/* Skill Categories */}
        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
              className="bg-gondor-dark border border-gondor-gold/30 p-6 md:p-8
                         hover:border-gondor-gold/60 transition-all duration-300 group
                         relative overflow-hidden"
              data-testid={`skill-category-${categoryIndex}`}
            >
              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-gondor-gold/20
                              group-hover:border-gondor-gold/50 transition-colors duration-300" />

              {/* Category Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className="flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Icon type={category.icon} size={40} />
                </div>
                <h3 className="font-cinzel text-xl md:text-2xl text-gondor-white leading-tight">
                  {category.title}
                </h3>
              </div>

              {/* Skills Grid */}
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: categoryIndex * 0.2 + skillIndex * 0.1 }}
                    className="flex items-center gap-3 p-3 bg-gondor-stone/50 border border-gondor-gold/10
                               hover:border-gondor-gold/30 hover:bg-gondor-stone transition-all duration-300"
                    data-testid={`skill-${categoryIndex}-${skillIndex}`}
                  >
                    <Icon type={skill.icon} size={20} />
                    <span className="text-gondor-silver hover:text-gondor-white transition-colors">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Skills Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <div className="inline-block bg-gondor-dark border border-gondor-gold/30 px-8 py-4">
            <p className="text-gondor-silver text-sm mb-2">
              <span className="text-gondor-gold font-cinzel">Also Experienced With:</span>
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {['Git', 'C#', 'Java', 'Active Directory', 'VPN Configuration', 'System Security', 'API Design'].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-gondor-stone border border-gondor-gold/20 text-gondor-silver text-xs
                             hover:border-gondor-gold/50 hover:text-gondor-white transition-all duration-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
