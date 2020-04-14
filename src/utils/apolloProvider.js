import VueApollo from 'vue-apollo'
import { InMemoryCache } from 'apollo-cache-inmemory'
import ApolloClient from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { onError } from 'apollo-link-error'
import Vue from 'vue'
import { ACCESS_TOKEN } from '@/store/mutation-types'

// Error Handling
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) =>
      console.log('[GraphQL error]: Message:' + message + ', Location: ' + locations + ', Path:' + path)
    )
    return graphQLErrors[0].message
  }
    
  if (networkError) console.log(`[Network error]: ${networkError}`)
})

// const setAuthorizationLink = setContext(() => ({
//   headers: {authorization: 'Bearer 1234'}
// }));

const authLink = setContext(() => {
  // get the authentication token from local storage if it exists
  const token = Vue.ls.get(ACCESS_TOKEN)
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

const link = new HttpLink({
  uri: '/graphql'
})

const apolloClient = new ApolloClient({
  // 你需要在这里使用绝对路径
  link: HttpLink.from([authLink, errorLink, link]),
  cache: new InMemoryCache()
})

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})

export default apolloProvider
