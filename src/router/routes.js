import Accounts from '@/views/accounts/index'

// 路由懒加载
// const _import = filename => () => import(`@/views/${filename}/${filename}.vue`)
const _import = file => () => import('@/views/' + file + '/index.vue')

// 路由配置表
const routes = [
  {
    path: '/',
    name: 'home',
    component: _import('home'),
    meta: { title: '赠股活动' }
  },
  {
    path: '/accounts',
    name: 'accounts',
    component: Accounts,
    redirect: '/accounts/login',
    children: [
      {
        name: 'login',
        path: 'login',
        component: _import('accounts/login'),
        meta: { title: '登录' }
      },
      {
        name: 'login-other',
        path: 'login-other',
        component: _import('accounts/login-other'),
        meta: { title: '登录 - 其他方式' }
      },
      {
        name: 'register',
        path: 'register',
        component: _import('accounts/register'),
        meta: { title: '注册' }
      },
      {
        path: 'phone-bind',
        name: 'phone-bind',
        component: _import('accounts/phone-bind'),
        meta: { title: '手机号绑定' }
      },
      {
        name: 'password-reset',
        path: 'password-reset',
        component: _import('accounts/password-reset'),
        meta: { title: '忘记密码' }
      }
    ]
  },
  {
    path: '*',
    redirect: '/404'
  }
]

export default routes
