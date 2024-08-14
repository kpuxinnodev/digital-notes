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
            <v-btn
                prepend-icon="mdi-plus"
                color="green"
                @click="abrirDialogoAsignarNota">
                Asignar tarea
              </v-btn>
              <v-btn
                prepend-icon="mdi-pencil"
                color="blue"
                @click="verBotones">
                Administrar
              </v-btn>  
          </div>
          <div class="miembros">

          </div>
          <div class="opciones">
                <v-btn
            color="blue"
            icon="mdi-tools"
            @click="preferencias">
              </v-btn>
              <v-btn
                icon="mdi-exit-to-app"
                color="red"
                @click="">
              </v-btn> 
          </div>
        </div>
  
        <div class="notasychat">
            <div class="notas">
                <!-- Componente: MostrarNotas.vue -->
                <MostrarNotas :mostrarBoton="administrar" />
            </div>
            <div class="chat">

            </div>
        </div>

      </div>
  
      <!-- Componente: DialogoCrearNota.vue (Botón: Crear Nota) -->
      <DialogoAsignarNota ref="asignarNota" />
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router'
  import Navegacion from '@/components/Navegacion.vue';
  import MostrarNotas from '@/components/MostrarNotas.vue';
  import DialogoAsignarNota from '@/components/DialogoAsignarNota.vue';
  

//  ->  Rutas de Navegación
const router = useRouter()

const preferencias = () => {
  router.push("/grupopreferencias");
};
  
  //  ->  Dialogo de Crear Nota.
  const asignarNota = ref(null);
  
  //  Método para abrir el diálogo de Crear Nota usando la referencia
  const abrirDialogoAsignarNota = () => {
    if (asignarNota.value) {
      asignarNota.value.abrirDialogoAsignarNota();
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
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    height: 100%;
    width: 20%;
  }

  .miembros {
    height: 100%;
    width: 48%;
    background-color: red;
  }
  
  .opciones {
    height: 100%;
    width: 12%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
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
  .content > .notasychat {
    height: 82%;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  
  }

  .notasychat > .notas {
    width: 70%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .notasychat > .chat {
    width: 20%;
    height: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: red;
  }
  
  
  </style>