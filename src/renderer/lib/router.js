/**
 * router
 */

/* Node modules */

/* Third-party modules */
import Vue from 'vue';
import Router from 'vue-router';

/* Files */
import query from '../pages/query';
import welcome from '../pages/welcome';

Vue.use(Router);

export default new Router({
  routes: [{
    path: '/',
    name: 'welcome',
    component: welcome,
  }, {
    path: '/query',
    name: 'query',
    component: query,
  }, {
    path: '*',
    redirect: {
      name: 'query',
    },
  }],
});
