<template>
  <v-card class="component">
    <v-toolbar color="primary">
      <v-icon icon="mdi-book" id="toolbar-icon"></v-icon>
      <v-card-title>GUÍA DE USUARIO</v-card-title>
    </v-toolbar>

    <div class="d-flex flex-row">
      <!-- Pestañas principales -->
      <v-tabs
        v-model="mainTab"
        color="primary"
        class="mb-4 custom-tabs"
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
      <v-tabs-window v-model="mainTab" class="custom-tabs-window">
        <!-- Ventana 1 (Bienvenido) -->
        <v-tabs-window-item value="main-1">
          <!-- Contenido de la ventana 1 -->
          <v-card flat>
            <v-card-title>Bienvenido a la Guía de Usuario</v-card-title>
            <v-card-text>
              <p>
                En la Guía de Usuario podrás encontrar la ayuda necesaria para
                entender el funcionamiento de Digital Notes.
              </p>
            </v-card-text>
          </v-card>
        </v-tabs-window-item>

        <!-- Ventana 2 (Navegación) -->
        <v-tabs-window-item value="main-2" class="scrollable-window">
          <!-- Contenido de la ventana 2 -->
          <v-card flat>
            <v-card-title>Barra de Navegación</v-card-title>
            <v-card-text>
              <p>
                La barra de navegación está ubicada en la parte izquierda de la
                aplicación...
              </p>
            </v-card-text>
          </v-card>
        </v-tabs-window-item>

        <!-- Ventana 3 (Mi Espacio) -->
        <v-tabs-window-item value="main-3" class="scrollable-window">
          <!-- Contenido de la ventana 3 -->
          <v-card flat>
            <v-card-title>Mi Espacio</v-card-title>
            <v-card-text>
              <p>El Menú: Mi Espacio...</p>
            </v-card-text>
          </v-card>
        </v-tabs-window-item>

        <!-- Ventana 4 (Grupo) -->
        <v-tabs-window-item value="main-4" class="scrollable-window">
          <!-- Contenido de la ventana 4 -->
          <v-card flat>
            <v-card-title>Grupo</v-card-title>
            <v-card-text>
              <p>El Menú: Grupo...</p>
            </v-card-text>
          </v-card>
        </v-tabs-window-item>

        <!-- Ventana 5 (Notificaciones) -->
        <v-tabs-window-item value="main-5" class="scrollable-window">
          <!-- Contenido de la ventana 5 -->
          <v-card flat>
            <v-card-title>Notificaciones</v-card-title>
            <v-card-text>
              <p>Las Notificaciones...</p>
            </v-card-text>
          </v-card>
        </v-tabs-window-item>

        <!-- Ventana 6 (FAQ) -->
        <v-tabs-window-item value="main-6" class="scrollable-window">
          <!-- Contenido de la ventana 6 -->
          <v-card flat>
            <v-card-title>FAQ (Preguntas Frecuentes)</v-card-title>
            <v-card-text>
              <p>El menú de FAQ...</p>
            </v-card-text>
          </v-card>
        </v-tabs-window-item>

        <!-- Ventana 7 (Configuración) -->
        <v-tabs-window-item value="main-7" class="scrollable-window">
          <!-- Contenido de la ventana 7 -->
          <v-card flat>
            <v-card-title>Configuración de la Cuenta</v-card-title>
            <v-card-text>
              <p>En el menú de Configuración de la Cuenta...</p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem
                quam maxime asperiores non dolore, aliquam doloremque sunt
                accusamus, quaerat iure autem eius, ut possimus delectus
                pariatur facere harum iste unde.
              </p>
            </v-card-text>
          </v-card>
        </v-tabs-window-item>

        <!-- Fin de las ventanas -->
      </v-tabs-window>
    </div>
  </v-card>
</template>

<script setup>
import { ref } from "vue";

// Definir estado reactivo usando `ref`
const mainTab = ref("main-1");

// Opciones para las pestañas principales
const principales = ref([
  { value: "main-1", text: "Bienvenido", icon: "mdi-creation" },
  { value: "main-2", text: "Navegación", icon: "mdi-navigation" },
  { value: "main-3", text: "Mi Espacio", icon: "mdi-account" },
  { value: "main-4", text: "Grupo", icon: "mdi-account-multiple" },
  { value: "main-5", text: "Notificaciones", icon: "mdi-bell" },
  { value: "main-6", text: "FAQ", icon: "mdi-frequently-asked-questions" },
  { value: "main-7", text: "Configuración", icon: "mdi-cog" },
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
}

.custom-tabs-window {
  overflow: hidden !important; /* Oculta las barras de desplazamiento en la ventana de pestañas */
}

.scrollable-window {
  max-height: calc(
    90vh - 64px
  ); /* Ajusta según la altura de tu barra de herramientas y otros elementos */
  overflow-y: auto; /* Permite el desplazamiento vertical */
}
</style>
