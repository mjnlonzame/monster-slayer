<template>
  <div class="available-skills-content gray-border">
    <div class="row">
      <div
        class="col-6"
        @click="onSkillClick(index)"
        v-for="(skill, index) in skills"
        :key="skill._id"
      >
        <div class="row">
          <div class="col-1">
            <AppIcon :iconName="getSkillIconName(skill.type)" />
          </div>
          <div class="col">{{ skill.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppIcon from '../shared/AppIcon.vue';
import characterMixin from '../shared/mixins/CharacterMixin.vue';

export default {
  name: 'CharacterSkillsAvailable',
  components: {
    AppIcon,
  },
  mixins: [characterMixin],
  props: {
    skills: Array,
  },
  methods: {
    onSkillClick(selectedSkillIndex) {
      this.$emit('skillSelected', selectedSkillIndex);
    },
  },
};
</script>

<style scoped>
.available-skills-content-content {
  min-height: 250px;
}
</style>
