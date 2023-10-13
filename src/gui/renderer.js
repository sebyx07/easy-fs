const { ipcRenderer } = require('electron');

const btnStartCopy = document.getElementById('start-copy');
const inputSrcDir = document.getElementById('src-dir');
const inputDestDir = document.getElementById('dest-dir');
const currentFile = document.getElementById('current-file');

btnStartCopy.addEventListener('click', () => {
  const src = inputSrcDir.value;
  const dest = inputDestDir.value;

  ipcRenderer.send('start-copy', { src, dest });

  ipcRenderer.on('current-file', (event, fileName) => {
    currentFile.innerHTML = fileName;
  });
});
