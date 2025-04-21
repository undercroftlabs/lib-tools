// scripts/copy-transformer.js
const fs = require('fs');
const path = require('path');

const src = path.resolve(__dirname, '../src/config/fileTransformer.cjs');
const destDir = path.resolve(__dirname, '../dist');
const dest = path.join(destDir, 'fileTransformer.cjs');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

fs.copyFileSync(src, dest);
console.log(`✅ Copied fileTransformer.js to dist`);
