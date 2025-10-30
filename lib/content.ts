/**
 * Centralized Content Management for Ahmad Ibrahim's Portfolio
 *
 * This file contains all content data used throughout the portfolio website.
 * Update this file to modify text, links, project details, and other content.
 */

// ============================================================================
// Type Definitions
// ============================================================================

export interface PersonalInfo {
  name: string;
  tagline: string;
  bio: {
    origin: string;
    currentLocation: string;
    journey: string[];
  };
  location: string;
  email: string;
  phone?: string;
}

export interface SocialLink {
  name: string;
  url: string;
  username?: string;
}

export interface Experience {
  title: string;
  company: string;
  location: string;
  period: string;
  responsibilities: string[];
}

export interface Education {
  degree: {
    title: string;
    honor: string;
    institution: string;
    location: string;
    year: string;
    coursework: string[];
  };
  certifications: Certification[];
}

export interface Certification {
  title: string;
  issuer: string;
  date: string;
}

export interface Skill {
  name: string;
  icon: IconType;
}

export interface SkillCategory {
  title: string;
  icon: IconType;
  skills: Skill[];
}

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  github: string;
  demo: string | null;
  image: string;
}

export interface Quote {
  text: string;
  author: string;
}

export type IconType = 'sword' | 'scroll' | 'tower' | 'shield' | 'ring' | 'castle';

export interface AboutSkill {
  icon: IconType;
  label: string;
}

export interface AboutStats {
  years: string;
  projects: string;
  techStacks: string;
}

// ============================================================================
// Personal Information
// ============================================================================

export const personalInfo: PersonalInfo = {
  name: 'Ahmad Ibrahim',
  tagline: 'Software Developer | Test Automation Engineer',
  bio: {
    origin: 'Muscat, Oman',
    currentLocation: 'Seattle, Washington',
    journey: [
      'My journey in software development began in Muscat, Oman, where I earned my B.Sc in Computer Science & Information Technology. The path led me to Seattle, Washington, where I\'ve grown from network administration to software engineering.',
      'Starting as a Network & Systems Administrator at MAPS, I discovered my passion for automation and testing. This led me to Denali Advanced Integration as an IT Technician, and eventually to Intellica Inc. as a Software Engineer, where I specialized in gateway testing and API development.',
      'Most recently, I completed an internship at Sistahology, building a full-stack journaling application with React, TypeScript, Supabase, and Playwright. This experience solidified my love for creating elegant, user-focused solutions.',
    ],
  },
  location: 'Redmond, WA',
  email: 'ahmadhibrahim316@gmail.com',
};

// ============================================================================
// Social Links
// ============================================================================

export const socialLinks: SocialLink[] = [
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/ahmad-ibrahim316',
    username: 'ahmad-ibrahim316',
  },
  {
    name: 'GitHub',
    url: 'https://github.com/AH316',
    username: 'AH316',
  },
  {
    name: 'Email',
    url: 'mailto:ahmadhibrahim316@gmail.com',
  },
];

// ============================================================================
// About Section
// ============================================================================

export const aboutSkills: AboutSkill[] = [
  { icon: 'sword', label: 'Python & Test Automation' },
  { icon: 'scroll', label: 'React & TypeScript' },
  { icon: 'tower', label: 'Azure Cloud Services' },
  { icon: 'shield', label: 'System Security & Testing' },
];

export const aboutStats: AboutStats = {
  years: '3+',
  projects: '10+',
  techStacks: '5+',
};

export const funFact = 'When I\'m not coding, you\'ll find me exploring the rich lore of Middle-earth or perfecting my espresso brewing technique.';

// ============================================================================
// Education
// ============================================================================

export const education: Education = {
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

// ============================================================================
// Work Experience
// ============================================================================

export const experiences: Experience[] = [
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

// ============================================================================
// Skills
// ============================================================================

export const skillCategories: SkillCategory[] = [
  {
    title: 'Test Automation & Development',
    icon: 'sword',
    skills: [
      { name: 'Python', icon: 'sword' },
      { name: 'RESTful APIs', icon: 'scroll' },
      { name: 'Playwright', icon: 'shield' },
      { name: 'Linux Gateway Testing', icon: 'tower' },
      { name: 'TR-181 Data Models', icon: 'scroll' },
      { name: 'Test Automation Frameworks', icon: 'shield' },
    ],
  },
  {
    title: 'Full-Stack Development',
    icon: 'scroll',
    skills: [
      { name: 'React', icon: 'scroll' },
      { name: 'TypeScript', icon: 'scroll' },
      { name: 'Next.js', icon: 'scroll' },
      { name: 'PostgreSQL', icon: 'tower' },
      { name: 'Supabase', icon: 'ring' },
      { name: 'TailwindCSS', icon: 'scroll' },
    ],
  },
  {
    title: 'Cloud & DevOps',
    icon: 'tower',
    skills: [
      { name: 'Azure Cloud Services', icon: 'tower' },
      { name: 'GitHub', icon: 'ring' },
      { name: 'CI/CD Pipelines', icon: 'ring' },
      { name: 'Docker', icon: 'tower' },
      { name: 'PowerShell', icon: 'scroll' },
      { name: 'Windows Server', icon: 'castle' },
    ],
  },
];

export const additionalSkills: string[] = [
  'Git',
  'C#',
  'Java',
  'Active Directory',
  'VPN Configuration',
  'System Security',
  'API Design',
];

// ============================================================================
// Projects
// ============================================================================

export const projects: Project[] = [
  {
    title: 'Sistahology Journaling App',
    description: 'A full-stack journaling application built for women\'s wellness, featuring user authentication, real-time data sync, and comprehensive end-to-end testing. Implemented secure CRUD operations with Row Level Security.',
    technologies: ['React', 'TypeScript', 'Supabase', 'PostgreSQL', 'Playwright', 'TailwindCSS'],
    github: 'https://github.com/AH316',
    demo: null,
    image: '/images/projects/sistahology.jpg',
  },
  {
    title: 'Gateway Automation Tool',
    description: 'Python-based automation framework for testing Linux gateways and network devices. Built RESTful API endpoints for TR-181 data model interactions, enabling automated testing and configuration management.',
    technologies: ['Python', 'REST API', 'Linux', 'TR-181', 'Pytest', 'JSON'],
    github: 'https://github.com/AH316',
    demo: null,
    image: '/images/projects/gateway-tool.jpg',
  },
  {
    title: 'TR-181 Data Model Converter',
    description: 'Developed a conversion tool for transforming TR-181 data model specifications into executable Python code. Streamlined the testing process by automatically generating test cases from data model definitions.',
    technologies: ['Python', 'XML Parsing', 'Data Modeling', 'Automation'],
    github: 'https://github.com/AH316',
    demo: null,
    image: '/images/projects/tr181-converter.jpg',
  },
  {
    title: 'Personal Portfolio',
    description: 'This very website! A Next.js portfolio with a subtle Lord of the Rings "Gondor Noble" aesthetic. Features smooth animations, responsive design, and a particle background system.',
    technologies: ['Next.js', 'TypeScript', 'TailwindCSS', 'Framer Motion'],
    github: 'https://github.com/AH316',
    demo: null,
    image: '/images/projects/portfolio.jpg',
  },
];

// ============================================================================
// LOTR Quotes
// ============================================================================

export const quotes: Record<string, Quote> = {
  hero: {
    text: 'All we have to decide is what to do with the time that is given us',
    author: 'Gandalf',
  },
  experience: {
    text: 'Even the smallest person can change the course of the future',
    author: 'Galadriel',
  },
  projects: {
    text: 'It\'s the job that\'s never started that takes longest to finish',
    author: 'Sam Gamgee',
  },
  contact: {
    text: 'The journey doesn\'t end here',
    author: 'Gandalf',
  },
  footer: {
    text: 'Not all those who wander are lost',
    author: 'J.R.R. Tolkien',
  },
};

// ============================================================================
// Footer Content
// ============================================================================

export const footerLinks = [
  { name: 'Home', href: '#hero' },
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

export const footerDescription = 'Software Developer specializing in test automation and full-stack development. Building elegant solutions, one line of code at a time.';

// ============================================================================
// SEO & Meta Information
// ============================================================================

export const seoMetadata = {
  title: 'Ahmad Ibrahim | Software Developer',
  description: 'Software Developer and Test Automation Engineer specializing in Python, React, TypeScript, and Azure Cloud. Based in Redmond, WA.',
  keywords: [
    'Software Developer',
    'Test Automation Engineer',
    'Python Developer',
    'React Developer',
    'TypeScript',
    'Azure Cloud',
    'Full-Stack Developer',
    'Redmond WA',
    'Ahmad Ibrahim',
  ],
  author: 'Ahmad Ibrahim',
  siteUrl: 'https://ahmadibrahim.dev', // Update with actual domain
  ogImage: '/images/og-image.jpg', // Add Open Graph image
};
