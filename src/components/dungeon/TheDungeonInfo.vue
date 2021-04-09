<template>
  <div class="dungeon-info-content" v-if="dungeon.enemies">
    <div class="row">
      <div class="col">
        <h3>{{ dungeon.name }}</h3>
      </div>
      <div class="col-4">
        <button
          v-show="!dungeon.locked"
          class="btn btn-dark btn-enter"
          @click="onClickEnterDungeon"
        >Enter</button>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <h5>Recommended Level:</h5>
      </div>
      <div class="col">{{ dungeon.recommendedLevel }}</div>
    </div>
    <div class="monster-drops-info" v-if="!dungeon.locked">
      <div class="regular-enemy-info">
        <h5>Encounters/Drops:</h5>
        <div class="row" v-for="regularEnemy in regularEnemies" :key="regularEnemy._id">
          <div class="col-3 font-weight-normal font-italic">{{ regularEnemy.name }}</div>
          <div class="col">
            <div class="row" v-if="regularEnemy.drops && regularEnemy.drops.length > 0">
              <ul class="col list-unstyled" v-for="drop in regularEnemy.drops" :key="drop._id">
                <li class="text-nowrap font-weight-lighter">
                  <AppIcon :iconName="getItemIconName(drop.classId, drop.type)" />
                  {{ drop.name }}
                </li>
              </ul>
            </div>
            <div class="row" v-else>
              <div class="col font-weight-lighter">None</div>
            </div>
          </div>
        </div>
      </div>
      <div class="boss-info" v-if="bossEnemy">
        <h5>Boss/Drops</h5>
        <div class="row">
          <div class="col-3 font-weight-normal font-italic">{{ bossEnemy.name }}</div>
          <div class="col">
            <div class="drops-info" v-if="bossEnemy.drops && bossEnemy.drops.length > 0">
              <ul class="col list-unstyled" v-for="drop in bossEnemy.drops" :key="drop._id">
                <li class="text-nowrap font-weight-lighter">
                  <AppIcon :iconName="getItemIconName(drop.classId, drop.type)" />
                  {{ drop.name }}
                </li>
              </ul>
            </div>
            <div class="row" v-else>
              <div class="col font-weight-lighter">None</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="locked-info" v-else>
      <div class="row">
        <div class="col-3">Requirements</div>
        <div class="col">Defeat {{dungeon.bossReq.name}} from the previous dungeon.</div>
      </div>
    </div>
  </div>
</template>

<script>
import AppIcon from '../shared/AppIcon.vue';
import characterMixin from '../shared/mixins/CharacterMixin.vue';

export default {
  name: 'TheDungeonInfo',
  components: {
    AppIcon,
  },
  mixins: [characterMixin],
  props: {
    dungeon: Object,
  },
  computed: {
    // bossEnemies() {
    //   return this.dungeon.enemies.filter((enemy) => enemy.boss);
    // },
    regularEnemies() {
      return this.dungeon.enemies.filter((enemy) => !enemy.boss);
    },

    bossEnemy() {
      return this.dungeon.enemies.find((enemy) => enemy.boss);
    },
  },
  methods: {
    onClickEnterDungeon() {
      this.$router.push({
        name: 'BattleField',
        params: {
          dungeonId: this.dungeon._id,
        },
      });
    },
  },
};
</script>

<style scoped>
.btn-enter {
  padding: 5px 50px;
}
/*
.dungeon-info-content {
  overflow-y: scroll;
  margin-bottom: 10px;
  padding: 20px;
  text-align: center;
  max-height: 500px;
} */
</style>
