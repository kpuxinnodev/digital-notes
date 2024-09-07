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
              color="primary"
            ></v-list-item>
          </template>

          <v-list-item v-for="(carta, index) in tareas_completadas" :key="index" class="scrolleable">
            <v-card class="cartas">
              <v-icon :icon="carta.icono" class="cartas-icono" id="icono-categoria-completadas"></v-icon>
              <v-card-text class="d-flex flex-row justify-space-between"> {{ carta.texto }} <span class="fecha">{{ carta.date }}</span> </v-card-text>
            </v-card>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-card>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import axios from 'axios';

  //  ->  'open' por referencia default = null
  const open = ref(null);

  //  ->  Importar las tareas completadas desde el Back-End.
  const tareas_completadas = ref([
    {icono:'mdi-briefcase', texto:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere. Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere.', date:'21/10/23'},
    {icono:'mdi-briefcase', texto:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere. Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere.', date:'29/11/23'},
    {icono:'mdi-briefcase', texto:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere. Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere.', date:'12/10/23'},
    {icono:'mdi-briefcase', texto:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere. Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere.', date:'15/09/23'},
    {icono:'mdi-briefcase', texto:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere. Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere.', date:'01/08/23'}
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
    max-height: 300px;
    overflow-y: auto;
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

  .fecha {
    position: absolute;
    top: 4px;
    right: 0;
    font-size: 10px;
    color: #2196f3;
  }
  </style>
  