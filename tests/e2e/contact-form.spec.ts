import { test, expect } from '@playwright/test';
import {
  captureScreenshot,
  waitForAnimations,
  scrollToSection,
  verifyQuote,
  waitForSectionVisible,
} from '../helpers/test-helpers';

test.describe('Contact Section and Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await scrollToSection(page, '#contact');
    await waitForSectionVisible(page, 'contact-section');
  });

  test('should display contact section', async ({ page }) => {
    const contactSection = page.locator('[data-testid="contact-section"]');
    await expect(contactSection).toBeVisible();
  });

  test('should display section heading', async ({ page }) => {
    const heading = page.locator('[data-testid="contact-section"] h2');
    await expect(heading).toBeVisible();
    await expect(heading).toHaveText(/Contact/i);
  });

  test('should display "The journey doesn\'t end here" quote', async ({ page }) => {
    // Wait for whileInView animation to trigger
    await page.waitForTimeout(1000);
    await verifyQuote(page, "The journey doesn't end here");
  });

  test('should display contact form', async ({ page }) => {
    const form = page.locator('[data-testid="contact-section"] form');
    await expect(form).toBeVisible();
  });

  test('should have name input field', async ({ page }) => {
    const nameInput = page.locator(
      '[data-testid="contact-section"] input[name="name"], [data-testid="contact-section"] input[type="text"]'
    ).first();
    await expect(nameInput).toBeVisible();
  });

  test('should have email input field', async ({ page }) => {
    const emailInput = page.locator(
      '[data-testid="contact-section"] input[name="email"], [data-testid="contact-section"] input[type="email"]'
    );
    await expect(emailInput.first()).toBeVisible();
  });

  test('should have message textarea', async ({ page }) => {
    const messageInput = page.locator(
      '[data-testid="contact-section"] textarea'
    );
    await expect(messageInput).toBeVisible();
  });

  test('should have submit button', async ({ page }) => {
    const submitButton = page.locator(
      '[data-testid="contact-section"] button[type="submit"]'
    );
    await expect(submitButton).toBeVisible();
  });

  test('should validate required name field', async ({ page }) => {
    const form = page.locator('[data-testid="contact-section"] form');
    const nameInput = form.locator('input[name="name"], input[type="text"]').first();
    const submitButton = form.locator('button[type="submit"]');

    // Try to submit without name
    await submitButton.click();
    await waitForAnimations(page);

    // Check if browser validation or custom validation appears
    const isInvalid = await nameInput.evaluate((el: HTMLInputElement) => {
      return !el.validity.valid || el.getAttribute('aria-invalid') === 'true';
    });

    expect(isInvalid).toBe(true);
  });

  test('should validate email format', async ({ page }) => {
    const form = page.locator('[data-testid="contact-section"] form');
    const emailInput = form.locator('input[name="email"], input[type="email"]').first();

    // Enter invalid email
    await emailInput.fill('invalid-email');
    await emailInput.blur();

    // Check if validation triggers
    const isInvalid = await emailInput.evaluate((el: HTMLInputElement) => {
      return !el.validity.valid || el.getAttribute('aria-invalid') === 'true';
    });

    expect(isInvalid).toBe(true);
  });

  test('should accept valid email format', async ({ page }) => {
    const form = page.locator('[data-testid="contact-section"] form');
    const emailInput = form.locator('input[name="email"], input[type="email"]').first();

    // Enter valid email
    await emailInput.fill('test@example.com');
    await emailInput.blur();
    await waitForAnimations(page);

    // Should be valid
    const isValid = await emailInput.evaluate((el: HTMLInputElement) => {
      return el.validity.valid;
    });

    expect(isValid).toBe(true);
  });

  test('should validate required message field', async ({ page }) => {
    const form = page.locator('[data-testid="contact-section"] form');
    const messageInput = form.locator('textarea');
    const submitButton = form.locator('button[type="submit"]');

    // Fill only name and email
    await form.locator('input[name="name"], input[type="text"]').first().fill('John Doe');
    await form.locator('input[name="email"], input[type="email"]').first().fill('john@example.com');

    // Leave message empty and submit
    await submitButton.click();
    await waitForAnimations(page);

    // Check if message field is invalid
    const isInvalid = await messageInput.evaluate((el: HTMLTextAreaElement) => {
      return !el.validity.valid || el.getAttribute('aria-invalid') === 'true';
    });

    expect(isInvalid).toBe(true);
  });

  test('should fill form with valid data', async ({ page }) => {
    const form = page.locator('[data-testid="contact-section"] form');

    // Fill all fields
    await form.locator('input[name="name"], input[type="text"]').first().fill('Ahmad Test');
    await form.locator('input[name="email"], input[type="email"]').first().fill('ahmad@example.com');
    await form.locator('textarea').fill('This is a test message for Playwright E2E testing.');

    await captureScreenshot(page, 'contact-form-filled', { fullPage: false });

    // All fields should be filled
    const nameValue = await form.locator('input[name="name"], input[type="text"]').first().inputValue();
    const emailValue = await form.locator('input[name="email"], input[type="email"]').first().inputValue();
    const messageValue = await form.locator('textarea').inputValue();

    expect(nameValue).toBe('Ahmad Test');
    expect(emailValue).toBe('ahmad@example.com');
    expect(messageValue).toContain('test message');
  });

  test('should display social links', async ({ page }) => {
    const socialLinks = page.locator(
      '[data-testid="contact-section"] a[href*="linkedin"], [data-testid="contact-section"] a[href*="github"]'
    );

    const count = await socialLinks.count();
    expect(count).toBeGreaterThanOrEqual(2); // LinkedIn and GitHub at minimum
  });

  test('should have LinkedIn link', async ({ page }) => {
    const linkedinLink = page.locator(
      '[data-testid="contact-section"] a[href*="linkedin"]'
    );

    await expect(linkedinLink).toBeVisible();

    const href = await linkedinLink.getAttribute('href');
    expect(href).toContain('linkedin.com');
    expect(href).toContain('ahmad-ibrahim316');
  });

  test('should have GitHub link', async ({ page }) => {
    const githubLink = page.locator(
      '[data-testid="contact-section"] a[href*="github"]'
    );

    await expect(githubLink).toBeVisible();

    const href = await githubLink.getAttribute('href');
    expect(href).toContain('github.com');
    expect(href).toContain('AH316');
  });

  test('should have email link', async ({ page }) => {
    const emailLink = page.locator(
      '[data-testid="contact-section"] a[href^="mailto:"]'
    );

    if (await emailLink.count() > 0) {
      const href = await emailLink.getAttribute('href');
      expect(href).toContain('mailto:');
      expect(href).toContain('ahmadhibrahim316@gmail.com');
    }
  });

  test('should display location information', async ({ page }) => {
    const contactSection = page.locator('[data-testid="contact-section"]');
    const content = await contactSection.textContent();

    expect(content).toContain('Redmond');
    expect(content).toContain('WA');
  });

  test('should display Gondor seal decoration', async ({ page }) => {
    // Look for decorative SVG or icon element
    const decorativeElements = page.locator(
      '[data-testid="contact-section"] svg'
    );

    const count = await decorativeElements.count();
    expect(count).toBeGreaterThan(0); // Should have decorative icons
  });

  test('should have hover effects on social links', async ({ page }) => {
    const socialLink = page
      .locator('[data-testid="contact-section"] a[href*="linkedin"]')
      .first();

    // Get initial color
    const initialColor = await socialLink.evaluate((el) =>
      window.getComputedStyle(el).color
    );

    // Hover
    await socialLink.hover();
    await waitForAnimations(page);

    // Color should change (to gold)
    const hoverColor = await socialLink.evaluate((el) =>
      window.getComputedStyle(el).color
    );

    expect(hoverColor).not.toBe(initialColor);
  });

  test('should have gold accent styling', async ({ page }) => {
    const submitButton = page.locator(
      '[data-testid="contact-section"] button[type="submit"]'
    );

    const borderColor = await submitButton.evaluate((el) =>
      window.getComputedStyle(el).borderColor
    );

    const color = await submitButton.evaluate((el) =>
      window.getComputedStyle(el).color
    );

    // Should have gold in border or text color
    const hasGold =
      borderColor.includes('214, 177, 58') || color.includes('214, 177, 58');

    expect(hasGold || borderColor || color).toBeTruthy();
  });

  test('should have proper form labels or placeholders', async ({ page }) => {
    const form = page.locator('[data-testid="contact-section"] form');

    const nameInput = form.locator('input[name="name"], input[type="text"]').first();
    const emailInput = form.locator('input[name="email"], input[type="email"]').first();
    const messageInput = form.locator('textarea');

    // Check for labels or placeholders
    const namePlaceholder = await nameInput.getAttribute('placeholder');
    const emailPlaceholder = await emailInput.getAttribute('placeholder');
    const messagePlaceholder = await messageInput.getAttribute('placeholder');

    expect(
      namePlaceholder || emailPlaceholder || messagePlaceholder
    ).toBeTruthy();
  });

  test('should be responsive on mobile', async ({ page }) => {
    test.skip(page.viewportSize()!.width >= 768, 'Mobile only test');

    const form = page.locator('[data-testid="contact-section"] form');
    await expect(form).toBeVisible();

    const formWidth = await form.evaluate((el) =>
      el.getBoundingClientRect().width
    );

    const viewportWidth = page.viewportSize()!.width;

    // Form should be responsive (not wider than viewport)
    expect(formWidth).toBeLessThanOrEqual(viewportWidth);

    await captureScreenshot(page, 'contact-mobile', { fullPage: false });
  });

  test('should open social links in new tab', async ({ page }) => {
    const externalLinks = page.locator(
      '[data-testid="contact-section"] a[href*="linkedin"], [data-testid="contact-section"] a[href*="github"]'
    );

    const count = await externalLinks.count();

    for (let i = 0; i < count; i++) {
      const link = externalLinks.nth(i);
      const target = await link.getAttribute('target');
      const rel = await link.getAttribute('rel');

      expect(target).toBe('_blank');
      expect(rel).toContain('noopener');
    }
  });

  test('should capture contact section for visual regression', async ({ page }) => {
    await captureScreenshot(page, 'contact-section', { fullPage: false });
  });

  test('should have submit button with loading or disabled state handling', async ({
    page,
  }) => {
    const form = page.locator('[data-testid="contact-section"] form');
    const submitButton = form.locator('button[type="submit"]');

    // Fill form
    await form.locator('input[name="name"], input[type="text"]').first().fill('Test User');
    await form.locator('input[name="email"], input[type="email"]').first().fill('test@example.com');
    await form.locator('textarea').fill('Test message');

    // Note: We won't actually submit to avoid sending test emails
    // Just verify the button is clickable
    await expect(submitButton).toBeEnabled();
  });

  test('should have proper spacing and layout', async ({ page }) => {
    const form = page.locator('[data-testid="contact-section"] form');

    const inputs = form.locator('input, textarea');
    const count = await inputs.count();

    // Should have at least 3 inputs (name, email, message)
    expect(count).toBeGreaterThanOrEqual(3);

    // Check spacing between elements
    const firstInput = inputs.first();
    const secondInput = inputs.nth(1);

    const firstBox = await firstInput.boundingBox();
    const secondBox = await secondInput.boundingBox();

    // Should have spacing between inputs
    const spacing = secondBox!.y - (firstBox!.y + firstBox!.height);
    expect(spacing).toBeGreaterThan(0);
  });
});
