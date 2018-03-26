/**
 * router
 */

/* Node modules */

/* Third-party modules */
import Vue from 'vue';
import Router from 'vue-router';

/* Files */
import login from '../pages/login';

Vue.use(Router);

export default new Router({
  routes: [{
    path: '/login',
    name: 'login',
    component: login,
  }, {
    path: '*',
    redirect: {
      name: 'login',
    },
  }],
});
