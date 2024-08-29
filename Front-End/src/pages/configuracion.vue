<template>
  <div class="main">
    <!-- Main -->
    <!-- Componente: Navegacion.vue (Barra de Navegación) -->
    <Navegacion />
    <div class="content">
      <!-- Contenido -->

      <!-- Componente: ComponenteConfig.vue (Menú de Configuración de la Cuenta) -->
      <ComponenteConfig />
    </div>
  </div>
</template>

<script setup>
import Navegacion from "@/components/Navegacion.vue";
import ComponenteConfig from "@/components/configuracion/ComponenteConfig.vue";
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&family=Roboto:wght@300;400;500;700&display=swap");
* {
  font-family: "Poppins", sans-serif;
}

.main {
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  background-color: #959595;
  background-image: linear-gradient(135deg, #080067 25%, transparent 25%),
    linear-gradient(225deg, #080067 25%, transparent 25%),
    linear-gradient(45deg, #080067 25%, transparent 25%),
    linear-gradient(315deg, #080067 25%, #959595 25%);
  background-position: 21px 0, 21px 0, 0 0, 0 0;
  background-size: 42px 42px;
  background-repeat: repeat;
}

/**----div.content----*/
.content {
  height: 100%;
  width: 100%;
  max-width: 1440px;
  min-width: 720px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  
  max-height: 100vh;
}
</style>
