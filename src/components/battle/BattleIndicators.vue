<template>
  <div>
    <div class="row">
      <div class="col">
        <div class="health-bar">
          <div class="progress">
            <div
              class="progress-bar progress-bar-striped"
              role="progressbar"
              :style="{width:  getHealth}"
              aria-valuenow="10"
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="mana-bar">
          <div class="progress">
            <div
              class="progress-bar progress-bar-striped"
              role="progressbar"
              :style="{width:  getMana}"
              aria-valuenow="10"
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BattleIndicators',
  created() {
    this.MAX_HP = this.health;
    this.MAX_MANA = this.mana;
  },
  data() {
    return {
      MAX_MANA: null,
      MAX_HP: null,
    };
  },
  props: {
    health: {
      type: Number,
    },
    mana: Number,
    player: String,
  },
  watch: {
    health(newVal) {
      if (newVal <= 0) {
        this.$emit('playerLose', this.player);
      }
    },
  },
  computed: {
    getHealth() {
      const currentHealth = this.health >= 0 ? this.health : 0;
      const healthPercentage = (currentHealth / this.MAX_HP) * 100;
      return `${healthPercentage}%`;
    },
    getMana() {
      const manaPercentage = (this.mana / this.MAX_MANA) * 100;
      return `${manaPercentage}%`;
    },
  },
};
</script>

<style scoped>
.health-bar .progress {
  min-height: 30px;
}

.health-bar .progress .progress-bar {
  background-color: green;
}

.mana-bar .progress .progress-bar {
  background-color: purple;
}

.mana-bar .progress {
  min-height: 15px;
}

.health-bar {
  margin-bottom: 10px;
}
</style>
