<template>
  <div>
    <h1 class="text-center">Character Profile</h1>
    <div class="row" v-if="character">
      <div class="col-4">
        <div class="gray-border">
          <CharacterProfileInfo :character="character" />
        </div>
      </div>
      <div class="col-8">
        <div class="gray-border">
          <div class="row">
            <div class="col-2">
              <div>
                <img class="player-image img-fluid" :src="getImageSource" />
              </div>
            </div>
            <div class="col">
              <CharacterProfileStatus
                :stats="character.stats"
                :weaponBonusStats="weaponStats"
                :armorBonusStats="armorStats"
              />
            </div>
          </div>
          <div class="row mt-4">
            <div class="col">
              <h5>Equipment</h5>
              <div
                class="row"
                v-for="[key, value]
              in Object.entries(character.equipment)"
                :key="key"
              >
                <div class="col-2">{{ key }}</div>
                <div class="col">{{ value.name }}</div>
              </div>
            </div>
            <div class="col">
              <h5>Skills</h5>
              <div class="row" v-for="skill in character.skills" :key="skill._id">
                <div class="col-2">icon</div>
                <div class="col">{{ skill.name }}</div>
              </div>
            </div>
          </div>
          <div class="character-actions-content">
            <router-link
              :to="{ name: 'CharacterInventory' }"
              class="btn-router btn btn-secondary"
            >Inventory</router-link>
            <router-link
              :to="{ name: 'CharacterSkills' }"
              class="btn-router btn btn-secondary"
            >Skills</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import CharacterProfileInfo from './CharacterProfileInfo.vue';
import CharacterProfileStatus from './CharacterProfileStatus.vue';

const images = require.context('@/assets/characters');

export default {
  name: 'CharacterProfile',
  components: { CharacterProfileInfo, CharacterProfileStatus },
  created() {
    const accountId = this.$session.get('accountId');
    this.getCharacter(accountId).then((character) => {
      console.log(character);
      this.$session.set('characterId', character._id);
    });
  },
  computed: {
    ...mapState({
      character: (state) => state.character,
    }),
    weaponStats() {
      return this.character.equipment.weapon
        ? this.character.equipment.weapon.bonus
        : null;
    },
    armorStats() {
      return this.character.equipment.armor
        ? this.character.equipment.armor.bonus
        : null;
    },
    getImageSource() {
      const image = images(`./${this.classTypeName}.png`);
      return image;
    },
    classTypeName() {
      let classTypeName = '';
      if (this.character.classType === 1) {
        classTypeName = 'saber';
      } else if (this.character.classType === 2) {
        classTypeName = 'archer';
      } else if (this.character.classType === 3) {
        classTypeName = 'lancer';
      } else if (this.character.classType === 4) {
        classTypeName = 'berserker';
      } else if (this.character.classType === 5) {
        classTypeName = 'caster';
      }
      return classTypeName;
    },
  },
  methods: {
    ...mapActions(['getCharacter']),
  },
};
</script>

<style scoped>
.btn-router {
  margin-left: 15px;
  font-size: 1.5rem;
  padding: 10px 50px;
}

.character-actions-content {
  text-align: right;
}
</style>
