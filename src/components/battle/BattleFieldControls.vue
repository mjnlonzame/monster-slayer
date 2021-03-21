<template>
  <div class="controls-box border border-dark">
    <div class="row">
      <div class="col text">
        <div class="skills" v-for="(skill,index) in basicSkills" :key="index">
          <button
            type="button"
            class="btn-control btn btn-secondary btn-lg"
            @click="handleClickSkill(skill)"
            :disabled="battleFinish"
          >{{skill.name}}</button>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <button
          type="button"
          class="btn-control btn btn-secondary btn-lg"
          v-for="(skill,index) in heroSkills"
          :key="index"
          @click="handleClickSkill(skill)"
          :disabled="!sufficientMana(skill) || battleFinish"
        >{{skill.name}}</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BattleFieldControls',
  props: {
    basicSkills: Array,
    heroSkills: Array,
    availableMana: Number,
    battleFinish: Boolean,
  },
  methods: {
    handleClickSkill(skill) {
      this.$emit('skillClicked', skill);
    },
    sufficientMana(skill) {
      return this.availableMana >= skill.cost;
    },
  },
};
</script>

<style scoped>
.btn-control {
  width: fit-content;
  margin: 10px 10px;
  padding: 10px 10px;
  text-align: center;
}

.controls-box {
  margin-bottom: 10px;
  min-height: 290px;
  padding: 20px;
  text-align: center;
}

.skills {
  display: inline-block;
}
</style>
