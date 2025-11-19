import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright Configuration for Script Generation
 *
 * This config is specifically for /scripts/ generation tools (favicon, OG image)
 * It does NOT start the dev server - these scripts work with local HTML files
 */
export default defineConfig({
  testDir: './',

  // Timeout for generation tasks
  timeout: 30 * 1000,

  expect: {
    timeout: 10000,
  },

  // No parallel - run one at a time for resource generation
  fullyParallel: false,
  workers: 1,

  // Simple console reporter
  reporter: 'list',

  // Shared settings
  use: {
    // No base URL needed - we use file:// URLs
    trace: 'off', // Don't need traces for generation scripts
    screenshot: 'off', // We're generating screenshots, not taking failure screenshots
    video: 'off', // No video needed
    actionTimeout: 10000,
  },

  // Only use Chrome for generation
  projects: [
    {
      name: 'Desktop Chrome',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],

  // Output folder for generated assets
  outputDir: '../public/images',

  // NO webServer configuration - we don't need the dev server!
});
