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
        <v-toolbar-title> Guardar Minuta </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="closeDialog()">
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <v-container grid-list-md>
          <v-form v-model="valid" ref="form" lazy-validation>
            <v-layout row wrap>
              <v-flex xs12>
              <v-text-field :rules="[v => !!v || 'Se requiere nombre']" v-model="minuta.nombre" label="Nombre Minuta" color="secondary" required></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-textarea :rules="[v => !!v || 'Se requiere una descripción']" v-model="minuta.descripcion" label="Descripción Minuta" color="secondary"></v-textarea>
            </v-flex>
            <v-flex xs12>
              <v-alert
                v-if="meals_empty"
                :value="true"
                color="info"
                icon="info">
                No tine alimentos o comidas en <strong>{{ meals_empty }}</strong>
              </v-alert>
            </v-flex>
            <v-flex xs12>
              <v-btn @click="guardarMinuta(minuta)" :disabled="!valid" block color="primary">Guardar</v-btn>
            </v-flex>
            </v-layout>
          </v-form>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { minutaService } from '@/services/Minuta.service'
export default {
  data () {
    return {
      valid: false,
      minuta: {
        nombre: '',
        descripcion: ''
      },
      meals_empty: '',
      nombreRule: [v => !!v || `Debe ingresar un Nombre`]
    }
  },
  props: ['dialog'],
  methods: {
    guardarMinuta (data) {
      let vm = this
      if (vm.$refs.form.validate()) {
        vm.$store.dispatch('minuta/agregarInformacionMinuta', data)
        let minutaState = vm.$store.getters['minuta/minutaActual']
        let minuta = JSON.parse(JSON.stringify(minutaState))
        minuta.comidas = JSON.stringify(minuta.comidas)
        minutaService.save(minuta).then(data => {
          let minuta = data.body.minuta
          vm.$store.commit('minuta/limpiarMinuta')
          vm.$router.push({path: `/minutas/${minuta.id}`})
        }, err => {
          console.log(`error en la peticion:`)
          console.log(err)
        })
      }
    },
    closeDialog () {
      this.$emit('closeDialog')
      this.minuta.nombre = ''
      this.minuta.descripcion = ''
    }
  },
  watch: {
    dialog (val) {
      if (val) {
        let vm = this
        vm.meals_empty = ''
        let minutaState = vm.$store.getters['minuta/minutaActual']
        let minuta = JSON.parse(JSON.stringify(minutaState))
        vm.minuta.nombre = minuta.nombre
        vm.minuta.descripcion = minuta.descripcion
        minuta.comidas.forEach(comida => {
          if (comida.alimentos.length === 0) vm.meals_empty += vm.meals_empty.length === 0 ? comida.nombre : `, ${comida.nombre}`
        })
      }
    }
  }
}
</script>
