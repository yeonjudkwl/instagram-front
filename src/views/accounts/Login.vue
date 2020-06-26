<template>
  <div class="accounts-bg">
    <h1 class="a11y-hidden">login</h1>
    <div class="login-wrap">
      <img src="@/assets/images/instagram.png" class="accounts-logo"/>
      <div>
        <label for="username" class="a11y-hidden">username: </label>
        <input v-model="loginData.username" type="text" id="username" placeholder="사용자 이름" class="accounts-input">
      </div>
      <div>
        <label for="password" class="a11y-hidden">password: </label>
        <input @keyup.enter="login(loginData)" v-model="loginData.password" type="password" id="password" placeholder="비밀번호" class="accounts-input">
      </div>
      <button @click="login(loginData)" class="accounts-btn">로그인</button>
    </div>
    <div class="signup-wrap">
      <p>계정이 없으신가요? <router-link :to="{ name: 'SignUp' }"><span class="accounts-text">가입하기</span></router-link></p>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

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
    ...mapActions(['login'])
  }
}
</script>

<style scoped>
.login-wrap{
  width: 350px;
  height: 350px;
  background: rgba(255, 255, 255);
  border: 1px solid rgba(219, 219, 219);
}
.signup-wrap{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 350px;
  height: 70px;
  margin: 15px 0;
  background: rgba(255, 255, 255);
  border: 1px solid rgba(219, 219, 219);
}
.signup-wrap a{
  text-decoration: none;
}
</style>
