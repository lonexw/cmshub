// vue.config.js
const vueConfig = {
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
        target: 'http://127.0.0.1:8000/',
        // target: 'http://cmshub-server.yousails-project.com',
        ws: false,
        changeOrigin: true
      },
      '/api': {
        target: 'http://127.0.0.1:8000/',
        // target: 'http://cmshub-server.yousails-project.com',
        ws: false,
        changeOrigin: true
      }
    }
  }
}

module.exports = vueConfig
