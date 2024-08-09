<template>
  <v-container class="container">
    <v-card flat>
      <v-card-title class="mb-4"> Editar perfil </v-card-title>

      <v-form ref="form" v-model="valid">
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
              v-model="profile.username"
              :rules="usernameRules"
              label="Usuario"
              required
            ></v-text-field>
          </v-col>
        </v-row>

        <!-- Biografía -->
        <v-textarea
          v-model="profile.biography"
          :rules="biographyRules"
          label="Biografía"
          rows="4"
        ></v-textarea>

        <!-- Fila para Contraseña y Confirmar Contraseña -->
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="profile.password"
              :rules="passwordRules"
              label="Contraseña"
              required
              type="password"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="profile.confirmPassword"
              :rules="confirmPasswordRules"
              label="Confirmar Contraseña"
              required
              type="password"
            ></v-text-field>
          </v-col>
        </v-row>

        <!-- Checkbox de Confirmación -->
        <v-checkbox
          v-model="profile.confirmationChecked"
          :rules="confirmationRules"
          label="Estoy seguro de que quiero cambiar mis datos"
        ></v-checkbox>

        <v-col class="d-flex justify-end">
          <v-btn
          :disabled="!valid"
          color="primary"
          @click="submitForm"
          class="mt-4"
        >
          Guardar Cambios
        </v-btn>
        </v-col>        
      </v-form>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from "vue";

// Definir el estado del perfil del usuario
const profile = ref({
  name: "",
  username: "",
  email: "",
  biography: "",
  password: "",
  confirmPassword: "",
  confirmationChecked: false,
});

const valid = ref(false);

// Reglas
const nameRules = [
  (v) => !!v || "El nombre es requerido",
  (v) => (v && v.length <= 30) || "El nombre debe ser menor de 30 caracteres",
];

const usernameRules = [
  (v) => !!v || "El nombre de usuario es requerido",
  (v) =>
    (v && v.length <= 12) ||
    "El nombre de usuario debe ser menor de 12 caracteres",
];

const biographyRules = [
  (v) =>
    (v && v.length <= 120) || "La biografía debe ser menor de 120 caracteres",
];

const passwordRules = [
  (v) => !!v || "La contraseña es requerida",
  (v) =>
    (v && v.length >= 8) || "La contraseña debe tener al menos 8 caracteres",
];

const confirmPasswordRules = [
  (v) => !!v || "Debes confirmar tu contraseña",
  (v) => v === profile.value.password || "Las contraseñas no coinciden",
];

const confirmationRules = [
  (v) => v || "Debes confirmar que estás seguro de los cambios",
];

// Función para enviar el formulario
const submitForm = () => {
  if (valid.value) {
    // Solicitudes a la API
    console.log("Perfil actualizado:", profile.value);
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
