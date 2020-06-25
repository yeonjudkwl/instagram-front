import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SignUp from '../views/accounts/SignUp.vue'
import Login from '../views/accounts/Login.vue'
import Logout from '../views/accounts/Logout.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
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
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  // Login 안해도 됨
  const publicPages = ['Login', 'Signup' ,'Home', 'List']
  // Login 되어있으면 안됨
  const authPages = ['Login', 'Signup']
  // 로그인 해야함
  const authRequired = !publicPages.includes(to.name)
  // 로그인 해서는 안 됨
  const unauthRequired = authPages.includes(to.name)
  const isLoggedIn = Vue.$cookies.isKey('auth-token')
  
  // 로그인 해야하는데 로그인 안 되어 있으면
  authRequired && !isLoggedIn ? next({ name: 'Login'}) : next()
  
  // 로그인 해서는 안되는데 로그인 되어 있으면
  if (unauthRequired && isLoggedIn) {
      next({ name: 'Home'})
  }
})

export default router
