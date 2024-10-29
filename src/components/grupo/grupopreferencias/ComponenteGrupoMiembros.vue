<template>
  <v-container class="container">
    <v-card flat>
      <v-card-title>Integrantes del equipo:</v-card-title>
      <v-card-text>
        <div class="grid-miembros">
          <!-- Container de los miembros -->
          <v-card
            flat
            class="miembro"
            v-for="(miembro, index) in miembros"
            :key="index"
          >
          <img
            v-if="miembro.avatar"
            class="ml-4 mr-4"
            :src="miembro.avatar"
            :alt="miembro.nickname"
            />
            <v-icon v-if="miembro.idusuario === adminId" small class="ml-2" color="blue">
              mdi-shield-account
            </v-icon>
            <v-card-text>
              {{ "@" + miembro.nickname }}
            </v-card-text>
          </v-card>
        </div>
        <div class="botones mt-8" v-if="esAdmin">
          <v-btn
            prepend-icon="mdi-shield-account"
            color="blue"
            @click="abrirDialogoAsignarAdmin"
          >
            Asignar Administrador
          </v-btn>
          <v-btn
            prepend-icon="mdi-plus"
            color="green"
            @click="abrirDialogoAgregarMiembro"
          >
            Agregar miembro
          </v-btn>
          <v-btn
            prepend-icon="mdi-minus"
            color="red"
            @click="abrirDialogoEliminarMiembro"
          >
            Eliminar miembro
          </v-btn>
        </div>
      </v-card-text>
      <DialogoAgregarMiembro ref="agregarMiembro" :grupoId="grupoId" style="position: absolute" />
      <DialogoEliminarMiembro ref="eliminarMiembro" :grupoId="grupoId" style="position: absolute" />
      <DialogoAsignarAdmin ref="asignarAdmin" :grupoId="grupoId" style="position: absolute" />
    </v-card>
  </v-container>
</template>

<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import DialogoAgregarMiembro from "./DialogoAgregarMiembro.vue";
import DialogoEliminarMiembro from "./DialogoEliminarMiembro.vue";
import DialogoAsignarAdmin from "./DialogoAsignarAdmin.vue";
import { defineProps } from "vue";

const props = defineProps({
  grupoId: {
    type: Number,
    required: true
  },
});


//  ->  Cargar miembros desde el Back-End
const miembros = ref([]);

const esAdmin = ref(false);

const adminId = ref(null); 

const token = localStorage.getItem('auth-item');

//  ->  Encabezado de la Autorización
const config = {
    headers: {
        'Content-Type':'application/json',
        'Authorization': `Bearer ${token}`
    }
};

const cargarMiembros = async () => {
  if (!props.grupoId || isNaN(props.grupoId)) {
    console.error('No se ha proporcionado un ID de grupo válido');
    return;
  } try {
    const response = await axios.get(`http://localhost:8000/api/grupos/${props.grupoId}/showmiembros`, config);
    miembros.value = response.data.miembros;
    esAdmin.value = response.data.esAdmin;
    adminId.value = response.data.adminId;
    }catch (error) {
    console.error("Error al cargar los miembros: ", error);
  }
}

onMounted(async () => {
  await cargarMiembros(); // Carga miembros
});

// Función para verificar si el usuario es administrador
const verificarAdmin = async () => {
  try {
    const response = await axios.get(`http://localhost:8000/api/grupos/${props.grupoId}/verificaradmin`, config);
    esAdmin.value = response.data.esAdmin; // Asigna true o false según la respuesta
  } catch (error) {
    console.error("Error al verificar si es administrador:", error);
  }
};

const agregarMiembro = ref(null);

//  Método para abrir el diálogo de Agregar Miembro usando la referencia
const abrirDialogoAgregarMiembro = () => {
  if (agregarMiembro.value) {
    agregarMiembro.value.abrirDialogoAgregarMiembro();
  }
};

const eliminarMiembro = ref(null);

const abrirDialogoEliminarMiembro = () => {
  if (eliminarMiembro.value) {
    eliminarMiembro.value.abrirDialogoEliminarMiembro();
  }
};

  const asignarAdmin = ref(null);

  const abrirDialogoAsignarAdmin = () => {
    if (asignarAdmin.value) {
      asignarAdmin.value.abrirDialogoAsignarAdmin();
    }
  };
</script>

<style scoped>
.v-card {
  padding: 20px;
  overflow: visible;
}

.container {
  width: 100%;
  height: auto;
  overflow-y: visible;
}

.grid-miembros {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  width: 90%;
  margin: auto;
  height: 42vh;
  overflow-y: auto;
  border: 1px solid white;
}

.miembro {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

img {
  border-radius: 50%;
  width: 70px; /* Tamaño del avatar */
  height: 64px;
}

.botones {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}
</style>
