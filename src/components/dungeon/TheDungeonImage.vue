<template>
    <div class="dungeon-image" :style="getImageSource" @click="onDungeonClick">
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
    getImageSource() {
      const image = images(`./${this.dungeon.image}.jpg`);
      // console.log(`image: ${image}`);
      return `background-image: url(${image})`;
      // return images(`./${this.dungeon.image}.jpg`);
    },
  },
  methods: {
    onDungeonClick() {
      console.log(this.dungeon.name);
      this.$emit('dungeonClicked', this.dungeon);
    },
  },
};
</script>
<style scoped>

.dungeon-image {
    /* padding: 120px; */
  background-repeat: no-repeat;
  background-size: contain;
  height: 200px;
  background-position: top;
  margin-bottom: 20px;
}

</style>
