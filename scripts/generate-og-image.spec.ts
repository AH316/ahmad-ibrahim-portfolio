import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';

/**
 * Open Graph Image Generation Test Suite
 *
 * This test generates the OG image for social media sharing:
 * - og-image.jpg (1200x630) - Standard Open Graph image size
 *
 * The image features Ahmad's portfolio branding with:
 * - Name and tagline
 * - Current role at Intellica Inc.
 * - Professional stats (years of experience, projects, skills)
 * - Gondor Noble LOTR theme aesthetic
 *
 * Data is dynamically pulled from lib/content.ts via the HTML file.
 */

test.describe('Open Graph Image Generation', () => {
  // Use absolute paths
  const htmlFilePath = '/Users/Ahmad/Work/Projects/personal_website/scripts/og-image.html';
  const publicDir = '/Users/Ahmad/Work/Projects/personal_website/public/images';

  test.beforeAll(async () => {
    // Ensure public/images directory exists
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    console.log('\n=== Open Graph Image Generation Setup ===');
    console.log('Source HTML:', htmlFilePath);
    console.log('Output directory:', publicDir);
    console.log('HTML file exists:', fs.existsSync(htmlFilePath));
  });

  test('should generate 1200x630 Open Graph image', async ({ page }) => {
    // Set viewport to exact OG image dimensions
    await page.setViewportSize({ width: 1200, height: 630 });

    // Navigate to the HTML file
    await page.goto(`file://${htmlFilePath}`);

    // Wait for Google Fonts to load
    // This is critical for proper rendering of Cinzel and Inter fonts
    await page.waitForLoadState('networkidle');

    // Additional wait to ensure fonts are fully applied
    // We check for the Cinzel font on the name element
    await page.waitForFunction(() => {
      const nameElement = document.getElementById('name');
      if (!nameElement) return false;
      const computedStyle = window.getComputedStyle(nameElement);
      return computedStyle.fontFamily.includes('Cinzel');
    }, { timeout: 10000 });

    console.log('✓ Fonts loaded and applied');

    // Wait for all dynamic content to be populated by the script
    await page.waitForFunction(() => {
      const yearsElement = document.getElementById('years');
      const projectsElement = document.getElementById('projects');
      const skillsElement = document.getElementById('skills');

      return (
        yearsElement?.textContent?.includes('+') &&
        projectsElement?.textContent &&
        skillsElement?.textContent?.includes('+')
      );
    }, { timeout: 5000 });

    console.log('✓ Dynamic content populated');

    // Locate the OG image container (excluding preview title/subtitle)
    const ogImageElement = page.locator('#og-image');
    await expect(ogImageElement).toBeVisible();

    // Take screenshot of the exact OG image div (1200x630)
    const screenshot = await ogImageElement.screenshot({
      omitBackground: false,
      type: 'jpeg',
      quality: 90, // High quality JPEG
    });

    // Save to public/images/og-image.jpg
    const ogImagePath = path.join(publicDir, 'og-image.jpg');
    fs.writeFileSync(ogImagePath, screenshot);

    // Verify file was created
    const stats = fs.statSync(ogImagePath);
    const fileSizeKB = Math.round(stats.size / 1024);

    console.log(`✓ Generated: ${ogImagePath}`);
    console.log(`  File size: ${fileSizeKB}KB`);

    // Sanity check: file size should be > 10KB
    expect(stats.size).toBeGreaterThan(10000);
  });

  test('should verify generated OG image properties', async ({ page }) => {
    const ogImagePath = path.join(publicDir, 'og-image.jpg');

    // Check file exists
    expect(fs.existsSync(ogImagePath)).toBe(true);

    // Check file size is reasonable (between 10KB and 500KB)
    const stats = fs.statSync(ogImagePath);
    expect(stats.size).toBeGreaterThan(10000);
    expect(stats.size).toBeLessThan(500000);

    console.log('\n=== Open Graph Image Summary ===');
    console.log(`✓ og-image.jpg (${Math.round(stats.size / 1024)}KB)`);
    console.log('  Dimensions: 1200 x 630 pixels');
    console.log('  Format: JPEG (quality: 90)');
    console.log('  Location: /public/images/og-image.jpg');
    console.log('\n=== Next Steps ===');
    console.log('1. Verify the image looks correct by opening:');
    console.log(`   ${ogImagePath}`);
    console.log('\n2. Update lib/content.ts seoMetadata.ogImage:');
    console.log('   ogImage: "/images/og-image.jpg"');
    console.log('\n3. Add to app/layout.tsx meta tags:');
    console.log('   <meta property="og:image" content="/images/og-image.jpg" />');
    console.log('   <meta property="og:image:width" content="1200" />');
    console.log('   <meta property="og:image:height" content="630" />');
    console.log('   <meta name="twitter:card" content="summary_large_image" />');
    console.log('   <meta name="twitter:image" content="/images/og-image.jpg" />');
    console.log('\n4. Test with social media debuggers:');
    console.log('   - Facebook: https://developers.facebook.com/tools/debug/');
    console.log('   - Twitter: https://cards-dev.twitter.com/validator');
    console.log('   - LinkedIn: https://www.linkedin.com/post-inspector/');
  });

  test('should capture PNG version for higher quality', async ({ page }) => {
    // Set viewport to exact OG image dimensions
    await page.setViewportSize({ width: 1200, height: 630 });

    // Navigate to the HTML file
    await page.goto(`file://${htmlFilePath}`);

    // Wait for fonts and content
    await page.waitForLoadState('networkidle');
    await page.waitForFunction(() => {
      const nameElement = document.getElementById('name');
      if (!nameElement) return false;
      const computedStyle = window.getComputedStyle(nameElement);
      return computedStyle.fontFamily.includes('Cinzel');
    }, { timeout: 10000 });

    // Locate the OG image container
    const ogImageElement = page.locator('#og-image');
    await expect(ogImageElement).toBeVisible();

    // Take PNG screenshot for higher quality (no compression artifacts)
    const screenshot = await ogImageElement.screenshot({
      omitBackground: false,
      type: 'png',
    });

    // Save to public/images/og-image.png
    const ogImagePath = path.join(publicDir, 'og-image.png');
    fs.writeFileSync(ogImagePath, screenshot);

    // Verify file was created
    const stats = fs.statSync(ogImagePath);
    const fileSizeKB = Math.round(stats.size / 1024);

    console.log(`✓ Generated PNG version: ${ogImagePath}`);
    console.log(`  File size: ${fileSizeKB}KB`);
    console.log('  Note: PNG provides higher quality but larger file size than JPEG');
    console.log('  Recommendation: Use JPEG for production (faster load times)');

    // Sanity check: file size should be > 10KB
    expect(stats.size).toBeGreaterThan(10000);
  });

  test('should verify data matches lib/content.ts expectations', async ({ page }) => {
    // Navigate to the HTML file
    await page.goto(`file://${htmlFilePath}`);
    await page.waitForLoadState('networkidle');

    // Verify all expected elements are present and populated
    const nameText = await page.locator('#name').textContent();
    const taglineText = await page.locator('#tagline').textContent();
    const roleText = await page.locator('#current-role').textContent();
    const yearsText = await page.locator('#years').textContent();
    const projectsText = await page.locator('#projects').textContent();
    const skillsText = await page.locator('#skills').textContent();

    console.log('\n=== Data Verification ===');
    console.log(`Name: ${nameText}`);
    console.log(`Tagline: ${taglineText}`);
    console.log(`Current Role: ${roleText}`);
    console.log(`Years of Experience: ${yearsText}`);
    console.log(`Projects: ${projectsText}`);
    console.log(`Skills: ${skillsText}`);

    // Assertions
    expect(nameText).toBe('Ahmad Ibrahim');
    expect(taglineText).toBe('Software Developer');
    expect(roleText).toContain('Intellica Inc.');
    expect(yearsText).toMatch(/\d+\+/); // Should be "X+" format
    expect(projectsText).toMatch(/\d+/); // Should be a number
    expect(skillsText).toMatch(/\d+\+/); // Should be "X+" format

    console.log('✓ All data verification checks passed');
  });
});
