/**
 * logger
 */

/* Node modules */

/* Third-party modules */

/* Files */
import Logger from '../../common/lib/logger';

export default {
  install(Vue) {
    Vue.prototype.$log = (...args) => Logger.trigger(...args);
  },
};
