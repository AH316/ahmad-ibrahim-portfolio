import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';

/**
 * Favicon Generation Test Suite
 *
 * This test generates all required favicon formats for the portfolio:
 * - favicon.ico (32x32) - Standard browser favicon
 * - icon-192.png (192x192) - Web app manifest icon
 * - icon-512.png (512x512) - Web app manifest icon (high res)
 * - apple-icon.png (180x180) - Apple touch icon for iOS devices
 *
 * All icons feature the White Tree of Gondor on a dark background.
 */

test.describe('Favicon Generation', () => {
  // Use absolute paths
  const htmlFilePath = '/Users/Ahmad/Work/Projects/personal_website/scripts/generate-favicon.html';
  const publicDir = '/Users/Ahmad/Work/Projects/personal_website/public';

  test.beforeAll(async () => {
    // Ensure public directory exists
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    console.log('Using HTML file:', htmlFilePath);
    console.log('Output directory:', publicDir);
    console.log('HTML file exists:', fs.existsSync(htmlFilePath));
  });

  test('should generate 32x32 favicon.ico', async ({ page }) => {
    await page.goto(`file://${htmlFilePath}`);

    const faviconElement = page.locator('#favicon-32');
    await expect(faviconElement).toBeVisible();

    // Take screenshot of the 32x32 container
    const screenshot = await faviconElement.screenshot({
      omitBackground: false,
    });

    // Save as PNG first (browsers expect PNG data in .ico files for modern support)
    const faviconPath = path.join(publicDir, 'favicon.png');
    fs.writeFileSync(faviconPath, screenshot);

    console.log(`✓ Generated: ${faviconPath}`);
    console.log('  Note: For .ico format, you may need to convert this PNG manually.');
    console.log('  Online tool: https://favicon.io/favicon-converter/');
  });

  test('should generate 192x192 web app icon', async ({ page }) => {
    await page.goto(`file://${htmlFilePath}`);

    const iconElement = page.locator('#favicon-192');
    await expect(iconElement).toBeVisible();

    const screenshot = await iconElement.screenshot({
      omitBackground: false,
    });

    const iconPath = path.join(publicDir, 'icon-192.png');
    fs.writeFileSync(iconPath, screenshot);

    console.log(`✓ Generated: ${iconPath}`);
  });

  test('should generate 512x512 web app icon', async ({ page }) => {
    await page.goto(`file://${htmlFilePath}`);

    const iconElement = page.locator('#favicon-512');
    await expect(iconElement).toBeVisible();

    const screenshot = await iconElement.screenshot({
      omitBackground: false,
    });

    const iconPath = path.join(publicDir, 'icon-512.png');
    fs.writeFileSync(iconPath, screenshot);

    console.log(`✓ Generated: ${iconPath}`);
  });

  test('should generate 180x180 apple touch icon', async ({ page }) => {
    await page.goto(`file://${htmlFilePath}`);

    const iconElement = page.locator('#apple-icon');
    await expect(iconElement).toBeVisible();

    const screenshot = await iconElement.screenshot({
      omitBackground: false,
    });

    const iconPath = path.join(publicDir, 'apple-icon.png');
    fs.writeFileSync(iconPath, screenshot);

    console.log(`✓ Generated: ${iconPath}`);
  });

  test('should verify all generated files exist', async ({ page }) => {
    // This test runs after all generation tests
    const expectedFiles = [
      'favicon.png',
      'icon-192.png',
      'icon-512.png',
      'apple-icon.png',
    ];

    console.log('\n=== Favicon Generation Summary ===');

    for (const file of expectedFiles) {
      const filePath = path.join(publicDir, file);
      const exists = fs.existsSync(filePath);

      if (exists) {
        const stats = fs.statSync(filePath);
        console.log(`✓ ${file} (${Math.round(stats.size / 1024)}KB)`);
      } else {
        console.log(`✗ ${file} - NOT FOUND`);
      }

      expect(exists).toBe(true);
    }

    console.log('\n=== Next Steps ===');
    console.log('1. Convert favicon.png to favicon.ico using:');
    console.log('   - Online: https://favicon.io/favicon-converter/');
    console.log('   - CLI: imagemagick (convert favicon.png favicon.ico)');
    console.log('\n2. Add to app/layout.tsx:');
    console.log('   <link rel="icon" href="/favicon.ico" />');
    console.log('   <link rel="apple-touch-icon" href="/apple-icon.png" />');
    console.log('\n3. Create app/manifest.json:');
    console.log('   {');
    console.log('     "icons": [');
    console.log('       { "src": "/icon-192.png", "sizes": "192x192", "type": "image/png" },');
    console.log('       { "src": "/icon-512.png", "sizes": "512x512", "type": "image/png" }');
    console.log('     ]');
    console.log('   }');
  });
});
