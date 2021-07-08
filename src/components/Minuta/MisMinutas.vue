<template>
    <v-layout row wrap>
      <v-flex class="text-20" v-if="minutas.length === 0" xs12>
        <blockquote class="blockquote">
        <v-icon color="info">info</v-icon>
        No tienes minutas creadas.
        <a @click="goTo('crear-minuta')">
          <v-subheader>
          ¿Por qué no creas una?
        </v-subheader>
        </a> 
      </blockquote>
      </v-flex>
      <v-flex v-for="minuta in minutas" :key="minuta.id" xs12 md4>
        <v-card>
          <v-toolbar color="secondary" dark>
            <v-toolbar-title> {{ minuta.nombre }} </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-tooltip right>
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-on="on" @click="dialog = true; minutaAction = minuta">
                  <v-icon color="grey">delete</v-icon>
                </v-btn>
              </template>  
              <span>Eliminar Minuta</span>
           </v-tooltip> 
          </v-toolbar>
          <v-card-text>
            <v-flex xs12>
              <v-textarea readonly  :rows="2" :value="minuta.descripcion" label="Descripción" color="secondary"></v-textarea>
            </v-flex>
            <v-flex xs12>
              <v-text-field readonly :value="moment(minuta.created_at).format('DD-MM-YYYY')" label="Fecha de Creación" color="secondary"></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-btn @click="goTo('minutas', {id: minuta.id})" dark block color="secondary">Ver Minuta</v-btn>
            </v-flex>
            <v-flex xs12>
              <v-btn @click="goTo(`minutas/${minuta.id}/editar`, '')" dark block color="secondary">Editar Minuta</v-btn>
            </v-flex>
            <v-flex xs12>
              <v-btn @click="dialogShare = true; showMinute(minuta.id)" dark block color="blue">Compartir</v-btn>
            </v-flex>
          </v-card-text>
        </v-card>
      </v-flex>
      <!-- Dialog Eliminacion -->
    <v-dialog v-model="dialog" persistent max-width="300px">
      <v-card>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">Eliminar Minuta</h3>
              <div>Esta seguro(a) de eliminar la minuta: {{ minutaAction.nombre }}</div>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn @click="borrarMinuta(minutaAction.id)" outline color="red">Confirmar</v-btn>
            <v-btn @click="dialog = false" outline flat>Cancelar</v-btn>
          </v-card-actions>
        </v-card>
    </v-dialog>
    <!-- Dialog compartir -->
    <v-dialog v-model="dialogShare" max-width="500px">
      <v-card>
        <v-toolbar
            color="secondary"
            dark>
          <v-toolbar-title>Compartir Minuta</v-toolbar-title>
        </v-toolbar>
          <v-card-text class="text--primary">
            <v-flex xs12>
              <v-text-field v-model="patient.nombre"  label="Nombre del paciente" color="secondary"></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-textarea v-model="patient.comentario" :rows="2" label="Recomendaciones y observaciones" color="secondary"></v-textarea>
            </v-flex>
            <v-flex v-if="minutaAction.patient" xs12>
              <v-text-field v-model="link" readonly label="Enlace para compartir" color="secondary">
              </v-text-field>
              <v-btn
                block
                v-clipboard:copy="link"
                v-clipboard:success="successCopy"
                v-clipboard:error="errorCopy">Copiar enlace<v-icon right dark>content_copy</v-icon>
              </v-btn>
            </v-flex>
            <v-flex xs12>
              <v-btn @click="updatePatient(patient)" dark block color="blue">Guardar Cambios</v-btn>
            </v-flex>
          </v-card-text>
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
    </v-layout>
</template>

<script>
import { minutaService } from '@/services/Minuta.service'
export default {
  data () {
    return {
      minutas: [],
      minutaAction: {},
      snackbar: {
        show: false,
        color: '',
        message: ''
      },
      link: '',
      dialog: false,
      dialogShare: false,
      url: 'https://app.tusminutas.cl/share/',
      patient: {}
    }
  },
  methods: {
    goTo (ruta, params) {
      if (params) this.$router.push({path: `/${ruta}/${params.id}`})
      else this.$router.push({path: `/${ruta}`})
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
    },
    showMinute (id) {
      let vm = this
      minutaService.getById(id).then(response => {
        vm.minutaAction = response.body
        vm.patient = vm.minutaAction.patient ? vm.minutaAction.patient : {}
        vm.link = vm.url + vm.minutaAction.uuid
      })
    },
    updatePatient (patient) {
      let vm = this
      let data = {
        nombre: patient.nombre,
        correo: '@',
        comentario: patient.comentario,
        link_minuta: vm.minutaAction.uuid,
        id_minuta: vm.minutaAction.id
      }
      minutaService.updatePatient(data).then(response => {
        vm.showMinute(vm.minutaAction.id)
      })
    },
    successCopy (response) {
      this.showSnackbar('Enlace copiado correctamente', 'green')
    },
    errorCopy (response) {
      this.showSnackbar('Error al copiar enlace', 'red')
    }
  },
  created () {
    this.cargarMinutas()
  }
}
</script>

