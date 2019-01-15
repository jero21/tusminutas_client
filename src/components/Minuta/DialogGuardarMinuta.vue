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
              <v-text-field multi-line v-model="minuta.descripcion" label="Descripción Minuta" color="secondary"></v-text-field>
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
      }
    }
  },
  props: ['dialog'],
  methods: {
    guardarMinuta (data) {
      let vm = this
      vm.$store.dispatch('minuta/agregarInformacionMinuta', data)
      let minutaState = vm.$store.getters['minuta/minutaActual']
      let minuta = JSON.parse(JSON.stringify(minutaState))
      minuta.comidas = JSON.stringify(minuta.comidas)
      minutaService.save(minuta).then(data => {
        let minuta = data.body.minuta
        vm.$router.push({name: 'ver-minuta', params: {id: minuta.id}})
      }, err => {
        console.log(`error en la peticion:`)
        console.log(err)
      })
    },
    closeDialog () {
      this.$emit('closeDialog')
      this.minuta.nombre = ''
      this.minuta.descripcion = ''
    }
  }
}
</script>
