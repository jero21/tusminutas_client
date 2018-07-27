<template>
  <section>
    <v-select
      :items="allAlimentos"
      :search-input.sync="search"
      v-model="select"
      label="Busca tus Alimentos"
      item-text="nombre"
      autocomplete
      cache-items
      @change="pushAlimento()"
      return-object>
    </v-select>
    <v-data-table
      id="scroll-target"
      style="max-height: 400px"
      :headers="headers"
      :items="alimentosComida"
      no-data-text=""
      :rows-per-page-items="rows_per_page_items"
      rows-per-page-text="Datos por pagina"
      class="elevation-3 scroll-y">
        <template slot="items" slot-scope="props">
          <tr>
            <td class="text-xs-left">{{ props.item.nombre }}</td>
            <td class="text-xs-left">
              <v-text-field
                v-model.number="props.item.cantidad"
                class="mx-3 input-cantidad"
                type="Number"
                @input="changeTotales"
                flat>
              </v-text-field>
            </td>
            <td class="text-xs-left">{{ getValor(props.item.cantidad, props.item.humedad).toFixed(1) }}</td>
            <td class="text-xs-left">{{ getValor(props.item.cantidad, props.item.energia).toFixed(1) }}</td>
            <td class="text-xs-left">{{ getValor(props.item.cantidad, props.item.proteinas).toFixed(1) }}</td>
            <td class="text-xs-left">{{ getValor(props.item.cantidad, props.item.fibra).toFixed(1) }}</td>
            <td class="text-xs-left">
              <v-btn @click="props.expanded = !props.expanded" flat icon>
                <v-icon>more</v-icon>
              </v-btn>
              <v-btn @click="alimentosComida.splice(props.index,1)" color="red" flat icon>
                <v-icon>delete</v-icon>
              </v-btn>
            </td>
          </tr>
        </template>
        <template slot="expand" slot-scope="props">
          <v-card flat style="max-height: 200px" class="blue-grey lighten-5  scroll-y">
            <v-card-text>
              <v-layout row wrap>
                <v-flex xs4 md2>
                  <strong>A.G Omega 3 : </strong> {{ getValor(props.item.cantidad, props.item.a_g_omega3).toFixed(1)}}
                </v-flex>
                <v-flex xs4 md2>
                  <strong>A.G Omega 6 : </strong> {{ getValor(props.item.cantidad, props.item.a_g_omega6).toFixed(1)}}
                </v-flex>
                <v-flex xs4 md2>
                  <strong>A.G Trans : </strong> {{ getValor(props.item.cantidad, props.item.a_g_trans).toFixed(1)}}
                </v-flex>
                <v-flex xs4 md2>
                  <strong>A.G Monosat : </strong> {{ getValor(props.item.cantidad, props.item.a_grasos_monosat).toFixed(1)}}
                </v-flex>
                <v-flex xs4 md2>
                  <strong>A.G Polisat : </strong> {{ getValor(props.item.cantidad, props.item.a_grasos_polisat).toFixed(1)}}
                </v-flex>
                <v-flex xs4 md2>
                  <strong>A.G Sat : </strong> {{ getValor(props.item.cantidad, props.item.a_grasos_sat).toFixed(1)}}
                </v-flex>
                <v-flex xs4 md2>
                  <strong>Ácido Fólico : </strong> {{ getValor(props.item.cantidad, props.item.acido_folico).toFixed(1)}}
                </v-flex>
                <v-flex xs4 md2>
                  <strong>Ácido Pantoténico : </strong> {{ getValor(props.item.cantidad, props.item.acido_pantotenico).toFixed(1)}}
                </v-flex>
                <v-flex xs4 md2>
                  <strong>Biotina : </strong> {{ getValor(props.item.cantidad, props.item.biotina).toFixed(1)}}
                </v-flex>
                <v-flex xs4 md2>
                  <strong>Calcio : </strong> {{ getValor(props.item.cantidad, props.item.calcio).toFixed(1)}}
                </v-flex>
                <v-flex xs4 md2>
                  <strong>Cobre : </strong> {{ getValor(props.item.cantidad, props.item.cobre).toFixed(1)}}
                </v-flex>
                <v-flex xs4 md2>
                  <strong>Colesterol : </strong> {{ getValor(props.item.cantidad, props.item.colesterol).toFixed(1)}}
                </v-flex>
                <v-flex xs4 md2>
                  <strong>Fibra : </strong> {{ getValor(props.item.cantidad, props.item.fibra).toFixed(1)}}
                </v-flex>
                <v-flex xs4 md2>
                  <strong>Fósforo : </strong> {{ getValor(props.item.cantidad, props.item.fosforo).toFixed(1)}}
                </v-flex>
                <v-flex xs4 md2>
                  <strong>Grasas Totales : </strong> {{ getValor(props.item.cantidad, props.item.grasas_totales).toFixed(1)}}
                </v-flex>
                <v-flex xs4 md2>
                  <strong>Hierro : </strong> {{ getValor(props.item.cantidad, props.item.hierro).toFixed(1)}}
                </v-flex>
                <v-flex xs4 md2>
                  <strong>Magnesio : </strong> {{ getValor(props.item.cantidad, props.item.magnesio).toFixed(1)}}
                </v-flex>
                <v-flex xs4 md2>
                  <strong>Manganeso : </strong> {{ getValor(props.item.cantidad, props.item.manganeso).toFixed(1)}}
                </v-flex>
                <v-flex xs4 md2>
                  <strong>Potasio : </strong> {{ getValor(props.item.cantidad, props.item.potasio).toFixed(1)}}
                </v-flex>
                <v-flex xs4 md2>
                  <strong>Riboflavina : </strong> {{ getValor(props.item.cantidad, props.item.riboflavina).toFixed(1)}}
                </v-flex>
                <v-flex xs4 md2>
                  <strong>Selenio : </strong> {{ getValor(props.item.cantidad, props.item.selenio).toFixed(1)}}
                </v-flex>
                <v-flex xs4 md2>
                  <strong>Sodio : </strong> {{ getValor(props.item.cantidad, props.item.sodio).toFixed(1)}}
                </v-flex>
                <v-flex xs4 md2>
                  <strong>Tiamina : </strong> {{ getValor(props.item.cantidad, props.item.tiamina).toFixed(1)}}
                </v-flex>
                <v-flex xs4 md2>
                  <strong>Yodo : </strong> {{ getValor(props.item.cantidad, props.item.yodo).toFixed(1)}}
                </v-flex>
                <v-flex xs4 md2>
                  <strong>Zinc : </strong> {{ getValor(props.item.cantidad, props.item.zinc).toFixed(1)}}
                </v-flex>
                <v-flex xs4 md2>
                  <strong>Vitamina A : </strong> {{ getValor(props.item.cantidad, props.item.vit_a).toFixed(1)}}
                </v-flex>
                <v-flex xs4 md2>
                  <strong>Vitamina B6 : </strong> {{ getValor(props.item.cantidad, props.item.vit_b6).toFixed(1)}}
                </v-flex>
                <v-flex xs4 md2>
                  <strong>Vitamina B12 : </strong> {{ getValor(props.item.cantidad, props.item.vit_b12).toFixed(1)}}
                </v-flex>
                <v-flex xs4 md2>
                  <strong>Vitamina C : </strong> {{ getValor(props.item.cantidad, props.item.vit_c).toFixed(1)}}
                </v-flex>
                <v-flex xs4 md2>
                  <strong>Vitamina D : </strong> {{ getValor(props.item.cantidad, props.item.vit_d).toFixed(1)}}
                </v-flex>
                <v-flex xs4 md2>
                  <strong>Vitamina E : </strong> {{ getValor(props.item.cantidad, props.item.vit_e).toFixed(1)}}
                </v-flex>
                <v-flex xs4 md2>
                  <strong>Vitamina K : </strong> {{ getValor(props.item.cantidad, props.item.vit_k).toFixed(1)}}
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>
        </template>
        <template slot="footer">
          <tr class="primary white--text">
            <td><strong>Totales</strong></td>
            <td><strong>{{ totales.cantidad}}</strong></td>
            <td><strong>{{ totales.humedad.toFixed(1)}}</strong></td>
            <td><strong>{{ totales.energia.toFixed(1)}}</strong></td>
            <td><strong>{{ totales.proteinas.toFixed(1)}}</strong></td>
            <td colspan="100%"><strong>{{ totales.carbohidratos.toFixed(1) }}</strong></td>
          </tr>
        </template>
    </v-data-table>
  </section>
</template>

<script>
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
        {text: '', align: 'left', sortable: false}
      ],
      rows_per_page_items: [{'text': 'Todos', 'value': -1}, 5, 10, 25],
      select: {},
      search: ''
    }
  },
  props: ['alimentosComida', 'totales'],
  methods: {
    changeTotales () {
      let vm = this
      let totales = {cantidad: 0, humedad: 0, energia: 0, proteinas: 0, carbohidratos: 0}
      vm.alimentosComida.forEach((alimento) => {
        totales.cantidad += alimento.cantidad
        totales.humedad += vm.getValor(alimento.cantidad, alimento.humedad)
        totales.energia += vm.getValor(alimento.cantidad, alimento.energia)
        totales.proteinas += vm.getValor(alimento.cantidad, alimento.proteinas)
        totales.carbohidratos += vm.getValor(alimento.cantidad, alimento.fibra)
      })
      vm.$emit('update:totales', totales)
    },
    getValor (cantidad, propiedad) {
      let valor = (cantidad * propiedad) / 300
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
  },
  computed: {
    allAlimentos () {
      return this.$store.getters.allAlimentos
    }
  },
  watch: {
    select (alimento) {
      if (this.search !== '') {
        let newAlimento = JSON.parse(JSON.stringify(alimento))
        newAlimento.cantidad = 300
        this.alimentosComida.push(newAlimento)
        this.select = {}
        this.search = ''
        this.changeTotales()
        // this.$emit('update:alimentosComida', this.alimentosComida)
      }
    }
  }
}
</script>

<style scoped>
  .input-cantidad {
    margin: 0 !important; 
    width: 70px;
  }
</style>

