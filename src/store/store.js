import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  players: [],
}

const mutations = {
  ADD_PLAYERS (state, newValue) {
    const uniqId = Date.now();
    const player = {
      uniqId,
      name: newValue,
    }
    state.players.push(player);
  },
}

export default new Vuex.Store({
  state,
  mutations
})