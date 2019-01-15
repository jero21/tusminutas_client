<template>
  <v-dialog
    v-model="dialog"
    scrollable
    persistent 
    :overlay="false"
    max-width="900px"
    transition="dialog-transition">
    <v-card>
      <v-toolbar color="primary" dark>
        <v-toolbar-title> Configuración Minuta </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="closeDialog()">
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <v-container grid-list-md>
            <v-layout row wrap>
              <v-flex xs12>
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
                <v-data-table
                  id="scroll-target"
                  style="max-height: 400px"
                  :headers="headers"
                  :items="configuracion_minuta"
                  no-data-text=""
                  disable-initial-sort
                  hide-actions
                  class="elevation-3 scroll-y">
                  <template slot="items" slot-scope="props">
                    <tr class="alimento">
                      <td class="text-xs-left">{{ props.item.nombre_real }}</td>
                      <td class="text-xs-left">
                        <v-text-field
                          v-model.number="props.item.cant_maxima"
                          class="mx-3 input-cantidad"
                          type="Number"
                          flat>
                        </v-text-field>
                      </td>
                      <template v-for="(plato, index) in props.item.configuracion_platos">
                        <td class="text-xs-left" :key="index">
                        <v-text-field
                          v-model.number="plato.porcentaje"
                          class="mx-3 input-porcentaje"
                          type="Number"
                          placeholder="%"
                          flat>
                        </v-text-field>
                      </td>
                      </template>
                    </tr>
                  </template>
                </v-data-table>
              </v-flex>
              <v-flex xs12>
                <v-btn @click="guardarConfiguracion()" color="primary" block raised>Guardar</v-btn>
              </v-flex>
            </v-layout>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import {propiedadService} from '@/services/Propiedad.service'

let configuracionPlato = [
  {id_tipo_comida: 1, cant_maxima: 0, configuracion: []},
  {id_tipo_comida: 2, cant_maxima: 0, configuracion: []},
  {id_tipo_comida: 3, cant_maxima: 0, configuracion: []},
  {id_tipo_comida: 4, cant_maxima: 0, configuracion: []},
  {id_tipo_comida: 5, cant_maxima: 0, configuracion: []},
  {id_tipo_comida: 6, cant_maxima: 0, configuracion: []},
  {id_tipo_comida: 7, cant_maxima: 0, configuracion: []}
]

export default {
  data () {
    return {
      headers: [
        {text: 'Nombre', align: 'left', sortable: false},
        {text: 'Cantidad', align: 'left', sortable: false},
        {text: 'Desayuno %', align: 'left', sortable: false},
        {text: 'Almuerzo %', align: 'left', sortable: false},
        {text: 'Once %', align: 'left', sortable: false},
        {text: 'Cena %', align: 'left', sortable: false},
        {text: 'Comida 1 %', align: 'left', sortable: false},
        {text: 'Comida 2 %', align: 'left', sortable: false},
        {text: 'Comida 3 %', align: 'left', sortable: false}
      ],
      propiedades: [],
      search: '',
      select: {},
      configuracion_minuta: []
    }
  },
  props: ['dialog'],
  created () {
    let vm = this
    propiedadService.query().then(data => {
      vm.propiedades = data.body
    })
  },
  methods: {
    guardarConfiguracion () {
      let vm = this
      let configuracionPorPlato = JSON.parse(JSON.stringify(configuracionPlato))
      vm.configuracion_minuta.forEach((propiedad) => {
        propiedad.configuracion_platos.forEach((configuracion, indexComida) => {
          if (configuracion.porcentaje) {
            configuracion.cant_maxima = configuracion.porcentaje * propiedad.cant_maxima / 100
            let configuracionPlato = {
              nombre_real: propiedad.nombre_real,
              nombre: propiedad.nombre,
              cant_maxima: configuracion.cant_maxima
            }
            configuracionPorPlato[indexComida].configuracion.push(configuracionPlato)
          }
        })
      })
      vm.$store.commit('minuta/actualizarConfiguracion', vm.configuracion_minuta)
      vm.$store.dispatch('minuta/agregarConfiguracionComida', configuracionPorPlato)
      vm.closeDialog()
    },
    closeDialog () {
      // this.dialog = false
      this.$emit('closeDialog')
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


