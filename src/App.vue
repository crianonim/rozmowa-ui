<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <Gra msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import Gra from './components/Gra.vue';

export default {
  name: 'app',
  components: {
    Gra
  }
}
</script>

<style>
#app {
  font-family: sans-serif;
}
</style>
