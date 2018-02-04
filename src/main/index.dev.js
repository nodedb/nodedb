/**
 * index.dev
 *
 * This file is used specifically and only for development. It installs
 * `electron-debug` & `vue-devtools`. There shouldn't be any need to
 *  modify this file, but it can be used to extend your development
 *  environment.
 */

/* Node modules */

/* Third-party modules */
const electron = require('electron'); // eslint-disable-line
const electronDebug = require('electron-debug'); // eslint-disable-line
const installExtension = require('electron-devtools-installer'); // eslint-disable-line

/* Files */

// Set environment for development
process.env.NODE_ENV = 'development';

// Install `electron-debug` with `devtron`
electronDebug({ showDevTools: true });

// Install `vue-devtools`
electron.app.on('ready', () => {
  installExtension.default(installExtension.VUEJS_DEVTOOLS)
    .then(() => {})
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.log('Unable to install `vue-devtools`: \n', err);
    });
});

// Require `main` process to boot app
require('./index');
