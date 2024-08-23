<template>
  <div class="main">
    <!--Main page-->
    <div class="imagen">
      <!--Imagen-->

    </div>
    <FormularioRegister />
  </div>
</template>

<script setup>
import { ref } from "vue";
import FormularioRegister from "@/components/FormularioRegister.vue";

</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&family=Roboto:wght@300;400;500;700&display=swap");
* {
  font-family: "Poppins", sans-serif;
}

/**----div.main----*/
.main {
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: row;
}

/**----div.carousel----*/
.imagen {
  height: 100%;
  width: 70%;

  background-image: url("/img/register/1.png");
  background-size: cover;
  background-position: center;
}

.v-carousel {
  height: 100%;
}

.v-carousel-item {
  height: 100%;
  object-fit: cover;
}
</style>
