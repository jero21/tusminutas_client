import Comida from './Comida'

export default class Minuta {
  constructor () {
    this.nombre = ''
    this.descripcion = ''
    this.id_tipo_minuta = 1
    this.configuracion = []
    this.comidas = [
      new Comida(1, 'Desayuno'),
      new Comida(2, 'Almuerzo'),
      new Comida(3, 'Once'),
      new Comida(4, 'Cena'),
      new Comida(5, 'Colación 1'),
      new Comida(6, 'Colación 2'),
      new Comida(7, 'Colación 3')
    ]
  }

  esNueva () {
    let tieneAlimentos = false
    let tieneConfiguracion = this.configuracion.length !== 0
    this.comidas.forEach(comida => {
      if (comida.alimentos.length !== 0) tieneAlimentos = true
    })
    return this.nombre === '' && this.descripcion === '' && !tieneConfiguracion && !tieneAlimentos
  }
}
