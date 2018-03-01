/**
 * logger
 */

/* Node modules */

/* Third-party modules */

/* Files */
import Logger from '../../common/lib/logger';

export default {
  install(Vue) {
    Vue.prototype.$log = (level, message, data = {}, ...additional) => {
      console.log({
        level,
        message,
        data,
        additional,
      });
      return Logger.trigger(level, message, data, ...additional);
    };
  },
};
