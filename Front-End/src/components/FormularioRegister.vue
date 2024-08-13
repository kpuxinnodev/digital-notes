<template>
  <div class="formulario">
    <!--Formulario-->

    <h2>crear una cuenta</h2>

    <v-sheet class="mx-auto" width="340">
      <v-form fast-fail @submit.prevent>
        <v-text-field
          v-for="(campo, index) in campos"
          :key="index"
          :v-model="campo.model"
          :rules="campo.rules"
          :label="campo.label"
        ></v-text-field>

        <v-btn class="mt-2" type="submit" block>Registrarse</v-btn>
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
const router = useRouter();

const campos = ref([
  //Almacena los campos que se muestran en el formulario.
  { model: "Nombre", rules: "", label: "Nombre" },
  { model: "Usuario", rules: "", label: "Usuario" },
  { model: "E-mail", rules: "", label: "E-mail" },
  { model: "Password", rules: "", label: "Contraseña" },
  { model: "PasswordValidate", rules: "", label: "Confirmar contraseña" },
]);

const acceder = () => {
  router.push("/login");
};

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
