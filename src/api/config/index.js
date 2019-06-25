export const ERR_OK = 0

export const DEV = process.env.NODE_ENV !== 'production'
// 本地调试完改回这个
export const HOST = DEV ? 'http://121.35.249.14:9003' : window.HOST_URL

// export const HOST = DEV ? 'http://10.1.2.3:9003' : window.HOST_URL  // 彭峰本地
// export const HOST = DEV ? 'http://192.168.1.26:9003' : window.HOST_URL
// export const HOST = DEV ? 'http://10.1.5.126:9003' : window.HOST_URL

export const KEY_USER_INFO = 'userInfo'

export const KEY_SESSION_INFO = 'userSessionInfo'
