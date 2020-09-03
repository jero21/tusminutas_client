<template>
<section>
  <v-app id="inspire">
    <v-content>
      <v-jumbotron height="100%" :gradient="gradient">
        <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Bienvenido a TusMinutas.cl</v-toolbar-title>
              </v-toolbar>
                <v-card-text>
                  <v-layout row wrap>
                    <v-flex xs12>
                    <g-signin-button
                        :params="googleSignInParams"
                        @success="onSignInSuccess"
                        @error="onSignInError">
                          <v-btn :loading="loadingGoogle" block dark color="red">
                            Iniciar Sesión con Google
                          </v-btn>
                    </g-signin-button>
                    </v-flex>
                    <v-flex xs12>
                    <!--
                    <v-btn block dark color="#3b5998">
                      Iniciar Sesión con Facebook
                    </v-btn> -->
                    </v-flex>
                  </v-layout>
                </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
      </v-jumbotron>
    </v-content>
  </v-app>
</section>
</template>

<script>
import {loginService} from '@/services/Login.service'
import CredentialsServices from '@/services/Credentials.service.js'
export default {
  data () {
    return {
      valid: false,
      credentialService: new CredentialsServices(),
      emailRules: [
        v => !!v || 'Debe ingresar un e-mail',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'El e-mail no es valido'
      ],
      passwordRules: [
        v => !!v || 'Debe ingresar una constraseña'
      ],
      credentials: {
        access_token: ''
      },
      gradient: 'to top right,rgba(0,151,167,1),rgba(2,119,129,1) ',
      googleSignInParams: {
        client_id: '219352268007-7l6312ken2a5q09v1guf9kak3p39vfj1.apps.googleusercontent.com'
      },
      loadingGoogle: false
    }
  },
  methods: {
    submit (credentials) {
      let vm = this
      vm.loadingGoogle = true
      loginService.authenticate(credentials).then(data => {
        vm.credentialService.setCurrentUser(data.body)
        this.$router.push('/minutas')
      }, err => {
        vm.loagingGoogle = false
        console.log(err)
      })
    },
    onSignInSuccess (googleUser) {
      let vm = this
      vm.credentials.access_token = googleUser.wc.access_token
      vm.submit(vm.credentials)
    },
    onSignInError (error) {
      console.log('OH NOES', error)
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

<style scoped>
</style>


