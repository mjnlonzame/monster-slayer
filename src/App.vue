<template>
  <div id="app" class="container  h-100">
    <header v-if="this.$router.currentRoute.name !== 'LoginAccount'">
      <nav>
        <ul class="nav nav-pills mr-auto">
          <li class="nav-item">
            <router-link
              class="nav-link"
              active-class="active"
              :to="{name: 'CharacterProfile'}"
            >Character</router-link>
          </li>
          <li class="nav-item">
            <router-link
class="nav-link"
             :to="{name: 'TheDungeon'}"
active-class="active">Dungeons</router-link>
          </li>
          <li class="nav-item ml-auto">
            <router-link class="nav-link" :to="{name: 'LoginAccount'}" exact>Logout</router-link>
          </li>
        </ul>
      </nav>
    </header>
    <div>
      <router-view />
    </div>

  </div>
</template>

<script>
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
  components: {},
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

.router-link-active {
  color: gray;
}
.container {
  min-height: 300px;
}

.hasErrors {
  border-color: red !important;
}

.gray-border {
    height: 100%;
    border: 2px solid gray;
    margin: 3px;
    border-radius: 8px;
    padding: 10px;
}
</style>
