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
  props: ['configuracionMinuta']
}
</script>

<style scoped>
  .container {
    padding: 5px;
  }
</style>


