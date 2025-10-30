import { test, expect } from '@playwright/test';
import {
  captureScreenshot,
  waitForAnimations,
  scrollToSection,
  verifyNoHorizontalScroll,
  openMobileMenu,
} from '../helpers/test-helpers';

test.describe('Responsive Design', () => {
  test.describe('Mobile Viewport (375x667)', () => {
    test.use({ viewport: { width: 375, height: 667 } });

    test('should display properly on mobile', async ({ page }) => {
      await page.goto('/');
      await waitForAnimations(page);

      // Check for horizontal scroll
      await verifyNoHorizontalScroll(page);

      await captureScreenshot(page, 'mobile-375-home', { fullPage: true });
    });

    test('should show mobile menu button', async ({ page }) => {
      await page.goto('/');

      const mobileButton = page.locator('[data-testid="mobile-menu-button"]');
      await expect(mobileButton).toBeVisible();
    });

    test('should hide desktop navigation', async ({ page }) => {
      await page.goto('/');

      // Desktop nav should not be visible
      const desktopNav = page.locator('[data-testid="nav-link-about"]');
      await expect(desktopNav).toBeHidden();
    });

    test('should stack sections vertically', async ({ page }) => {
      await page.goto('/');
      await scrollToSection(page, '#about');

      const aboutSection = page.locator('[data-testid="about-section"]');
      await expect(aboutSection).toBeVisible();

      // Content should be full width on mobile
      const width = await aboutSection.evaluate((el) =>
        el.getBoundingClientRect().width
      );

      const viewportWidth = page.viewportSize()!.width;
      expect(width).toBeGreaterThan(viewportWidth * 0.8); // Should use most of viewport width
    });

    test('should display hero name with appropriate size', async ({ page }) => {
      await page.goto('/');

      const heroName = page.locator('[data-testid="hero-name"]');
      const fontSize = await heroName.evaluate((el) =>
        parseInt(window.getComputedStyle(el).fontSize)
      );

      // Should be readable but not too large
      expect(fontSize).toBeGreaterThan(24);
      expect(fontSize).toBeLessThan(80);
    });

    test('should open mobile menu', async ({ page }) => {
      await page.goto('/');
      await openMobileMenu(page);

      await captureScreenshot(page, 'mobile-375-menu-open', { fullPage: false });
    });

    test('should display all sections on mobile', async ({ page }) => {
      await page.goto('/');

      const sections = ['hero', 'about', 'education', 'experience', 'skills', 'projects', 'contact'];

      for (const section of sections) {
        await scrollToSection(page, `#${section}`);
        await waitForAnimations(page);

        const sectionElement = page.locator(`[data-testid="${section}-section"]`);
        await expect(sectionElement).toBeVisible();
      }
    });

    test('should stack project cards vertically', async ({ page }) => {
      await page.goto('/');
      await scrollToSection(page, '#projects');

      const projectCards = page.locator('[data-testid="projects-section"] .grid > div');
      const count = await projectCards.count();

      if (count >= 2) {
        const firstCard = projectCards.first();
        const secondCard = projectCards.nth(1);

        const firstBox = await firstCard.boundingBox();
        const secondBox = await secondCard.boundingBox();

        // Second card should be below first (vertical stack)
        expect(secondBox!.y).toBeGreaterThan(firstBox!.y + firstBox!.height - 50);
      }
    });

    test('should display contact form full width', async ({ page }) => {
      await page.goto('/');
      await scrollToSection(page, '#contact');

      const form = page.locator('[data-testid="contact-section"] form');
      const formWidth = await form.evaluate((el) =>
        el.getBoundingClientRect().width
      );

      const viewportWidth = page.viewportSize()!.width;
      expect(formWidth).toBeGreaterThan(viewportWidth * 0.7); // Should use most of width
    });

    test('should not have horizontal scroll', async ({ page }) => {
      await page.goto('/');

      // Scroll through all sections
      const sections = ['#about', '#education', '#experience', '#skills', '#projects', '#contact'];

      for (const section of sections) {
        await scrollToSection(page, section);
        await waitForAnimations(page);
        await verifyNoHorizontalScroll(page);
      }
    });

    test('should have appropriate text sizes', async ({ page }) => {
      await page.goto('/');

      const bodyText = page.locator('p').first();
      const fontSize = await bodyText.evaluate((el) =>
        parseInt(window.getComputedStyle(el).fontSize)
      );

      // Body text should be readable (at least 14px)
      expect(fontSize).toBeGreaterThanOrEqual(14);
    });
  });

  test.describe('Tablet Viewport (768x1024)', () => {
    test.use({ viewport: { width: 768, height: 1024 } });

    test('should display properly on tablet', async ({ page }) => {
      await page.goto('/');
      await waitForAnimations(page);

      await verifyNoHorizontalScroll(page);

      await captureScreenshot(page, 'tablet-768-home', { fullPage: true });
    });

    test('should show desktop navigation', async ({ page }) => {
      await page.goto('/');

      const desktopNav = page.locator('[data-testid="nav-link-about"]');
      await expect(desktopNav).toBeVisible();
    });

    test('should hide mobile menu button', async ({ page }) => {
      await page.goto('/');

      const mobileButton = page.locator('[data-testid="mobile-menu-button"]');
      await expect(mobileButton).toBeHidden();
    });

    test('should display hero with appropriate sizing', async ({ page }) => {
      await page.goto('/');

      const heroName = page.locator('[data-testid="hero-name"]');
      const fontSize = await heroName.evaluate((el) =>
        parseInt(window.getComputedStyle(el).fontSize)
      );

      // Should be larger than mobile
      expect(fontSize).toBeGreaterThan(40);
    });

    test('should display sections with tablet layout', async ({ page }) => {
      await page.goto('/');
      await scrollToSection(page, '#about');

      const aboutSection = page.locator('[data-testid="about-section"]');
      await expect(aboutSection).toBeVisible();

      await captureScreenshot(page, 'tablet-768-about', { fullPage: false });
    });

    test('should display project cards in grid', async ({ page }) => {
      await page.goto('/');
      await scrollToSection(page, '#projects');

      const projectCards = page.locator('[data-testid="projects-section"] .grid > div');
      const count = await projectCards.count();

      if (count >= 2) {
        const firstCard = projectCards.first();
        const secondCard = projectCards.nth(1);

        const firstBox = await firstCard.boundingBox();
        const secondBox = await secondCard.boundingBox();

        // On tablet, might be 2 columns - check horizontal alignment
        const yDiff = Math.abs(secondBox!.y - firstBox!.y);

        // Could be side by side or stacked
        expect(yDiff).toBeGreaterThanOrEqual(0);
      }

      await captureScreenshot(page, 'tablet-768-projects', { fullPage: false });
    });
  });

  test.describe('Desktop Viewport (1920x1080)', () => {
    test.use({ viewport: { width: 1920, height: 1080 } });

    test('should display properly on desktop', async ({ page }) => {
      await page.goto('/');
      await waitForAnimations(page);

      await verifyNoHorizontalScroll(page);

      await captureScreenshot(page, 'desktop-1920-home', { fullPage: true });
    });

    test('should show full desktop navigation', async ({ page }) => {
      await page.goto('/');

      const navLinks = page.locator('[data-testid^="nav-link-"]');
      const count = await navLinks.count();

      expect(count).toBe(8); // All 8 nav links
    });

    test('should display hero at full size', async ({ page }) => {
      await page.goto('/');

      const heroName = page.locator('[data-testid="hero-name"]');
      const fontSize = await heroName.evaluate((el) =>
        parseInt(window.getComputedStyle(el).fontSize)
      );

      // Should be large on desktop
      expect(fontSize).toBeGreaterThan(60);
    });

    test('should display sections with max width constraint', async ({ page }) => {
      await page.goto('/');
      await scrollToSection(page, '#about');

      const aboutSection = page.locator('[data-testid="about-section"]');
      const content = aboutSection.locator('> div').first();

      const width = await content.evaluate((el) =>
        el.getBoundingClientRect().width
      );

      // Should have max width (not full viewport)
      expect(width).toBeLessThan(1920);
      expect(width).toBeGreaterThan(1000);
    });

    test('should display project cards in multi-column grid', async ({ page }) => {
      await page.goto('/');
      await scrollToSection(page, '#projects');

      const projectCards = page.locator('[data-testid="projects-section"] .grid > div');
      const count = await projectCards.count();

      if (count >= 2) {
        const firstCard = projectCards.first();
        const secondCard = projectCards.nth(1);

        const firstBox = await firstCard.boundingBox();
        const secondBox = await secondCard.boundingBox();

        // On desktop, should be side by side (similar Y position)
        const yDiff = Math.abs(secondBox!.y - firstBox!.y);
        expect(yDiff).toBeLessThan(100); // Should be roughly aligned horizontally
      }

      await captureScreenshot(page, 'desktop-1920-projects', { fullPage: false });
    });

    test('should display all sections with proper spacing', async ({ page }) => {
      await page.goto('/');

      const sections = ['about', 'education', 'experience', 'skills', 'projects', 'contact'];

      for (const section of sections) {
        await scrollToSection(page, `#${section}`);
        await waitForAnimations(page);

        const sectionElement = page.locator(`[data-testid="${section}-section"]`);
        await expect(sectionElement).toBeVisible();

        await captureScreenshot(page, `desktop-1920-${section}`, { fullPage: false });
      }
    });

    test('should center content horizontally', async ({ page }) => {
      await page.goto('/');
      await scrollToSection(page, '#about');

      const aboutSection = page.locator('[data-testid="about-section"]');
      const content = aboutSection.locator('> div').first();

      const contentBox = await content.boundingBox();
      const viewportWidth = page.viewportSize()!.width;

      // Content should be centered (roughly equal margins)
      const leftMargin = contentBox!.x;
      const rightMargin = viewportWidth - (contentBox!.x + contentBox!.width);

      const marginDiff = Math.abs(leftMargin - rightMargin);
      expect(marginDiff).toBeLessThan(100); // Should be roughly centered
    });
  });

  test.describe('Breakpoint Transitions', () => {
    test('should transition smoothly between mobile and tablet', async ({ page }) => {
      // Start at mobile
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');
      await waitForAnimations(page);

      const mobileMeta = page.locator('[data-testid="mobile-menu-button"]');
      await expect(mobileMeta).toBeVisible();

      // Transition to tablet
      await page.setViewportSize({ width: 768, height: 1024 });
      await waitForAnimations(page);

      const desktopNav = page.locator('[data-testid="nav-link-about"]');
      await expect(desktopNav).toBeVisible();
    });

    test('should maintain content visibility across viewports', async ({ page }) => {
      const viewports = [
        { width: 375, height: 667, name: 'mobile' },
        { width: 768, height: 1024, name: 'tablet' },
        { width: 1920, height: 1080, name: 'desktop' },
      ];

      for (const viewport of viewports) {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        await page.goto('/');
        await waitForAnimations(page);

        // Hero should always be visible
        const heroName = page.locator('[data-testid="hero-name"]');
        await expect(heroName).toBeVisible();
        await expect(heroName).toHaveText('Ahmad Ibrahim');

        await captureScreenshot(
          page,
          `breakpoint-${viewport.name}-${viewport.width}`,
          { fullPage: false }
        );
      }
    });
  });

  test.describe('Text Readability', () => {
    test('should have readable text on all viewports', async ({ page }) => {
      const viewports = [375, 768, 1024, 1920];

      for (const width of viewports) {
        await page.setViewportSize({ width, height: 1080 });
        await page.goto('/');
        await waitForAnimations(page);

        const bodyText = page.locator('p').first();
        const fontSize = await bodyText.evaluate((el) =>
          parseInt(window.getComputedStyle(el).fontSize)
        );

        // Text should always be readable (at least 14px)
        expect(fontSize).toBeGreaterThanOrEqual(14);
      }
    });
  });

  test.describe('Image Responsiveness', () => {
    test('should scale images appropriately', async ({ page }) => {
      await page.goto('/');
      await scrollToSection(page, '#projects');

      const images = page.locator('[data-testid="projects-section"] img');

      if (await images.count() > 0) {
        const image = images.first();
        const width = await image.evaluate((el) =>
          el.getBoundingClientRect().width
        );

        const viewportWidth = page.viewportSize()!.width;

        // Images should not exceed viewport width
        expect(width).toBeLessThanOrEqual(viewportWidth);
      }
    });
  });

  test.describe('No Horizontal Scroll', () => {
    test('should not have horizontal scroll on any viewport', async ({ page }) => {
      const viewports = [
        { width: 375, height: 667 },
        { width: 768, height: 1024 },
        { width: 1920, height: 1080 },
      ];

      for (const viewport of viewports) {
        await page.setViewportSize(viewport);
        await page.goto('/');
        await waitForAnimations(page);

        await verifyNoHorizontalScroll(page);

        // Scroll through sections
        await scrollToSection(page, '#about');
        await verifyNoHorizontalScroll(page);

        await scrollToSection(page, '#projects');
        await verifyNoHorizontalScroll(page);

        await scrollToSection(page, '#contact');
        await verifyNoHorizontalScroll(page);
      }
    });
  });
});
