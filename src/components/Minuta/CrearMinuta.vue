<template>
  <v-layout row wrap>
    <template v-if="configuracionPrevia">
      <configuracion-previa :previa="previa" @saltar-configuracion="configuracionPrevia = false"></configuracion-previa>
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
      <v-btn block @click="dialogGuardar = true" color="primary">Guardar Minuta</v-btn>
    </v-flex>
    <v-flex xs12 md3 lg3>
      <v-btn block @click="previa = false;configuracionPrevia = true">Configuración Minuta
        <v-icon right>settings</v-icon>
      </v-btn>
    </v-flex>
    <dialog-guardar-minta @closeDialog="dialogGuardar = false" :dialog="dialogGuardar"></dialog-guardar-minta>
    <configuracion-minuta :configuracionMinuta="[]" @nuevaConfiguracion="nuevaConfiguracion" :dialog="dialogConfiguracion" @closeDialog="dialogConfiguracion = false" ></configuracion-minuta>
    </template>
  </v-layout>
</template>

<script>
import CrearComidaMinuta from '@/components/Minuta/CrearComidaMinuta'
import DialogGuardarMinta from '@/components/Minuta/DialogGuardarMinuta'
import ConfiguracionMinuta from '@/components/Minuta/ConfiguracionMinuta'
import ConfiguracionPrevia from '@/components/Minuta/ConfiguracionPrevia'
import { createHelpers } from 'vuex-map-fields'
const { mapMultiRowFields } = createHelpers({
  getterType: 'minuta/getField',
  mutationType: 'minuta/updateField'
})

export default {
  data () {
    return {
      dialogGuardar: false,
      dialogConfiguracion: false,
      menu: false,
      configuracionPrevia: true,
      previa: true
    }
  },
  components: {
    CrearComidaMinuta,
    DialogGuardarMinta,
    ConfiguracionMinuta,
    ConfiguracionPrevia
  },
  created () {
    this.$store.commit('minuta/limpiarMinuta')
    this.$store.commit('minuta/actualizarConfiguracion', [])
    console.log(this.$store.getters['minuta/configuracion'])
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


