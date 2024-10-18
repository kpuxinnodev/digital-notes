<template>
  <v-card class="component">
    <v-toolbar color="primary">
      <v-icon icon="mdi-cog" id="toolbar-icon"></v-icon>
      <v-card-title>CONFIGURACIÓN DE LA CUENTA</v-card-title>
    </v-toolbar>

    <div class="d-flex flex-row">
      <!-- Pestañas principales -->
      <v-tabs
        v-model="mainTab"
        color="primary"
        class="mb-4 custom-tabs scrollable-window"
        direction="vertical"
      >
        <v-tab
          v-for="(opcion, index) in principales"
          :key="index"
          :value="opcion.value"
          :prepend-icon="opcion.icon"
        >
          {{ opcion.text }}
        </v-tab>
      </v-tabs>

      <!-- Ventana de pestañas principales -->
      <v-tabs-window v-model="mainTab" class="custom-tabs-window w-100 mt-1">
        <!-- Ventana 1 (Perfil de Usuario) -->
        <v-tabs-window-item value="main-1">
          <PerfilDeUsuario />
        </v-tabs-window-item>

        <!-- Ventana 2 (Datos) -->
        <v-tabs-window-item value="main-2" class="scrollable-window">
          <FormularioDatos />
        </v-tabs-window-item>

        <!-- Ventana 3 (Seguridad) -->
        <v-tabs-window-item value="main-3" class="scrollable-window">
          <FormularioContrasena />
        </v-tabs-window-item>

        <!-- Fin de las ventanas -->
      </v-tabs-window>
    </div>
  </v-card>
</template>

<script setup>
import { ref } from "vue";
import FormularioDatos from "./FormularioDatos.vue";
import FormularioContrasena from "./FormuarioContrasena.vue";
import PerfilDeUsuario from "./PerfilDeUsuario.vue";

//  ->  Definir estado reactivo usando `ref`
const mainTab = ref("main-1");

//  ->  Opciones para las pestañas principales
const principales = ref([
  { value: "main-1", text: "Perfil", icon: "mdi-account" },
  { value: "main-2", text: "Datos", icon: "mdi-book-open-variant" },
  { value: "main-3", text: "Seguridad", icon: "mdi-security" },
]);
</script>

<style scoped>
.component {
  display: flex;
  flex-direction: column;
  height: 90%;
  width: 90%;
}

#toolbar-icon {
  margin-left: 15px;
}

.custom-tabs {
  overflow: hidden !important;
  border-right: 1px solid #2b2b2b;
}

.custom-tabs-window {
  overflow: hidden !important;
  height: 100vh;
}

.scrollable-window {
  max-height: calc(
    90vh - 64px
  );
  overflow-y: auto;
}
</style>
