<template>
    <v-container class="container">
        <v-form ref="form" v-model="valid" class="mt-6">
          <!-- Fila para Nombre y Usuario -->
          <v-row>
            <v-col cols="12" sm="12">
              <v-text-field
                v-model="groupProfile.name"
                :rules="nameRules"
                label="Nombre"
                required
              ></v-text-field>
            </v-col>
          </v-row>
  
          <!-- Biografía -->
            <v-textarea
            v-model="groupProfile.description"
            :rules="descriptionRules"
            label="Descripción"
            rows="4"
          ></v-textarea>

          <v-col class="d-flex justify-center">
                <v-btn color="primary" @click="submitForm" class="">
              Guardar
            </v-btn>
            </v-col>
        </v-form>
    </v-container>
  </template>
  
  <script setup>
  import { ref } from "vue";
  
  // Definir el estado del perfil del usuario
  const groupProfile = ref({
    name: "",
    description: "",
  });
  
  const valid = ref(false);
  
  // Reglas
  const nameRules = [
    (v) => !!v || "El nombre es requerido",
    (v) => (v && v.length <= 30) || "El nombre debe ser menor de 30 caracteres",
  ];
  
  const descriptionRules = [
    (v) =>
      (v && v.length <= 120) || "La biografía debe ser menor de 120 caracteres",
  ];
  
  // Función para enviar el formulario
  const submitForm = () => {
    if (valid.value) {
      // Solicitudes a la API
      console.log("Perfil de Grupo actualizado:", groupProfile.value);
    } else {
      console.log("Formulario inválido");
    }
  };
  </script>
  
  <style scoped>
  .container {
    width: 100%;
  }


  </style>
  