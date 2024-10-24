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
            v-for="(dato, index) in datos"
            :key="index"
          >
          <img
            v-if="dato.avatar"
            class="ml-4 mr-4"
            :src="dato.avatar"
            :alt="dato.nickname"
            />
            <v-card-text>{{ "@" + dato.nickname }}</v-card-text>
          </v-card>
        </div>
        <div class="botones mt-8">
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
      <DialogoEliminarMiembro
        ref="eliminarMiembro"
        style="position: absolute"
      />
    </v-card>
  </v-container>
</template>

<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import DialogoAgregarMiembro from "./DialogoAgregarMiembro.vue";
import DialogoEliminarMiembro from "./DialogoEliminarMiembro.vue";
import { defineProps } from "vue";

const props = defineProps({
  grupoId: {
    type: Number,
    required: true
  }
});


//  ->  Cargar miembros desde el Back-End
let miembros = ref([
  { avatar: "/img/nav/user.png", nickname: "miembro1" },
  { avatar: "/img/nav/user.png", nickname: "miembro2" },
  { avatar: "/img/nav/user.png", nickname: "miembro3" },
  { avatar: "/img/nav/user.png", nickname: "miembro4" },
  { avatar: "/img/nav/user.png", nickname: "miembro5" },
  { avatar: "/img/nav/user.png", nickname: "miembro6" },
  { avatar: "/img/nav/user.png", nickname: "miembro7" },
  { avatar: "/img/nav/user.png", nickname: "miembro8" },
  { avatar: "/img/nav/user.png", nickname: "miembro9" },
  { avatar: "/img/nav/user.png", nickname: "miembro10" },
  { avatar: "/img/nav/user.png", nickname: "miembro11" },
  { avatar: "/img/nav/user.png", nickname: "miembro12" },
]);

const datos = ref([]);

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
    datos.value = [response.data];
    console.log("Miembros Cargados: ", response.data);
    }catch (error) {
    console.error("Error al cargar los miembros: ", error);
  }
}

onMounted(async () => {
  await cargarMiembros();
});

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
  display: flex;
  flex-direction: column;
  align-items: center;
}

.botones {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}
</style>
