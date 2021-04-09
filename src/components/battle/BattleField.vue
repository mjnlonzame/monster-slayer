<template>
  <!-- v-if="!isChar1Loading && !isChar2Loading"  -->
  <div class="container-bg" v-if="character && enemy && dungeon" :style="getBackgroundImage">
    <div class="row">
      <div class="col">
        <div class="indicator-box">
          <BattleFieldIndicators
            :health="character.stats.health"
            :mana="character.stats.mana"
            :level="character.level"
            player="character"
            :playerName="character.name"
            @playerLose="player => handlePlayerLose(player)"
          />
        </div>
      </div>
      <div class="col">
        <div class="indicator-box">
          <BattleFieldIndicators
            :health="enemy.stats.health"
            :mana="enemy.stats.mana"
            :level="enemy.level"
            :playerName="enemy.name"
            player="enemy"
            @playerLose="player => handlePlayerLose(player)"
          />
        </div>
      </div>
    </div>
    <div class="row players-content">
      <div class="col">
        <div class="player-box">
          <HeroImage
            :imageName="getClassName(character.classType)"
            :isCharacter="true"
            extension="png"
          />
        </div>
      </div>
      <div class="col">
        <div class="player-box">
          <HeroImage :imageName="enemy.image" :isCharacter="false" extension="png" />
        </div>
      </div>
    </div>

    <div class="row controls-content">
      <div class="col">
        <BattleFieldControls
          :basicSkills="character.skills.filter(skill => skill.common)"
          :heroSkills="character.skills.filter(skill => !skill.common)"
          :availableMana="character.stats.mana"
          :battleFinish="battleFinish"
          @skillClicked="skill => handleSkillClicked(skill)"
        />
      </div>
      <div class="col">
        <BattleLogs :actionLogs="actionLogs" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import BattleLogs from './BattleLogs.vue';
import BattleFieldIndicators from './BattleFieldIndicators.vue';
import BattleFieldControls from './BattleFieldControls.vue';
import HeroImage from './HeroImage.vue';
import characterMixin from '../shared/mixins/CharacterMixin.vue';
import resetStoreMixin from '../shared/mixins/ResetStoreMixin.vue';

const dungeonImages = require.context('@/assets/dungeons/');

function getRandomSkill(skills) {
  const randomNumber = Math.floor(Math.random() * skills.length);
  return skills[randomNumber];
}

function getSkillDamageLog(skillSummary) {
  let text = `${skillSummary.skillUser} ${
    skillSummary.skillName === 'Attack'
      ? 'attacked!'
      : `used ${skillSummary.skillName}`
  }`;
  if (!skillSummary.damageDetails.hasLanded) {
    text += '! Missed!';
  } else {
    const critText = skillSummary.damageDetails.isCritical ? ' crit ' : '';
    text += ` and deals ${skillSummary.damageDetails.totalDamage.toFixed(
      0,
    )} points of ${critText}damage!`;
  }
  return text;
}
function getActionLog(player, skill, skillSummary) {
  if (skillSummary.damageDetails) {
    return getSkillDamageLog(skillSummary);
  }
  return `${skillSummary.skillUser} uses ${
    skillSummary.skillName
  } and regenerates ${Math.abs(
    skillSummary.regenAmount.toFixed(0),
  )} points of ${skillSummary.regenType}.`;
}

function getValidMana(maxMana, mana) {
  // eslint-disable-next-line no-nested-ternary
  return mana > maxMana ? maxMana : mana >= 0 ? mana : 0;
}

function getValidHealth(maxHealth, health) {
  // eslint-disable-next-line no-nested-ternary
  return health > maxHealth ? maxHealth : health >= 0 ? health : 0;
}

function manaFull(maxMana, mana) {
  return maxMana === mana;
}

function computeTotalStats(character) {
  if (!character.equipment) {
    return character.stats;
  }

  const characterStats = { ...character.stats };
  const armorStats = { ...character.equipment.armor.bonus };
  const weaponStats = { ...character.equipment.weapon.bonus };
  Object.entries(armorStats).forEach(([key, val]) => {
    characterStats[key] = (characterStats[key] || 0) + val;
  });
  Object.entries(weaponStats).forEach(([key, val]) => {
    characterStats[key] = (characterStats[key] || 0) + val;
  });
  return characterStats;
}

function getBaseDamage(stat, skill) {
  if (skill.name === 'Attack') {
    return stat;
  }
  return stat * (skill.damage / 100);
}

function isSuccess(successPercentage) {
  const randomNumber = Math.random(1, 100) * 100;
  return randomNumber <= successPercentage;
}

function isDamageCritical(luk) {
  const CRITICAL_MULTIPLIER = 5;
  const criticalPercentage = luk * CRITICAL_MULTIPLIER * 10;
  const critical = isSuccess(criticalPercentage);
  return critical;
}

function isDamageLanded(playerAgility, enemyAgility) {
  const agilityDifference = playerAgility - enemyAgility;
  console.log(`agility difference is ${agilityDifference}`);
  if (agilityDifference >= 0) {
    return true;
  }
  // const HIT_MULTIPLIER = 5;
  const hitPercentage = 100 - Math.abs(agilityDifference / 4);
  const hit = isSuccess(hitPercentage);
  return hit;
}

function getCriticalDamage(damage, luk) {
  const isCritical = isDamageCritical(luk);
  if (!isCritical) {
    return 0;
  }
  const critDamage = damage * luk;
  return critDamage;
}

function computeDamage(player, enemy, skill) {
  const damageDetails = {
    baseDamage: 0,
    critDamage: 0,
    reducedDamage: 0,
    totalDamage: 0,
    hasLanded: true,
    isCritical: false,
  };

  const playerTotalStats = computeTotalStats(player);
  const enemyTotalStats = computeTotalStats(enemy);
  if (!isDamageLanded(playerTotalStats.agi, enemyTotalStats.agi)) {
    damageDetails.hasLanded = false;
    return damageDetails;
  }

  if (skill.type === 'P') {
    damageDetails.baseDamage = getBaseDamage(playerTotalStats.off, skill);
  } else {
    damageDetails.baseDamage = getBaseDamage(playerTotalStats.int, skill);
  }
  damageDetails.totalDamage += damageDetails.baseDamage;

  // TODO: critical damage computation
  damageDetails.critDamage = getCriticalDamage(
    damageDetails.totalDamage,
    playerTotalStats.luk,
  );
  damageDetails.totalDamage += damageDetails.critDamage;

  if (damageDetails.critDamage <= 0) {
    damageDetails.reducedDamage = enemyTotalStats.def;
    damageDetails.totalDamage -= enemyTotalStats.def;
  } else {
    damageDetails.isCritical = true;
  }

  damageDetails.totalDamage = damageDetails.totalDamage > 0 ? damageDetails.totalDamage : 0;
  return damageDetails;
}

function useSkill(player, enemy, skill) {
  const skillSummary = {
    skillUser: player.name,
    skillType: skill.type,
    skillName: skill.name,
    regenType: null,
  };
  let currentMana = 0;
  if (skill.target === 'enemy') {
    skillSummary.damageDetails = computeDamage(player, enemy, skill);
    enemy.stats.health -= skillSummary.damageDetails.totalDamage;
    enemy.stats.health = getValidHealth(enemy.stats.maxHealth, enemy.stats.health);
    currentMana = player.stats.mana - skill.cost;
  } else if (skill.damage < 0) {
    skillSummary.regenType = 'health';
    skillSummary.regenAmount = player.stats.int;
    player.stats.health += player.stats.int;
    player.stats.health = getValidHealth(player.stats.maxHealth, player.stats.health);
    currentMana = player.stats.mana - skill.cost;
  } else {
    skillSummary.regenType = 'mana';
    skillSummary.regenAmount = player.stats.int * 0.75;
    currentMana = player.stats.mana + player.stats.int * 0.75;
  }
  player.stats.mana = getValidMana(player.stats.maxMana, currentMana);
  // getValidHealth
  console.log(`${player.name} skill summary:`);
  console.log(skillSummary);
  return skillSummary;
}

export default {
  name: 'BattleField',
  components: {
    BattleLogs,
    BattleFieldIndicators,
    BattleFieldControls,
    HeroImage,
  },
  mixins: [characterMixin, resetStoreMixin],
  props: {
    account: Object,
    dungeonId: String,
  },
  data() {
    return {
      actionLogs: [],
      battleFinish: false,
      winner: '',
    };
  },
  created() {
    const accountId = this.$session.get('accountId');
    const characterId = this.$session.get('characterId');
    this.getCharacter(accountId).then(() => {
      this.includeDefaultSkills();
    });
    this.enterDungeon({ dungeonId: this.dungeonId, characterId });
  },
  computed: {
    ...mapState({
      character: (state) => state.character,
      enemy: (state) => state.enemy,
      dungeon: (state) => state.dungeon,
    }),
    getBackgroundImage() {
      const dungeonImage = dungeonImages(`./${this.dungeon.image}.jpg`);
      return `background-image: url(${dungeonImage})`;
    },
  },
  methods: {
    ...mapActions(['getCharacter', 'enterDungeon', 'finishBattle']),
    ...mapMutations(['includeDefaultSkills']),
    handleSkillClicked(skill) {
      const skillSummary = useSkill(this.character, this.enemy, skill);
      this.logAction(this.character, skill, skillSummary);
      if (this.enemy.stats.health > 0) this.initEnemyTurn();
    },
    handlePlayerLose(loser) {
      this.battleFinish = true;
      console.log(`loser is ${loser}`);
      if (loser !== 'character') {
        const battleRequest = {
          characterId: this.character._id,
          dungeonId: this.dungeonId,
          enemyId: this.enemy._id,
        };

        this.finishBattle(battleRequest).then((response) => {
          console.log(response);
          alert(`Exp Gained: ${response.exp}\nItem Drop: ${response.drop}`);

          this.promptReEnterDungeon();
        });
      } else {
        setTimeout(() => {
          this.promptReEnterDungeon();
          console.log('PLAYER LOSE!!');
        }, 500);
      }
    },
    promptReEnterDungeon() {
      // eslint-disable-next-line no-restricted-globals
      if (confirm('Re-Enter Dungeon?')) {
        this.$router.go(this.$router.currentRoute);
      } else {
        this.$router.push({
          name: 'TheDungeon',
        });
      }
    },

    logAction(player, skill, skillSummary) {
      const actionLog = getActionLog(player, skill, skillSummary);
      this.actionLogs.push(actionLog);
    },
    playAgain() {
      Object.assign(this.$data, this.initBattleState());
    },
    initEnemyTurn() {
      const player = this.enemy;
      let skill = getRandomSkill(
        player.skills.filter((currentSkill) => this.manaSufficient(player, currentSkill)),
      );

      if (
        manaFull(player.stats.maxMana, player.stats.mana)
        && skill.name === 'Focus'
      ) {
        skill = getRandomSkill(
          player.skills.filter((currentSkill) => currentSkill.name !== 'Focus'),
        );
      }
      const skillSummary = useSkill(player, this.character, skill);
      this.logAction(player, skill, skillSummary);
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
/*
.player {
  text-align: center;
  font-size: 1rem;
  margin-top: 5px;
} */

.play-again-box {
  min-height: 288px;
  line-height: 288px;
  text-align: center;
}
</style>
