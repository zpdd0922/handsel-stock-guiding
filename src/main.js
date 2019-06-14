import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'

import VueMeta from 'vue-meta'
// import VConsole from 'vconsole'
import VueLazyLoad from 'vue-lazyload'
import lodash from 'lodash-es'

import fastclick from 'fastclick'
// import axios from '@/api/axios'

// import '@/mock'
import 'swiper/dist/css/swiper.css'

import './common/js/rem'
import './common/stylus/index.styl'

import './components/register'
import '@/router/permission'

// 引入 Style 加载基础样式
import {
  // eslint-disable-next-line
  Style,
  Slide,
  Loading,
  Button,
  Dialog,
  Toast,
  DatePicker,
  IndexList,
  Form,
  Checkbox,
  Popup,
  Scroll
} from 'cube-ui'

Vue.use(Slide)
Vue.use(Loading)
Vue.use(Button)
Vue.use(Dialog)
Vue.use(Toast)
Vue.use(DatePicker)
Vue.use(IndexList)
Vue.use(Form)
Vue.use(Checkbox)
Vue.use(Popup)
Vue.use(Scroll)

// 单独设置页面的title和meta信息
Vue.use(VueMeta)

// 图片懒加载
Vue.use(VueLazyLoad, {
  loading: require('./common/image/default.png')
})

Vue.config.productionTip = false

// Vue.prototype.$http = axios
Vue.prototype.$lodash = lodash

fastclick.attach(document.body)

// 测试环境 开启vConsole
if (process.env.VUE_APP_CONSOLE === 'show') {
  const VConsole = require('vconsole')
  const vConsole = new VConsole()
  console.log(vConsole.version)
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
