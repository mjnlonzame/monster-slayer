<template>
  <div>
    <h1 class="text-center">Character Profile</h1>
    <div class="row">
      <div class="col-4">
          <CharacterProfileInfo :character="character"/>
      </div>
      <div class="col-8">Character Status</div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import CharacterProfileInfo from './CharacterProfileInfo.vue';

export default {
  name: 'CharacterProfile',
  components: { CharacterProfileInfo },
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
  },
  methods: {
    ...mapActions(['getCharacter']),
  },

};
</script>
