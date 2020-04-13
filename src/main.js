import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueApollo from 'vue-apollo'
import _ from 'lodash'
import './core/lazy_use'
import './utils/filter'
import './permission'
import './components/global.less'
import apolloProvider from './utils/apolloProvider'

Vue.config.productionTip = false
Vue.use(VueApollo)
Vue.prototype._ = _

new Vue({
  router,
  store,
  apolloProvider,
  render: h => h(App)
}).$mount('#app')
