import Vue from 'vue'
import Vuex from 'vuex'
import {alimentoService} from '@/services/Alimento.service'
import {alimentoNutricionistaService} from '@/services/AlimentoNutricionista.service'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    alimentos: [],
    misAlimentos: []
  },
  getters: {
    alimentos (state) {
      return state.alimentos
    },
    misAlimentos (state) {
      return state.misAlimentos
    },
    allAlimentos (state) {
      return state.alimentos.concat(state.misAlimentos)
    }
  },
  mutations: {
    setAlimentos (state, alimentos) {
      state.alimentos = alimentos
    },
    setMisAlimentos (state, misAlimentos) {
      state.misAlimentos = misAlimentos
    }
  },
  actions: {
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
    }
  }
})
