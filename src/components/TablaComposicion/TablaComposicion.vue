<template>
  <v-layout row wrap>
    <v-flex xs12>
      <h3 class="title">Tabla de composición química de los alimentos</h3>
    </v-flex>
    <!--
    <v-flex xs12 md6>
      <v-text-field
        prepend-icon="search"
        label="Busca alimentos aquí"
        class="mx-3"
        flat>
      </v-text-field>
    </v-flex>
    <v-flex xs12 md11>
      <v-tabs slider-color="primary" dark>
        <v-tab v-for="grupo in grupos" :key="grupo.name">
          {{ grupo.name }}
        </v-tab>
      </v-tabs>
    </v-flex>
    -->
    <v-flex xs12>
      <v-toolbar
      color="primary"
      dark
      tabs
    >
      <v-text-field
        prepend-icon="search"
        label="Busca alimentos aquí"
        solo-inverted
        class="mx-3"
        flat
      ></v-text-field>
      <v-tabs
        slot="extension"
        centered
        v-model="tabs"
        slider-color="white"
        color="transparent"
      >
        <v-tab
          v-for="grupo in grupos"
          :key="grupo.name"
        >
        {{ grupo.name }}
        </v-tab>
      </v-tabs>
    </v-toolbar>
    <v-data-table
    :headers="headers"
    :items="items"
    hide-actions
    class="elevation-1"
  >
    <template slot="items" slot-scope="props">
      <td>{{ props.item.name }}</td>
      <td class="text-xs-right">{{ props.item.alimento }}</td>
      <td class="text-xs-right">{{ props.item.origen }}</td>
      <td class="text-xs-right">{{ props.item.humedad }}</td>
      <td class="text-xs-right">{{ props.item.energia }}</td>
      <td class="text-xs-right">{{ props.item.proteinas }}</td>
    </template>
  </v-data-table>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data () {
    return {
      tabs: null,
      grupos: [
        {name: 'Lact'},
        {name: 'Carnes'},
        {name: 'Cereales'},
        {name: 'Azúcar'},
        {name: 'Frut y Verd'},
        {name: 'Gras,sals y arder'},
        {name: 'Colados'},
        {name: 'Prep'},
        {name: 'Diet'},
        {name: 'Powerbars'},
        {name: 'Beb cal'},
        {name: 'Alcohol'}
      ],
      headers: [
        {text: 'Alimento', value: '', align: 'left', sortable: true},
        {text: 'Origen', value: '', align: 'left', sortable: true},
        {text: 'Humedad (%)', value: '', align: 'left', sortable: true},
        {text: 'Energía (kcal)', value: '', align: 'left', sortable: true},
        {text: 'Proteinas (gr)', value: '', align: 'left', sortable: true},
        {text: 'Fibra (gr)', value: '', align: 'left', sortable: true},
        {text: 'Calcio (mg)', value: '', align: 'left', sortable: true}
      ],
      items: []
    }
  }
}
</script>

