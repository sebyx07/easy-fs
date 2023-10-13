const { dirCopier } = require('../src/dir-copier')
const path = require('path');

function main() {
  const args = process.argv.slice(2);

  if (args.length !== 2) {
    console.error('Usage: node cli.js <source directory> <destination directory>');
    process.exit(1);
  }

  const [src, dest] = args.map(dir => path.resolve(dir));

  try {
    dirCopier(src, dest);
    console.log(`Successfully copied ${src} to ${dest}`);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main();