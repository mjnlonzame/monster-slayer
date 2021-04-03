<template>
  <div class="dungeon-info-content" v-if="dungeon.enemies">
    <div class="row">
      <div class="col">
        <h3>{{ dungeon.name }}</h3>
      </div>
      <div class="col">
        <button v-show="!dungeon.locked" class="btn btn-secondary" @click="onClickEnterDungeon">
          Enter
        </button>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <h5>Recommended Level:</h5>
      </div>
      <div class="col">{{ dungeon.recommendedLevel }}</div>
    </div>
    <h5>Encounters/Drops:</h5>
    <div class="row" v-for="regularEnemy in regularEnemies" :key="regularEnemy._id">
      <div class="col-3 font-weight-normal font-italic">{{ regularEnemy.name }}</div>
      <div class="col">
        <div class="row" v-if="regularEnemy.drops.length > 0">
          <ul class="col list-unstyled" v-for="drop in regularEnemy.drops" :key="drop._id">
            <li class="text-nowrap font-weight-lighter">{{ drop.name }}</li>
          </ul>
        </div>
        <div class="row" v-else>
          <div class="col font-weight-lighter">None</div>
        </div>
      </div>
    </div>
    <h5>Boss/Drops</h5>
    <div class="row">
      <div class="col-3 font-weight-normal font-italic">{{ bossEnemy.name }}</div>
      <div class="col">
        <div class="row" v-if="bossEnemy.drops.length > 0">
          <ul class="col list-unstyled" v-for="drop in bossEnemy.drops" :key="drop._id">
            <li class="text-nowrap font-weight-lighter">{{ drop.name }}</li>
          </ul>
        </div>
        <div class="row" v-else>
          <div class="col font-weight-lighter">None</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheDungeonInfo',
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
/*
.dungeon-info-content {
  overflow-y: scroll;
  margin-bottom: 10px;
  padding: 20px;
  text-align: center;
  max-height: 500px;
} */
</style>
