<template>
  <v-app>
    <v-navigation-drawer
      persistent
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      enable-resize-watcher
      fixed
      app
    >
     <v-toolbar
      color="secondary"
      dark
    >
      <v-toolbar-title>Tú Minuta</v-toolbar-title>
    </v-toolbar>
      <v-list>
         <v-subheader>Menu</v-subheader>
        <v-list-tile
        @click="alert('mostar las minutas')"
        >
          <v-list-tile-action>
            <v-icon>assignment</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Mis Minutas</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile
        @click="alert('mostar las minutas')"
        >
          <v-list-tile-action>
            <v-icon>add</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Crear Minuta</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile
        @click="alert('mostar las minutas')"
        >
          <v-list-tile-action>
            <v-icon>list</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Tabla de Composición</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile
        @click="alert('mostar las minutas')"
        >
          <v-list-tile-action>
            <v-icon>local_pizza</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Mis Alimentos</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider></v-divider>
        <v-subheader>Soporte</v-subheader>
        <v-list-tile
        @click="alert('mostar las minutas')"
        >
          <v-list-tile-action>
            <v-icon>insert_comment</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Danos tu opinión</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile
        @click="alert('mostar las minutas')"
        >
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
      dark
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title v-text="title"></v-toolbar-title>
    </v-toolbar>
    <v-content>
      <router-view/>
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
      miniVariant: false,
      title: 'Mis Minutas'
    }
  },
  name: 'App'
}
</script>
