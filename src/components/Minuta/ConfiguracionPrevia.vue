<template>
<v-flex xs12>
  <blockquote class="blockquote">
      {{ conf.title }}
  </blockquote>
  <blockquote v-if="previa" style="font-size:15px;padding-top:0" class="blockquote">
    <v-icon small color="info">info</v-icon>
    {{ conf.info }}
  </blockquote>
    <v-flex xs12 md4 lg4>
      <v-flex xs12>
        <v-text-field v-model="infoMinuta.nombre" placeholder=" " label="Nombre Minuta" color="secondary" required></v-text-field>
      </v-flex>
      <v-flex xs12>
        <v-textarea placeholder=" " rows="2" v-model="infoMinuta.descripcion" label="Descripción Minuta" color="secondary"></v-textarea>
      </v-flex>
    </v-flex>
    <blockquote style="font-size:15px;" class="blockquote">
    <v-icon small color="info">info</v-icon>
    Selecciona propiedades con sus cantidades maximas segun cada comida y podras ver alertas al momento de crear tu minuta.
  </blockquote>
     <v-flex xs12 md6 lg6>
        <v-select
          :items="propiedades"
          :search-input.sync="search"
          v-model="select"
          label="Selecciona una propiedad"
          item-text="nombre_real"
          persistent-hint
          autocomplete
          return-object>
        </v-select>
      </v-flex>
        <v-flex xs12>
          <v-data-iterator
            :items="configuracion_minuta"
            :rows-per-page-items="[-1]"
            :pagination.sync="pagination"
            content-tag="v-layout"
            no-data-text=""
            row
            wrap
            hide-actions>
            <template v-slot:item="props">
              <v-flex
                xs12
                md3>
                <v-card>
                  <v-card-title><h4>{{ props.item.nombre_real }}: {{ getTotalPropiedad(props.item.configuracion_platos) }} ({{ props.item.unidad_medida }})</h4></v-card-title>
                  <v-divider></v-divider>
                  
                  <v-list dense>
                    <v-list-tile :key="index" v-for="(plato, index) in props.item.configuracion_platos">
                      <v-list-tile-content>{{ plato.nombre }}</v-list-tile-content>
                      <v-list-tile-content class="align-end">
                        <v-text-field
                          v-model.number="plato.cant_maxima"
                          class="mx-3 input-porcentaje"
                          type="Number"
                          :placeholder="props.item.unidad_medida"
                          flat>
                        </v-text-field>
                      </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile>
                      <v-list-tile-content>Total</v-list-tile-content>
                      <v-list-tile-content class="align-end">
                        <v-text-field
                          :value="getTotalPropiedad(props.item.configuracion_platos)"
                          class="mx-3 input-porcentaje"
                          readonly
                          type="Number"
                          
                          flat>
                        </v-text-field>
                      </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile>
                      <v-list-tile-content>
                        <v-btn @click="eliminarAlimento(props.index)"  outline color="red" dark>Eliminar</v-btn>
                      </v-list-tile-content>
                    </v-list-tile>
                  </v-list>
                </v-card>
              </v-flex>
            </template>
          </v-data-iterator>
        </v-flex>
  <v-flex xs12>
    <v-btn @click="guardarConfiguracion()" color="primary">Guardar</v-btn>
    <v-btn @click="saltarConfiguracion()">{{ conf.btnText }}</v-btn>
    <v-btn @click="limpiarDatos()" v-if="!minutaEsNueva && !edit" color="orange" dark>Crear Nueva Minuta</v-btn>
  </v-flex>
</v-flex>
</template>

<script>

let configuracionPlato = [
  {nombre: 'Desayuno', id_tipo_comida: 1, cant_maxima: 0, configuracion: []},
  {nombre: 'Almuerzo', id_tipo_comida: 2, cant_maxima: 0, configuracion: []},
  {nombre: 'Once', id_tipo_comida: 3, cant_maxima: 0, configuracion: []},
  {nombre: 'Cena', id_tipo_comida: 4, cant_maxima: 0, configuracion: []},
  {nombre: 'Colación 1', id_tipo_comida: 5, cant_maxima: 0, configuracion: []},
  {nombre: 'Colación 2', id_tipo_comida: 6, cant_maxima: 0, configuracion: []},
  {nombre: 'Colación 3', id_tipo_comida: 7, cant_maxima: 0, configuracion: []}
]
export default {
  data () {
    return {
      minuta: {},
      search: '',
      select: {},
      configuracion_minuta: [],
      propiedades: [],
      pagination: {
        rowsPerPage: -1
      },
      conf: {
        title: 'Configuración previa de la minuta.',
        info: 'Si deseas puedes saltar la configuracion previa.',
        btnText: 'Saltar'
      }
    }
  },
  props: ['previa', 'edit'],
  methods: {
    guardarConfiguracion () {
      let vm = this
      let configuracionPorPlato = JSON.parse(JSON.stringify(configuracionPlato))
      vm.configuracion_minuta.forEach((propiedad) => {
        let cantMaxima = 0
        propiedad.configuracion_platos.forEach((configuracion, indexComida) => {
          if (configuracion.cant_maxima) {
            let configuracionPlato = {
              nombre_real: propiedad.nombre_real,
              nombre: propiedad.nombre,
              cant_maxima: configuracion.cant_maxima,
              unidad_medida: propiedad.unidad_medida
            }
            cantMaxima += configuracion.cant_maxima
            configuracionPorPlato[indexComida].configuracion.push(configuracionPlato)
          }
        })
        propiedad.cant_maxima = cantMaxima
      })
      vm.$store.commit('minuta/actualizarConfiguracion', vm.configuracion_minuta)
      vm.$store.commit('minuta/agregarInformacionMinuta', vm.infoMinuta)
      vm.$store.dispatch('minuta/agregarConfiguracionComida', configuracionPorPlato)
      vm.saltarConfiguracion()
    },
    limpiarDatos () {
      this.$store.commit('minuta/limpiarMinuta')
      this.configuracion_minuta = JSON.parse(JSON.stringify(this.configuracionPropiedades))
    },
    saltarConfiguracion () {
      let vm = this
      vm.$emit('saltar-configuracion')
    },
    eliminarAlimento (index) {
      let prop = this.configuracion_minuta[index]
      prop.cant_maxima = 0
      prop.configuracion_platos = []
      this.configuracion_minuta.splice(index, 1)
      this.propiedades.push(prop)
    },
    eliminarPropiedadDeLista (propiedadId) {
      let index = this.propiedades.findIndex(propiedad => propiedad.id === propiedadId)
      this.propiedades.splice(index, 1)
    },
    getTotalPropiedad (platos) {
      let total = 0
      platos.forEach(plato => {
        total += plato.cant_maxima
      })

      return total
    }
  },
  mounted () {
    let vm = this
    // vm.minuta = JSON.parse(JSON.stringify(vm.infoMinuta))
    vm.configuracion_minuta = JSON.parse(JSON.stringify(vm.configuracionPropiedades))
    vm.propiedades = vm.propiedadesOriginales
    if (!vm.previa) {
      vm.conf.title = 'Configuración de la minuta.'
      vm.conf.btnText = 'Volver'
    }
  },
  computed: {
    propiedadesOriginales () {
      return JSON.parse(JSON.stringify(this.$store.getters.propiedades))
    },
    infoMinuta () {
      return JSON.parse(JSON.stringify(this.$store.getters['minuta/infoMinuta']))
    },
    configuracionPropiedades () {
      return JSON.parse(JSON.stringify(this.$store.getters['minuta/configuracion']))
    },
    minutaEsNueva () {
      return this.$store.getters['minuta/esNueva']
    }
  },
  watch: {
    select (data) {
      let vm = this
      if (vm.search !== '') {
        let configuracion = {
          id_propiedad: data.id,
          nombre_real: data.nombre_real,
          nombre: data.nombre,
          unidad_medida: data.unidad_medida,
          cant_maxima: 0,
          configuracion_platos: JSON.parse(JSON.stringify(configuracionPlato))
        }
        vm.eliminarPropiedadDeLista(data.id)
        vm.configuracion_minuta.push(configuracion)
        vm.select = {}
        vm.search = ''
      }
    },
    propiedadesOriginales (data) {
      this.propiedades = this.propiedadesOriginales
    }
  }
}
</script>

<style scoped>
.card__text {
    padding: 7px;
  }

  .input-cantidad {
    margin: 0 !important; 
    padding: 0;
    width: 60px;
    max-height: 40px;
  }

  .input-porcentaje {
    margin: 0 !important; 
    padding: 0;
    width: 50px;
    max-height: 40px;
  }
</style>


