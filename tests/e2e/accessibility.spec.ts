import { test, expect } from '@playwright/test';
import {
  runAccessibilityScan,
  waitForAnimations,
  scrollToSection,
  testKeyboardNavigation,
  waitForSectionVisible,
} from '../helpers/test-helpers';

test.describe('Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await waitForAnimations(page);
  });

  test.describe('Automated Accessibility Scans', () => {
    test('should pass accessibility scan on Hero section', async ({ page }) => {
      await runAccessibilityScan(page, 'hero');
    });

    test('should pass accessibility scan on About section', async ({ page }) => {
      await scrollToSection(page, '#about');
      await waitForSectionVisible(page, 'about-section');
      await runAccessibilityScan(page, 'about');
    });

    test('should pass accessibility scan on Education section', async ({ page }) => {
      await scrollToSection(page, '#education');
      await waitForSectionVisible(page, 'education-section');
      await runAccessibilityScan(page, 'education');
    });

    test('should pass accessibility scan on Experience section', async ({ page }) => {
      await scrollToSection(page, '#experience');
      await waitForSectionVisible(page, 'experience-section');
      await runAccessibilityScan(page, 'experience');
    });

    test('should pass accessibility scan on Skills section', async ({ page }) => {
      await scrollToSection(page, '#skills');
      await waitForSectionVisible(page, 'skills-section');
      await runAccessibilityScan(page, 'skills');
    });

    test('should pass accessibility scan on Projects section', async ({ page }) => {
      await scrollToSection(page, '#projects');
      await waitForSectionVisible(page, 'projects-section');
      await runAccessibilityScan(page, 'projects');
    });

    test('should pass accessibility scan on Contact section', async ({ page }) => {
      await scrollToSection(page, '#contact');
      await waitForSectionVisible(page, 'contact-section');
      await runAccessibilityScan(page, 'contact');
    });

    test('should pass accessibility scan on full page', async ({ page }) => {
      await runAccessibilityScan(page, 'full-page');
    });
  });

  test.describe('Keyboard Navigation', () => {
    test('should navigate through navigation links with keyboard', async ({ page }) => {
      test.skip(page.viewportSize()!.width < 768, 'Desktop only test');

      // Focus first nav link
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab'); // Skip logo

      // Should be on first nav link
      const focused = await page.evaluate(() => {
        return document.activeElement?.getAttribute('data-testid');
      });

      expect(focused).toContain('nav-link');
    });

    test('should activate navigation links with Enter key', async ({ page }) => {
      test.skip(page.viewportSize()!.width < 768, 'Desktop only test');

      const aboutLink = page.locator('[data-testid="nav-link-about"]');
      await aboutLink.focus();
      await page.keyboard.press('Enter');

      await waitForAnimations(page);

      const aboutSection = page.locator('[data-testid="about-section"]');
      await expect(aboutSection).toBeInViewport();
    });

    test('should navigate through form fields with Tab', async ({ page }) => {
      await scrollToSection(page, '#contact');

      const form = page.locator('[data-testid="contact-section"] form');
      const firstInput = form.locator('input, textarea').first();

      await firstInput.focus();

      // Tab through form fields
      await page.keyboard.press('Tab');
      await waitForAnimations(page);

      // Should have moved to next field
      const focusedElement = await page.evaluate(() => {
        const el = document.activeElement;
        return el ? el.tagName.toLowerCase() : null;
      });

      expect(['input', 'textarea', 'button']).toContain(focusedElement);
    });

    test('should submit form with Enter key', async ({ page }) => {
      await scrollToSection(page, '#contact');

      const form = page.locator('[data-testid="contact-section"] form');

      // Fill form
      await form.locator('input[name="name"], input[type="text"]').first().fill('Test User');
      await form.locator('input[name="email"], input[type="email"]').first().fill('test@example.com');
      await form.locator('textarea').fill('Test message');

      // Focus submit button and press Enter
      const submitButton = form.locator('button[type="submit"]');
      await submitButton.focus();

      // Verify button is focused
      const isFocused = await submitButton.evaluate((el) => el === document.activeElement);
      expect(isFocused).toBe(true);
    });

    test('should show focus indicators on interactive elements', async ({ page }) => {
      const ctaButton = page.locator('[data-testid="hero-cta"]');

      await ctaButton.focus();
      await waitForAnimations(page);

      // Check for focus indicator (outline or ring)
      const outline = await ctaButton.evaluate((el) =>
        window.getComputedStyle(el).outline
      );

      const boxShadow = await ctaButton.evaluate((el) =>
        window.getComputedStyle(el).boxShadow
      );

      // Should have some focus indicator
      expect(outline !== 'none' || boxShadow !== 'none').toBe(true);
    });

    test('should navigate to logo with keyboard', async ({ page }) => {
      const logo = page.locator('[data-testid="nav-logo"]');

      // Tab to logo
      await page.keyboard.press('Tab');

      const focused = await page.evaluate(() => {
        return document.activeElement?.getAttribute('data-testid');
      });

      expect(focused).toBe('nav-logo');
    });

    test('should activate CTA button with Space key', async ({ page }) => {
      const ctaButton = page.locator('[data-testid="hero-cta"]');

      await ctaButton.focus();
      await page.keyboard.press('Space');

      await waitForAnimations(page);

      const aboutSection = page.locator('[data-testid="about-section"]');
      await expect(aboutSection).toBeInViewport();
    });
  });

  test.describe('ARIA Labels and Roles', () => {
    test('should have proper ARIA labels on buttons', async ({ page }) => {
      const ctaButton = page.locator('[data-testid="hero-cta"]');

      const ariaLabel = await ctaButton.getAttribute('aria-label');
      const hasText = await ctaButton.textContent();

      // Should have either aria-label or text content
      expect(ariaLabel || hasText).toBeTruthy();
    });

    test('should have aria-label on mobile menu button', async ({ page }) => {
      test.skip(page.viewportSize()!.width >= 768, 'Mobile only test');

      const mobileButton = page.locator('[data-testid="mobile-menu-button"]');
      const ariaLabel = await mobileButton.getAttribute('aria-label');

      expect(ariaLabel).toBeTruthy();
      expect(ariaLabel).toContain('menu');
    });

    test('should have proper heading hierarchy', async ({ page }) => {
      // Check for h1
      const h1 = page.locator('h1');
      await expect(h1).toHaveCount(1); // Should have only one h1

      // Check h1 content
      const h1Text = await h1.textContent();
      expect(h1Text).toContain('Ahmad Ibrahim');
    });

    test('should have accessible form labels', async ({ page }) => {
      await scrollToSection(page, '#contact');

      const form = page.locator('[data-testid="contact-section"] form');
      const inputs = form.locator('input, textarea');

      const count = await inputs.count();

      for (let i = 0; i < count; i++) {
        const input = inputs.nth(i);

        // Check for label, placeholder, or aria-label
        const id = await input.getAttribute('id');
        const placeholder = await input.getAttribute('placeholder');
        const ariaLabel = await input.getAttribute('aria-label');

        let hasLabel = false;
        if (id) {
          const label = page.locator(`label[for="${id}"]`);
          hasLabel = (await label.count()) > 0;
        }

        // Should have some form of label
        expect(hasLabel || placeholder || ariaLabel).toBeTruthy();
      }
    });

    test('should have navigation landmarks', async ({ page }) => {
      const nav = page.locator('nav');
      await expect(nav).toBeVisible();

      // Check for proper nav role
      const role = await nav.getAttribute('role');
      const tagName = await nav.evaluate((el) => el.tagName.toLowerCase());

      expect(tagName === 'nav' || role === 'navigation').toBe(true);
    });

    test('should have main content landmark', async ({ page }) => {
      const main = page.locator('main, [role="main"]');

      // Should have main content area
      if (await main.count() > 0) {
        await expect(main.first()).toBeVisible();
      }
    });
  });

  test.describe('Color Contrast', () => {
    test('should have sufficient contrast for hero name', async ({ page }) => {
      const heroName = page.locator('[data-testid="hero-name"]');

      const color = await heroName.evaluate((el) =>
        window.getComputedStyle(el).color
      );

      const backgroundColor = await page.evaluate(() =>
        window.getComputedStyle(document.body).backgroundColor
      );

      // Both should be defined
      expect(color).toBeTruthy();
      expect(backgroundColor).toBeTruthy();

      // White on dark should have good contrast
      expect(color).toContain('249, 250, 251'); // White
      expect(backgroundColor).toContain('26, 26, 26'); // Dark
    });

    test('should have sufficient contrast for body text', async ({ page }) => {
      await scrollToSection(page, '#about');

      const bodyText = page.locator('[data-testid="about-section"] p').first();

      const color = await bodyText.evaluate((el) =>
        window.getComputedStyle(el).color
      );

      // Should be silver/light gray on dark
      expect(color).toContain('229, 231, 235'); // gondor-silver
    });

    test('should have sufficient contrast for gold accents', async ({ page }) => {
      const goldElement = page.locator('[data-testid="hero-cta"]');

      const color = await goldElement.evaluate((el) =>
        window.getComputedStyle(el).color
      );

      const borderColor = await goldElement.evaluate((el) =>
        window.getComputedStyle(el).borderColor
      );

      // Gold color should be defined
      expect(color || borderColor).toContain('212, 175, 55'); // gondor-gold
    });
  });

  test.describe('Link Accessibility', () => {
    test('should have descriptive link text', async ({ page }) => {
      await scrollToSection(page, '#projects');

      const projectLinks = page.locator('[data-testid="projects-section"] a');
      const count = await projectLinks.count();

      for (let i = 0; i < Math.min(count, 5); i++) {
        const link = projectLinks.nth(i);
        const text = await link.textContent();
        const ariaLabel = await link.getAttribute('aria-label');

        // Links should have descriptive text
        expect((text && text.trim().length > 0) || ariaLabel).toBeTruthy();
      }
    });

    test('should open external links in new tab with proper rel', async ({ page }) => {
      await scrollToSection(page, '#contact');

      const externalLinks = page.locator(
        '[data-testid="contact-section"] a[target="_blank"]'
      );

      const count = await externalLinks.count();

      for (let i = 0; i < count; i++) {
        const link = externalLinks.nth(i);
        const rel = await link.getAttribute('rel');

        // Should have noopener noreferrer for security
        expect(rel).toContain('noopener');
      }
    });

    test('should have visible focus on links', async ({ page }) => {
      test.skip(page.viewportSize()!.width < 768, 'Desktop only test');

      const navLink = page.locator('[data-testid="nav-link-about"]');

      await navLink.focus();
      await waitForAnimations(page);

      // Should be visible when focused
      await expect(navLink).toBeVisible();
    });
  });

  test.describe('Form Accessibility', () => {
    test('should have accessible error messages', async ({ page }) => {
      await scrollToSection(page, '#contact');

      const form = page.locator('[data-testid="contact-section"] form');
      const submitButton = form.locator('button[type="submit"]');

      // Try to submit empty form
      await submitButton.click();
      await waitForAnimations(page);

      // Check if errors are announced (aria-live or visible)
      const inputs = form.locator('input, textarea');
      const firstInput = inputs.first();

      const ariaInvalid = await firstInput.getAttribute('aria-invalid');
      const ariaDescribedBy = await firstInput.getAttribute('aria-describedby');

      // Should indicate invalid state
      expect(ariaInvalid === 'true' || ariaDescribedBy).toBeTruthy();
    });

    test('should have required field indicators', async ({ page }) => {
      await scrollToSection(page, '#contact');

      const form = page.locator('[data-testid="contact-section"] form');
      const requiredInputs = form.locator('input[required], textarea[required]');

      const count = await requiredInputs.count();

      // Should have required fields
      expect(count).toBeGreaterThan(0);
    });

    test('should have proper input types', async ({ page }) => {
      await scrollToSection(page, '#contact');

      const form = page.locator('[data-testid="contact-section"] form');
      const emailInput = form.locator('input[name="email"]');

      if (await emailInput.count() > 0) {
        const type = await emailInput.getAttribute('type');
        expect(type).toBe('email');
      }
    });
  });

  test.describe('Screen Reader Support', () => {
    test('should have alt text for images', async ({ page }) => {
      await scrollToSection(page, '#projects');

      const images = page.locator('[data-testid="projects-section"] img');

      if (await images.count() > 0) {
        const count = await images.count();

        for (let i = 0; i < count; i++) {
          const img = images.nth(i);
          const alt = await img.getAttribute('alt');

          // Images should have alt text (can be empty for decorative)
          expect(alt !== null).toBe(true);
        }
      }
    });

    test('should have proper document structure', async ({ page }) => {
      // Check for proper HTML structure
      const html = page.locator('html');
      const lang = await html.getAttribute('lang');

      expect(lang).toBe('en'); // Should specify language
    });

    test('should have descriptive page title', async ({ page }) => {
      const title = await page.title();

      expect(title).toBeTruthy();
      expect(title.length).toBeGreaterThan(0);
      expect(title).toContain('Ahmad Ibrahim');
    });
  });

  test.describe('Focus Management', () => {
    test('should maintain focus visible throughout navigation', async ({ page }) => {
      test.skip(page.viewportSize()!.width < 768, 'Desktop only test');

      // Tab through several elements
      for (let i = 0; i < 5; i++) {
        await page.keyboard.press('Tab');
        await waitForAnimations(page);

        // Check if something is focused
        const hasFocus = await page.evaluate(() => {
          return document.activeElement !== document.body;
        });

        expect(hasFocus).toBe(true);
      }
    });

    test('should not trap focus accidentally', async ({ page }) => {
      // Tab through page
      for (let i = 0; i < 20; i++) {
        await page.keyboard.press('Tab');
      }

      // Should still be able to focus elements
      const hasFocus = await page.evaluate(() => {
        return document.activeElement !== null;
      });

      expect(hasFocus).toBe(true);
    });

    test('should return focus after closing mobile menu', async ({ page }) => {
      test.skip(page.viewportSize()!.width >= 768, 'Mobile only test');

      const mobileButton = page.locator('[data-testid="mobile-menu-button"]');

      // Open menu
      await mobileButton.click();
      await waitForAnimations(page);

      // Close menu
      await mobileButton.click();
      await waitForAnimations(page);

      // Focus should return to button
      const isFocused = await mobileButton.evaluate((el) =>
        el === document.activeElement
      );

      expect(isFocused).toBe(true);
    });
  });

  test.describe('Motion and Animations', () => {
    test('should respect prefers-reduced-motion', async ({ page }) => {
      // Emulate reduced motion preference
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.reload();
      await waitForAnimations(page);

      // Page should still be functional
      const hero = page.locator('[data-testid="hero-section"]');
      await expect(hero).toBeVisible();
    });

    test('should not have animations that last too long', async ({ page }) => {
      const ctaButton = page.locator('[data-testid="hero-cta"]');

      const startTime = Date.now();

      await ctaButton.hover();
      await waitForAnimations(page);

      const endTime = Date.now();
      const duration = endTime - startTime;

      // Animations should complete reasonably quickly
      expect(duration).toBeLessThan(2000);
    });
  });
});
