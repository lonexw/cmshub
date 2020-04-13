import VueApollo from 'vue-apollo'
import ApolloClient from 'apollo-boost'

const apolloClient = new ApolloClient({
  // 你需要在这里使用绝对路径
  uri: '/graphql'
})
const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})

export default apolloProvider
