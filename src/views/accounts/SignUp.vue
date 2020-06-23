<template>
  <div>
    <h1>signup</h1>
    <div>
      <label for="username">username: </label>
      <input v-model="signupData.username" type="text" id="username">
    </div>
    <div>
      <label for="password1">password1: </label>
      <input v-model="signupData.password1" type="password" id="password1">
    </div>
    <div>
      <label for="password2">password2: </label>
      <input v-model="signupData.password2" type="password" id="password2">
    </div>
    <button @click="signup">회원가입</button>
  </div>
</template>

<script>

export default {
  name: 'SignUp',
  data () {
    return {
      signupData: {
        username: null,
        password1: null,
        password2: null,
      },
    }
  },
  methods: {
    signup () {
      this.$emit('signup-data', this.signupData)
    }
  },
}
</script>
