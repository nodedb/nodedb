/**
 * router
 */

/* Node modules */

/* Third-party modules */
import Vue from 'vue';
import Router from 'vue-router';

/* Files */
import login from '../pages/login';
import query from '../pages/query';

Vue.use(Router);

export default new Router({
  routes: [{
    path: '/login',
    name: 'login',
    component: login,
  }, {
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
