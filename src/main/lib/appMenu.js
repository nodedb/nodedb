/**
 * appMenu
 */

/* Node modules */

/* Third-party modules */
import { Menu, shell } from 'electron'; // eslint-disable-line

/* Files */
import Logger from '../../common/lib/logger';
import pkg from '../../../package';

export default (i18n, mainWindow) => {
  const template = [{
    label: i18n.t('menu:FILE'),
    submenu: [{
      role: 'quit',
    }],
  }, {
    label: i18n.t('menu:DATABASE'),
    submenu: [{
      label: i18n.t('menu:DB_CONNECT'),
      accelerator: 'CmdOrCtrl+N',
      click: () => {
        Logger.trigger('info', 'NEW_DB_CONNECTION');

        mainWindow.webContents.send('new-db-connection');
      },
    }],
  }, {
    label: i18n.t('menu:VIEW'),
    submenu: [{
      label: i18n.t('menu:TOGGLE_DEV_TOOLS'),
      accelerator: 'CmdOrCtrl+Shift+I',
      click: (menu, mainWindow) => mainWindow.webContents.toggleDevTools(),
    }],
  }, {
    label: i18n.t('menu:HELP'),
    submenu: [{
      label: i18n.t('menu:GITHUB'),
      click: () => shell.openExternal(pkg.homepage),
    }, {
      label: i18n.t('menu:BUGS'),
      click: () => shell.openExternal(pkg.bugs.url),
    }, {
      type: 'separator',
    }, {
      label: i18n.t('menu:LOGS'),
      click: () => shell.openItem(Logger.logDir),
    }, {
      type: 'separator',
    }, {
      label: i18n.t('menu:ABOUT'),
      click: () => {
        // @todo
        console.log('about trigger2');
      },
    }],
  }];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
};
