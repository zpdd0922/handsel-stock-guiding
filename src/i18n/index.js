import Vue from 'vue'
import VueI18n from 'vue-i18n'
import cn from './lang/zh-CN'
import tw from './lang/zh-TW'
Vue.use(VueI18n)

const messages = {
  'zh-CN': cn,
  'zh-TW': tw
}

const i18n = new VueI18n({
  locale: 'zh-CN',
  messages
})

export default i18n