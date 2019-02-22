<template>
  <v-dialog
    v-model="dialog"
    scrollable
    persistent 
    :overlay="false"
    max-width="500px"
    transition="dialog-transition">
    <v-card>
      <v-toolbar color="primary" dark>
        <v-toolbar-title> {{ title}} </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn :disabled="formValidado" @click="saveAlimento(alimento)" outline color="white">Guardar
          <v-icon right>save</v-icon>
        </v-btn>
        <v-btn icon @click="closeDialog()">
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <v-container grid-list-md>
          <v-form v-model="valid" ref="form" lazy-validation>
            <v-layout row wrap>
              <v-flex xs12>
              <v-text-field :rules="getRules('un nombre')" v-model="alimento.nombre" label="Nombre" color="secondary" required></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field v-model="alimento.origen" label="Origen" color="secondary"></v-text-field>
            </v-flex>
            <v-flex xs12 md6>
              <v-select 
                :rules="getRules('un grupo')"
                v-model="alimento.grupo"
                label="Grupo"
                color="secondary"
                item-text="nombre"
                :items="grupos"
                item-value="nombre"
                required>
              </v-select>
            </v-flex>
            <v-flex xs12 md6>
              <v-select 
                :rules="getRules('un sub grupo')"
                v-model="alimento.subgrupo"
                label="Sub Grupo"
                color="secondary"
                item-text="nombre"
                :items="subgrupos"
                item-value="nombre"
                required>
                </v-select>
            </v-flex>
            <v-flex xs12 md6>
              <v-text-field :rules="getRules('un valor')" type="number" v-model="alimento.a_g_omega3" label="A.G. Omega 3" color="secondary" required></v-text-field>
            </v-flex>
            <v-flex xs12 md6>
              <v-text-field :rules="getRules('un valor')" type="number" v-model="alimento.a_g_omega6" label="A.G. Omega 6" color="secondary" required></v-text-field>
            </v-flex>
            <v-flex xs12 md6>
              <v-text-field :rules="getRules('un valor')" type="number" v-model="alimento.a_g_trans" label="A.G. Trans" color="secondary" required></v-text-field>
            </v-flex>
            <v-flex xs12 md6>
              <v-text-field :rules="getRules('un valor')" type="number" v-model="alimento.a_grasos_monosat" label="A.G. Monosat" color="secondary" required></v-text-field>
            </v-flex>
            <v-flex xs12 md6>
              <v-text-field :rules="getRules('un valor')" type="number" v-model="alimento.a_grasos_polisat" label="A.G. Polisat" color="secondary" required></v-text-field>
            </v-flex>
            <v-flex xs12 md6>
              <v-text-field :rules="getRules('un valor')" type="number" v-model="alimento.a_grasos_sat" label="A.G. Sat" color="secondary" required></v-text-field>
            </v-flex>
            <v-flex xs12 md6>
              <v-text-field :rules="getRules('un valor')" type="number" v-model="alimento.acido_folico" label="Ácido Fólico" color="secondary" required></v-text-field>
            </v-flex>
            <v-flex xs12 md6>
              <v-text-field :rules="getRules('un valor')" type="number" v-model="alimento.acido_pantotenico" label="Ácido Pantoténico" color="secondary" required></v-text-field>
            </v-flex>
            <v-flex xs12 md6>
              <v-text-field :rules="getRules('un valor')" type="number" v-model="alimento.biotina" label="Biotina" color="secondary" required></v-text-field>
            </v-flex>
            <v-flex xs12 md6>
              <v-text-field :rules="getRules('un valor')" type="number" v-model="alimento.calcio" label="Calcio" color="secondary" required></v-text-field>
            </v-flex>
            <v-flex xs12 md6>
              <v-text-field :rules="getRules('un valor')" type="number" v-model="alimento.carbohidratos" label="Carbohidratos" color="secondary" required></v-text-field>
            </v-flex>
            <v-flex xs12 md6>
              <v-text-field :rules="getRules('un valor')" type="number" v-model="alimento.cobre" label="Cobre" color="secondary" required></v-text-field>
            </v-flex>
            <v-flex xs12 md6>
              <v-text-field :rules="getRules('un valor')" type="number" v-model="alimento.colesterol" label="Colesterol" color="secondary" required></v-text-field>
            </v-flex>
            <v-flex xs12 md6>
              <v-text-field :rules="getRules('un valor')" type="number" v-model="alimento.energia" label="Calorías" color="secondary" required></v-text-field>
            </v-flex>
            <v-flex xs12 md6>
              <v-text-field :rules="getRules('un valor')" type="number" v-model="alimento.fibra" label="Fibra" color="secondary" required></v-text-field>
            </v-flex>
            <v-flex xs12 md6>
              <v-text-field :rules="getRules('un valor')" type="number" v-model="alimento.fosforo" label="Fósforo" color="secondary" required></v-text-field>
            </v-flex>
            <v-flex xs12 md6>
              <v-text-field :rules="getRules('un valor')" type="number" v-model="alimento.grasas_totales" label="Grasas Totales" color="secondary" required></v-text-field>
            </v-flex>
            <v-flex xs12 md6>
              <v-text-field :rules="getRules('un valor')" type="number" v-model="alimento.hierro" label="Hierro" color="secondary" required></v-text-field>
            </v-flex>
            <v-flex xs12 md6>
              <v-text-field :rules="getRules('un valor')" type="number" v-model="alimento.humedad" label="Humedad" color="secondary" required></v-text-field>
            </v-flex>
            <v-flex xs12 md6>
              <v-text-field :rules="getRules('un valor')" type="number" v-model="alimento.magnesio" label="Magnesio" color="secondary" required></v-text-field>
            </v-flex>
            <v-flex xs12 md6>
              <v-text-field :rules="getRules('un valor')" type="number" v-model="alimento.manganeso" label="Manganeso" color="secondary" required></v-text-field>
            </v-flex>
            <v-flex xs12 md6>
              <v-text-field :rules="getRules('un valor')" type="number" v-model="alimento.potasio" label="Potasio" color="secondary" required></v-text-field>
            </v-flex>
            <v-flex xs12 md6>
              <v-text-field :rules="getRules('un valor')" type="number" v-model="alimento.proteinas" label="Proteínas" color="secondary" required></v-text-field>
            </v-flex>
            <v-flex xs12 md6>
              <v-text-field :rules="getRules('un valor')" type="number" v-model="alimento.riboflavina" label="Riboflavina" color="secondary" required></v-text-field>
            </v-flex>
            <v-flex xs12 md6>
              <v-text-field :rules="getRules('un valor')" type="number" v-model="alimento.selenio" label="Selenio" color="secondary" required></v-text-field>
            </v-flex>
            <v-flex xs12 md6>
              <v-text-field :rules="getRules('un valor')" type="number" v-model="alimento.sodio" label="Sodio" color="secondary" required></v-text-field>
            </v-flex>
            <v-flex xs12 md6>
              <v-text-field :rules="getRules('un valor')" type="number" v-model="alimento.tiamina" label="Tiamina" color="secondary" required></v-text-field>
            </v-flex>
            <v-flex xs12 md6>
              <v-text-field :rules="getRules('un valor')" type="number" v-model="alimento.yodo" label="Yodo" color="secondary" required></v-text-field>
            </v-flex>
            <v-flex xs12 md6>
              <v-text-field :rules="getRules('un valor')" type="number" v-model="alimento.zinc" label="Zinc" color="secondary" required></v-text-field>
            </v-flex>
            <v-flex xs12 md6>
              <v-text-field :rules="getRules('un valor')" type="number" v-model="alimento.vit_a" label="Vitamina A" color="secondary" required></v-text-field>
            </v-flex>
            <v-flex xs12 md6>
              <v-text-field :rules="getRules('un valor')" type="number" v-model="alimento.vit_b6" label="Vitamina B6" color="secondary" required></v-text-field>
            </v-flex>
            <v-flex xs12 md6>
              <v-text-field :rules="getRules('un valor')" type="number" v-model="alimento.vit_b12" label="Vitamina B12" color="secondary" required></v-text-field>
            </v-flex>
            <v-flex xs12 md6>
              <v-text-field :rules="getRules('un valor')" type="number" v-model="alimento.vit_c" label="Vitamina C" color="secondary" required></v-text-field>
            </v-flex>
            <v-flex xs12 md6>
              <v-text-field :rules="getRules('un valor')" type="number" v-model="alimento.vit_d" label="Vitamina D" color="secondary" required></v-text-field>
            </v-flex>
            <v-flex xs12 md6>
              <v-text-field :rules="getRules('un valor')" type="number" v-model="alimento.vit_e" label="Vitamina E" color="secondary" required></v-text-field>
            </v-flex>
            <v-flex xs12 md6>
              <v-text-field :rules="getRules('un valor')" type="number" v-model="alimento.vit_k" label="Vitamina K" color="secondary" required></v-text-field>
            </v-flex>
            </v-layout>
          </v-form>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import {grupoService} from '@/services/Grupo.service'
import {alimentoNutricionistaService} from '@/services/AlimentoNutricionista.service'
export default {
  data () {
    return {
      title: 'Crear Alimento',
      valid: false,
      grupos: [],
      subgrupos: [],
      alimento: {
        id_user: 1,
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
    }
  },
  props: ['dialog'],
  mounted () {
    let vm = this
    vm.grupos = grupoService.getGrupos()
    vm.subgrupos = grupoService.getSubgrupos()
  },
  methods: {
    saveAlimento (alimento) {
      let vm = this
      alimentoNutricionistaService.save(alimento).then(data => {
        vm.$store.dispatch('loadMyAlimentos')
        vm.closeDialog()
      })
    },
    getRules (campo) {
      return [v => !!v || `Debe ingresar ${campo}`]
    },
    closeDialog () {
      let vm = this
      vm.alimento = {}
      vm.$emit('closeDialog')
    }
  },
  computed: {
    formValidado () {
      let vm = this
      return !vm.valid
    }
  }
}
</script>

