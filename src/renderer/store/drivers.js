/**
 * drivers
 */

/* Node modules */

/* Third-party modules */
import { _ } from 'lodash';

/* Files */
import Driver from '../lib/driver';
import driversStore from '../../common/stores/drivers';
import logger from '../../common/lib/logger';

export default {

  actions: {

    loadState() {
      logger.trigger('info', 'LOAD_ALL_DRIVERS');

      return driversStore.get()
        .then((result) => {
          if (!Array.isArray(result)) {
            return Promise.reject(new Error('INVALID_SAVED_DRIVER_DATA'));
          }

          const tasks = result.map(data => this.dispatch('drivers/load', data)
            /* Prevent an error failing to load all drivers */
            .catch(() => null));

          return Promise.all(tasks);
        })
        .then((drivers) => {
          /* Set the drivers that loaded */
          drivers.forEach((driver) => {
            if (driver) {
              this.commit('drivers/saveDriver', driver);
            }
          });
        })
        .catch((err) => {
          logger.trigger('warn', 'ERROR_LOADING_DRIVERS', {
            err: err.stack,
          });

          return [];
        });
    },

    load(store, { name, path }) {
      logger.trigger('info', 'LOAD_DB_DRIVER', {
        name,
        path,
      });

      return Promise.resolve()
        .then(() => {
          /* Use window.require so it bypasses Webpack */
          let strategy = window.require(path);

          if (strategy.default) {
            /* ES6 module */
            strategy = strategy.default;
          }

          if (_.isFunction(strategy) === false) {
            return Promise.reject(new Error(`Strategy is not a function: ${path}`));
          }

          /* Create instance of driver class */
          return new Driver(name, strategy);
        })
        .catch((err) => {
          logger.trigger('error', 'LOAD_DB_DRIVER_ERROR', {
            name,
            path,
            err,
          });

          return Promise.reject(err);
        });
    },

  },

  mutations: {

    saveDriver(state, driver) {
      state.drivers.push(driver);
    },

  },

  namespaced: true,

  state: {
    drivers: [],
  },

};
