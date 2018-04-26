import ApiService from './Api.service.js'

class AlimentoService extends ApiService {
  constructor (endpoint) {
    super(endpoint)
    this.name = endpoint
  }
}

export const alimentoService = new AlimentoService('alimentos{/id}')