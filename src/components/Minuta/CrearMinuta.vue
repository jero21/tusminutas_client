<template>
  <v-layout row wrap>
      <v-flex xs12 >
      <v-expansion-panel>
        <v-expansion-panel-content>
          <div slot="header">TOTALES</div>
          <v-card>
            <v-card-text>
              <strong>Cantidad : </strong> {{ totalCantidad }}
            </v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-flex>
    <v-flex xs12>
      <v-stepper value="1">
        <v-stepper-header>
          <template v-for="(comida, indexComida) in comidas">
            <v-stepper-step editable :key="`${comida.id}-step`" :step="indexComida + 1">{{ comida.nombre }}</v-stepper-step>
            <v-divider v-if="indexComida < comidas.length - 1" :key="comida.id"></v-divider>
          </template>
        </v-stepper-header>
        <v-stepper-items>
          <v-stepper-content v-for="(comida, indexComida) in comidas" :key="comida.id" :step="indexComida + 1">
            <crear-comida-minuta :alimentosComida="comida.alimentosMinuta" :totales.sync="comida.totales"></crear-comida-minuta>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-flex>
    <v-flex offset-xs10 xs2>
      <v-btn color="primary">Guardar</v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import CrearComidaMinuta from '@/components/Minuta/CrearComidaMinuta'

let totales = {cantidad: 0, humedad: 0, energia: 0, proteinas: 0, carbohidratos: 0}

export default {
  data () {
    return {
      comidas: [
        {id: 1, nombre: 'Desayuno', alimentosMinuta: [], totales: totales},
        {id: 2, nombre: 'Almuerzo', alimentosMinuta: [], totales: totales},
        {id: 3, nombre: 'Once', alimentosMinuta: [], totales: totales},
        {id: 4, nombre: 'Cena', alimentosMinuta: [], totales: totales},
        {id: 5, nombre: 'Colación 1', alimentosMinuta: [], totales: totales},
        {id: 6, nombre: 'Colación 2', alimentosMinuta: [], totales: totales}
      ]
    }
  },
  components: {
    CrearComidaMinuta
  },
  methods: {
  },
  computed: {
    totalCantidad () {
      let total = 0
      this.comidas.forEach(comida => {
        comida.alimentosMinuta.forEach(alimento => {
          total += alimento.cantidad
        })
      })
      return total
    }
  }
}
</script>

<style scoped>
  .input-cantidad {
    margin: 0 !important; 
    width: 70px;
  }

  .stepper__content {
    padding: 16px;
  }
</style>


