<template>
  <div class="content">
    <h5 class="text-center">Character Stats</h5>
    <div
      class="row"
      v-for="([key, value], index) of Object.entries(stats).filter(
        ([key, value]) => key !== 'maxHealth' && key !== 'maxMana'
      )"
      :key="index"
    >
      <div class="col">{{ key }}</div>
      <div class="col-3">{{ value }}</div>
      <div class="col-3">{{ bonusStats[key] }}</div>
      <div class="col-3">{{ bonusStats[key] + value }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CharacterProfileStatus',
  props: {
    stats: Object,
    armorBonusStats: Object,
    weaponBonusStats: Object,
  },
  computed: {
    bonusStats() {
      console.log(this.armorBonusStats, this.weapon);
      const bonusStats = { ...this.armorBonusStats };
      const weaponStats = { ...this.weaponBonusStats };
      Object.entries(weaponStats).forEach(([key, val]) => {
        bonusStats[key] = (bonusStats[key] || 0) + val;
      });
      return bonusStats;
    },
  },
};
</script>

<style scoped>
.content {
  min-height: 200px;
}
</style>
