<template>
  <div class="main">
    <!-- Main -->

    <!-- Componente: Navegacion.vue (Barra de Navegación) -->
    <Navegacion />
    <div class="content">
      <!-- Contenido -->

      <!-- Componente: ComponenteGrupoPreferencias.vue (Menú de GrupoPreferencias) -->
      <ComponenteGrupoPreferencias />
    </div>
  </div>
</template>

<script setup>
import ComponenteGrupoPreferencias from "@/components/grupo/grupopreferencias/ComponenteGrupoPreferencias.vue";
import Navegacion from "@/components/Navegacion.vue";
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

  background: linear-gradient(45deg, #6d6d6d 10%,transparent 10%,transparent 90%,#6d6d6d80 90%),linear-gradient(135deg, transparent 40%, #87878780 40%, #87878780 60%, transparent 0),linear-gradient(45deg, transparent 40%, #878787 40%, #878787 60%, transparent 0);
        background-size: 3em 3em;
        background-color: #4B4B4b;
        opacity: 1
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
