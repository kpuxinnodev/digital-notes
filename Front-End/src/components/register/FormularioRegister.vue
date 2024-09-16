<template>
  <Registroexitoso ref="exitoalregistrarse" />
  <div class="formulario">
    <!--Formulario-->

    <h2>crear una cuenta</h2>

    <v-sheet class="mx-auto" width="340">
      <v-form fast-fail @submit.prevent="enviarFormulario" v-model="valid">
        
        <v-text-field
          v-model="perfilRegistro.name"
          :rules="nombreRules"
          label="Nombre"
          required
        ></v-text-field>

        <v-text-field
          v-model="perfilRegistro.nickname"
          :rules="usuarioRules"
          label="Usuario"
          required
        ></v-text-field>

        <v-text-field
          v-model="perfilRegistro.email"
          :rules="emailRules"
          label="E-mail"
          required
        ></v-text-field>

        <v-text-field
          v-model="perfilRegistro.password"
          :rules="passwordRules"
          label="Contraseña"
          required
        ></v-text-field>

        <v-text-field
          v-model="perfilRegistro.password_confirmation"
          :rules="confirmPasswordRules"
          label="Confirmar Contraseña"
          required
        ></v-text-field>

        <v-btn
          class="mt-2"
          type="submit"
          block
        >Registrarse</v-btn>
      </v-form>
    </v-sheet>

    <div class="acceder">
      <!--Acceder-->
      <p>¿Ya tienes una cuenta?</p>
      <a @click="acceder">Acceder</a>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import Registroexitoso from "./Registroexitoso.vue";

const router = useRouter();

const valid = ref(false);

const perfilRegistro = ref({
  name:"",
  nickname:"",
  email:"",
  password: "",
  password_confirmation: "",
});

//  ->  Reglas
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

//  ->  Cambiar al formulario de login.
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
    // Manejar el error y mostrar un mensaje al usuario
  }
};

const exitoalregistrarse = ref(null);

//  Método para abrir el diálogo de Crear Nota usando la referencia
const abrirMostrarRegistrado = () => {
  if (exitoalregistrarse.value) {
    exitoalregistrarse.value.abrirMostrarRegistrado();
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
  color: white;
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

/**----div.acceder----*/
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
  align-items: center;
}

.acceder > p {
  font-size: 15px;
  color: white;
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