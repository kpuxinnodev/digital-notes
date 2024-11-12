<template>
  <!-- Componentes importados (error) -->
  <LoginError ref="errorLogin" />

  <!-- Formulario -->
  <div class="formulario">

    <!-- Formulario: Título -->
    <h2>iniciar sesión</h2>

    <!-- Formulario: Inputs -->
    <v-sheet class="mx-auto" width="340">
      <v-form fast-fail @submit.prevent="enviarFormulario" v-model="valid">

        <!-- Input: E-mail -->
        <v-text-field
          v-model="perfilLogin.email"
          :rules="emailRules"
          label="E-mail"
          type="email"
          required
        ></v-text-field>

        <!-- Input: Contraseña -->
        <v-text-field
          v-model="perfilLogin.password"
          :rules="passwordRules"
          label="Contraseña"
          :type="showPassword ? 'text' : 'password'"
          :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
           @click:append="togglePasswordVisibility"
          required
        ></v-text-field>

        <!-- Formulario: Botón de Enviar -->
        <v-btn 
        class="mt-2"
        block
        type="submit"
        >Acceder</v-btn>
      </v-form>
    </v-sheet>

    <!--Acceder-->
    <div class="acceder">
      <!-- Redireccionamiento a la página de registro -->
      <p>¿No tienes una cuenta?</p>
      <a @click="registrarse">Registrarse</a>
    </div>
  </div>
</template>

<script setup>
//  ->  Imports
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import LoginError from "./LoginError.vue";

//  ->  Crear router
const router = useRouter();

//  -> Formulario por referencia
const valid = ref(false);

//  ->  Objeto donde se guarda la información de los inputs para enviar.
const perfilLogin = ref({
  email:"",
  password: "",
});

//  ->  Función para ocultar la contraseña
const showPassword = ref(false);
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

//  ->  Reglas de los inputs
const emailRules = [
  (v) => !!v || "El email es requerido",
  (v) => /.+@.+\..+/.test(v) || "Debe ser un email válido",
];
const passwordRules = [
  (v) => !!v || "La contraseña es requerida"
];

//  ->  Redireccionamiento a menú de registro
const registrarse = () => {
  router.push("/register");
};

//  ->  Redireccionamiento a menú principal de la aplicación
const iniciarSesionUno = () => {
  router.push("/")
};

//  ->  Función para Mostrar Error de Login
const errorLogin = ref(null);
const abrirMostrarError = () => {
  if (errorLogin.value) {
    errorLogin.value.abrirMostrarError();
  }
};

//  ->  Envio de los datos al Back-End
const enviarFormulario = async () => {
  if (!valid.value) return; // Verifica si el formulario es válido
  
  try {
    const response = await axios.post('http://localhost:8000/api/login', perfilLogin.value, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(function(respuesta) {
      localStorage.setItem('auth-item',respuesta.data.token)
      
    });

    console.log('Inicio de sesión exitoso');
    // Redirigir o mostrar mensaje de éxito
    iniciarSesionUno()

  } catch (error) {
    console.error('Error en el registro:', error);
    // Manejar el error y mostrar un mensaje al usuario
    abrirMostrarError()
  }
};

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
}

.acceder > p {
  font-size: 15px;
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
