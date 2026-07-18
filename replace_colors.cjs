const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir('c:\\Users\\user\\Downloads\\luxoraGift\\src', function(filePath) {
  if (filePath.endsWith('.jsx') && !filePath.includes('ProductCard.jsx') && !filePath.includes('Product.jsx')) {
    let content = fs.readFileSync(filePath, 'utf-8');
    let original = content;
    // Common replacements
    content = content.replace(/bg-white/g, 'bg-surface');
    content = content.replace(/bg-blush/g, 'bg-surface/50');
    content = content.replace(/#E91E63/gi, '#FFCB74');
    content = content.replace(/#C2185B/gi, '#EAA643');
    content = content.replace(/#1A1A1A/gi, '#F6F6F6');
    content = content.replace(/#FAFAFA/gi, '#2F2F2F');
    content = content.replace(/#FCE4EC/gi, '#2F2F2F');
    content = content.replace(/#FFFFFF/gi, '#111111');
    content = content.replace(/#767676/gi, '#A0A0A0');
    
    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf-8');
      console.log('Updated: ' + filePath);
    }
  }
});
