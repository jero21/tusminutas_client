<template>
  <v-layout row wrap>
    <v-layout row wrap>
      <blockquote class="blockquote">
        <v-icon color="info">info</v-icon>
        Tus alimentos y/o comidas creadas las prodrás buscar y usar al momento
        de crear una minuta.
      </blockquote>
      <v-flex xs12 md10>
      <v-data-table
      :headers="headers"
      :items="misAlimentos"
      :loading="loadingTabla"
      no-data-text="No hay alimentos creados"
      :rows-per-page-items="[-1]"
      hide-actions
      class="elevation-5"
      style="max-height: 500px !important; overflow-y: auto;">
      <template slot="items" slot-scope="props">
        <td class="text-xs-left">{{ props.item.nombre }}</td>
        <td class="text-xs-left">{{ props.item.grupo }}</td>
        <td class="text-xs-left">{{ props.item.subgrupo }}</td>
        <td class="text-xs-left">
          <v-btn @click="verAlimento(props.item)" fab dark small color="primary">
            <v-icon dark>visibility</v-icon>
          </v-btn>
          <v-btn @click="editarAlimento(props.item)" fab dark small color="green">
            <v-icon dark>edit</v-icon>
          </v-btn>
          <v-btn @click="alimento = props.item; dialogEliminar = true" fab dark small color="red">
            <v-icon dark>delete</v-icon>
          </v-btn>
        </td>
      </template>
    </v-data-table>
    </v-flex>
    </v-layout>

    <alimento-form :dialog="dialog" :alimento="alimento" :type="formType" @closeDialog="dialog = false" @newAlimento="pushAlimento"></alimento-form>

    <v-tooltip v-model="tooltip" top>
      <template v-slot:activator="{ on }">
        <v-btn class="mx-2" v-on="on" @click="crearAlimento()" bottom fixed right fab dark color="primary">
          <v-icon dark>add</v-icon>
        </v-btn>
      </template>
      <span>Crear aquí tu alimento</span>
    </v-tooltip>

    <v-dialog v-model="dialogEliminar" persistent max-width="300px">
      <v-card>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">Eliminar Alimento</h3>
              <div>Esta seguro(a) de eliminar el alimento <strong>{{alimento.nombre}}</strong></div>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn @click="borrarAlimento(alimento.id)" outline color="red">Confirmar</v-btn>
            <v-btn @click="dialogEliminar = false" outline flat>Cancelar</v-btn>
          </v-card-actions>
        </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import AlimentoForm from '@/components/Alimentos/AlimentoForm'
import AlimentoModel from '@/models/Alimento.model'
import {alimentoNutricionistaService} from '@/services/AlimentoNutricionista.service'
export default {
  data () {
    return {
      headers: [
        {text: 'Nombre Alimenticio', value: 'nombre', align: 'left', sortable: true},
        {text: 'Grupo Alimenticio', value: 'origen', align: 'left', sortable: true},
        {text: 'Sub Grupo Alimenticio', value: 'humedad', align: 'left', sortable: true},
        {text: '', value: '', align: 'left', sortable: false}
      ],
      loadingTabla: true,
      dialog: false,
      dialogEliminar: false,
      formType: '',
      alimento: AlimentoModel,
      tooltip: false
    }
  },
  components: {AlimentoForm},
  mounted () {
    let vm = this
    vm.$store.dispatch('loadMyAlimentos').then(() => {
      vm.loadingTabla = false
    }, () => {
      vm.loadingTabla = false
    })
    setTimeout(() => {
      this.tooltip = true
    }, 1500)
  },
  methods: {
    pushAlimento (alimento) {
      console.log(alimento)
    },
    crearAlimento () {
      let vm = this
      vm.alimento = JSON.parse(JSON.stringify(AlimentoModel))
      vm.formType = 'crear'
      vm.dialog = true
    },
    verAlimento (alimento) {
      let vm = this
      vm.alimento = JSON.parse(JSON.stringify(alimento))
      vm.formType = 'ver'
      vm.dialog = true
    },
    editarAlimento (alimento) {
      let vm = this
      vm.alimento = JSON.parse(JSON.stringify(alimento))
      vm.formType = 'editar'
      vm.dialog = true
    },
    borrarAlimento (id) {
      let vm = this
      alimentoNutricionistaService.destroy(id).then(data => {
        vm.$store.dispatch('loadMyAlimentos')
        vm.dialogEliminar = false
        vm.$eventHub.$emit('showSnackBar', {message: 'Alimento eliminado correctamente', color: 'green'})
      })
    }
  },
  computed: {
    misAlimentos () {
      return this.$store.getters.misAlimentos
    }
  }

}
</script>

