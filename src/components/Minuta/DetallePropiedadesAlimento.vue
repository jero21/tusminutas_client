<template>
  <v-card flat style="max-height: 200px" class="blue-grey lighten-5  scroll-y">
    <v-card-text>
      <v-layout row wrap>
        <v-flex :key="propiedad.id" v-for="propiedad in propiedades" xs4 md2>
          <strong :class="{'red--text':propiedadSuperaConfiguracion(propiedad.nombre) }">{{ propiedad.nombre_real }} : </strong> {{ getValor(item[propiedad.nombre]).toFixed(1)}} {{ propiedad.unidad_medida }}
        </v-flex>
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: ['item', 'comida', 'totales'],
  methods: {
    getValor (propiedad) {
      let valor = (this.item.cantidad * propiedad) / 100
      return valor
    },
    propiedadSuperaConfiguracion (propiedad) {
      let superaMaximo = false
      this.comida.configuracion.forEach(propiedadConfiguracion => {
        if (propiedad === propiedadConfiguracion.nombre) {
          if (this.totales[propiedad] > propiedadConfiguracion.cant_maxima) superaMaximo = true
        }
      })
      return superaMaximo
    }
  },
  computed: {
    propiedades () {
      console.log(this.$store.getters.propiedades)
      return this.$store.getters.propiedades
    }
  }
}
</script>

