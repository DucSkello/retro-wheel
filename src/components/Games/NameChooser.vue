<template>
  <section>
    <div class="w-full max-w-xs">
      <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
            Enregistrer un joueur 
          </label>
          <div class="flex flex-row">
            <div class="basis-1/2">
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                id="username" 
                type="text" 
                placeholder="Nom du joueur"
                v-model="playersName"
              >
            </div>
            <div class="basis-1/2">
              <button
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
                :disabled="playersName === ''"
                @click.prevent="handleSave()"
              >
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
    <div class="w-full max-w-xs ">
      <div class="bg-white shadow-md max-h-80 rounded px-8 pt-6 pb-8 mb-4 overflow-auto">
        <div class="flex flex-row justify-between">
          <div>Name</div>
          <div>Afficher</div>
          <div>Supprimer</div>
        </div>
        <div v-for="player in players" :key="player.uniqId" class="mb-4 pt-4 flex flex-col">
          <div class="flex flex-row justify-between items-start">
            <div>{{ player.name }}</div>
            <div>
              <input 
                class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                type="checkbox" 
                v-model="player.displayed"
                @click="handleDisplayedAttribute(player, !player.displayed)"
              >
            </div>
            <div>
              <button
                class="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                @click.prevent="deletePlayer(player)"
              >
                x
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>


<script>

import { mapState, mapMutations } from 'vuex';

export default {
  name: 'NameChooser',
  data () {
    return {
      playersName: '',
    }
  },
  methods: {
    ...mapMutations([
      'ADD_PLAYERS',
      'UPDATE_PLAYER',
      'DELETE_PLAYER'],
    ),
    handleSave() {
      const options = {
        name: this.playersName,
        displayed: true,
      }
      this.ADD_PLAYERS(options);
      this.playersName = '';
    },
    handleDisplayedAttribute(player, value) {
      player.displayed = value;
      this.UPDATE_PLAYER(player);
    },
    deletePlayer(player) {
      console.log("salut");
      this.DELETE_PLAYER(player);
    },
  },
  computed: {
    ...mapState(['players'])
  },
  watch: {

  }
}

</script>

<style scoped>
</style>
