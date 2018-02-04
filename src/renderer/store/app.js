/**
 * app
 */

/* Node modules */

/* Third-party modules */
import { _ } from 'lodash';

/* Files */
import appStore from '../../common/stores/app';

export default {

  actions: {
    loadState({ commit }) {
      return appStore.get()
        .then((data) => {
          _.each(data, (value, key) => {
            commit(key, value);
          });

          return data;
        });
    },

    sidebarWidth({ commit }, width) {
      commit('sidebarWidth', width);

      return appStore.update('sidebarWidth', width);
    },
  },

  mutations: {
    sidebarWidth(state, width) {
      state.sidebarWidth = width;
    },
  },

  namespaced: true,

  state: {
    sidebarWidth: 300,
  },

};
