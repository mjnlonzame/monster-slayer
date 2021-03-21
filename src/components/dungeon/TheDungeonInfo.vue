<template>
  <div>
    <div class="row">
      <div class="col">
        <h3>{{dungeon.name}}</h3>
      </div>
      <div class="col">
        <button @click="onClickEnterDungeon">Enter</button>
      </div>
    </div>
    <h5>Recommended Level:</h5>
    <h5>Encounters/Drops:</h5>
    <div class="row" v-for="regularEnemy in regularEnemies" :key="regularEnemy._id">
      <div class="col-3 font-weight-normal font-italic">{{regularEnemy.name}}</div>
      <div class="col">
        <!-- <div class="row"> -->
        <div class="row" v-if="regularEnemy.drops.length > 0">
          <ul class="col list-unstyled" v-for="drop in regularEnemy.drops" :key="drop._id">
            <li class="text-nowrap font-weight-lighter">{{drop.name}}</li>
          </ul>
        </div>
        <div class="row" v-else>
          <div class="col font-weight-lighter">None</div>
        </div>
      </div>
    </div>
    <h5>Boss/Drops</h5>
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
      console.log(this.dungeon);
      return this.dungeon.enemies.filter((enemy) => !enemy.boss);
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
