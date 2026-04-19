const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const input = 'public/favicon.png';
const outputDir = 'public';

async function optimize() {
  if (!fs.existsSync(input)) {
    console.error('Source favicon.png not found');
    return;
  }

  console.log('Optimizing favicons...');

  try {
    // 1. Generate resized versions to distinct paths
    await sharp(input).resize(32, 32).toFile(path.join(outputDir, 'favicon-32x32.png'));
    await sharp(input).resize(180, 180).toFile(path.join(outputDir, 'apple-touch-icon.png'));
    await sharp(input).resize(192, 192).toFile(path.join(outputDir, 'android-chrome-192x192.png'));
    await sharp(input).resize(512, 512).toFile(path.join(outputDir, 'android-chrome-512x512.png'));

    // 2. To overwrite the source without locking issues, we read it into a buffer first
    const tinyBuffer = await sharp(input).resize(32, 32).toBuffer();
    
    // 3. Close Sharp by letting the buffer operation finish, then use fs
    fs.writeFileSync(path.join(outputDir, 'favicon.ico'), tinyBuffer);
    
    // We rename/remove the original at the very end if we want, 
    // but for now let's just write one more name
    fs.writeFileSync(path.join(outputDir, 'favicon-small.png'), tinyBuffer);
    
    console.log('Favicons optimized successfully! (Check favicon-32x32.png and others)');
  } catch (err) {
    console.error('Error optimizing favicons:', err);
  }
}

optimize();
