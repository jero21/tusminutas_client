import ApiService from './Api.service.js'

class LanguageService extends ApiService {
  constructor (endpoint) {
    super(endpoint)
    this.name = endpoint
  }
}

export const languageService = new LanguageService('lenguage{/id}')
