<template>
  <div class="main">
    <!-- Main -->

    <!-- Componente: Navegacion.vue (Barra de Navegación) -->
    <Navegacion />
    <div class="content">
      <!-- Contenido -->

      <!-- Componente: ComponenteFaq.vue (Menú de FAQ) -->
      <ComponenteFaq />
    </div>
  </div>
</template>

<script setup>
import Navegacion from "@/components/Navegacion.vue";
import ComponenteFaq from "@/components/faq/ComponenteFaq.vue";
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
  align-items: center;
  justify-content: center;

  background: white;
}

/**----div.content----*/
.content {
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  
  max-height: 100vh;
}
</style>
