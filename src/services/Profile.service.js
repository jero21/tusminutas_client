import ApiService from './Api.service.js'

class ProfileService extends ApiService {
  constructor (endpoint) {
    super(endpoint)
    this.name = endpoint
  }
}

export const profileService = new ProfileService('profile{/id}')
