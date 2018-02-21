/**
 * tabs
 */

/* Node modules */

/* Third-party modules */
import { _ } from 'lodash';
import uuid from 'uuid';
import Vue from 'vue';

/* Files */

export default {

  actions: {
    add({ commit, state }, data) {
      const id = uuid.v4();

      const newState = _.clone(state.tabs);
      newState.push({
        id,
        name: data.name,
        route: data.route,
      });

      commit('update', newState);

      return id;
    },

    loadState({ commit }) {
      const tabs = [];

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
