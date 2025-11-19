const sharp = require('sharp');
const path = require('path');

async function optimizePortfolio() {
  const projectsDir = path.join(__dirname, '../public/images/projects');

  // Optimize Portfolio stock photo
  await sharp(path.join(projectsDir, 'portfolio-stock.jpg'))
    .resize(1200, 800, { fit: 'cover' })
    .jpeg({ quality: 85 })
    .toFile(path.join(projectsDir, 'portfolio.jpg'));

  console.log('✓ Optimized portfolio.jpg (1200x800, 85% quality)');
}

optimizePortfolio()
  .then(() => console.log('\n✅ Portfolio image optimized successfully!'))
  .catch(err => console.error('❌ Error:', err));
