<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex v-for="minuta in minutas" :key="minuta.id" xs12 md4>
        <v-card>
          <v-toolbar color="orange" dark>
            <v-toolbar-title> {{ minuta.nombre }} </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="closeDialog()">
              <v-icon color="red" >delete</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text>
            <v-flex xs12>
              <v-text-field :rows="2" multi-line readonly :value="minuta.descripcion || ''" label="Descripción" color="orange"></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field readonly :value="moment(minuta.created_at).format('DD-MM-YYYY')" label="Fecha de Creación" color="orange"></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-btn @click="goTo('ver-minuta', {id: minuta.id})" dark block color="orange">Ver Minuta</v-btn>
            </v-flex>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { minutaService } from '@/services/Minuta.service'
export default {
  data () {
    return {
      minutas: []
    }
  },
  methods: {
    goTo (ruta, params) {
      this.$router.push({name: ruta, params: params})
    }
  },
  created () {
    let vm = this
    minutaService.query().then(data => {
      vm.minutas = data.body
    }, err => {
      console.log(err)
      console.log('erro')
    })
  }
}
</script>

