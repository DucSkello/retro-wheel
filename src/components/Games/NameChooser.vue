<template>
  <section>
    <div>
      <input v-model="name">
      <button @click.prevent="handleSave()">
        save name
      </button>
    </div>
    <div>
      <!-- <tr v-for="(player, i) in players" :key="i">
        <td>
          {{ player }}
        </td>
      </tr> -->
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
