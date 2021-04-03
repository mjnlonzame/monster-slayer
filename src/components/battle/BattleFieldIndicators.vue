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

    <!-- <span class="text-center">Level {{level}} {{playerName}}</span> -->
    <div class="parent">
      <div class="left">
          <div class="col">Health: {{health | status}} / {{MAX_HP}}</div>
          <div class="col">Mana: {{mana | status }} / {{MAX_MANA}}</div>
      </div>
      <div class="center">Level {{level}} {{playerName}}</div>
      <div class="right"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BattleFieldIndicators',
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
    playerName: String,
    level: Number,
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

.player {
  text-align: center;
  font-size: 1rem;
  margin-top: 5px;
}

.panel-footer {
  display: flex;
  justify-content: space-between;
}

.parent {
  display: flex;
}
.left, .right {
  flex: 1;
  font-size: .8rem;
}

.center {
    position: relative;
    margin: auto;
}
</style>
