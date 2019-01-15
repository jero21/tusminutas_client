<template>
  <v-card flat style="max-height: 200px" class="blue-grey lighten-5  scroll-y">
    <v-card-text>
      <v-layout row wrap>
        <v-flex xs4 md2>
          <strong>A.G Omega 3 : </strong> {{ totales.a_g_omega3.toFixed(1) }}
        </v-flex>
        <v-flex xs4 md2>
          <strong>A.G Omega 6 : </strong> {{ totales.a_g_omega6.toFixed(1) }}
        </v-flex>
        <v-flex xs4 md2>
          <strong>A.G Trans : </strong> {{ totales.a_g_trans.toFixed(1) }}
        </v-flex>
        <v-flex xs4 md2>
          <strong>A.G Monosat : </strong> {{ totales.a_grasos_monosat.toFixed(1) }}
        </v-flex>
        <v-flex xs4 md2>
          <strong>A.G Polisat : </strong> {{ totales.a_grasos_polisat.toFixed(1) }}
        </v-flex>
        <v-flex xs4 md2>
          <strong>A.G Sat : </strong> {{ totales.a_grasos_sat.toFixed(1) }}
        </v-flex>
        <v-flex xs4 md2>
          <strong>Ácido Fólico : </strong> {{ totales.acido_folico.toFixed(1) }}
        </v-flex>
        <v-flex xs4 md2>
          <strong>Ácido Pantoténico : </strong> {{ totales.acido_pantotenico.toFixed(1) }}
        </v-flex>
        <v-flex xs4 md2>
          <strong>Biotina : </strong> {{ totales.biotina.toFixed(1) }}
        </v-flex>
        <v-flex xs4 md2>
          <strong>Calcio : </strong> {{ totales.calcio.toFixed(1) }}
        </v-flex>
        <v-flex xs4 md2>
          <strong>Cobre : </strong> {{ totales.cobre.toFixed(1) }}
        </v-flex>
        <v-flex xs4 md2>
          <strong>Colesterol : </strong> {{ totales.colesterol.toFixed(1) }}
        </v-flex>
        <v-flex xs4 md2>
          <strong>Fibra : </strong> {{ totales.fibra.toFixed(1) }}
        </v-flex>
        <v-flex xs4 md2>
          <strong>Fósforo : </strong> {{ totales.fosforo.toFixed(1) }}
        </v-flex>
        <v-flex xs4 md2>
          <strong>Grasas Totales : </strong> {{ totales.grasas_totales.toFixed(1) }}
        </v-flex>
        <v-flex xs4 md2>
          <strong>Hierro : </strong> {{ totales.hierro.toFixed(1) }}
        </v-flex>
        <v-flex xs4 md2>
          <strong>Magnesio : </strong> {{ totales.magnesio.toFixed(1) }}
        </v-flex>
        <v-flex xs4 md2>
          <strong>Manganeso : </strong> {{ totales.manganeso.toFixed(1) }}
        </v-flex>
        <v-flex xs4 md2>
          <strong>Potasio : </strong> {{ totales.potasio.toFixed(1) }}
        </v-flex>
        <v-flex xs4 md2>
          <strong>Riboflavina : </strong> {{ totales.riboflavina.toFixed(1) }}
        </v-flex>
        <v-flex xs4 md2>
          <strong>Selenio : </strong> {{ totales.selenio.toFixed(1) }}
        </v-flex>
        <v-flex xs4 md2>
          <strong>Sodio : </strong> {{ totales.sodio.toFixed(1) }}
        </v-flex>
        <v-flex xs4 md2>
          <strong>Tiamina : </strong> {{ totales.tiamina.toFixed(1) }}
        </v-flex>
        <v-flex xs4 md2>
          <strong>Yodo : </strong> {{ totales.yodo.toFixed(1) }}
        </v-flex>
        <v-flex xs4 md2>
          <strong>Zinc : </strong> {{ totales.zinc.toFixed(1) }}
        </v-flex>
        <v-flex xs4 md2>
          <strong>Vitamina A : </strong> {{ totales.vit_a.toFixed(1) }}
        </v-flex>
        <v-flex xs4 md2>
          <strong>Vitamina B6 : </strong> {{ totales.vit_b6.toFixed(1) }}
        </v-flex>
        <v-flex xs4 md2>
          <strong>Vitamina B12 : </strong> {{ totales.vit_b12.toFixed(1) }}
        </v-flex>
        <v-flex xs4 md2>
          <strong>Vitamina C : </strong> {{ totales.vit_c.toFixed(1) }}
        </v-flex>
        <v-flex xs4 md2>
          <strong>Vitamina D : </strong> {{ totales.vit_d.toFixed(1) }}
        </v-flex>
        <v-flex xs4 md2>
          <strong>Vitamina E : </strong> {{ totales.vit_e.toFixed(1) }}
        </v-flex>
        <v-flex xs4 md2>
          <strong>Vitamina K : </strong> {{ totales.vit_k.toFixed(1) }}
        </v-flex>
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: ['totales']
}
</script>

