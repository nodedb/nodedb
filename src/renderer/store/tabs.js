/**
 * tabs
 */

/* Node modules */

/* Third-party modules */
import Vue from 'vue';

/* Files */

export default {

  actions: {
    loadState({ commit }) {
      const tabs = [];

      for (let i = 0; i < 5; i += 1) {
        tabs.push({
          id: `id${i}`,
          name: `name${i}`,
          type: 'query',
        });
      }

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
