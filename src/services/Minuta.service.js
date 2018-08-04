import ApiService from './Api.service.js'

class MinutaService extends ApiService {
  constructor (endpoint) {
    super(endpoint)
    this.name = endpoint
  }
}

export const minutaService = new MinutaService('minutas{/id}')
