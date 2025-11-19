# Favicon Generation System

This directory contains tools to generate all required favicon formats for the Ahmad Ibrahim portfolio with a Gondor-themed White Tree icon.

## Files

- **generate-favicon.html** - Standalone HTML file with SVG tree icons in multiple sizes
- **generate-favicon.spec.ts** - Playwright test script for automated screenshot generation
- **README.md** - This file

## Generated Favicon Formats

The system generates the following favicon files in `/public/`:

| File | Size | Purpose |
|------|------|---------|
| `favicon.png` | 32x32 | Standard browser favicon (needs conversion to .ico) |
| `icon-192.png` | 192x192 | Web app manifest icon (Android) |
| `icon-512.png` | 512x512 | Web app manifest icon (high resolution) |
| `apple-icon.png` | 180x180 | Apple Touch Icon (iOS devices) |

## Design

All icons feature:
- **White Tree of Gondor** silhouette in silver (#eeeff1)
- **Dark Gondor background** (#1a1a1a)
- **Gold star accents** (#d6b13a) - subtle LOTR emblem detail
- **Gold border** for visual distinction during generation

The tree design is simplified to remain recognizable at 32x32 pixels.

## Method 1: Automated Generation (Playwright)

### Prerequisites

```bash
# Ensure Playwright browsers are installed
npx playwright install
```

###Run the Generation Script

```bash
npm run generate:favicon
```

This will:
1. Open the HTML file in a headless browser
2. Take screenshots of each sized container
3. Save PNG files to `/public/`
4. Display a summary of generated files

### Troubleshooting

If the Playwright method hangs or fails:
- Check browser installation: `npx playwright install chromium`
- Run with headed browser for debugging: `npx playwright test scripts/generate-favicon.spec.ts --headed`
- Check console output for specific errors

## Method 2: Manual Generation (Browser Screenshots)

If automated generation doesn't work, you can generate favicons manually:

### Steps

1. **Open the HTML file in your browser:**
   ```bash
   open scripts/generate-favicon.html
   # Or on Linux: xdg-open scripts/generate-favicon.html
   # Or manually open in Chrome/Firefox
   ```

2. **Take screenshots of each icon:**
   - Use browser DevTools (F12)
   - Right-click each icon container (labeled with size)
   - Select "Inspect Element"
   - In Elements tab, right-click the container div
   - Choose "Capture node screenshot"
   - Save with the appropriate name

3. **Rename and move files to `/public/`:**
   - `favicon-32` → `favicon.png`
   - `favicon-192` → `icon-192.png`
   - `favicon-512` → `icon-512.png`
   - `apple-icon` → `apple-icon.png`

4. **Convert favicon.png to .ico format:**
   - Online: https://favicon.io/favicon-converter/
   - CLI (ImageMagick): `convert favicon.png favicon.ico`
   - Or use any online PNG to ICO converter

## Method 3: Use Image Editor

For maximum control:

1. Open `generate-favicon.html` in a browser
2. Take a screenshot of the full page
3. Open in Photoshop/GIMP/Figma
4. Crop each icon to its exact size:
   - 32x32, 192x192, 512x512, 180x180
5. Export as PNG with the correct filenames
6. Convert 32x32 PNG to .ico format

## Integration with Next.js

Once favicon files are generated in `/public/`, add to `/app/layout.tsx`:

```tsx
export const metadata = {
  title: 'Ahmad Ibrahim | Software Developer',
  description: 'Software Developer specializing in test automation and full-stack development',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
};
```

Create `/app/manifest.json` for PWA support:

```json
{
  "name": "Ahmad Ibrahim Portfolio",
  "short_name": "Ahmad Ibrahim",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  "theme_color": "#1a1a1a",
  "background_color": "#1a1a1a",
  "display": "standalone"
}
```

Add manifest link in `layout.tsx`:

```tsx
<link rel="manifest" href="/manifest.json" />
```

## Verification

After deployment, test your favicons:

1. **Browser Tab**: Check if favicon.ico appears in the browser tab
2. **Bookmark**: Bookmark the site and verify icon appears
3. **iOS Safari**: Add to Home Screen and check apple-icon.png
4. **Android Chrome**: Add to Home Screen and check icon-192.png
5. **Favicon Checker**: Use https://realfavicongenerator.net/favicon_checker

## Design Customization

To modify the tree icon design, edit `generate-favicon.html`:

```html
<!-- Find the SVG section (line ~25) -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="tree-icon">
  <!-- Modify these paths to change the tree shape -->
  <path d="..."/>
</svg>
```

Color customization (lines ~20-30):

```css
.favicon-canvas {
  background: #1a1a1a;  /* Dark background */
}

.tree-icon {
  fill: #eeeff1;  /* Silver tree */
}

circle {
  fill: #d6b13a;  /* Gold accents */
}
```

## Tips

- **Keep it simple**: At 32x32, complex details become blurry
- **High contrast**: Silver on dark ensures visibility
- **Test at scale**: View 32x32 version zoomed out to confirm readability
- **Match theme**: Colors should match your Gondor Noble theme

## Troubleshooting

### Issue: Playwright hangs indefinitely

**Solution**: Use Method 2 (Manual) or ensure browsers are installed:
```bash
npx playwright install --force
```

### Issue: Icons look pixelated

**Solution**: Ensure you're capturing at the exact pixel dimensions (32x32, 192x192, etc.) without scaling

### Issue: Browser doesn't show new favicon

**Solution**: Clear browser cache:
- Chrome: Ctrl+Shift+Delete, select "Cached images and files"
- Or hard refresh: Ctrl+Shift+R (Cmd+Shift+R on Mac)

### Issue: .ico conversion fails

**Solution**: Use online converter at https://favicon.io/favicon-converter/ - it's reliable and supports multiple sizes within one .ico file

## Next Steps

After generating favicons:

1. ✓ Generate all 4 PNG files
2. ✓ Convert `favicon.png` to `favicon.ico`
3. ✓ Add icon links to `layout.tsx`
4. ✓ Create `manifest.json` for PWA
5. ✓ Test on multiple devices/browsers
6. ✓ Deploy and verify in production

## Resources

- [RealFaviconGenerator](https://realfavicongenerator.net/) - Comprehensive favicon generator
- [Favicon.io](https://favicon.io/) - Simple PNG to ICO converter
- [Web.dev Favicon Guide](https://web.dev/add-manifest/) - Best practices
- [Apple Touch Icon Spec](https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html)

---

# Open Graph Image Generation

This directory also contains the programmatic Open Graph (OG) image generation system for social media previews.

## OG Image Files

- **og-image.tsx** - React component that renders 1200x630px OG image
- **og-image.html** - Standalone HTML preview (same design, no build required)

## Data Points Pulled from lib/content.ts

The OG image **automatically pulls data** from `/lib/content.ts`:

| Field | Source | Calculation |
|-------|--------|-------------|
| **Name** | `personalInfo.name` | Direct |
| **Tagline** | `personalInfo.tagline` | First part before `\|` |
| **Current Role** | `experiences[0].title` + `experiences[0].company` | Latest entry |
| **Years Experience** | `experiences[]` | Min start date → now |
| **Projects Count** | `projects.length` | Array length |
| **Skills Count** | `skillCategories[]` + `additionalSkills[]` | Unique count |

## Design Specifications

- **Dimensions:** 1200x630px (exact Open Graph standard)
- **Background:** Gondor dark (#1a1a1a) with subtle gradient to #2a2a2a
- **Typography:** Cinzel (headings, 72px), Inter (body, 36px)
- **Color Palette:**
  - Name: `#f9fafb` (gondor-white)
  - Tagline: `#eeeff1` (gondor-silver)
  - Current Role: `#d6b13a` (gondor-gold)
  - Stats: Gold values + silver labels
- **Decorative Elements:**
  - Faded White Tree/Fleur-de-lis watermark (⚜, opacity 0.08)
  - Gold accent line (2px, rgba(214, 177, 58, 0.3))
  - Vertical gold bar next to current role

## How to Generate OG Image

### Step 1: Preview in Browser

```bash
# Open the HTML file in your default browser
open scripts/og-image.html

# Or manually navigate to:
file:///Users/Ahmad/Work/Projects/personal_website/scripts/og-image.html
```

The preview will show:
- Ahmad Ibrahim (large, Cinzel font)
- Software Developer (subtitle)
- Software Engineer @ Intellica Inc. (with gold accent)
- Stats: Years, Projects, Skills (dynamically calculated)
- ahmadibrahim.dev (bottom right)

### Step 2: Take Screenshot at Exact Dimensions

**Using Chrome/Firefox DevTools:**

1. Open `og-image.html` in browser
2. Open Developer Tools (F12 or Cmd+Option+I on Mac)
3. Enable Device Toolbar (Toggle Device Toolbar icon or Cmd+Shift+M)
4. Set custom dimensions: **1200 x 630**
5. Take screenshot:
   - **Chrome:** Cmd+Shift+P → "Capture screenshot" → "Capture node screenshot" (select OG image div)
   - **Firefox:** Right-click → "Take a Screenshot" → Select area
   - **Safari:** Use Cmd+Shift+4 and drag to select exact area

### Step 3: Save Screenshot

```bash
# Save as:
public/images/og-image.jpg
# OR
public/images/og-image.png

# Recommended: Use JPG for smaller file size (< 300 KB)
```

### Step 4: Verify Metadata

The OG image path is already configured in `/lib/content.ts`:

```typescript
export const seoMetadata = {
  // ...
  ogImage: '/images/og-image.jpg', // ✅ Already set!
};
```

Just ensure the file exists at that path.

## Alternative: Automated Generation with Playwright

For programmatic screenshot generation:

```typescript
import { chromium } from '@playwright/test';

async function generateOGImage() {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 }
  });

  await page.goto('file:///Users/Ahmad/Work/Projects/personal_website/scripts/og-image.html');
  await page.screenshot({
    path: 'public/images/og-image.png',
    fullPage: false
  });

  await browser.close();
}

generateOGImage();
```

## Where the OG Image is Used

The Open Graph image appears when sharing your portfolio on:
- **LinkedIn** - Post previews
- **Twitter/X** - Card images
- **Facebook** - Link shares
- **Discord** - Embeds
- **Slack** - Link unfurls
- **Email clients** - Rich previews

## Data Synchronization

**To update the OG image:**

1. Edit `/lib/content.ts` (add projects, update experience, etc.)
2. Re-open `scripts/og-image.html` in browser (data auto-updates via JavaScript)
3. Take new screenshot (follow Step 2 above)
4. Replace `public/images/og-image.jpg`

**No code changes needed!** The OG image pulls fresh data every time you open the HTML file.

## Layout Structure

```
┌─────────────────────────────────────────────┐
│  AHMAD IBRAHIM                    (72px)    │  ← Name (Cinzel, gondor-white)
│  Software Developer               (36px)    │  ← Tagline (Inter, gondor-silver)
│                                              │
│  │ Software Engineer @ Intellica  (28px)   │  ← Current Role (gondor-gold)
│                                              │
│  [White Tree Watermark - Centered, Faded]   │
│                                              │
│  ──────────────────────────────────────────  │  ← Gold accent line
│  2+           4          28+    ahmadibrahim │  ← Stats + Website
│  Years Exp    Projects   Skills        .dev │
└─────────────────────────────────────────────┘
```

## Dimensions Reference

**Open Graph Standard:**
- Recommended: 1200 x 630 pixels (1.91:1 ratio)
- Minimum: 600 x 315 pixels
- Maximum file size: 8 MB (aim for < 300 KB)

## Troubleshooting OG Image

### Issue: Fonts not loading properly in screenshot
**Solution:** Ensure Google Fonts CDN is accessible when opening HTML file. Check browser console for errors.

### Issue: Watermark too visible/distracting
**Solution:** Edit `og-image.html` line ~85, adjust opacity (currently 0.08, range: 0.05-0.15)

### Issue: Stats not updating
**Solution:** Clear browser cache and reload `og-image.html`. Data is calculated on page load.

### Issue: Screenshot dimensions incorrect
**Solution:** Use browser dev tools to set exact viewport (1200x630), not window size. Full page screenshot may include browser chrome.

### Issue: OG image not showing on social media
**Solution:**
1. Clear social media cache (LinkedIn Post Inspector, Twitter Card Validator)
2. Verify file exists at `/public/images/og-image.jpg`
3. Check metadata in `app/layout.tsx` includes `openGraph.images`
4. Wait 24-48 hours for cache refresh (or use debugging tools)

## Future Enhancements

Potential improvements:
- [ ] Add build script to auto-generate OG image on `npm run build`
- [ ] Create variants for different sections (project-specific OG images)
- [ ] Include profile photo/avatar in design
- [ ] Generate multiple sizes (1200x630, 800x420, 600x314)
- [ ] Automate with GitHub Actions (regenerate on content.ts changes)

## File Paths Summary

| File | Path | Purpose |
|------|------|---------|
| **Source Component** | `/scripts/og-image.tsx` | React component (requires build) |
| **HTML Preview** | `/scripts/og-image.html` | Standalone preview (no build needed) |
| **Output Screenshot** | `/public/images/og-image.jpg` | Final OG image (to be created) |
| **Data Source** | `/lib/content.ts` | Dynamic content pulled from here |
| **Metadata Config** | `/lib/content.ts` | `seoMetadata.ogImage` path |
