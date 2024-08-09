<template>
  <v-card class="component">
    <v-toolbar color="primary">
      <v-icon icon="mdi-frequently-asked-questions" id="toolbar-icon"></v-icon>
      <v-card-title>CONFIGURACIÓN DE LA CUENTA</v-card-title>
    </v-toolbar>

    <div class="d-flex flex-row">
      <!-- Pestañas principales -->
      <v-tabs
        v-model="mainTab"
        color="primary"
        class="mb-4 custom-tabs"
        direction="vertical"
        @change="onTabChange"
      >
        <v-tab class="tabulador"
          v-for="(opcion, index) in principales"
          :key="index"
          :value="opcion.value"
          :prepend-icon="opcion.icon"
        >
          {{ opcion.text }}
        </v-tab>
      </v-tabs>

      <!-- Ventana -->
      <v-tabs-window v-model="mainTab" class="custom-tabs-window">
        <v-tabs-window-item value="main-1">
            <v-card flat class="mt-4">
                <v-card-title>Datos de tu cuenta:</v-card-title>
            </v-card>
            <div class="d-flex flex-row" v-for="(dato, index) in datos" :key="index">
                <v-card flat class="carta-1">
              <v-card-text class="d-flex flex-column justify-center align-center">
                <img src="/img/nav/user.png" alt="profile.png" />
                <p class="mt-2">{{ dato.name }}</p>
                <p>@{{ dato.username }}</p>
              </v-card-text>
            </v-card>
            <v-card flat class="d-flex align-center pl-8 pr-8">
              <v-card-text>
                <p>{{ dato.biography }}</p>
              </v-card-text>
            </v-card>
            </div>


          <v-divider class="divisor"></v-divider>

            <!-- Formulario -->
            <v-container class="d-flex flex-row formulario">
                <AccountConfigForm />
            </v-container>
        </v-tabs-window-item>

        <!-- Fin de las ventanas -->
      </v-tabs-window>
    </div>
  </v-card>
</template>

<script setup>
import { ref } from "vue";
import AccountConfigForm from "./AccountConfigForm.vue";

// Definir estado reactivo usando `ref`
const mainTab = ref("main-1");

// Opciones para las pestañas principales
const principales = ref([
  { value: "main-1", text: "Perfil", icon: "mdi-creation" },
]);

let datos = ref([
    {name:'nombre', username:'usuario', biography:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui libero quisquam incidunt deserunt voluptatum facilis porro vitae. Facere, a nemo id quod eligendi velit illum soluta, voluptatum perferendis dolores culpa!'}
])

</script>

<style scoped>
.component {
  display: flex;
  flex-direction: column;
  height: 90vh;
  width: 90%;
}

#toolbar-icon {
  margin-left: 15px;
}

.d-flex {
  display: flex;
  overflow: auto;
}

.custom-tabs-window {
  overflow-y: auto;
  width: 80%;
  margin: auto;
}

.window {
  max-height: calc(
    90vh - 64px
  );
  overflow-y: auto;

}

.faq-active .v-list-item-subtitle {
  display: block;
  color: white;
  opacity: 100;
}

.faq-active .v-list-item-title {
  color: #2196f3;
}

.tabulador {
    display: none;
}

.carta-1 {
    width: 40%;
}

.formulario {
    width: 100%;
    margin: auto;
}
</style>
