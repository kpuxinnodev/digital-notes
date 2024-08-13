<template>
  <div class="main">
    <!--Main-->

    <!-- Componente: Navegacion.vue (Barra de Navegación) -->
    <Navegacion />

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
              @click="abrirDialogoCrearNota">
              Crear nota
            </v-btn>
            <v-btn
              prepend-icon="mdi-plus-box"
              color="amber">
              Crear grupo
            </v-btn>
          </div>
          <div class="botones-g2">
            <v-btn
              prepend-icon="mdi-pencil"
              color="blue"
              @click="verBotones">
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
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Navegacion from '@/components/Navegacion.vue';
import TareasCompletadas from '@/components/TareasCompletadas.vue';
import MostrarNotas from '@/components/MostrarNotas.vue';
import DialogoCrearNota from '@/components/DialogoCrearNota.vue'; 

//  ->  Dialogo de Crear Nota.
const crearNota = ref(null);

//  Método para abrir el diálogo de Crear Nota usando la referencia
const abrirDialogoCrearNota = () => {
  if (crearNota.value) {
    crearNota.value.abrirDialogoCrearNota();
  }
}

//  ->  Administrar
const administrar = ref(false);

//  Administrar activa los botones de eliminar y completar en las notas.
function verBotones() {
  administrar.value = !administrar.value;
}
</script>
<style scoped>

*{
  font-family: "Poppins", sans-serif;
}

/**----div.main----*/
.main {
  height: 100%;
  width: 100%;
  
  display: flex;
  flex-direction: row;
}

/**----div.nav-bar----*/
.nav-bar {
  height: 100%;
  width: 60px;

  background-color: goldenrod;
}

/**----div.content----*/
.content {
  height: 100%;
  width: 100%;

  max-height: 100vh;

  --s: 60px; /* control the size*/
  --c1: #b09f79;
  --c2: #476074;
  
  --_g: #0000 83%,var(--c1) 85% 99%,#0000 101%;
  background:
    radial-gradient(27% 29% at right ,var(--_g)) calc(var(--s)/ 2) var(--s),
    radial-gradient(27% 29% at left  ,var(--_g)) calc(var(--s)/-2) var(--s),
    radial-gradient(29% 27% at top   ,var(--_g)) 0 calc(var(--s)/ 2),
    radial-gradient(29% 27% at bottom,var(--_g)) 0 calc(var(--s)/-2)
    var(--c2);
  background-size: calc(2*var(--s)) calc(2*var(--s));
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

::v-deep .v-card-item__prepend {
  grid-area: prepend;
  padding-inline-end:0 !important;
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