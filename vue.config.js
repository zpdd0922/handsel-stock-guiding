const path = require('path')
const DEV = process.env.NODE_ENV !== 'production'
const webpackDevConf = require('./build/webpack.dev.conf')
const webpackProdConf = require('./build/webpack.prod.conf')
const TransformModulesPlugin = require('webpack-transform-modules-plugin')
const PostCompilePlugin = require('webpack-post-compile-plugin')

const resolve = dir => path.join(__dirname, dir)

let proxy = {}
const prefixs = ['/capt', '/user_api']

// const target = 'http://10.1.5.126:9003' // 开发服务器

const target = 'http://121.35.249.14:9003' // 测试服务器

// const target = 'http://10.1.2.3:9003' // 彭峰

const changeOrigin = true

prefixs.forEach(key => {
  proxy[key] = { target, changeOrigin }
})

module.exports = {
  // outputDir: 'dist',
  // productionSourceMap: false,

  // 部署应用包时的基本 URL
  baseUrl: './',
  // 生产环境构建文件的目录
  outputDir: 'dist',
  // 生成的静态资源 - 相对于 outputDir 的 目录
  assetsDir: './static',
  // 生成的 index.html 的输出路径 - 相对于 outputDir 的 目录
  indexPath: './index.html',
  chainWebpack: config => {
    // 修改插件
    const conf = config.toConfig()
    // 自定义cube-ui样式
    config.plugin('post-compile').use(PostCompilePlugin, [
      {
        config: {
          module: {
            rules: [...conf.module.rules]
          }
        }
      }
    ])

    config.plugin('transform-modules').use(TransformModulesPlugin)

    config.resolve.alias
      .set('@', resolve('src'))
      .set('common', resolve('src/common'))
  },
  configureWebpack: () => {
    // 根据Node变量环境返回对应的自定义配置来合并config
    return DEV ? webpackDevConf : webpackProdConf
  },
  // css相关配置
  css: {
    // css预设器配置项
    loaderOptions: {
      stylus: {
        'resolve url': true,
        // 这里 新增 import 配置项，指向自定义主题文件
        import: [path.resolve(__dirname, './src/common/stylus/theme')]
      }
    }
  },
  // dev-server 服务代理配置
  devServer: {
    open: false, // 配置自启浏览器
    host: '0.0.0.0',
    port: 8089,
    https: false,
    hotOnly: false,
    proxy, // 设置代理
    // proxy:'http://localhost:3000',
    before: () => {
      // `app` 是一个 express 实例
    }
  }
}
