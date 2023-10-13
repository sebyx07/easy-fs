const fs = require('fs');
const path = require('path');

function dirCopier(src, dest, callbackCurrentFile) {
  if (!fs.existsSync(src)) {
    throw new Error('Source directory does not exist.');
  }

  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const items = fs.readdirSync(src);
  items.forEach(item => {
    const srcPath = path.join(src, item);
    const destPath = path.join(dest, item);
    callbackCurrentFile(srcPath);
    console.log(srcPath);

    const stat = fs.statSync(srcPath);
    if (stat.isDirectory()) {
      dirCopier(srcPath, destPath, callbackCurrentFile);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  });
}

module.exports = { dirCopier };
