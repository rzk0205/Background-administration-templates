const { defineConfig } = require('@vue/cli-service')
const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: true,
  chainWebpack(config) {
    // 设置 svg-sprite-loader
    config.module.rule('svg').exclude.add(resolve('src/icons')).end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  },
  // vue项目打包之后在本地打开是白屏问题
  publicPath: './',
  // 服务器进行配置
  devServer: {
    host: 'localhost', //可以忽略不写
    port: 9999, //它是用来修改你打开后的端口号的
    https: false, // 配置是否开启https协议
    open: false, //值为 true的话，项目启动时自动打开到浏览器里边， false不会打开
    proxy: {
      // /dev-api 代理名称, 请求的时候请求dev-api 就相当于是请求http://localhost:9999
      // 对象里面的属性名如果是一个变量，那么我们需要通过中括号进行输入
      [process.env.VUE_APP_BASE_API]: {
        // 开发阶段 代理名称是 /dev-api  生产环境阶段 /pro-api
        target: process.env.VUE_APP_SERVICE_URL, //跨域请求的公共地址
        changeOrigin: true, //是否开启跨域，值为 true 就是开启， false 不开启
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: '' //注册全局路径， 但是在你请求的时候前面需要加上
        }
      }
    }
  }
  // 关闭eslint语法检测
  // lintOnSave: true,
  // 打包时不会生成 .map 文件，加快打包速度
  // productionSourceMap: false
})
