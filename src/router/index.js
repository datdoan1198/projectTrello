import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/PageList.vue'
import store from "../store";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/PageLogin.vue')
  },
  {
    path: '/infor',
    name: 'Infor',
    component: () => import('../views/PageInfor.vue')
  },
  {
    path: '/list',
    name: 'List',
    component: () => import('../views/PageList.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !store.state.login.isAuthenticated) {
    next({ name: 'Login' })
  } else {
    next()
  }
  if (to.name == 'Login' && store.state.login.isAuthenticated) {
    next({ name: 'Home' })
  } else {
    next()
  }
})

export default router
