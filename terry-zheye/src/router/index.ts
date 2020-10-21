import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import store from '@/store'
import axios from 'axios'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/Home',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '',
        redirect: '/Home/Index'
      },
      {
        path: 'Index',
        name: 'Index',
        component: () => import('@/views/Index.vue')
      },
      {
        path: 'ColumnDetail/:id',
        name: 'ColumnDetail',
        component: () => import('@/views/ColumnDetail.vue')
      },
      {
        path: 'CreatePost',
        name: 'CreatePost',
        component: () => import('@/views/CreatePost.vue'),
        meta: { requiredLogin: true }
      }
    ]
  },
  {
    path: '/Login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
    meta: { redirectAlreadyLogin: true }
  },
  {
    path: '/Register',
    name: 'Register',
    component: () => import('@/views/Register.vue')
  },
  {
    path: '/**',
    redirect: '/Login'
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const { user, token } = store.state
  const { requiredLogin, redirectAlreadyLogin } = to.meta

  if (!user.isLogin) {
    if (token) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`
      store.dispatch('fetchCurrentUser').then(() => {
        if (redirectAlreadyLogin) {
          next('/')
        } else {
          next()
        }
      }).catch(e => {
        next('/Login')
        return Promise.reject(e)
      })
    } else {
      if (requiredLogin) {
        next('/Login')
      } else {
        next()
      }
    }
  } else {
    if (redirectAlreadyLogin) {
      next('/')
    } else {
      next()
    }
  }
})

export default router
