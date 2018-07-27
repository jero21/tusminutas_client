import Credentials from '@/services/Credentials.service.js'

export default function (request, next) {
  const credentials = new Credentials()
  if (request.url.includes(process.env.address.api)) request.headers.set('Authorization', 'Bearer ' + credentials.getToken())
  request.headers.set('Accept', 'application/json')
  next(response => {
    if (response.status === 401) {
      credentials.clearCredentials()
      window.location.href = (process.env.address.spa + 'login')
    }
  })
}
