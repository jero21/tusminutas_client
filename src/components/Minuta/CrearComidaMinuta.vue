<template>
  <section>
    <h3 v-if="isMobile">{{ comida.nombre }}</h3>
    <v-select
      :items="allAlimentos"
      :search-input.sync="search"
      v-model="select"
      label="Busca alimentos para agregar a la comida"
      item-text="nombre"
      persistent-hint
      autocomplete
      cache-items
      return-object>
    </v-select>
    <tabla-alimentos-comida :propiedades="datosTabla" ref="tablaAlimentos" :edit="true" :indexComida="indexComida" :comida="comida"></tabla-alimentos-comida>
    <v-layout row wrap>
      <v-flex xs12 md6 lg6>
        <v-expansion-panel>
          <v-expansion-panel-content>
            <div slot="header">Maximos Propiedades</div>
            <v-card>
              <v-card-text>
                <v-layout row wrap>
                  <v-flex v-if="comida.configuracion.length === 0" xs12>
                    <blockquote style="font-size:15px;" class="blockquote">
                      <v-icon small color="info">info</v-icon>
                        Aún no configuras las propiedades máximas.
                    </blockquote>
                  </v-flex>
                  <v-flex xs6 md3 lg3 v-for="(propiedadConfiguracion, index) in comida.configuracion" :key="index">
                    <v-text-field :error="totales[propiedadConfiguracion.nombre] > propiedadConfiguracion.cant_maxima" readonly :value="propiedadConfiguracion.cant_maxima" :label="propiedadConfiguracion.nombre_real" color="red"></v-text-field>
                </v-flex>
                </v-layout>
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-flex>
      <v-flex xs12 md6 lg6>
        <v-combobox
          v-model="datosTabla"
          :items="propiedades"
          item-text="nombre_real"
          item-value="nombre_real"
          label="Elije las propiedades a ver"
          chips
          multiple>
        </v-combobox>
      </v-flex>
    </v-layout>
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
      isMobile: false,
      menu: false,
      datosTabla: [
        {nombre_real: 'Humedad', text: 'Humedad (%)', value: 'humedad', align: 'left', unidad_medida: '%', sortable: false},
        {nombre_real: 'Energía', text: 'Energía (kcal)', value: 'energia', align: 'left', unidad_medida: 'cal', sortable: false}
      ]
    }
  },
  props: ['indexComida', 'comida'],
  components: {TablaAlimentosComida, Totales},
  methods: {
    remove (item) {
      this.datosTabla.splice(this.datosTabla.indexOf(item), 1)
      this.datosTabla = [...this.datosTabla]
    }
  },
  created () {
    this.isMobile = window.innerWidth < 950
  },
  computed: {
    allAlimentos () {
      return this.$store.getters.allAlimentos
    },
    totales () {
      return this.$store.getters['minuta/totalComida'](this.indexComida)
    },
    propiedades () {
      let propiedades = JSON.parse(JSON.stringify(this.$store.getters.propiedades))
      propiedades.forEach(propiedad => {
        propiedad.text = propiedad.nombre_real
        propiedad.value = propiedad.nombre
        propiedad.unidad_medida = propiedad.unidad_medida
        propiedad.align = 'left'
        propiedad.sortable = false
      })
      return propiedades
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
