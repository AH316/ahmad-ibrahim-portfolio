const sharp = require('sharp');
const path = require('path');

async function optimizeImages() {
  const projectsDir = path.join(__dirname, '../public/images/projects');

  // Optimize TR-181 stock photo
  await sharp(path.join(projectsDir, 'tr181-stock.jpg'))
    .resize(1200, 800, { fit: 'cover' })
    .jpeg({ quality: 85 })
    .toFile(path.join(projectsDir, 'tr181-converter.jpg'));

  console.log('✓ Optimized tr181-converter.jpg (1200x800, 85% quality)');

  // Optimize Chatbot stock photo
  await sharp(path.join(projectsDir, 'chatbot-stock.jpg'))
    .resize(1200, 800, { fit: 'cover' })
    .jpeg({ quality: 85 })
    .toFile(path.join(projectsDir, 'chatbot.jpg'));

  console.log('✓ Optimized chatbot.jpg (1200x800, 85% quality)');
}

optimizeImages()
  .then(() => console.log('\n✅ All images optimized successfully!'))
  .catch(err => console.error('❌ Error:', err));
