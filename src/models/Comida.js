export default class Comida {
  constructor (id, nombre) {
    this.id = id
    this.nombre = nombre
    this.alimentos = []
    this.configuracion = []
    this.totales = {}
  }
}
