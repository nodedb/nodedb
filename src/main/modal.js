/**
 * modal
 */

/* Node modules */
import path from 'path';

/* Third-party modules */
import { BrowserWindow, ipcMain } from 'electron'; // eslint-disable-line

/* Files */

export default (winURL) => {
  ipcMain.on('new-connection', (event) => {
    const modal = new BrowserWindow({
      parent: 'top',
      modal: true,
      show: false,
      width: 800,
      height: 600,
    });

    const loadPath = path.join(winURL, '/#/login');

    modal.loadURL(loadPath);
    modal.setMenu(null);

    ipcMain.once('new-connection-close', () => {
      modal.close();
    });

    ipcMain.once('new-connection-save', (modalEvent, connection) => {
      modal.close();

      event.sender.send('new-connection-data', connection);
    });

    modal.once('ready-to-show', () => {
      modal.show();
      // @todo set title using i18n
      modal.setTitle('NEW_CONNECTION');
    });
  });
};
