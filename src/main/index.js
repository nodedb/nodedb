/**
 * index
 */

/* Node modules */
import path from 'path';

/* Third-party modules */
import { app, BrowserWindow } from 'electron'; // eslint-disable-line

/* Files */
import '../common/lib/logger';
import appStore from '../common/stores/app';
import modal from './modal';

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = path // eslint-disable-line
    .join(__dirname, '/static')
    .replace(/\\/g, '\\\\');
}

let mainWindow;
const winURL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:9080'
  : `file://${__dirname}/index.html`;

modal(winURL);

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    minHeight: 600,
    minWidth: 800,
    resizable: true,
    useContentSize: true,
  });

  /* List for events */
  mainWindow.on('closed', () => {
    mainWindow = null;
  }).on('resize', () => new Promise((resolve) => {
    /* Wrap in setTimeout as isMaximized returns wrong value */
    setTimeout(() => {
      const data = [{
        key: 'size',
        value: mainWindow.getSize(),
      }, {
        key: 'maximized',
        value: mainWindow.isMaximized(),
      }];

      resolve(data);
    }, 0);
  }).then(data => data
    .reduce((thenable, { key, value }) => thenable
      .then(() => appStore.update(key, value)), Promise.resolve())));

  appStore.get()
    .then(({ maximized = true, size = [] } = {}) => {
      if (maximized) {
        mainWindow.maximize();
      } else {
        const [width, height] = size;

        mainWindow.setSize(width, height);
      }
    });

  mainWindow.loadURL(winURL);
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
