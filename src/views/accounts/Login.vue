<template>
  <div>
    <h1>login</h1>
    <div>
      <label for="username">username: </label>
      <input v-model="loginData.username" type="text" id="username">
    </div>
    <div>
      <label for="password">password: </label>
      <input v-model="loginData.password" type="password" id="password">
    </div>
    <button @click="login">로그인</button>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      loginData: {
        username: null,
        password: null,
      },
    }
  },
  methods: {
    login () {
      this.$emit('login-data', this.loginData)
    }
  }
}
</script>

<style>

</style>
