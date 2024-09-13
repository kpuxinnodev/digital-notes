<template>
  <v-container class="container">
    <v-card flat>
      <v-card-title class="mb-4"></v-card-title>
      <v-form fast-fail @submit.prevent="enviarFormulario" v-model="valid">
        <!-- Fila para Nombre y Usuario -->
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="profile.name"
              :rules="nameRules"
              label="Nombre"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="profile.nickname"
              :rules="nicknameRules"
              label="Usuario"
              required
            ></v-text-field>
          </v-col>
        </v-row>

        <!-- Biografía -->
        <v-textarea
          v-model="profile.biografia"
          :rules="biografiaRules"
          label="Biografía"
          rows="4"
        ></v-textarea>

        <v-col class="d-flex justify-end">
          <v-btn
            :disabled="!valid"
            color="primary"
            type="submit"
            class="mt-4"
            >Guardar Cambios</v-btn>
        </v-col>
      </v-form>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

//  ->  Perfil del usuario importadod esde el Back-End
const profile = ref({
  name: "",
  nickname: "",
  biografia: "",
});

//  ->  'valid' por default = false
const valid = ref(false);

//  ->  Reglas del nombre, username y biografía del usuario
const nameRules = [
  (v) => !!v || "El nombre es requerido",
  (v) => (v && v.length <= 30) || "El nombre debe ser menor de 30 caracteres",
];

const nicknameRules = [
  (v) => !!v || "El nombre de usuario es requerido",
  (v) =>
    (v && v.length <= 12) ||
    "El nombre de usuario debe ser menor de 12 caracteres",
];

const biografiaRules = [
  (v) =>
    (v && v.length <= 120) || "La biografía debe ser menor de 120 caracteres",
];

const token = localStorage.getItem('auth-item');

//  ->  Encabezado de la Autorización
const config = {
    headers: {
        'Content-Type':'application/json',
        'Authorization': `Bearer ${token}`
    }
};
const enviarFormulario = async () => {
  if (!valid.value) return;

  try {
    const response = await axios.put('http://localhost:8000/api/users/actualizar', profile.value, {
      headers: {
        "Content-Type": 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    // Verifica si response está definido antes de acceder a response.data
    if (response && response.data) {
      localStorage.setItem('auth-item', response.data.token);
      console.log("Perfil actualizado:", response.data);
    }
  } catch (error) {
    // Asegúrate de que error.response esté presente antes de acceder a él
    if (error.response) {
      console.error('Error en la respuesta:', error.response.data);
    } else {
      console.error('Error desconocido:', error);
    }
  }
}
</script>


<style scoped>
.v-card {
  padding: 20px;
}

.container {
  width: 80%;
  height: auto;
}
</style>
