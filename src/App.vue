<template>
  <div id="app" class="container h-100">
    <header v-if="showNav()">
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
             to="/dungeons"
active-class="active">Dungeons</router-link>
          </li>
          <li class="nav-item ml-auto">
            <router-link
class="nav-link"
            :to="{name: 'LoginAccount'}"
exact>Logout</router-link>
          </li>
        </ul>
      </nav>
    </header>
    <div class="app-header">
      <div class="row justify-content-center align-items-center">
        <div class="col-1">
          <div v-if="$route.meta.previousPath">
            <router-link
class="back-route"
            :to="{name: $route.meta.previousPath}">&laquo; Back</router-link>
          </div>
        </div>
        <div class="col">
          <h4 class="text-center font-weight-bold">{{$route.meta.title}}</h4>
        </div>
        <div class="col-2"></div>
      </div>
    </div>
    <main>
      <router-view />
    </main>
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
  created() {},
  components: {},
  computed: {},
  methods: {
    showNav() {
      return !['LoginAccount', 'UserForm'].includes(
        this.$router.currentRoute.name,
      );
    },
  },
};
</script>

<style>
html {
  background-repeat: no-repeat;
  background-size: cover;
}

.back-route {
  text-decoration: none;
  color: black !important;
}

.app-header {
  min-height: 10px;
}

#app {
  font-family: Segoe UI, Tahoma, Geneva, Verdana, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

img {
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
  user-drag: none;
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
  border: 2px solid white;
  border-radius: 8px;
  padding: 10px;
}
.dark-bg {
  background-image: linear-gradient(90deg, #000, #00008b);
  color: white;
}
</style>
