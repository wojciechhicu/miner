const {
    app,
    BrowserWindow
  } = require('electron');
  let appWindow;
  
  function initWindow() {
    appWindow = new BrowserWindow({
      width: 1000,
      height: 800,
      webPreferences: {
        nodeIntegration: true,
        nativeWindowOpen: true
      }
    })
    // Electron Build Path
    appWindow.loadURL('http://localhost:4200/');
    //disable menu in electron
    appWindow.setMenu(null);
    // Initialize the DevTools.
    appWindow.webContents.openDevTools()
    appWindow.on('closed', function () {
      appWindow = null
    })
  }
  app.on('ready', initWindow)
  // Close when all windows are closed.
  app.on('window-all-closed', function () {
    // On macOS specific close process
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })
  app.on('activate', function () {
    if (win === null) {
      initWindow()
    }
  })