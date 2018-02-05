/**
 * connections
 */

/* Node modules */

/* Third-party modules */
import Vue from 'vue';

/* Files */

export default {

  actions: {
    loadState({ commit }) {
      const connections = [];

      commit('update', connections);
    },

    remove({ commit, state }, id) {
      const newState = state.connections.filter(item => item.id !== id);

      commit('update', newState);
    },
  },

  mutations: {
    update(state, newState) {
      Vue.set(state, 'connections', newState);
    },
  },

  namespaced: true,

  state: {
    connections: [],
  },

};
