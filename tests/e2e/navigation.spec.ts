import { test, expect } from '@playwright/test';
import {
  captureScreenshot,
  waitForAnimations,
  testNavigationLink,
  openMobileMenu,
  closeMobileMenu,
} from '../helpers/test-helpers';

test.describe('Navigation Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await waitForAnimations(page);
  });

  test('should display navigation bar with logo', async ({ page }) => {
    const nav = page.locator('[data-testid="navigation"]');
    await expect(nav).toBeVisible();

    const logo = page.locator('[data-testid="nav-logo"]');
    await expect(logo).toBeVisible();
    await expect(logo).toHaveText('AI');
  });

  test('should have all navigation links in desktop view', async ({ page }) => {
    // Skip on mobile viewports
    test.skip(page.viewportSize()!.width < 768, 'Desktop only test');

    const links = [
      'home',
      'about',
      'education',
      'experience',
      'skills',
      'projects',
      'contact',
      'resume',
    ];

    for (const link of links) {
      const navLink = page.locator(`[data-testid="nav-link-${link}"]`);
      await expect(navLink).toBeVisible();
    }
  });

  test('should navigate to About section when clicking About link', async ({ page }) => {
    test.skip(page.viewportSize()!.width < 768, 'Desktop only test');

    await page.click('[data-testid="nav-link-about"]');
    await waitForAnimations(page);

    const aboutSection = page.locator('[data-testid="about-section"]');
    await expect(aboutSection).toBeInViewport();
  });

  test('should navigate to Education section', async ({ page }) => {
    test.skip(page.viewportSize()!.width < 768, 'Desktop only test');

    await page.click('[data-testid="nav-link-education"]');
    await waitForAnimations(page);

    const educationSection = page.locator('[data-testid="education-section"]');
    await expect(educationSection).toBeInViewport();
  });

  test('should navigate to Experience section', async ({ page }) => {
    test.skip(page.viewportSize()!.width < 768, 'Desktop only test');

    await page.click('[data-testid="nav-link-experience"]');
    await waitForAnimations(page);

    const experienceSection = page.locator('[data-testid="experience-section"]');
    await expect(experienceSection).toBeInViewport();
  });

  test('should navigate to Skills section', async ({ page }) => {
    test.skip(page.viewportSize()!.width < 768, 'Desktop only test');

    await page.click('[data-testid="nav-link-skills"]');
    await waitForAnimations(page);

    const skillsSection = page.locator('[data-testid="skills-section"]');
    await expect(skillsSection).toBeInViewport();
  });

  test('should navigate to Projects section', async ({ page }) => {
    test.skip(page.viewportSize()!.width < 768, 'Desktop only test');

    await page.click('[data-testid="nav-link-projects"]');
    await waitForAnimations(page);

    const projectsSection = page.locator('[data-testid="projects-section"]');
    await expect(projectsSection).toBeInViewport();
  });

  test('should navigate to Contact section', async ({ page }) => {
    test.skip(page.viewportSize()!.width < 768, 'Desktop only test');

    await page.click('[data-testid="nav-link-contact"]');
    await waitForAnimations(page);

    const contactSection = page.locator('[data-testid="contact-section"]');
    await expect(contactSection).toBeInViewport();
  });

  test('should open resume PDF in new tab', async ({ page, context }) => {
    test.skip(page.viewportSize()!.width < 768, 'Desktop only test');

    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      page.click('[data-testid="nav-link-resume"]'),
    ]);

    await newPage.waitForLoadState();
    expect(newPage.url()).toContain('/resume.pdf');
    await newPage.close();
  });

  test('should become sticky on scroll', async ({ page }) => {
    const nav = page.locator('[data-testid="navigation"]');

    // Scroll down
    await page.evaluate(() => window.scrollTo(0, 200));
    await waitForAnimations(page);

    // Check if nav has background (indicates sticky state)
    const hasBackground = await nav.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return styles.backgroundColor !== 'rgba(0, 0, 0, 0)';
    });

    expect(hasBackground).toBe(true);

    await captureScreenshot(page, 'navigation-sticky', { fullPage: false });
  });

  test('should display hover effect on navigation links', async ({ page }) => {
    test.skip(page.viewportSize()!.width < 768, 'Desktop only test');

    const aboutLink = page.locator('[data-testid="nav-link-about"]');

    // Hover and check for color change
    await aboutLink.hover();
    await waitForAnimations(page);

    const color = await aboutLink.evaluate((el) =>
      window.getComputedStyle(el).color
    );

    // Should have gold color on hover (RGB values for #d4af37)
    expect(color).toContain('214, 177, 58'); // Gold color
  });

  test('should show mobile menu button on mobile', async ({ page }) => {
    test.skip(page.viewportSize()!.width >= 768, 'Mobile only test');

    const mobileButton = page.locator('[data-testid="mobile-menu-button"]');
    await expect(mobileButton).toBeVisible();
  });

  test('should open and close mobile menu', async ({ page }) => {
    test.skip(page.viewportSize()!.width >= 768, 'Mobile only test');

    // Open menu
    await openMobileMenu(page);
    await captureScreenshot(page, 'mobile-menu-open', { fullPage: false });

    // Close menu
    await closeMobileMenu(page);
  });

  test('should navigate via mobile menu', async ({ page }) => {
    test.skip(page.viewportSize()!.width >= 768, 'Mobile only test');

    await openMobileMenu(page);

    await page.click('[data-testid="mobile-nav-link-about"]');
    await waitForAnimations(page);

    const aboutSection = page.locator('[data-testid="about-section"]');
    await expect(aboutSection).toBeInViewport();

    // Menu should close after navigation
    const mobileMenu = page.locator('[data-testid="mobile-menu"]');
    await expect(mobileMenu).toBeHidden();
  });

  test('should scroll to top when clicking logo', async ({ page }) => {
    // Scroll down first
    await page.evaluate(() => window.scrollTo(0, 500));
    await waitForAnimations(page);

    // Click logo
    await page.click('[data-testid="nav-logo"]');
    await waitForAnimations(page);

    // Should be at top
    const scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toBeLessThan(100);
  });

  test('should capture navigation screenshots for visual regression', async ({
    page,
  }) => {
    await captureScreenshot(page, 'navigation-initial', { fullPage: false });

    // Scroll and capture sticky state
    await page.evaluate(() => window.scrollTo(0, 300));
    await waitForAnimations(page);
    await captureScreenshot(page, 'navigation-scrolled', { fullPage: false });
  });
});
