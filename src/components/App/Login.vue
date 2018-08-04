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
                <v-toolbar-title>Tu Minuta</v-toolbar-title>
                <v-spacer></v-spacer>
                  <g-signin-button
                    :params="googleSignInParams"
                    @success="onSignInSuccess"
                    @error="onSignInError">
                      <v-btn color="blue">
                        Sign in with Google
                      </v-btn>
                  </g-signin-button>
              </v-toolbar>
              <v-card-text>
                <v-form v-model="valid" ref="form" lazy-validation>
                  <v-text-field :rules="emailRules" prepend-icon="person" name="login" label="Login" v-model="credentials.email" type="text" required></v-text-field>
                  <v-text-field :rules="passwordRules" prepend-icon="lock" name="password" label="Password" v-model="credentials.password" type="password" required></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn :disabled="formValidado" @click="submit(credentials)" :loading="isLoading" color="primary">Iniciar Sesión</v-btn>
              </v-card-actions>
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
      isLoading: false,
      credentialService: new CredentialsServices(),
      emailRules: [
        v => !!v || 'Debe ingresar un e-mail',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'El e-mail no es valido'
      ],
      passwordRules: [
        v => !!v || 'Debe ingresar una constraseña'
      ],
      credentials: {
        email: '',
        password: ''
      },
      gradient: 'to top right,rgba(0,151,167,1),rgba(2,119,129,1) ',
      googleSignInParams: {
        client_id: '219352268007-7l6312ken2a5q09v1guf9kak3p39vfj1.apps.googleusercontent.com'
      }
    }
  },
  methods: {
    submit (credentials) {
      let vm = this
      vm.isLoading = true
      loginService.authenticate(credentials).then(data => {
        vm.credentialService.setToken(data.body.token)
        vm.credentialService.setCurrentUser(data.body.email)
        this.$router.push('/minutas')
        console.log(data)
      }, err => {
        vm.isLoading = false
        console.log(err)
      })
    },
    onSignInSuccess (googleUser) {
      const profile = googleUser.getBasicProfile()
      console.log(profile)
      console.log(googleUser)
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


