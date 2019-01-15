<template>
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
            <td class="text-xs-left">{{ getValor(props.item.cantidad, props.item.humedad).toFixed(1) }}</td>
            <td class="text-xs-left">{{ getValor(props.item.cantidad, props.item.energia).toFixed(1) }}</td>
            <td class="text-xs-left">{{ getValor(props.item.cantidad, props.item.proteinas).toFixed(1) }}</td>
            <td class="text-xs-left">{{ getValor(props.item.cantidad, props.item.carbohidratos).toFixed(1) }}</td>
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
          <detalle-propiedad-alimento :item="props.item"></detalle-propiedad-alimento>
        </template>
        <template slot="footer">
          <tr class="primary white--text">
            <td><strong>Totales</strong></td>
            <td><strong>{{ totales.cantidad}}</strong></td>
            <td><strong :class="{'red--text':propiedadSuperaConfiguracion('humedad') }">{{ totales.humedad.toFixed(1)}}</strong></td>
            <td><strong :class="{'red--text':propiedadSuperaConfiguracion('energia') }">{{ totales.energia.toFixed(1)}}</strong></td>
            <td><strong :class="{'red--text':propiedadSuperaConfiguracion('proteinas') }">{{ totales.proteinas.toFixed(1)}}</strong></td>
            <td colspan="100%"><strong :class="{'red--text':propiedadSuperaConfiguracion('carbohidratos') }">{{ totales.carbohidratos.toFixed(1) }}</strong></td>
          </tr>
        </template>
  </v-data-table>
</template>

<script>
import DetallePropiedadAlimento from '@/components/Minuta/DetallePropiedadesAlimento'

export default {
  data () {
    return {
      headers: [
        {text: 'Alimento', value: 'nombre', align: 'left', sortable: false},
        {text: 'Cantidad (gr o ml)', value: 'cantidad', align: 'left', sortable: false},
        {text: 'Humedad (%)', value: 'humedad', align: 'left', sortable: false},
        {text: 'Energía (kcal)', value: 'energia', align: 'left', sortable: false},
        {text: 'Proteínas (gr)', value: 'proteinas', align: 'left', sortable: false},
        {text: 'Carbohidratos (gr)', value: 'fibra', align: 'left', sortable: false},
        {text: 'Acciones', align: 'left', sortable: false}
      ],
      rows_per_page_items: [{'text': 'Todos', 'value': -1}, 5, 10, 25],
      totalesC: {cantidad: 0, humedad: 0, energia: 0, proteinas: 0, carbohidratos: 0}
    }
  },
  components: {DetallePropiedadAlimento},
  props: ['comida', 'edit', 'indexComida'],
  computed: {
    totales () {
      return this.$store.getters['minuta/totalComida'](this.indexComida)
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
      // vm.$emit('update:totales', totales)
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


