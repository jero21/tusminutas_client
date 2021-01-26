import ApiService from './Api.service.js'

class MinutaService extends ApiService {
  constructor (endpoint) {
    super(endpoint)
    this.name = endpoint
  }

  getByUuid (uuid) {
    let resource = this.getVueInstance().resource(this.url + 'show_minuta_cliente{/uuid}')
    return resource.get({uuid})
  }

  updatePatient (data) {
    let resource = this.getVueInstance().resource(this.url + 'minuta_cliente')
    return resource.save(data)
  }
}

export const minutaService = new MinutaService('minutas{/id}')
