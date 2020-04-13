module.exports = {
  client: {
    service: {
      name: 'fishstudy',
      // GraphQL API 的 URL
      url: '/graphql'
    },
    // 通过扩展名选择需要处理的文件
    includes: ['src/**/*.vue', 'src/**/*.js']
  }
}
