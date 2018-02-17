/**
 * index
 */

/* Node modules */

/* Third-party modules */
import Vue from 'vue';
import Vuex from 'vuex';

/* Files */
import app from './app';
import connections from './connections';
import drivers from './drivers';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    app,
    connections,
    drivers,
  },
  strict: process.env.NODE_ENV !== 'production',
});
