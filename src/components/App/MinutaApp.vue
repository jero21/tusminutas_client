<template>
  <v-app>
    <v-navigation-drawer
      persistent
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      enable-resize-watcher
      fixed
      app>
      <v-toolbar
        color="secondary"
        dark>
        <v-toolbar-title>Tu Minuta</v-toolbar-title>
      </v-toolbar>
      <v-list>
        <v-subheader>Menu</v-subheader>

        <v-list-tile :color="active('mis-minutas')" @click="goTo('mis-minutas')">
          <v-list-tile-action>
            <v-icon :color="active('mis-minutas')">assignment</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Mis Minutas</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile :color="active('crear-minuta')" @click="goTo('crear-minuta')">
          <v-list-tile-action>
            <v-icon :color="active('crear-minuta')">add</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Crear Minuta</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile :color="active('tabla-composicion')" @click="goTo('tabla-composicion')">
          <v-list-tile-action>
            <v-icon :color="active('tabla-composicion')">list</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Tabla de Composición</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile :color="active('mis-alimentos')" @click="goTo('mis-alimentos')">
          <v-list-tile-action>
            <v-icon>local_pizza</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Mis Alimentos</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

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
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      app
      :clipped-left="clipped"
      color="primary"
      dark>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title v-text="this.$route.name"></v-toolbar-title>
      <v-spacer></v-spacer>
      {{credentialService.getCurrentUser()}}
          <v-menu bottom left>
            <v-btn icon slot="activator" dark>
              <v-icon>more_vert</v-icon>
            </v-btn>
            <v-list>
              <v-list-tile @click="logout">
                <v-list-tile-title>Cerrar Sesión</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
    </v-toolbar>
    <v-content>
      <v-container grid-list-xl>
        <router-view/>
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
      miniVariant: false
    }
  },
  created () {
    let vm = this
    vm.$store.dispatch('loadAlimentos').then(() => {
    }, () => {
      vm.$root.$emit('error-carga-alimentos')
    })
  },
  methods: {
    goTo (name) {
      this.$router.push({name: name})
    },
    active (ruta) {
      if (ruta === this.$route.name) return 'primary'
    },
    logout () {
      let vm = this
      vm.credentialService.clearCredentials()
      vm.$router.push('/login')
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

</style>



