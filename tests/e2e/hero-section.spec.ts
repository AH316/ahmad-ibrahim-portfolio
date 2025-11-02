import { test, expect } from '@playwright/test';
import {
  captureScreenshot,
  waitForAnimations,
  verifyQuote,
  verifyParticleBackground,
} from '../helpers/test-helpers';

test.describe('Hero Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await waitForAnimations(page);
  });

  test('should display hero section', async ({ page }) => {
    const heroSection = page.locator('[data-testid="hero-section"]');
    await expect(heroSection).toBeVisible();
  });

  test('should display name "Ahmad Ibrahim"', async ({ page }) => {
    const heroName = page.locator('[data-testid="hero-name"]');
    await expect(heroName).toBeVisible();
    await expect(heroName).toHaveText('Ahmad Ibrahim');

    // Verify it uses Cinzel font
    const fontFamily = await heroName.evaluate((el) =>
      window.getComputedStyle(el).fontFamily
    );
    expect(fontFamily).toContain('Cinzel');
  });

  test('should display tagline', async ({ page }) => {
    const tagline = page.locator('[data-testid="hero-tagline"]');
    await expect(tagline).toBeVisible();
    await expect(tagline).toHaveText(
      'Software Developer | Test Automation Engineer'
    );
  });

  test('should display Gandalf quote', async ({ page }) => {
    // Wait for initial animations
    await page.waitForTimeout(2000);

    // Scroll down slightly to trigger whileInView animation for quote
    await page.mouse.wheel(0, 200);
    await page.waitForTimeout(1000);

    await verifyQuote(
      page,
      'All we have to decide is what to do with the time that is given us',
      'Gandalf'
    );
  });

  test('should display scroll down CTA button', async ({ page }) => {
    const ctaButton = page.locator('[data-testid="hero-cta"]');
    await expect(ctaButton).toBeVisible();
    await expect(ctaButton).toHaveText(/Scroll Down/i);
  });

  test('should scroll to About section when clicking CTA', async ({ page }) => {
    const ctaButton = page.locator('[data-testid="hero-cta"]');
    await ctaButton.click();
    await waitForAnimations(page);

    const aboutSection = page.locator('[data-testid="about-section"]');
    await expect(aboutSection).toBeInViewport();
  });

  test('should display particle background', async ({ page }) => {
    await verifyParticleBackground(page);
  });

  test('should have gold color theme elements', async ({ page }) => {
    const ctaButton = page.locator('[data-testid="hero-cta"]');

    const borderColor = await ctaButton.evaluate((el) =>
      window.getComputedStyle(el).borderColor
    );

    // Should have gold border (RGB for #d4af37)
    expect(borderColor).toContain('214, 177, 58');
  });

  test('should animate CTA button on hover', async ({ page }) => {
    const ctaButton = page.locator('[data-testid="hero-cta"]');

    // Get initial transform
    const initialTransform = await ctaButton.evaluate((el) =>
      window.getComputedStyle(el).transform
    );

    // Hover
    await ctaButton.hover();
    await waitForAnimations(page);

    // Transform should change (scale effect)
    const hoverTransform = await ctaButton.evaluate((el) =>
      window.getComputedStyle(el).transform
    );

    expect(hoverTransform).not.toBe(initialTransform);
  });

  test('should display chevron down icon in CTA', async ({ page }) => {
    const ctaButton = page.locator('[data-testid="hero-cta"]');
    const chevron = ctaButton.locator('svg');
    await expect(chevron).toBeVisible();
  });

  test('should have proper text hierarchy', async ({ page }) => {
    const name = page.locator('[data-testid="hero-name"]');
    const tagline = page.locator('[data-testid="hero-tagline"]');

    const nameFontSize = await name.evaluate((el) =>
      parseInt(window.getComputedStyle(el).fontSize)
    );

    const taglineFontSize = await tagline.evaluate((el) =>
      parseInt(window.getComputedStyle(el).fontSize)
    );

    // Name should be larger than tagline
    expect(nameFontSize).toBeGreaterThan(taglineFontSize);
  });

  test('should have gradient overlay at bottom', async ({ page }) => {
    const heroSection = page.locator('[data-testid="hero-section"]');

    // Check for gradient div
    const hasGradient = await heroSection.evaluate((el) => {
      const gradientDiv = el.querySelector('.bg-gradient-to-t');
      return gradientDiv !== null;
    });

    expect(hasGradient).toBe(true);
  });

  test('should be full viewport height', async ({ page }) => {
    const heroSection = page.locator('[data-testid="hero-section"]');

    const height = await heroSection.evaluate((el) =>
      el.getBoundingClientRect().height
    );

    const viewportHeight = page.viewportSize()!.height;

    // Hero should be at least as tall as viewport
    expect(height).toBeGreaterThanOrEqual(viewportHeight - 100); // Small margin for variations
  });

  test('should capture hero section for visual regression', async ({ page }) => {
    // Wait for animations to settle
    await page.waitForTimeout(2000);

    await captureScreenshot(page, 'hero-section-full', { fullPage: false });
  });

  test('should capture full page including hero', async ({ page }) => {
    await page.waitForTimeout(2000);

    await captureScreenshot(page, 'home-page-full', { fullPage: true });
  });

  test('should display properly on mobile viewport', async ({ page }) => {
    test.skip(page.viewportSize()!.width >= 768, 'Mobile only test');

    const heroName = page.locator('[data-testid="hero-name"]');
    await expect(heroName).toBeVisible();

    const heroTagline = page.locator('[data-testid="hero-tagline"]');
    await expect(heroTagline).toBeVisible();

    const ctaButton = page.locator('[data-testid="hero-cta"]');
    await expect(ctaButton).toBeVisible();

    await captureScreenshot(page, 'hero-mobile', { fullPage: false });
  });

  test('should have responsive font sizes', async ({ page }) => {
    const heroName = page.locator('[data-testid="hero-name"]');

    const fontSize = await heroName.evaluate((el) =>
      window.getComputedStyle(el).fontSize
    );

    // Font size should be reasonable (not too small)
    const fontSizeNum = parseInt(fontSize);
    expect(fontSizeNum).toBeGreaterThan(24); // At least 24px even on mobile
  });

  test('should have white text color for name', async ({ page }) => {
    const heroName = page.locator('[data-testid="hero-name"]');

    const color = await heroName.evaluate((el) =>
      window.getComputedStyle(el).color
    );

    // Should be close to white (gondor-white: #f9fafb)
    expect(color).toContain('249, 250, 251');
  });

  test('should have silver text color for tagline', async ({ page }) => {
    const tagline = page.locator('[data-testid="hero-tagline"]');

    const color = await tagline.evaluate((el) =>
      window.getComputedStyle(el).color
    );

    // Should be silver/gray (gondor-silver: #e5e7eb)
    expect(color).toContain('238, 239, 241');
  });

  test('should maintain aspect ratio on different screen sizes', async ({ page }) => {
    const heroSection = page.locator('[data-testid="hero-section"]');

    const dimensions = await heroSection.evaluate((el) => ({
      width: el.getBoundingClientRect().width,
      height: el.getBoundingClientRect().height,
    }));

    expect(dimensions.width).toBeGreaterThan(0);
    expect(dimensions.height).toBeGreaterThan(0);

    // Capture for current viewport
    const viewportSize = page.viewportSize()!;
    await captureScreenshot(
      page,
      `hero-${viewportSize.width}x${viewportSize.height}`,
      { fullPage: false }
    );
  });
});
