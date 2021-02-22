<template>
  <div>
    <div class="row">
      <div class="col">
        <div class="indicator-box">
          <BattleIndicators
            :health="player1.health"
            :mana="player1.mana"
            player="player1"
            @playerLose="(player) => handlePlayerLose(player)"
          />
          <p class="player">{{player1.name}}</p>
        </div>
      </div>
      <div class="col">
        <div class="indicator-box">
          <BattleIndicators
            :health="player2.health"
            :mana="player2.mana"
            player="player2"
            @playerLose="(player) => handlePlayerLose(player)"
          />
          <p class="player">{{player2.name}}</p>
        </div>
      </div>
    </div>
    <div class="row players-content">
      <div class="col">
        <div class="player-box">
          <HeroImage :image="player1.image" />
        </div>
      </div>
      <div class="col">
        <div class="player-box">
          <HeroImage :image="player2.image" />
        </div>
      </div>
    </div>

    <div class="row controls-content">
      <div class="col">
        <BattleControls
          :heroSkills="player1.skills.filter(skill => skill.type !== 'BASIC')"
          :basicSkills="player1.skills.filter(skill => skill.type === 'BASIC')"
          :availableMana="player1.mana"
          :battleFinish="battleFinish"
          @skillClicked="(skill) => handleSkillClicked(skill)"
        />
      </div>
      <div class="col">
        <BattleLogs :actionLogs="actionLogs" v-show="!battleFinish" />
        <div class="play-again-box border border-dark" v-show="battleFinish">
          <button
            class="btn btn-secondary btn-lg"
            @click="battleFinish = !battleFinish; playAgain()"
          >
            {{winner}} wins! Play
            Again?
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BattleLogs from './BattleLogs.vue';
import BattleIndicators from './BattleIndicators.vue';
import BattleControls from './BattleControls.vue';
import HeroImage from './HeroImage.vue';

import characters from '../../data/characters';

const getRandomSkill = function (skills) {
  const randomNumber = Math.floor(Math.random() * skills.length);
  return skills[randomNumber];
};

function getActionLog(player, skill) {
  if (skill.damage > 0) {
    return `${player.name} uses ${skill.name} and deals ${skill.damage} points of damage!`;
  }
  return `${player.name} uses ${skill.name} and regenerates ${skill.manaRegen} points of mana.`;
}

function getValidMana(maxMana, mana) {
  // eslint-disable-next-line no-nested-ternary
  return mana > maxMana ? maxMana : mana >= 0 ? mana : 0;
}

function manaFull(maxMana, mana) {
  return maxMana === mana;
}

const initialDataState = function () {
  return {
    actionLogs: [],
    player1: { ...characters[0] },
    player2: { ...characters[1] },
    battleFinish: false,
    winner: '',
  };
};
export default {
  name: 'BattleField',
  components: {
    BattleLogs,
    BattleIndicators,
    BattleControls,
    HeroImage,
  },
  data() {
    return initialDataState();
  },
  computer: {},
  methods: {
    handleSkillClicked(skill) {
      this.useSkill(this.player1, this.player2, skill);
      this.logAction(this.player1, skill);
      this.initEnemyTurn();
    },
    handlePlayerLose(player) {
      this.winner = player === 'player1' ? this.player2.name : this.player1.name;
      this.battleFinish = true;
    },
    useSkill(player, enemy, skill) {
      if (skill.damage > 0) {
        enemy.health -= skill.damage;
        const currentMana = player.mana - skill.manaCost;
        player.mana = getValidMana(player.maxMana, currentMana);
      } else {
        const currentMana = player.mana + skill.manaRegen;
        player.mana = getValidMana(player.maxMana, currentMana);
      }
    },
    logAction(player, skill) {
      const actionLog = getActionLog(player, skill);
      this.actionLogs.push(actionLog);
    },
    playAgain() {
      Object.assign(this.$data, initialDataState());
    },
    initEnemyTurn() {
      const player = this.player2;
      let skill = getRandomSkill(player.skills);

      if (!this.manaSufficient(player, skill)) {
        skill = player.skills.find(
          (currentSkill) => currentSkill.name === 'Focus',
        );
      } else if (
        manaFull(player.maxMana, player.mana)
        && skill.name === 'Focus'
      ) {
        this.initEnemyTurn();
      }
      this.useSkill(player, this.player1, skill);
      this.logAction(player, skill);
    },
    manaSufficient(player, skill) {
      return player.mana >= skill.manaCost;
    },
  },
};
</script>

<style scoped>
.indicator-box {
  min-height: 50px;
  padding: 5px;
  margin-top: 15px;
}

.player-box {
  min-height: 200px;
  padding: 10px;
}

.player {
  text-align: center;
  font-size: 1rem;
  margin-top: 5px;
}

.play-again-box {
  min-height: 288px;
  line-height: 288px;
  text-align: center;
}
</style>
