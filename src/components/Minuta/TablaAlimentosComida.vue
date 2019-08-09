<template>
<div>
  <v-data-table
      id="scroll-target"
      style="max-height: 400px"
      :headers="headers"
      hide-actions
      :items="comida.alimentos"
      no-data-text=""
      :rows-per-page-items="rows_per_page_items"
      rows-per-page-text="Datos por pagina"
      class="elevation-3 scroll-y">
        <template slot="items" slot-scope="props">
          <tr class="alimento">
            <td class="text-xs-left">{{ props.item.nombre }}</td>
            <td v-if="edit" class="text-xs-left">
              <v-text-field
                :value="props.item.cantidad"
                @input="e => actualizarCantidad(e, props.index)"
                class="mx-3 input-cantidad"
                type="number"
                :readonly="!edit"
                flat>
              </v-text-field>
            </td>
            <td v-else class="text-xs-left">{{ props.item.cantidad }}</td>
            <template>
              <td :key="propiedad.text" v-for="propiedad in propiedades" class="text-xs-left">
                {{ getValor(props.item.cantidad, props.item[propiedad.value]).toFixed(1) }}
              </td>
            </template>
            <td colspan="100%" class="text-xs-left">
              <v-layout row wrap>
                <v-flex xs12 md6 v-if="edit">
                  <v-btn @click="eliminarAlimento(props.index)" small flat color="red" icon>
                    <v-icon>delete</v-icon>
                  </v-btn>
                </v-flex>
                <v-flex xs12 md6>
                 <v-btn @click="props.expanded = !props.expanded" small flat icon>
                  <v-icon v-if="!props.expanded">expand_more</v-icon>
                  <v-icon v-else>expand_less</v-icon>
                 </v-btn>
                </v-flex>
              </v-layout>
            </td>
          </tr>
        </template>
        <template slot="expand" slot-scope="props">
          <detalle-propiedad-alimento :item="props.item" :comida="comida" :totales="totales"></detalle-propiedad-alimento>
        </template>
        <template slot="footer">
          <tr class="primary white--text">
            <td><strong>Totales</strong></td>
            <td><strong>{{ totales.cantidad}}</strong></td>
            <template v-for="(propiedad, index) in propiedades">
              <td v-if="index !== propiedades.length - 1" :key="propiedad.text" ><strong :class="{'red--text':propiedadSuperaConfiguracion(propiedad.value) }">{{ totales[propiedad.value].toFixed(1)}}</strong></td>
              <td  v-else :key="propiedad.text" ><strong :class="{'red--text':propiedadSuperaConfiguracion(propiedad.value) }">{{ totales[propiedad.value].toFixed(1)}}</strong></td>
            </template>
            <td v-if="edit" colspan="100%"><v-btn small @click="dialog = true">Ver Totales Comida</v-btn></td>
            <td v-else colspan="100%"></td>
          </tr>
        </template>
  </v-data-table>
   <!-- DIALOG PARA VER LOS TOTALES -->
        <v-dialog
          v-model="dialog"
          scrollable
         :overlay="false"
          transition="dialog-transition">
          <v-card>
          <totales :totales="totales"></totales>
          </v-card>
        </v-dialog>
  </div>
</template>

<script>
import DetallePropiedadAlimento from '@/components/Minuta/DetallePropiedadesAlimento'
import Totales from '@/components/Minuta/Totales'

export default {
  data () {
    return {
      headers: [],
      headerAlimento: {text: 'Alimento', value: 'nombre', align: 'left', sortable: false},
      headerCantidad: {text: 'Cantidad', value: 'cantidad', align: 'left', sortable: false},
      headerAcciones: {text: 'Acciones', align: 'left', sortable: false},
      rows_per_page_items: [{'text': 'Todos', 'value': -1}, 5, 10, 25],
      totalesC: {cantidad: 0, humedad: 0, energia: 0, proteinas: 0, carbohidratos: 0},
      dialog: false
    }
  },
  components: {DetallePropiedadAlimento, Totales},
  props: ['comida', 'edit', 'indexComida', 'propiedades'],
  mounted () {
    let vm = this
    vm.headers.push(vm.headerAlimento)
    vm.headers.push(vm.headerCantidad)
    vm.propiedades.forEach(propiedad => {
      vm.headers.push(propiedad)
    })
    vm.headers.push(vm.headerAcciones)
  },
  computed: {
    totales () {
      return this.$store.getters['minuta/totalComida'](this.indexComida)
    }
  },
  watch: {
    propiedades (propiedades) {
      let vm = this
      let headers = []
      headers.push(vm.headerAlimento)
      headers.push(vm.headerCantidad)
      propiedades.forEach(propiedad => {
        headers.push(propiedad)
      })
      headers.push(vm.headerAcciones)
      vm.headers = headers
    }
  },
  methods: {
    propiedadSuperaConfiguracion (propiedad) {
      let superaMaximo = false
      if (this.edit) {
        this.comida.configuracion.forEach(propiedadConfiguracion => {
          if (propiedad === propiedadConfiguracion.nombre) {
            if (this.totales[propiedad] > propiedadConfiguracion.cant_maxima) superaMaximo = true
          }
        })
      }
      return superaMaximo
    },
    actualizarCantidad (e, index) {
      let indexComida = this.indexComida
      let value = Number(e)
      this.$store.commit('minuta/actualizarCantidad', {value, indexComida, index})
    },
    eliminarAlimento (indexAlimento) {
      let indexComida = this.indexComida
      this.$store.commit('minuta/eliminarAlimentoComida', {indexComida, indexAlimento})
    },
    changeTotales () {
      let vm = this
      let totales = {cantidad: 0, humedad: 0, energia: 0, proteinas: 0, carbohidratos: 0}
      vm.comida.alimentos.forEach((alimento) => {
        totales.cantidad += alimento.cantidad
        totales.humedad += vm.getValor(alimento.cantidad, alimento.humedad)
        totales.energia += vm.getValor(alimento.cantidad, alimento.energia)
        totales.proteinas += vm.getValor(alimento.cantidad, alimento.proteinas)
        totales.carbohidratos += vm.getValor(alimento.cantidad, alimento.fibra)
      })
      vm.totales = totales
    },
    getValor (cantidad, propiedad) {
      let valor = (cantidad * propiedad) / 100
      return valor
    },
    getTotal () {
      let vm = this
      let total = 0
      vm.alimentosComida.forEach((alimento) => {
        total += alimento.cantidad
      })
      return total
    }
  }
}
</script>

<style scoped>
.input-cantidad {
    margin: 0 !important; 
    padding: 0;
    width: 70px;
    max-height: 40px;
  }

  .table.table tbody td, table.table tbody th {
    max-height: 20px;
  }

  table.table tfoot tr {
    height: 35px;
  }
</style>


