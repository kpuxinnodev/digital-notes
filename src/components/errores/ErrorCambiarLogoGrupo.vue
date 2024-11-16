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


    <h2 class="text-h5 mb-6">¡Error al cambiar logo del grupo!</h2>

    <p class="mb-4 text-medium-emphasis text-body-2">
      Hubo un problema al cambiar logo grupo.</p>

    <v-divider class="mb-4"></v-divider>

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
import { ref, defineExpose } from 'vue';

const dialogo = ref(false)

const abrirMostrarError = () => {
    dialogo.value = true;
  };

  const cerrar = () => ref(
    dialogo.value = false
);

  defineExpose({ abrirMostrarError });
</script>

<style scoped>
.componente {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 600px;
}

.colorfondo {
  background-color: #263238;
}

.resaltar {
  font-weight: bolder;
  color: #E53925;
}
</style>

