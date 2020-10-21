import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from 'axios'

axios.defaults.baseURL = 'http://apis.imooc.com/api'
axios.defaults.timeout = 8000

axios.interceptors.request.use((config) => {
  store.commit('setLoading', true)
  if (config.method !== 'get') {
    config.data = { ...config.data, icode: '81DC262639787C46' }
  } else {
    config.params = { ...config.params, icode: '81DC262639787C46' }
  }
  return config
}, (err) => {
  return Promise.reject(err)
})

axios.interceptors.response.use((res) => {
  store.commit('setLoading', false)
  return res
}, err => {
  const { error } = err.response.data
  store.commit('setError', { status: true, message: error })
  store.commit('setLoading', false)
  return Promise.reject(error)
})

createApp(App).use(store).use(router).mount('#app')
