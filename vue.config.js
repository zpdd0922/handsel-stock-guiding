const path = require('path')
const TransformModulesPlugin = require('webpack-transform-modules-plugin')
const PostCompilePlugin = require('webpack-post-compile-plugin')

const resolve = dir => path.join(__dirname, dir)

// 代理对象
const proxy = {
  '/dev-url': {
    target: 'http://121.35.249.14:9003',
    changeOrigin: true,
    pathRewrite: {
      '^/dev-url': ''
    }
  },
  '/dev-sec': {
    target: 'http://121.35.249.14:9011',
    changeOrigin: true,
    pathRewrite: {
      '^/dev-sec': ''
    }
  }
}

module.exports = {
  // 部署应用包时的基本 URL
  publicPath: './',
  // 生产环境构建文件的目录
  outputDir: 'dist',
  // 生成的静态资源 - 相对于 outputDir 的 目录
  assetsDir: './static',
  // 生成的 index.html 的输出路径 - 相对于 outputDir 的 目录
  indexPath: './index.html',
  productionSourceMap: false,
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
    config
      .plugin('html')
      .tap(args => {
        args[0].time = +new Date()
        return args
      })
    config.plugin('transform-modules').use(TransformModulesPlugin)
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
  },
  // css相关配置
  css: {
    // css预设器配置项
    loaderOptions: {
      stylus: {
        'resolve url': true,
        // 这里 新增 import 配置项，指向自定义主题文件
        import: [path.resolve(__dirname, './src/assets/stylus/base/theme')]
      }
    }
  },
  // dev-server 服务代理配置
  devServer: {
    open: false, // 配置自启浏览器
    host: '0.0.0.0',
    port: 8088,
    https: false,
    hotOnly: false,
    proxy: proxy // 设置代理
  }
}
