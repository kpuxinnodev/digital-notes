<template>
  <!-- Componentes importados (exito y error) -->
  <Registroexitoso ref="exitoalregistrarse" style="position: absolute;" />
  <ErrorRegistro ref="erroralregistrarse" style="position: absolute;" />

  <!--Formulario-->
  <div class="formulario">
    <!--Formulario: Título-->
    <h2>crear una cuenta</h2>

    <!-- Formulario: Inputs -->
    <v-sheet class="mx-auto" width="340">
      <v-form fast-fail @submit.prevent="enviarFormulario" v-model="valid">
        
        <!-- Input: Nombre -->
        <v-text-field
          v-model="perfilRegistro.name"
          :rules="nombreRules"
          label="Nombre"
          required
        ></v-text-field>

        <!-- Input: Usuario -->
        <v-text-field
          v-model="perfilRegistro.nickname"
          :rules="usuarioRules"
          label="Usuario"
          required
        ></v-text-field>

        <!-- Input: E-mail -->
        <v-text-field
          v-model="perfilRegistro.email"
          :rules="emailRules"
          label="E-mail"
          type="email"
          required
        ></v-text-field>

        <!-- Input: Contraseña -->
        <v-text-field
          v-model="perfilRegistro.password"
          :rules="passwordRules"
          label="Contraseña"
          :type="showPassword ? 'text' : 'password'"
          :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
           @click:append="togglePasswordVisibility"
          required
        ></v-text-field>

        <!-- Input: Confirmar Contraseña -->
        <v-text-field
          v-model="perfilRegistro.password_confirmation"
          :rules="confirmPasswordRules"
          label="Confirmar Contraseña"
          :type="showPassword2 ? 'text' : 'password'"
          :append-icon="showPassword2 ? 'mdi-eye-off' : 'mdi-eye'"
           @click:append="togglePasswordVisibility2"
          required
        ></v-text-field>

        <!-- Formulario: Botón de Enviar -->
        <v-btn
          class="mt-2"
          type="submit"
          block
        >Registrarse</v-btn>
      </v-form>
    </v-sheet>

    <!--Acceder-->
    <div class="acceder">
      <p>¿Ya tienes una cuenta?</p>
      <!-- Link: Iniciar Sesión -->
      <a @click="acceder">Acceder</a>
    </div>
  </div>
</template>

<script setup>
//  ->  Imports
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import Registroexitoso from "./Registroexitoso.vue";
import ErrorRegistro from "../errores/ErrorRegistro.vue"; //Se importa el dialogo

//  ->  Crear router
const router = useRouter();

//  ->  Valid por referencia (Formluario)
const valid = ref(false);

//  ->  Constantes de Mostrar Contraseña por referencia
const showPassword = ref(false);
const showPassword2 = ref(false);

//  ->  Funciones para cambiar la visibilidad de la contraseña
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}
const togglePasswordVisibility2 = () => {
  showPassword2.value = !showPassword2.value
}

//  ->  Objeto en el cual se guardará la información introducida en los inputs para poseriormente enviarla
const perfilRegistro = ref({
  name:"",
  nickname:"",
  email:"",
  password: "",
  password_confirmation: "",
});

//  ->  Reglas de los inputs
const nombreRules = [
  (v) => !!v || "El nombre es requerido",
  (v) =>
    (v && v.length <= 30) || "El nombre debe tener máximo 30 caracteres",
];
const usuarioRules = [
  (v) => !!v || "El usuario es requerido",
  (v) =>
    (v && v.length <= 20) || "El usuario debe tener máximo 20 caracteres",
];
const emailRules = [
  (v) => !!v || "El email es requerido",
  (v) => /.+@.+\..+/.test(v) || "Debe ser un email válido",
];
const passwordRules = [
  (v) => !!v || "La contraseña es requerida",
  (v) =>
    (v && v.length >= 8) || "La contraseña debe tener al menos 8 caracteres",
];
const confirmPasswordRules = [
  (v) => !!v || "Debes confirmar tu contraseña",
  (v) => v === perfilRegistro.value.password || "Las contraseñas no coinciden",
];

//  ->  Cambiar al página de login
const acceder = () => {
  router.push("/login");
};

//  ->  Envio de los datos al Back-End
const enviarFormulario = async () => {
  if (!valid.value) return; // Verifica si el formulario es válido
  
  try {
    const response = await axios.post('http://localhost:8000/api/users', perfilRegistro.value, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log('Registro exitoso:', response.data);
    // Redirigir o mostrar mensaje de éxito
    abrirMostrarRegistrado()

  } catch (error) {
    console.error('Error en el registro:', error);
    abrirMostrarError() //Se agrega la constante de la funcion para mostrar el error que esta abajo 

    // Manejar el error y mostrar un mensaje al usuario
  }
};

//  ->  Componentes (éxito y error) por referencia: ocultos
const exitoalregistrarse = ref(null);
const erroralregistrarse = ref(null);

//  ->  Funciones para mostrar los mensajes (éxito y error)
const abrirMostrarRegistrado = () => {
  if (exitoalregistrarse.value) {
    exitoalregistrarse.value.abrirMostrarRegistrado();
  }
};
const abrirMostrarError = () => {
  if (erroralregistrarse.value) {
    erroralregistrarse.value.abrirMostrarError();
  };
}

</script>

<style scoped>
.formulario {
  height: 100%;
  width: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  background-color: #3f7f9c;
  overflow-y: auto;
  overflow-x: hidden;
}

.v-text-field {
  max-width: 90%;
  width: 90%;
}

.v-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 100%;
  width: 100%;
}

.v-sheet {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 100%;
  width: 100%;
}

.formulario > h2 {
  margin-top: 50px;
  margin-bottom: 20px;
  align-self: center;
  text-transform: uppercase;
  color: white;
}

.formulario > .v-sheet {
  background-color: transparent;
}

button {
  background-color: #66BB6A;
  border-radius: 10px;
  margin: auto;
  font-weight: bolder;
}

.v-btn--block {
  min-width: 50%;
  align-self: center;
}

/**----div.acceder----*/
.acceder {
  height: 10%;
  width: 100%;
  position: relative;
  margin-top: 10%;
  margin-bottom: 5%;
  display: flex;
  flex-direction: row;
  background-color: #3f7f9c;
  justify-content: space-evenly;
  align-items: center;
}

.acceder > p {
  font-size: 15px;
  color: white;
}

.acceder > a {
  font-size: 15px;
  text-decoration: underline;
  color: #66BB6A;
  font-weight: bolder;
}

.acceder > a:hover {
  cursor: pointer;
}


</style>