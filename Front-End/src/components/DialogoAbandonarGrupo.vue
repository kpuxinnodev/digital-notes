<template>
    <div class="text-center pa-4">
      <v-dialog v-model="dialog" width="auto">
        <v-card
          max-width="400"
          prepend-icon="mdi-exit-to-app"
          text="¿Estas seguro que deseas abandonar el grupo?"
          title="ABANDONAR GRUPO"
        >
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text="Cancelar" 
            variant="plain" 
            @click="cerrarDialogo"></v-btn>
            <v-btn
              color="primary"
              text="Abandonar grupo"
              variant="tonal"
              @click="abandonarGrupo"
            ></v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </template>
  
  <script setup>
  import { ref, defineExpose } from "vue";
  
  const dialog = ref(false);
  
  const abrirDialogoAbandonarGrupo = () => {
    dialog.value = true;
  };
  
  const cerrarDialogo = () => {
    dialog.value = false;
  };
  
  //  ->  Añadir backend para guardar la nota.
  const abandonarGrupo = () => {
    console.log('Has abandonado el grupo.');
    cerrarDialogo();
  };
  
  // Exponer el método para que se pueda abrir desde fuera del componente.
  defineExpose({ abrirDialogoAbandonarGrupo });
  </script>
  
  <style scoped>
  
  </style>
  