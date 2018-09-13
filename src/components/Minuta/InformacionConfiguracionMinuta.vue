<template>
  <v-card class="container">
    <v-layout row wrap>
        <v-flex xs12 v-for="(propiedad, i) in configuracionMinuta" :key="i">
          <strong>{{ propiedad.nombre}}: </strong> {{ propiedad.cant_maxima}}
        </v-flex>
        <v-flex v-if="configuracionMinuta.length === 0"  xs12>
          <strong>No hay configuración</strong>
        </v-flex>
      </v-layout>
  </v-card>
</template>

<script>
export default {
  data () {
    return {
      propiedades: {
        a_g_omega3: {},
        a_g_omega6: {},
        a_g_trans: {},
        a_grasos_monosat: {},
        a_grasos_polisat: {},
        a_grasos_sat: {},
        acido_folico: {},
        acido_pantotenico: {},
        biotina: {},
        calcio: {},
        carbohidratos: {},
        cobre: {},
        colesterol: {},
        energia: {},
        fibra: {},
        fosforo: {},
        grasas_totales: {},
        hierro: {},
        humedad: {},
        magnesio: {},
        manganeso: {},
        potasio: {},
        proteinas: {},
        riboflavina: {},
        selenio: {},
        sodio: {},
        tiamina: {},
        yodo: {},
        zinc: {},
        vit_a: {},
        vit_b6: {},
        vit_b12: {},
        vit_c: {},
        vit_d: {},
        vit_e: {},
        vit_k: {}
      }
    }
  },
  computed: {
    configuracion () {
      let vm = this
      vm.configuracionMinuta.forEach(propiedad => {
        vm.propiedades[propiedad.nombre] = propiedad
      })
      return vm.propiedades
    }
  },
  props: ['configuracionMinuta']
}
</script>

<style scoped>
  .container {
    padding: 5px;
  }
</style>


