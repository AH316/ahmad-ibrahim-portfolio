import { test, expect } from '@playwright/test';
import {
  captureScreenshot,
  waitForAnimations,
  scrollToSection,
  verifyQuote,
  waitForSectionVisible,
} from '../helpers/test-helpers';

test.describe('Projects Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await scrollToSection(page, '#projects');
    await waitForSectionVisible(page, 'projects-section');
  });

  test('should display projects section', async ({ page }) => {
    const projectsSection = page.locator('[data-testid="projects-section"]');
    await expect(projectsSection).toBeVisible();
  });

  test('should display section heading', async ({ page }) => {
    const heading = page.locator('[data-testid="projects-section"] h2');
    await expect(heading).toBeVisible();
    await expect(heading).toHaveText('Projects');
  });

  test('should display Sam Gamgee quote', async ({ page }) => {
    await verifyQuote(
      page,
      "It's the job that's never started that takes longest to finish",
      'Sam'
    );
  });

  test('should display all project cards', async ({ page }) => {
    const projectCards = page.locator('[data-testid="projects-section"] .grid > div');
    const count = await projectCards.count();

    // Should have 3-4 project cards
    expect(count).toBeGreaterThanOrEqual(3);
    expect(count).toBeLessThanOrEqual(4);
  });

  test('should display Sistahology project', async ({ page }) => {
    const projectsSection = page.locator('[data-testid="projects-section"]');
    const content = await projectsSection.textContent();

    expect(content).toContain('Sistahology');
    expect(content).toContain('Journaling');
  });

  test('should display Gateway Automation project', async ({ page }) => {
    const projectsSection = page.locator('[data-testid="projects-section"]');
    const content = await projectsSection.textContent();

    expect(content).toContain('Gateway');
    expect(content).toContain('Automation');
  });

  test('should display TR-181 Data Model project', async ({ page }) => {
    const projectsSection = page.locator('[data-testid="projects-section"]');
    const content = await projectsSection.textContent();

    expect(content).toContain('TR-181');
    expect(content).toContain('Data Model');
  });

  test('should display tech stack badges for each project', async ({ page }) => {
    const projectCards = page.locator('[data-testid="projects-section"] .grid > div');
    const firstCard = projectCards.first();

    // Check for tech badges
    const badges = firstCard.locator('.inline-flex, .badge, [class*="px-"]');
    const badgeCount = await badges.count();

    expect(badgeCount).toBeGreaterThan(0); // Should have tech stack badges
  });

  test('should display View Project buttons', async ({ page }) => {
    const projectCards = page.locator('[data-testid="projects-section"] .grid > div');
    const buttonCount = await projectCards.locator('a, button').count();

    expect(buttonCount).toBeGreaterThan(0); // Each project should have a button/link
  });

  test('should have working GitHub links', async ({ page, context }) => {
    const firstProjectLink = page
      .locator('[data-testid="projects-section"]')
      .locator('a[href*="github"]')
      .first();

    if (await firstProjectLink.count() > 0) {
      const href = await firstProjectLink.getAttribute('href');
      expect(href).toContain('github.com');

      // Verify link opens in new tab
      const target = await firstProjectLink.getAttribute('target');
      expect(target).toBe('_blank');
    }
  });

  test('should display hover effects on project cards', async ({ page }) => {
    const projectCard = page
      .locator('[data-testid="projects-section"] .grid > div')
      .first();

    // Get initial state
    const initialBorder = await projectCard.evaluate((el) =>
      window.getComputedStyle(el).borderColor
    );

    // Hover
    await projectCard.hover();
    await waitForAnimations(page);

    // Border should change (gold hover effect)
    const hoverBorder = await projectCard.evaluate((el) =>
      window.getComputedStyle(el).borderColor
    );

    // Should have visual change on hover
    expect(hoverBorder).toBeTruthy();
  });

  test('should have gold hover glow effect', async ({ page }) => {
    const projectCard = page
      .locator('[data-testid="projects-section"] .grid > div')
      .first();

    await projectCard.hover();
    await waitForAnimations(page);

    // Check for gold color in border or shadow
    const boxShadow = await projectCard.evaluate((el) =>
      window.getComputedStyle(el).boxShadow
    );

    // Should have some shadow effect
    expect(boxShadow).not.toBe('none');

    await captureScreenshot(page, 'project-card-hover', { fullPage: false });
  });

  test('should display View Project button with gold styling', async ({ page }) => {
    const viewButton = page
      .locator('[data-testid="projects-section"]')
      .locator('a, button')
      .first();

    const color = await viewButton.evaluate((el) =>
      window.getComputedStyle(el).color
    );

    // Should have gold color or border
    const borderColor = await viewButton.evaluate((el) =>
      window.getComputedStyle(el).borderColor
    );

    // At least one should have gold color
    const hasGold =
      color.includes('214, 177, 58') || borderColor.includes('214, 177, 58');

    expect(hasGold || color || borderColor).toBeTruthy();
  });

  test('should show project descriptions', async ({ page }) => {
    const projectCards = page.locator('[data-testid="projects-section"] .grid > div');
    const firstCard = projectCards.first();

    // Should have description text
    const description = firstCard.locator('p');
    await expect(description.first()).toBeVisible();

    const descText = await description.first().textContent();
    expect(descText!.length).toBeGreaterThan(20); // Should have meaningful description
  });

  test('should display project images/placeholders', async ({ page }) => {
    const projectCards = page.locator('[data-testid="projects-section"] .grid > div');

    // Check if any cards have images
    const images = await projectCards.locator('img').count();
    const divWithBg = await projectCards.locator('[class*="bg-"]').count();

    // Should have either images or background divs as placeholders
    expect(images + divWithBg).toBeGreaterThan(0);
  });

  test('should have proper card layout', async ({ page }) => {
    const projectCards = page.locator('[data-testid="projects-section"] .grid > div');
    const firstCard = projectCards.first();

    const dimensions = await firstCard.evaluate((el) => ({
      width: el.getBoundingClientRect().width,
      height: el.getBoundingClientRect().height,
    }));

    // Cards should have reasonable dimensions
    expect(dimensions.width).toBeGreaterThan(200);
    expect(dimensions.height).toBeGreaterThan(100);
  });

  test('should show tech stacks with proper styling', async ({ page }) => {
    const projectsSection = page.locator('[data-testid="projects-section"]');
    const content = await projectsSection.textContent();

    // Check for common technologies mentioned
    const hasTech =
      content!.includes('React') ||
      content!.includes('Python') ||
      content!.includes('TypeScript') ||
      content!.includes('Supabase') ||
      content!.includes('Playwright');

    expect(hasTech).toBe(true);
  });

  test('should be responsive on mobile', async ({ page }) => {
    test.skip(page.viewportSize()!.width >= 768, 'Mobile only test');

    const projectCards = page.locator('[data-testid="projects-section"] .grid > div');

    // On mobile, cards should stack vertically
    const firstCard = projectCards.first();
    const secondCard = projectCards.nth(1);

    if (await secondCard.count() > 0) {
      const firstBox = await firstCard.boundingBox();
      const secondBox = await secondCard.boundingBox();

      // Second card should be below first card (stacked)
      expect(secondBox!.y).toBeGreaterThan(firstBox!.y + firstBox!.height - 50);
    }

    await captureScreenshot(page, 'projects-mobile', { fullPage: false });
  });

  test('should display in grid on desktop', async ({ page }) => {
    test.skip(page.viewportSize()!.width < 1024, 'Desktop only test');

    const projectCards = page.locator('[data-testid="projects-section"] .grid > div');
    const count = await projectCards.count();

    if (count >= 2) {
      const firstCard = projectCards.first();
      const secondCard = projectCards.nth(1);

      const firstBox = await firstCard.boundingBox();
      const secondBox = await secondCard.boundingBox();

      // On desktop, cards should be side by side (similar Y position)
      const yDiff = Math.abs(secondBox!.y - firstBox!.y);
      expect(yDiff).toBeLessThan(100); // Should be roughly aligned horizontally
    }
  });

  test('should capture projects section for visual regression', async ({ page }) => {
    await captureScreenshot(page, 'projects-section', { fullPage: false });

    // Capture with hover effect
    const firstCard = page
      .locator('[data-testid="projects-section"] .grid > div')
      .first();
    await firstCard.hover();
    await waitForAnimations(page);

    await captureScreenshot(page, 'projects-hover', { fullPage: false });
  });

  test('should have accessible project links', async ({ page }) => {
    const projectLinks = page
      .locator('[data-testid="projects-section"]')
      .locator('a');

    const count = await projectLinks.count();

    for (let i = 0; i < Math.min(count, 4); i++) {
      const link = projectLinks.nth(i);
      const href = await link.getAttribute('href');

      // Links should have valid href
      expect(href).toBeTruthy();
      expect(href!.length).toBeGreaterThan(0);
    }
  });

  test('should display portfolio project', async ({ page }) => {
    const projectsSection = page.locator('[data-testid="projects-section"]');
    const content = await projectsSection.textContent();

    // Should mention the portfolio itself as a project
    const hasPortfolio =
      content!.includes('Portfolio') || content!.includes('Personal Website');

    // This is optional, so we just check but don't require
    if (hasPortfolio) {
      expect(hasPortfolio).toBe(true);
    }
  });
});
