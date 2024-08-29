<template>
  <div class="main">
    <!--Main page-->

    <!-- Componente: FormularioLogin.vue (Formulario de Iniciar Sesión)-->
    <FormularioLogin />

    <div class="carousel">
      <!--Carousel-->
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import FormularioLogin from "@/components/login/FormularioLogin.vue";

</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&family=Roboto:wght@300;400;500;700&display=swap");
* {
  font-family: "Poppins", sans-serif;
}

/**----div.main----*/
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

  background-image: url("/img/register/1.png");
  background-size: cover;
  background-position: center;
}

.v-carousel {
  flex: 1;
}

.v-carousel-item {
  height: 100vh;
}
</style>
