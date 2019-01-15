import Vue from 'vue'
import Router from 'vue-router'
import MinutaApp from '@/components/App/MinutaApp'
import MisMinutas from '@/components/Minuta/MisMinutas'
import VerMinuta from '@/components/Minuta/VerMinuta'
import CrearMinuta from '@/components/Minuta/CrearMinuta'
import TablaComposicion from '@/components/TablaComposicion/TablaComposicion'
import MisAlimentos from '@/components/Alimentos/MisAlimentos'
import Login from '@/components/App/Login'

import Credentials from '@/services/Credentials.service.js'

const credentials = new Credentials()

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      component: MinutaApp,
      redirect: 'minutas',
      children: [
        {
          path: 'minutas',
          name: 'mis-minutas',
          component: MisMinutas
        },
        {
          path: 'minutas/:id',
          name: 'ver-minuta',
          component: VerMinuta
        },
        {
          path: 'crear-minuta',
          name: 'crear-minuta',
          component: CrearMinuta
        },
        {
          path: 'tabla-composicion',
          name: 'tabla-composicion',
          component: TablaComposicion
        },
        {
          path: 'mis-alimentos',
          name: 'mis-alimentos',
          component: MisAlimentos
        }
      ]
    },
    {
      path: '/login',
      component: Login
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (credentials.isLogin()) {
    if (to.path === '/login') next({path: '/minutas'})
    else next()
  } else {
    if (to.path === '/login') next()
    else next({path: '/login'})
  }
})

export default router
