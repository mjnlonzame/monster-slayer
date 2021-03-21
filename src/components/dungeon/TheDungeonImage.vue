<template>
  <div >
    <img class="img-fluid" :src="getImageSource" @click="onDungeonClick" />
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
      return images(`./${this.dungeon.image}.jpg`);
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
img {
    /* width: 100%; */
    padding: 50px;
}

/* .dungeon-images-box {
  overflow-y: scroll;
  margin-bottom: 10px;
  min-height: 290px;
  padding: 20px;
  text-align: center;
} */
</style>
