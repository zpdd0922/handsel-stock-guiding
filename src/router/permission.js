import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import router from './index'
import store from '@/store'
import storage from '@/utils/storage'
import UserAge from '@/utils/ua-parser'
import { KEY_USER_INFO, DEV, LANG_TYPE } from '@/api/config'
import { getUserInfoAPP } from '@/native-app/native-api'
import { Locale } from 'cube-ui'
import cubeDefaultLang from '@/i18n/lang/zh-cu-TW'
import i18n from '@/i18n'

// 是否APP环境
const isApp = UserAge.isApp()
// 判断是否需要登录权限 以及是否登录
router.beforeEach((to, from, next) => {
  store.commit('updateLoadingStatus', { isLoading: true })
  // 判断当前环境
  if (isApp) {
    // APP环境直接获取用户信息 -- 不存缓存
    getUserInfoAPP({
      success: (res) => {
        // 并修改手机字段统一为 --> phoneNum
        const result = JSON.parse(res.data)
        const { phoneNumber: phoneNum, language } = result
        switch (language) {
        case 'zh-Hant':
          i18n.locale = 'zh-TW'
          Locale.use('cu-TW', cubeDefaultLang)
          sessionStorage.setItem(LANG_TYPE, 'zh-Hant')
          break
        case 'zh-Hans':
          i18n.locale = 'zh-CN'
          sessionStorage.setItem(LANG_TYPE, 'zh-Hans')
          break
        default:
          i18n.locale = 'zh-CN'
          sessionStorage.setItem(LANG_TYPE, 'zh-Hans')
        }
        store.dispatch('appLogin', { ...result, phoneNum })
          .then(() => {
            next()
          })
      }
    })
  } else {
    i18n.locale = 'zh-CN'
    const lang = i18n.locale === 'zh-TW' ? 'zh-Hant' : 'zh-Hans'
    sessionStorage.setItem(LANG_TYPE, lang)
    // 白名单
    if (to.matched.some(res => res.meta.whiteAuth)) {
      next()
    } else {
      // 用户信息
      const userInfo = storage.get(KEY_USER_INFO)
      // 判断是否登录
      if (userInfo) {
        // 检测用户信息是否失效
        store.dispatch('checkLogin')
          .then(() => {
            next()
          })
          .catch(() => {
            store.dispatch('fedLogout').then(() => {
              location.reload()
            })
          })
      } else {
        // 跳转到登录界面
        store.commit('updateLoadingStatus', { isLoading: false })
        // 根据编译环境区分是否调用本项目内登录注册模块
        if (DEV) {
          NProgress.start()
          next({
            name: 'login'
            // query: { redirect: to.fullPath },
            // replace: true
          })
        } else {
          const redirect_url = encodeURIComponent(window.location.href)
          window.location.href = window.USER_CENTER + `?redirect_url=${redirect_url}`
        }
      }
    }
  }
})

router.afterEach(transition => {
  store.commit('updateLoadingStatus', { isLoading: false })
  NProgress.done()
})
