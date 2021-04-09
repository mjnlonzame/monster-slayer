<template>
  <div class="inventory-items-content gray-border">
    <div class="row">
      <div
        class="col-6"
        @click="onItemClick( index)"
        v-for="(inventory, index) in inventories"
        :key="inventory._id"
      >
        <div class="item-content">
          <div class="row">
            <div class="col-2">
              <AppIcon :iconName="getItemIconName(inventory.item.classId, inventory.item.type)" />
            </div>
            <div class="col">{{ inventory.item.name }}</div>
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
  name: 'CharacterInventoryItems',
  components: {
    AppIcon,
  },
  mixins: [characterMixin],
  props: {
    inventories: Array,
  },
  methods: {
    onItemClick(selectedItemIndex) {
      this.$emit('itemSelected', selectedItemIndex);
    },
  },
};
</script>

<style scoped>
.inventory-items-content {
  height: 600px;
  overflow-y: scroll;
  overflow-x: hidden;
}

.item-content {
  /* padding: 5px; */
  margin-top: 3px !important;
  border: 1px solid transparent;
}
</style>
