<template>
  <v-layout row wrap>
    <template v-if="configuracionPrevia">
      <configuracion-previa :edit="true" :previa="previa" @saltar-configuracion="configuracionPrevia = false"></configuracion-previa>
    </template>
    <template v-else>
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
            <crear-comida-minuta :comida="comida" :indexComida="indexComida"></crear-comida-minuta>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-flex>
    <v-flex xs12 md2 lg2>
      <v-btn block @click="updateMinute()" color="primary" :loading="loading_update_btn">Guardar Cambios</v-btn>
    </v-flex>
    <v-flex xs12 md3 lg3>
      <v-btn block @click="previa = false;configuracionPrevia = true">Configuración Minuta
        <v-icon right>settings</v-icon>
      </v-btn>
    </v-flex>
    </template>
  </v-layout>
</template>

<script>
import CrearComidaMinuta from '@/components/Minuta/CrearComidaMinuta'
import ConfiguracionPrevia from '@/components/Minuta/ConfiguracionPrevia'
import {minutaService} from '@/services/Minuta.service'
import { createHelpers } from 'vuex-map-fields'

let configuracionPlato = [
  {nombre: 'Desayuno', id_tipo_comida: 1, cant_maxima: 0, configuracion: []},
  {nombre: 'Almuerzo', id_tipo_comida: 2, cant_maxima: 0, configuracion: []},
  {nombre: 'Once', id_tipo_comida: 3, cant_maxima: 0, configuracion: []},
  {nombre: 'Cena', id_tipo_comida: 4, cant_maxima: 0, configuracion: []},
  {nombre: 'Colación 1', id_tipo_comida: 5, cant_maxima: 0, configuracion: []},
  {nombre: 'Colación 2', id_tipo_comida: 6, cant_maxima: 0, configuracion: []},
  {nombre: 'Colación 3', id_tipo_comida: 7, cant_maxima: 0, configuracion: []}
]
const { mapMultiRowFields } = createHelpers({
  getterType: 'minuta/getField',
  mutationType: 'minuta/updateField'
})

export default {
  data () {
    return {
      dialogGuardar: false,
      menu: false,
      configuracionPrevia: false,
      previa: true,
      loading_update_btn: false,
      config: []
    }
  },
  components: {
    CrearComidaMinuta,
    ConfiguracionPrevia
  },
  created () {
    let vm = this
    let id = vm.$route.params.id
    vm.cargarPropiedades()
    minutaService.getById(id).then(response => {
      let minuta = response.body
      minuta.comidas = JSON.parse(minuta.comidas)
      vm.$store.commit('minuta/setMinuta', minuta)
      vm.updateConfig(minuta)
    })
  },
  mounted () {
    this.cargarPropiedades()
  },
  methods: {
    nuevaConfiguracion (configuracion, configuracionPorPlato) {
      this.minuta.configuracion = configuracion
      this.minuta.configuracion_platos = configuracionPorPlato
    },
    cargarPropiedades () {
      let vm = this
      vm.$store.dispatch('loadPropiedades').then(() => {
      }, () => {
        vm.$eventHub.$emit('showSnackBar', {message: 'Error al cargar las propiedades', color: 'red'})
      })
    },
    updateMinute () {
      let vm = this
      vm.loading_update_btn = true
      let minuteState = vm.$store.getters['minuta/minutaActual']
      let minute = JSON.parse(JSON.stringify(minuteState))
      minute.comidas = JSON.stringify(minute.comidas)
      minutaService.update(minuteState.id, minute).then(data => {
        vm.$store.commit('minuta/limpiarMinuta')
        vm.loading_update_btn = false
        vm.$router.push({path: `/minutas/${minuteState.id}`})
      }, err => {
        console.log(`error en la peticion:`)
        vm.loading_update_btn = false
        console.log(err)
      })
    },
    updateConfig (minute) {
      let vm = this
      let config = []
      minute.configuracion_minutas.forEach((propiedad) => {
        propiedad = propiedad.propiedad
        let foods = configuracionPlato
        let cantMaxima = 0
        minute.comidas.forEach((food, indexFood) => {
          food.configuracion.forEach(foodConfig => {
            if (foodConfig.nombre === propiedad.nombre) {
              foods[indexFood].cant_maxima = foodConfig.cant_maxima
              cantMaxima += foodConfig.cant_maxima
            }
          })
        })
        let newConfig = {
          id_propiedad: propiedad.id,
          nombre_real: propiedad.nombre_real,
          nombre: propiedad.nombre,
          unidad_medida: propiedad.unidad_medida,
          cant_maxima: cantMaxima,
          configuracion_platos: JSON.parse(JSON.stringify(foods))
        }
        config.push(newConfig)
      })
      console.log(config)
      vm.$store.commit('minuta/actualizarConfiguracion', config)
    }
  },
  computed: {
    ...mapMultiRowFields(['comidas'])
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