import Vue from 'vue';

import Router from 'vue-router';
import UserForm from '../components/account/CreateAccount.vue';
import LoginAccount from '../components/account/LoginAccount.vue';
import BattleField from '../components/battle/BattleField.vue';
import TheDungeon from '../components/dungeon/TheDungeon.vue';
import CharacterProfile from '../components/character/CharacterProfile.vue';

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
      alias: '/',

    },
    {
      path: '/battle/:dungeonId',
      name: 'BattleField',
      component: BattleField,
      props: true,
    },
    {
      path: '/character',
      name: 'CharacterProfile',
      component: CharacterProfile,
    },
    {
      path: '/dungeons',
      name: 'TheDungeons',
      component: TheDungeon,
    },
  ],
});
