<template>
  <div class="player-image" :style="getBackgroundImage"></div>
</template>
<script>
export default {
  name: 'HeroImage',
  props: {
    image: String,
  },

  computed: {
    getBackgroundImage() {
      return `background-image: url(${this.image})`;
    },
  },
};
</script>
<style scoped>
.player-image {
  background-repeat: no-repeat;
  background-size: contain;
  height: 200px;
  background-position: top;
  /* width: 100%; */
  /* background-color: blue;     */
  margin: auto;
}
</style>
