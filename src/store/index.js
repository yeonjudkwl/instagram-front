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
    postAuthData({ commit }, payload) {
      axios.post(SERVER.URL + payload.location, payload.data)
        .then(res => {
          commit('SET_TOKEN', res.data.key)
          router.push({ name: 'Home' })
        })
        .catch(err => console.log(err.response.data))
    },
    signup ({ dispatch }, signupData) {
      const info = {
        data: signupData,
        location:  SERVER.ROUTES.signup
      }
      // 두번째 인자까지만 가능. 따라서 info 객체로 만듦.
      dispatch('postAuthData', info)
    },
    login ({ dispatch }, loginData) {
      const info = {
        data: loginData,
        location:  SERVER.ROUTES.login
      }
      dispatch('postAuthData', info)
    },
    logout ({ getters, commit }) {
      axios.post(SERVER.URL + SERVER.ROUTES.logout, null, getters.config)
        .then( () => {
          commit('SET_TOKEN', null)
          cookies.remove('auth-token')
          router.push({ name: 'Home' })
        })
        .catch(err => console.log(err.response.data))
    },
  },
  modules: {
  }
})
