import { getField } from 'vuex-map-fields'

export default {
  getField,
  minutaActual (state) {
    return state
  },
  comidasMinuta (state) {
    return state.comidas
  },
  alimentosComida: (state) => (indexComida) => {
    return state.comidas[indexComida].alimentos
  },
  totalComida: (state) => (indexComida) => {
    let totales = {
      cantidad: 0,
      a_g_omega3: 0,
      a_g_omega6: 0,
      a_g_trans: 0,
      a_grasos_monosat: 0,
      a_grasos_polisat: 0,
      a_grasos_sat: 0,
      acido_folico: 0,
      acido_pantotenico: 0,
      biotina: 0,
      calcio: 0,
      carbohidratos: 0,
      cobre: 0,
      colesterol: 0,
      energia: 0,
      fibra: 0,
      fosforo: 0,
      grasas_totales: 0,
      hierro: 0,
      humedad: 0,
      magnesio: 0,
      manganeso: 0,
      potasio: 0,
      proteinas: 0,
      riboflavina: 0,
      selenio: 0,
      sodio: 0,
      tiamina: 0,
      yodo: 0,
      zinc: 0,
      vit_a: 0,
      vit_b6: 0,
      vit_b12: 0,
      vit_c: 0,
      vit_d: 0,
      vit_e: 0,
      vit_k: 0
    }
    let alimentos = state.comidas[indexComida].alimentos
    alimentos.forEach(alimento => {
      for (let propiedad in totales) {
        if (propiedad !== 'cantidad') {
          totales[propiedad] += (alimento.cantidad * alimento[propiedad] / 100)
        } else {
          totales.cantidad += alimento.cantidad
        }
      }
      /*
      totales.humedad += (alimento.cantidad * alimento.humedad) / 100
      totales.energia += (alimento.cantidad * alimento.energia) / 100
      totales.proteinas += (alimento.cantidad * alimento.proteinas) / 100
      totales.carbohidratos += (alimento.cantidad * alimento.carbohidratos) / 100
      */
    })
    return totales
  }
}
