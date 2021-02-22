<template>
  <div id="app">
    <div class="container border border-dark container-bg" :style="getBackgroundImage">
      <BattleField />
    </div>
  </div>
</template>

<script>
import BattleField from './components/battle/BattleField.vue';
import dota from './assets/dota2-bg.jpg';

export default {
  name: 'App',
  components: {
    BattleField,
  },
  computed: {
    getBackgroundImage() {
      return `background-image: url(${dota})`;
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
.container-bg {
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
