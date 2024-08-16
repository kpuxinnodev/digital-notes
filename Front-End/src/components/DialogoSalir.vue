<template>
  <div class="text-center pa-4">
    <v-dialog v-model="dialog" width="auto">
      <v-card
        max-width="600"
        prepend-icon="mdi-exit-run"
        text="¿Estas seguro que deseas salir de la aplicación?"
        title="SALIR"
      >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text="Cancelar" 
          variant="plain" 
          @click="cerrarDialogo"></v-btn>
          <v-btn
            color="#2196f3"
            text="Salir"
            variant="tonal"
            @click="salirAplicacion"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, defineExpose } from "vue";

const dialog = ref(false);

const abrirDialogoSalirAplicacion = () => {
  dialog.value = true;
};

const cerrarDialogo = () => {
  dialog.value = false;
};

//  ->  Añadir backend para guardar la nota.
const salirAplicacion = () => {
  console.log('Sesión cerrada.');
  cerrarDialogo();
};

// Exponer el método para que se pueda abrir desde fuera del componente.
defineExpose({ abrirDialogoSalirAplicacion });
</script>

<style scoped>

</style>
