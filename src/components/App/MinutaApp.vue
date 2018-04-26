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

        <v-list-tile :color="active('Mis Minutas')" @click="goTo('minutas')">
          <v-list-tile-action>
            <v-icon :color="active('Mis Minutas')">assignment</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Mis Minutas</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile @click="">
          <v-list-tile-action>
            <v-icon>add</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Crear Minuta</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile :color="active('Tabla de Composición')" @click="goTo('tabla-composicion')">
          <v-list-tile-action>
            <v-icon :color="active('Tabla de Composición')">list</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Tabla de Composición</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile @click="">
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
    </v-toolbar>
    <v-content>
      <v-container grid-list-xl>
        <router-view/>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      miniVariant: false
    }
  },
  methods: {
    goTo (ruta) {
      this.$router.push(ruta)
    },
    active (ruta) {
      if (ruta === this.$route.name) return 'primary'
    }
  }
}
</script>

