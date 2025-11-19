# Open Graph Image Generation Guide

## Overview

Automated Playwright script to generate social media Open Graph images from the portfolio HTML template.

## Files Created

### 1. Test Script
**Location**: `/scripts/generate-og-image.spec.ts`

**Purpose**: Playwright test that:
- Opens `og-image.html` in a browser
- Sets viewport to 1200x630px (Open Graph standard)
- Waits for Google Fonts to load (Cinzel, Inter)
- Screenshots the OG image container
- Saves both JPEG and PNG versions
- Verifies data matches `lib/content.ts`

### 2. Source HTML
**Location**: `/scripts/og-image.html`

**Features**:
- Standalone HTML with embedded styles
- Displays Ahmad's name, tagline, current role
- Shows professional stats (years, projects, skills)
- Gondor Noble theme styling
- Dynamic data via JavaScript

### 3. Output Images
**Location**: `/public/images/`

**Files Generated**:
- `og-image.jpg` - JPEG version (quality 90, smaller file size, ~50-150KB)
- `og-image.png` - PNG version (lossless, larger file size, ~200-400KB)

**Recommendation**: Use JPEG for production (faster load times on social media).

## Usage

### Quick Start

```bash
# Generate OG images
npm run generate:og
```

### Manual Steps (if script doesn't work)

1. Open `scripts/og-image.html` in browser
2. Press F12 to open DevTools
3. Click Device Toolbar icon (or Ctrl+Shift+M / Cmd+Shift+M)
4. Select "Responsive" mode
5. Set dimensions to 1200 x 630
6. Right-click on the gold-bordered card → "Capture node screenshot"
7. Save as `public/images/og-image.jpg`

## Generated Image Details

### Dimensions
- Width: 1200px
- Height: 630px
- Aspect Ratio: 1.91:1 (Open Graph standard)

### Content
- **Main Title**: Ahmad Ibrahim (Cinzel font, 72px)
- **Tagline**: Software Developer (Inter font, 36px)
- **Current Role**: Software Engineer @ Intellica Inc. (with gold accent bar)
- **Stats Bar**:
  - Years of Experience: 2+
  - Projects: 4
  - Skills: 25+
- **Website**: ahmadibrahim.dev
- **Watermark**: White Tree symbol (⚜) at 8% opacity

### Design System
- **Background**: Gradient from #1a1a1a to #2a2a2a
- **Text Colors**:
  - Primary: #f9fafb (gondor-white)
  - Secondary: #eeeff1 (gondor-silver)
  - Accent: #d6b13a (gondor-gold)
- **Border**: 2px solid gold (#d6b13a)
- **Font Stack**:
  - Headings: Cinzel (serif, elegant)
  - Body: Inter (sans-serif, clean)

## Integration with Portfolio

### Step 1: Verify Image

After generation, verify the image:

```bash
# Check if images were created
ls -lh public/images/og-image.*

# Open the image to preview
open public/images/og-image.jpg  # macOS
# or
xdg-open public/images/og-image.jpg  # Linux
# or
start public/images/og-image.jpg  # Windows
```

### Step 2: Update lib/content.ts

If not already set, update the SEO metadata:

```typescript
export const seoMetadata = {
  // ... other fields
  ogImage: "/images/og-image.jpg",
};
```

### Step 3: Add Meta Tags to app/layout.tsx

Ensure these meta tags are present in your layout:

```tsx
<meta property="og:image" content="/images/og-image.jpg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:type" content="image/jpeg" />

{/* Twitter Card */}
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:image" content="/images/og-image.jpg" />
```

### Step 4: Test with Social Media Debuggers

Before deploying, test the OG image with these tools:

1. **Facebook Sharing Debugger**
   - URL: https://developers.facebook.com/tools/debug/
   - Enter your deployed site URL
   - Click "Scrape Again" to refresh cache

2. **Twitter Card Validator**
   - URL: https://cards-dev.twitter.com/validator
   - Enter your deployed site URL
   - Preview how it appears in tweets

3. **LinkedIn Post Inspector**
   - URL: https://www.linkedin.com/post-inspector/
   - Enter your deployed site URL
   - See how it appears when shared on LinkedIn

## Troubleshooting

### Fonts Not Loading

If the screenshot shows system fonts instead of Cinzel/Inter:

```bash
# Increase timeout in the test
# Edit generate-og-image.spec.ts:
# Change waitForFunction timeout to 15000 or 20000
```

### Test Hangs or Times Out

If Playwright browsers aren't installed:

```bash
# Install Playwright browsers
npx playwright install chromium

# Or install all browsers
npx playwright install
```

### Wrong Data Showing

The HTML file has hardcoded stats. To update:

1. Edit `/scripts/og-image.html`
2. Update the JavaScript calculations at the bottom
3. Or regenerate from `lib/content.ts` data

### Image Quality Issues

For better quality PNG:

```bash
# The test generates both JPEG and PNG
# Use PNG for higher quality (no compression artifacts)
# File will be larger (~3-4x JPEG size)
```

## Advanced: Regenerating on Content Changes

To automatically regenerate OG image when content changes:

```bash
# Add to package.json scripts:
"prebuild": "npm run generate:og"

# Now OG image regenerates before every build
```

## Test Configuration

The test suite includes 4 tests:

1. **Generate JPEG (1200x630)** - Main OG image at 90% quality
2. **Verify Image Properties** - Checks file exists, size is reasonable
3. **Generate PNG Version** - Lossless alternative (larger file)
4. **Verify Data Matches** - Ensures content matches expectations

## Performance

### File Sizes (approximate)

| Format | Size Range | Use Case |
|--------|-----------|----------|
| JPEG (quality 90) | 50-150KB | Production (recommended) |
| PNG (lossless) | 200-400KB | Archival / High quality needs |

### Social Media Recommendations

- **Maximum Size**: Most platforms support up to 8MB, but aim for < 1MB
- **Minimum Dimensions**: 600x315px (1.91:1 ratio)
- **Recommended Dimensions**: 1200x630px (standard)
- **Format**: JPEG or PNG both supported

## Updating the OG Image

When you update portfolio content (new role, more projects, etc.):

1. Update `/lib/content.ts` with new data
2. (Optional) Update `/scripts/og-image.html` JavaScript if calculations changed
3. Run: `npm run generate:og`
4. Verify new image: `open public/images/og-image.jpg`
5. Commit and deploy

## Notes

- **Dynamic Data**: Stats are calculated via JavaScript in the HTML file
- **Font Loading**: Critical wait step ensures proper font rendering
- **Both Formats**: Test generates JPEG (smaller) and PNG (higher quality)
- **Viewport**: Set to exact 1200x630 for pixel-perfect screenshots
- **Quality**: JPEG quality set to 90 (high quality, reasonable file size)

## Next Steps After Generation

1. ✅ Verify image looks correct
2. ✅ Update `lib/content.ts` if needed
3. ✅ Add meta tags to `app/layout.tsx`
4. ✅ Deploy to Vercel
5. ✅ Test with social media debuggers
6. ✅ Share on LinkedIn/Twitter to test live

## Support

If you encounter issues:

1. Check browser console in `og-image.html` for JavaScript errors
2. Verify Google Fonts are loading (check Network tab)
3. Try running with `--headed` flag to see browser: `playwright test scripts/generate-og-image.spec.ts --headed`
4. Check Playwright version: `npx playwright --version`

## Credits

- Design: Gondor Noble LOTR theme
- Fonts: Google Fonts (Cinzel, Inter)
- Screenshot: Playwright automation
- Data: Synced with `lib/content.ts`
