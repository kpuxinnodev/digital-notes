<template>
    <div class="componente">
        <v-sheet
    class="pa-4 text-center mx-auto colorfondo"
    elevation="12"
    max-width="600"
    rounded="lg"
    width="100%"
    v-if="dialogo"
  >
    <v-icon
      class="mt-12 mb-12"
      color="green-darken-1"
      icon="mdi-check-circle"
      size="90"
    ></v-icon>

    <h2 class="text-h5 mb-6">Se ha asignado correctamente</h2>

    <p class="mb-4 text-medium-emphasis text-body-2">
      Se le ha asignado, la nota a un miembro.
    </p>

    <v-divider class="mb-4"></v-divider>

    <div class="text-end">
      <v-btn
        class="text-none"
        color="green-darken-1"
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
import { useRouter } from 'vue-router';

const router = useRouter();

const dialogo = ref(false)

const abrirMostrarExito = () => {
    dialogo.value = true;
  };


const cerrar = () => {
  dialogo.value = false;
};

  defineExpose({ abrirMostrarExito });
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
  color: #43A047;
}

.colorfondo {
  background-color: #263238;
}
</style>
