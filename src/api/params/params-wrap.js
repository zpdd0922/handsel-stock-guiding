import auth from '@/utils/auth'

// api接口公用参数
const WRAP = (data = {}) => ({
  id: '1460807082451000167',
  sign: 'b97RhZF5d/w94qsQDgJJROF6XQs=',
  version: '1.0',
  requestSrc: auth.getDevice(),
  params: {
    sessionId: auth.getAuthToken(),
    ...data
  }
})

// 接口数据包裹层
const COMMON = (data = {}) => ({
  requestSrc: auth.getDevice(),
  params: {
    sessionId: auth.getAuthToken(),
    ...data
  }
})

// 查询开户状态
const CHECK = () => ({
  requestSrc: auth.getDevice(),
  sessionId: auth.getAuthToken()
})

// 更新/绑定 手机号
const PHONE = (data = {}) => ({
  requestSrc: auth.getDevice(),
  sessionId: auth.getAuthToken(),
  ...data
})

export default {
  WRAP,
  COMMON,
  CHECK,
  PHONE
}
