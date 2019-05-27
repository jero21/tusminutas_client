import { updateField } from 'vuex-map-fields'
import Minuta from '../../../models/Minuta'

export default {
  updateField,
  limpiarMinuta (state) {
    Object.assign(state, new Minuta())
  },
  agregarInformacionMinuta (state, {nombre, descripcion}) {
    state.nombre = nombre
    state.descripcion = descripcion
  },
  agregarAlimento (state, {alimento, indexComida}) {
    state.comidas[indexComida].alimentos.push(alimento)
  },
  actualizarCantidad (state, {value, indexComida, index}) {
    state.comidas[indexComida].alimentos[index].cantidad = value
  },
  actualizarConfiguracion (state, configuracion) {
    state.configuracion = configuracion
  },
  actualizarConfiguracionComida (state, {indexComida, configuracionComida}) {
    state.comidas[indexComida].configuracion = configuracionComida
  },
  agregarTotalesComida (state, {indexComida, totales}) {
    state.comidas[indexComida].totales = totales
  },
  eliminarAlimentoComida (state, {indexComida, indexAlimento}) {
    state.comidas[indexComida].alimentos.splice(indexAlimento, 1)
  }
}
