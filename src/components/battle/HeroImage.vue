<template>
  <div class="image-container">
    <img class="player-image" :src="getImageSource" />
  </div>
</template>
<script>
const images = require.context('@/assets/');
export default {
  name: 'HeroImage',
  props: {
    imageName: String,
    isCharacter: Boolean,
    extension: String,
  },

  computed: {
    assetFolder() {
      return this.isCharacter ? 'characters' : 'enemies';
    },
    getImageSource() {
      const image = images(
        `./${this.assetFolder}/${this.imageName}.${this.extension}`,
      );
      return image;
    },
  },
};
</script>
<style scoped>
.player-image {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 30px;
  margin: auto;
  max-height: 300px;
}

.image-container {
  /* text-align: center; */
  height: 300px;
}
</style>
