# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for Ahmad Ibrahim, a Software Developer specializing in test automation and full-stack development. This site showcases professional experience, projects, and skills with a subtle Lord of the Rings "Gondor Noble" aesthetic.

**Design Reference**: https://faizandhankwala.com/
**Resume**: `Prompt Files/Ahmad Ibrahim.pdf`
**Links**: `Prompt Files/Links.txt`

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Styling**: TailwindCSS with custom LOTR theme configuration
- **TypeScript**: For type safety
- **Animations**: Framer Motion for smooth transitions
- **Forms**: React Hook Form + email service (Formspree or EmailJS)
- **Deployment**: Vercel
- **Fonts**: Google Fonts (Cinzel for headings, Inter for body)

## Development Commands

```bash
# Install dependencies
npm install

# Run development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Type check
npm run type-check
```

## Architecture & Structure

### App Router Organization

```
/app
  /layout.tsx          - Root layout with Gondor theme provider
  /page.tsx            - Main landing page with all sections
  /globals.css         - TailwindCSS imports + LOTR theme variables

/components
  /Hero.tsx            - Hero section with name, tagline, LOTR quote, CTA
  /About.tsx           - Bio, skills overview with custom icons
  /Education.tsx       - Degree and certifications with decorative dividers
  /Experience.tsx      - Work history timeline with gold accent lines
  /Projects.tsx        - Project showcase cards
  /Skills.tsx          - Categorized skills (Test Automation, Full-Stack, Cloud)
  /Contact.tsx         - Contact form with Gondor seal
  /Navigation.tsx      - Sticky header with smooth scroll
  /Footer.tsx          - Footer with links

/components/lotr
  /Quote.tsx           - LOTR quote component
  /Icon.tsx            - Custom LOTR-themed icons (swords, shields, towers)
  /MusicPlayer.tsx     - Optional background music toggle
  /ParticleBackground.tsx - Animated floating particles

/lib
  /content.ts          - Centralized content data (experience, projects, skills)
  /theme.ts            - LOTR theme colors and styles

/public
  /resume.pdf          - Copy of Ahmad's resume
  /images              - Project screenshots, profile photo
  /icons               - Custom LOTR SVG icons
  /music               - Optional ambient LOTR-inspired audio
```

### Content Structure

All portfolio content is centralized in `/lib/content.ts` for easy updates:
- Work experience array
- Projects array with screenshots, descriptions, tech stacks
- Skills categorized by specialty
- LOTR quotes mapped to sections
- Social links

## Design System: Gondor Noble Theme

### Color Palette (TailwindCSS custom colors)

```javascript
// tailwind.config.js
colors: {
  gondor: {
    dark: '#1a1a1a',      // Primary background
    stone: '#2a2a2a',      // Secondary background
    silver: '#e5e7eb',     // Primary text
    gold: '#d4af37',       // Accent color
    white: '#f9fafb',      // Headings
  }
}
```

### Typography
- **Headings**: Cinzel (serif, elegant, regal)
- **Body**: Inter (clean, readable)
- **Code**: JetBrains Mono

### LOTR Theme Guidelines

**Intensity**: Subtle & Professional
- Dark theme inspired by Gondor (regal, refined)
- LOTR elements enhance but don't dominate
- Maintains professional portfolio aesthetic

**Interactive Elements**:
1. **LOTR Quotes**: Placed strategically in sections
   - Hero: "All we have to decide is what to do with the time that is given us" – Gandalf
   - Experience: "Even the smallest person can change the course of the future" – Galadriel
   - Projects: "It's the job that's never started that takes longest to finish" – Sam Gamgee
   - Contact: "The journey doesn't end here"
2. **Custom Icons**: Skills represented with themed icons (sword=Python, shield=testing, tower=cloud, scroll=React)
3. **Animations**: Subtle floating particles, smooth scroll, fade-in effects, parallax on hero
4. **Optional Music**: Toggle for ambient LOTR-inspired background music ("Listen while you scroll")

## Key Sections & Content

### Hero
- Name: Ahmad Ibrahim
- Tagline: Software Developer | Test Automation Engineer
- Quote: "All we have to decide is what to do with the time that is given us" – Gandalf
- CTA: "Scroll Down" button with animated white tree of Gondor icon
- Background: Subtle animated particles (floating stars/light)
- Parallax scrolling effect

### About
- Professional journey (Oman → Seattle)
- Career progression (MAPS → Denali → Intellica → Sistahology internship)
- Core skills with LOTR iconography
- Fun fact/weakness (keep personable, similar to reference website)

### Education
- **B.Sc Computer Science & Information Technology**, 2nd Class Honours
- Open University – Muscat, Oman (2020)
- Relevant Coursework: Data Structures & Algorithms, OOP, Programming with Java & Python

**Certifications:**
- C# & Azure Cloud Development (Skillspire | Microsoft) - April 2024 – August 2024
- Embracing AI (Skillspire | Microsoft) - July 2025 – September 2025

Decorative elements: Gondor-inspired architectural dividers between items

### Experience
Quote: "Even the smallest person can change the course of the future" – Galadriel

Timeline format with 3 positions:
1. Software Engineer @ Intellica Inc. (Feb 2025 – June 2025)
2. IT Technician @ Denali Advanced Integration (Aug 2024 – Feb 2025)
3. Network & Systems Administrator @ MAPS (July 2022 – Aug 2024)

Timeline styled with gold accent lines connecting positions

### Skills (Categorized)
- **Test Automation & Development**: Python, RESTful APIs, Linux gateway testing
- **Full-Stack Development**: React, TypeScript, PostgreSQL, Supabase, Playwright
- **Cloud & DevOps**: Azure, GitHub, CI/CD

### Projects
Quote: "It's the job that's never started that takes longest to finish" – Sam Gamgee

Showcase 3-4 key projects:
- Sistahology Journaling App (React, TypeScript, Supabase, Playwright)
- Gateway Automation Tool (Python RESTful API)
- TR-181 Data Model Converter

Each project includes: screenshot/mockup, description, tech stack badges, GitHub link
Gold "View Project" buttons with hover glow effects

### Contact
- Form fields: Name, Email, Message
- Social links: LinkedIn, GitHub, Email
- Quote: "The journey doesn't end here"
- Gondor seal/emblem as decorative element

## Responsive Design

- **Mobile-first approach**: Design for mobile, enhance for desktop
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Navigation**: Hamburger menu on mobile, horizontal on desktop
- **Images**: Responsive with next/image optimization

## Animation Strategy

Use Framer Motion for:
- Scroll-triggered animations (fade-in, slide-up)
- Smooth section transitions
- Hover effects on project cards (gold glow)
- Parallax effects on hero section
- Keep animations subtle and performant

## Performance Considerations

- Use Next.js Image component for all images
- Lazy load project screenshots
- Code split components with dynamic imports
- Optimize LOTR icons as SVGs
- Minimize JavaScript bundle size
- Server-side render initial content for SEO

## Contact Links

- **LinkedIn**: www.linkedin.com/in/ahmad-ibrahim316
- **GitHub**: https://github.com/AH316
- **Email**: ahmadhibrahim316@gmail.com
- **Location**: Redmond, WA

## Implementation Roadmap

### Phase 1: Project Setup
1. **Initialize Next.js project** with TypeScript, TailwindCSS, App Router
   - Run `npx create-next-app@latest`
   - Select: TypeScript (Yes), ESLint (Yes), TailwindCSS (Yes), App Router (Yes)
   - Project name suggestion: `ahmad-ibrahim-portfolio`
2. **Configure Gondor theme** in `tailwind.config.js` with custom colors
3. **Install dependencies**:
   - `npm install framer-motion react-hook-form react-icons`
   - Email service: `formspree` or `@emailjs/browser`
4. **Set up Google Fonts** in `app/layout.tsx`:
   - Cinzel (serif, headings)
   - Inter (sans-serif, body)
   - JetBrains Mono (monospace, code)
5. **Create base directory structure**: `/components`, `/components/lotr`, `/lib`, `/public`

### Phase 2: Core Components
1. **Navigation** (`components/Navigation.tsx`)
   - Sticky header with smooth scroll to sections
   - Links: Home, About, Education, Experience, Skills, Projects, Contact, Resume
   - Hamburger menu for mobile
2. **Hero** (`components/Hero.tsx`)
   - Large name display, tagline
   - Gandalf quote
   - "Scroll Down" CTA with animated white tree icon
   - Particle background integration
3. **About** (`components/About.tsx`)
   - Professional bio (Oman → Seattle journey)
   - Skills overview with LOTR icons
   - Fun fact/weakness
4. **Education** (`components/Education.tsx`)
   - B.Sc degree details
   - Two certifications
   - Gondor architectural dividers
5. **Experience** (`components/Experience.tsx`)
   - Galadriel quote
   - Timeline with 3 positions
   - Gold accent lines connecting items
   - Bullet points for each role
6. **Skills** (`components/Skills.tsx`)
   - 3 categories: Test Automation, Full-Stack, Cloud & DevOps
   - Custom LOTR icons for each skill
7. **Projects** (`components/Projects.tsx`)
   - Sam Gamgee quote
   - 3-4 project cards
   - Screenshots, descriptions, tech badges
   - Gold "View Project" buttons with glow
8. **Contact** (`components/Contact.tsx`)
   - Form with Name, Email, Message fields
   - Form validation with React Hook Form
   - Email integration (Formspree/EmailJS)
   - Social links (LinkedIn, GitHub, Email)
   - "The journey doesn't end here" quote
   - Gondor seal decorative element
9. **Footer** (`components/Footer.tsx`)
   - Quick navigation links
   - Copyright © 2025 Ahmad Ibrahim
   - "Built with Next.js & TailwindCSS" credit

### Phase 3: LOTR Theming & Interactive Elements
1. **Custom LOTR Icons** (`components/lotr/Icon.tsx`)
   - Design/source SVG icons:
     - Sword (Python)
     - Shield (Testing/Security)
     - Tower (Cloud/Architecture)
     - Scroll (React/Frontend)
     - Ring (Full-Stack/Integration)
   - Create reusable Icon component with props
2. **Quote Component** (`components/lotr/Quote.tsx`)
   - Reusable component for LOTR quotes
   - Elegant typography styling
   - Subtle decorative elements
3. **Particle Background** (`components/lotr/ParticleBackground.tsx`)
   - Floating star/light particles
   - Subtle animation (slow movement)
   - Performance optimized with canvas or CSS
4. **Music Player** (`components/lotr/MusicPlayer.tsx`)
   - "Listen while you scroll" toggle button
   - Ambient LOTR-inspired audio (royalty-free)
   - Mute/unmute control
   - Volume control (start at low volume)
   - Persist state in localStorage
5. **Framer Motion Animations**
   - Scroll-triggered fade-in/slide-up
   - Parallax effect on hero section
   - Smooth transitions between sections
   - Hover effects on cards (subtle gold glow)

### Phase 4: Content Population
1. **Create content data** (`lib/content.ts`)
   - Work experience array (3 positions with bullets)
   - Projects array (3-4 projects with all details)
   - Skills categorized by specialty
   - LOTR quotes object
   - Social links
   - Education & certifications
2. **Add assets to `/public`**:
   - Copy resume PDF from `Prompt Files/Ahmad Ibrahim.pdf` → `public/resume.pdf`
   - Add professional photo (profile image)
   - Add project screenshots/mockups (create or use placeholders)
   - Add LOTR SVG icons to `public/icons/`
   - Add ambient music file to `public/music/` (if using music feature)
3. **Integrate content** into all components
4. **SEO optimization**:
   - Add meta tags in `app/layout.tsx`
   - Title: "Ahmad Ibrahim | Software Developer"
   - Description highlighting skills and experience
   - Open Graph tags for social sharing
   - Favicon (white tree of Gondor?)

### Phase 5: Responsiveness & Testing
1. **Mobile-first styling**
   - Test all breakpoints: mobile (< 640px), tablet (768px), desktop (1024px+)
   - Ensure hamburger menu works on mobile
   - Stack sections vertically on mobile
   - Adjust font sizes for readability
2. **Image optimization**
   - Use Next.js `<Image>` component for all images
   - Lazy load project screenshots
   - Optimize SVGs
3. **Cross-browser testing**
   - Test on Chrome, Firefox, Safari, Edge
   - Check mobile browsers (iOS Safari, Chrome Mobile)
4. **Performance audit**
   - Run Lighthouse audit
   - Aim for 90+ performance score
   - Optimize bundle size
   - Enable Next.js image optimization

### Phase 6: Deployment
1. **Create GitHub repository**
   - Initialize git: `git init`
   - Create `.gitignore` (Next.js default)
   - First commit with all files
   - Push to new GitHub repo
2. **Deploy to Vercel**
   - Sign up/login to Vercel
   - Import GitHub repository
   - Configure build settings (auto-detected for Next.js)
   - Deploy to production
   - Get `your-site.vercel.app` URL
3. **Custom domain** (optional)
   - Purchase domain (ahmadibrahim.dev or similar)
   - Configure DNS in Vercel dashboard
   - Enable HTTPS (automatic)
4. **Post-deployment checks**
   - Test all links and forms
   - Verify resume PDF download works
   - Check contact form email delivery
   - Test on multiple devices
5. **Analytics** (optional)
   - Add Vercel Analytics or Google Analytics
   - Track visitor engagement

### Phase 7: Polish & Iteration
1. **Gather feedback** from friends, mentors, peers
2. **Refine content** based on feedback
3. **Adjust animations** if too distracting or not enough
4. **A/B test** contact form conversion
5. **Update regularly** with new projects and experience

## Deliverables

✅ Fully responsive personal portfolio website
✅ Gondor Noble dark theme with professional LOTR touches
✅ 8 main sections: Hero, About, Education, Experience, Skills, Projects, Contact, Footer
✅ Interactive elements: animations, optional music, smooth scroll, particle effects
✅ Custom LOTR iconography and strategic quote placement
✅ Contact form with email integration
✅ Deployed live on Vercel with HTTPS
✅ GitHub repository for version control
✅ PDF resume download link
✅ SEO optimized with meta tags
✅ Mobile-responsive across all devices
✅ 90+ Lighthouse performance score

## Timeline Estimate

**Total Time**: 2-3 days of focused development

**Breakdown**:
- Phase 1 (Setup): 2-3 hours
- Phase 2 (Core Components): 8-10 hours
- Phase 3 (LOTR Theming): 4-6 hours
- Phase 4 (Content): 3-4 hours
- Phase 5 (Responsiveness): 3-4 hours
- Phase 6 (Deployment): 1-2 hours
- Phase 7 (Polish): 2-3 hours

**Note**: Timeline assumes familiarity with React/Next.js (which Ahmad has from Sistahology internship)

## User Preferences from Planning Discussion

- **Theme Intensity**: Subtle & Professional (not overwhelming)
- **LOTR Aesthetic**: Gondor Noble (regal, refined - dark grays, gold accents)
- **Tech Stack**: Next.js + TailwindCSS (recommended based on experience)
- **Interactive Features**: All selected
  - Animated elements (particles, transitions)
  - LOTR quotes in strategic locations
  - Custom LOTR iconography
  - Optional background music toggle

## Implementation Progress

### Completed Features

#### Phase 1: Project Setup ✅
- [x] Next.js 15.1.6 initialized with TypeScript, TailwindCSS, App Router
- [x] Gondor theme configured in `tailwind.config.ts`
- [x] Dependencies installed: framer-motion, react-hook-form, react-icons, @formspree/react
- [x] Google Fonts configured: Cinzel (headings), Inter (body), JetBrains Mono (code)
- [x] Base directory structure created

#### Phase 2: Core Components ✅
- [x] Navigation.tsx - Sticky header with smooth scroll
- [x] Hero.tsx - Name, tagline, Gandalf quote, CTA with particle background
- [x] About.tsx - Professional bio, skills overview with LOTR icons, stats
- [x] Education.tsx - B.Sc degree, certifications with architectural dividers
- [x] Experience.tsx - Timeline with 3 positions, Galadriel quote
- [x] Skills.tsx - 3 categorized skill sections with LOTR icons
- [x] Projects.tsx - 4 project cards with Sam Gamgee quote
- [x] Contact.tsx - Contact form with Formspree, social links, Gandor seal
- [x] Footer.tsx - Quick links, contact info, LOTR easter egg

#### Phase 3: LOTR Theming & Interactive Elements ✅
- [x] Custom LOTR Icon component (`components/lotr/Icon.tsx`)
  - Sword, Scroll, Tower, Shield, Ring, Castle icons using react-icons
- [x] Quote component (`components/lotr/Quote.tsx`)
- [x] Particle Background (`components/lotr/ParticleBackground.tsx`)
- [x] Music Player (`components/lotr/MusicPlayer.tsx`) - Implemented, pending audio file
- [x] Framer Motion animations throughout
  - Scroll-triggered fade-in/slide-up
  - Parallax on hero
  - Smooth transitions
  - Hover effects with gold glow

#### Phase 4: Content Organization ✅
- [x] **lib/content.ts** - Centralized content management
  - Personal info with bio journey
  - Social links (LinkedIn, GitHub, Email)
  - Work experience (3 positions with full details)
  - Education (degree + 2 certifications)
  - Skills (3 categories: Test Automation, Full-Stack, Cloud & DevOps)
  - Projects (4 projects with descriptions and tech stacks)
  - LOTR quotes for all sections
  - Footer content
  - SEO metadata
  - TypeScript interfaces for all content types
- [x] **lib/utils.ts** - Utility functions
  - Navigation & scrolling helpers
  - Form validation (email, required, minLength)
  - Date & time formatting
  - String utilities (truncate, kebabCase, capitalize)
  - Array utilities (chunk, shuffle)
  - Debounce & throttle functions
  - Local storage helpers
  - Clipboard utilities

#### Phase 5: Asset Organization ✅
- [x] **public/** directory structure created
  - `public/images/projects/` - For project screenshots
  - `public/icons/lotr/` - For custom SVG icons (future)
  - `public/music/` - For ambient music (future)
- [x] **public/README.md** - Asset organization documentation
  - Directory structure
  - Asset guidelines
  - Checklist for required assets
  - Instructions for adding new assets

### Pending Items

#### Assets Needed
- [ ] Copy resume PDF: `cp "Prompt Files/Ahmad Ibrahim.pdf" public/resume.pdf`
- [ ] Add project screenshots (4 images at 1200x800px)
  - Sistahology Journaling App
  - Gateway Automation Tool
  - TR-181 Data Model Converter
  - Personal Portfolio
- [ ] Optional: Custom LOTR SVG icons
- [ ] Optional: Royalty-free ambient music file
- [ ] Optional: Open Graph image for social sharing
- [ ] Optional: Favicon (White Tree of Gondor)

#### Component Updates
Components currently have hardcoded content and need to import from `lib/content.ts`:
- [ ] **Hero.tsx** - Import `personalInfo`, `quotes.hero`
- [ ] **About.tsx** - Import `personalInfo.bio`, `aboutSkills`, `aboutStats`, `funFact`
- [ ] **Education.tsx** - Import `education`
- [ ] **Experience.tsx** - Import `experiences`, `quotes.experience`
- [ ] **Skills.tsx** - Import `skillCategories`, `additionalSkills`
- [ ] **Projects.tsx** - Import `projects`, `quotes.projects`
- [ ] **Contact.tsx** - Import `socialLinks`, `quotes.contact`, `personalInfo.location`
- [ ] **Footer.tsx** - Import `footerLinks`, `footerDescription`, `socialLinks`, `quotes.footer`

#### Phase 6: Deployment (Pending)
- [ ] Initialize git repository
- [ ] Create .gitignore for Next.js
- [ ] First commit
- [ ] Push to GitHub
- [ ] Deploy to Vercel
- [ ] Configure custom domain (optional)
- [ ] Post-deployment testing

#### Phase 7: Polish (Future)
- [ ] Gather feedback
- [ ] Refine animations
- [ ] Test contact form delivery
- [ ] Add analytics (optional)
- [ ] Performance optimization

### Current Repository State

**Working Directory**: `/Users/Ahmad/Work/Projects/personal_website`

**Tech Stack**:
- Next.js 15.1.6
- React 19.0.0
- TypeScript 5
- TailwindCSS 3.4.1
- Framer Motion 12.23.24
- React Hook Form 7.65.0
- Formspree React 3.0.0

**Scripts Available**:
- `npm run dev` - Start development server (uses Turbopack)
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript compiler

**Content Management**:
All content is now centralized in `lib/content.ts`. To update portfolio content (experience, projects, skills, quotes), edit this single file. TypeScript interfaces ensure type safety.

**Utility Functions**:
Common utilities available in `lib/utils.ts` including form validation, scroll helpers, date formatting, and more.

### Next Steps

1. **Copy resume PDF** from `Prompt Files/Ahmad Ibrahim.pdf` to `public/resume.pdf`
2. **Update components** to import content from `lib/content.ts` instead of hardcoded data
3. **Add project screenshots** to `public/images/projects/`
4. **Test contact form** with actual Formspree ID (replace `'YOUR_FORMSPREE_ID'` in Contact.tsx)
5. **Deploy to Vercel** once ready

## Future Enhancements

Potential additions after initial launch:
- Blog section for technical writing
- Dark/light mode toggle (currently dark only)
- Project filtering by tech stack
- Testimonials section
- Analytics integration (Vercel Analytics or Google Analytics)
- Additional certifications as earned
- More projects as completed
