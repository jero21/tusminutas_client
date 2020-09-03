import Credentials from '@/services/Credentials.service.js'
// let url = 'https://api.tusminutas.cl/api/'
let url = 'http://localhost:8000/api/'

export default function (request, next) {
  const credentials = new Credentials()
  // console.log(credentials.getCurrentUser())
  if (request.url.includes(url)) {
    if (!(request.url === url + 'auth_login')) {
      let token = credentials.getCurrentUser() ? credentials.getCurrentUser().token : ''
      request.headers.set('Authorization', `Bearer ${token}`)
    }
  }
  request.headers.set('Accept', 'application/json')
  next(response => {
    if (response.status === 401) {
      credentials.clearCredentials()
      window.location.href = (url + 'login')
    }
  })
}
