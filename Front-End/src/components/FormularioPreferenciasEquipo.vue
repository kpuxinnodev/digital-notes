<template>
  <v-container class="container">
    <!-- Muestra los datos -->
    <div class="d-flex flex-row" v-for="(dato, index) in datos" :key="index">
      <v-card flat class="carta-1">
        <v-card-text class="d-flex flex-column justify-center align-center">
          <!-- Cargar avatar del Back-End -->
          <img
            v-for="(avatar, index) in avatarDB"
            :key="index"
            :src="avatar.img"
            :alt="avatar.descripcion"
          />
          <p class="mt-2">{{ dato.name }}</p>
        </v-card-text>
      </v-card>
      <v-card flat class="d-flex align-center pl-8 pr-8">
        <v-card-text>
          <p>{{ dato.description }}</p>
        </v-card-text>
      </v-card>
      <p>{{ dato.f_creacion }}</p>
    </div>

    <v-divider class="divisor"></v-divider>

    <!-- Formulario para editar datos -->
    <v-form ref="form" v-model="valid" class="mt-6">
      <v-row>
        <!-- Campo de archivo para seleccionar la imagen -->
        <v-col cols="12">
          <v-card flat>
            <v-file-input
              :rules="subirAvatar"
              label="Cambiar logo de equipo"
              prepend-icon="mdi-account"
              variant="filled"
            ></v-file-input>
            <v-col class="d-flex justify-end">
              <v-btn
              color="primary"
              @click="submitForm"
              >Confirmar Logo</v-btn>
            </v-col>
          </v-card>
        </v-col>
      </v-row>
    </v-form>
    
    <v-divider class="divisor"></v-divider>

    <!-- ? Componente: FormularioGrupoPreferencias2.vue -->
    <FormularioGrupoPreferencias2 />
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import FormularioGrupoPreferencias2 from "./FormularioGrupoPreferencias2.vue";

const valid = ref(false);

//  ->  Datos cargados desde el Back-End
let datos = ref([
  {
    name: "nombre",
    f_creacion: "21-10-2024",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui libero quisquam incidunt deserunt voluptatum facilis porro vitae. Facere, a nemo id quod eligendi velit illum soluta, voluptatum perferendis dolores culpa!",
  },
]);

//  ->  Avatar cargado del Back-End
let avatarDB = ref([{ img: "/img/nav/user.png", descripcion: "avatar.png" }]);

//  ->  Guardar avatar subido por el usuario.
const avatar = ref([{ imagen: "" }]);

//  ->  Reglas de validación para el avatar
const subirAvatar = [(v) => !!v || "La imagen es requerida"];

//  ->  Enviar Formulario
const submitForm = () => {
  if (valid.value) {
    //  ->  Solicitudes a la API
    console.log("Avatar actualizado: ", avatar.value);
  } else {
    console.log("Formulario inválido");
  }
};
</script>

<style scoped>
.v-card {
  padding: 20px;
}

.container {
  width: 80%;
}
</style>
