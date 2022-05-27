<template>
  <div id="app">
    <div class="container">
      <WheelComponent
        :selected-players="selectedPlayers"
      />
      <NameChooser/>
    </div>
  </div>
</template>

<script>
import WheelComponent from './Wheel/WheelComponent.vue'
import NameChooser from './NameChooser.vue'
import { mapState } from 'vuex'

const defaultColors = [
  {
    textFillStyle: '#fff',
    fillStyle: '#000',
  },
  {
    textFillStyle: '#fff',
    fillStyle: '#c4376f',
  },
  {
    textFillStyle: '#000',
    fillStyle: '#fff',
  },
]

export default {
  name: 'GamesComponent',
  data() {
    return {
      selectedPlayers: [],
    }
  },
  components: {
    WheelComponent,
    NameChooser
  },
  mounted() {
    this.initPlayers();
  },
  computed: {
    ...mapState(['players'])
  },
  methods: {
    // shitiest function ever
    formatColors(index) {
      let desiredIndex = 0;
      for (let i = 3; i >= 1; i--) {
        if (index % i === 0) {
          desiredIndex = i - 1;
          break
        }
      }
      return defaultColors[desiredIndex];
    },
    initPlayers() {
      console.log(this.players);
      this.selectedPlayers = this.players.map((player, i) => {
        console.log(player);
        return {
          ...this.formatColors(i),
          text: player.name,
          uniqId: player.uniqId,
        }
      });
    },
  },
  watch: {
    players(value) {
      const playersUniqId = this.selectedPlayers.map(player => player.uniqId);
      const playersToAdd = value.filter(player => !playersUniqId.includes(player.uniqId))
      playersToAdd.forEach((player) => {
        const i = this.selectedPlayers.length + 1;
        this.selectedPlayers.push({
          ...this.formatColors(i),
          text: player.name,
          uniqId: player.uniqId,
        })
      })
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.container {
  display: flex;
  justify-content: center;
}
</style>
