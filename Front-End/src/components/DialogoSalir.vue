<template>
  <div class="text-center pa-4">
    <v-dialog v-model="dialog" width="auto">
      <v-card
        max-width="600"
        prepend-icon="mdi-power-standby"
        text="¿Estas seguro que deseas cerrar sesión?"
        title="CERRAR SESIÓN"
      >
        <v-card-actions>
          <v-spacer></v-spacer>
          <!-- Botón de Cerrar diálogo -->
          <v-btn
            text="Cancelar" 
            variant="plain"
            @click="cerrarDialogo"
          ></v-btn>
          <!-- Botón de Salir de la aplicación -->
          <v-btn
            color="#2196f3"
            text="Cerrar sesión"
            variant="flat"
            rounded="xl"
            @click="salirAplicacion"
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

//  ->  Función para abrir y cerrar dialogo
const abrirDialogoSalirAplicacion = () => {
  dialog.value = true;
};
const cerrarDialogo = () => {
  dialog.value = false;
};

//  ->  Cerrar sesión del usuario.
const salirAplicacion = () => {
  console.log('Sesión cerrada.');
  cerrarDialogo();
};

//  ->  Exponer el método para que se pueda abrir desde fuera del componente.
defineExpose({ abrirDialogoSalirAplicacion });
</script>

<style scoped>

</style>
