<template>
  <div class="container-bg" v-if="!isChar1Loading && !isChar2Loading" :style="getBackgroundImage">
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
          <HeroImage :image="getCharacterImage(player1.classType)" />
        </div>
      </div>
      <div class="col">
        <div class="player-box">
          <HeroImage :image="getCharacterImage(player2.classType)" />
        </div>
      </div>
    </div>

    <div class="row controls-content">
      <div class="col">
        <BattleControls
          :basicSkills="player1.skills.filter(skill => skill.type === 'BASIC')"
          :heroSkills="player1.skills.filter(skill => skill.type !== 'BASIC')"
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
import dota from '../../assets/dota2-bg.jpg';
import AccountMixin from '../shared/mixins/AccountMixin.vue';
import characterImages from '../../data/character-image';

function getRandomSkill(skills) {
  const randomNumber = Math.floor(Math.random() * skills.length);
  return skills[randomNumber];
}

function getActionLog(player, skill) {
  if (skill.damage > 0) {
    return `${player.name} uses ${skill.name} and deals ${skill.damage} points of damage!`;
  }
  const regenerationType = skill.damage < 0 ? 'health' : 'mana';
  const regenerationPoints = skill.damage < 0 ? skill.damage : skill.cost;
  return `${player.name} uses ${skill.name} and regenerates ${Math.abs(regenerationPoints)} points of ${regenerationType}.`;
}

function getValidMana(maxMana, mana) {
  // eslint-disable-next-line no-nested-ternary
  return mana > maxMana ? maxMana : mana >= 0 ? mana : 0;
}

function manaFull(maxMana, mana) {
  return maxMana === mana;
}

const defaultSkills = [
  {
    name: 'Attack',
    type: 'BASIC',
    damage: 50,
    cost: 0,
    target: 'enemy',
  },
  {
    name: 'Focus',
    type: 'BASIC',
    damage: null,
    cost: -20,
    target: 'self',
  },
];

export default {
  name: 'BattleField',
  components: {
    BattleLogs,
    BattleIndicators,
    BattleControls,
    HeroImage,
  },
  mixins: [AccountMixin],
  props: {
    account: Object,
    accountId: String,
  },
  data() {
    const initialBattleState = this.initBattleState();
    return {
      ...initialBattleState,
      isChar1Loading: true,
      isChar2Loading: true,
      character1: {
      },
      character2: {
      },
    };
  },
  created() {
    this.getCharacter(this.accountId).then((character) => {
      this.setupCharacter(character);
      this.character1 = character;
      this.player1 = { ...this.player1, ...character };
      this.isChar1Loading = false;
    });
    const defaultPlayer2Id = '6048803a120e7c001796193d';
    this.getCharacter(defaultPlayer2Id).then((character) => {
      this.setupCharacter(character);
      this.character2 = character;
      this.player2 = { ...this.player2, ...character };
      this.isChar2Loading = false;
    });
  },
  computed: {
    getBackgroundImage() {
      return `background-image: url(${dota})`;
    },
  },
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
    initBattleState() {
      const health = 500;
      const mana = 100;

      return {
        actionLogs: [],
        player1: { ...this.character1, health, mana },
        player2: { ...this.character2, health, mana },
        battleFinish: false,
        winner: '',
      };
    },
    getCharacterImage(classType) {
      const characterImage = characterImages.find((charImage) => charImage.id === classType);
      return characterImage ? characterImage.image : null;
    },
    setupCharacter(character) {
      character.skills.push(...defaultSkills);
    },
    useSkill(player, enemy, skill) {
      console.log(skill);
      if (skill.damage !== 0) {
        if (skill.target === 'self') {
          player.health -= skill.damage;
        } else {
          enemy.health -= skill.damage;
        }

        const currentMana = player.mana - skill.cost;
        player.mana = getValidMana(100, currentMana);
      } else {
        const currentMana = player.mana + skill.manaRegen;
        player.mana = getValidMana(100, currentMana);
      }
    },
    logAction(player, skill) {
      const actionLog = getActionLog(player, skill);
      this.actionLogs.push(actionLog);
    },
    playAgain() {
      Object.assign(this.$data, this.initBattleState());
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
      return player.mana >= skill.cost;
    },
  },
};
</script>

<style scoped>
.container-bg {
  background-repeat: no-repeat;
  background-size: cover;
}

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
