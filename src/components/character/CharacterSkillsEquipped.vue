<template>
  <div class="current-skills-content gray-border">
    <div class="current-skills-header">Current Skills</div>
    <div v-for=" (skill, index) in skills" :key="index">
      <div class="row">
        <div class="col-1">
          <AppIcon :iconName="getSkillIconName(skill.type)" />
        </div>
        <div class="col">{{skill.name}}</div>
        <div class="col-2" @click="onRemoveClick(skill._id)" v-if="removable">&#10006;</div>
      </div>
    </div>
  </div>
</template>

<script>
import AppIcon from '../shared/AppIcon.vue';
import characterMixin from '../shared/mixins/CharacterMixin.vue';

export default {
  name: 'CharacterSkillsEquipped',
  components: {
    AppIcon,
  },
  mixins: [characterMixin],
  props: {
    skills: Array,
  },
  computed: {
    // currentSkills() {
    //   return this.skills;
    // },
    removable() {
      return this.skills.length > 1;
    },
  },
  methods: {
    onRemoveClick(selectedSkillId) {
      console.log(this.skills);
      this.$emit('skillRemoved', selectedSkillId);
      //   this.skills = this.skills.filter(
      //     (skill) => skill._id !== selectedSkill._id,
      //   );
    },
  },
};
</script>

<style scoped>
.current-skills-content {
  min-height: 250px;
  /* padding: 15px; */
}

.current-skills-header {
  margin-bottom: 5px;
  text-align: center;
}

.current-skill-name {
  text-align: center;
}
</style>
