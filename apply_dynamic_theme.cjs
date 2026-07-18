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
  if (filePath.endsWith('.jsx')) {
    let content = fs.readFileSync(filePath, 'utf-8');
    let original = content;
    
    // Convert hardcoded hex colors inside styles or arbitrary class names to CSS variables
    content = content.replace(/#F6F6F6/gi, 'var(--color-text-primary)');
    content = content.replace(/#A0A0A0/gi, 'var(--color-text-muted)');
    content = content.replace(/#767676/gi, 'var(--color-text-muted)');
    content = content.replace(/#111111/gi, 'var(--color-bg)');
    content = content.replace(/#2F2F2F/gi, 'var(--color-surface)');
    content = content.replace(/#FFCB74/gi, 'var(--color-primary)');
    content = content.replace(/#EAA643/gi, 'var(--color-primary-dark)');
    content = content.replace(/#EBEBEB/gi, 'var(--color-border)');
    content = content.replace(/rgba\(255,255,255,0\.05\)/g, 'var(--color-border)');
    content = content.replace(/rgba\(255,255,255,0\.1\)/g, 'var(--color-border)');
    
    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf-8');
      console.log('Updated: ' + filePath);
    }
  }
});
