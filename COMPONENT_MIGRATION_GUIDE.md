# Component Migration Guide

This guide documents how to update each component to import content from `lib/content.ts` instead of using hardcoded data.

## Migration Overview

All components currently have content hardcoded within them. This guide provides the exact changes needed to migrate to the centralized content management system in `lib/content.ts`.

---

## 1. Hero.tsx

**Current State**: Hardcoded name, tagline, and quote

**Required Changes**:

```typescript
// Add import at top
import { personalInfo, quotes } from '@/lib/content';

// Replace line 35 (name)
Ahmad Ibrahim
// With:
{personalInfo.name}

// Replace line 46 (tagline)
Software Developer | Test Automation Engineer
// With:
{personalInfo.tagline}

// Replace lines 65-67 (quote)
<Quote
  text="All we have to decide is what to do with the time that is given us"
  author="Gandalf"
/>
// With:
<Quote
  text={quotes.hero.text}
  author={quotes.hero.author}
/>
```

**Import Statement**:
```typescript
import { personalInfo, quotes } from '@/lib/content';
```

**Lines to Update**: 35, 46, 65-67

---

## 2. About.tsx

**Current State**: Hardcoded bio, skills array, and stats

**Required Changes**:

```typescript
// Add import at top
import { personalInfo, aboutSkills, aboutStats, funFact } from '@/lib/content';

// Replace lines 6-11 (skills array)
const skills = [
  { icon: 'sword' as const, label: 'Python & Test Automation' },
  { icon: 'scroll' as const, label: 'React & TypeScript' },
  { icon: 'tower' as const, label: 'Azure Cloud Services' },
  { icon: 'shield' as const, label: 'System Security & Testing' },
];
// With:
// Delete this entire array - will import from content.ts

// Replace line 46 (Oman reference)
<span className="text-gondor-gold font-semibold">Muscat, Oman</span>
// With:
<span className="text-gondor-gold font-semibold">{personalInfo.bio.origin}</span>

// Replace line 48 (Seattle reference)
<span className="text-gondor-gold font-semibold"> Seattle, Washington</span>
// With:
<span className="text-gondor-gold font-semibold"> {personalInfo.bio.currentLocation}</span>

// Replace lines 45-50 (first paragraph)
My journey in software development began in <span className="text-gondor-gold font-semibold">Muscat, Oman</span>,
where I earned my B.Sc in Computer Science & Information Technology. The path led me to
<span className="text-gondor-gold font-semibold"> Seattle, Washington</span>, where I&apos;ve grown from network administration
to software engineering.
// With:
{personalInfo.bio.journey[0]}

// Replace lines 52-57 (second paragraph)
// With:
{personalInfo.bio.journey[1]}

// Replace lines 59-63 (third paragraph)
// With:
{personalInfo.bio.journey[2]}

// Replace line 84 (skills map)
{skills.map((skill, index) => (
// With:
{aboutSkills.map((skill, index) => (

// Replace line 109 (years stat)
<div className="font-cinzel text-3xl text-gondor-gold mb-2">3+</div>
// With:
<div className="font-cinzel text-3xl text-gondor-gold mb-2">{aboutStats.years}</div>

// Replace line 113 (projects stat)
<div className="font-cinzel text-3xl text-gondor-gold mb-2">10+</div>
// With:
<div className="font-cinzel text-3xl text-gondor-gold mb-2">{aboutStats.projects}</div>

// Replace line 117 (tech stacks stat)
<div className="font-cinzel text-3xl text-gondor-gold mb-2">5+</div>
// With:
<div className="font-cinzel text-3xl text-gondor-gold mb-2">{aboutStats.techStacks}</div>

// Replace lines 67-69 (fun fact)
<span className="text-gondor-gold font-cinzel">Fun Fact:</span> When I&apos;m not coding, you&apos;ll find me exploring
the rich lore of Middle-earth or sipping on Adeni chai.
// With:
<span className="text-gondor-gold font-cinzel">Fun Fact:</span> {funFact}
```

**Import Statement**:
```typescript
import { personalInfo, aboutSkills, aboutStats, funFact } from '@/lib/content';
```

**Lines to Update**: 6-11 (delete), 45-69, 84, 109, 113, 117

---

## 3. Education.tsx

**Current State**: Hardcoded education object

**Required Changes**:

```typescript
// Add import at top
import { education } from '@/lib/content';

// Delete lines 6-31 (entire education object)
const education = {
  // ... entire object
};
// This will now be imported from content.ts

// No other changes needed - component already uses `education` variable
```

**Import Statement**:
```typescript
import { education } from '@/lib/content';
```

**Lines to Update**: 6-31 (delete entire object)

---

## 4. Experience.tsx

**Current State**: Hardcoded experiences array and quote

**Required Changes**:

```typescript
// Add import at top
import { experiences, quotes } from '@/lib/content';

// Delete lines 6-43 (entire experiences array)
const experiences = [
  // ... entire array
];
// This will now be imported from content.ts

// Replace lines 75-78 (quote)
<Quote
  text="Even the smallest person can change the course of the future"
  author="Galadriel"
/>
// With:
<Quote
  text={quotes.experience.text}
  author={quotes.experience.author}
/>
```

**Import Statement**:
```typescript
import { experiences, quotes } from '@/lib/content';
```

**Lines to Update**: 6-43 (delete), 75-78

---

## 5. Skills.tsx

**Current State**: Hardcoded skillCategories array

**Required Changes**:

```typescript
// Add import at top
import { skillCategories, additionalSkills } from '@/lib/content';

// Delete lines 6-43 (entire skillCategories array)
const skillCategories = [
  // ... entire array
];
// This will now be imported from content.ts

// Replace line 132 (additional skills array)
{['Git', 'C#', 'Java', 'Active Directory', 'VPN Configuration', 'System Security', 'API Design'].map((tech) => (
// With:
{additionalSkills.map((tech) => (
```

**Import Statement**:
```typescript
import { skillCategories, additionalSkills } from '@/lib/content';
```

**Lines to Update**: 6-43 (delete), 132

---

## 6. Projects.tsx

**Current State**: Hardcoded projects array and quote

**Required Changes**:

```typescript
// Add import at top
import { projects, quotes } from '@/lib/content';

// Delete lines 7-40 (entire projects array)
const projects = [
  // ... entire array
];
// This will now be imported from content.ts

// Replace lines 72-75 (quote)
<Quote
  text="It's the job that's never started that takes longest to finish"
  author="Sam Gamgee"
/>
// With:
<Quote
  text={quotes.projects.text}
  author={quotes.projects.author}
/>
```

**Import Statement**:
```typescript
import { projects, quotes } from '@/lib/content';
```

**Lines to Update**: 7-40 (delete), 72-75

---

## 7. Contact.tsx

**Current State**: Hardcoded socialLinks array, quote, and location

**Required Changes**:

```typescript
// Add import at top
import { socialLinks as contentSocialLinks, quotes, personalInfo } from '@/lib/content';

// Delete lines 15-34 (entire socialLinks array)
const socialLinks = [
  // ... entire array
];
// This will now be imported from content.ts

// Note: Rename import to avoid conflict with component variable
// At line 15, replace:
const socialLinks = [
// With nothing (delete the entire array)

// Replace line 83 (quote)
<Quote text="The journey doesn't end here" author="Gandalf" />
// With:
<Quote text={quotes.contact.text} author={quotes.contact.author} />

// Replace line 228 (location)
<p className="text-gondor-silver">Redmond, Washington</p>
// With:
<p className="text-gondor-silver">{personalInfo.location}</p>

// Replace line 236 (social links map)
{socialLinks.map((social) => (
// With:
{contentSocialLinks.map((social) => (

// Note: The socialLinks from content.ts has different structure
// Need to update the mapping logic or adjust content.ts structure to match
// Current component expects: { name, icon, url, color }
// content.ts provides: { name, url, username? }
```

**Special Note**: The `socialLinks` in `lib/content.ts` has a simplified structure. You may need to either:

**Option A**: Keep the socialLinks array in Contact.tsx as-is (it's component-specific with icons and colors)

**Option B**: Enhance `lib/content.ts` socialLinks to include icon and color info

**Recommended**: Keep socialLinks in component (it's UI-specific), but import location and quotes.

**Simplified Import**:
```typescript
import { quotes, personalInfo } from '@/lib/content';
```

**Lines to Update**: 83, 228

---

## 8. Footer.tsx

**Current State**: Hardcoded footerLinks array, social links, and content

**Required Changes**:

```typescript
// Add import at top
import { footerLinks as contentFooterLinks, socialLinks, personalInfo, quotes, footerDescription } from '@/lib/content';

// Delete lines 6-12 (entire footerLinks array)
const footerLinks = [
  // ... entire array
];
// This will now be imported from content.ts

// Replace line 54 (footerLinks map)
{footerLinks.map((link) => (
// With:
{contentFooterLinks.map((link) => (

// Replace lines 44-47 (description)
Software Developer specializing in test automation and full-stack development.
Building elegant solutions, one line of code at a time.
// With:
{footerDescription}

// Replace line 85 (email)
ahmadhibrahim316@gmail.com
// With:
{personalInfo.email}

// Replace line 92 (location)
Redmond, WA
// With:
{personalInfo.location}

// Replace line 95 (LinkedIn URL)
href="https://www.linkedin.com/in/ahmad-ibrahim316"
// With:
href={socialLinks.find(link => link.name === 'LinkedIn')?.url}

// Replace line 105 (GitHub URL)
href="https://github.com/AH316"
// With:
href={socialLinks.find(link => link.name === 'GitHub')?.url}

// Replace line 143 (footer quote)
&ldquo;Not all those who wander are lost&rdquo;
// With:
&ldquo;{quotes.footer.text}&rdquo;
```

**Import Statement**:
```typescript
import { footerLinks as contentFooterLinks, socialLinks, personalInfo, quotes, footerDescription } from '@/lib/content';
```

**Lines to Update**: 6-12 (delete), 44-47, 54, 85, 92, 95, 105, 143

---

## Migration Checklist

### Phase 1: Simple Migrations (No structural changes)
- [ ] **Education.tsx** - Just delete object, import from content
- [ ] **Experience.tsx** - Delete array and update quote
- [ ] **Skills.tsx** - Delete array and update additional skills
- [ ] **Projects.tsx** - Delete array and update quote

### Phase 2: Moderate Migrations (Multiple imports)
- [ ] **Hero.tsx** - Import personalInfo and quotes
- [ ] **Footer.tsx** - Import multiple content pieces

### Phase 3: Complex Migrations (Structural considerations)
- [ ] **About.tsx** - Update bio paragraphs, stats, and skills
- [ ] **Contact.tsx** - Decision on socialLinks structure

## Testing After Migration

After each component migration:

1. **Run type check**: `npm run type-check`
2. **Check for errors**: `npm run dev` and view in browser
3. **Verify content displays**: Check that all text appears correctly
4. **Test interactions**: Ensure links, forms, and animations still work

## Common Issues & Solutions

### Import Path Issues

If you see "Cannot find module '@/lib/content'":
- Use relative path: `import { ... } from '../lib/content'` or `import { ... } from '../../lib/content'`
- Or ensure `@` alias is configured in `tsconfig.json`

### Type Errors

If TypeScript complains about types:
- Check that imported variable names match exactly
- Verify icon types are correct (IconType union)
- Ensure all required fields are present in content.ts

### Content Not Displaying

If content doesn't show:
- Check browser console for errors
- Verify variable names in JSX match import names
- Ensure curly braces `{}` are used for dynamic content

## Rollback Plan

If migration causes issues:

```bash
# Revert specific component
git checkout components/ComponentName.tsx

# Or revert all component changes
git checkout components/
```

## Next Steps After Migration

1. Delete old hardcoded content from components
2. Update all content via `lib/content.ts` going forward
3. Consider adding CMS integration for non-technical content updates
4. Document any component-specific content that shouldn't be centralized

---

**Note**: This migration is optional but recommended for easier content management. Components will continue to work as-is with hardcoded content.

**Last Updated**: 2025-10-29
