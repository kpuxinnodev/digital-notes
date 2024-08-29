<template>
  <div class="main">
    <!--Main-->
    <!-- Componente: Navegacion.vue (Barra de Navegación) -->
    <Navegacion style="position: relative; left: 0;"/>

    <div class="content">
      <!--Contenido de la página-->
      <div class="notes-options">
        <!--Opciones de Notas-->
        <div class="botones">
          <!--Botones-->
          <div class="botones-g1">
            <v-btn
              prepend-icon="mdi-plus"
              color="green"
              @click="abrirDialogoCrearNota"
            >
              Crear nota
            </v-btn>
            <v-btn
            prepend-icon="mdi-plus-box"
            color="amber"
            @click="abrirDialogoCrearGrupo">
              Crear grupo
            </v-btn>
          </div>
          <div class="botones-g2">
            <v-btn prepend-icon="mdi-pencil" color="blue" @click="verBotones" rounded="xl">
              Administrar
            </v-btn>
          </div>
        </div>

        <div class="completadas">
          <!-- Componente: TareasCompletadas.vue -->
          <TareasCompletadas />
        </div>
      </div>

      <div class="notes-show">
        <!-- Componente: MostrarNotas.vue -->
        <MostrarNotas :mostrarBoton="administrar" />
      </div>
    </div>

    <!-- Componente: DialogoCrearNota.vue (Botón: Crear Nota) -->
    <DialogoCrearNota ref="crearNota" />
    <DialogoCrearGrupo ref="crearGrupo" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import Navegacion from "@/components/Navegacion.vue";
import TareasCompletadas from "@/components/index/TareasCompletadas.vue";
import MostrarNotas from "@/components/index/MostrarNotas.vue";
import DialogoCrearNota from "@/components/index/DialogoCrearNota.vue";
import DialogoCrearGrupo from "@/components/index/DialogoCrearGrupo.vue";

//  ->  Dialogo de Crear Nota.
const crearNota = ref(null);

//  Método para abrir el diálogo de Crear Nota usando la referencia
const abrirDialogoCrearNota = () => {
  if (crearNota.value) {
    crearNota.value.abrirDialogoCrearNota();
  }
};

//  ->  Administrar
const administrar = ref(false);

//  Administrar activa los botones de eliminar y completar en las notas.
function verBotones() {
  administrar.value = !administrar.value;
}

const crearGrupo = ref(null);

//  Método para abrir el diálogo de Crear Nota usando la referencia
const abrirDialogoCrearGrupo = () => {
  if (crearGrupo.value) {
    crearGrupo.value.abrirDialogoCrearGrupo();
  }
};
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

  background: linear-gradient(0deg,#6d6d6d 25%, transparent 26%, transparent 49%, #6d6d6d80 50%, #6d6d6d80 75%, transparent 76% );
        background-size: 2em 2em;
        background-color: #4B4B4b;
        opacity: 1
}

/**----div.content----*/
.content {
  height: 100%;
  width: 100%;
  max-width: 1440px;
  min-width: 720px;
  
  max-height: 100vh;
}

/**----div.notes-options----*/
.content > .notes-options {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;

  height: 18%;
  width: 100%;
}

.botones {
  display: flex;
  flex-direction: row;
  width: 45%;
  justify-content: space-evenly;
  align-items: center;
}

.botones-g1 {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 100%;
  width: auto;
}

.botones-g2 {
  display: flex;
  height: 100%;
  width: auto;
  align-items: center;
  justify-content: center;
}

.completadas {
  width: 55%;
  display: flex;
  justify-content: center;
  align-items: center;
}

/** v-deep permite acceder a una clase interna de una clase de un componente */
::v-deep .v-card-item__prepend {
  grid-area: prepend;
  padding-inline-end: 0 !important;
}

.v-card-text {
  padding: 10px 10px 10px 10px;
  margin: 0;
}

/**----div.notes-show----*/
.content > .notes-show {
  height: 82%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
