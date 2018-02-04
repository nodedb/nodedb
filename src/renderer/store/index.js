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

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    app,
    connections,
  },
  strict: process.env.NODE_ENV !== 'production',
});
