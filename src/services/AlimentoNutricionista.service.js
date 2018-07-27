import ApiService from './Api.service.js'

class AlimentoNutricionistaService extends ApiService {
  constructor (endpoint) {
    super(endpoint)
    this.name = endpoint
  }
}

export const alimentoNutricionistaService = new AlimentoNutricionistaService('alimentos_nutricionistas{/id}')
