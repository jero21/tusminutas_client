import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)

class ApiConnect {
  constructor (route) {
    // this.resource = Vue.resource('https://api.tusminutas.cl/api/' + route)
    this.resource = Vue.resource('http://localhost:8000/api/' + route)
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
