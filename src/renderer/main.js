/**
 * main
 */

/* Node modules */

/* Third-party modules */
import ElementUI from 'element-ui';
import Vue from 'vue';
import VueI18Next from '@panter/vue-i18next';
import 'element-ui/lib/theme-chalk/index.css';
import 'font-awesome/css/font-awesome.css';
import 'open-sans-fontface/open-sans.css';

/* Files */
import App from './components/app';
import i18n from '../common/lib/i18n';
import router from './lib/router';
import store from './store/index';

Vue.use(ElementUI);
Vue.use(VueI18Next);

if (!process.env.IS_WEB) {
  Vue.use(require('vue-electron'));
}
Vue.config.productionTip = false;

export default new Vue({
  components: {
    App,
  },
  el: '#app',
  i18n: new VueI18Next(i18n),
  router,
  store,
  template: '<App/>',
});
