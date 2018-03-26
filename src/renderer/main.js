/**
 * main
 */

/* Node modules */

/* Third-party modules */
import Vue from 'vue';
import 'font-awesome/css/font-awesome.css';
import 'open-sans-fontface/open-sans.css';

/* Files */
import App from './components/app';
import router from './lib/router';
import store from './store/index';

if (!process.env.IS_WEB) {
  Vue.use(require('vue-electron'));
}

export default new Vue({
  router,
  store,
  components: {
    App,
  },
  el: '#app',
  template: '<App/>',
});
