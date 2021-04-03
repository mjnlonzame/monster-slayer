import Vue from 'vue';

import Router from 'vue-router';
import UserForm from '../components/account/CreateAccount.vue';
import LoginAccount from '../components/account/LoginAccount.vue';
import BattleField from '../components/battle/BattleField.vue';
import TheDungeon from '../components/dungeon/TheDungeon.vue';
import CharacterProfile from '../components/character/CharacterProfile.vue';
import CharacterInventory from '../components/character/CharacterInventory.vue';
import CharacterSkills from '../components/character/CharacterSkills.vue';

Vue.use(Router);

const router = new Router({
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
      path: '/dungeons/:dungeonId',
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
      path: '/character/inventory',
      name: 'CharacterInventory',
      component: CharacterInventory,
    },
    {
      path: '/character/skills',
      name: 'CharacterSkills',
      component: CharacterSkills,
    },

    {
      path: '/dungeons',
      name: 'TheDungeon',
      component: TheDungeon,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const reqSession = to.matched.some((route) => route.meta.requiresSession);
  if (!reqSession) next();

  if (router.app.$session.exists()) {
    next();
  } else {
    next({ name: 'LoginAccount' });
  }
});

export default router;
