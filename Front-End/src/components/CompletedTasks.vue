<template>
    <v-card
      class="fixed-card"
      width="500"
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
            <v-card class="mx-auto cartas">
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
  import { ref } from 'vue'

  const tareas_completadas = ref([
    {icono:'mdi-briefcase', texto:'uno'},
    {icono:'mdi-briefcase', texto:'dos'},
    {icono:'mdi-briefcase', texto:'tres'},
    {icono:'mdi-briefcase', texto:'cuatro'},
    {icono:'mdi-briefcase', texto:'cinco'}
  ])

  const open = ref(null);
  </script>
  
  <style scoped>

  .fixed-card {

    position: fixed; /*Mantiene el componente en una posición fija en la ventana del navegador */
    top: 4%; /* Ajusta la distancia desde la parte superior de la ventana */
    z-index: 1000; /* Asegura que el componente esté por encima de otros elementos */
    background: white; /* Asegura que el fondo del componente sea visible */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Añade una sombra para destacar el componente */
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
  