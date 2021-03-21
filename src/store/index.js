import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    account: null,
    character: null,
    dungeons: [],
    enemy: null,
    dungeon: null,
  },
  mutations: {
    updateCurrentAccount(state, account) {
      state.account = account;
    },
    updateCharacter(state, character) {
      state.character = character;
    },
    updateDungeons(state, dungeons) {
      state.dungeons = dungeons;
    },
    updateCurrentDungeon(state, enterDungeonResponse) {
      state.enemy = enterDungeonResponse.enemy;
      state.dungeon = enterDungeonResponse.dungeon;
    },
  },
  getters: {
    getCharacters() {

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
    getCharacter({ commit }, accountId) {
      return axios
        .get(`/api/accounts/${accountId}/character`)
        .then((response) => {
          commit('updateCharacter', response.data);
          return response.data;
        });
    },

    getDungeons({ commit }, characterId) {
      return axios
        .get(`/api/character/${characterId}/dungeons`)
        .then((response) => {
          console.log(response.data);
          commit('updateDungeons', response.data);
          return response.data;
        });
    },
    enterDungeon({ commit }, enterDungeonRequest) {
      axios
        .post('/api/dungeons/enter', enterDungeonRequest)
        .then((response) => {
          console.log(response.data);
          commit('updateCurrentDungeon', response.data);
        });
    },
  },
});
