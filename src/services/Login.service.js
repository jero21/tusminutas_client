import ApiService from './Api.service'

class LoginService extends ApiService {
  constructor (endpoint) {
    super(endpoint)
    this.name = endpoint
  }
  authenticate (credentials) {
    return this.getResource().save(credentials)
  }
}

export const loginService = new LoginService('auth_login')
