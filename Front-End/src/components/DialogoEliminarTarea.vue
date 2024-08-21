<template>
    <div class="text-center pa-4">
      <v-dialog v-model="dialog" width="auto">
        <v-card
          max-width="600"
          prepend-icon="mdi-delete-empty"
          text="¿Estas seguro que deseas eliminar la tarea?"
          title="ELIMINAR TAREA"
        >
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              text="Cancelar" 
              variant="plain" 
              @click="cerrarDialogo"
            ></v-btn>
            <v-btn
              color="#2196f3"
              rounded="xl"
              text="Eliminar"
              variant="flat"
              @click="eliminarTarea"
            ></v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </template>
  
  <script setup>
  import { ref, defineExpose } from "vue";
  
  //  ->  'dialog' por referencia default = false
  const dialog = ref(false);
  
  //  ->  Funciones para abrir y cerrar el dialogo
  const abrirDialogoEliminarTarea = () => {
    dialog.value = true;
  };
  const cerrarDialogo = () => {
    dialog.value = false;
  };
  
  //  ->  Añadir backend para abandonar el grupo.
  const eliminarTarea = () => {
    console.log('Has eliminado la tarea.');
    cerrarDialogo();
  };
  
  //  ->  Exponer el método para que se pueda abrir desde fuera del componente.
  defineExpose({ abrirDialogoEliminarTarea });
  </script>
  
  <style scoped>
  
  </style>
  