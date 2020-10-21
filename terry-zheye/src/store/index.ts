import { createStore } from 'vuex'

import axios from 'axios'
import $Api from '@/common/api'

export interface ResponseType<P = {}> {
    code: number;
    msg: string;
    data: P;
}

export interface UserProps {
    isLogin: boolean;
    nicName?: string;
    _id?: string;
    column?: string;
    emial?: string;
}

export interface ImageProps {
    _id?: string;
    url?: string;
    createdAt?: string;
}

export interface ColumnProps {
    _id: string;
    title: string;
    avatar?: ImageProps;
    description: string;
}
export interface PostProps {
    id?: string;
    title: string;
    excerpt?: string;
    content?: string;
    image?: ImageProps | string;
    createdAt?: string;
    column: string;
    author?: string;
}

export interface GlobalErrorProps {
    status: boolean;
    message?: string;
}

export interface GlobalDataProps {
    loading: boolean;
    columns: ColumnProps[];
    posts: PostProps[];
    user: UserProps;
    token: string;
    error: GlobalErrorProps;
}

export default createStore<GlobalDataProps>({
  state: {
    error: { status: false },
    token: '',
    loading: false,
    columns: [],
    posts: [],
    user: {
      isLogin: false
    }
  },
  mutations: {
    login (state, rawData) {
      const { token } = rawData
      state.token = token
      axios.defaults.headers.common.Authorization = `Bearer ${token}`
    },
    createPost (state, newPost) {
      console.log(newPost)
      state.posts.push(newPost)
    },
    fetchColumns: (state, rawData) => {
      state.columns = rawData
    },
    fetchColumn: (state, rawData) => {
      state.columns = [rawData]
    },
    fetchPosts: (state, rawData) => {
      state.posts = rawData
    },
    setLoading: (state, status) => {
      state.loading = status
    },
    fetchCurrentUser: (state, rawData) => {
      state.user = { isLogin: true, ...rawData }
    },
    setError (state, e: GlobalErrorProps) {
      state.error = e
    }
  },
  getters: {
    biggerComumnsLen (state) {
      return state.columns.filter(c => c._id > '2').length
    },
    getCokumnById: (state) => (id: string) => {
      return state.columns.find(c => c._id === id)
    },
    getPostByCid: (state) => (cid: string) => {
      return state.posts.filter(post => post.column === cid)
    }
  },
  actions: {
    async fetchColumns (context) {
      const { data: { data: { list } } } = await axios({
        method: 'get',
        url: $Api.getColumn
      })
      context.commit('fetchColumns', list)
    },
    async fetchColumn (context, cid) {
      const {
        data: {
          data
        }
      } = await axios({
        method: 'get',
        url: $Api.getColumn + '/' + cid
      })
      context.commit('fetchColumn', data)
    },
    async fetchPosts (context, cid) {
      const {
        data: {
          data: {
            list
          }
        }
      } = await axios.get(`${$Api.getColumn}/${cid}/posts`)
      context.commit('fetchPosts', list)
    },
    async login (context, payload) {
      const {
        data: {
          data
        }
      } = await axios({
        method: 'post',
        url: $Api.login,
        data: payload
      })
      context.commit('login', data)
    },
    async fetchCurrentUser (context) {
      const {
        data: {
          data
        }
      } = await axios({
        method: 'get',
        url: $Api.getUser
      })
      console.log(data)
      context.commit('fetchCurrentUser', data)
    },
    async createPost (context, payload) {
      const {
        data: {
          data
        }
      } = await axios({
        method: 'post',
        url: $Api.post,
        data: payload
      })
      context.commit('createPost', data)
    },
    loginAndFetch (context, loginData) {
      return context.dispatch('login', loginData).then(() => {
        return context.dispatch('fetchCurrentUser')
      })
    }
  },
  modules: {
  }
})
