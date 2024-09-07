  <template>
    <v-container class="container">
      <!-- Muestra los datos -->
      <div class="d-flex flex-row" v-for="(dato, index) in datos" :key="index">
        <v-card flat class="carta-1">
          <v-card-text class="d-flex flex-column justify-center align-center">
            <!-- Cargar avatar del Back-End -->
            <img
              v-if="dato.avatar"
              :src="dato.avatar"
              :alt="dato.name"
            />
            <p class="mt-2">{{ dato.name }}</p>
            <p>@{{ dato.nickname }}</p>
          </v-card-text>
        </v-card>
        <v-card flat class="d-flex align-center pl-8 pr-8">
          <v-card-text>
            <p>{{ dato.biografia }}</p>
          </v-card-text>
        </v-card>
      </div>

      <v-divider class="divisor"></v-divider>

      <!-- Formulario para editar datos -->
      <v-form ref="form" v-model="valid" @submit.prevent="enviarImagen">
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
  import { onMounted } from "vue";

  //  ->  'valid' por referencia default = false
  const valid = ref(false);

  const imagen = ref(null);

  //  ->  Datos de Usuario cargados del Back-End
  const datos = ref([]);

  //  ->  Avatar cargado del Back-End
  const avatarDB = ref([{ img: "/img/nav/user.png", descripcion: "avatar.png" }]);

  const token = localStorage.getItem('auth-item');

  //  ->  Encabezado de la Autorización
  const config = {
      headers: {
          'Content-Type':'application/json',
          'Authorization': `Bearer ${token}`
      }
    }
  //  ->  Encabezado de la Autorización


  //  ->  Envio de los datos al Back-End
  const obtenerDatos = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/users/ver', config);
      datos.value = response.data;
      console.log('Datos obtenidos correctamente: ', response.data);

    } catch (error) {
      console.error('Error al obtener los datos:', error);
      // Manejar el error y mostrar un mensaje al usuario
    }
  };



  const enviarImagen = async () => {
    if (imagen.value) {
      // Crear un FormData para enviar la imagen
      const formData = new FormData();
      formData.append('avatar', imagen.value);

      try {
        const response = await axios.post('http://localhost:8000/api/users/avatar', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
          }
        });
        console.log('Imagen subida correctamente: ', response.data);
        await obtenerDatos();
      } catch (error) {
        console.error('Error al subir la imagen:', error);
      }
    } else {
      console.error('No se ha seleccionado ninguna imagen');
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
