<template>
  <div id="app">
    <div class="header">
      <button class="btn primary" v-on:click="handleLogout" v-show="user.authenticated">logout</button>
    </div>
    <router-view/>
  </div>
</template>

<script>
import auth from './auth'

export default {
  name: 'App',
  data(){
    return{
      user: auth.user
    }
  },
  methods: {
    handleLogout: function(){
      auth.logout()
    }
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
body{
  margin:0px;
}
.header{
  height:60px;
  background-color: grey;
  color: white;
  width:100%;
  padding-left: 40px;
  margin-bottom: 40px;
  line-height: 58px;
}
</style>
