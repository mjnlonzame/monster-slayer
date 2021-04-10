<template>
  <div>
    <h4 class="font-weight-bold text-center">{{character.name}}</h4>

    <div class="row">
      <div class="col font-weight-bold">Level</div>
      <div class="col">{{character.level}}</div>
    </div>
    <div class="row">
      <div class="col font-weight-bold">Class</div>
      <div class="col">{{getClassName(character.classType)}}</div>
    </div>
    <div class="row">
      <div class="col font-weight-bold">Total Exp</div>
      <div class="col">{{character.totalExp}}</div>
    </div>
    <div class="row">
      <div class="col font-weight-bold">Next Level</div>
      <div class="col">{{character.nextLevelExp}}</div>
    </div>
    <div class="row">
      <div class="col font-weight-bold">Char Id</div>
      <div class="col">{{character._id}}</div>
    </div>
    <div class="font-weight-bold">Dungeon Access</div>
    <div class="row">
      <div
        class="col-12 offset-1"
        v-for="dungeon in character.dungeonAccess"
        :key="dungeon._id"
      >{{dungeon.name}}</div>
    </div>
  </div>
</template>

<script>
import characterMixin from '../shared/mixins/CharacterMixin.vue';

export default {
  name: 'CharacterProfileInfo',
  mixins: [characterMixin],
  props: {
    character: Object,
  },
};
</script>

<style  scoped>
.dungeon-name {
  /* text-align :center; */
}
</style>
