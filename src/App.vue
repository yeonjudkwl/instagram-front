<template>
  <div id="app">
    <header>
      <div class="logo">
        <img src="@/assets/images/instagram.png" class="main-logo"/>
      </div>
      <div class="search">
        <label for="search" class="a11y-hidden">search: </label>
        <input type="text" id="search" value="검색">
      </div>
      <nav id="nav">
        <router-link :to="{ name: 'Home' }">Home</router-link> |
        <router-link v-if="!isLoggedIn" :to="{ name: 'SignUp' }">SignUp</router-link> |
        <router-link v-if="!isLoggedIn" :to="{ name: 'Login' }">Login</router-link> |
        <!-- <router-link v-if="isLoggedIn" :to="{ name: 'Profile', params:{ username: username} }" >Profile</router-link> | -->
        <a v-if="isLoggedIn" @click="fetchUserInfo(username)">Profile</a>
        <router-link v-if="isLoggedIn"  :to="{ name: 'Logout' }">Logout</router-link> |
        <router-link v-if="isLoggedIn" :to="{ name: 'FeedCreate' }">FeedCreate</router-link> |
        <router-link :to="{ name: 'FeedList' }">FeedList</router-link> |
      </nav>
    </header>
    
    <router-view/>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'App',
  computed: {
    ...mapGetters(['isLoggedIn']),
    username () {
      return this.$store.state.username
    }
  },
  methods: {
    ...mapActions(['fetchUserInfo'])
  },
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: rgba(250, 250, 250);
  color: #2c3e50;
}
header{
  height: 80px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border-bottom: 1px solid #DBDBDB;
  background-color: #ffffff;
}
.main-logo{
  width: 135px;
}
.search input{
  width: 200px;
  padding: 5px;
  border:1px solid #DBDBDB;
  border-radius: 5px;
  background-color:#fafafa;
  text-align: center;
  color: #999999;
}
#nav {
  padding: 30px;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
.a11y-hidden {
 overflow: hidden;
 position: absolute !important;
 top: -9999em;
 clip: rect(0, 0, 0, 0);
 width: 1px;
 height: 1px;
 margin: -1px;
}
/* accounts css */
.accounts-bg{
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(250, 250, 250);
  text-align: center;
  color: #2c3e50;
}
.accounts-logo{
  width: 65%;
  margin: 5px 0 25px;
}
.accounts-input{
  width: 80%;
  margin: 5px;
  padding: 3px;
  line-height: 2.5;
  border: 1px solid rgba(219, 219, 219);
  border-radius: 4px;
  background: rgba(250, 250, 250);
}
.accounts-btn{
  width: 80%;
  margin: 5px;
  margin-top: 10px;
  padding: 3px;
  line-height: 2.5;
  border: none;
  border-radius: 4px;
  background: rgba(90, 170, 255);
  color: rgba(255, 255, 255);
}
.accounts-btn:hover {
  cursor: pointer;
  background: rgb(53, 150, 255);
}
.accounts-input:focus, .accounts-btn:focus{
  outline: none;
}
.accounts-text{
  margin-left: 5px;
  font-weight: bold;
  color: rgb(53, 150, 255);
}
</style>
