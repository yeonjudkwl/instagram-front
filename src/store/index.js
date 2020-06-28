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
    authToken: cookies.get('auth-token'),
    feeds: null,
    username: null,
    userInfo: null,
  },
  getters: {
    isLoggedIn: state => !!state.authToken,
    config: state => ({ headers: {
      Authorization: `Token ${state.authToken}`
    } }),
    imgConfig: state => ({ headers: {
      Authorization: `Token ${state.authToken}`,
      'Content-Type': 'multipart/form-data'
    } }),
  },
  mutations: {
    SET_TOKEN (state, payload) {
      state.authToken = payload
      cookies.set('auth-token', payload)
    },
    SET_USERNAME (state, payload) {
      state.username = payload
    },
    SET_FEEDS (state, payload) {
      state.feeds = payload
    },
    SET_USERINFO (state, payload) {
      state.userInfo = payload
    }
  },
  actions: {
    postAuthData({ commit }, payload) {
      axios.post(SERVER.URL + payload.location, payload.data)
        .then(res => {
          commit('SET_TOKEN', res.data.key)
          commit('SET_USERNAME', payload.data.username)
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
    fetchUserInfo ({ commit }, username) {
      axios.get(SERVER.URL + `/accounts/${username}/`) 
        .then( res => {
          commit('SET_USERINFO', res.data)
          router.push({ name: 'Profile', params: {username: username} })
        })
        .catch( err => console.log(err.response.data))
    },
    // articles
    create ({ getters }, feedData) {
      const formdata = new FormData()
      formdata.append('content', feedData.content)
      formdata.append('image', feedData.file)

      axios.post(SERVER.URL + SERVER.ROUTES.feeds, formdata, getters.imgConfig) 
        .then( () => { 
          router.push({ name: 'FeedList' })
        }) 
        .catch(err => { console.log('사진업로드 실패', err) })
    },
    fetchFeeds ({ commit }) {
      axios.get(SERVER.URL + SERVER.ROUTES.feeds) 
        .then(res => {
          commit('SET_FEEDS', res.data)
        }) 
        .catch(err => console.log(err.response.data))
    },
    // profile
    follow ({ getters }, username) {
      axios.post(SERVER.URL + `/accounts/${username}/follow/`, null, getters.config)
        .then( () => {
          console.log('follow')
          // dispatch('fetchUserInfo', username)
          // router.push({ name: 'Profile', params: {username: username} })
        })
        .catch(err => console.log(err.response.data))
    },
    unfollow ({ getters }, username) {
      axios.post(SERVER.URL + `/accounts/${username}/unfollow/`, null, getters.config)
        .then( () => {
          console.log('unfollow')
          // router.push({ name: 'Profile', params: {username: username} })
        })
        .catch(err => console.log(err.response.data))
    },
    // like
    fetchLikeUser (context, feedId) {
      axios.get(SERVER.URL + `/articles/${feedId}/likes/`)
        .then( res => {
          console.log(res.data)
        })
        .catch(err => console.log(err.response.data))
    },
    like ({ getters }, feedId) {
      axios.post(SERVER.URL + `/articles/${feedId}/like/`, null, getters.config)
        .then( () => {
          console.log('like')
        })
        .catch(err => console.log(err.response.data))
    },
    unlike ({ getters }, feedId) {
      axios.post(SERVER.URL + `/articles/${feedId}/unlike/`, null, getters.config)
        .then( () => {
          console.log('unlike')
        })
        .catch(err => console.log(err.response.data))
    },
  },
  modules: {
  }
})
