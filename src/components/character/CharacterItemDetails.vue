<template>
  <div class="item-details-content gray-border">
    <div class="item-header" v-if="currentEquipement">Current Equipment</div>
    <div class="item-header" v-if="!currentEquipement">
      Selected Item
      <span class="delete-item" @click="onDeleteClick" v-if="deletable">(Delete)</span>
    </div>
    <div class="item-details" v-if="item">
      <div class="item-name">
        <AppIcon :iconName="getItemIconName(item.classId, item.type)" />
        {{ item.name }}
      </div>
      <div class="row">
        <div
          class="col-6"
          v-for="([key, value], index) of Object.entries(item.bonus).filter(
            ([key, value]) => key !== 'maxHealth' && key !== 'maxMana'
          )"
          :key="index"
        >
          <div class="row">
            <div class="col">{{ key }}</div>
            <div class="col-4">{{ value }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppIcon from '../shared/AppIcon.vue';
import characterMixin from '../shared/mixins/CharacterMixin.vue';

export default {
  name: 'CharacterItemDetails',
  components: {
    AppIcon,
  },
  mixins: [characterMixin],
  props: {
    item: Object,
    deletable: Boolean,
    currentEquipement: Boolean,
  },
  methods: {
    onDeleteClick() {
      this.$emit('deleteClicked');
    },
  },
};
</script>

<style scoped>
.item-details-content {
  min-height: 250px;
  /* padding: 15px; */
}

.item-header {
  margin-bottom: 5px;
  text-align: center;
}

.item-name {
  text-align: center;
}
</style>
