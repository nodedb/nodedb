/**
 * index
 */

/* Node modules */

/* Third-party modules */
import Vue from 'vue';
import Vuex from 'vuex';

/* Files */
import app from './app';
import drivers from './drivers';
import tabs from './tabs';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    app,
    tabs,
    drivers,
  },
  strict: process.env.NODE_ENV !== 'production',
});
