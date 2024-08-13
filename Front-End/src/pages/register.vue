<template>
  <div class="main">
    <!--Main page-->
    <div class="carousel">
      <!--Carousel-->

      <v-carousel show-arrows="hover" height="100%" hide-delimiters="true">
        <v-carousel-item
          v-for="(imagen, index) in imagenes"
          :key="index"
          :src="imagen.src"
          :cover="imagen.cover"
        ></v-carousel-item>
      </v-carousel>
    </div>
    <FormularioRegister />
  </div>
</template>

<script setup>
import { ref } from "vue";
import FormularioRegister from "@/components/FormularioRegister.vue";

//<-Carousel->
const imagenes = ref([
  //Almacena imágenes que se muestran en el carousel.
  { nombre: "Bienvenida", src: "/img/register/1.png", cover: "cover" },
  { nombre: "Servicios", src: "/img/register/2.png", cover: "cover" },
  { nombre: "Membresía", src: "/img/register/3.png", cover: "cover" },
]);
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&family=Roboto:wght@300;400;500;700&display=swap");

/**----div.main----*/

* {
  font-family: "Poppins", sans-serif;
}

.main {
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: row;
}

/**----div.carousel----*/
.carousel {
  height: 100%;
  width: 70%;
  background-color: black; /* Fondo negro para el carrusel */
  overflow: hidden; /* Evita que se muestren barras de scroll dentro del carrusel */
}

.v-carousel {
  height: 100%;
}

.v-carousel-item {
  height: 100%;
  object-fit: cover; /* Asegúrate de que la imagen cubra el contenedor */
}

/**----div.formulario----*/
</style>
