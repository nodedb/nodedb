/**
 * app
 */

/* Node modules */

/* Third-party modules */
import { _ } from 'lodash';
import Vue from 'vue';

/* Files */
import appStore from '../../common/stores/app';

export default {

  actions: {
    loadState({ commit }) {
      return appStore.get()
        .then((data) => {
          commit('update', data);
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

    update(state, data) {
      _.each(data, (value, key) => {
        Vue.set(state, key, value);
      });
    },
  },

  namespaced: true,

  state: {
    sidebarWidth: 300,
    theme: 'default',
  },

};
