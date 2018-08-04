import ApiService from './Api.service.js'

class PropiedadService extends ApiService {
  constructor (endpoint) {
    super(endpoint)
    this.name = endpoint
  }
}

export const propiedadService = new PropiedadService('propiedad{/id}')
