import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

const defaultSkills = [{
    name: 'Attack',
    type: 'P',
    damage: 50,
    cost: 0,
    target: 'enemy',
    common: true,
  },
  {
    name: 'Focus',
    type: 'M',
    damage: null,
    cost: -20,
    target: 'self',
    common: true,
  },
];

export const getDefaultState = () => ({
  account: null,
  character: null,
  dungeons: [],
  enemy: null,
  dungeon: null,
  inventory: [],
  availableSkills: [],
});
// const state = getDefaultState()

Vue.use(Vuex);
export default new Vuex.Store({
  state: getDefaultState(),

  mutations: {
    resetState(state) {
      Object.assign(state, getDefaultState());
    },
    updateCurrentAccount(state, account) {
      state.account = account;
    },
    updateCharacter(state, character) {
      // character.skills.unshift(...defaultSkills);
      character.stats.maxMana = character.stats.mana;
      character.stats.maxHealth = character.stats.health;
      state.character = character;
    },
    includeDefaultSkills(state) {
      state.character.skills.unshift(...defaultSkills);
    },
    updateCurrentEquipment(state, equipment) {
      console.log('about to mutate char equipment');
      console.log(equipment);
      state.character.equipment = equipment;
    },
    updateCurrentSkills(state, skills) {
      state.character.skills = skills;
    },

    updateEquippedWeapon(state, equippedWeapon) {
      state.character.equipment.weapon = equippedWeapon;
    },
    updateEquippedArmor(state, equippedArmor) {
      state.character.equipment.armor = equippedArmor;
    },
    updateDungeons(state, dungeons) {
      state.dungeons = dungeons;
    },
    updateCurrentDungeon(state, enterDungeonResponse) {
      state.enemy = enterDungeonResponse.enemy;
      state.enemy.skills.unshift(...defaultSkills);
      state.enemy.stats.maxMana = state.enemy.stats.mana;
      state.enemy.stats.maxHealth = state.enemy.stats.health;
      state.dungeon = enterDungeonResponse.dungeon;
    },
    updateInventory(state, inventory) {
      state.inventory = inventory;
    },
    updateAvailableSkills(state, availableSkills) {
      state.availableSkills = availableSkills;
    },
  },
  getters: {
    currentSkills(state) {
      console.log(state.character);
      return state.character.skills;
    },

  },
  actions: {
    login({
      commit,
    }, loginDetails) {
      console.log(loginDetails);
      return axios.post('/api/accounts/login', loginDetails).then((response) => {
        commit('updateCurrentAccount', response.data);
        // dispatch('getCharacter');
        return response.data;
      }).catch(console.error);
    },
    getCharacter({
      commit,
    }, accountId) {
      return axios
        .get(`/api/accounts/${accountId}/character`)
        .then((response) => {
          commit('updateCharacter', response.data);
          return response.data;
        });
    },
    getInventory({
      commit,
    }, characterId) {
      axios
        .get(`/api/character/${characterId}/inventory`)
        .then((response) => {
          commit('updateInventory', response.data);
        });
    },
    deleteItem({
      state,
      commit,
    }, inventoryId) {
      const characterId = state.character._id;
      axios
        .delete(`/api/character/${characterId}/inventory/${inventoryId}`).then(() => {
          const inventoriesCopy = [...state.inventory];
          // console.log(inventoriesCopy[this.selectedItemIndex]);
          const newInventories = inventoriesCopy.filter(
            (inventory) => inventory._id !== inventoryId,
          );
          console.log(newInventories);
          console.log(`inventories size ${newInventories.length}`);
          commit('updateInventory', newInventories);
        });
    },
    updateEquipment({
      state,
      commit,
    }, equipment) {
      const equipmentIds = {
        weaponId: equipment.weapon._id,
        armorId: equipment.armor._id,
      };
      const characterId = state.character._id;
      return axios
        .put(`/api/character/${characterId}/equipment`, equipmentIds).then(() => {
          commit('updateCurrentEquipment', equipment);
        });
    },
    updateSkills({
      commit,
      state,
    }, skills) {
      const skillIds = skills.map((skill) => skill._id);
      const characterId = state.character._id;
      return axios
        .put(`/api/character/${characterId}/skills`, skillIds).then(() => {
          commit('updateCurrentSkills', skills);
        });
    },
    getDungeons({
      commit,
    }, characterId) {
      return axios
        .get(`/api/character/${characterId}/dungeons`)
        .then((response) => {
          commit('updateDungeons', response.data);
          return response.data;
        });
    },
    enterDungeon({
      commit,
    }, enterDungeonRequest) {
      axios
        .post('/api/dungeons/enter', enterDungeonRequest)
        .then((response) => {
          commit('updateCurrentDungeon', response.data);
        });
    },
    getAvailableSkills({
      commit,
    }, characterId) {
      axios
        .get(`/api/character/${characterId}/skills`)
        .then((response) => {
          commit('updateAvailableSkills', response.data);
        });
    },
    // eslint-disable-next-line no-empty-pattern
    finishBattle({}, battleRequest) {
      // TODO: remove here if mutation is not really needed
      return axios
        .post('/api/dungeons/battle', battleRequest)
        .then((response) => response.data);
    },
  },
});
