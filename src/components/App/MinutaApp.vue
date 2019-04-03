<template>
  <v-app>
    <v-navigation-drawer
      persistent
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      width="280"
      enable-resize-watcher
      fixed
      app>
      <v-toolbar
        color="secondary"
        dark>
        <v-toolbar-title>TusMinutas</v-toolbar-title>
      </v-toolbar>
      <v-layout style="padding-top:6px;" row wrap>
        <v-flex xs3>
          <img class="img-profile" :src="credentialService.getCurrentUser().avatar" alt="">
        </v-flex>
        <v-flex style="padding-top:5px;" xs9>
          <v-layout row wrap>
            <v-flex><strong>{{credentialService.getCurrentUser().name}}</strong></v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex>{{credentialService.getCurrentUser().email}}</v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-btn @click="logout" style="margin:0px;" small outline color="error">Cerrar Sesión</v-btn>
          </v-layout>
        </v-flex>
      </v-layout>
      
      <v-list>
        <v-subheader>Menu</v-subheader>

        <v-list-tile v-for="(item, i) in items" :key="i" :color="active(item.route)" @click="goTo(item.route)">
          <v-list-tile-action>
            <v-icon :color="active(item.route)">{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.nombre }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <!--

        <v-divider></v-divider>
        <v-subheader>Soporte</v-subheader>

        <v-list-tile @click="">
          <v-list-tile-action>
            <v-icon>insert_comment</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Danos tu opinión</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile @click="">
          <v-list-tile-action>
            <v-icon>error</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Notificar Error</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        -->
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      app
      :clipped-left="clipped"
      color="primary"
      dark>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title v-text="this.$route.name"></v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container grid-list-xl>
        <router-view/>
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
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import CredentialsServices from '@/services/Credentials.service.js'
export default {
  data () {
    return {
      credentialService: new CredentialsServices(),
      clipped: false,
      drawer: true,
      fixed: false,
      miniVariant: false,
      items: [
        {nombre: 'Mis Minutas', route: 'minutas', icon: 'assignment'},
        {nombre: 'Crear Minuta', route: 'crear-minuta', icon: 'add'},
        {nombre: 'Tabla de Composición', route: 'tabla-composicion', icon: 'list'},
        {nombre: 'Mis Alimentos', route: 'mis-alimentos', icon: 'fa-apple-alt'}
      ],
      snackbar: {
        show: false,
        color: '',
        message: ''
      }
    }
  },
  created () {
    let vm = this
    vm.$store.dispatch('loadAlimentos').then(() => {
    }, () => {
      vm.$root.$emit('error-carga-alimentos')
    })
    vm.$eventHub.$on('showSnackBar', vm.showSnackBar)
  },
  methods: {
    goTo (route) {
      this.$router.push({path: `/${route}`})
    },
    active (ruta) {
      if (this.$route.path.includes(ruta)) return 'primary'
    },
    logout () {
      let vm = this
      vm.credentialService.clearCredentials()
      vm.$router.push('/login')
    },
    showSnackBar (data) {
      let vm = this
      vm.snackbar.message = data.message
      vm.snackbar.color = data.color
      vm.snackbar.show = true
    }
  }
}
</script>

<style>
  tbody {
    max-height: 400px !important; 
    overflow-y: auto;
  }

  .table.table thead tr {
    height: 38px;
  }

  .table.table thead th {
    font-size: 13px;
  }

  .img-profile {
    margin: 5px;
    border-radius: 30px;
  }

</style>



