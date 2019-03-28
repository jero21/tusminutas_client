class CredentialsService {
  setCurrentUser (user) {
    localStorage.setItem('user', JSON.stringify(user))
  }
  getCurrentUser () {
    let user = localStorage.getItem('user')
    return JSON.parse(user)
  }
  clearCredentials () {
    localStorage.clear('user')
  }

  isLogin () {
    return localStorage.getItem('user')
  }
}

export default CredentialsService
