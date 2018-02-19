/**
 * logger
 */

/* Node modules */
import path from 'path';

/* Third-party modules */
import { app, remote } from 'electron'; // eslint-disable-line
import bunyan from 'bunyan';
import fs from 'fs-extra';

/* Files */

export default class Logger {
  static get app() {
    return app || remote.app;
  }

  static get appName() {
    return Logger.app.getName();
  }

  static get logPath() {
    return path.join(Logger.app.getPath('userData'), 'logs', 'logs.log');
  }

  static get logDir() {
    const { dir } = path.parse(this.logPath);

    return dir;
  }

  constructor() {
    /* Ensure the directory exists */
    fs.mkdirpSync(Logger.logDir);

    /* Create bunyan instance */
    this.bunyan = bunyan.createLogger({
      name: Logger.appName,
      serializers: {
        err: bunyan.stdSerializers.err,
      },
      streams: [{
        level: process.env.NODEDB_CONSOLE_LOG_LEVEL || 'trace',
        stream: process.stdout,
      }, {
        type: 'rotating-file',
        path: Logger.logPath,
        level: process.env.NODEDB_FILE_LOG_LEVEL || 'warn',
        period: '1d',
      }],
    });
  }

  // read() {
  //   return new Promise((resolve, reject) => {
  //     fs.readdir(Logger.logDir, (err, result) => {
  //       if (err) {
  //         reject(err);
  //         return;
  //       }
  //
  //       resolve(result);
  //     });
  //   });
  // }

  trigger(level, message, data = {}, ...additional) {
    /* Set "log" level to "info" */
    if (level === 'log') {
      level = 'info';
    }

    try {
      this.bunyan[level](message, data, ...additional);
    } catch (err) {
      /* Unknown level, but record all the data */
      this.bunyan.fatal('Unknown log level', {
        err,
        level,
        message,
        data,
      }, ...additional);
    }

    return this;
  }

  static trigger(...args) {
    const logger = new Logger();

    return logger.trigger(...args);
  }
}

