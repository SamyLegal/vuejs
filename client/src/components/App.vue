<template>
  <div id="app">
    <h1>{{msg}}</h1>

    <router-link to="/date-picker">Date-picker</router-link>
    <router-link to="/modal">Modal</router-link>
    <router-link to="/items/1">Appel Http avec Axios</router-link>
    <router-view></router-view>

  </div>
</template>

<script>
  // Composants
  import DatePicker from './DatePicker.vue';
  import Grid from './Modal.vue';

  export default {
    name: 'app',
    data () {
      return {
        msg: 'Bienvenue sur l\'application - Vue.js + Boostrap + SSR'
      }
    }
  }

</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
