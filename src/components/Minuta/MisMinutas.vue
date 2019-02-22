<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex v-for="minuta in minutas" :key="minuta.id" xs12 md4>
        <v-card>
          <v-toolbar color="orange" dark>
            <v-toolbar-title> {{ minuta.nombre }} </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="dialog = true; minutaEliminacion = minuta">
              <v-icon color="red">delete</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text>
            <v-flex xs12>
              <v-text-field :rows="2" multi-line readonly :value="minuta.descripcion || ''" label="Descripción" color="orange"></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field readonly :value="moment(minuta.created_at).format('DD-MM-YYYY')" label="Fecha de Creación" color="orange"></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-btn @click="goTo('ver-minuta', {id: minuta.id})" dark block color="orange">Ver Minuta</v-btn>
            </v-flex>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <!-- Dialog Eliminacion -->
    <v-dialog v-model="dialog" persistent max-width="300px">
      <v-card>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">Eliminar Minuta</h3>
              <div>Esta seguro(a) de eliminar la minuta {{ minutaEliminacion.nombre }}</div>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn @click="borrarMinuta(minutaEliminacion.id)" outline color="red">Confirmar</v-btn>
            <v-btn @click="dialog = false" outline flat>Cancelar</v-btn>
          </v-card-actions>
        </v-card>
    </v-dialog>
    <!-- Snackbar de notificaciones -->
    <v-snackbar
      v-model="snackbar.show"
      :color="snackbar.color"
      right
      :timeout="4000"
      top
    >
      {{ snackbar.message }}
     <v-btn flat icon color="white" @click="snackbar.show = false">
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
import { minutaService } from '@/services/Minuta.service'
export default {
  data () {
    return {
      minutas: [],
      minutaEliminacion: {},
      snackbar: {
        show: false,
        color: '',
        message: ''
      },
      dialog: false
    }
  },
  methods: {
    goTo (ruta, params) {
      this.$router.push({name: ruta, params: params})
    },
    borrarMinuta (id) {
      let vm = this
      minutaService.destroy(id).then(response => {
        vm.cargarMinutas()
        vm.dialog = false
        vm.showSnackbar('Minuta borrada correctamente', 'green')
      })
    },
    cargarMinutas () {
      let vm = this
      minutaService.query().then(data => {
        vm.minutas = data.body
      }, err => {
        vm.showSnackbar('Error al cargar las minutas', 'red')
        console.log(err)
      })
    },
    showSnackbar (message, color) {
      let vm = this
      vm.snackbar.message = message
      vm.snackbar.color = color
      vm.snackbar.show = true
    }
  },
  created () {
    this.cargarMinutas()
  }
}
</script>

