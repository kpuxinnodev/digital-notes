<!-- DialogComponent.vue -->
<template>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Diálogo de Ejemplo</span>
        </v-card-title>
        <v-card-text>
          Contenido del diálogo.
        </v-card-text>
        <v-card-actions>
          <v-btn text @click="closeDialog">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script setup>
  import { ref, defineExpose } from 'vue';
  
  const dialog = ref(false);
  
  const openDialog = () => {
    dialog.value = true;
  };
  
  const closeDialog = () => {
    dialog.value = false;
  };
  
  // Exponer el método openDialog para que pueda ser usado desde fuera
  defineExpose({ openDialog });
  </script>
  