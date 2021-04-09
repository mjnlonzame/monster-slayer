<template>
  <div>
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
              <CharacterProfileStats
                :stats="character.stats"
                :weaponBonusStats="weaponStats"
                :armorBonusStats="armorStats"
              />
            </div>
          </div>
          <div class="row mt-4">
            <div class="col">
              <h5 class="font-weight-bold">Equipment</h5>
              <div
                class="row"
                v-for="[key, value]
              in Object.entries(character.equipment)"
                :key="key"
              >
                <div class="col-3">{{ key }}</div>
                <div class="col-1">
                  <AppIcon :iconName="getItemIconName(character.classType,value.type)" />
                </div>
                <div class="col">{{ value.name }}</div>
              </div>
            </div>
            <div class="col">
              <h5 class="font-weight-bold">Skills</h5>
              <div class="row" v-for="skill in character.skills" :key="skill._id">
                <div class="col-2">
                  <AppIcon :iconName="getSkillIconName(skill.type)" />
                </div>
                <div class="col">{{ skill.name }}</div>
              </div>
            </div>
          </div>
          <div class="character-actions-content">
            <router-link
              :to="{ name: 'CharacterInventory' }"
              class="btn-router btn btn-dark"
            >Inventory</router-link>
            <router-link
              :to="{ name: 'CharacterSkills' }"
              class="btn-router btn btn-dark"
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
import CharacterProfileStats from './CharacterProfileStats.vue';
import AppIcon from '../shared/AppIcon.vue';
import characterMixin from '../shared/mixins/CharacterMixin.vue';
import resetStoreMixin from '../shared/mixins/ResetStoreMixin.vue';

const images = require.context('@/assets/characters');

export default {
  name: 'CharacterProfile',
  components: {
    CharacterProfileInfo,
    CharacterProfileStats,
    AppIcon,
  },
  mixins: [characterMixin, resetStoreMixin],
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
      const image = images(`./${this.getClassName(this.character.classType)}.png`);
      return image;
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
  margin-top:10px;
  text-align: right;
}
</style>
