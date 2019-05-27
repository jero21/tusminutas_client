<template>
  <v-card>
    <v-card-text>
        <v-layout row wrap>
          <v-flex xs8>
            <h5 class="headline">{{ minuta.nombre }}</h5>
          </v-flex>
          <v-flex xs4>
            <h5 class="subheading text-xs-right">{{ moment(minuta.created_at).format('DD-MM-YYYY') }}</h5>
          </v-flex>
          <v-flex xs12>
            <v-text-field :rows="2" multi-line readonly :value="minuta.descripcion || ''" label="Descripción" color="orange"></v-text-field>
          </v-flex>
          <template v-if="minuta.configuracion_minutas.length > 0">
            <v-flex xs12>
             <v-divider></v-divider>
            </v-flex>
            <v-flex xs12>
              <h3 class="title">Máximos propiedades</h3>
            </v-flex>
            <v-flex xs6 md2 lg2 v-for="configuracion in minuta.configuracion_minutas" :key="'conf'+configuracion.id">
              <v-layout row wrap>
                <v-flex xs12>
                  <h4>{{ configuracion.propiedad.nombre_real }}</h4>
                </v-flex>
                <v-flex xs12>
                  <v-text-field readonly :value="configuracion.cant_maxima" label="Cantidad Maxima" color="orange"></v-text-field>
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
              <tabla-alimentos-comida :propiedades="propiedades" :totales="comida.totales" :comida="comida" :indexComida="index"></tabla-alimentos-comida>
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
        </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
import {minutaService} from '@/services/Minuta.service'
import TablaAlimentosComida from '@/components/Minuta/TablaAlimentosComida'
import Totales from '@/components/Minuta/Totales'
export default {
  data () {
    return {
      minuta: {
        configuracion_minutas: []
      },
      totales: {
        cantidad: 0,
        humedad: 0,
        energia: 0,
        proteinas: 0,
        carbohidratos: 0
      },
      propiedades: [
        {text: 'Humedad (%)', value: 'humedad', align: 'left', sortable: false},
        {text: 'Energía (kcal)', value: 'energia', align: 'left', sortable: false},
        {text: 'Proteínas (gr)', value: 'proteinas', align: 'left', sortable: false},
        {text: 'Carbohidratos (gr)', value: 'fibra', align: 'left', sortable: false}
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
    })
  },
  methods: {
    cargarPropiedades () {
      let vm = this
      vm.$store.dispatch('loadPropiedades').then(() => {
      }, () => {
        vm.$eventHub.$emit('showSnackBar', {message: 'Error al cargar las propiedades', color: 'red'})
      })
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
        /*
        totales.humedad += (alimento.cantidad * alimento.humedad) / 100
        totales.energia += (alimento.cantidad * alimento.energia) / 100
        totales.proteinas += (alimento.cantidad * alimento.proteinas) / 100
        totales.carbohidratos += (alimento.cantidad * alimento.carbohidratos) / 100
        */
      })
      return totales
    }
  }
}
</script>


<style scoped>

</style>


