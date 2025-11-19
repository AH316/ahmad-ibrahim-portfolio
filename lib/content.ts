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
  professionalSummary: string;
  bio: {
    origin: string;
    currentLocation: string;
    journey: string[];
  };
  location: string;
  email: string;
  phone?: string;
  workAuthorization: string;
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

export interface Degree {
  title: string;
  honor: string;
  institution: string;
  location: string;
  year: string;
  coursework: string[];
}

export interface Education {
  degrees: Degree[];
  certifications: Certification[];
}

export interface Certification {
  title: string;
  issuer: string;
  date: string;
  certificateId?: string;
  description?: string;
  skills?: string[];
  certificateUrl?: string;
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
  professionalSummary: 'Software Developer experienced in building backend services in Python for a telecom software testing company, as well as building websites using React and Next.js for frontend, and PostgreSQL for the backend database. I am also knowledgeable in Java, C# and Azure cloud services. In addition, I have hands-on experience leveraging agentic AI tools to accelerate development workflows, automate testing, and improve project quality. Passionate about technology, solving problems and being a part of building and maintaining scalable solutions. I am looking to further my career as a software engineer.',
  bio: {
    origin: 'Egypt & Oman',
    currentLocation: 'Seattle, Washington',
    journey: [
      'My journey in software development began in Egypt, where I started my computer science coursework. I continued my studies in Oman and earned my B.Sc in Computer Science & Information Technology from the Open University (United Kingdom) in 2020. This international educational foundation led me to Seattle, Washington, where I\'ve grown from network administration to software engineering.',
      'Starting as a Network & Systems Administrator at MAPS, I discovered my passion for automation and testing. This led me to Denali Advanced Integration as an IT Systems Engineer, and eventually to Intellica Inc. as a Software Engineer, where I specialized in gateway testing and API development.',
      'During my time at Intellica (January - September 2025), I also completed a part-time remote internship at Sistahology (April - August 2025), building a full-stack journaling application with React, TypeScript, Supabase, and Playwright. I have hands-on experience leveraging agentic AI tools to accelerate development workflows, automate testing, and improve project quality.',
    ],
  },
  location: 'Redmond, WA',
  email: 'ahmadhibrahim316@gmail.com',
  phone: '(206) 771-6763',
  workAuthorization: 'US Citizen',
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

export const funFact = 'When I\'m not coding, you\'ll find me exploring the rich lore of Middle-earth or sipping on Adeni chai.';

// ============================================================================
// Education
// ============================================================================

export const education: Education = {
  degrees: [
    {
      title: 'B.A. Coursework in Advanced Computer Science and AI Systems',
      honor: 'In Progress',
      institution: 'Bellevue College',
      location: 'Bellevue, WA',
      year: '2025 (In-Progress)',
      coursework: [],
    },
    {
      title: 'B.Sc Computer Science & Information Technology',
      honor: '2nd Class Honours',
      institution: 'Open University',
      location: 'United Kingdom',
      year: '2020',
      coursework: [
        'Data Structures & Algorithms',
        'Object-Oriented Programming',
        'Programming with Java & Python',
      ],
    },
  ],
  certifications: [
    {
      title: 'AI Development & Automation Certificate',
      issuer: 'Skillspire | Microsoft',
      date: 'July 2025 – September 2025',
      description: 'Orchestrated a team of AI agents (Frontend, QA Lead, DB Guardian, Repo Librarian) to automate coding, schema checks, UI tests, and documentation. Automated DB audits and GitHub repo maintenance via Claude MCP servers; accelerated iteration speed by 3× compared to manual workflows. Leveraged AI for collaborative code reviews and deployment planning.',
      skills: ['AI Agents', 'Claude MCP', 'Automation', 'Code Reviews', 'CI/CD'],
    },
    {
      title: 'C# & Azure Cloud Development',
      issuer: 'Skillspire | Microsoft',
      date: 'April 2024 – August 2024',
      certificateId: 'c5764787-febc-496d-824f-b144c4af45b3',
      description: 'Developed a conversational AI chatbot using C# and .NET Framework, integrated with Azure OpenAI (ChatGPT) for context-aware user interactions and automated customer support workflows. Engineered object-oriented solutions implementing design patterns, custom data structures (linked lists, stacks, queues), reduced unnecessary allocations and understood garbage collection behavior. Applied Test-Driven Development practices with comprehensive unit, functional, and integration test suites; achieved 85%+ code coverage through systematic debugging and quality assurance. Delivered full-stack capstone project following industry SDLC practices: requirements gathering, architecture design, implementation, CI/CD integration, and technical documentation.',
      skills: ['C#', '.NET Framework', 'Azure OpenAI', 'ChatGPT API', 'OOP', 'TDD', 'Unit Testing', 'SDLC'],
      certificateUrl: '/certificates/csharp-azure-certificate.pdf',
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
    location: 'Bellevue, WA',
    period: 'January 2025 – September 2025',
    responsibilities: [
      'Identified and documented over 200 parameter mismatches across multiple telecom gateway models through Python-based validation automation',
      'Built a Python automation API to convert large sets of TR-181 (Technical Report 181) data model (a public data model that is used as a reference for telecom companies) parameters into a structured Excel report, for validation with device data model',
      'Diagnosed and engineered a fix for false-positive results in SSID automation by identifying undocumented requirements for a commit operation and integrating auto-commit logic into the test framework',
      'Designed and implemented backend test-automation services in Python for gateway data models with integrated parameter validation workflows',
      'Enhanced gateway deployment reliability through comprehensive input boundary testing and error handling mechanisms',
      'Collaborated with QA and DevOps engineers to define validation logic, document processes, and support CI/CD-ready testing practices',
      'Tools: Python, BitBucket, Jira, Confluence, VS Code, Terminal/Bash',
    ],
  },
  {
    title: 'Software Engineering Internship (Remote | Part-time)',
    company: 'Skillspire | Sistahology',
    location: 'Seattle, WA',
    period: 'April 2025 – August 2025',
    responsibilities: [
      'Developed and deployed a full-stack journaling web app with secure authentication, profile management, and dynamic content delivery',
      'Strengthened DB security by implementing RLS (Row-Level Security), role-based access, and Supabase triggers; reduced potential data leaks to 0% in tests',
      'Built automated Playwright test suites (UI, auth flows, accessibility); cut manual QA cycle time from ~2 days to <2 hours',
      'Improved site reliability by debugging and optimizing auth bootstrap, reducing session load errors by 80% across dev/preview builds',
      'Integrated Git/GitHub workflows, CI/CD prep for Vercel, and migration scripts for schema/index optimizations (write-heavy performance)',
      'Tech Stack: React, TypeScript, Supabase (Postgres, Auth, RLS), Playwright, Vercel, Git/GitHub, Node.js, TailwindCSS',
    ],
  },
  {
    title: 'IT Systems Engineer',
    company: 'Denali Advanced Integration',
    location: 'Redmond, WA',
    period: 'June 2024 – December 2024',
    responsibilities: [
      'Automated and standardized provisioning workflows for enterprise scanner devices, supporting scalability of deployments for major clients',
      'Assisted in server and network hardware installation across IDF (Intermediate Distribution Frame) and MDF(Main Distribution Frame) environments',
      'Documented deployment procedures and technical configurations to support repeatable rollouts',
      'Collaborated with deployment teams to track, test, and document device configurations, improving turnaround time and consistency across IT rollouts',
    ],
  },
  // {
  //   title: 'Network & Systems Administrator / AV Operations',
  //   company: 'MAPS',
  //   location: 'Redmond',
  //   period: 'April 2023 – June 2024',
  //   responsibilities: [
  //     'Managed MAPS\' digital AV infrastructure, including a network-based audio system with centralized control over distributed speaker systems and live streaming technology, coordinating with staff and volunteers to ensure smooth event execution',
  //     'Administered the internal network systems, including basic network configuration and connectivity troubleshooting',
  //     'Gained hands-on experience with enterprise-level AV systems, including signal routing, IP-based device control, and system resets – with strong understanding of how components integrate in a larger digital environment',
  //   ],
  // },
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
      { name: 'Pytest', icon: 'shield' },
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
      { name: 'Node.js', icon: 'ring' },
      { name: 'TailwindCSS', icon: 'scroll' },
    ],
  },
  {
    title: 'Cloud & DevOps',
    icon: 'tower',
    skills: [
      { name: 'Azure Cloud Services', icon: 'tower' },
      { name: 'Azure App Services', icon: 'tower' },
      { name: 'Azure Functions', icon: 'tower' },
      { name: 'GitHub', icon: 'ring' },
      { name: 'CI/CD Pipelines', icon: 'ring' },
      { name: 'BitBucket', icon: 'ring' },
      { name: 'PowerShell', icon: 'scroll' },
    ],
  },
];

export const additionalSkills: string[] = [
  'Git',
  'C#',
  'Java',
  'Cursor',
  'Claude AI',
  'Claude Code',
  'VS Code',
  'Jira',
  'Confluence',
  'API Design',
  'System Security',
  'Agentic AI',
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
    title: 'TR-181 Data Model Converter',
    description: 'Developed a conversion tool for transforming TR-181 data model specifications into executable Python code. Streamlined the testing process by automatically generating test cases from data model definitions.',
    technologies: ['Python', 'XML Parsing', 'Data Modeling', 'Automation'],
    github: 'https://github.com/AH316',
    demo: null,
    image: '/images/projects/tr181-converter.jpg',
  },
  {
    title: 'C# Azure AI Chatbot',
    description: 'Conversational AI chatbot built with C# and .NET Framework, integrated with Azure OpenAI (ChatGPT) for context-aware user interactions and automated customer support workflows',
    technologies: ['C#', '.NET Framework', 'Azure OpenAI', 'ChatGPT API', 'REST APIs', 'Async Programming'],
    github: 'https://github.com/AH316/ChatGPTConsoleApp',
    demo: null,
    image: '/images/projects/chatbot.jpg',
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
  { name: 'Education', href: '#education' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' }, 
  { name: 'Contact', href: '#contact' },
];

export const footerDescription = 'Software Developer specializing in test automation and full-stack development. Building elegant solutions, one line of code at a time.';

// ============================================================================
// SEO & Meta Information
// ============================================================================

export const seoMetadata = {
  title: 'Ahmad Ibrahim | Software Developer',
  description: 'Software Developer and Test Automation Engineer specializing in Python backend services, React/Next.js frontend, PostgreSQL, and Azure Cloud. Hands-on experience with agentic AI tools to accelerate development workflows. Based in Redmond, WA.',
  keywords: [
    'Software Developer',
    'Test Automation Engineer',
    'Python Developer',
    'React Developer',
    'TypeScript',
    'Azure Cloud',
    'Full-Stack Developer',
    'AI Development',
    'Agentic AI',
    'Claude AI',
    'Redmond WA',
    'Ahmad Ibrahim',
  ],
  author: 'Ahmad Ibrahim',
  siteUrl: 'https://ahmad-ibrahim-portfolio.vercel.app',
  ogImage: '/images/og-image.jpg', // Add Open Graph image
};
