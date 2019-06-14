import UserAge from '@/utils/uaparser'
import { jumpUrl } from '@/native-app/native-api'

export default function handleAppOpen(url, isnew, path) {
  const obj = {
    url,
    bottomTab: false, // 是否需要底部导航栏  //仅限于首页
    backHeader: true, // 是否需要后退按钮
    isFresh: false, // 是否下拉可刷新
    elasticBorder: true, // 是否弹性边框        //针对IOS
    isCloseBtn: true, // 是否关闭按钮
    isNeedHeader: true, // 是否需要头部
    isNewPage: true
  }
  // 在APP内屏蔽是否开新窗口参数为Y时打开新窗口
  if (UserAge.isApp() && UserAge.isIOS() && isnew === 'y') {
    jumpUrl(obj)
  } else if (UserAge.isApp() && UserAge.isAndroid() && isnew === 'y') {
    // TODO: android 平台webview问题比较多，需要做相关兼容处理
    if (
      typeof window.JFNewClient === 'object' &&
      typeof window.JFNewClient.jumpUrl === 'function'
    ) {
      console.log('andorid-JFNewClient')
      jumpUrl(obj)
    } else {
      try {
        console.log('andorid-openaccount')
        window.OpenAccount.openAccount(url)
      } catch (e) {
        window.location.href = url
      }
    }
  } else {
    // 如果vue开户项目内
    if (path) {
      this.$router.push(path)
    } else {
      window.location.href = url
    }
  }
}
