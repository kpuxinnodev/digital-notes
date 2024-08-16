<template>
    <v-card
      class="fixed-card"
    >
      <v-list v-model:opened="open">

        <v-list-group value="Tareas Completadas">
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              prepend-icon="mdi-check-decagram"
              title="Tareas Completadas"
            ></v-list-item>
          </template>

          <v-list-item v-for="(carta, index) in tareas_completadas" :key="index">
            <v-card class="cartas">
              <v-icon :icon="carta.icono" class="cartas-icono" id="icono-categoria-completadas"></v-icon>
              <v-card-text> {{ carta.texto }} </v-card-text>
              <v-icon color="success" icon="mdi-check" class="cartas-icono"></v-icon>
            </v-card>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-card>
  </template>
  
  <script setup>
  import { ref } from 'vue';

  //  ->  'open' por referencia default = null
  const open = ref(null);

  //  ->  Importar las tareas completadas desde el Back-End.
  const tareas_completadas = ref([
    {icono:'mdi-briefcase', texto:'uno'},
    {icono:'mdi-briefcase', texto:'dos'},
    {icono:'mdi-briefcase', texto:'tres'},
    {icono:'mdi-briefcase', texto:'cuatro'},
    {icono:'mdi-briefcase', texto:'cinco'}
  ]);

  </script>
  
  <style scoped>

  .fixed-card {
    width: 40%;
    position: fixed;
    top: 4%;
    z-index: 1000;
    background: white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  .cartas {
    display: flex;
    flex-direction: row;
  }

  .cartas-icono {
    align-self: center;
  }

  .v-list-group__items .v-list-item {
    padding-inline-start: 0 !important;
  }

  #icono-categoria-completadas {
    margin-left: 15px !important;
  }
  </style>
  