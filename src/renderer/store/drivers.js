/**
 * drivers
 */

/* Node modules */

/* Third-party modules */
import { _ } from 'lodash';

/* Files */
import Driver from '../lib/driver';
import driversStore from '../../common/stores/drivers';

export default {

  actions: {

    loadState() {
      return driversStore.get()
        .then((result) => {
          if (!Array.isArray(result)) {
            return [];
          }

          const tasks = result.map(data => this.dispatch('drivers/load', data)
            .catch((err) => {
              // @todo log error
              console.error(err);
              return null;
            }));

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
          // @todo log error
          console.error(err);
          return [];
        });
    },

    load(store, { name, path }) {
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
