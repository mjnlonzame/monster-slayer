<template>
  <div class="skill-details-content gray-border">
    <div class="skill-header">
      Skill Details
    </div>

    <div class="skill-details" v-if="skill">
      <div class="skill-name">{{ skill.name }}</div>
      <div class="row">
        <div class="col-4">LEVEL</div>
        <div class="col">{{ skill.lvlReq }}</div>
      </div>
      <div class="row">
        <div class="col-4">TARGET</div>
        <div class="col">{{ skill.target }}</div>
      </div>
      <div class="row">
        <div class="col-4">TYPE</div>
        <div class="col">{{ skillType }}</div>
      </div>
      <div class="row">
        <div class="col-4">COST</div>
        <div class="col">{{ skill.cost }} mana</div>
      </div>
      <div class="row">
        <div class="col-4">{{ skill.target === "self" ? "HEAL" : "DAMAGE" }}</div>
        <div class="col">
          {{ skill.target === "self" ? "100% Intelligence" : `${skill.damage}% ${skillType}` }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'CharacterSkillDetails',
  components: {
  },
  props: {
    skill: Object,
  },
  computed: {
    skillType() {
      return this.skill.type === 'M' ? 'Magical' : 'Physical';
    },
  },
};
</script>

<style scoped>
.skill-details-content {
  min-height: 250px;
  /* padding: 15px; */
}

.skill-header {
  margin-bottom: 5px;
  text-align: center;
}

.skill-name {
  text-align: center;
}
</style>
