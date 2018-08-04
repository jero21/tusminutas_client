<template>
  <v-card flat style="max-height: 200px" class="blue-grey lighten-5  scroll-y">
    <v-card-text>
      <v-layout row wrap>
        <v-flex xs4 md2>
          <strong>A.G Omega 3 : </strong> {{ getValor(item.a_g_omega3).toFixed(1)}}
        </v-flex>
        <v-flex xs4 md2>
          <strong>A.G Omega 6 : </strong> {{ getValor(item.a_g_omega6).toFixed(1)}}
        </v-flex>
        <v-flex xs4 md2>
          <strong>A.G Trans : </strong> {{ getValor(item.a_g_trans).toFixed(1)}}
        </v-flex>
        <v-flex xs4 md2>
          <strong>A.G Monosat : </strong> {{ getValor(item.a_grasos_monosat).toFixed(1)}}
        </v-flex>
        <v-flex xs4 md2>
          <strong>A.G Polisat : </strong> {{ getValor(item.a_grasos_polisat).toFixed(1)}}
        </v-flex>
        <v-flex xs4 md2>
          <strong>A.G Sat : </strong> {{ getValor(item.a_grasos_sat).toFixed(1)}}
        </v-flex>
        <v-flex xs4 md2>
          <strong>Ácido Fólico : </strong> {{ getValor(item.acido_folico).toFixed(1)}}
        </v-flex>
        <v-flex xs4 md2>
          <strong>Ácido Pantoténico : </strong> {{ getValor(item.acido_pantotenico).toFixed(1)}}
        </v-flex>
        <v-flex xs4 md2>
          <strong>Biotina : </strong> {{ getValor(item.biotina).toFixed(1)}}
        </v-flex>
        <v-flex xs4 md2>
          <strong>Calcio : </strong> {{ getValor(item.calcio).toFixed(1)}}
        </v-flex>
        <v-flex xs4 md2>
          <strong>Cobre : </strong> {{ getValor(item.cobre).toFixed(1)}}
        </v-flex>
        <v-flex xs4 md2>
          <strong>Colesterol : </strong> {{ getValor(item.colesterol).toFixed(1)}}
        </v-flex>
        <v-flex xs4 md2>
          <strong>Fibra : </strong> {{ getValor(item.fibra).toFixed(1)}}
        </v-flex>
        <v-flex xs4 md2>
          <strong>Fósforo : </strong> {{ getValor(item.fosforo).toFixed(1)}}
        </v-flex>
        <v-flex xs4 md2>
          <strong>Grasas Totales : </strong> {{ getValor(item.grasas_totales).toFixed(1)}}
        </v-flex>
        <v-flex xs4 md2>
          <strong>Hierro : </strong> {{ getValor(item.hierro).toFixed(1)}}
        </v-flex>
        <v-flex xs4 md2>
          <strong>Magnesio : </strong> {{ getValor(item.magnesio).toFixed(1)}}
        </v-flex>
        <v-flex xs4 md2>
          <strong>Manganeso : </strong> {{ getValor(item.manganeso).toFixed(1)}}
        </v-flex>
        <v-flex xs4 md2>
          <strong>Potasio : </strong> {{ getValor(item.potasio).toFixed(1)}}
        </v-flex>
        <v-flex xs4 md2>
          <strong>Riboflavina : </strong> {{ getValor(item.riboflavina).toFixed(1)}}
        </v-flex>
        <v-flex xs4 md2>
          <strong>Selenio : </strong> {{ getValor(item.selenio).toFixed(1)}}
        </v-flex>
        <v-flex xs4 md2>
          <strong>Sodio : </strong> {{ getValor(item.sodio).toFixed(1)}}
        </v-flex>
        <v-flex xs4 md2>
          <strong>Tiamina : </strong> {{ getValor(item.tiamina).toFixed(1)}}
        </v-flex>
        <v-flex xs4 md2>
          <strong>Yodo : </strong> {{ getValor(item.yodo).toFixed(1)}}
        </v-flex>
        <v-flex xs4 md2>
          <strong>Zinc : </strong> {{ getValor(item.zinc).toFixed(1)}}
        </v-flex>
        <v-flex xs4 md2>
          <strong>Vitamina A : </strong> {{ getValor(item.vit_a).toFixed(1)}}
        </v-flex>
        <v-flex xs4 md2>
          <strong>Vitamina B6 : </strong> {{ getValor(item.vit_b6).toFixed(1)}}
        </v-flex>
        <v-flex xs4 md2>
          <strong>Vitamina B12 : </strong> {{ getValor(item.vit_b12).toFixed(1)}}
        </v-flex>
        <v-flex xs4 md2>
          <strong>Vitamina C : </strong> {{ getValor(item.vit_c).toFixed(1)}}
        </v-flex>
        <v-flex xs4 md2>
          <strong>Vitamina D : </strong> {{ getValor(item.vit_d).toFixed(1)}}
        </v-flex>
        <v-flex xs4 md2>
          <strong>Vitamina E : </strong> {{ getValor(item.vit_e).toFixed(1)}}
        </v-flex>
        <v-flex xs4 md2>
          <strong>Vitamina K : </strong> {{ getValor(item.vit_k).toFixed(1)}}
        </v-flex>
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: ['item'],
  methods: {
    getValor (propiedad) {
      let valor = (this.item.cantidad * propiedad) / 100
      return valor
    }
  }
}
</script>

