import Vue from 'vue'
import Router from 'vue-router'
import MinutaApp from '@/components/App/MinutaApp'
import MisMinutas from '@/components/Minuta/MisMinutas'
import VerMinuta from '@/components/Minuta/VerMinuta'
import CrearMinuta from '@/components/Minuta/CrearMinuta'
import TablaComposicion from '@/components/TablaComposicion/TablaComposicion'
import MisAlimentos from '@/components/Alimentos/MisAlimentos'
import Login from '@/components/App/Login'
import VerMinutaPublic from '@/components/Minuta/VerMinutaPublic'

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
          name: 'Mis Minutas',
          component: MisMinutas
        },
        {
          path: 'minutas/:id',
          name: 'Ver Minuta',
          component: VerMinuta
        },
        {
          path: 'crear-minuta',
          name: 'Crear Minuta',
          component: CrearMinuta
        },
        {
          path: 'tabla-composicion',
          name: 'Tabla de Composicion',
          component: TablaComposicion
        },
        {
          path: 'mis-alimentos',
          name: 'Mis Alimentos',
          component: MisAlimentos
        }
      ]
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/share/:code',
      component: VerMinutaPublic
    }
  ]
})

router.beforeEach((to, from, next) => {
  credentials.isLogin()
  if (credentials.isLogin()) {
    if (to.path === '/login') next({path: '/minutas'})
    else next()
  } else {
    if (to.path === '/login') next()
    if (to.path.indexOf('/share') !== -1) next()
    else next({path: '/login'})
  }
})

export default router
