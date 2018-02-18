/**
 * i18n
 */

/* Node modules */

/* Third-party modules */
import Vue from 'vue/dist/vue.min';
import VueI18Next from '@panter/vue-i18next';

/* Files */
import i18n from '../../common/lib/i18n';

Vue.use(VueI18Next);

export default new VueI18Next(i18n);
