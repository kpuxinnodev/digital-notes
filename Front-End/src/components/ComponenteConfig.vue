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
        <!-- Ventana 1 (Bienvenido) -->
        <v-tabs-window-item value="main-1">
          <!-- Contenido de la ventana 1 -->
        </v-tabs-window-item>
        <PerfilDeUsuario />
        <!-- Ventana 2 (Navegación) -->
        <v-tabs-window-item value="main-2" class="scrollable-window">
          <!-- Contenido de la ventana 2 -->
          <FormularioDatos />
        </v-tabs-window-item>

        <!-- Ventana 3 (Mi Espacio) -->
        <v-tabs-window-item value="main-3" class="scrollable-window">
          <!-- Contenido de la ventana 3 -->
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

// Definir estado reactivo usando `ref`
const mainTab = ref("main-1");

// Opciones para las pestañas principales
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
  height: 90%; /* Usa vh para un ajuste de altura relativa a la ventana */
  width: 90%;
}

#toolbar-icon {
  margin-left: 15px;
}

.custom-tabs {
  overflow: hidden !important; /* Oculta las barras de desplazamiento en las pestañas */
  border-right: 1px solid #2b2b2b;
}

.custom-tabs-window {
  overflow: hidden !important; /* Oculta las barras de desplazamiento en la ventana de pestañas */
  height: 100vh;
}

.scrollable-window {
  max-height: calc(
    90vh - 64px
  ); /* Ajusta según la altura de tu barra de herramientas y otros elementos */
  overflow-y: auto; /* Permite el desplazamiento vertical */
}

.titulo-lista {
  font-weight: 500;
  font-size: 1.3em;
}

.v-list-item {
  position: relative;
  padding-left: 2.5em; /* Ajusta el padding para dejar espacio para el punto */
  margin-left: 2.5em;
}

.v-list-item::before {
  content: "";
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 6px; /* Tamaño del punto */
  height: 6px; /* Tamaño del punto */
  background-color: white; /* Color del punto */
  border-radius: 50%; /* Hace que el punto sea redondo */
}

.espaciado-lista {
  min-height: 32px;
}
</style>
