<template>
  <div class="dungeon-image" :style="backgroundImage" @click="onDungeonClick">
    <img class="locked-icon" :src="getImageSource()" v-if="dungeon.locked" />
  </div>
</template>
<script>
const images = require.context('@/assets/dungeons/');
export default {
  name: 'TheDungeonImage',
  props: {
    dungeon: Object,
  },

  computed: {
    backgroundImage() {
      const image = images(`./${this.dungeon.image}.jpg`);
      return `background-image: url(${image})`;
    },
  },
  methods: {
    getImageSource() {
      const image = images('./locked-icon.png');
      return image;
    },
    onDungeonClick() {
      this.$emit('dungeonClicked', this.dungeon);
    },
  },
};
</script>
<style scoped>
.dungeon-image {
  background-repeat: no-repeat;
  background-size: contain;
  height: 200px;
  background-position: top;
  margin-bottom: 20px;
}

.locked-icon {
  height: 200px;
  width: 400px;
  opacity: 0.5;
}
</style>
