<template>
  <div>
    <div v-if="dungeons && dungeons.length > 0" class="row">
      <div class="col-6">
        <div class="dungeon-images-box gray-border">
          <TheDungeonImage
            v-for="dungeon in dungeons"
            :key="dungeon.id"
            @dungeonClicked="dungeon => handleDungeonClicked(dungeon)"
            :dungeon="dungeon"
          ></TheDungeonImage>
        </div>
      </div>
      <div class="col-6">
        <div class="gray-border">
          <TheDungeonInfo :dungeon="selectedDungeon" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import TheDungeonImage from './TheDungeonImage.vue';
import TheDungeonInfo from './TheDungeonInfo.vue';
import resetStoreMixin from '../shared/mixins/ResetStoreMixin.vue';

export default {
  name: 'TheDungeon',
  components: { TheDungeonImage, TheDungeonInfo },
  data() {
    return {
      selectedDungeon: {},
    };
  },
  mixins: [resetStoreMixin],
  created() {
    const characterId = this.$session.get('characterId');
    this.getDungeons(characterId).then((dungeons) => {
      this.selectedDungeon = dungeons && dungeons.length > 0 ? dungeons[0] : null;
    });
  },

  computed: {
    ...mapState({
      dungeons: (state) => state.dungeons,
    }),
  },
  methods: {
    ...mapActions(['getDungeons', 'enterDungeon']),
    handleDungeonClicked(dungeon) {
      this.selectedDungeon = dungeon;
    },
  },
  // eslint-disable-next-line no-unused-vars
};
</script>

<style scoped>
.dungeon-images-box {
  overflow-y: scroll;
  /* margin-bottom: 10px; */
  /* min-height: 290px; */
  /* padding: 20px; */
  text-align: center;
  max-height: 600px;
}
</style>
