import Vue from 'vue'
import VueRouter from 'vue-router'
// accounts
import SignUp from '../views/accounts/SignUp.vue'
import Login from '../views/accounts/Login.vue'
import Logout from '../views/accounts/Logout.vue'
import Profile from '../views/accounts/Profile.vue'
import ProfileUpdate from '../views/accounts/ProfileUpdate.vue'
// Feed
import FeedList from '../views/articles/FeedList.vue'
import FeedCreate from '../views/articles/FeedCreate.vue'
import FeedUpdate from '../views/articles/FeedUpdate.vue'
import FeedDetail from '../views/articles/FeedDetail.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'FeedList',
    component: FeedList
  },
  {
    path: '/articles',
    name: 'FeedList',
    component: FeedList
  },
  {
    path: '/accounts/signup',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/accounts/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/accounts/logout',
    name: 'Logout',
    component: Logout
  },
  {
    path: '/accounts/:username',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/accounts/:username/update',
    name: 'ProfileUpdate',
    component: ProfileUpdate
  },
  {
    path: '/articles/create',
    name: 'FeedCreate',
    component: FeedCreate
  },
  {
    path: '/articles/:id',
    name: 'FeedDetail',
    component: FeedDetail
  },
  {
    path: '/articles/:id/update',
    name: 'FeedUpdate',
    component: FeedUpdate
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  // // Login 안해도 됨
  // const publicPages = ['Login', 'Signup' ,'Home', 'List']

  // 로그인 해야함
  const authRequired = ['Logout', 'FeedCreate','Profile'].includes(to.name)
  // 로그인 해서는 안 됨
  const unauthRequired = ['Login', 'SignUp'].includes(to.name)
  const isLoggedIn = Vue.$cookies.isKey('auth-token')
  
  // 로그인 해야하는데 로그인 안 되어 있으면
  authRequired && !isLoggedIn ? next({ name: 'Login'}) : next()
  
  // 로그인 해서는 안되는데 로그인 되어 있으면
  if (unauthRequired && isLoggedIn) {
      next({ name: 'FeedList'})
  }
})

export default router
