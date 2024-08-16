<template>
  <div class="main">
    <!--Main-->

    <!-- Componente: Navegacion.vue (Barra de Navegación) -->
    <Navegacion />

    <div class="content">
      <!--Contenido de la página-->

      <!-- Componente: DialogoCrearNota.vue (Botón: Asignar Nota) -->
      <DialogoAsignarNota ref="asignarNota" style="position: absolute" />
      <!-- Componente: DialogoAbandonarGrupo.vue (Botón: Abandonar Grupo) -->
      <DialogoAbandonarGrupo ref="abandonarGrupo" style="position: absolute" />

      <div class="notes-options">
        <!--Opciones de Notas-->
        <div class="botones">
          <!--Botones-->
          <v-btn
            prepend-icon="mdi-plus"
            color="green"
            @click="abrirDialogoAsignarNota"
          >
            Asignar tarea
          </v-btn>
          <v-btn prepend-icon="mdi-pencil" color="blue" @click="verBotones">
            Administrar
          </v-btn>
        </div>
        <div class="miembros"></div>
        <div class="opciones">
          <v-btn color="blue" icon="mdi-tools" @click="preferencias"> </v-btn>
          <v-btn
            icon="mdi-exit-to-app"
            color="red"
            @click="abrirDialogoAbandonarGrupo"
          >
          </v-btn>
        </div>
      </div>

      <div class="notasychat">
        <div class="notas">
          <!-- Componente: MostrarNotas.vue -->
          <MostrarNotasGrupo :mostrarBoton="administrar" />
        </div>
        <div class="chat"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import Navegacion from "@/components/Navegacion.vue";
import DialogoAsignarNota from "@/components/DialogoAsignarNota.vue";
import DialogoAbandonarGrupo from "@/components/DialogoAbandonarGrupo.vue";
import MostrarNotasGrupo from "@/components/MostrarNotasGrupo.vue";

//  ->  Rutas de Navegación
const router = useRouter();
//  ->  Ruta para ir a las Preferencias del Grupo
const preferencias = () => {
  router.push("/grupopreferencias");
};

//  ->  Dialogo de Asignar Nota
const asignarNota = ref(null);

//  ->  Método para abrir el diálogo de Asignar Nota
const abrirDialogoAsignarNota = () => {
  if (asignarNota.value) {
    asignarNota.value.abrirDialogoAsignarNota();
  }
};

//  -> Asigna a Administrar como valor predeterminado false.
const administrar = ref(false);

//  ->  Administrar activa los botones de eliminar y completar en las notas.
function verBotones() {
  administrar.value = !administrar.value;
}

const abandonarGrupo = ref(null);

//  ->  Método para abrir el diálogo de Abandonar Grupo
const abrirDialogoAbandonarGrupo = () => {
  if (abandonarGrupo.value) {
    abandonarGrupo.value.abrirDialogoAbandonarGrupo();
  }
};
</script>

<style scoped>
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

  --s: 150px;
  --c1: #ccbf82;
  --c2: #604848;

  --_g: var(--c1) 6.1%, var(--c2) 6.4% 18.6%, var(--c1) 18.9% 31.1%,
    var(--c2) 31.4% 43.6%, var(--c1) 43.9% 56.1%, var(--c2) 56.4% 68.6%,
    #0000 68.9%;
  background: radial-gradient(var(--s) at 100% 0, var(--_g)),
    radial-gradient(var(--s) at 0 0, var(--_g)),
    radial-gradient(var(--s) at 0 100%, var(--_g)),
    radial-gradient(var(--s) at 100% 100%, var(--_g)) var(--c1);
  background-size: var(--s) var(--s);
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
  padding-inline-end: 0 !important;
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
