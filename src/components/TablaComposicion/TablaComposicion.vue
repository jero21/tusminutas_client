<template>
  <v-layout row wrap>
    <v-snackbar
      :timeout="8000"
      top
      right
      v-model="snackbar.model"
      :color="snackbar.color">
      {{ snackbar.message }}
      <v-btn flat icon color="white" @click.native="snackbar.model = false">
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>
    <blockquote class="blockquote">
        Tabla de composición química de los alimentos Chilenos.
      </blockquote>
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
          @click="selectTab = grupo.name"
        >
        {{ grupo.name }}
        </v-tab>
      </v-tabs>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="alimentosItems"
      no-data-text="Cargando alimentos ..."
      :rows-per-page-items="rows_per_page_items"
      hide-actions
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
        <td>
          <v-btn @click="props.expanded = !props.expanded" small flat icon>
            <v-icon v-if="!props.expanded">expand_more</v-icon>
            <v-icon v-else>expand_less</v-icon>
          </v-btn>
        </td>
      </template>
      <template slot="expand" slot-scope="props">
          <v-card flat style="max-height: 200px" class="blue-grey lighten-5  scroll-y">
            <v-card-text>
              <v-layout row wrap>
                <v-flex :key="propiedad.id" v-for="propiedad in propiedades" xs4 md2>
                  <strong>{{ propiedad.nombre_real }} : </strong> {{ props.item[propiedad.nombre] }} {{ propiedad.unidad_medida }}
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>
      </template>
    </v-data-table>
  </v-flex>
  </v-layout>
</template>

<script>
import DetallePropiedadAlimento from '@/components/Minuta/DetallePropiedadesAlimento'
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
        {text: 'Calcio (mg)', value: 'calcio', align: 'left', sortable: true},
        {text: ''}
      ],
      items: [],
      buscar: '',
      selectTab: 'Lact',
      snackbar: {
        model: false,
        color: 'success',
        message: 'ee'
      },
      rows_per_page_items: [{'text': 'Todos', 'value': -1}]
    }
  },
  components: {DetallePropiedadAlimento},
  mounted () {
    let vm = this
    vm.items = vm.alimentos.filter(alimento => {
      return alimento.grupo === 'Lácteos'
    })
    if (vm.alimentos.length === 0) vm.cargarAlimentos()

    vm.cargarPropiedades()
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
    },
    cargarAlimentos () {
      let vm = this
      vm.$store.dispatch('loadAlimentos').then(() => {
        vm.loadingTabla = false
        vm.items = vm.alimentos.filter(alimento => {
          return alimento.grupo === 'Lácteos'
        })
      }, () => {
        vm.showSnackbar('error', 'Error al cargar los alimentos')
      })
    },
    showSnackbar (color, message) {
      let vm = this
      vm.snackbar.color = color
      vm.snackbar.message = message
      vm.snackbar.model = true
    },
    cargarPropiedades () {
      let vm = this
      vm.$store.dispatch('loadPropiedades').then(() => {
      }, () => {
        vm.$eventHub.$emit('showSnackBar', {message: 'Error al cargar las propiedades', color: 'red'})
      })
    }
  },
  computed: {
    alimentos () {
      return this.$store.getters.alimentos
    },
    alimentosItems () {
      let vm = this
      if (vm.buscar !== '') {
        let buscar = vm.buscar.toLowerCase()
        return vm.alimentos.filter(alimento => {
          return alimento.nombre.toLowerCase().indexOf(buscar) !== -1
        })
      } else {
        let grupo = vm.selectTab
        if (grupo === 'Lact') grupo = 'Lácteos'
        if (grupo === 'Prep') grupo = 'Preparaciones'
        if (grupo === 'Diet') grupo = 'Dietéticos'
        if (grupo === 'Frut y Verd') grupo = 'Frutas y Verduras'
        if (grupo === 'Gras,sals y arder') grupo = 'Grasas. salsas y aderezos'
        if (grupo === 'Beb cal') grupo = 'Bebidas calientes'
        return vm.alimentos.filter(alimento => {
          return alimento.grupo === grupo
        })
      }
    },
    propiedades () {
      return this.$store.getters.propiedades
    }
  }
}
</script>

