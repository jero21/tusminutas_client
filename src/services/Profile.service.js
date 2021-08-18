import ApiService from './Api.service.js'

class ProfileService extends ApiService {
  constructor (endpoint) {
    super(endpoint)
    this.name = endpoint
  }

  publishProfile (idProfile) {
    return this.getVueInstance().resource(this.url + `publish_profile/${idProfile}`).query()
  }

  unPublishProfile (idProfile) {
    return this.getVueInstance().resource(this.url + `unpublish_profile/${idProfile}`).query()
  }
}

export const profileService = new ProfileService('profile{/id}')
