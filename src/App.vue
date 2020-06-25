<template>
  <div id="app">
    <div id="nav">
      <router-link :to="{ name: 'Home' }">Home</router-link> |
      <router-link :to="{ name: 'SignUp' }">SignUp</router-link> |
      <router-link :to="{ name: 'Login' }">Login</router-link> |
      <router-link @click.native="logout" to="/accounts/logout">Logout</router-link>
    </div>
    <router-view/>
  </div>
</template>
<script>
import axios from 'axios'

const URL = 'http://127.0.0.1:8000/rest-auth'

export default {
  name: 'App',
  data () {
    return {
      isLoggedIn: false
    }
  },
  methods: {
    setCookie(token) {
      this.$cookies.set('auth-token', token)
      this.isLoggedIn = true
    },
    logout () {
      const config = {
        headers: {
                Authorization: `Token ${this.$cookies.get('auth-token')}`
              }
          }
      axios.post(`${URL}/logout/`, null, config)
        .then( () => {
          this.$cookies.remove('auth-token')
          this.isLoggedIn = false
          this.$router.push({ name: 'Home' })
        })
        .catch(err => console.log(err.response.data))
    }
  },
  created () {
    this.isLoggedIn = this.$cookies.isKey('auth-token')
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
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(250, 250, 250);
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
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
.accounts-text{
  margin-left: 5px;
  font-weight: bold;
  color: rgb(53, 150, 255);
}
</style>
