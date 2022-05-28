<template>
  <div>
    <NavbarComponent/>

    <div id="app">
      <GamesComponent/>
    </div>
  </div>
</template>

<script>
import GamesComponent from './components/Games/GamesComponent';
import NavbarComponent from './components/NavbarComponent.vue';
export default {
  name: 'App',
  components: {
    GamesComponent,
    NavbarComponent
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
}
</style>
