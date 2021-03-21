<template>
    <div>
        <h1>Dungeons</h1>
        <div v-if="dungeons.length > 0" class="row">
          <div class="col-6 ">
            <div class="dungeon-images-box">
    <TheDungeonImage class="row" v-for="dungeon in dungeons" :key="dungeon.id"
               @dungeonClicked="(dungeon) => handleDungeonClicked(dungeon)"
                :dungeon="dungeon" ></TheDungeonImage>
            </div>

          </div>
          <div class="col-6">
            <TheDungeonInfo :dungeon="selectedDungeon"/>
          </div>
        </div>
    </div>
</template>

<script >
import { mapState, mapActions } from 'vuex';
import TheDungeonImage from './TheDungeonImage.vue';
import TheDungeonInfo from './TheDungeonInfo.vue';

export default {

  name: 'TheDungeon',
  components: { TheDungeonImage, TheDungeonInfo },
  data() {
    return {
      selectedDungeon: {

      },
    };
  },
  created() {
    const accountId = this.$session.get('accountId');
    console.log(`account id from session : ${accountId}`);
    // TODO: make this dynmaic and move the setting of session in the appropriate place

    // = '60476583e4bfda00175c4ded';
    // this.$session.set('characterId', characterId);
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
      console.log(dungeon);
      // console.log(dungeon.enemies[0]._);
      this.selectedDungeon = dungeon;
    },

  },

};
</script>

<style  scoped>
 .dungeon-images-box {
  overflow-y: scroll;
  margin-bottom: 10px;
  min-height: 290px;
  padding: 20px;
  text-align: center;
}
</style>
