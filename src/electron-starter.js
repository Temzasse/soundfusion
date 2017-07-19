const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600})

  // and load the index.html of the app.
  const startUrl = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, '/../build/index.html'),
    protocol: 'file:',
    slashes: true
  });
  
  mainWindow.loadURL(startUrl);

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
  // FIX: Youtube IFrame API UMG issue
  electron.session.defaultSession.webRequest.onBeforeSendHeaders([
    'https://*.youtube.com/*'
  ], (details, callback) => {
    details.requestHeaders['Accept-Language'] = 'en';
    details.requestHeaders['Referer'] = 'https://www.youtube.com/embed/?enablejsapi=1&origin=http%3A%2F%2Flocalhost%3A3000&widgetid=1';
    callback({ cancel: false, requestHeaders: details.requestHeaders });
  });

  electron.session.defaultSession.webRequest.onBeforeRequest([
    'https://*.youtube.com/*'
  ], (details, callback) => {
    let newUrl;

    if (
      details.url.includes('video_info') &&
      !details.url.includes('localhost')
    ) {
      newUrl = new url.URL(details.url);
      newUrl.searchParams.set('eurl', 'http://localhost:3000/');
    }

    const response = newUrl
      ? { cancel: false, redirectURL: newUrl.href }
      : {};

    callback(response);
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
