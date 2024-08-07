<template>
  <v-card class="component">
    <v-toolbar color="primary">
      <v-icon icon="mdi-frequently-asked-questions" id="toolbar-icon"></v-icon>
      <v-card-title>PREGUNTAS FRECUENTES</v-card-title>
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

      <!-- Ventanas de pestañas principales -->
      <v-tabs-window v-model="mainTab" class="custom-tabs-window">
        <!-- Ventana 1 (Bienvenido) -->
        <v-tabs-window-item value="main-1">
          <v-card flat>
            <v-card-title>Bienvenido al Sistema de FAQ</v-card-title>
            <v-card-text>
              <p class="mb-4">
                Aquí podrás consultar las preguntas frecuentes de la comunidad y encontrar una resuesta en base a una duda ya resuelta.
              </p>

              <p class="mb-4">
                Utiliza el menú de navegación de la izquierda para consultar los apartados 'Cuenta' y 'Seguridad'. En ellos encontrarás dudas de los usuarios con respecto a dichos temas y las respuestas brindadas de nuestra parte a dichas dudas.
              </p>

              <p class="mb-4">
                En caso de que tu duda no se relacione con ninguno de los apartados, o por otra parte, tu duda sea de otro tipo. Consulta el apartado 'Servicio Técnico' para saber como ponerte en contacto con nosotros.
              </p>
            </v-card-text>
          </v-card>
        </v-tabs-window-item>

        <!-- Ventana 2 (Cuenta) -->
        <v-tabs-window-item value="main-2" class="window">
          <!-- Contenido de la ventana 2 -->
          <v-list>
            <v-list-item>
              <h3>
                Dudas frecuentes acerca de la Cuenta de Usuario:
              </h3>
            </v-list-item>
            <v-list-item-group v-model="selectedItem">
              <v-list-item
                v-for="(item, index) in faqsCuenta"
                :key="index"
                @click="toggleItem(index)"
                :class="{ 'faq-active': selectedItem === index }"
              >
                <v-list-item-content>
                  <v-list-item-title>{{ item.question }}</v-list-item-title>
                  <v-list-item-subtitle v-if="selectedItem === index">
                    {{ item.answer }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-tabs-window-item>

        <!-- Ventana 3 (Seguridad) -->
        <v-tabs-window-item value="main-3" class="window">
          <!-- Contenido de la ventana 3 -->
          <v-list>
            <v-list-item>
              <h3>
                Dudas frecuentes acerca de la Seguridad:
              </h3>
            </v-list-item>
            <v-list-item-group v-model="selectedItem">
              <v-list-item
                v-for="(item, index) in faqsSeguridad"
                :key="index"
                @click="toggleItem(index)"
                :class="{ 'faq-active': selectedItem === index }"
              >
                <v-list-item-content>
                  <v-list-item-title>{{ item.question }}</v-list-item-title>
                  <v-list-item-subtitle v-if="selectedItem === index">
                    {{ item.answer }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-tabs-window-item>

        <!-- Ventana 4 (Servicio Técnico) -->
        <v-tabs-window-item value="main-4">
          <v-card flat>
            <v-card-title>Puedes contactarte con nosotros a través de:</v-card-title>
          </v-card>
          <v-card flat>
            <v-card-text>
              <p class="mb-4">
                E-mail: digitalnotes@gmail.com 
              </p>
              <p class="mb-4">
                Whatsapp: +598 12 345 678
              </p>
              <p class="mb-4">
                Teléfono: 4643 1234
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
const selectedItem = ref(null);

// Opciones para las pestañas principales
const principales = ref([
  { value: "main-1", text: "Bienvenido", icon: "mdi-creation" },
  { value: "main-2", text: "Cuenta", icon: "mdi-account" },
  { value: "main-3", text: "Seguridad", icon: "mdi-security" },
  { value: "main-4", text: "Servicio Técnico", icon: "mdi-tools" },
]);

const faqsCuenta = ref([
  { question: 'Pregunta1', answer: 'Respuesta1' },
  { question: 'Pregunta2', answer: 'Respuesta2' },
  { question: 'Pregunta3', answer: 'Respuesta3' }
]);

const faqsSeguridad = ref([
  { question: 'Pregunta1', answer: 'Respuesta1' },
  { question: 'Pregunta2', answer: 'Respuesta2' },
  { question: 'Pregunta3', answer: 'Respuesta3' }
]);

function toggleItem(index) {
  selectedItem.value = selectedItem.value === index ? null : index;
}
</script>

<style scoped>
.component {
  display: flex;
  flex-direction: column;
  height: 90vh; /* Usa vh para un ajuste de altura relativa a la ventana */
  width: 90%;
}

#toolbar-icon {
  margin-left: 15px;
}

.d-flex {
  flex: 1; /* Permite que el contenedor flex se expanda para ocupar el espacio disponible */
  display: flex;
  overflow: hidden; /* Asegura que el contenido no se desborde fuera de los límites del contenedor */
}

.custom-tabs {
  flex: 0 0 200px; /* Ajusta el tamaño fijo o mínimo para las pestañas */
  overflow: hidden; /* Oculta el desbordamiento en el área de las pestañas */
}

.custom-tabs-window {
  flex: 1; /* Ocupa el resto del espacio disponible */
  overflow-y: auto; /* Permite el desplazamiento vertical en la ventana de pestañas */
}

.window {
  max-height: calc(90vh - 64px); /* Ajusta según la altura de tu barra de herramientas */
  overflow-y: auto; /* Permite el desplazamiento vertical */
}

.faq-active .v-list-item-subtitle {
  display: block;
}

</style>
