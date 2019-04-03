// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons/iconfont/material-icons.css'
import 'typeface-roboto/index.css'
import '@fortawesome/fontawesome-free/css/all.css'
import InterceptorApi from '@/services/Interceptor.service'
import store from '@/store/index'
import GSignInButton from 'vue-google-signin-button'
import moment from 'moment'

Vue.prototype.moment = moment
Vue.prototype.$eventHub = new Vue()
Vue.use(GSignInButton)

Vue.use(Vuetify, { theme: {
  primary: '#0097A7',
  secondary: '#00838F',
  accent: '#82B1FF',
  error: '#FF5252',
  info: '#2196F3',
  success: '#4CAF50',
  warning: '#FFC107'
}})

Vue.use(Vuetify, {
  iconfont: 'fa'
})

Vue.http.interceptors.push(InterceptorApi)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
