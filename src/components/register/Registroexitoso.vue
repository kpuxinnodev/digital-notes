<template>
  <div class="componente">
    <!-- Hoja de diálogo -->
  <v-sheet
  class="pa-4 text-center mx-auto colorfondo"
  elevation="12"
  max-width="600"
  rounded="lg"
  v-if="dialogo"
>
    <!-- Ícono de 'error' -->
  <v-icon
    class="mt-12 mb-12"
    color="success"
    icon="mdi-check-circle"
    size="90"
  ></v-icon>

  <!-- Mensaje de error -->
  <h2 class="text-h5 mb-6">Se ha registrado exitosamente</h2>
  <p class="mb-4 text-medium-emphasis text-body-2">
    La cuenta se ha creado correctamente, ya puedes ingresar a la aplicación.
  </p>

  <v-divider class="mb-4"></v-divider>

  <!-- Botón de cerrar -->
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
//  ->  Importes
import { ref, defineExpose } from 'vue';
import { useRouter } from 'vue-router';

//  ->  Creación de router
const router = useRouter();

//  ->  Diálogo por referencia (oculto)
const dialogo = ref(false)

//  ->  Función de Mostrar Diálogo
const abrirMostrarRegistrado = () => {
    dialogo.value = true;
  };

//  ->  Función de redireccionamiento a la página de login
const cerrar = () => {
  router.push("/login");
};

//  ->  Permitir exportar la función para utilizarla en otro componente
  defineExpose({ abrirMostrarRegistrado });
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
</style>
