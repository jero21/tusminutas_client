<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 md6 lg6>
        <v-select
          :items="propiedades"
          :search-input.sync="search"
          v-model="select"
          label="Busca las propiedades"
          item-text="nombre_real"
          persistent-hint
          autocomplete
          cache-items
          return-object>
        </v-select>
      </v-flex>
        <v-flex xs12>
          <v-data-iterator
            :items="configuracion_minuta"
            :rows-per-page-items="[-1]"
            :pagination.sync="pagination"
            content-tag="v-layout"
            no-data-text=""
            row
            wrap
            hide-actions>
            <template v-slot:item="props">
              <v-flex
                xs12
                md3>
                <v-card>
                  <v-card-title><h4>{{ props.item.nombre_real }}</h4></v-card-title>
                  <v-divider></v-divider>
                  <v-list dense>
                    <v-list-tile :key="index" v-for="(plato, index) in props.item.configuracion_platos">
                      <v-list-tile-content>{{ plato.nombre }}</v-list-tile-content>
                      <v-list-tile-content class="align-end">
                        <v-text-field
                          v-model.number="plato.cant_maxima"
                          class="mx-3 input-porcentaje"
                          type="Number"
                          placeholder="gr"
                          flat>
                        </v-text-field>
                      </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile>
                      <v-list-tile-content>
                        <v-btn @click="eliminarAlimento(props.index)"  outline color="red" dark>Eliminar</v-btn>
                      </v-list-tile-content>
                    </v-list-tile>
                  </v-list>
                </v-card>
              </v-flex>
            </template>
          </v-data-iterator>
              </v-flex>
              <!-- <v-flex xs12>
                <v-btn @click="guardarConfiguracion()" color="primary" block raised>Guardar</v-btn>
              </v-flex> -->
            </v-layout>
        </v-container>
</template>

<script>

let configuracionPlato = [
  {nombre: 'Desayuno', id_tipo_comida: 1, cant_maxima: 0, configuracion: []},
  {nombre: 'Almuerzo', id_tipo_comida: 2, cant_maxima: 0, configuracion: []},
  {nombre: 'Once', id_tipo_comida: 3, cant_maxima: 0, configuracion: []},
  {nombre: 'Cena', id_tipo_comida: 4, cant_maxima: 0, configuracion: []},
  {nombre: 'Colación 1', id_tipo_comida: 5, cant_maxima: 0, configuracion: []},
  {nombre: 'Colación 2', id_tipo_comida: 6, cant_maxima: 0, configuracion: []},
  {nombre: 'Colación 3', id_tipo_comida: 7, cant_maxima: 0, configuracion: []}
]

export default {
  data () {
    return {
      search: '',
      select: {},
      configuracion_minuta: [],
      pagination: {
        rowsPerPage: -1
      }
    }
  },
  props: ['dialog'],
  methods: {
    guardarConfiguracion () {
      let vm = this
      let configuracionPorPlato = JSON.parse(JSON.stringify(configuracionPlato))
      vm.configuracion_minuta.forEach((propiedad) => {
        let cantMaxima = 0
        propiedad.configuracion_platos.forEach((configuracion, indexComida) => {
          if (configuracion.cant_maxima) {
            let configuracionPlato = {
              nombre_real: propiedad.nombre_real,
              nombre: propiedad.nombre,
              cant_maxima: configuracion.cant_maxima
            }
            cantMaxima += configuracion.cant_maxima
            configuracionPorPlato[indexComida].configuracion.push(configuracionPlato)
          }
        })
        propiedad.cant_maxima = cantMaxima
      })
      vm.$store.commit('minuta/actualizarConfiguracion', vm.configuracion_minuta)
      vm.$store.dispatch('minuta/agregarConfiguracionComida', configuracionPorPlato)
      vm.closeDialog()
    },
    closeDialog () {
      // this.dialog = false
      this.$emit('closeDialog')
    },
    eliminarAlimento (index) {
      this.configuracion_minuta.splice(index, 1)
    }
  },
  computed: {
    propiedades () {
      return this.$store.getters.propiedades
    }
  },
  watch: {
    select (data) {
      let vm = this
      if (vm.search !== '') {
        let configuracion = {
          id_propiedad: data.id,
          nombre_real: data.nombre_real,
          nombre: data.nombre,
          cant_maxima: 0,
          configuracion_platos: JSON.parse(JSON.stringify(configuracionPlato))
        }
        vm.configuracion_minuta.push(configuracion)
        vm.select = {}
        vm.search = ''
      }
    }
  }
}
</script>

<style scoped>
  .card__text {
    padding: 7px;
  }

  .input-cantidad {
    margin: 0 !important; 
    padding: 0;
    width: 60px;
    max-height: 40px;
  }

  .input-porcentaje {
    margin: 0 !important; 
    padding: 0;
    width: 50px;
    max-height: 40px;
  }
</style>