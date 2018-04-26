import Vue from 'vue'
import Router from 'vue-router'
import MinutaApp from '@/components/App/MinutaApp'
import MisMinutas from '@/components/Minuta/MisMinutas'
import TablaComposicion from '@/components/TablaComposicion/TablaComposicion'

Vue.use(Router)

export default new Router({
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
          path: 'tabla-composicion',
          name: 'Tabla de Composición',
          component: TablaComposicion
        }
      ]
    }
  ]
})
