export default {
  agregarInformacionMinuta ({commit}, minuta) {
    commit('agregarInformacionMinuta', minuta)
  },
  agregarAlimentoEnComida ({commit}, {alimento, indexComida}) {
    alimento.cantidad = 100
    commit('agregarAlimento', {alimento, indexComida})
  },
  actualizarTotalesComida ({state, commit}, indexComida) {
    let totales = {}
    state.comidas[indexComida].alimentos.forEach(alimento => {
      totales.cantidad += alimento.cantidad
    })
    commit('agregarTotalesComida', {indexComida, totales})
  },
  agregarConfiguracionComida ({state, commit}, comidas) {
    comidas.forEach((comida, indexComida) => {
      let configuracionComida = comida.configuracion
      commit('actualizarConfiguracionComida', {configuracionComida, indexComida})
    })
  }
}
