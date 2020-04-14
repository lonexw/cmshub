import VueApollo from 'vue-apollo'
import { InMemoryCache } from 'apollo-cache-inmemory'
import ApolloClient from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { onError } from 'apollo-link-error'
import Vue from 'vue'
import store from '@/store'
import { ACCESS_TOKEN } from '@/store/mutation-types'

// Error Handling
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors = graphQLErrors.map(item => {
      // console.log(`[GraphQL error]: Message: ${item.message}, Location: ${item.locations}, Path: ${item.path}`)
      let code = item.code
      if (code == 401 && item.path != 'userLogout') {
        // 用户未登录，执行退出逻辑
        store.dispatch('Logout').finally(() => {
          setTimeout(() => {
            window.location.reload()
          }, 16)
        })
      }
    })
  }
  if (networkError) {
    networkError.message = networkError.result.errors
      ? networkError.result.errors[0].debugMessage
      : networkError.message
    // console.log(`[Network error]: ${networkError}`)
  }
})

const authLink = setContext(async (_, { headers }) => {
  // Use your async token function here:
  const token = Vue.ls.get(ACCESS_TOKEN)
  // Return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

const link = new HttpLink({
  uri: '/graphql'
})

const apolloClient = new ApolloClient({
  // 你需要在这里使用绝对路径, link的顺序不能颠倒
  link: HttpLink.from([authLink, errorLink, link]),
  cache: new InMemoryCache()
})

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})

export default apolloProvider
