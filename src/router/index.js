import Vue from 'vue'
import Router from 'vue-router'
import MinutaApp from '@/components/App/MinutaApp'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: MinutaApp
    }
  ]
})
