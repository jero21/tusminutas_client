<template>
  <v-card flat style="max-height: 200px" class="blue-grey lighten-5  scroll-y">
    <v-card-text>
      <v-layout row wrap>
        <v-flex :key="propiedad.id" v-for="propiedad in propiedades" xs4 md2>
          <strong>{{ propiedad.nombre_real }} : </strong> {{ getValor(item[propiedad.nombre]).toFixed(1)}}
        </v-flex>
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: ['item'],
  methods: {
    getValor (propiedad) {
      let valor = (this.item.cantidad * propiedad) / 100
      return valor
    }
  },
  computed: {
    propiedades () {
      return this.$store.getters.propiedades
    }
  }
}
</script>

