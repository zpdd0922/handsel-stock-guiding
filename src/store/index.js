import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import storage from '@/utils/storage'
import createLogger from 'vuex/dist/logger'
import user from './user'
import viewLoading from './modules/viewLoad'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    user,
    viewLoading
  },
  strict: debug,
  // 状态持久化
  plugins: debug
    ? [
        createLogger(),
        createPersistedState({
          storage: {
            getItem: key => storage.get(key),
            setItem: (key, value) => storage.set(key, value),
            removeItem: key => storage.remove(key)
          }
        })
      ]
    : []
})
