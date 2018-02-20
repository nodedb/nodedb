/**
 * tabs
 */

/* Node modules */

/* Third-party modules */
import uuid from 'uuid';
import Vue from 'vue';

/* Files */

export default {

  actions: {
    loadState({ commit }) {
      const tabs = [];

      tabs.push({
        id: uuid.v4(),
        name: 'welcome',
        type: 'query',
      });

      commit('update', tabs);
    },

    findById({ state }, id) {
      const index = state.tabs.findIndex(item => item.id === id);

      return {
        index,
        tab: state.tabs[index],
      };
    },

    remove({ commit, state }, id) {
      const newState = state.tabs.filter(item => item.id !== id);

      commit('update', newState);
    },
  },

  mutations: {
    update(state, newState) {
      Vue.set(state, 'tabs', newState);
    },
  },

  namespaced: true,

  state: {
    tabs: [],
  },

};
