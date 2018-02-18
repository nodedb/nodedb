/**
 * appMenu
 */

/* Node modules */

/* Third-party modules */
import { app, Menu } from 'electron'; // eslint-disable-line

/* Files */
import i18n from '../common/lib/i18n';

/* Wait until ready */
app.on('ready', () => {
  /* Ready is needed before so the locales are set */
  const t = (...args) => i18n().t(...args);

  const template = [{
    label: t('menu:FILE'),
    submenu: [{
      label: t('menu:QUIT'),
      accelerator: 'CmdOrCtrl+Q',
      click: () => {
        app.quit();
      },
    }],
  }, {
    label: t('menu:VIEW'),
    submenu: [{
      label: t('menu:TOGGLE_DEV_TOOLS'),
      accelerator: 'CmdOrCtrl+Shift+I',
      click: (menu, mainWindow) => mainWindow.webContents.toggleDevTools(),
    }],
  }];

  const menu = Menu.buildFromTemplate(template); // eslint-disable-line
  Menu.setApplicationMenu(menu);
});
