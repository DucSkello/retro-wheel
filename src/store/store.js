import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  players: [],
}

const mutations = {
  ADD_PLAYERS (state, value) {
    const uniqId = Date.now();
    const player = {
      uniqId,
      name: value.name,
      displayed: value.displayed,
    }
    state.players.push(player);
  },

  UPDATE_PLAYER (state, player) {
    const playerIndex = state.players
      .findIndex(statePlayer => statePlayer.uniqId === player.uniqId)
    state.players.splice(playerIndex, 1, player)
  },

  DELETE_PLAYER (state, player) {
    const playerIndex = state.players
      .findIndex(statePlayer => statePlayer.uniqId === player.uniqId)
    state.players.splice(playerIndex, 1);
  }
}

export default new Vuex.Store({
  state,
  mutations
})
