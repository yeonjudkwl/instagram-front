import Vue from 'vue'
import Vuex from 'vuex'

import cookies from 'vue-cookies'
import axios from 'axios'
import router from '@/router/index'
// // domain
import SERVER from '@/api/drf'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    authToken: cookies.get('auth-token')
  },
  getters: {
    isLoggedIn: state => !!state.authToken,
    config: state => ({ headers: {
      Authorization: `Token ${state.authToken}`
    } })
  },
  mutations: {
    SET_TOKEN (state, payload) {
      state.authToken = payload
      cookies.set('auth-token', payload)
    }
  },
  actions: {
    login ({ commit }, loginData) {
      axios.post(SERVER.URL + SERVER.ROUTES.login, loginData)
        .then(res => {
          commit('SET_TOKEN', res.data.key)
          router.push({ name: 'Home' })
        })
        .catch(err => console.log(err.response.data))
    },
    signup ({ commit }, signupData) {
      axios.post(SERVER.URL + SERVER.ROUTES.signup, signupData)
        .then(res => {
          commit('SET_TOKEN', res.data.key)
          router.push({ name: 'Home' })
        })
        .catch(err => console.log(err.response.data))
    },
  },
  modules: {
  }
})
