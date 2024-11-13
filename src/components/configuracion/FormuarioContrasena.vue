<template>
  <!-- Componentes importados: Cambiar Contraseña (éxito y error) -->
  <CambiarContraseñaexitoso ref="cambiarcontrasena" style="position: absolute; z-index: 1000; top: 40%;" />
  <ErrorCambiarContrasena ref ="erroralcambiarcontrasena" style="position: absolute; z-index: 1000; top: 40%;" />
  
  <v-container class="container">
    <v-card flat class="windowcolor">
      <v-card-title class="mb-4">Cambiar contraseña de la cuenta</v-card-title>

      <v-form ref="form" v-model="valid" @submit.prevent="enviarFormulario" class="d-flex flex-column align-center justify-center formulario">
        <!-- Fila para Contraseña y Confirmar Contraseña -->
        <v-row class="inputs">
          <v-col cols="12" sm="6">
            <!-- campo: contraseña actual-->
            <v-text-field
              v-model="cambioPassword.password"
              :rules="passwordRules"
              label="Contraseña Actual"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <!-- campo: confirmar contraseña -->
            <v-text-field
              v-model="cambioPassword.newpassword_confirmation"
              :rules="confirmPasswordRules"
              label="Confirmar Contraseña"
              required
              class="inputs-1"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <!-- campo: contraseña nueva -->
            <v-text-field
              v-model="cambioPassword.newpassword"
              :rules="newpasswordRules"
              label="Contraseña Nueva"
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
            flat
          >Guardar Cambios</v-btn>
        </v-col>
      </v-form>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import ErrorCambiarContrasena from "../errores/ErrorCambiarContrasena.vue";
import CambiarContraseñaexitoso from "../exito/CambiarContraseñaexitoso.vue";

//  ->  Definir el estado del perfil del usuario
const cambioPassword = ref({
  password:"",
  newpassword: "",
  newpassword_confirmation: "",
  confirmationChecked: false,
});

//  ->  'valid' por default = false
const valid = ref(false);

//  ->  Reglas de contraseña, confirmar contraseña y aceptar acción.
const passwordRules = [
  (v) => !!v || "La contraseña actual requerida",
  (v) =>
    (v && v.length >= 8) || "La contraseña debe tener al menos 8 caracteres",
];

const newpasswordRules = [
  (v) => !!v || "La nueva contraseña es requerida",
  (v) =>
    (v && v.length >= 8) || "La contraseña debe tener al menos 8 caracteres",
];

const confirmPasswordRules = [
  (v) => !!v || "Debes confirmar tu contraseña",
  (v) => v === cambioPassword.value.newpassword || "Las contraseñas no coinciden",
];

const confirmationRules = [
  (v) => v || "Debes confirmar que estás seguro de los cambios",
];

const cerrarDialogo = () => {
  dialog.value = false;
};

const token = localStorage.getItem('auth-item');

//  ->  Envio de los datos al Back-End
const enviarFormulario = async () => {
  if (!valid.value) return; // Verifica si el formulario es válido
  
  try {
    const response = await axios.post('http://localhost:8000/api/users/cambiarcontraseña', cambioPassword.value, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    });

    console.log('Tu contraseña ha sido cambiada:', response.data);
    abrirMostrarExito();
    cerrarDialogo();
    // Redirigir o mostrar mensaje de éxito

  } catch (error) {
    console.error('Error al cambiar la contraseña:', error);
    // Manejar el error y mostrar un mensaje al usuario
    cerrarDialogo();
    abrirMostrarError();

  }
};

const erroralcambiarcontrasena = ref(null);
const cambiarcontrasena = ref(null);

const abrirMostrarError = () => {
  if (erroralcambiarcontrasena.value) {
    erroralcambiarcontrasena.value.abrirMostrarError();
  };
}

const abrirMostrarExito = () => {
  if (cambiarcontrasena.value) {
    cambiarcontrasena.value.abrirMostrarExito();
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
  background-color: #3f7f9c;
}

.windowcolor {
  background-color: #3f7f9c;
}

.inputs {
  width: 80%;
}

.inputs-1 {
  width: 100%;
}
</style>
