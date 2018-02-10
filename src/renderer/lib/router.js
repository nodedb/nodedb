/**
 * router
 */

/* Node modules */

/* Third-party modules */
import Vue from 'vue';
import Router from 'vue-router';

/* Files */
import query from '../pages/query';

Vue.use(Router);

export default new Router({
  routes: [{
    path: '/query',
    name: 'query',
    component: query,
    meta: {
      layout: 'query',
    },
  }, {
    path: '*',
    redirect: {
      name: 'query',
    },
  }],
});
