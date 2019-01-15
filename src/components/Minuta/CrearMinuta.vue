<template>
  <v-layout row wrap>
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
    <v-flex offset-xs10 xs2>
      <v-btn block @click="dialogGuardar = true" color="primary">Crear</v-btn>
    </v-flex>

    <dialog-guardar-minta @closeDialog="dialogGuardar = false" :dialog="dialogGuardar"></dialog-guardar-minta>
    <configuracion-minuta :configuracionMinuta="[]" @nuevaConfiguracion="nuevaConfiguracion" :dialog="dialogConfiguracion" @closeDialog="dialogConfiguracion = false" ></configuracion-minuta>


  </v-layout>
</template>

<script>
import CrearComidaMinuta from '@/components/Minuta/CrearComidaMinuta'
import DialogGuardarMinta from '@/components/Minuta/DialogGuardarMinuta'
import ConfiguracionMinuta from '@/components/Minuta/ConfiguracionMinuta'
import InformacionConfiguracionMinuta from '@/components/Minuta/InformacionConfiguracionMinuta'
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
    ...mapMultiRowFields(['comidas']),
    totalCantidad () {
      let total = 0
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


