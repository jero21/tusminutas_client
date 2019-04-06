import {alimentoService} from '@/services/Alimento.service'
import {alimentoNutricionistaService} from '@/services/AlimentoNutricionista.service'
import {propiedadService} from '@/services/Propiedad.service'

const defaultState = {
  alimentos: [],
  misAlimentos: [],
  propiedades: []
}

const actions = {
  loadAlimentos (context) {
    return new Promise((resolve, reject) => {
      alimentoService.query().then(data => {
        context.commit('setAlimentos', data.body)
        resolve()
      }, err => {
        reject(err)
      })
    })
  },
  loadMyAlimentos (context) {
    return new Promise((resolve, reject) => {
      alimentoNutricionistaService.query().then(data => {
        context.commit('setMisAlimentos', data.body)
        resolve()
      }, err => {
        reject(err)
      })
    })
  },
  loadPropiedades (context) {
    return new Promise((resolve, reject) => {
      propiedadService.query().then(data => {
        context.commit('setPropiedades', data.body)
        resolve()
      }, err => reject(err))
    })
  }
}

const mutations = {
  setAlimentos (state, alimentos) {
    state.alimentos = alimentos
  },
  setMisAlimentos (state, misAlimentos) {
    state.misAlimentos = misAlimentos
  },
  setPropiedades (state, propiedades) {
    state.propiedades = propiedades
  }
}

const getters = {
  alimentos (state) {
    return state.alimentos
  },
  misAlimentos (state) {
    return state.misAlimentos
  },
  allAlimentos (state) {
    return state.alimentos.concat(state.misAlimentos)
  },
  propiedades (state) {
    return state.propiedades
  }
}

export default {
  state: defaultState,
  getters,
  actions,
  mutations
}
