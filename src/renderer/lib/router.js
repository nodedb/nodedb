/**
 * router
 */

/* Node modules */

/* Third-party modules */
import Vue from 'vue';
import Router from 'vue-router';

/* Files */
import connection from '../pages/connection';
import query from '../pages/query';
import welcome from '../pages/welcome';

Vue.use(Router);

export default new Router({
  routes: [{
    path: '/welcome',
    name: 'welcome',
    components: {
      default: welcome,
    },
  }, {
    path: '/connection',
    name: 'connection',
    components: {
      default: connection,
    },
  }, {
    path: '/query',
    name: 'query',
    components: {
      default: query,
      sidebar: {
        template: '<div>@todo</div>',
      },
    },
  }, {
    path: '*',
    redirect: {
      name: 'welcome',
    },
  }],
});
