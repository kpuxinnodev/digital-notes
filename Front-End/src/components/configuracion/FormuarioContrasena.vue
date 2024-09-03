<template>
  <v-container class="container">
    <v-card flat>
      <v-card-title class="mb-4"></v-card-title>

      <v-form ref="form" v-model="valid" @submit.prevent="enviarFormulario">
        <!-- Fila para Contraseña y Confirmar Contraseña -->
        <v-row>
          <v-col cols="12" sm="6">
            <!-- campo: contraseña -->
            <v-text-field
              v-model="cambioPassword.password"
              :rules="passwordRules"
              label="Contraseña"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <!-- campo: confirmar contraseña -->
            <v-text-field
              v-model="cambioPassword.confirmPassword"
              :rules="confirmPasswordRules"
              label="Confirmar Contraseña"
              required
            ></v-text-field>
          </v-col>
        </v-row>

        <!-- checkbox de confirmación -->
        <v-checkbox
          v-model="cambioPassword.confirmationChecked"
          :rules="confirmationRules"
          label="Estoy seguro de modificar mi contraseña."
        ></v-checkbox>

        <v-col class="d-flex justify-end">
          <!-- Botón de Guardar cambios -->
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

//  ->  Definir el estado del perfil del usuario
const cambioPassword = ref({
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
    console.log("Contraseña actualizada:", profile.value);
  } else {
    console.log("Formulario inválido");
  }
};

//  ->  Envio de los datos al Back-End
const enviarFormulario = async () => {
  if (!valid.value) return; // Verifica si el formulario es válido
  
  try {
    const response = await axios.post('http://localhost:8000/api/user', cambioPassword.value, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log('Tu contraseña ha sido cambiada:', response.data);
    // Redirigir o mostrar mensaje de éxito

  } catch (error) {
    console.error('Error al cambiar la contraseña:', error);
    // Manejar el error y mostrar un mensaje al usuario
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
