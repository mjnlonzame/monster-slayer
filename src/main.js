import Vue from 'vue';
import Vuelidate from 'vuelidate';
import VueResource from 'vue-resource';
import VueSession from 'vue-session';
import App from './App.vue';
import router from './router';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './store/index';
import statusFilter from './components/shared/status-filter';

Vue.use(VueSession, {
  persist: false,
});
Vue.use(VueResource);
Vue.filter('status', statusFilter);

Vue.config.productionTip = false;
// vuelidate documentation https://vuelidate.js.org/
// use installed Vuelidate
Vue.use(Vuelidate);

new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount('#app');
