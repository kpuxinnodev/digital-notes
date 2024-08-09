<template>
  <div class="main">
    <!--Main-->
    <NavBar/>

    <div class="content">
      <!--Page Content-->
      <div class="notes-options">
        <!--Opciones de Notas-->
        <div class="botones">
          <!--Botones-->
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

        <div class="completadas">
          <CompletedTasks />
        </div>
      </div>

      <div class="notes-show">
        <!--Mostrar las Notas-->
        <NotesTabs />
      </div>
    </div>

    <!-- Incluir el componente de diálogo -->
    <DialogoCrearNota ref="crearNota" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import NavBar from '@/components/NavBar.vue';
import CompletedTasks from '@/components/CompletedTasks.vue';
import NotesTabs from '@/components/NotesTabs.vue';
import DialogoCrearNota from '@/components/DialogoCrearNota.vue'; 

// Crear una referencia al componente de diálogo
const crearNota = ref(null);

// Método para abrir el diálogo usando la referencia
const abrirDialogoCrearNota = () => {
  if (crearNota.value) {
    crearNota.value.abrirDialogoCrearNota();
  }
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

  background-color: skyblue;
}

/**----div.notes-options----*/
.content > .notes-options {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;

  height: 18%;
  width: 100%;

  background-color: #C6FF00;
}

.botones {
  display: flex;
  flex-direction: column;
  width: 45%;
  background-color: aqua;
  justify-content: space-evenly;
  align-items: center;
}

.botones-g1 {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: auto;
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

  background-color: red;
}


</style>