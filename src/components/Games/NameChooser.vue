<template>
  <section>
      <!-- <div>
        <input v-model="name">
      </div> -->
      <div class="w-full max-w-xs">
        <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
              Enregistrer un blaze 
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
              id="username" 
              type="text" 
              placeholder="Username"
              v-model="name"
            >
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              @click.prevent="handleSave()"
            >
              save name
            </button>
          </div>
        </form>
      </div>
      <div>
    </div>
  </section>
</template>


<script>

import { mapState, mapMutations } from 'vuex';

export default {
  name: 'NameChooser',
  data () {
    return {
      name: '',
    }
  },
  methods: {
    ...mapMutations(['ADD_PLAYERS']),
    handleSave() {
      this.ADD_PLAYERS(this.name);
      this.name = '';
    },
  },
  computed: {
    ...mapState(['players'])

  },
  updated () {

  },
  mounted () {
    console.log(this.players);
  },
  created () {

  }
}

</script>

<style scoped>
</style>
