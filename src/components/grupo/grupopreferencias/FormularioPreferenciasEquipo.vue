<template>
  <v-container class="container">
    <!-- Muestra los datos -->
    <div class="d-flex flex-row" v-if="datos" :key="index">
      <v-card flat class="carta-1">
        <v-card-text class="d-flex flex-column justify-center align-center">
          <!-- Cargar avatar del Back-End -->
          <img class="ml-4 mr-4"
            :src="datos.logo"
            :alt="datos.descripcion"
          />
          <p class="mt-2 ml-4 mr-4">{{ datos.nombre }}</p>
        </v-card-text>
      </v-card>
      <v-card flat class="d-flex align-center pl-8 pr-8">
        <v-card-text>
          <p>{{ datos.descripcion }}</p>
        </v-card-text>
      </v-card class="align-end">
      <p style="position: absolute; right: 2rem;" >{{ datos.created_at }}</p>
    </div>

    <v-divider class="divisor"></v-divider>

    <!-- Formulario para editar datos -->
    <v-form ref="form" v-model="valid" class="mt-6">
      <v-row>
        <!-- Campo de archivo para seleccionar la imagen -->
        <v-col cols="12">
          <v-card flat>
            <v-file-input
              :rules="subirAvatar"
              label="Cambiar logo de equipo"
              prepend-icon="mdi-account-multiple"
              variant="filled"
              v-model="imagen"
            ></v-file-input>
            <v-col class="d-flex justify-end">
              <v-btn
              color="primary"
              @click="cambiarLogo"
              >Confirmar Logo</v-btn>
            </v-col>
          </v-card>
        </v-col>
      </v-row>
    </v-form>
    
    <v-divider class="divisor"></v-divider>

    <!-- ? Componente: FormularioGrupoPreferencias2.vue -->
    <FormularioGrupoPreferencias2 :grupoId="grupoId" />
  </v-container>
</template>

<script setup>
import { ref, defineProps } from "vue";
import FormularioGrupoPreferencias2 from "./FormularioGrupoPreferencias2.vue";
import axios from "axios";
import { onMounted } from "vue";
import { ca } from "vuetify/locale";

const imagen = ref(null);
const props = defineProps({
  grupoId: {
    type: Number,
    required: true
  }
});


const valid = ref(false);

//  ->  Datos cargados desde el Back-End
const datos = ref([]);

//  ->  Avatar cargado del Back-End
let avatarDB = ref([{ img: "/img/nav/user.png", descripcion: "avatar.png" }]);

//  ->  Guardar avatar subido por el usuario.
const logo = ref([{ imagen: "" }]);

//  ->  Reglas de validación para el avatar
const subirAvatar = [(v) => !!v || "La imagen es requerida"];

//  ->  Enviar Formulario

const token = localStorage.getItem('auth-item');

  //  ->  Encabezado de la Autorización
  const config = {
      headers: {
          'Content-Type':'application/json',
          'Authorization': `Bearer ${token}`
      }
    }

const cambiarLogo = async () => {
  try {
    const formData = new FormData();

    if (imagen.value) {
      formData.append("logo", imagen.value);
    }

    const response = await axios.post(`http://localhost:8000/api/grupos/${props.grupoId}/logo`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      }
    });
    console.log("ID del grupo:", props.grupoId);

    console.log("Logo del grupo cambiado: ", response.data);

    await obtenerDatos();
  } catch (error) {
    console.error('Error al cambiar logo del grupo:', error);
  }
}

const obtenerDatos = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/grupos/${props.grupoId}/preferencias`, config);
      datos.value = response.data;
      console.log('Datos obtenidos correctamente: ', datos.value);

    } catch (error) {
      console.error('Error al obtener los datos:', error);
      // Manejar el error y mostrar un mensaje al usuario
    }
  };


  onMounted(async () => {
    await obtenerDatos();
  });
</script>

<style scoped>
.v-card {
  padding: 20px;
}

.container {
  width: 80%;
}

</style>
