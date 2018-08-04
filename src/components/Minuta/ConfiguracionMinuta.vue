<template>
  <v-dialog
    v-model="dialog"
    scrollable
    persistent 
    :overlay="false"
    max-width="500px"
    transition="dialog-transition">
    <v-card>
      <v-toolbar color="primary" dark>
        <v-toolbar-title> Configuracion Minuta </v-toolbar-title>
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
                  item-text="nombre"
                  persistent-hint
                  background-color="red"
                  autocomplete
                  cache-items
                  return-object>
                </v-select>
              </v-flex>
              <v-flex xs12>
                <template v-for="(configuracion, i) in configuracionMinuta">
                  <tr :key="i">
                    <td colspan="70%">
                      <strong>Cantidad Maxima {{ configuracion.nombre}}</strong>
                    </td>
                    <td>
                      <v-text-field
                      v-model.number="configuracion.cant_maxima"
                      class="mx-3 input-cantidad"
                      type="Number">
                    </v-text-field>
                    </td>
                  </tr>
                </template>
              </v-flex>
            </v-layout>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import {propiedadService} from '@/services/Propiedad.service'

export default {
  data () {
    return {
      propiedades: [],
      search: '',
      select: {}
    }
  },
  props: ['dialog', 'configuracionMinuta'],
  mounted () {
    let vm = this
    propiedadService.query().then(data => {
      vm.propiedades = data.body
    })
  },
  methods: {
    closeDialog () {
      // this.dialog = false
      this.$emit('closeDialog')
    }
  },
  watch: {
    select (data) {
      let vm = this
      if (vm.search !== '') {
        data.cant_maxima = 0
        vm.configuracionMinuta.push(data)
        vm.select = {}
        vm.search = ''
      }
    }
  }
}
</script>

