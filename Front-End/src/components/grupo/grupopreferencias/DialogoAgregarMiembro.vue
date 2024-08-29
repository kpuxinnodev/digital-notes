<template>
    <v-dialog v-model="dialog" max-width="600">
      <v-card prepend-icon="mdi-account-plus" title="AGREGAR MIEMBRO"
      text="Agrega a un usuario para que forme parte de tu equipo.">
        <v-card-text>

            <v-text-field
              label="Usuario"
              required
            ></v-text-field>
  
          <!-- Sistema de cuadrículas -->
          
        </v-card-text>
  
        <v-divider></v-divider>
  
        <v-card-actions>
          <!-- Botón de Cerrar diálogo -->
          <v-btn
            text="Cancelar"
            variant="plain"
            @click="cerrarDialogo"
          ></v-btn>
          <!-- Botón de Guardar nota -->
          <v-btn
            color="primary"
            text="Agregar"
            variant="flat" rounded="xl"
            @click="agregarMiembro"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script setup>
  import { ref, defineExpose } from "vue";
  
  //  ->  'dialog' por referencia default = false
  const dialog = ref(false);
  
  //  ->  Funciones para abrir y cerrar el dialogo
  const abrirDialogoAgregarMiembro = () => {
    dialog.value = true;
  };
  const cerrarDialogo = () => {
    dialog.value = false;
  };
  
  //  ->  Añadir backend para agregar el miembro
  const agregarMiembro = () => {
    console.log('Miembro agregado.');
    cerrarDialogo();
  };
  
  //  ->  Exponer el método para que se pueda abrir desde fuera del componente.
  defineExpose({ abrirDialogoAgregarMiembro });
  </script>
  
  <style scoped>
  
  </style>
  