<template>
  <ErrorActualizarPerfil ref="erroractualizarperfil" style="position: absolute; z-index: 1000; top: 40%;" />
  <ActualizarPerfilexitoso ref="actualizaciónperfiexitoso" style="position: absolute; z-index: 1000; top: 40%;" />
  <v-container class="container">
    <v-card flat class="windowcolor">
      <v-card-title class="mb-4">Cambiar datos de la cuenta</v-card-title>
      <v-form fast-fail @submit.prevent="enviarFormulario" v-model="valid" class="d-flex flex-column align-center justify-center formulario">
        <!-- Fila para Nombre y Usuario -->
        <v-row class="inputs">
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
          class="inputs"
        ></v-textarea>

        <v-col class="d-flex justify-end">
          <v-btn
            :disabled="!valid"
            color="primary"
            type="submit"
            flat
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
import ErrorActualizarPerfil from "../errores/ErrorActualizarPerfil.vue";
import ActualizarPerfilexitoso from "../exito/ActualizarPerfilexitoso.vue";

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

const cerrarDialogo = () => {
  dialog.value = false;
};

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
      console.log("Perfil actualizado:", response.data);
      abrirMostrarExito();
      cerrarDialogo();
    }
  } catch (error) {
    // Asegúrate de que error.response esté presente antes de acceder a él
    if (error.response) {
      console.error('Error en la respuesta:', error.response.data);
    } else {
      console.error('Error desconocido:', error);
    }
    cerrarDialogo();
    abrirMostrarError();
  }
}


const erroractualizarperfil = ref(null);
const actualizaciónperfiexitoso = ref(null);

  const abrirMostrarError = () => {
    if (erroractualizarperfil.value) {
      erroractualizarperfil.value.abrirMostrarError();
    };
  }

  const abrirMostrarExito = () => {
    if (actualizaciónperfiexitoso.value) {
      actualizaciónperfiexitoso.value.abrirMostrarExito();
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
</style>
