import VueApollo from 'vue-apollo'
import ApolloClient from 'apollo-boost'
// import { HttpLink } from 'apollo-link-http'
// import { onError } from 'apollo-link-error'

// const httpLink = new HttpLink({
//   uri: process.env.VUE_APP_GRAPHQL_ENDPOINT
// })

// // Error Handling
// const errorLink = onError(({ graphQLErrors, networkError }) => {
//   if (graphQLErrors)
//       graphQLErrors.map(({ message, locations, path }) =>
//           console.log('[GraphQL error1111]: Message:' + message + ', Location: ' + locations + ', Path:' + path)
//       )
//   if (networkError) console.log('[Network error]: ${networkError}')
// })

const apolloClient = new ApolloClient({
  // 你需要在这里使用绝对路径
  uri: '/graphql'
  // link: errorLink.concat(httpLink),
})
const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})

export default apolloProvider
