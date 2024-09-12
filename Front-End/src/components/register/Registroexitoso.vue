<template>
    <div class="componente">
        <v-sheet
    class="pa-4 text-center mx-auto"
    elevation="12"
    max-width="600"
    rounded="lg"
    width="100%"
    v-if="dialogo"
  >
    <v-icon
      class="mb-5"
      color="success"
      icon="mdi-check-circle"
      size="112"
    ></v-icon>

    <h2 class="text-h5 mb-6">Se ha registrado exitosamente</h2>

    <p class="mb-4 text-medium-emphasis text-body-2">
      Se ha registrado exitosamente, todos los datos ingresados son correctos.
    </p>

    <v-divider class="mb-4"></v-divider>

    <div class="text-end">
      <v-btn
        class="text-none"
        color="success"
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

const abrirMostrarRegistrado = () => {
    dialogo.value = true;
  };

  const cerrar = () => ref(
    dialogo.value = false
);

  defineExpose({ abrirMostrarRegistrado });
</script>

<style scoped>
.componente {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>
