<template>
  <v-layout row wrap>
    <v-flex xs12 md8 >
      <v-menu 
        v-model="menu"
        :close-on-content-click="false"
        :nudge-width="150"
        offset-x>
        <v-btn
          slot="activator"
          color="primary"
          dark>
          Ver Configuración
        </v-btn>

        <informacion-configuracion-minuta :configuracionMinuta="minuta.configuracion"></informacion-configuracion-minuta>
        
      </v-menu>
    </v-flex>
    <v-flex xs12 md4>
      <v-btn block @click="dialogConfiguracion = true">Configuración Minuta
        <v-icon right>settings</v-icon>
      </v-btn>
    </v-flex>
    <v-flex xs12>
      <v-divider></v-divider>
    </v-flex>
    <v-flex xs12>
      <v-stepper value="1">
        <v-stepper-header>
          <template v-for="(comida, indexComida) in minuta.comidas">
            <v-stepper-step editable :key="`${comida.id}-step`" :step="indexComida + 1">{{ comida.nombre }}</v-stepper-step>
            <v-divider v-if="indexComida < minuta.comidas.length - 1" :key="comida.id"></v-divider>
          </template>
        </v-stepper-header>
        <v-stepper-items>
          <v-stepper-content v-for="(comida, indexComida) in minuta.comidas" :key="comida.id" :step="indexComida + 1">
            <crear-comida-minuta :alimentosComida="comida.alimentosMinuta" :configuracion="minuta.configuracion_platos[indexComida].configuracion" :totales.sync="comida.totales"></crear-comida-minuta>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-flex>
    <v-flex offset-xs10 xs2>
      <v-btn block @click="dialogGuardar = true" color="primary">Crear</v-btn>
    </v-flex>

    <dialog-guardar-minta :minuta="minuta" @closeDialog="dialogGuardar = false" :dialog="dialogGuardar"></dialog-guardar-minta>
    <configuracion-minuta :configuracionMinuta="minuta.configuracion" @nuevaConfiguracion="nuevaConfiguracion" :dialog="dialogConfiguracion" @closeDialog="dialogConfiguracion = false" ></configuracion-minuta>


  </v-layout>
</template>

<script>
import CrearComidaMinuta from '@/components/Minuta/CrearComidaMinuta'
import DialogGuardarMinta from '@/components/Minuta/DialogGuardarMinuta'
import ConfiguracionMinuta from '@/components/Minuta/ConfiguracionMinuta'
import InformacionConfiguracionMinuta from '@/components/Minuta/InformacionConfiguracionMinuta'

let totales = {cantidad: 0, humedad: 0, energia: 0, proteinas: 0, carbohidratos: 0}
let comidas = [
  {id: 1, nombre: 'Desayuno', alimentosMinuta: [], totales: totales},
  {id: 2, nombre: 'Almuerzo', alimentosMinuta: [], totales: totales},
  {id: 3, nombre: 'Once', alimentosMinuta: [], totales: totales},
  {id: 4, nombre: 'Cena', alimentosMinuta: [], totales: totales},
  {id: 5, nombre: 'Colación 1', alimentosMinuta: [], totales: totales},
  {id: 6, nombre: 'Colación 2', alimentosMinuta: [], totales: totales},
  {id: 7, nombre: 'Colación 3', alimentosMinuta: [], totales: totales}
]

export default {
  data () {
    return {
      minuta: {
        nombre: '',
        descripcion: '',
        id_tipo_minuta: 1,
        comidas: comidas,
        configuracion: [],
        configuracion_platos: [
          {id_tipo_comida: 1, configuracion: []},
          {id_tipo_comida: 2, configuracion: []},
          {id_tipo_comida: 3, configuracion: []},
          {id_tipo_comida: 4, configuracion: []},
          {id_tipo_comida: 5, configuracion: []},
          {id_tipo_comida: 6, configuracion: []},
          {id_tipo_comida: 7, configuracion: []}
        ]
      },
      dialogGuardar: false,
      dialogConfiguracion: false,
      menu: false
    }
  },
  components: {
    CrearComidaMinuta,
    DialogGuardarMinta,
    ConfiguracionMinuta,
    InformacionConfiguracionMinuta
  },
  methods: {
    nuevaConfiguracion (configuracion, configuracionPorPlato) {
      this.minuta.configuracion = configuracion
      this.minuta.configuracion_platos = configuracionPorPlato
    }
  },
  computed: {
    totalCantidad () {
      let total = 0
      this.minuta.comidas.forEach(comida => {
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


