<template>
  <div>
    <div class="row" v-if="currentSkills">
      <div class="col-9">
        <CharacterSkillsAvailable
          :skills="availableSkills"
          @skillSelected="(selectedSkillId) => handleSkillSelected(selectedSkillId)"
        />
      </div>
      <div class="col">
        <div class="row">
          <div class="col mb-1">
            <CharacterSkillDetails :skill="selectedSkill" />
          </div>
        </div>
        <div class="row">
          <div class="col mb-1">
            <CharacterSkillsEquipped
              :skills="currentSkills"
              @skillRemoved="(selectedSkillId) => handleSkillRemoved(selectedSkillId)"
            />
          </div>
        </div>

        <div>
          <div class="row justify-content-center align-items-center">
            <div class="col-1">
              <HoverMessage :message="warningMessage">
                <AppIcon iconName="warning" />
              </HoverMessage>
            </div>
            <div class="col">
              <div>
                <button
                  class="btn btn-dark btn-block m-2"
                  @click="onEquipClick"
                  :disabled="!equippable"
                >Equip</button>
              </div>
              <div>
                <button
                  class="btn btn-dark btn-block m-2"
                  @click="onSaveClick"
                  :disabled="!savable"
                >Save</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import CharacterSkillDetails from './CharacterSkillDetails.vue';
import CharacterSkillsEquipped from './CharacterSkillsEquipped.vue';
import HoverMessage from '../shared/HoverMessage.vue';
import CharacterSkillsAvailable from './CharacterSkillsAvailable.vue';
import resetStoreMixin from '../shared/mixins/ResetStoreMixin.vue';
import AppIcon from '../shared/AppIcon.vue';

export default {
  name: 'CharacterSkills',
  components: {
    CharacterSkillDetails,
    CharacterSkillsEquipped,
    CharacterSkillsAvailable,
    HoverMessage,
    AppIcon,
  },
  mixins: [resetStoreMixin],
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
      selectedSkillIndex: -1,
      currentSkills: null,
    };
  },
  computed: {
    ...mapState({
      availableSkills: (state) => state.availableSkills,
      character: (state) => state.character,
    }),
    warningMessage() {
      if (this.currentSkills.length === 4) {
        return 'Cannot equip any more skills';
      }
      if (this.selectedSkill && this.skillSelectedExists) {
        return 'Selected skill is already equipped';
      }
      return null;
    },
    selectedSkill() {
      return this.availableSkills[this.selectedSkillIndex];
    },
    skillSelectedExists() {
      return this.currentSkills.find(
        (skill) => skill._id === this.selectedSkill._id,
      );
    },
    equippable() {
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

    handleSkillSelected(selectedSkillId) {
      this.selectedSkillIndex = selectedSkillId;
    },
    handleSkillRemoved(selectedSkillId) {
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
}

.current-skills-content {
  min-height: 250px;
}
</style>
