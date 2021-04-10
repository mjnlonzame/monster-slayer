import Vue from 'vue';
import Vuelidate from 'vuelidate';
import VueResource from 'vue-resource';
import VueSession from 'vue-session';
import * as svgicon from 'vue-svgicon';

import Loading from 'vue-loading-overlay';
import App from './App.vue';
import router from './router';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './store/index';
import statusFilter from './components/shared/status-filter';
import 'vue-loading-overlay/dist/vue-loading.css';

Vue.use(Loading);
Vue.use(VueSession, {
  persist: false,
});
Vue.use(VueResource);
Vue.filter('status', statusFilter);

Vue.config.productionTip = false;

Vue.use(Vuelidate);

Vue.use(svgicon, {
  tagName: 'svgicon',
  defaultWidth: '1.2em',
  defaultHeight: '1.2em',
  isStroke: false,
  isOriginalDefault: true,
});

new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount('#app');
