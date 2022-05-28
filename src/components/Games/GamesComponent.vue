<template>
  <div id="app">
    <div class="flex flow-row justify-around">
      <div class="place-items-center px-8 pb-8 mb-4">
        <WheelComponent/>
      </div>

      <div class="place-items-center">
        <NameChooser/>
      </div>
    </div>
  </div>
</template>

<script>
import WheelComponent from './Wheel/WheelComponent.vue'
import NameChooser from './NameChooser.vue'

export default {
  name: 'GamesComponent',
  data() {
    return {

    }
  },
  components: {
    WheelComponent,
    NameChooser
  },
  mounted() {

  },
  computed: {

  },
  methods: {

  },
  watch: {

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
