<template>
  <v-layout row wrap>
    <v-flex xs12>
      <h3 class="title">Tabla de composición química de los alimentos</h3>
    </v-flex>
    <v-flex xs12>
      <v-toolbar
      color="primary"
      dark
      tabs>
      <v-text-field
        prepend-icon="search"
        label="Busca alimentos aquí"
        v-model="buscar"
        solo-inverted
        class="mx-3"
        flat
      ></v-text-field>
      <v-tabs
        slot="extension"
        centered
        slider-color="white"
        color="transparent">
        <v-tab
          v-for="grupo in grupos"
          :key="grupo.name"
          @click="setGrupo(grupo.name)"
        >
        {{ grupo.name }}
        </v-tab>
      </v-tabs>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="items"
      rows-per-page-text="Datos por pagina"
      class="elevation-5"
      style="max-height: 500px !important; overflow-y: auto;">
      <template slot="items" slot-scope="props">
        <td class="text-xs-left">{{ props.item.nombre }}</td>
        <td class="text-xs-left">{{ props.item.origen }}</td>
        <td class="text-xs-left">{{ props.item.humedad }}</td>
        <td class="text-xs-left">{{ props.item.energia }}</td>
        <td class="text-xs-left">{{ props.item.proteinas }}</td>
        <td class="text-xs-left">{{ props.item.fibra }}</td>
        <td class="text-xs-left">{{ props.item.calcio }}</td>
      </template>
    </v-data-table>
  </v-flex>
  </v-layout>
</template>

<script>
import {alimentoService} from '@/services/Alimento.service'
export default {
  data () {
    return {
      grupos: [
        {name: 'Lact'},
        {name: 'Carnes'},
        {name: 'Cereales'},
        {name: 'Azúcar'},
        {name: 'Frut y Verd'},
        {name: 'Gras,sals y arder'},
        {name: 'Colados'},
        {name: 'Prep'},
        {name: 'Diet'},
        {name: 'Powerbars'},
        {name: 'Beb cal'},
        {name: 'Alcohol'}
      ],
      headers: [
        {text: 'Alimento', value: 'nombre', align: 'left', sortable: true},
        {text: 'Origen', value: 'origen', align: 'left', sortable: true},
        {text: 'Humedad (%)', value: 'humedad', align: 'left', sortable: true},
        {text: 'Energía (kcal)', value: 'energia', align: 'left', sortable: true},
        {text: 'Proteinas (gr)', value: 'proteinas', align: 'left', sortable: true},
        {text: 'Fibra (gr)', value: 'fibra', align: 'left', sortable: true},
        {text: 'Calcio (mg)', value: 'calcio', align: 'left', sortable: true}
      ],
      alimentos: [],
      items: [],
      buscar: '',
      selectTab: 'Lact'
    }
  },
  mounted () {
    let vm = this
    alimentoService.query().then(data => {
      vm.alimentos = data.body
      vm.items = vm.alimentos.filter(alimento => {
        return alimento.grupo === 'Lácteos'
      })
    })
  },
  methods: {
    setGrupo (grupo) {
      let vm = this
      vm.selectTab = grupo
      if (grupo === 'Lact') grupo = 'Lácteos'
      if (grupo === 'Prep') grupo = 'Preparaciones'
      if (grupo === 'Diet') grupo = 'Dietéticos'
      if (grupo === 'Frut y Verd') grupo = 'Frutas y Verduras'
      if (grupo === 'Gras,sals y arder') grupo = 'Grasas. salsas y aderezos'
      if (grupo === 'Beb cal') grupo = 'Bebidas calientes'
      vm.items = vm.alimentos.filter(alimento => {
        return alimento.grupo === grupo
      })
    }
  },
  watch: {
    buscar (buscar) {
      let vm = this
      console.log(buscar)
      if (!buscar || buscar === '') return vm.setGrupo(vm.selectTab)
      buscar = buscar.toLowerCase()
      vm.items = vm.alimentos.filter(alimento => {
        console.log(alimento)
        return alimento.nombre.toLowerCase().indexOf(buscar) !== -1
      })
    }
  }
}
</script>

