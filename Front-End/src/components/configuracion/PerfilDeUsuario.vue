<template>
  <v-container class="container">
    <!-- Muestra los datos -->
    <div class="d-flex flex-row" v-for="(dato, index) in datos" :key="index">
      <v-card flat class="carta-1">
        <v-card-text class="d-flex flex-column justify-center align-center">
          <!-- Cargar avatar del Back-End -->
          <img
            v-for="(avatar, index) in avatarDB"
            :key="index"
            :src="avatar.img"
            :alt="avatar.descripcion"
          />
          <p class="mt-2">{{ dato.name }}</p>
          <p>@{{ dato.username }}</p>
        </v-card-text>
      </v-card>
      <v-card flat class="d-flex align-center pl-8 pr-8">
        <v-card-text>
          <p>{{ dato.biography }}</p>
        </v-card-text>
      </v-card>
    </div>

    <v-divider class="divisor"></v-divider>

    <!-- Formulario para editar datos -->
    <v-form ref="form" v-model="valid" @click.prevent="enviarImagen">
      <v-row>
        <!-- Campo de archivo para seleccionar la imagen -->
        <v-col cols="12">
          <v-card flat>
            <v-file-input
              v-model="imagen"
              accept="image/png, image/jpeg, image/bmp, image/jpg"
              label="Avatar"
              placeholder="Sube un avatar"
              prepend-icon="mdi-camera"
            ></v-file-input>
          </v-card>
        </v-col>

        <!-- Botón para enviar el formulario -->
        <v-col class="d-flex justify-end">
          <v-btn color="primary" type="submit" class="mt-4">
            Cambiar avatar
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import axios from 'axios';

//  ->  'valid' por referencia default = false
const valid = ref(false);

const image = ref(null);

//  ->  Datos de Usuario cargados del Back-End
const datos = ref([
  {
    name: "nombre",
    username: "usuario",
    biography:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui libero quisquam incidunt deserunt voluptatum facilis porro vitae. Facere, a nemo id quod eligendi velit illum soluta, voluptatum perferendis dolores culpa!",
  },
]);

//  ->  Avatar cargado del Back-End
const avatarDB = ref([{ img: "/img/nav/user.png", descripcion: "avatar.png" }]);

//  ->  Envio de los datos al Back-End
const enviarImagen = async () => {
  if (!imagen.value) {
    console.log('Porfavor selecciona una imagen');
    return;
  } // Verifica si el formulario es válido

  const formulario = new Formulario();
  formulario.append('imagen', imagen.value)
  
  try {
    const response = await axios.post('http://localhost:8000/api/users/avatar', formulario, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    console.log('Imagen subida exitosamente: ', response.data);

  } catch (error) {
    console.error('Error al subir la imagen:', error);
    // Manejar el error y mostrar un mensaje al usuario
    abrirMostrarError()
  }
};
</script>

<style scoped>
.v-card {
  padding: 20px;
}

.container {
  width: 80%;
}
</style>
