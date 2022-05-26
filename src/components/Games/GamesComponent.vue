<template>
  <div id="app">
    <WheelComponent/>
    <NameChooser/>
  </div>
</template>

<script>
import WheelComponent from './Wheel/WheelComponent.vue'
import NameChooser from './NameChooser.vue'

export default {
  name: 'GamesComponent',
  components: {
    WheelComponent,
    NameChooser
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
</style>
