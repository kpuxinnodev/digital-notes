<template>
  <div class="main">
    <!--Main-->

    <!-- Componente: Navegacion.vue (Barra de Navegación) -->
    <Navegacion />

    <div class="content">
      <!--Contenido de la página-->

      <!-- Componente: DialogoCrearNota.vue (Botón: Asignar Nota) -->
      <DialogoAsignarNota ref="asignarNota" :grupoId="id" style="position: absolute" />
       <!-- Componente: DialogoAbandonarGrupo.vue (Botón: Abandonar Grupo para miembros normales) -->
       <DialogoAbandonarGrupo ref="abandonarGrupo" :grupoId="grupoId" />
      <!-- Componente: DialogoAbandonarAdmin.vue (Botón: Abandonar Grupo para administradores) -->
      <DialogoAbandonarAdmin ref="abandonarAdmin" :grupoId="grupoId" />

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
          @click="verBotones"
          rounded="xl">
            Administrar
          </v-btn>
        </div>
        <div class="miembros"></div>
        <div class="opciones">
          <v-btn
          color="blue"
          icon="mdi-tools"
          @click="preferencias"></v-btn>
          <v-btn
          icon="mdi-exit-run"
          color="red"
          @click="abrirDialogoAbandonarGrupo">
          </v-btn>
        </div>
      </div>

      <div class="notasychat">
        <div class="notas">
          <!-- Componente: MostrarNotas.vue -->
          <MostrarNotasGrupo :mostrarBoton="administrar" :grupoId="grupoId" />
        </div>
        <div class="chat"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import Navegacion from "@/components/Navegacion.vue";
import DialogoAsignarNota from "@/components/grupo/DialogoAsignarNota.vue";
import DialogoAbandonarGrupo from "@/components/grupo/DialogoAbandonarGrupo.vue";
import DialogoAbandonarAdmin from "@/components/grupo/DialogoAbandonarAdmin.vue";
import MostrarNotasGrupo from "@/components/grupo/MostrarNotasGrupo.vue";
import { defineProps } from 'vue';
import axios from "axios";


const route = useRoute(); // Obtén la ruta actual
const grupoId = ref(route.params.id)

const props = defineProps({
  id: {
    type: [Number, String],
    required: true
  }
});

const id = props.id; // Extraer el ID del grupo del prop

const administrador =ref(true)

const token = localStorage.getItem('auth-item');

//  ->  Encabezado de la Autorización
const config = {
    headers: {
        'Content-Type':'application/json',
        'Authorization': `Bearer ${token}`
    }
};

// Al montar el componente, verifica si el usuario es administrador del grupo
onMounted(async () => {
  try {
    // Llama al backend para verificar si el usuario es el administrador del grupo
    const response = await axios.get(`http://localhost:8000/api/grupos/${id}/verificaradmin`, config);
    administrador.value = response.data.esAdmin; // Asigna true o false según la respuesta
  } catch (error) {
    console.error("Error al verificar si es administrador:", error);
  }
});


//  ->  Rutas de Navegación
const router = useRouter();
//  ->  Ruta para ir a las Preferencias del Grupo
const preferencias = () => {
  router.push({ path: `/grupopreferencias/${id}` });
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
const abandonarAdmin = ref(null);

//  ->  Método para abrir el diálogo de Abandonar Grupo
const abrirDialogoAbandonarGrupo = () => {
  if (administrador.value && abandonarAdmin.value) {
    abandonarAdmin.value.abrirDialogoAsignarAdmin();
  } else if (abandonarGrupo.value) {
    abandonarGrupo.value.abrirDialogoAbandonarGrupo();
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
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 100%;
  width: 20%;
}

.miembros {
  height: 90%;
  width: 48%;
  align-self: center;
  backdrop-filter: blur(10px);
  border: 1px solid white;
  border-radius: 64px;
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

/**----div.notasychat----*/
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
  background-color: gray;
  border: 1px solid white;
}
</style>
