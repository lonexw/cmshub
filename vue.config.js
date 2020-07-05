// vue.config.js
const AliOssPlugin = require("webpack-oss")
const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV)
const format = AliOssPlugin.getFormat()

const vueConfig = {
  publicPath: IS_PROD ? `${process.env.VUE_APP_PUBLIC_PATH}/${format}` : "/",
  configureWebpack: config => {
    const plugins = []
    if (IS_PROD) {
      plugins.push(
        new AliOssPlugin({
          accessKeyId: process.env.ACCESS_KEY_ID,
          accessKeySecret: process.env.ACCESS_KEY_SECRET,
          region: process.env.REGION,
          bucket: process.env.BUCKET,
          prefix: process.env.PREFIX,
          exclude: /.*\.html$/,
          format
        })
      )
    }
    config.plugins = [...config.plugins, ...plugins]
  },
  // 支持 gql 文件
  chainWebpack: config => {
    config.module
      .rule('graphql')
      .test(/\.(graphql|gql)$/)
      .use('graphql-tag/loader')
      .loader('graphql-tag/loader')
      .end()
  },
  devServer: {
    // development server port 8000
    port: 8080,
    // If you want to turn on the proxy, please remove the mockjs /src/main.jsL11
    proxy: {
      '/graphql': {
        // target: 'http://cmshub-server.test/',
        target: 'http://cmshub-server.yousails-project.com',
        ws: false,
        changeOrigin: true
      }
    }
  },
  productionSourceMap: false
}

module.exports = vueConfig
