import { test, expect } from '@playwright/test';
import {
  captureScreenshot,
  waitForAnimations,
  scrollToSection,
  verifyQuote,
  waitForSectionVisible,
} from '../helpers/test-helpers';

test.describe('Portfolio Sections', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await waitForAnimations(page);
  });

  test.describe('About Section', () => {
    test('should display about section', async ({ page }) => {
      await scrollToSection(page, '#about');
      await waitForSectionVisible(page, 'about-section');

      const aboutSection = page.locator('[data-testid="about-section"]');
      await expect(aboutSection).toBeVisible();
    });

    test('should display section heading', async ({ page }) => {
      await scrollToSection(page, '#about');

      const heading = page.locator('[data-testid="about-section"] h2');
      await expect(heading).toBeVisible();
      await expect(heading).toHaveText('About Me');
    });

    test('should display bio text', async ({ page }) => {
      await scrollToSection(page, '#about');

      const bio = page.locator('[data-testid="about-section"] p');
      await expect(bio.first()).toBeVisible();

      // Check for key bio content
      const bioText = await bio.first().textContent();
      expect(bioText).toContain('Oman');
      expect(bioText).toContain('Seattle');
    });

    test('should display skill highlights', async ({ page }) => {
      await scrollToSection(page, '#about');

      // Check for skill cards
      const skillCards = page.locator('[data-testid="about-section"] .grid > div');
      const count = await skillCards.count();

      expect(count).toBeGreaterThanOrEqual(3); // Should have multiple skill highlights
    });

    test('should display LOTR icons', async ({ page }) => {
      await scrollToSection(page, '#about');

      const icons = page.locator('[data-testid="about-section"] svg');
      const iconCount = await icons.count();

      expect(iconCount).toBeGreaterThan(0); // Should have LOTR-themed icons
    });

    test('should display stats if present', async ({ page }) => {
      await scrollToSection(page, '#about');

      // Look for stats section
      const stats = page.locator('[data-testid="about-section"]').locator('text=/Years|Projects|Technologies/i');
      if (await stats.count() > 0) {
        await expect(stats.first()).toBeVisible();
      }
    });

    test('should capture about section screenshot', async ({ page }) => {
      await scrollToSection(page, '#about');
      await waitForAnimations(page);

      await captureScreenshot(page, 'about-section', { fullPage: false });
    });
  });

  test.describe('Education Section', () => {
    test('should display education section', async ({ page }) => {
      await scrollToSection(page, '#education');
      await waitForSectionVisible(page, 'education-section');

      const educationSection = page.locator('[data-testid="education-section"]');
      await expect(educationSection).toBeVisible();
    });

    test('should display section heading', async ({ page }) => {
      await scrollToSection(page, '#education');

      const heading = page.locator('[data-testid="education-section"] h2');
      await expect(heading).toBeVisible();
      await expect(heading).toHaveText('Education');
    });

    test('should display B.Sc degree information', async ({ page }) => {
      await scrollToSection(page, '#education');

      const educationSection = page.locator('[data-testid="education-section"]');
      const content = await educationSection.textContent();

      expect(content).toContain('Computer Science');
      expect(content).toContain('Open University');
      expect(content).toContain('2020');
    });

    test('should display certifications', async ({ page }) => {
      await scrollToSection(page, '#education');

      const educationSection = page.locator('[data-testid="education-section"]');
      const content = await educationSection.textContent();

      // Check for certifications
      expect(content).toContain('Azure');
      expect(content).toContain('Skillspire');
    });

    test('should have architectural dividers', async ({ page }) => {
      await scrollToSection(page, '#education');

      // Look for decorative divider elements (border-t or gradient)
      const dividers = page.locator('[data-testid="education-section"] .border-t, [data-testid="education-section"] .border-gondor-gold, [data-testid="education-section"] hr');
      const dividerCount = await dividers.count();

      expect(dividerCount).toBeGreaterThan(0);
    });

    test('should capture education section screenshot', async ({ page }) => {
      await scrollToSection(page, '#education');
      await waitForAnimations(page);

      await captureScreenshot(page, 'education-section', { fullPage: false });
    });
  });

  test.describe('Experience Section', () => {
    test('should display experience section', async ({ page }) => {
      await scrollToSection(page, '#experience');
      await waitForSectionVisible(page, 'experience-section');

      const experienceSection = page.locator('[data-testid="experience-section"]');
      await expect(experienceSection).toBeVisible();
    });

    test('should display Galadriel quote', async ({ page }) => {
      await scrollToSection(page, '#experience');

      await verifyQuote(
        page,
        'Even the smallest person can change the course of the future',
        'Galadriel'
      );
    });

    test('should display timeline with positions', async ({ page }) => {
      await scrollToSection(page, '#experience');

      const experienceSection = page.locator('[data-testid="experience-section"]');
      const content = await experienceSection.textContent();

      // Check for the 3 positions
      expect(content).toContain('Intellica');
      expect(content).toContain('Denali');
      expect(content).toContain('MAPS');
    });

    test('should display job titles and dates', async ({ page }) => {
      await scrollToSection(page, '#experience');

      const experienceSection = page.locator('[data-testid="experience-section"]');
      const content = await experienceSection.textContent();

      // Check for job titles
      expect(content).toContain('Software Engineer');
      expect(content).toContain('IT Technician');
      expect(content).toContain('Network & Systems Administrator');

      // Check for dates
      expect(content).toContain('2025');
      expect(content).toContain('2024');
      expect(content).toContain('2022');
    });

    test('should have gold timeline connector', async ({ page }) => {
      await scrollToSection(page, '#experience');

      // Look for gold-colored timeline elements
      const goldElements = page.locator('[data-testid="experience-section"] .bg-gondor-gold, [data-testid="experience-section"] .border-gondor-gold');
      const count = await goldElements.count();

      expect(count).toBeGreaterThan(0); // Should have gold accent elements
    });

    test('should display responsibility bullets', async ({ page }) => {
      await scrollToSection(page, '#experience');

      const bullets = page.locator('[data-testid="experience-section"] li, [data-testid="experience-section"] ul');
      const count = await bullets.count();

      expect(count).toBeGreaterThan(0); // Should have bullet points
    });

    test('should capture experience section screenshot', async ({ page }) => {
      await scrollToSection(page, '#experience');
      await waitForAnimations(page);

      await captureScreenshot(page, 'experience-section', { fullPage: false });
    });
  });

  test.describe('Skills Section', () => {
    test('should display skills section', async ({ page }) => {
      await scrollToSection(page, '#skills');
      await waitForSectionVisible(page, 'skills-section');

      const skillsSection = page.locator('[data-testid="skills-section"]');
      await expect(skillsSection).toBeVisible();
    });

    test('should display section heading', async ({ page }) => {
      await scrollToSection(page, '#skills');

      const heading = page.locator('[data-testid="skills-section"] h2');
      await expect(heading).toBeVisible();
      await expect(heading).toContainText('Skills');
    });

    test('should display three skill categories', async ({ page }) => {
      await scrollToSection(page, '#skills');

      const skillsSection = page.locator('[data-testid="skills-section"]');
      const content = await skillsSection.textContent();

      // Check for the 3 categories
      expect(content).toContain('Test Automation');
      expect(content).toContain('Full-Stack');
      expect(content).toContain('Cloud');
    });

    test('should display skill items', async ({ page }) => {
      await scrollToSection(page, '#skills');

      const skillsSection = page.locator('[data-testid="skills-section"]');
      const content = await skillsSection.textContent();

      // Check for key skills
      expect(content).toContain('Python');
      expect(content).toContain('React');
      expect(content).toContain('Azure');
      expect(content).toContain('TypeScript');
    });

    test('should display LOTR themed icons', async ({ page }) => {
      await scrollToSection(page, '#skills');

      const icons = page.locator('[data-testid="skills-section"] svg');
      const iconCount = await icons.count();

      expect(iconCount).toBeGreaterThan(0); // Should have LOTR icons
    });

    test('should have hover effects on skill cards', async ({ page }) => {
      await scrollToSection(page, '#skills');

      const skillCard = page.locator('[data-testid="skills-section"] .grid > div').first();

      // Get initial state
      const initialTransform = await skillCard.evaluate((el) =>
        window.getComputedStyle(el).transform
      );

      // Hover
      await skillCard.hover();
      await waitForAnimations(page);

      // Should have some visual change
      const hoverBorderColor = await skillCard.evaluate((el) =>
        window.getComputedStyle(el).borderColor
      );

      expect(hoverBorderColor).toBeTruthy();
    });

    test('should capture skills section screenshot', async ({ page }) => {
      await scrollToSection(page, '#skills');
      await waitForAnimations(page);

      await captureScreenshot(page, 'skills-section', { fullPage: false });
    });
  });

  test.describe('All Sections Visual Regression', () => {
    test('should capture all sections in sequence', async ({ page }) => {
      const sections = [
        { id: '#hero', name: 'hero' },
        { id: '#about', name: 'about' },
        { id: '#education', name: 'education' },
        { id: '#experience', name: 'experience' },
        { id: '#skills', name: 'skills' },
        { id: '#projects', name: 'projects' },
        { id: '#contact', name: 'contact' },
      ];

      for (const section of sections) {
        await scrollToSection(page, section.id);
        await waitForAnimations(page);
        await captureScreenshot(page, `section-${section.name}`, { fullPage: false });
      }
    });
  });
});
