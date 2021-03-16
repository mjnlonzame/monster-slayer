import Vue from 'vue';
import Vuelidate from 'vuelidate';
import VueResource from 'vue-resource';
import App from './App.vue';
import router from './router';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

Vue.use(VueResource);

Vue.config.productionTip = false;
// vuelidate documentation https://vuelidate.js.org/
// use installed Vuelidate
Vue.use(Vuelidate);

new Vue({
  render: (h) => h(App),
  router,
}).$mount('#app');
