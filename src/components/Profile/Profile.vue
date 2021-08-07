<template>
  <v-card>
    <v-card-text>
      <v-layout row wrap>
        <v-flex xs12>
          <v-text-field v-model="profile.nombre" label="Nombre"></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-text-field disabled v-model="profile.email" label="Email"></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-text-field v-model="profile.telefono" label="Telefono"></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-text-field v-model="profile.profesion" label="Profesión"></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-textarea v-model="profile.presentacion" rows="2" label="Presentación"></v-textarea>
        </v-flex>
        <v-flex xs12>
          <v-textarea v-model="profile.ocupacion" rows="2" label="Ocupación"></v-textarea>
        </v-flex>
        <v-flex xs12>
          <v-text-field v-model="profile.especializacion" label="Especialización"></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-text-field v-model="profile.sitio_web" label="Sitio Web"></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-card>
            <v-card-text>
              <v-layout row wrap>
                <v-flex xs8>
                  <v-text-field
                    placeholder="Ingresa un Estudio"
                    label="Estudio"
                    v-model="study">
                  </v-text-field>
                </v-flex>
                <v-flex xs3>
                  <v-btn @click="addNewStudy(study)">Agregar</v-btn>
                </v-flex>
                <template v-for="(other_study, index) in profile.other_studies">
                  <v-flex xs4 :key="index + 'nombre'">
                    <v-text-field
                    label="Estudio"
                    v-model="other_study.nombre">
                    </v-text-field>
                  </v-flex>
                  <v-flex xs4 :key="index + 'lugar'">
                    <v-text-field
                    label="Lugar"
                    v-model="other_study.lugar">
                    </v-text-field>
                  </v-flex>
                  <v-flex xs4 :key="index +'_btn'">
                    <v-btn icon @click="deleteStudy(index)"><v-icon color="red">delete</v-icon></v-btn>
                  </v-flex>
                </template>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs12>
          <v-card>
            <v-card-text>
              <v-layout row wrap>
                <v-flex xs8>
                  <v-select
                    :items="languages_filter"
                    v-model="language_selected"
                    label="Idiomas"
                    item-text="nombre"
                    autocomplete
                    return-object>
                  </v-select>
                </v-flex>
                <v-flex xs3>
                  <v-btn @click="addNewLanguage(language_selected)">Agregar</v-btn>
                </v-flex>
                <template v-for="(lenguage_level, index) in profile.lenguages_level">
                  <v-flex xs4 :key="index + 'nombre'">
                    <v-text-field
                    label="Idioma"
                    v-model="lenguage_level.nombre"
                    readonly>
                    </v-text-field>
                  </v-flex>
                  <v-flex xs4 :key="index + 'nivel'">
                    <v-rating v-model="lenguage_level.nivel_manejo"></v-rating>
                  </v-flex>
                  <v-flex xs4 :key="index +'_btn'">
                    <v-btn icon @click="deleteLanguage(index)"><v-icon color="red">delete</v-icon></v-btn>
                  </v-flex>
                </template>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs12>
          <v-card>
            <v-card-text>
              <v-layout row wrap>
                <v-flex xs8>
                  <v-select
                    :items="social_networks_filter"
                    v-model="social_network_selected"
                    label="Redes Sociales"
                    item-text="nombre"
                    autocomplete
                    return-object>
                  </v-select>
                </v-flex>
                <v-flex xs3>
                  <v-btn @click="addNewSocialNetwork(social_network_selected)">Agregar</v-btn>
                </v-flex>
                <template v-for="social_network in profile.redes_sociales">
                  <v-flex xs6 :key="social_network.nombre + '_rrss'">
                    <v-text-field
                      placeholder="@"
                      v-model="social_network.url"
                      :label="social_network.nombre">
                    </v-text-field>
                  </v-flex>
                  <v-flex xs4 :key="social_network +'_btn'">
                    <v-btn icon @click="deleteSocialNetwork(social_network)"><v-icon color="red">delete</v-icon></v-btn>
                  </v-flex>
                </template>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs12>
          <v-btn color="primary" @click="updateProfile(profile)">Actualizar Perfil</v-btn>
        </v-flex>
      </v-layout>
      </v-card-text>
      <!-- Snackbar de notificaciones -->
      <v-snackbar
        v-model="snackbar.show"
        :color="snackbar.color"
        right
        :timeout="4000"
        top
      >
        {{ snackbar.message }}
      <v-btn flat icon color="white" @click="snackbar.show = false">
          <v-icon>close</v-icon>
        </v-btn>
      </v-snackbar>
  </v-card>
</template>

<script>
import CredentialsServices from '@/services/Credentials.service.js'
import {profileService} from '@/services/Profile.service.js'
import {languageService} from '@/services/Language.service.js'
import {socialNetworkService} from '@/services/SocialNetwork.service.js'
export default {
  data () {
    return {
      credentialService: new CredentialsServices(),
      profile: {
        id_profile: '',
        nombre: '',
        email: '',
        profesion: '',
        presentacion: '',
        ocupacion: '',
        especializacion: '',
        sitio_web: '',
        telefono: '',
        redes_sociales: [],
        lenguages_level: [],
        other_studies: []
      },
      social_networks: {},
      languages: [],
      type_rrss: [],
      social_network_selected: {},
      language_selected: {},
      study: '',
      snackbar: {
        show: false,
        color: '',
        message: ''
      }
    }
  },
  mounted () {
    let vm = this
    vm.profile.nombre = vm.credentialService.getCurrentUser().name
    vm.profile.email = vm.credentialService.getCurrentUser().email
    vm.profile.id_profile = vm.credentialService.getCurrentUser().id_profile
    if (vm.profile.id_profile) {
      profileService.getById(vm.profile.id_profile).then(response => {
        vm.profile = response.body
        console.log(vm.profile)
        vm.profile.nombre = vm.credentialService.getCurrentUser().name
        vm.profile.email = vm.credentialService.getCurrentUser().email
        vm.profile.id_profile = vm.credentialService.getCurrentUser().id_profile
        vm.profile.redes_sociales = vm.profile.rrss.map(rrss => {
          rrss.nombre = rrss.types_rrss.nombre
          return rrss
        })
        vm.profile.lenguages_level = vm.profile.nivel_lenguaje.map(language => {
          language.nombre = language.lenguaje.nombre
          return language
        })
      })
    }

    vm.loadLanguages()
    vm.loadSocialNetworks()
  },
  methods: {
    updateProfile (profile) {
      let vm = this
      profileService.save(profile).then(response => {
        vm.showSnackbar('Perfil actualizado con éxito.', 'green')
      })
    },
    showSnackbar (message, color) {
      let vm = this
      vm.snackbar.message = message
      vm.snackbar.color = color
      vm.snackbar.show = true
    },
    loadLanguages () {
      let vm = this
      languageService.query().then(response => {
        vm.languages = response.body
      })
    },
    loadSocialNetworks () {
      let vm = this
      socialNetworkService.query().then(response => {
        vm.type_rrss = response.body
      })
    },
    addNewSocialNetwork (socialNetworkSelected) {
      let vm = this
      socialNetworkSelected.id_type_rrss = socialNetworkSelected.id
      socialNetworkSelected.id = null
      vm.profile.redes_sociales.push(socialNetworkSelected)
      vm.social_network_selected = {}
      vm.type_rrss = vm.type_rrss.filter(rrss => {
        return rrss.nombre !== socialNetworkSelected.nombre
      })
    },
    deleteSocialNetwork (socialNetworkSelected) {
      let vm = this
      let newSocialNetworks = vm.profile.redes_sociales.filter(rrss => {
        return rrss.nombre !== socialNetworkSelected.nombre
      })
      let profile = JSON.parse(JSON.stringify(vm.profile))
      profile.redes_sociales = newSocialNetworks
      vm.profile = profile
    },
    addNewStudy (name) {
      this.profile.other_studies.push({
        nombre: name,
        lugar: ''
      })
      this.study = ''
    },
    deleteStudy (index) {
      this.profile.other_studies.splice(index, 1)
    },
    addNewLanguage (language) {
      this.profile.lenguages_level.push({
        nombre: language.nombre,
        id_lenguage: language.id,
        nivel_manejo: 0
      })
      this.language_selected = {}
    },
    deleteLanguage (index) {
      this.profile.lenguages_level.splice(index, 1)
      this.profile = JSON.parse(JSON.stringify(this.profile))
    }
  },
  computed: {
    social_networks_filter () {
      let vm = this
      return vm.type_rrss.filter(socialNetwork => {
        return !vm.profile.redes_sociales.find(socialNetworkSelected => socialNetworkSelected.nombre === socialNetwork.nombre)
      })
    },
    languages_filter () {
      let vm = this
      return vm.languages.filter(language => {
        return !vm.profile.lenguages_level.find(languageLevel => languageLevel.nombre === language.nombre)
      })
    }
  }
}
</script>

<style>

</style>