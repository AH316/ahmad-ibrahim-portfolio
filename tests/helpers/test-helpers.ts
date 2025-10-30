import { Page, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Navigation helpers for smooth scrolling tests
 */
export async function scrollToSection(page: Page, sectionId: string) {
  await page.evaluate((id) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, sectionId);

  // Wait for scroll to complete
  await page.waitForTimeout(1000);
}

/**
 * Wait for animations to complete
 */
export async function waitForAnimations(page: Page) {
  await page.waitForTimeout(500);
}

/**
 * Capture screenshot with descriptive name
 */
export async function captureScreenshot(
  page: Page,
  name: string,
  options?: { fullPage?: boolean }
) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = `${name}-${timestamp}.png`;
  const filepath = path.join(process.cwd(), 'artifacts', 'screenshots', filename);

  await page.screenshot({
    path: filepath,
    fullPage: options?.fullPage ?? false,
  });

  return filepath;
}

/**
 * Run accessibility scan with axe-core
 */
export async function runAccessibilityScan(
  page: Page,
  context: string
): Promise<void> {
  const accessibilityScanResults = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();

  // Save results to JSON file
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = `a11y-${context}-${timestamp}.json`;
  const filepath = path.join(process.cwd(), 'artifacts', 'a11y', filename);

  fs.writeFileSync(filepath, JSON.stringify(accessibilityScanResults, null, 2));

  // Assert no violations
  expect(accessibilityScanResults.violations).toEqual([]);
}

/**
 * Check if element is in viewport
 */
export async function isInViewport(page: Page, selector: string): Promise<boolean> {
  return await page.evaluate((sel) => {
    const element = document.querySelector(sel);
    if (!element) return false;

    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }, selector);
}

/**
 * Wait for section to be visible
 */
export async function waitForSectionVisible(page: Page, testId: string) {
  await page.waitForSelector(`[data-testid="${testId}"]`, {
    state: 'visible',
    timeout: 10000,
  });
}

/**
 * Verify navigation link functionality
 */
export async function testNavigationLink(
  page: Page,
  linkTestId: string,
  targetSectionId: string
) {
  await page.click(`[data-testid="${linkTestId}"]`);
  await waitForAnimations(page);

  const targetSection = page.locator(`${targetSectionId}`);
  await expect(targetSection).toBeInViewport();
}

/**
 * Verify hover effect with gold glow
 */
export async function verifyGoldHoverEffect(page: Page, selector: string) {
  const element = page.locator(selector);

  // Get initial state
  const initialColor = await element.evaluate((el) =>
    window.getComputedStyle(el).color
  );

  // Hover
  await element.hover();
  await waitForAnimations(page);

  // Verify color changed (should have gold in it)
  const hoverColor = await element.evaluate((el) =>
    window.getComputedStyle(el).color
  );

  expect(hoverColor).not.toBe(initialColor);
}

/**
 * Test form validation
 */
export async function testFormValidation(
  page: Page,
  formSelector: string,
  fieldName: string,
  invalidValue: string,
  errorExpected: boolean
) {
  const field = page.locator(`${formSelector} [name="${fieldName}"]`);
  await field.fill(invalidValue);
  await field.blur();

  if (errorExpected) {
    // Check for validation error
    const error = page.locator(`${formSelector} :text("required")`).or(
      page.locator(`${formSelector} :text("valid")`)
    );
    await expect(error).toBeVisible({ timeout: 2000 });
  }
}

/**
 * Verify LOTR quote presence
 */
export async function verifyQuote(page: Page, expectedText: string, author?: string) {
  const quoteElement = page.locator(`text="${expectedText}"`);
  await expect(quoteElement).toBeVisible();

  if (author) {
    // Author is displayed with em-dash prefix (— Author)
    // Use data-testid to find the specific quote container, then check author within it
    const quoteContainer = page.locator('[data-testid="lotr-quote"]').filter({ hasText: expectedText });
    const authorElement = quoteContainer.getByText(author, { exact: false });
    await expect(authorElement).toBeVisible();
  }
}

/**
 * Check for horizontal scroll (should not exist)
 */
export async function verifyNoHorizontalScroll(page: Page) {
  const hasHorizontalScroll = await page.evaluate(() => {
    return document.documentElement.scrollWidth > document.documentElement.clientWidth;
  });

  expect(hasHorizontalScroll).toBe(false);
}

/**
 * Test keyboard navigation
 */
export async function testKeyboardNavigation(page: Page, startSelector: string) {
  const startElement = page.locator(startSelector);
  await startElement.focus();

  // Tab through elements
  await page.keyboard.press('Tab');
  await waitForAnimations(page);

  // Verify focus moved
  const focusedElement = await page.evaluate(() => {
    const el = document.activeElement;
    return el ? el.getAttribute('data-testid') : null;
  });

  expect(focusedElement).not.toBeNull();
}

/**
 * Verify particle background animation
 */
export async function verifyParticleBackground(page: Page) {
  const canvas = page.locator('canvas');
  await expect(canvas).toBeVisible();

  // Verify canvas has dimensions
  const dimensions = await canvas.evaluate((el: HTMLCanvasElement) => ({
    width: el.width,
    height: el.height,
  }));

  expect(dimensions.width).toBeGreaterThan(0);
  expect(dimensions.height).toBeGreaterThan(0);
}

/**
 * Mobile menu helper
 */
export async function openMobileMenu(page: Page) {
  await page.click('[data-testid="mobile-menu-button"]');
  await expect(page.locator('[data-testid="mobile-menu"]')).toBeVisible();
}

export async function closeMobileMenu(page: Page) {
  await page.click('[data-testid="mobile-menu-button"]');
  await expect(page.locator('[data-testid="mobile-menu"]')).toBeHidden();
}
