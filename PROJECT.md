# Ahmad Ibrahim Portfolio - Project Reference

Quick reference guide for development and maintenance of Ahmad Ibrahim's personal portfolio website.

## Project Overview

**Purpose**: Personal portfolio showcasing software development skills, experience, and projects
**Theme**: Gondor Noble (Lord of the Rings inspired) - Subtle, professional, dark theme
**Tech Stack**: Next.js 15 + React 19 + TypeScript + TailwindCSS + Framer Motion
**Working Directory**: `/Users/Ahmad/Work/Projects/personal_website`

## Quick Links

- **Design Reference**: https://faizandhankwala.com/
- **Resume Source**: `Prompt Files/Ahmad Ibrahim.pdf`
- **LinkedIn**: https://www.linkedin.com/in/ahmad-ibrahim316
- **GitHub**: https://github.com/AH316
- **Email**: ahmadhibrahim316@gmail.com

## Directory Structure

```
personal_website/
├── app/
│   ├── layout.tsx              # Root layout with fonts & theme
│   ├── page.tsx                # Main landing page (all sections)
│   ├── globals.css             # TailwindCSS + custom styles
│   └── favicon.ico
├── components/
│   ├── Hero.tsx                # Hero with name, tagline, quote
│   ├── About.tsx               # Bio, skills, stats
│   ├── Education.tsx           # Degree & certifications
│   ├── Experience.tsx          # Work history timeline
│   ├── Skills.tsx              # Categorized tech skills
│   ├── Projects.tsx            # Project showcase cards
│   ├── Contact.tsx             # Contact form + social links
│   ├── Navigation.tsx          # Sticky header
│   ├── Footer.tsx              # Footer with links
│   └── lotr/
│       ├── Icon.tsx            # LOTR-themed icons
│       ├── Quote.tsx           # Quote display component
│       ├── ParticleBackground.tsx  # Animated particles
│       └── MusicPlayer.tsx     # Optional background music
├── lib/
│   ├── content.ts              # ⭐ ALL CONTENT DATA (centralized)
│   └── utils.ts                # Utility functions
├── public/
│   ├── resume.pdf              # Ahmad's resume (TO BE ADDED)
│   ├── images/projects/        # Project screenshots (TO BE ADDED)
│   ├── icons/lotr/             # Custom SVGs (future)
│   └── music/                  # Ambient music (future)
├── Prompt Files/
│   ├── Ahmad Ibrahim.pdf       # Resume source
│   └── Links.txt               # Social links
├── CLAUDE.md                   # AI development guide
├── PROJECT.md                  # This file
└── package.json
```

## Component Hierarchy

```
app/page.tsx
├── Navigation
├── Hero
│   ├── ParticleBackground
│   └── Quote (Gandalf)
├── About
│   └── Icon (sword, scroll, tower, shield)
├── Education
├── Experience
│   └── Quote (Galadriel)
├── Skills
│   └── Icon (various)
├── Projects
│   └── Quote (Sam Gamgee)
├── Contact
│   └── Quote (Gandalf)
└── Footer
    └── Quote (Tolkien) [Easter egg]
```

## Content Management

### Primary Content Source: `lib/content.ts`

All portfolio content is centralized in this single file. Update here to change:

**Exported Data**:
- `personalInfo` - Name, tagline, bio, location, email
- `socialLinks` - LinkedIn, GitHub, Email
- `aboutSkills` - 4 core skills with icons
- `aboutStats` - Years, projects, tech stacks count
- `funFact` - Personal fun fact
- `education` - Degree + certifications
- `experiences` - 3 work positions with responsibilities
- `skillCategories` - 3 categories with skills
- `additionalSkills` - Extra technologies
- `projects` - 4 projects with descriptions
- `quotes` - LOTR quotes for each section
- `footerLinks` - Navigation links
- `footerDescription` - Footer tagline
- `seoMetadata` - SEO & meta tags

**TypeScript Interfaces**:
- `PersonalInfo`, `SocialLink`, `Experience`, `Education`, `Certification`
- `Skill`, `SkillCategory`, `Project`, `Quote`
- `IconType` - Type-safe icon names
- `AboutSkill`, `AboutStats`

### Utility Functions: `lib/utils.ts`

**Categories**:
1. **Navigation & Scrolling**: `smoothScrollTo()`, `scrollToTop()`, `isInViewport()`
2. **Form Validation**: `validateEmail()`, `validateRequired()`, `validateMinLength()`
3. **Date & Time**: `formatDateRange()`, `getCurrentYear()`, `calculateYearsOfExperience()`
4. **String Utilities**: `truncate()`, `toKebabCase()`, `capitalize()`
5. **Array Utilities**: `chunk()`, `shuffle()`
6. **Performance**: `debounce()`, `throttle()`
7. **Local Storage**: `getFromStorage()`, `setToStorage()`, `removeFromStorage()`
8. **Misc**: `cn()` (classnames), `copyToClipboard()`

## Theme & Design System

### Gondor Color Palette (Tailwind Config)

```javascript
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

- **Headings**: Cinzel (serif, elegant, regal) - `font-cinzel`
- **Body**: Inter (clean, readable) - `font-inter`
- **Code**: JetBrains Mono - `font-jetbrains`

### Icons

**LOTR Icon Types** (used throughout):
- `sword` - Python, test automation
- `scroll` - React, TypeScript, APIs, documentation
- `tower` - Cloud, architecture, infrastructure
- `shield` - Security, testing, protection
- `ring` - Full-stack, integration
- `castle` - Windows Server, enterprise

**Current Implementation**: Using react-icons library
**Future**: Can replace with custom SVGs in `public/icons/lotr/`

## Key Features

### Interactive Elements

1. **Particle Background** - Floating animated particles on hero section
2. **Smooth Scroll** - Navigation smoothly scrolls to sections
3. **Framer Motion Animations** - Scroll-triggered fade-in, parallax, hover effects
4. **LOTR Quotes** - Strategic placement in Hero, Experience, Projects, Contact
5. **Music Player** - Optional background music toggle (component ready, needs audio file)
6. **Form Validation** - React Hook Form with custom validation
7. **Responsive Design** - Mobile-first, works on all devices

### Section Breakdown

| Section | Quote | Key Features |
|---------|-------|--------------|
| Hero | Gandalf - "All we have to decide..." | Particle bg, parallax, CTA button |
| About | None | Bio journey, 4 skills, stats (3+, 10+, 5+) |
| Education | None | Degree card, 2 certifications, dividers |
| Experience | Galadriel - "Even the smallest person..." | Timeline, 3 positions, alternating layout |
| Skills | None | 3 categories, additional skills bar |
| Projects | Sam Gamgee - "Job never started..." | 4 cards, tech badges, GitHub links |
| Contact | Gandalf - "Journey doesn't end..." | Form, social links, Gondor seal |
| Footer | Tolkien - "Not all who wander..." | Links, copyright, tech credit |

## Development Workflow

### Common Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Type checking
npm run type-check

# Linting
npm run lint

# Production server (after build)
npm start
```

### Making Content Updates

1. **Update text/data**: Edit `lib/content.ts`
2. **Update styling**: Edit component files or `tailwind.config.ts`
3. **Add new utilities**: Add to `lib/utils.ts`
4. **Test changes**: `npm run dev` and check http://localhost:3000
5. **Type check**: `npm run type-check` before committing

### Adding New Projects

Edit `lib/content.ts`:

```typescript
export const projects: Project[] = [
  // ... existing projects
  {
    title: 'New Project Name',
    description: 'Description here...',
    technologies: ['React', 'TypeScript', 'etc'],
    github: 'https://github.com/AH316/repo-name',
    demo: 'https://demo-url.com', // or null
    image: '/images/projects/new-project.jpg',
  },
];
```

Then add screenshot to `public/images/projects/new-project.jpg`

### Adding New Experience

Edit `lib/content.ts`:

```typescript
export const experiences: Experience[] = [
  {
    title: 'Job Title',
    company: 'Company Name',
    location: 'City, State',
    period: 'Month Year – Month Year',
    responsibilities: [
      'Achievement or responsibility 1',
      'Achievement or responsibility 2',
      // ... more bullets
    ],
  },
  // ... existing experiences
];
```

## Deployment Checklist

### Pre-Deployment

- [ ] Copy resume: `cp "Prompt Files/Ahmad Ibrahim.pdf" public/resume.pdf`
- [ ] Add project screenshots to `public/images/projects/`
- [ ] Update Formspree ID in `Contact.tsx` (replace `'YOUR_FORMSPREE_ID'`)
- [ ] Run `npm run build` to check for errors
- [ ] Run `npm run type-check` to verify TypeScript
- [ ] Test all sections and links locally

### Git Setup

```bash
# Initialize repository
git init

# Add all files
git add .

# First commit
git commit -m "Initial commit: Ahmad Ibrahim portfolio"

# Add remote (create repo on GitHub first)
git remote add origin https://github.com/AH316/personal-website.git

# Push to GitHub
git push -u origin main
```

### Vercel Deployment

1. Go to https://vercel.com and sign in with GitHub
2. Click "New Project"
3. Import the GitHub repository
4. Vercel auto-detects Next.js settings
5. Click "Deploy"
6. Wait for build to complete
7. Get deployment URL (e.g., `your-site.vercel.app`)

### Post-Deployment

- [ ] Test all pages and links on live site
- [ ] Verify resume PDF downloads correctly
- [ ] Test contact form submission
- [ ] Check mobile responsiveness
- [ ] Run Lighthouse audit (target 90+ performance)
- [ ] Test on multiple browsers
- [ ] Optional: Configure custom domain in Vercel

## Troubleshooting

### Common Issues

**Build fails with type errors**:
- Run `npm run type-check` to see exact errors
- Ensure all imports from `lib/content.ts` match exported names

**Contact form doesn't work**:
- Replace `'YOUR_FORMSPREE_ID'` in `Contact.tsx` with actual Formspree form ID
- Sign up at https://formspree.io to get a form ID

**Images not loading**:
- Ensure images are in `public/` directory
- Use paths starting with `/` (e.g., `/images/projects/project.jpg`)
- Check file names match exactly (case-sensitive)

**Animations not working**:
- Check browser console for Framer Motion errors
- Ensure `framer-motion` is installed: `npm install framer-motion`

**Styles not applying**:
- Run `npm run dev` and check for Tailwind errors
- Verify `tailwind.config.ts` has correct paths
- Check `app/globals.css` imports Tailwind directives

## Maintenance

### Regular Updates

**Monthly**:
- Update experience if job changes
- Add new projects as completed
- Update skills if learning new technologies

**As Needed**:
- Update resume PDF in `public/resume.pdf`
- Add certifications to `education.certifications`
- Refresh project screenshots

### Dependency Updates

```bash
# Check for outdated packages
npm outdated

# Update all dependencies
npm update

# Update Next.js specifically
npm install next@latest react@latest react-dom@latest
```

## Performance Optimization

### Current Optimizations

- ✅ Next.js automatic code splitting
- ✅ Server-side rendering (SSR)
- ✅ Image optimization with Next.js Image component
- ✅ Lazy loading via Framer Motion viewport triggers
- ✅ Debounced scroll handlers
- ✅ CSS optimized with TailwindCSS purge

### Future Optimizations

- [ ] Add next/image for all project images
- [ ] Implement lazy loading for MusicPlayer audio
- [ ] Add preloading for critical fonts
- [ ] Optimize ParticleBackground rendering
- [ ] Consider static site generation (SSG) for faster initial load

## Security Notes

### Environment Variables

If adding environment variables:
1. Create `.env.local` for local development
2. Add `.env.local` to `.gitignore`
3. Add variables to Vercel dashboard for production
4. Never commit API keys or secrets to Git

### Contact Form

- Using Formspree for form handling (no backend needed)
- Form data sent to ahmadhibrahim316@gmail.com
- Consider adding reCAPTCHA if spam becomes an issue

## Resources

### Documentation

- [Next.js Docs](https://nextjs.org/docs)
- [TailwindCSS Docs](https://tailwindcss.com/docs)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [React Hook Form](https://react-hook-form.com/)
- [Formspree Docs](https://help.formspree.io/)

### Design Inspiration

- Reference site: https://faizandhankwala.com/
- LOTR aesthetic: Subtle, professional, Gondor Noble theme

## Contact & Support

**Developer**: Ahmad Ibrahim
**Email**: ahmadhibrahim316@gmail.com
**GitHub**: https://github.com/AH316
**LinkedIn**: https://www.linkedin.com/in/ahmad-ibrahim316

---

**Last Updated**: 2025-10-29
**Version**: 1.0.0
