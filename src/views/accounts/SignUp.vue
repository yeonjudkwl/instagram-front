<template>
  <div class="accounts-bg">
    <h1 class="a11y-hidden">signup</h1>
    <div class="signup-wrap">
      <img src="@/assets/images/instagram.png" class="accounts-logo"/>
      <div>
        <label for="username" class="a11y-hidden">username: </label>
        <input v-model="signupData.username" type="text" id="username" placeholder="사용자 이름" class="accounts-input">
      </div>
      <div>
        <label for="password1" class="a11y-hidden">password1: </label>
        <input v-model="signupData.password1" type="password" id="password1" placeholder="비밀번호" class="accounts-input">
      </div>
      <div>
        <label for="password2" class="a11y-hidden">password2: </label>
        <input @keyup.enter="signup(signupData)" v-model="signupData.password2" type="password" id="password2" placeholder="비밀번호 확인" class="accounts-input">
        <div v-if="$store.state.message">
          <p class="error-msg" v-for="(msg, idx) in $store.state.message" :key="idx">{{ msg[0] }}</p>
        </div>
        <p v-if="message" class="error-msg">{{ message }}</p>
      </div>      
      <button @click="checkData" class="accounts-btn">회원가입</button>
    </div>
    <div class="login-wrap">
      <p>계정이 없으신가요? <router-link :to="{ name: 'Login' }"><span class="accounts-text">로그인</span></router-link></p>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'SignUp',
  data () {
    return {
      signupData: {
        username: null,
        password1: null,
        password2: null,
      },
      message: null,
    }
  },
  methods: {
    ...mapActions(['signup']),
    checkData () {
      if (this.signupData.username === null || this.signupData.password1 === null || this.signupData.password2 === null) {
        this.message = '필수값을 입력해주세요 :)'
      } else {
        this.message = null
        this.signup(this.signupData)
      }
    }
  },
}
</script>

<style scoped>
.signup-wrap{
  width: 350px;
  height: 400px;
  background: rgba(255, 255, 255);
  border: 1px solid rgba(219, 219, 219);
}
.login-wrap{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 350px;
  height: 70px;
  margin: 15px 0;
  background: rgba(255, 255, 255);
  border: 1px solid rgba(219, 219, 219);
}
.login-wrap a{
  text-decoration: none;
}
.error-msg {
  width: 90%;
  margin: 0 auto;
  padding: 5px 0;
  font-size: 10px;
  background:rgb(255, 243, 205);
}
</style>
