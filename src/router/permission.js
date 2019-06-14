import router from './index'
import store from '@/store'
import UserAge from '@/utils/uaparser'
import storage from '@/utils/storage'
import { KEY_USER_INFO } from '@/api/config'
import { getUserInfoAPP } from '../native-app/native-api'

const whiteList = ['login', 'login-other', 'password-reset', 'register']
const isApp = UserAge.isApp()

router.beforeEach((to, from, next) => {
  store.commit('updateLoadingStatus', { isLoading: true })
  // 用户信息
  const userInfo = storage.get(KEY_USER_INFO)
  // 判断当前环境 -- APP用户信息在入口文件App.vue获取
  if (isApp) {
    // APP环境直接获取用户信息 -- 不存缓存
    getUserInfoAPP({
      success: res => {
        // 并修改手机字段统一为 --> phoneNum
        const result = JSON.parse(res.data)
        const { phoneNumber: phoneNum } = result
        store.dispatch('appLogin', { ...result, phoneNum }).then(() => {
          next()
        })
      }
    })
  } else {
    if (userInfo) {
      // 非APP内，检测用户信息是否失效
      store
        .dispatch('checkLogin')
        .then(() => {
          next()
        })
        .catch(() => {
          store.dispatch('fedLogout').then(() => {
            location.reload()
          })
        })
    } else {
      // 白名单页
      if (whiteList.indexOf(to.name) !== -1) {
        next()
      } else {
        // 跳转到登录界面
        store.commit('updateLoadingStatus', { isLoading: false })
        // 记录登录信息失效前路由 -- to.fullPath
        next({
          name: 'login',
          // query: { redirect: '/' },
          replace: true
        })
      }
    }
  }
})

router.afterEach(() => {
  store.commit('updateLoadingStatus', { isLoading: false })
})
