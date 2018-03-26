/**
 * i18n
 */

/* Node modules */

/* Third-party modules */
import { app, remote } from 'electron'; // eslint-disable-line

/* Files */

export default (app || remote.app).i18n;
