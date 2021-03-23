<template>
  <v-card>
    <v-card-text>
        <v-layout row wrap>
          <v-flex xs9>
            <h5 class="headline">{{ minuta.nombre }}</h5>
          </v-flex>
          <v-flex xs3>
            <h5 class="subheading text-md-right" style="padding:10px">{{ moment(minuta.created_at).format('DD-MM-YYYY') }}</h5>
          </v-flex>
          <v-flex offset-xs9 xs3 class="text-md-right">
            <v-btn outline color="green" @click="exportarExcel()">EXCEL
              <v-icon right>save</v-icon>
            </v-btn>
          </v-flex>
          <v-flex xs12>
            <v-text-field :rows="2" multi-line readonly :value="minuta.descripcion || ''" label="Descripción" color="orange"></v-text-field>
          </v-flex>
          <template v-if="minuta.configuracion_minutas.length > 0">
            <v-flex xs12>
             <v-divider></v-divider>
            </v-flex>
            <v-flex xs12>
              <h3 class="title">Máximos del Día</h3>
            </v-flex>
            <v-flex xs6 md2 lg2 v-for="configuracion in minuta.configuracion_minutas" :key="'conf'+configuracion.id">
              <v-layout row wrap>
                <v-flex xs12>
                  <h4>{{ configuracion.propiedad.nombre_real }}</h4>
                </v-flex>
                <v-flex xs12>
                  <v-text-field readonly :value="configuracion.cant_maxima + configuracion.propiedad.unidad_medida" label="Cantidad Maxima" color="orange"></v-text-field>
                </v-flex>
                <v-flex xs12  v-for="comida in configuracion.configuracion_tipo_comida" :key="comida.id">
                  <v-text-field readonly :value="comida.cant_maxima" :label="comida.tipo_comida.nombre" color="orange"></v-text-field>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex xs12>
             <v-divider></v-divider>
            </v-flex>
          </template>
          <template v-for="(comida, index) in minuta.comidas" v-if="comida.alimentos.length > 0">
            <v-flex xs12 :key="index">
              <h3 class="title">{{ comida.nombre }}</h3>
              <br>
              <tabla-alimentos-comida :propiedades="propiedades" :comida="comida" :indexComida="index"></tabla-alimentos-comida>
            </v-flex>
            <v-flex :key="index + 'total'" xs12>
              <v-expansion-panel>
                <v-expansion-panel-content>
                  <div slot="header">Totales {{ comida.nombre}}</div>
                  <totales :totales="totalComida(index)"></totales>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-flex>
            <v-flex :key="index + 'divider'" xs12>
             <v-divider></v-divider>
            </v-flex>
          </template>
          <v-flex xs12>
            <h3 class="title">Totales del Día</h3>
            <v-flex xs12>
              <v-card flat class="blue-grey lighten-5  scroll-y">
                <v-card-text>
                  <v-layout row wrap>
                    <v-flex :key="propiedad.id" v-for="propiedad in propiedadesAlimentos" xs4 md2>
                      <strong>{{ propiedad.nombre_real }} : </strong> {{ totalesDia[propiedad.nombre].toFixed(1) }} {{ propiedad.unidad_medida }}
                    </v-flex>
                  </v-layout>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-flex>
        </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
import {minutaService} from '@/services/Minuta.service'
import TablaAlimentosComida from '@/components/Minuta/TablaAlimentosComida'
import Totales from '@/components/Minuta/Totales'
import PropiedadesAlimento from '@/models/Alimento.model'
export default {
  data () {
    return {
      minuta: {
        configuracion_minutas: []
      },
      totalesDia: PropiedadesAlimento,
      propiedades: [
        {text: 'Humedad (%)', value: 'humedad', unidad_medida: '%', align: 'left', sortable: false},
        {text: 'Energía (kcal)', value: 'energia', unidad_medida: 'Cal', align: 'left', sortable: false},
        {text: 'Proteínas (gr)', value: 'proteinas', unidad_medida: 'g', align: 'left', sortable: false},
        {text: 'Carbohidratos (gr)', value: 'fibra', unidad_medida: 'g', align: 'left', sortable: false}
      ]
    }
  },
  components: {TablaAlimentosComida, Totales},
  created () {
    let vm = this
    let id = vm.$route.params.id
    vm.cargarPropiedades()
    minutaService.getById(id).then(response => {
      let minuta = response.body
      minuta.comidas = JSON.parse(minuta.comidas)
      vm.minuta = minuta
      vm.$store.commit('minuta/setMinuta', minuta)
      vm.calcularTotales(response.body.comidas)
    })
  },
  beforeDestroy () {
    this.$store.commit('minuta/limpiarMinuta')
  },
  computed: {
    propiedadesAlimentos () {
      return this.$store.getters.propiedades
    }
  },
  methods: {
    exportarExcel () {
      window.open('http://localhost:8000/api/excel/' + this.$route.params.id, '_blank')
    },
    cargarPropiedades () {
      let vm = this
      vm.$store.dispatch('loadPropiedades').then(() => {
      }, () => {
        vm.$eventHub.$emit('showSnackBar', {message: 'Error al cargar las propiedades', color: 'red'})
      })
    },
    calcularTotales (comidas) {
      let totalesComida = JSON.parse(JSON.stringify(PropiedadesAlimento))
      comidas.forEach(comida => {
        comida.alimentos.forEach(alimento => {
          for (let prop in totalesComida) {
            if (prop !== 'cantidad') {
              totalesComida[prop] += (alimento.cantidad * alimento[prop] / 100)
            } else {
              totalesComida.cantidad += alimento.cantidad
            }
          }
        })
      })

      this.totalesDia = totalesComida
    },
    totalComida (indexComida) {
      let totales = {
        cantidad: 0,
        a_g_omega3: 0,
        a_g_omega6: 0,
        a_g_trans: 0,
        a_grasos_monosat: 0,
        a_grasos_polisat: 0,
        a_grasos_sat: 0,
        acido_folico: 0,
        acido_pantotenico: 0,
        biotina: 0,
        calcio: 0,
        carbohidratos: 0,
        cobre: 0,
        colesterol: 0,
        energia: 0,
        fibra: 0,
        fosforo: 0,
        grasas_totales: 0,
        hierro: 0,
        humedad: 0,
        magnesio: 0,
        manganeso: 0,
        potasio: 0,
        proteinas: 0,
        riboflavina: 0,
        niacina: 0,
        selenio: 0,
        sodio: 0,
        tiamina: 0,
        yodo: 0,
        zinc: 0,
        vit_a: 0,
        vit_b6: 0,
        vit_b12: 0,
        vit_c: 0,
        vit_d: 0,
        vit_e: 0,
        vit_k: 0
      }
      let alimentos = this.minuta.comidas[indexComida].alimentos
      alimentos.forEach(alimento => {
        for (let propiedad in totales) {
          if (propiedad !== 'cantidad') {
            totales[propiedad] += (alimento.cantidad * alimento[propiedad] / 100)
          } else {
            totales.cantidad += alimento.cantidad
          }
        }
      })
      return totales
    }
  }
}
</script>


<style scoped>

</style>


