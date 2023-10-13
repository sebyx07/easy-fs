const { app, BrowserWindow, ipcMain } = require('electron');
const {dirCopier } = require('./src/dir-copier');

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 600,
    height: 400,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  });

  win.loadFile('src/index.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.on('start-copy', (event, { src, dest }) => {
  // The actual copy process (this doesn't handle progress, you'd need to modify your copier to handle it)
  dirCopier(src, dest, (fileName) => {
    event.sender.send('current-file', fileName);
  });
});