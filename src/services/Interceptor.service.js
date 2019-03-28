import Credentials from '@/services/Credentials.service.js'

export default function (request, next) {
  const credentials = new Credentials()
  // console.log(credentials.getCurrentUser())
  if (request.url.includes(process.env.address.api)) {
    if (!(request.url === process.env.address.api + 'auth_login')) {
      let token = credentials.getCurrentUser().token
      request.headers.set('Authorization', `Bearer ${token}`)
    }
  }
  request.headers.set('Accept', 'application/json')
  next(response => {
    if (response.status === 401) {
      credentials.clearCredentials()
      window.location.href = (process.env.address.spa + 'login')
    }
  })
}
