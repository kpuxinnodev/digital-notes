<template>
  <v-container class="container">
    <v-card flat>
      <v-card-title class="mb-4"></v-card-title>

      <v-form ref="form" v-model="valid">
        <!-- Fila para Contraseña y Confirmar Contraseña -->
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="profile.password"
              :rules="passwordRules"
              label="Contraseña"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="profile.confirmPassword"
              :rules="confirmPasswordRules"
              label="Confirmar Contraseña"
              required
            ></v-text-field>
          </v-col>
        </v-row>

        <v-checkbox
          v-model="profile.confirmationChecked"
          :rules="confirmationRules"
          label="Estoy seguro de modificar mi contraseña."
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

//  ->  Definir el estado del perfil del usuario
const profile = ref({
  password: "",
  confirmPassword: "",
  confirmationChecked: false,
});

//  ->  'valid' por default = false
const valid = ref(false);

//  ->  Reglas de contraseña, confirmar contraseña y aceptar acción.
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

//  ->  Función para enviar el formulario
const submitForm = () => {
  if (valid.value) {
    //  ->  Solicitudes a la API
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
