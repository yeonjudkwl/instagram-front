import Vue from 'vue'
import Vuex from 'vuex'

import cookies from 'vue-cookies'
import axios from 'axios'
import router from '@/router/index'
// domain
import SERVER from '@/api/drf'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    authToken: cookies.get('auth-token'),
    feeds: null,
    username: cookies.get('username'),
    userInfo: null,
    searched: null,
    message: null,
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
      cookies.set('username', payload)
    },
    GET_USERNAME (state) {
      state.username = cookies.get('username')
    },
    SET_FEEDS (state, payload) {
      state.feeds = payload
    },
    SET_USERINFO (state, payload) {
      state.userInfo = payload
    },
    SET_SEARCHED (state, payload) {
      state.searched = payload
    },
    SET_MSG (state, payload) {
      state.message = payload
    }
  },
  actions: {
    postAuthData({ commit }, payload) {
      axios.post(SERVER.URL + payload.location, payload.data)
        .then(res => {
          commit('SET_TOKEN', res.data.key)
          commit('SET_USERNAME', payload.data.username)
          commit('GET_USERNAME')
          router.push({ name: 'FeedList' })
        })
        .catch(err => {
          commit('SET_MSG', err.response.data)
          console.log(err.response.data)
        })
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
          commit('SET_USERNAME', null)
          cookies.remove('auth-token')
          cookies.remove('username')
          router.push({ name: 'FeedList' })
        })
        .catch(err => console.log(err.response.data))
    },
    fetchUserInfoPushProfile ({ commit }, username) {
      axios.get(SERVER.URL + `/accounts/${username}/`) 
        .then( res => {
          commit('SET_USERINFO', res.data)
          router.push({ name: 'Profile', params: {username: username} })
        })
        .catch( err => console.log(err.response.data))
    },
    fetchUserInfo ({ commit }, username) {
      axios.get(SERVER.URL + `/accounts/${username}/`) 
        .then( res => {
          commit('SET_USERINFO', res.data)
        })
        .catch( err => console.log(err.response.data))
    },
    updateUserInfo ({ getters, commit }, updateData ) {
      const formdata = new FormData()
      formdata.append('profile_photo', updateData.profileData.file)
      formdata.append('name', updateData.profileData.name)
      formdata.append('gender', updateData.profileData.gender)
      formdata.append('description', updateData.profileData.description)

      axios.put(SERVER.URL + `/accounts/${updateData.username}/`, formdata, getters.imgConfig)
        .then ( res => {
          commit('SET_USERINFO', res.data)
          router.push({ name: 'Profile', params: {username: updateData.username} })
        })
        .catch(err => console.log(err.response.data))
    },
    deleteUserInfo ({ getters, commit }, username ) {
      axios.delete(SERVER.URL + `/accounts/${username}/`, getters.config)
        .then ( () => {
          console.log('회원 사용 중지')
          commit('SET_TOKEN', null)
          commit('SET_USERNAME', null)
          cookies.remove('auth-token')
          cookies.remove('username')
          router.push({ name: 'FeedList' })
        }) 
        .catch(err => console.log(err.response.data))
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
        .catch(err => { console.log('업로드 실패', err) })
    },
    fetchFeeds ({ commit }) {
      axios.get(SERVER.URL + SERVER.ROUTES.feeds) 
        .then(res => {
          commit('SET_FEEDS', res.data)
        }) 
        .catch(err => console.log(err.response.data))
    },
    updateFeed ({ getters }, updateData ) {
      axios.put(SERVER.URL + `/articles/${updateData.feedId}/`, { content: updateData.content }, getters.config)
        .then ( () => {
          router.push({ name: 'FeedList' })
        })
        .catch(err => console.log(err.response.data))
    },
    deleteFeed ({ getters, dispatch }, feedId ) {
      axios.delete(SERVER.URL + `/articles/${feedId}/`, getters.config)
        .then ( () => {
          console.log('피드삭제')
          dispatch('fetchFeeds')
        }) 
        .catch(err => console.log(err.response.data))
    },
    // follow
    follow ({ getters, dispatch }, username) {
      axios.post(SERVER.URL + `/accounts/${username}/follow/`, null, getters.config)
        .then( () => {
          console.log('follow')
          dispatch('fetchUserInfo', username)
        })
        .catch(err => console.log(err))
    },
    unfollow ({ getters, dispatch }, username) {
      axios.post(SERVER.URL + `/accounts/${username}/unfollow/`, null, getters.config)
        .then( () => {
          console.log('unfollow')
          dispatch('fetchUserInfo', username)
        })
        .catch(err => console.log(err.response.data))
    },
    // like
    like ({ getters, dispatch }, feedId) {
      axios.post(SERVER.URL + `/articles/${feedId}/like/`, null, getters.config)
        .then( () => {
          console.log('like')
          dispatch('fetchFeeds')
        })
        .catch(err => console.log(err.response.data))
    },
    unlike ({ getters, dispatch }, feedId) {
      axios.post(SERVER.URL + `/articles/${feedId}/unlike/`, null, getters.config)
        .then( () => {
          console.log('unlike')
          dispatch('fetchFeeds')
        })
        .catch(err => console.log(err.response.data))
    },
    // comments
    createComments ({ getters, dispatch }, commentData) {
      axios.post(SERVER.URL + `/articles/${commentData.feedId}/comments/`, { content: commentData.content }, getters.config) 
        .then( () => { 
          console.log('댓글작성완료')
          dispatch('fetchFeeds')
        }) 
        .catch(err => { console.log(commentData, err.response.data) })
    },
    deleteComment ({ getters, dispatch }, commentDelete ) {
      axios.delete(SERVER.URL + `/articles/${commentDelete.feedId}/comments/${commentDelete.commentId}/`, getters.config)
        .then ( () => {
          console.log('댓글삭제')
          dispatch('fetchFeeds')
        })
        .catch(err => console.log(err.response.data))
    },
    likeComment ({ getters }, commentData) {
      axios.post(SERVER.URL + `/articles/${commentData.feedId}/comments/${commentData.commentId}/like/`, null, getters.config)
        .then( () => {
          console.log('like')
        })
        .catch(err => console.log(err.response.data))
    },
    unlikeComment ({ getters }, commentData) {
      axios.post(SERVER.URL + `/articles/${commentData.feedId}/comments/${commentData.commentId}/unlike/`, null, getters.config)
        .then( () => {
          console.log('unlike')
        })
        .catch(err => console.log(err.response.data))
    },
    search ({ commit }, searchData) {
      axios.get(SERVER.URL + SERVER.ROUTES.search + searchData)
        .then( res => {
          console.log(res.data)
          commit('SET_SEARCHED', res.data)
          router.push({ name: 'Search' })
        })
        .catch(err => console.log(err.response.data))
    }
  },
  modules: {
  }
})
