<template>
  <div>
    <h1>Skills</h1>
    <div class="row" v-if="currentSkills">
      <div class="col-9">
        <div class="available-skills-content gray-border">
          <div class="row">
            <div
              class="col-6"
              @click="onSkillClick(availableSkill, index)"
              v-for="(availableSkill, index) in availableSkills"
              :key="availableSkill._id"
            >{{ availableSkill.name }}</div>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="row">
          <div class="col">
            <CharacterSkillDetails :skill="selectedSkill" />
          </div>
        </div>
        <div class="row">
          <div class="col">
            <CharacterSkillsEquipped
              :skills="currentSkills"
              @skillRemoved="(selectedSkillId) => handleSkillRemoved(selectedSkillId)"
            />
          </div>
        </div>

        <div class>
          <button
            class="btn btn-secondary btn-block m-2"
            @click="onEquipClick"
            :disabled="!equippable"
          >Equip</button>
        </div>
        <div class>
          <button
            class="btn btn-secondary btn-block m-2"
            @click="onSaveClick"
            :disabled="!savable"
          >Save</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import CharacterSkillDetails from './CharacterSkillDetails.vue';
import CharacterSkillsEquipped from './CharacterSkillsEquipped.vue';

export default {
  name: 'CharacterSkills',
  components: {
    CharacterSkillDetails,
    CharacterSkillsEquipped,
  },
  created() {
    const characterId = this.$session.get('characterId');
    this.getAvailableSkills(characterId);
    const accountId = this.$session.get('accountId');
    this.getCharacter(accountId).then((character) => {
      this.currentSkills = [...character.skills];
    });
  },
  data() {
    return {
      // selectedSkill: null,
      selectedSkillIndex: -1,
      currentSkills: null,
    };
  },
  computed: {
    ...mapState({
      availableSkills: (state) => state.availableSkills,
      character: (state) => state.character,
    }),
    // ...mapGetters(['currentSkills']),
    selectedSkill() {
      return this.availableSkills[this.selectedSkillIndex];
    },
    skillSelectedExists() {
      return this.currentSkills.find(
        (skill) => skill._id === this.selectedSkill._id,
      );
    },
    equippable() {
      console.log(this.currentSkills.length);
      return (
        this.selectedSkill
        && this.currentSkills.length < 4
        && !this.skillSelectedExists
      );
    },
    hasOriginalSkills() {
      return true;
    },
    savable() {
      console.log(this.currentSkills);
      console.log(this.character.skills);
      const oldSkillIds = this.character.skills.map((skill) => skill._id);
      const currentSkillIds = this.currentSkills.map((skill) => skill._id);
      return (
        oldSkillIds.length !== currentSkillIds.length
        || !oldSkillIds.every((oldSkillId) => currentSkillIds.includes(oldSkillId))
      );
    },
  },

  methods: {
    ...mapActions(['getAvailableSkills', 'getCharacter', 'updateSkills']),

    onSkillClick(skill, index) {
      this.selectedSkillIndex = index;
    },
    handleSkillRemoved(selectedSkillId) {
      console.log(`removing skills: ${selectedSkillId}`);
      this.currentSkills = this.currentSkills.filter(
        (skill) => skill._id !== selectedSkillId,
      );
    },
    onEquipClick() {
      this.currentSkills.push(this.selectedSkill);
    },
    onSaveClick() {
      this.updateSkills([...this.currentSkills]);
    },
  },
};
</script>

<style scoped>
.selected-skill-content {
  min-height: 250px;
  /* background-color: blue; */
}

.current-skills-content {
  min-height: 250px;
  /* background-color: darkblue; */
}
</style>
