
export const ERR_OK = 0

export const DEV = process.env.NODE_ENV !== 'production'
// 语言类型
export const LANG_TYPE = 'lang'
// 用户user模块9003端口
export const HOST = DEV ? '/dev-url' : window.HOST_URL
// 证券服务9011端口
export const HOST_SEC = DEV ? '/dev-sec' : window.HOST_URL_SEC

export const KEY_USER_INFO = 'userInfo'

export const KEY_SESSION_INFO = 'userSessionInfo'

export const InterFaceUrl = (url) => (HOST + url)

export const InterFaceUrl_SEC = (url) => (HOST_SEC + url)
