import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  players: [],
}

const mutations = {
  ADD_PLAYERS (state, newValue) {
    state.players.push(newValue);
  },
}

export default new Vuex.Store({
  state,
  mutations
})