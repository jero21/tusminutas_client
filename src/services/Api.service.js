import Vue from 'vue'
import VueResource from 'vue-resource'

// let url = 'https://api.tusminutas.cl/api/'
let url = 'http://localhost:8000/api/'

Vue.use(VueResource)

class ApiConnect {
  constructor (route) {
    this.url = url
    this.resource = Vue.resource(this.url + route)
  }
  getUrl () {
    return this.url
  }
  getResource () {
    return this.resource
  }
  getVueInstance () {
    return Vue
  }
  query () {
    return this.resource.query()
  }
  getById (id) {
    return this.resource.get({id})
  }
  save (model) {
    return this.resource.save(model)
  }
  update (id, model) {
    return this.resource.update({id}, model)
  }
  destroy (id) {
    return this.resource.delete({id})
  }
}

export default ApiConnect
