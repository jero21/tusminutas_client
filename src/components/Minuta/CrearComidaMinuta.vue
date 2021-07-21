<template>
  <section>
    <h3 v-if="isMobile">{{ comida.nombre }}</h3>
     <v-layout row wrap>
    <v-flex xs4>
        <v-menu
        ref="menu"
        v-model="menu2"
        :close-on-content-click="false"
        :nudge-right="40"
        :return-value.sync="time"
        lazy
        transition="scale-transition"
        offset-y
        full-width
        max-width="290px"
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="comida.hour"
            :label="`Horario ${comida.nombre}`"
            prepend-icon="access_time"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-time-picker
          v-if="menu2"
          v-model="comida.hour"
          full-width
          @click:minute="$refs.menu.save(time)"
        ></v-time-picker>
      </v-menu>
      </v-flex>
      <v-flex xs8>
        <v-textarea v-model="comida.user_comments" rows="1" prepend-icon="description" :label="`Comentarios ${comida.nombre}`" color="secondary" required></v-textarea>
      </v-flex>
     </v-layout>
    <v-select
      :items="allAlimentos"
      :search-input.sync="search"
      v-model="select"
      :label="`Busca alimentos para agregar a ${comida.nombre}`"
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
                    <v-text-field :error="totales[propiedadConfiguracion.nombre] > propiedadConfiguracion.cant_maxima" readonly :value="propiedadConfiguracion.cant_maxima + propiedadConfiguracion.unidad_medida" :label="propiedadConfiguracion.nombre_real" color="red"></v-text-field>
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
      datosTabla: [],
      time: null,
      menu2: false,
      modal2: false
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
  mounted () {
    let vm = this
    vm.propiedades.forEach(propiedad => {
      // Los numeros son los ids de las propiedades por default a mostrar en la tabla
      if ([2, 3, 4, 5, 6].includes(propiedad.id)) vm.datosTabla.push(propiedad)
    })
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
        propiedad.text = `${propiedad.nombre_real} (${propiedad.unidad_medida})`
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
