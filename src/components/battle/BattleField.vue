<template>
  <!-- v-if="!isChar1Loading && !isChar2Loading"  -->
  <div class="container-bg" v-if="character && enemy" :style="getBackgroundImage">
    <div class="row">
      <div class="col">
        <div class="indicator-box">
          <BattleFieldIndicators
            :health="character.stats.health"
            :mana="character.stats.mana"
            player="character"
            @playerLose="(player) => handlePlayerLose(player)"
          />
          <p class="player">{{character.name}}</p>
        </div>
      </div>
      <div class="col">
        <div class="indicator-box">
          <BattleFieldIndicators
            :health="enemy.stats.health"
            :mana="enemy.stats.mana"
            player="enemy"
            @playerLose="(player) => handlePlayerLose(player)"
          />
          <p class="player">{{enemy.name}}</p>
        </div>
      </div>
    </div>
    <div class="row players-content">
      <div class="col">
        <div class="player-box">
          <HeroImage :image="getCharacterImage(character.classType)" />
        </div>
      </div>
      <div class="col">
        <div class="player-box">
          <!-- <HeroImage :image="getCharacterImage(player2.classType)" /> -->
        </div>
      </div>
    </div>

    <div class="row controls-content">
      <div class="col">
        <BattleFieldControls
          :basicSkills="character.skills.filter(skill => skill.type === 'BASIC')"
          :heroSkills="character.skills.filter(skill => skill.type !== 'BASIC')"
          :availableMana="character.stats.mana"
          :battleFinish="battleFinish"
          @skillClicked="(skill) => handleSkillClicked(skill)"
        />
      </div>
      <div class="col">
        <BattleLogs :actionLogs="actionLogs" />
        <!-- <div class="play-again-box border border-dark" v-show="battleFinish">
          <button
            class="btn btn-secondary btn-lg"
            @click="battleFinish = !battleFinish; playAgain()"
          >
            {{winner}} wins! Play
            Again?
          </button>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import BattleLogs from './BattleLogs.vue';
import BattleFieldIndicators from './BattleFieldIndicators.vue';
import BattleFieldControls from './BattleFieldControls.vue';
import HeroImage from './HeroImage.vue';
import dota from '../../assets/dota2-bg.jpg';
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
  return `${player.name} uses ${skill.name} and regenerates ${Math.abs(
    regenerationPoints,
  )} points of ${regenerationType}.`;
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
    BattleFieldIndicators,
    BattleFieldControls,
    HeroImage,
  },
  props: {
    account: Object,
    dungeonId: String,
  },
  data() {
    return this.initBattleState();
  },
  created() {
    const accountId = this.$session.get('accountId');
    const characterId = this.$session.get('characterId');
    this.getCharacter(accountId);
    console.log(this.character);
    this.enterDungeon({ dungeonId: this.dungeonId, characterId });
  },
  computed: {
    ...mapState({
      character: (state) => state.character,
      enemy: (state) => state.enemy,
    }),
    getBackgroundImage() {
      return `background-image: url(${dota})`;
    },
  },
  methods: {
    ...mapActions(['getCharacter', 'enterDungeon']),
    handleSkillClicked(skill) {
      this.useSkill(this.character, this.enemy, skill);
      this.logAction(this.character, skill);
      this.initEnemyTurn();
    },
    handlePlayerLose(player) {
      this.winner = player === 'enemy' ? this.character.name : this.enemy.name;
      this.battleFinish = true;
    },
    initBattleState() {
      return {
        actionLogs: [],
        battleFinish: false,
        winner: '',
      };
    },
    getCharacterImage(classType) {
      const characterImage = characterImages.find(
        (charImage) => charImage.id === classType,
      );
      return characterImage ? characterImage.image : null;
    },
    setupCharacter(character) {
      character.skills.push(...defaultSkills);
    },
    useSkill(player, enemy, skill) {
      if (skill.target === 'enemy') {
        enemy.stats.health -= skill.damage;

        const currentMana = player.stats.mana - skill.cost;
        player.stats.mana = getValidMana(100, currentMana);
      } else if (skill.damage < 0) {
        // TODO get bonus intellignence
        player.stats.health += player.stats.int;
        const currentMana = player.stats.mana - skill.cost;
        player.stats.mana = getValidMana(100, currentMana);
      } else {
        // TODO get bonus intellignence
        const currentMana = player.stats.mana + (player.stats.int * 0.75);
        player.stats.mana = getValidMana(100, currentMana);
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
      const player = this.enemy;
      let skill = getRandomSkill(player.skills);
      console.log(skill);
      if (!this.manaSufficient(player, skill)) {
        skill = player.skills.find(
          (currentSkill) => currentSkill.name === 'Focus',
        );
      } else if (
        manaFull(player.maxMana, player.stats.mana)
        && skill.name === 'Focus'
      ) {
        this.initEnemyTurn();
      }
      this.useSkill(player, this.character, skill);
      this.logAction(player, skill);
    },
    manaSufficient(player, skill) {
      return player.stats.mana >= skill.cost;
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
