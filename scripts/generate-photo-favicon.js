const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function generatePhotoFavicons() {
  const sourceImage = path.join(__dirname, '../Prompt Files/5EBC5246-5FB0-4092-9C57-7F8B7227FE18_4_5005_c.jpeg');
  const publicDir = path.join(__dirname, '../public');

  console.log('📸 Generating favicons from photo...\n');

  try {
    // Generate favicon.ico (32x32)
    await sharp(sourceImage)
      .resize(32, 32, { fit: 'cover', position: 'top' })
      .toFormat('png')
      .toFile(path.join(publicDir, 'favicon-32.png'));
    console.log('✓ Generated favicon-32.png (32x32)');

    // Generate apple-icon.png (180x180)
    await sharp(sourceImage)
      .resize(180, 180, { fit: 'cover', position: 'top' })
      .toFormat('png')
      .toFile(path.join(publicDir, 'apple-icon.png'));
    console.log('✓ Generated apple-icon.png (180x180)');

    // Generate icon-192.png for web manifest
    await sharp(sourceImage)
      .resize(192, 192, { fit: 'cover', position: 'top' })
      .toFormat('png')
      .toFile(path.join(publicDir, 'icon-192.png'));
    console.log('✓ Generated icon-192.png (192x192)');

    // Generate icon-512.png for web manifest
    await sharp(sourceImage)
      .resize(512, 512, { fit: 'cover', position: 'top' })
      .toFormat('png')
      .toFile(path.join(publicDir, 'icon-512.png'));
    console.log('✓ Generated icon-512.png (512x512)');

    console.log('\n✅ All favicon formats generated successfully!');
    console.log('\nNote: favicon-32.png needs to be converted to .ico format.');
    console.log('You can use an online tool or ImageMagick to convert it:');
    console.log('  convert favicon-32.png favicon.ico');

  } catch (error) {
    console.error('❌ Error generating favicons:', error);
    process.exit(1);
  }
}

generatePhotoFavicons();
