/**
 * tabs
 */

/* Node modules */

/* Third-party modules */
import { _ } from 'lodash';
import uuid from 'uuid';
import Vue from 'vue';

/* Files */
import Logger from '../../common/lib/logger';

export default {

  actions: {
    add({ dispatch, state }, tab) {
      const id = uuid.v4();

      const { data = {}, name, route } = tab;

      const newState = _.clone(state.tabs);
      newState.push({
        id,
        data,
        name,
        route,
      });

      return dispatch('save', newState)
        .then(() => id);
    },

    loadState({ dispatch }) {
      return Promise.resolve()
        .then(() => {
          Logger.trigger('trace', 'LOADING_TABS_FROM_MEMORY');

          const tabs = JSON.parse(sessionStorage.getItem('tabs'));

          if (!Array.isArray(tabs)) {
            return undefined;
          }

          return dispatch('save', tabs);
        })
        .catch((err) => {
          Logger.trigger('warn', 'ERROR_LOADING_TABS_FROM_MEMORY', {
            err,
          });
        });
    },

    findById: ({ getters }, id) => getters.findById(id),

    remove({ dispatch, state }, id) {
      const newState = state.tabs.filter(item => item.id !== id);

      return dispatch('save', newState);
    },

    save({ commit }, newState) {
      return Promise.resolve()
        .then(() => {
          sessionStorage.setItem('tabs', JSON.stringify(newState));

          commit('update', newState);
        })
        .catch((err) => {
          Logger.trigger('error', 'ERROR_SAVING_TAB_STATE', {
            err,
          });
        });
    },

    updateTabData({ dispatch, state }, { id, item, value }) {
      const newState = _.cloneDeep(state.tabs);
      const index = newState.findIndex(item => item.id === id);

      _.set(newState[index], `data.${item}`, value);

      return dispatch('save', newState);
    },
  },

  getters: {
    findById: state => (id) => {
      const index = state.tabs.findIndex(item => item.id === id);

      return {
        index,
        tab: state.tabs[index] || {},
      };
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
