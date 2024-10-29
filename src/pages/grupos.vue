<template>
  <div class="main">
    <!--Main-->

    <!-- Componente: Navegacion.vue (Barra de Navegación) -->
    <Navegacion />

    <div class="content">
      <!--Contenido de la página-->

      <!-- Componente: DialogoCrearGrupo.vue (Botón: Crear Grupo) -->
      <DialogoCrearGrupo ref="crearGrupo" />

      <div class="notes-options">
        <!--Opciones de Notas-->
        <div class="botones">
          <!--Botones-->
          <v-btn
            prepend-icon="mdi-plus-box"
            color="amber"
            @click="abrirDialogoCrearGrupo"
          >
            Crear grupo
          </v-btn>
        </div>
        <div class="datos" v-if="datos" :key="index">
          <img 
            v-if="datos.avatar"
            class="ml-4 mr-4"
            :src="datos.avatar"
            :alt="datos.nickname"
             />
          <div class="info">
            <p>Name: {{ datos.name }}</p>
            <p>@{{ datos.nickname }}</p>
          </div>
        </div>
      </div>

      <div class="grupos">
        <div class="mostrar-grupos">
          <!-- Componente: MostrarGrupos.vue -->
          <MostrarGrupos />
          <DialogoCrearGrupo :grupoId="grupoId" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import Navegacion from "@/components/Navegacion.vue";
import MostrarGrupos from "@/components/grupos/MostrarGrupos.vue";
import DialogoCrearGrupo from "@/components/index/DialogoCrearGrupo.vue";
import axios from "axios";

//  ->  Rutas de Navegación
const router = useRouter();

const route = useRoute();

const grupoId = ref(route.params.id)

const crearGrupo = ref(null);

const datos = ref([null]);

//  Método para abrir el diálogo de Crear Nota usando la referencia
const abrirDialogoCrearGrupo = () => {
  if (crearGrupo.value) {
    crearGrupo.value.abrirDialogoCrearGrupo();
  }
};

const token = localStorage.getItem('auth-item');

//  ->  Encabezado de la Autorización
const config = {
    headers: {
        'Content-Type':'application/json',
        'Authorization': `Bearer ${token}`
    }
};

const cargarDatos = async() => {
  try{
    const response = await axios.get('http://localhost:8000/api/grupos/datos', config);
    datos.value = response.data;
    console.log("Datos cargados: ", datos.value);
  }catch (error){
    console.error("Error al cargar los datos: ", error);
  }
}

onMounted( async() =>{
  await cargarDatos();
});

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

  background: linear-gradient(
    0deg,
    #6d6d6d 25%,
    transparent 26%,
    transparent 49%,
    #6d6d6d80 50%,
    #6d6d6d80 75%,
    transparent 76%
  );
  background-size: 2em 2em;
  background-color: #4b4b4b;
  opacity: 1;
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
  justify-content: space-between;

  height: 18%;
  width: 100%;

  padding-left: 5%;
  padding-right: 5%;
}

.botones {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 100%;
  width: 20%;
}

.datos {
  display: flex;
  flex-direction: row;
  height: 80%;
  width: 25%;
  align-items: center;
  align-self: center;
  justify-content: space-evenly;
  border: 1px solid white;

  backdrop-filter: blur(5px);
}

.info {
    margin-left: 10px; /* Espaciado entre la imagen y la información */
    display: flex;
    flex-direction: column; /* Coloca el nombre y el apodo en columnas */
}

::v-deep .v-card-item__prepend {
  grid-area: prepend;
  padding-inline-end: 0 !important;
}

.v-card-text {
  padding: 10px 10px 10px 10px;
  margin: 0;
}

/**----div.grupos----*/
.content > .grupos {
  height: 82%;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.grupos > .mostrar-grupos {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

img {
  border-radius: 50%;
  width: 70px; /* Tamaño del avatar */
  height: 64px;
}
</style>
