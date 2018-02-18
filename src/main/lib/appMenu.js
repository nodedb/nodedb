/**
 * appMenu
 */

/* Node modules */

/* Third-party modules */
import { app, Menu } from 'electron'; // eslint-disable-line

/* Files */

/* Wait until ready */
export default (i18n) => {
  const template = [{
    label: i18n.t('menu:FILE'),
    submenu: [{
      label: i18n.t('menu:QUIT'),
      accelerator: 'CmdOrCtrl+Q',
      click: () => app.quit(),
    }],
  }, {
    label: i18n.t('menu:VIEW'),
    submenu: [{
      label: i18n.t('menu:TOGGLE_DEV_TOOLS'),
      accelerator: 'CmdOrCtrl+Shift+I',
      click: (menu, mainWindow) => mainWindow.webContents.toggleDevTools(),
    }],
  }];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
};
