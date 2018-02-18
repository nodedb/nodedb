/**
 * i18n
 */

/* Node modules */
import path from 'path';

/* Third-party modules */
import { sync as glob } from 'glob';
import i18next from 'i18next';
import i18nextFsBackend from 'i18next-sync-fs-backend';
import i18nextLanguageDetector from 'i18next-electron-language-detector';

/* Files */

export default (logger) => {
  /**
   * Log Wrapper
   *
   * Wraps the logger for use with i18n
   *
   * @param {string} level
   * @return {*}
   */
  const logWrapper = level => args => logger.trigger(level, ...args);

  const rootPath = path.join(__static, 'locales');

  /* Treat the en directory as "master" */
  const ns = glob(`${rootPath}/en/*.json`)
    .map(filepath => filepath
      .replace(`${rootPath}/en/`, '')
      .replace(/\.json$/, ''));

  i18next
    .use({
      type: 'logger',
      log: logWrapper('info'),
      warn: logWrapper('warn'),
      error: logWrapper('error'),
    })
    .use(i18nextLanguageDetector)
    .use(i18nextFsBackend)
    .init({
      backend: {
        loadPath: path.join(rootPath, '{{lng}}', '{{ns}}.json'),
        addPath: path.join(rootPath, '{{lng}}', '{{ns}}.missing.json'),
      },
      debug: true,
      defaultNS: 'common',
      fallbackLng: 'en',
      initImmediate: false,
      ns,
    });

  return i18next;
};
