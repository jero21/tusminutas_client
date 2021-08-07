import ApiService from './Api.service.js'

class SocialNetworkService extends ApiService {
  constructor (endpoint) {
    super(endpoint)
    this.name = endpoint
  }
}

export const socialNetworkService = new SocialNetworkService('type_rrss{/id}')
