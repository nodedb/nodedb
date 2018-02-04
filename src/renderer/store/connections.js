/**
 * connections
 */

/* Node modules */

/* Third-party modules */
import Vue from 'vue';

/* Files */

const connections = [];

for (let i = 0; i < 5; i += 1) {
  connections.push({
    id: `id${i}`,
    name: `name${i}`,
  });
}

export default {

  actions: {
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
    connections,
  },

};
