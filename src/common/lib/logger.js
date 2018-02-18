/**
 * logger
 */

/* Node modules */
import path from 'path';

/* Third-party modules */
import { app } from 'electron'; // eslint-disable-line
import fs from 'fs-extra';
import log from 'electron-log';

/* Files */

export const levels = [
  'error',
  'warn',
  'info',
  'verbose',
  'debug',
  'silly',
];

if (app) {
  /* Only requires setting in the main process */
  const rootPath = path.join(app.getPath('userData'), 'logs');

  /* Ensure this folder exists */
  fs.mkdirpSync(rootPath);

  log.transports.file.file = path.join(rootPath, 'log.txt');
}

const logger = (level, msg, data, ...additional) => log[level](msg, data, ...additional);

/* Only expose the log methods */
export default levels.reduce((result, level) => {
  result[level] = (msg, data, ...additional) => logger(level, msg, data, ...additional);

  return result;
}, {});
