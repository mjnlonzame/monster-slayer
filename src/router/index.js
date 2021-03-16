import Vue from 'vue';

import Router from 'vue-router';
import UserForm from '../components/account/CreateAccount.vue';
import LoginAccount from '../components/account/LoginAccount.vue';
import BattleField from '../components/battle/BattleField.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/account/create',
      name: 'UserForm',
      component: UserForm,

    },
    {
      path: '/login',
      name: 'LoginAccount',
      component: LoginAccount,

    },
    {
      path: '/battle/:accountId',
      name: 'BattleField',
      component: BattleField,
      props: true,

    },
  ],
});
