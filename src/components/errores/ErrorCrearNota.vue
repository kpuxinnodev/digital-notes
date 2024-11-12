<template>
  <div class="componente">

    <!-- Diálogo -->
    <v-sheet
      class="pa-4 text-center mx-auto colorfondo"
      elevation="12"
      max-width="600"
      rounded="lg"
      width="100%"
      v-if="dialogo"
    >
      <!-- Ícono -->
      <v-icon
        class="mt-12 mb-12"
        color="red-darken-1"
        icon="mdi-close-circle"
        size="90"
      ></v-icon>

      <!-- Mensaje de error -->
      <h2 class="text-h5 mb-6">¡Error al crear una nota!</h2>
      <p class="mb-4 text-medium-emphasis text-body-2">
        Te has encontrado con un problema al
        <span class="raya">crear una nota</span>.
        <br />
        Verifica los datos ingresados e intenta nuevamente.
      </p>

      <v-divider class="mb-4"></v-divider>

      <!-- Botón de cerrar -->
      <div class="text-end">
        <v-btn
          class="text-none"
          color="red-darken-1"
          variant="flat"
          width="90"
          rounded
          @click="cerrar"
        >
          OK
        </v-btn>
      </div>
    </v-sheet>
  </div>
</template>

<script setup>
//  ->  Imports
import { ref, defineExpose } from "vue";

//  ->  Funciones de mostrar y cerrar diálogo
const dialogo = ref(false);
const abrirMostrarError = () => {
  dialogo.value = true;
};
const cerrar = () => ref((dialogo.value = false));

defineExpose({ abrirMostrarError });
</script>

<style scoped>
.componente {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  width: 500px;
}

.raya {
  font-weight: bolder;
  color: #e53935;
}

.colorfondo {
  background-color: #263238;
}
</style>
