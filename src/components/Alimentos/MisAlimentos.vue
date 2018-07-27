<template>
  <v-layout row wrap>
    <v-flex xs12>
      <h3 class="title">Mis Alimentos</h3>
    </v-flex>
    <v-flex xs6>
      <v-divider></v-divider>
    </v-flex>
    <v-layout row wrap>
      <v-flex xs12 md10>
      <v-data-table
      :headers="headers"
      :items="misAlimentos"
      :loading="loadingTabla"
      no-data-text="Cargando alimentos ..."
      rows-per-page-text="Datos por pagina"
      class="elevation-5"
      style="max-height: 500px !important; overflow-y: auto;">
      <template slot="items" slot-scope="props">
        <td class="text-xs-left">{{ props.item.nombre }}</td>
        <td class="text-xs-left">{{ props.item.grupo }}</td>
        <td class="text-xs-left">{{ props.item.subgrupo }}</td>
        <td class="text-xs-left">
          <v-btn fab dark small color="primary">
            <v-icon dark>visibility</v-icon>
          </v-btn>
          <v-btn fab dark small color="green">
            <v-icon dark>edit</v-icon>
          </v-btn>
          <v-btn fab dark small color="red">
            <v-icon dark>delete</v-icon>
          </v-btn>
        </td>
      </template>
    </v-data-table>
    </v-flex>
    </v-layout>

    <alimento-form :dialog="dialog" @closeDialog="dialog = false" @newAlimento="pushAlimento"></alimento-form>

    <v-btn @click="dialog = true" bottom fixed right fab dark color="primary">
      <v-icon dark>add</v-icon>
    </v-btn>
  </v-layout>
</template>

<script>
import AlimentoForm from '@/components/Alimentos/AlimentoForm'
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
      dialog: false
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
  },
  methods: {
    pushAlimento (alimento) {
      console.log(alimento)
    }
  },
  computed: {
    misAlimentos () {
      return this.$store.getters.misAlimentos
    }
  }

}
</script>

