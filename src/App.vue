<template>
  <div id="app">
    <div class="container">
      <!-- <BattleField v-if="hasAccount" :account="account" />
      <CreateAccount v-if="!hasAccount" @accountCreated="handleAccountCreated" /> -->
      <router-view />
    </div>
  </div>
</template>

<script>
// import BattleField from './components/battle/BattleField.vue';

// import CreateAccount from './components/account/CreateAccount.vue';

export default {
  name: 'App',
  data() {
    return {
      account: null,
    };
  },
  created() {
    this.getAccountFromLocalStorage();
  },
  components: {
    // BattleField,
    // CreateAccount,
  },
  computed: {
    hasAccount() {
      return this.account !== null;
    },
  },
  methods: {
    handleAccountCreated() {
      this.getAccountFromLocalStorage();
    },
    getAccountFromLocalStorage() {
      const account = localStorage.getItem('currentAccount');
      if (account) {
        this.account = { ...JSON.parse(account) };
      }
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.container {
  min-height: 300px;

}

.hasErrors {
  border-color: red !important;
}
</style>
