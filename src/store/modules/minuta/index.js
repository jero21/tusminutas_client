import actions from './actions'
import getters from './getters'
import mutations from './mutations'

const state = {
  nombre: '',
  descripcion: '',
  id_tipo_minuta: 1,
  comidas: [
    {id: 1, nombre: 'Desayuno', alimentos: [], configuracion: [], totales: {}},
    {id: 2, nombre: 'Almuerzo', alimentos: [], configuracion: [], totales: {}},
    {id: 3, nombre: 'Once', alimentos: [], configuracion: [], totales: {}},
    {id: 4, nombre: 'Cena', alimentos: [], configuracion: [], totales: {}},
    {id: 5, nombre: 'Colación 1', alimentos: [], configuracion: [], totales: {}},
    {id: 6, nombre: 'Colación 2', alimentos: [], configuracion: [], totales: {}},
    {id: 7, nombre: 'Colación 3', alimentos: [], configuracion: [], totales: {}}
  ],
  configuracion: []
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
