<template>
  <div>
    <div class="row" v-if="character && inventories.length > 0">
      <div class="col-9">
        <CharacterInventoryItems
          :inventories="inventories"
          @itemSelected="(selectedItemIndex) => handleItemSelected(selectedItemIndex)"
        />
      </div>
      <div class="col">
        <div class="row">
          <div class="col mb-1">
            <CharacterItemDetails
              :item="selectedItem"
              :deletable="deletable"
              :currentEquipement="false"
              @deleteClicked="handleDeleteClick"
            />
          </div>
        </div>
        <div class="row">
          <div class="col mb-1">
            <CharacterItemDetails :item="equippedItem" :currentEquipement="true" />
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
import { mapState, mapActions, mapMutations } from 'vuex';
import CharacterItemDetails from './CharacterItemDetails.vue';
import CharacterInventoryItems from './CharacterInventoryItems.vue';
import resetStoreMixin from '../shared/mixins/ResetStoreMixin.vue';
import HoverMessage from '../shared/HoverMessage.vue';
import AppIcon from '../shared/AppIcon.vue';

export default {
  name: 'CharacterInventory',
  components: {
    CharacterItemDetails,
    CharacterInventoryItems,
    HoverMessage,
    AppIcon,
  },
  mixins: [resetStoreMixin],
  created() {
    const characterId = this.$session.get('characterId');
    this.getInventory(characterId);
    const accountId = this.$session.get('accountId');
    this.getCharacter(accountId).then((character) => {
      this.equipment = { ...character.equipment };
    });
  },
  data() {
    return {
      equipment: null,
      isSaveable: false,
      selectedItemIndex: -1,
    };
  },
  computed: {
    ...mapState({
      inventories: (state) => state.inventory,
      character: (state) => state.character,
    }),
    warningMessage() {
      if (!this.selectedItem) {
        return 'Select an item to equip';
      } if (!this.equippable) {
        return 'Item not suitable to class';
      }
        return null;
    },
    selectedItem() {
      return (
        this.inventories[this.selectedItemIndex]
        && this.inventories[this.selectedItemIndex].item
      );
    },
    equippedItem() {
      return (
        this.selectedItem
        && this.equipment[this.selectedItem.type === 'WPN' ? 'weapon' : 'armor']
      );
    },

    equippable() {
      return (
        this.selectedItem
        && this.selectedItem.classId === this.character.classType
      );
    },
    savable() {
      return (
        this.equipment
        && (this.equipment.weapon._id !== this.character.equipment.weapon._id
          || this.equipment.armor._id !== this.character.equipment.armor._id)
      );
    },
    equippedItemDuplicates() {
      return this.inventories.filter(
        (inventory) => inventory.item._id === this.equippedItem._id,
      );
    },
    deletable() {
      return (
        this.selectedItem
        && (this.selectedItem._id !== this.equippedItem._id
          || (this.selectedItem._id === this.equippedItem._id
            && this.equippedItemDuplicates.length > 1))
      );
    },
  },
  methods: {
    ...mapActions([
      'getInventory',
      'getCharacter',
      'updateEquipment',
      'deleteItem',
    ]),
    ...mapMutations([
      'updateEquippedWeapon',
      'updateEquippedArmor',
      'updateCurrentEquipment',
      'updateInventory',
    ]),
    handleItemSelected(selectedIndex) {
      this.selectedItemIndex = selectedIndex;
    },
    onEquipClick() {
      this.equipment[
        this.selectedItem.type === 'WPN' ? 'weapon' : 'armor'
      ] = this.selectedItem;
      console.log(this.equipment);
      console.log(this.character.equipment);
    },
    onSaveClick() {
      this.updateEquipment({
        ...this.equipment,
      });
    },
    handleDeleteClick() {
      console.log(
        `deleting ${JSON.stringify(this.inventories[this.selectedItemIndex])}`,
      );
      console.log(`inventories size ${this.inventories.length}`);
      this.deleteItem(this.inventories[this.selectedItemIndex]._id);
      this.selectedItemIndex = -1;
    },
  },
};
</script>

<style scoped>
</style>
