# Playwright E2E Testing Documentation

## Overview

Comprehensive end-to-end testing suite for Ahmad Ibrahim's personal portfolio website, featuring visual regression testing, accessibility validation, and responsive design testing with a focus on the Gondor Noble LOTR theme.

## Test Infrastructure

### Technology Stack
- **Playwright**: v1.56.1 - Cross-browser testing framework
- **@axe-core/playwright**: v4.11.0 - Accessibility testing
- **TypeScript**: Type-safe test implementation
- **Multiple Browsers**: Chromium, Firefox, WebKit

### Project Configuration
- **Base URL**: `http://localhost:3001`
- **Test Directory**: `/tests/e2e`
- **Artifacts Directory**: `/artifacts`
- **Parallel Execution**: Enabled (disabled on CI)
- **Retries**: 2 on CI, 0 locally

## Test Suites

### 1. Navigation Tests (`navigation.spec.ts`)
Tests all navigation functionality including:
- Desktop and mobile navigation bars
- Smooth scroll to sections
- Sticky navigation behavior
- Hamburger menu on mobile
- Resume PDF download
- Navigation link hover effects

**Coverage**: 15+ test cases

### 2. Hero Section Tests (`hero-section.spec.ts`)
Validates the landing hero section:
- Name and tagline display
- Gandalf LOTR quote
- Scroll Down CTA button functionality
- Particle background animation
- Responsive typography
- Gold accent color theme
- Viewport height coverage

**Coverage**: 20+ test cases

### 3. Portfolio Sections Tests (`portfolio-sections.spec.ts`)
Comprehensive section validation:
- **About**: Bio, skills, stats display
- **Education**: Degree, certifications, architectural dividers
- **Experience**: Timeline, positions, Galadriel quote, gold accents
- **Skills**: Three categories, tech stacks, LOTR icons
- Sequential screenshot capture for visual regression

**Coverage**: 25+ test cases

### 4. Projects Tests (`projects.spec.ts`)
Project showcase testing:
- Sam Gamgee LOTR quote
- All project cards rendering
- Tech stack badges
- GitHub links validation
- Gold hover glow effects
- Responsive grid layouts
- Project descriptions and images

**Coverage**: 25+ test cases

### 5. Contact Form Tests (`contact-form.spec.ts`)
Form functionality and validation:
- Form field presence
- Required field validation
- Email format validation
- Social links (LinkedIn, GitHub, Email)
- Location information
- Gondor seal decoration
- Responsive form layout

**Coverage**: 30+ test cases

### 6. LOTR Interactive Elements Tests (`lotr-interactive.spec.ts`)
Theme-specific interactive features:
- Music player component
- All LOTR quotes in correct sections
- Custom LOTR icons with animations
- Particle background validation
- Gold hover effects on cards
- Gondor theme colors (dark background, gold accents)
- Architectural dividers
- Cinzel and Inter font usage

**Coverage**: 35+ test cases

### 7. Responsive Design Tests (`responsive.spec.ts`)
Multi-viewport testing:
- **Mobile** (375x667): Vertical stacking, mobile menu
- **Tablet** (768x1024): Responsive layouts
- **Desktop** (1920x1080): Full grid layouts, max-width constraints
- Breakpoint transitions
- No horizontal scroll validation
- Text readability across viewports
- Image responsiveness

**Coverage**: 25+ test cases

### 8. Accessibility Tests (`accessibility.spec.ts`)
WCAG 2.1 AA compliance:
- Automated axe-core scans on all sections
- Keyboard navigation (Tab, Enter, Space)
- Focus indicators visibility
- ARIA labels and roles
- Heading hierarchy (single h1)
- Color contrast validation (Gondor theme)
- Form accessibility and error messages
- Screen reader support
- External link security (rel="noopener")
- Reduced motion preference support

**Coverage**: 40+ test cases

## Running Tests

### Prerequisites
```bash
# Install dependencies
npm install

# Install Playwright browsers (already done)
npx playwright install
```

### Available Commands

#### Run All Tests
```bash
npm run test:e2e
```

#### Run Tests in UI Mode (Interactive)
```bash
npm run test:e2e:ui
```
Opens Playwright's UI interface for debugging and watching tests.

#### Run Tests in Headed Mode (Watch Browser)
```bash
npm run test:e2e:headed
```
Shows browser window during test execution.

#### Debug Mode (Step Through Tests)
```bash
npm run test:e2e:debug
```
Opens Playwright Inspector for step-by-step debugging.

#### View Test Report
```bash
npm run test:e2e:report
```
Opens the HTML report from the last test run.

#### Update Visual Snapshots
```bash
npm run snap:update
```
Updates baseline screenshots for visual regression testing.

### Run Specific Test Suite
```bash
# Navigation tests only
npx playwright test navigation

# Accessibility tests only
npx playwright test accessibility

# Single test file
npx playwright test tests/e2e/hero-section.spec.ts
```

### Run Tests on Specific Browser
```bash
# Chrome only
npx playwright test --project="Desktop Chrome"

# Mobile only
npx playwright test --project="Mobile Chrome"

# Safari only
npx playwright test --project="Desktop Safari"
```

### Run Tests by Tag/Pattern
```bash
# Tests matching a pattern
npx playwright test -g "should display hero"

# Specific section
npx playwright test -g "Hero Section"
```

## Artifacts

All test artifacts are stored in the `/artifacts` directory:

### Directory Structure
```
artifacts/
├── screenshots/          # Visual regression screenshots
│   ├── hero-section-full-2025-10-29.png
│   ├── mobile-375-home-2025-10-29.png
│   └── ...
├── traces/              # Playwright traces (on failure/retry)
│   └── trace-{timestamp}.zip
├── a11y/                # Accessibility scan reports (JSON)
│   ├── a11y-hero-2025-10-29.json
│   ├── a11y-full-page-2025-10-29.json
│   └── ...
├── playwright-report/   # HTML test report
│   └── index.html
├── test-output/         # Test execution artifacts
│   └── ...
└── test-results.json    # JSON test results
```

### Screenshot Naming Convention
Format: `{section-name}-{viewport}-{timestamp}.png`

Examples:
- `hero-desktop-1920x1080-2025-10-29.png`
- `mobile-menu-open-2025-10-29.png`
- `navigation-sticky-2025-10-29.png`

### Accessibility Reports
JSON format following axe-core schema:
- Violations with severity levels
- WCAG success criteria
- Suggested remediation
- Element selectors

## Test Helpers

Location: `/tests/helpers/test-helpers.ts`

### Available Helper Functions

#### Navigation & Scrolling
```typescript
scrollToSection(page, sectionId) // Smooth scroll to section
waitForAnimations(page)          // Wait for animations to complete
```

#### Screenshots
```typescript
captureScreenshot(page, name, options)
// Options: { fullPage: true/false }
```

#### Accessibility
```typescript
runAccessibilityScan(page, context)
// Runs axe-core and saves JSON report
```

#### Validation
```typescript
verifyQuote(page, text, author)
verifyParticleBackground(page)
verifyNoHorizontalScroll(page)
isInViewport(page, selector)
```

#### Interactions
```typescript
testNavigationLink(page, linkTestId, targetSectionId)
verifyGoldHoverEffect(page, selector)
openMobileMenu(page)
closeMobileMenu(page)
testKeyboardNavigation(page, startSelector)
```

## Debugging Failed Tests

### 1. View HTML Report
```bash
npm run test:e2e:report
```
Shows detailed test results with screenshots and traces.

### 2. Run Single Test in Debug Mode
```bash
npx playwright test --debug -g "test name"
```

### 3. Inspect Trace
```bash
npx playwright show-trace artifacts/traces/trace-{timestamp}.zip
```

### 4. Check Screenshots
Failed tests automatically capture screenshots saved in:
`artifacts/test-output/{test-name}/test-failed.png`

### 5. View Accessibility Report
```bash
cat artifacts/a11y/a11y-{section}-{timestamp}.json | jq
```

## CI/CD Integration

### GitHub Actions Example
```yaml
name: E2E Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm run build
      - run: npm run test:e2e
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: artifacts/
          retention-days: 30
```

### Environment Variables
```bash
# Force CI mode (affects retries and parallel execution)
CI=true npm run test:e2e

# Custom base URL
BASE_URL=https://staging.example.com npm run test:e2e
```

## Test Coverage Summary

### Total Test Cases: 215+

**By Category:**
- Navigation: 15 tests
- Hero Section: 20 tests
- Portfolio Sections: 25 tests
- Projects: 25 tests
- Contact Form: 30 tests
- LOTR Interactive: 35 tests
- Responsive Design: 25 tests
- Accessibility: 40 tests

**By Type:**
- Functional Tests: 60%
- Visual Regression: 20%
- Accessibility: 15%
- Responsive: 5%

### Critical User Journeys Covered
1. ✅ Landing and viewing hero section
2. ✅ Navigating to all sections via menu
3. ✅ Viewing projects and clicking GitHub links
4. ✅ Filling out and validating contact form
5. ✅ Mobile navigation and menu
6. ✅ Keyboard-only navigation
7. ✅ Screen reader compatibility
8. ✅ Resume PDF download

## Best Practices

### 1. Use Data Test IDs
All components have `data-testid` attributes:
```typescript
page.locator('[data-testid="hero-section"]')
```

### 2. Wait for Animations
Always wait for animations before assertions:
```typescript
await waitForAnimations(page);
```

### 3. Avoid Hard-Coded Delays
Use Playwright's built-in waiting:
```typescript
// ❌ Bad
await page.waitForTimeout(5000);

// ✅ Good
await page.waitForSelector('[data-testid="section"]', { state: 'visible' });
```

### 4. Make Tests Independent
Each test should be runnable in isolation:
```typescript
test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await waitForAnimations(page);
});
```

### 5. Use Descriptive Test Names
```typescript
test('should display Galadriel quote in Experience section', async ({ page }) => {
  // Test implementation
});
```

### 6. Capture Screenshots for Visual Issues
```typescript
await captureScreenshot(page, 'section-name', { fullPage: false });
```

## Maintenance

### Updating Tests
When components change:
1. Update data-testid selectors if changed
2. Update expected text/content
3. Re-capture visual snapshots: `npm run snap:update`
4. Update accessibility baselines if layout changes

### Adding New Tests
1. Create new spec file in `/tests/e2e/`
2. Import helpers from `/tests/helpers/test-helpers.ts`
3. Follow existing test structure
4. Add to this README documentation

### Performance Optimization
- Tests run in parallel by default
- Use `test.describe.serial()` only when tests must run sequentially
- Keep test scope focused (test one thing per test)
- Use fixtures for common setup

## Troubleshooting

### Port Already in Use
If port 3001 is busy:
```bash
# Find and kill process on port 3001
lsof -ti:3001 | xargs kill -9

# Or change port in playwright.config.ts
```

### Browser Installation Issues
```bash
# Reinstall browsers
npx playwright install --force

# Install with system dependencies
npx playwright install --with-deps
```

### TypeScript Errors
```bash
# Run type check
npm run type-check

# Restart TypeScript server in IDE
```

### Flaky Tests
1. Increase timeout in playwright.config.ts
2. Add explicit waits before assertions
3. Check for race conditions
4. Run test multiple times to reproduce

## Resources

- [Playwright Documentation](https://playwright.dev/)
- [Axe-core Accessibility](https://github.com/dequelabs/axe-core)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Test Best Practices](https://playwright.dev/docs/best-practices)

## Contact

For questions or issues with the test suite:
- **Developer**: Ahmad Ibrahim
- **Email**: ahmadhibrahim316@gmail.com
- **GitHub**: https://github.com/AH316

---

**Last Updated**: October 29, 2025
**Test Framework**: Playwright v1.56.1
**Coverage**: 215+ test cases across 8 test suites
