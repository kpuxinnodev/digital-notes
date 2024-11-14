<template>
  <ErrorCambiarLogoGrupo ref="errorCambiarLogo" style="position: absolute; z-index: 1000; top: 40%;" />
  <v-container class="container">
    <!-- Muestra los datos -->
    <div class="cartas d-flex flex-row" v-if="datos" :key="index">
      <p style="position: absolute; right: 10px; top: 10px;" >{{ datos.created_at }}</p>

      <v-card flat class="carta-1">
        <v-card-title class="mb-8">Datos del equipo</v-card-title>
        <v-card-text class="d-flex flex-column justify-center align-center">
          <!-- Cargar avatar del Back-End -->
          <img class="ml-4 mr-4 logoequipo"
            :src="datos.logo"
            alt="ogo.png"
          />
          <p class="mt-2">{{ datos.nombre }}</p>
        </v-card-text>
      </v-card>
      
      <v-card flat class="carta-2 d-flex align-center pl-8 pr-8">
        <v-card-text>
          <p>{{ datos.descripcion }}</p>
        </v-card-text>
      </v-card>
      
    </div>

    <v-divider class="divisor mt-8 mb-8"></v-divider>

    <!-- Formulario para editar datos -->
    <v-form ref="form" v-model="valid" class="mt-6">
      <v-row v-if="esAdmin">
        <!-- Campo de archivo para seleccionar la imagen -->
        <v-col cols="12">
          <v-card flat class="carta-3">
            <v-file-input
              :rules="subirAvatar"
              label="Cambiar logo de equipo"
              prepend-icon="mdi-account-multiple"
              variant="filled"
              v-model="imagen"
              accept="image/*"
              class="imagen-input"
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

    <v-divider class="divisor"></v-divider>

    <EliminarGrupo />

  </v-container>
</template>

<script setup>
import { ref, defineProps, onMounted } from "vue";
import FormularioGrupoPreferencias2 from "./FormularioGrupoPreferencias2.vue";
import EliminarGrupo from "./EliminarGrupo.vue";
import axios from "axios";
import ErrorCambiarLogoGrupo from "@/components/errores/ErrorCambiarLogoGrupo.vue";


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

const esAdmin = ref(false);

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
          'Authorization': `Bearer ${token}`
      }
    }

const cambiarLogo = async () => {
  try {
    const formData = new FormData();

    if (imagen.value) {
      formData.append("logo", imagen.value);
    }

    const response = await axios.post(`http://localhost:8000/api/grupos/${props.grupoId}/logo`, formData, config);
    console.log("ID del grupo:", props.grupoId);

    console.log("Logo del grupo cambiado: ", response.data);

    await obtenerDatos();
  } catch (error) {
    console.error('Error al cambiar logo del grupo:', error);
    abrirMostrarError();
  }
}

const obtenerDatos = async () => {
  try {
    const response = await axios.get(`http://localhost:8000/api/grupos/${props.grupoId}/preferencias`, config);
    datos.value = response.data.grupo; // Asegúrate de acceder al grupo
    esAdmin.value = response.data.isAdmin; // Accede a la propiedad isAdmin

    console.log('Datos obtenidos correctamente: ', datos.value);
  } catch (error) {
    console.error('Error al obtener los datos:', error);
  }
};


  onMounted(async () => {
    await obtenerDatos();
  });

  const errorCambiarLogo = ref(null);

  const abrirMostrarError = () => {
  if (errorCambiarLogo.value) {
    errorCambiarLogo.value.abrirMostrarError();
  };
}

</script>

<style scoped>
.v-card {
  padding: 20px;
}

.container {
  width: 80%;
  height: auto;
  background-color: #3f7f9c;
}

.windowcolor {
  background-color: #3f7f9c;
}

img {
  border-radius: 50%;
  width: 70px; /* Tamaño del avatar */
  height: 64px;
}

.carta-1 {
  width: 300px;
  background-color: #3f7f9c;
}

.carta-2 {
  width: 500px;
  background-color: #3f7f9c;
}

.container {
  width: 100%;
}

.cartas {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.carta-3 {
  display: flex;
  flex-direction: row;
  margin: auto;
  width: 70%;
  background-color: #3f7f9c;
  align-self: center;
  justify-self: space-between;

}

.imagen-input{
  width: 50%;
}

.divisor {
  color: white;
  width: 80%;
  margin: auto;
}

.scrollable-window {
  max-height: calc(
    100vh - 64px
  );
  overflow-y: auto;
}  
.logoequipo {
  border-radius: 50%;
}
</style>
