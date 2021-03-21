<template>
  <div>
    <h4 class="text-center"> {{character.name}}</h4>

    <div class="row">
      <div class="col">Level</div>
      <div class="col">{{character.level}}</div>
    </div>
    <div class="row">
      <div class="col">Class</div>
      <div class="col">{{character.classType}}</div>
    </div>
    <div class="row">
      <div class="col">Total Exp</div>
      <div class="col">{{character.totalExp}}</div>
    </div>
    <div class="row">
      <div class="col">Next Level</div>
      <div class="col">{{character.nextLevelExp}}</div>
    </div>
    <div class="row">
      <div class="col">Char Id</div>
      <div class="col">{{character._id}}</div>
    </div>Dungeon Access
  </div>
</template>

<script>
export default {
  name: 'CharacterProfileInfo',
  props: {
    character: Object,
  },
};
</script>
