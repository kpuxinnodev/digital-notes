<template>
  <LoginError ref="errorLogin" />
  <div class="formulario">
    <!--Formulario-->

    <h2>iniciar sesión</h2>

    <v-sheet class="mx-auto" width="340">
      <v-form fast-fail @submit.prevent="enviarFormulario" v-model="valid">

        <v-text-field
          v-model="perfilLogin.email"
          :rules="emailRules"
          label="E-mail"
          required
        ></v-text-field>

        <v-text-field
          v-model="perfilLogin.password"
          :rules="passwordRules"
          label="Contraseña"
          required
        ></v-text-field>

        <v-btn 
        class="mt-2"
        block
        type="submit"
        >Acceder</v-btn>
      </v-form>
    </v-sheet>

    <div class="acceder">
      <!--Acceder-->
      <p>¿No tienes una cuenta?</p>
      <a @click="registrarse">Registrarse</a>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import LoginError from "./LoginError.vue";

const router = useRouter();

const valid = ref(false);

const perfilLogin = ref({
  email:"",
  password: "",
});

const emailRules = [
  (v) => !!v || "El email es requerido"
];

const passwordRules = [
  (v) => !!v || "La contraseña es requerida"
];

const registrarse = () => {
  router.push("/register");
};

function iniciarSesion() {
  router.push('/')
}

//  ->  Envio de los datos al Back-End
const enviarFormulario = async () => {
  if (!valid.value) return; // Verifica si el formulario es válido
  
  try {
    const response = await axios.post('http://localhost:8000/api/login', perfilLogin.value, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log('Inicio de sesión exitoso');
    // Redirigir o mostrar mensaje de éxito
    iniciarSesion()

  } catch (error) {
    console.error('Error en el registro:', error);
    // Manejar el error y mostrar un mensaje al usuario
    abrirMostrarError()
  }
};

//  ->  Dialogo de Crear Nota.
const errorLogin = ref(null);

//  Método para abrir el diálogo de Crear Nota usando la referencia
const abrirMostrarError = () => {
  if (errorLogin.value) {
    errorLogin.value.abrirMostrarError();
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
  background-color: darkblue;
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
  background-color: rgb(0, 230, 0);
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

  background-color: darkblue;
  justify-content: space-evenly;
}

.acceder > p {
  font-size: 15px;
}

.acceder > a {
  font-size: 15px;
  text-decoration: none;
  color: rgb(0, 230, 0);
  font-weight: bolder;
}

.acceder > a:hover {
  cursor: pointer;
}
</style>
