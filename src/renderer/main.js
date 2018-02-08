/**
 * main
 */

/* Node modules */

/* Third-party modules */
import ElementUI from 'element-ui';
import Vue from 'vue';
import 'element-ui/lib/theme-chalk/index.css';
import 'font-awesome/css/font-awesome.css';
import 'open-sans-fontface/open-sans.css';

/* Files */
import App from './components/app';
import router from './lib/router';
import store from './store/index';

Vue.use(ElementUI);

if (!process.env.IS_WEB) {
  Vue.use(require('vue-electron'));
}
Vue.config.productionTip = false;

export default new Vue({
  router,
  store,
  components: {
    App,
  },
  el: '#app',
  template: '<App/>',
});
