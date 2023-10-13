const chai = require('chai');
const fs = require('fs');
const path = require('path');
const { dirCopier } = require('../src/dir-copier');

const expect = chai.expect;

describe('dirCopier', () => {
  const testSrcDir = path.join(__dirname, 'resources', 'sample-dir');
  const testDestDir = path.join(__dirname, '..', 'tmp', 'sample-dir');

  // Teardown: Clean up test directories after tests are done
  after(() => {
    if (fs.existsSync(testDestDir)) {
      fs.rmdirSync(testDestDir, { recursive: true });
    }
  });

  it('should copy directory recursively', () => {
    dirCopier(testSrcDir, testDestDir);

    // Assert that files were copied
    expect(fs.existsSync(testDestDir)).to.be.true;
    expect(fs.existsSync(path.join(testDestDir, 'a.txt'))).to.be.true;
    expect(fs.existsSync(path.join(testDestDir, 'b.txt'))).to.be.true;
    expect(fs.existsSync(path.join(testDestDir, 'inner-dir'))).to.be.true;
    expect(fs.existsSync(path.join(testDestDir, 'inner-dir', 'c.txt'))).to.be.true;
  });

  it('should throw an error for non-existent source directory', () => {
    expect(() => dirCopier('nonExistentSrc', testDestDir)).to.throw('Source directory does not exist.');
  });
});