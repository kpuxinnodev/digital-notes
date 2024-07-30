<template>
  <div class="main">
    <!--Main page-->
    <div class="formulario">
      <!--Formulario-->

      <h2>crear una cuenta</h2>

      <v-sheet class="mx-auto" width="340">
        <v-form fast-fail @submit.prevent>
          <v-text-field v-for="(campo, index) in campos"
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
        <p>
          ¿Ya tienes una cuenta?
        </p>
        <a href="#">Acceder</a>
      </div>
    </div>

    <div class="carousel">
      <!--Carousel-->

      <v-carousel
      show-arrows="hover"
      height="642"
      hide-delimiters="true"
      >
        <v-carousel-item v-for="(imagen, index) in imagenes"
        :key="index"
        :src="imagen.src"
        :cover="imagen.cover"
        ></v-carousel-item>
      </v-carousel>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

//<-Carousel->
const imagenes = ref([  //Almacena imágenes que se muestran en el carousel.
  {nombre: "Bienvenida", src: "/img/register/1.png", cover:"cover"},
  {nombre: "Servicios", src: "/img/register/2.png", cover:"cover"},
  {nombre: "Membresía", src: "/img/register/3.png", cover:"cover"}
]);

//<-Formulario->
const campos = ref([  //Almacena los campos que se muestran en el formulario.
  {model:"Nombre", rules:"", label:"Nombre"},
  {model:"Usuario", rules:"", label:"Usuario"},
  {model:"E-mail", rules:"", label:"E-mail"},
  {model:"Password", rules:"", label:"Contraseña"},
  {model:"PasswordValidate", rules:"", label:"Confirmar contraseña"}
])
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&family=Roboto:wght@300;400;500;700&display=swap');

/**----div.main----*/

*{
  font-family: "Poppins", sans-serif;
}

.main {
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: row;
}

/**----div.carousel----*/
.carousel {
  height: 100%;
  width: 70%;

  background-color: black;
}

/**----div.formulario----*/
.formulario {
  height: 100%;
  width: 30%;

  display: flex;
  flex-direction: column;

  background-color: darkblue;
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

</style>
