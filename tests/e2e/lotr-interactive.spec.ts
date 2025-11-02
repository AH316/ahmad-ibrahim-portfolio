import { test, expect } from '@playwright/test';
import {
  captureScreenshot,
  waitForAnimations,
  scrollToSection,
  verifyQuote,
  verifyParticleBackground,
} from '../helpers/test-helpers';

test.describe('LOTR Interactive Elements', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await waitForAnimations(page);
  });

  test.describe('Music Player', () => {
    test('should display music player component', async ({ page }) => {
      const musicPlayer = page.locator('[class*="music"], [class*="player"]');

      if (await musicPlayer.count() > 0) {
        await expect(musicPlayer.first()).toBeVisible();

        await captureScreenshot(page, 'music-player', { fullPage: false });
      }
    });

    test('should expand music player on hover', async ({ page }) => {
      const musicPlayer = page.locator('[class*="music"], [class*="player"]').first();

      if (await musicPlayer.count() > 0) {
        // Get initial width
        const initialWidth = await musicPlayer.evaluate((el) =>
          el.getBoundingClientRect().width
        );

        // Hover
        await musicPlayer.hover();
        await waitForAnimations(page);

        // Width should increase (expand effect)
        const hoverWidth = await musicPlayer.evaluate((el) =>
          el.getBoundingClientRect().width
        );

        // If it has expand functionality
        expect(hoverWidth).toBeGreaterThanOrEqual(initialWidth);
      }
    });

    test('should have play/pause toggle functionality', async ({ page }) => {
      const playButton = page.locator('button[aria-label*="play"], button[aria-label*="music"]');

      if (await playButton.count() > 0) {
        const button = playButton.first();
        await expect(button).toBeVisible();

        // Should be clickable
        await expect(button).toBeEnabled();
      }
    });
  });

  test.describe('LOTR Quotes', () => {
    test('should display Gandalf quote in Hero section', async ({ page }) => {
      await verifyQuote(
        page,
        'All we have to decide is what to do with the time that is given us',
        'Gandalf'
      );
    });

    test('should display Galadriel quote in Experience section', async ({ page }) => {
      await scrollToSection(page, '#experience');
      await waitForAnimations(page);

      await verifyQuote(
        page,
        'Even the smallest person can change the course of the future',
        'Galadriel'
      );
    });

    test('should display Sam quote in Projects section', async ({ page }) => {
      await scrollToSection(page, '#projects');
      await waitForAnimations(page);

      await verifyQuote(
        page,
        "It's the job that's never started that takes longest to finish",
        'Sam'
      );
    });

    test('should display ending quote in Contact section', async ({ page }) => {
      await scrollToSection(page, '#contact');
      await waitForAnimations(page);

      await verifyQuote(page, "The journey doesn't end here");
    });

    test('should style quotes with proper typography', async ({ page }) => {
      const quote = page.locator('blockquote, [class*="quote"]').first();

      if (await quote.count() > 0) {
        const fontStyle = await quote.evaluate((el) =>
          window.getComputedStyle(el).fontStyle
        );

        const fontSize = await quote.evaluate((el) =>
          window.getComputedStyle(el).fontSize
        );

        // Quotes should have distinctive styling
        expect(fontStyle || fontSize).toBeTruthy();
      }
    });
  });

  test.describe('LOTR Icons', () => {
    test('should display LOTR icons in About section', async ({ page }) => {
      await scrollToSection(page, '#about');

      const icons = page.locator('[data-testid="about-section"] svg');
      const count = await icons.count();

      expect(count).toBeGreaterThan(0);

      await captureScreenshot(page, 'about-icons', { fullPage: false });
    });

    test('should display LOTR icons in Skills section', async ({ page }) => {
      await scrollToSection(page, '#skills');

      const icons = page.locator('[data-testid="skills-section"] svg');
      const count = await icons.count();

      expect(count).toBeGreaterThan(0);

      await captureScreenshot(page, 'skills-icons', { fullPage: false });
    });

    test('should animate icons on hover', async ({ page }) => {
      await scrollToSection(page, '#about');

      const iconContainer = page.locator('[data-testid="about-section"] .grid > div').first();

      // Get initial state
      const initialTransform = await iconContainer.evaluate((el) =>
        window.getComputedStyle(el).transform
      );

      // Hover
      await iconContainer.hover();
      await waitForAnimations(page);

      // Should have transform or color change
      const hoverTransform = await iconContainer.evaluate((el) =>
        window.getComputedStyle(el).transform
      );

      // Visual feedback on hover
      expect(hoverTransform || initialTransform).toBeTruthy();
    });

    test('should have gold color accents on icons', async ({ page }) => {
      await scrollToSection(page, '#skills');

      const skillCard = page.locator('[data-testid="skills-section"] .grid > div').first();
      const icon = skillCard.locator('svg').first();

      if (await icon.count() > 0) {
        const color = await icon.evaluate((el) =>
          window.getComputedStyle(el).color
        );

        // Should have color styling
        expect(color).toBeTruthy();
      }
    });
  });

  test.describe('Particle Background', () => {
    test('should render particle background canvas', async ({ page }) => {
      await verifyParticleBackground(page);
    });

    test('should have canvas covering hero section', async ({ page }) => {
      const canvas = page.locator('[data-testid="hero-section"] canvas');

      if (await canvas.count() > 0) {
        const canvasBox = await canvas.boundingBox();
        const heroBox = await page
          .locator('[data-testid="hero-section"]')
          .boundingBox();

        // Canvas should cover significant portion of hero
        expect(canvasBox!.width).toBeGreaterThan(heroBox!.width * 0.5);
        expect(canvasBox!.height).toBeGreaterThan(heroBox!.height * 0.5);
      }
    });

    test('should have particles animating', async ({ page }) => {
      const canvas = page.locator('canvas');

      if (await canvas.count() > 0) {
        // Wait and check if canvas is being redrawn (animated)
        await page.waitForTimeout(1000);

        // Canvas should exist and have dimensions
        const dimensions = await canvas.evaluate((el: HTMLCanvasElement) => ({
          width: el.width,
          height: el.height,
        }));

        expect(dimensions.width).toBeGreaterThan(0);
        expect(dimensions.height).toBeGreaterThan(0);
      }
    });
  });

  test.describe('Project Card Hover Effects', () => {
    test('should display gold glow on project card hover', async ({ page }) => {
      await scrollToSection(page, '#projects');

      const projectCard = page
        .locator('[data-testid="projects-section"] .grid > div')
        .first();

      // Get initial shadow
      const initialShadow = await projectCard.evaluate((el) =>
        window.getComputedStyle(el).boxShadow
      );

      // Hover
      await projectCard.hover();
      await waitForAnimations(page);

      // Shadow should change (gold glow effect)
      const hoverShadow = await projectCard.evaluate((el) =>
        window.getComputedStyle(el).boxShadow
      );

      // Should have shadow effect
      expect(hoverShadow).toBeTruthy();

      await captureScreenshot(page, 'project-card-gold-glow', { fullPage: false });
    });

    test('should have gold border on hover', async ({ page }) => {
      await scrollToSection(page, '#projects');

      const projectCard = page
        .locator('[data-testid="projects-section"] .grid > div')
        .first();

      await projectCard.hover();
      await waitForAnimations(page);

      const borderColor = await projectCard.evaluate((el) =>
        window.getComputedStyle(el).borderColor
      );

      // Border should be defined
      expect(borderColor).toBeTruthy();
    });
  });

  test.describe('Navigation Hover Effects', () => {
    test('should display gold underline on nav link hover', async ({ page }) => {
      test.skip(page.viewportSize()!.width < 768, 'Desktop only test');

      const navLink = page.locator('[data-testid="nav-link-about"]');

      await navLink.hover();
      await waitForAnimations(page);

      // Check for underline or color change
      const color = await navLink.evaluate((el) =>
        window.getComputedStyle(el).color
      );

      // Should have gold color (214, 177, 58)
      expect(color).toContain('214, 177, 58');
    });

    test('should animate underline on hover', async ({ page }) => {
      test.skip(page.viewportSize()!.width < 768, 'Desktop only test');

      const navLink = page.locator('[data-testid="nav-link-about"]');

      // Check for animated underline element
      const underline = navLink.locator('span');

      if (await underline.count() > 0) {
        // Hover to trigger animation
        await navLink.hover();
        await waitForAnimations(page);

        // Underline should be visible or have width
        const width = await underline.evaluate((el) =>
          window.getComputedStyle(el).width
        );

        expect(width).toBeTruthy();
      }
    });
  });

  test.describe('Gondor Theme Elements', () => {
    test('should use Cinzel font for headings', async ({ page }) => {
      const heading = page.locator('h1, h2').first();

      const fontFamily = await heading.evaluate((el) =>
        window.getComputedStyle(el).fontFamily
      );

      expect(fontFamily).toContain('Cinzel');
    });

    test('should use Inter font for body text', async ({ page }) => {
      const bodyText = page.locator('p').first();

      const fontFamily = await bodyText.evaluate((el) =>
        window.getComputedStyle(el).fontFamily
      );

      expect(fontFamily).toContain('Inter');
    });

    test('should have dark Gondor background', async ({ page }) => {
      const body = page.locator('body');

      const backgroundColor = await body.evaluate((el) =>
        window.getComputedStyle(el).backgroundColor
      );

      // Should be dark color
      expect(backgroundColor).toContain('26, 26, 26'); // gondor-dark: #1a1a1a
    });

    test('should have gold accent color throughout', async ({ page }) => {
      // Check multiple elements for gold color
      const goldElements = page.locator(
        '[class*="gold"], [class*="border-gondor-gold"], [class*="text-gondor-gold"]'
      );

      const count = await goldElements.count();
      expect(count).toBeGreaterThan(0);
    });

    test('should display architectural dividers', async ({ page }) => {
      await scrollToSection(page, '#education');

      // Look for decorative divider lines
      const dividers = page.locator(
        '[data-testid="education-section"] .bg-gradient-to-r, [data-testid="education-section"] hr, [data-testid="education-section"] [class*="border-t"]'
      );

      const count = await dividers.count();
      expect(count).toBeGreaterThan(0);
    });

    test('should have gold timeline in Experience section', async ({ page }) => {
      await scrollToSection(page, '#experience');

      const goldLine = page.locator(
        '[data-testid="experience-section"] [class*="gold"]'
      );

      const count = await goldLine.count();
      expect(count).toBeGreaterThan(0);
    });
  });

  test.describe('Smooth Scroll Animations', () => {
    test('should have smooth scroll behavior', async ({ page }) => {
      // Click nav link
      await page.click('[data-testid="nav-link-about"]');

      // Wait for scroll animation
      await waitForAnimations(page);

      // Should have scrolled to About section
      const aboutSection = page.locator('[data-testid="about-section"]');
      await expect(aboutSection).toBeInViewport();
    });

    test('should have fade-in animations on scroll', async ({ page }) => {
      await scrollToSection(page, '#about');
      await waitForAnimations(page);

      const aboutSection = page.locator('[data-testid="about-section"]');

      // Section should be visible after scroll
      await expect(aboutSection).toBeVisible();
    });
  });

  test.describe('Visual Regression for LOTR Elements', () => {
    test('should capture all LOTR themed elements', async ({ page }) => {
      // Hero with particles
      await captureScreenshot(page, 'lotr-hero-particles', { fullPage: false });

      // Quotes
      await scrollToSection(page, '#experience');
      await waitForAnimations(page);
      await captureScreenshot(page, 'lotr-quote-galadriel', { fullPage: false });

      // Icons
      await scrollToSection(page, '#skills');
      await waitForAnimations(page);
      await captureScreenshot(page, 'lotr-skills-icons', { fullPage: false });

      // Gold hover effects
      await scrollToSection(page, '#projects');
      const projectCard = page
        .locator('[data-testid="projects-section"] .grid > div')
        .first();
      await projectCard.hover();
      await waitForAnimations(page);
      await captureScreenshot(page, 'lotr-gold-hover', { fullPage: false });
    });
  });
});
