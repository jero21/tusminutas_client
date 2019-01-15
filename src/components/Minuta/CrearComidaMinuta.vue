<template>
  <section>
    <v-select
      :items="allAlimentos"
      :search-input.sync="search"
      v-model="select"
      label="Busca tus Alimentos"
      item-text="nombre"
      persistent-hint
      autocomplete
      cache-items
      return-object>
    </v-select>
    <v-flex xs12>
      <v-expansion-panel>
        <v-expansion-panel-content>
          <div slot="header">Configuración</div>
          <v-card>
            <v-card-text>
              <v-layout row wrap>
                <v-flex xs6 md3 lg3 v-for="(propiedadConfiguracion, index) in comida.configuracion" :key="index">
                  <v-text-field :error="totales[propiedadConfiguracion.nombre] > propiedadConfiguracion.cant_maxima" readonly :value="propiedadConfiguracion.cant_maxima" :label="propiedadConfiguracion.nombre_real" color="red"></v-text-field>
              </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-flex>
    <tabla-alimentos-comida ref="tablaAlimentos" :edit="true" :indexComida="indexComida" :comida="comida"></tabla-alimentos-comida>
    <v-flex xs12>
      <v-expansion-panel>
        <v-expansion-panel-content>
          <div slot="header">Totales Comida</div>
          <totales :totales="totales"></totales>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-flex>
  </section>
</template>

<script>
import TablaAlimentosComida from '@/components/Minuta/TablaAlimentosComida'
import Totales from '@/components/Minuta/Totales'
export default {
  data () {
    return {
      select: {},
      search: '',
      menu: false
    }
  },
  props: ['indexComida', 'comida'],
  components: {TablaAlimentosComida, Totales},
  computed: {
    allAlimentos () {
      return this.$store.getters.allAlimentos
    },
    totales () {
      return this.$store.getters['minuta/totalComida'](this.indexComida)
    }
  },
  watch: {
    select (alimento) {
      if (this.search !== '') {
        let newAlimento = JSON.parse(JSON.stringify(alimento))
        let indexComida = this.indexComida
        this.$store.dispatch('minuta/agregarAlimentoEnComida', {alimento: newAlimento, indexComida})
        this.select = {}
        this.search = ''
      }
    }
  }
}
</script>

<style scoped>

</style>
