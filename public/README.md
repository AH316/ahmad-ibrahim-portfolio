# Public Assets Directory

This directory contains all static assets for Ahmad Ibrahim's portfolio website.

## Directory Structure

```
public/
├── resume.pdf                 - Ahmad's resume (copy from Prompt Files/Ahmad Ibrahim.pdf)
├── images/
│   └── projects/             - Project screenshots and mockups
│       ├── sistahology.jpg   - Sistahology Journaling App screenshot
│       ├── gateway-tool.jpg  - Gateway Automation Tool screenshot
│       ├── tr181-converter.jpg - TR-181 Data Model Converter screenshot
│       └── portfolio.jpg     - Personal Portfolio screenshot
├── icons/
│   └── lotr/                 - Custom LOTR-themed SVG icons (future)
│       ├── sword.svg
│       ├── scroll.svg
│       ├── tower.svg
│       ├── shield.svg
│       ├── ring.svg
│       └── castle.svg
└── music/                     - Optional ambient LOTR-inspired music (future)
    └── ambient.mp3
```

## Asset Guidelines

### Resume
- **File**: `resume.pdf`
- **Source**: Copy from `Prompt Files/Ahmad Ibrahim.pdf`
- **Updates**: Replace this file when resume is updated
- **Access**: Public via `/resume.pdf` URL

### Project Images
- **Location**: `images/projects/`
- **Format**: JPG or PNG preferred
- **Size**: Recommended 1200x800px (3:2 aspect ratio)
- **Optimization**: Use Next.js Image component for automatic optimization
- **Naming**: Kebab-case, descriptive (e.g., `sistahology.jpg`)

### LOTR Icons (Future Enhancement)
- **Location**: `icons/lotr/`
- **Format**: SVG (scalable, small file size)
- **Colors**: Use Gondor theme colors (gold #d4af37, silver #e5e7eb)
- **Usage**: Currently using react-icons, but custom icons can be added here

### Music (Future Enhancement)
- **Location**: `music/`
- **Format**: MP3 (good compression, wide support)
- **Requirements**: Royalty-free or properly licensed
- **Volume**: Start at low volume (20-30%)
- **Note**: Music player toggle is already implemented in `components/lotr/MusicPlayer.tsx`

## Asset Checklist

### Required Assets (Not Yet Added)
- [ ] Resume PDF (copy from Prompt Files)
- [ ] Project screenshots:
  - [ ] Sistahology Journaling App
  - [ ] Gateway Automation Tool
  - [ ] TR-181 Data Model Converter
  - [ ] Personal Portfolio

### Optional Assets
- [ ] Custom LOTR SVG icons
- [ ] Ambient background music
- [ ] Open Graph image for social sharing (`og-image.jpg`)
- [ ] Favicon (White Tree of Gondor)

## How to Add Assets

### Adding Resume
```bash
cp "Prompt Files/Ahmad Ibrahim.pdf" public/resume.pdf
```

### Adding Project Screenshots
1. Create screenshots of your projects (1200x800px recommended)
2. Save them in `public/images/projects/`
3. Use kebab-case naming
4. Update paths in `lib/content.ts` if needed

### Adding Custom Icons
1. Create or source SVG icons with LOTR theme
2. Save in `public/icons/lotr/`
3. Update `components/lotr/Icon.tsx` to use custom icons instead of react-icons

## Image Optimization

All images are automatically optimized by Next.js when using the `<Image>` component:
- Lazy loading
- Responsive sizing
- WebP conversion (where supported)
- Blur placeholder

## Notes
- Always use absolute paths from `/public` (e.g., `/images/projects/sistahology.jpg`)
- Do not commit large binary files without optimization
- Keep this README updated when directory structure changes
