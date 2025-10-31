# Ahmad Ibrahim - Portfolio Website

[![Next.js](https://img.shields.io/badge/Next.js-15.1.6-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4.1-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.23.24-FF0055?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)
[![Playwright](https://img.shields.io/badge/Playwright-1.56.1-2EAD33?style=for-the-badge&logo=playwright)](https://playwright.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

A modern, responsive personal portfolio showcasing my journey as a Software Developer specializing in test automation and full-stack development. Built with Next.js 15 and featuring a subtle "Gondor Noble" Lord of the Rings-inspired aesthetic.

**Live Demo:** [Coming Soon - Deploying to Vercel]

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Testing](#testing)
- [Deployment](#deployment)
- [Design Philosophy](#design-philosophy)
- [About Me](#about-me)
- [License](#license)

---

## Features

### Core Functionality
- **Responsive Design**: Mobile-first approach with seamless experience across all devices
- **Modern UI/UX**: Dark theme with elegant typography (Cinzel + Inter) and smooth animations
- **Contact Form**: Integrated email form using Formspree with React Hook Form validation
- **SEO Optimized**: Meta tags, Open Graph support, and semantic HTML for better discoverability
- **Performance**: 90+ Lighthouse score with Next.js Image optimization and lazy loading

### Interactive Elements
- **Scroll Animations**: Framer Motion-powered fade-in and slide-up effects
- **Particle Background**: Subtle floating particles for visual depth
- **Parallax Hero**: Dynamic hero section with parallax scrolling
- **Smooth Navigation**: Sticky header with smooth scrolling to sections
- **Hover Effects**: Gold glow effects on interactive elements

### Design Features
- **Gondor Noble Theme**: Professional dark theme inspired by Lord of the Rings
  - Primary: `#1a1a1a` (Gondor Dark)
  - Accent: `#d6b13a` (Gondor Gold)
  - Text: `#eeeff1` (Gondor Silver - WCAG 2.1 AA compliant, 8.43:1 contrast)
- **Custom LOTR Icons**: Thematic icons for skills (sword, shield, tower, scroll, ring)
- **Strategic Quotes**: LOTR quotes integrated into each section
- **Architectural Dividers**: Gondor-inspired decorative elements

### Quality Assurance
- **E2E Testing**: Comprehensive Playwright test suite with 176+ passing tests
- **Accessibility**: WCAG 2.1 AA compliant with proper contrast ratios
- **Type Safety**: Full TypeScript implementation with strict type checking
- **Centralized Content**: Maintainable content structure in `lib/content.ts`

---

## Tech Stack

### Frontend Framework
- **Next.js 15.1.6** - React framework with App Router
- **React 19.0.0** - UI component library
- **TypeScript 5** - Type-safe development

### Styling & Animation
- **TailwindCSS 3.4.1** - Utility-first CSS framework with custom Gondor theme
- **Framer Motion 12.23.24** - Animation library for smooth transitions
- **Google Fonts** - Cinzel (headings), Inter (body), JetBrains Mono (code)

### Forms & Validation
- **React Hook Form 7.65.0** - Form state management
- **Formspree 3.0.0** - Email service integration

### Testing & Quality
- **Playwright 1.56.1** - E2E testing framework
- **@axe-core/playwright 4.11.0** - Accessibility testing
- **ESLint** - Code linting
- **TypeScript Compiler** - Type checking

### Icons & Assets
- **React Icons 5.5.0** - Icon library for LOTR-themed icons

### Deployment
- **Vercel** - Hosting and continuous deployment

---

## Getting Started

### Prerequisites
- **Node.js** 18.0 or higher
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/AH316/ahmad-ibrahim-portfolio.git
   cd ahmad-ibrahim-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3001](http://localhost:3001) in your browser.

### Available Scripts

```bash
# Development
npm run dev              # Start development server with Turbopack (port 3001)

# Production
npm run build            # Build for production
npm start                # Start production server

# Code Quality
npm run lint             # Run ESLint
npm run type-check       # Run TypeScript compiler

# Testing (E2E with Playwright)
npm run test:e2e         # Run all E2E tests
npm run test:e2e:ui      # Run tests with Playwright UI
npm run test:e2e:headed  # Run tests in headed mode (visible browser)
npm run test:e2e:debug   # Debug tests with Playwright Inspector
npm run test:e2e:report  # View HTML test report
npm run snap:update      # Update visual snapshots
```

### Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Formspree Configuration (replace with your actual ID)
NEXT_PUBLIC_FORMSPREE_ID=your_formspree_id_here
```

---

## Project Structure

```
/app
  /layout.tsx          # Root layout with Gondor theme provider
  /page.tsx            # Main landing page with all sections
  /globals.css         # TailwindCSS imports + LOTR theme variables

/components
  /Hero.tsx            # Hero section with name, tagline, LOTR quote
  /About.tsx           # Bio, skills overview with custom icons
  /Education.tsx       # Degree and certifications
  /Experience.tsx      # Work history timeline
  /Projects.tsx        # Project showcase cards
  /Skills.tsx          # Categorized skills
  /Contact.tsx         # Contact form with Formspree
  /Navigation.tsx      # Sticky header with smooth scroll
  /Footer.tsx          # Footer with links

/components/lotr
  /Quote.tsx           # LOTR quote component
  /Icon.tsx            # Custom LOTR-themed icons
  /ParticleBackground.tsx # Animated floating particles
  /MusicPlayer.tsx     # Optional background music toggle

/lib
  /content.ts          # Centralized content data
  /utils.ts            # Utility functions

/e2e
  /portfolio.spec.ts   # E2E test suite

/public
  /resume.pdf          # Resume PDF
  /images              # Project screenshots, profile photo
  /icons               # Custom LOTR SVG icons
```

---

## Testing

### E2E Testing with Playwright

The portfolio includes comprehensive end-to-end tests covering:

- **Component Rendering**: All sections render correctly
- **Accessibility**: WCAG 2.1 AA compliance validation
- **Color Contrast**: Automated contrast ratio checks (8.43:1 for gondor-silver)
- **Navigation**: Smooth scroll and link functionality
- **Forms**: Contact form validation and submission
- **Animations**: Scroll-triggered animations and interactions
- **Responsive Design**: Mobile and desktop layouts
- **SEO**: Metadata and Open Graph tags

**Current Test Status**: 176/208 passing tests (84.6%)

Run tests with:
```bash
npm run test:e2e        # Headless mode
npm run test:e2e:ui     # Interactive UI mode
npm run test:e2e:headed # Visible browser
```

View test report:
```bash
npm run test:e2e:report
```

---

## Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Import to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository
   - Configure build settings (auto-detected for Next.js)
   - Add environment variables (`NEXT_PUBLIC_FORMSPREE_ID`)
   - Deploy

3. **Custom Domain** (Optional)
   - Configure DNS in Vercel dashboard
   - HTTPS enabled automatically

### Manual Deployment

```bash
# Build production bundle
npm run build

# Start production server
npm start
```

---

## Design Philosophy

### Gondor Noble Theme

The portfolio embraces a subtle Lord of the Rings aesthetic inspired by the kingdom of Gondor - regal, refined, and professional. The design maintains a balance between thematic elements and modern portfolio standards.

**Key Principles**:
- **Subtle Integration**: LOTR elements enhance without overwhelming
- **Professional First**: Maintains credibility for recruiters and hiring managers
- **Accessibility**: WCAG 2.1 AA compliant with high contrast ratios
- **Performance**: Optimized animations and lazy loading
- **Responsive**: Mobile-first approach with fluid layouts

**Visual Elements**:
- Dark backgrounds with gold accents
- Elegant serif typography for headings (Cinzel)
- Custom LOTR-themed skill icons
- Strategic quote placement throughout sections
- Subtle particle animations
- Gondor-inspired architectural dividers

---

## About Me

**Ahmad Ibrahim**
Software Developer | Test Automation Engineer
Redmond, WA

I'm a Software Developer specializing in test automation and full-stack development. My journey began in Oman and led me to Seattle, where I've worked with companies like Intellica Inc., Denali Advanced Integration, and MAPS. I recently completed an internship with Sistahology, building a full-stack journaling application with React, TypeScript, and Supabase.

**Core Competencies**:
- Test Automation & Development (Python, RESTful APIs, Linux)
- Full-Stack Development (React, TypeScript, PostgreSQL, Supabase)
- Cloud & DevOps (Azure, GitHub, CI/CD)

**Connect with me**:
- [LinkedIn](https://www.linkedin.com/in/ahmad-ibrahim316)
- [GitHub](https://github.com/AH316)
- [Email](mailto:ahmadhibrahim316@gmail.com)

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- **Design Inspiration**: [Faizan Dhankwala's Portfolio](https://faizandhankwala.com/)
- **LOTR Theme**: Inspired by the kingdom of Gondor from J.R.R. Tolkien's works
- **Icons**: React Icons library
- **Fonts**: Google Fonts (Cinzel, Inter, JetBrains Mono)
- **Deployment**: Vercel platform

---

**Built with Next.js & TailwindCSS** | Copyright © 2025 Ahmad Ibrahim

> "All we have to decide is what to do with the time that is given us." - Gandalf
