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
        <v-btn :loading="loading" v-if="type === 'crear'" :disabled="!valid" @click="saveAlimento(alimento)" outline color="white">Guardar
          <v-icon right>save</v-icon>
        </v-btn>
        <v-btn :loading="loading" v-if="type === 'editar'" :disabled="!valid" @click="actualizarAlimento(alimento)" outline color="white">Actualizar
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
              <v-text-field :disabled="type === 'ver'" :rules="campoRule('nombre')" v-model="alimento.nombre" label="Nombre" color="secondary" required></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field :disabled="type === 'ver'" v-model="alimento.origen" label="Origen" color="secondary"></v-text-field>
            </v-flex>
            <v-flex xs12 md6>
              <v-select
                :disabled="type === 'ver'"
                :rules="campoRule('grupo')"
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
                :disabled="type === 'ver'"
                :rules="campoRule('sub grupo')"
                v-model="alimento.subgrupo"
                label="Sub Grupo"
                color="secondary"
                item-text="nombre"
                :items="subgrupos"
                item-value="nombre"
                required>
                </v-select>
            </v-flex>
            <v-flex :key="propiedad.id" v-for="propiedad in propiedades" xs12 md6>
              <v-text-field :disabled="type === 'ver'" :rules="propiedadRule()" type="Number" v-model.Number="alimento[propiedad.nombre]" :label="propiedad.nombre_real" color="secondary" required></v-text-field>
            </v-flex>
            </v-layout>
          </v-form>
        </v-container>
      </v-card-text>
    </v-card>
    <v-snackbar
      v-model="snackbar.show"
      :color="snackbar.color"
      right
      :timeout="4000"
      top>
    {{ snackbar.message }}
     <v-btn flat icon color="white" @click="snackbar.show = false">
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>
  </v-dialog>
</template>

<script>
import {grupoService} from '@/services/Grupo.service'
import {alimentoNutricionistaService} from '@/services/AlimentoNutricionista.service'
export default {
  data () {
    return {
      title: '',
      valid: true,
      grupos: [],
      subgrupos: [],
      loading: false,
      snackbar: {
        show: false,
        color: '',
        message: ''
      }
    }
  },
  props: ['dialog', 'type', 'alimento'],
  mounted () {
    let vm = this
    vm.cargarPropiedades()
    vm.grupos = grupoService.getGrupos()
    vm.subgrupos = grupoService.getSubgrupos()
  },
  methods: {
    saveAlimento (alimento) {
      let vm = this
      if (vm.$refs.form.validate()) {
        vm.loading = true
        alimentoNutricionistaService.save(alimento).then(data => {
          vm.$store.dispatch('loadMyAlimentos')
          vm.$eventHub.$emit('showSnackBar', {message: 'Alimento creado correctamente', color: 'green'})
          vm.closeDialog()
        })
      }
    },
    actualizarAlimento (alimento) {
      let vm = this
      if (vm.$refs.form.validate()) {
        vm.loading = true
        alimentoNutricionistaService.update(alimento.id, alimento).then(data => {
          vm.$store.dispatch('loadMyAlimentos')
          vm.$eventHub.$emit('showSnackBar', {message: 'Alimento editado correctamente', color: 'green'})
          vm.closeDialog()
        })
      }
    },
    propiedadRule () {
      return [v => (!!v || Number.isInteger(v)) || 'Debe ingresar un valor']
    },
    campoRule (campo) {
      return [v => !!v || `Debe ingresar un ${campo}`]
    },
    cargarPropiedades () {
      let vm = this
      vm.$store.dispatch('loadPropiedades').then(() => {
      }, () => {
        vm.$eventHub.$emit('showSnackBar', {message: 'Error al cargar las propiedades', color: 'red'})
      })
    },
    showSnackbar (message, color) {
      let vm = this
      vm.snackbar.message = message
      vm.snackbar.color = color
      vm.snackbar.show = true
    },
    closeDialog () {
      let vm = this
      vm.loading = false
      vm.$emit('closeDialog')
    }
  },
  computed: {
    propiedades () {
      return this.$store.getters.propiedades
    }
  },
  watch: {
    type (value) {
      let vm = this
      if (value === 'crear') vm.title = 'Crear Alimento'
      if (value === 'ver') vm.title = 'Ver Alimento'
      if (value === 'editar') vm.title = 'Editar Alimento'
    },
    dialog (value) {
      if (value) this.$refs.form.resetValidation()
    }
  }
}
</script>

