  <template>
    <v-container class="container">
      <!-- Muestra los datos -->
      <div class="d-flex flex-row" v-for="(dato, index) in datos" :key="index">
        <v-card flat class="carta-1">
          <v-card-text class="d-flex flex-column justify-center align-center">
            <!-- Cargar avatar del Back-End -->
            <img
            v-if="dato.avatar"
            class="ml-4 mr-4"
            :src="dato.avatar"
            :alt="dato.nickname"
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

      <v-form ref="form" v-model="valid" class="mt-6">
      <v-row>
        <!-- Campo de archivo para seleccionar la imagen -->
        <v-col cols="12">
          <v-card flat>
            <v-file-input
              v-model="imagen"
              label="Cambiar avatar de usuario"
              prepend-icon="mdi-account"
              variant="filled"
            ></v-file-input>
            <v-col class="d-flex justify-end">
              <v-btn
              color="primary"
              @click="submitForm"
              >Confirmar Logo</v-btn>
            </v-col>
          </v-card>
        </v-col>
      </v-row>
    </v-form>

      <v-divider class="divisor"></v-divider>

      <!-- Formulario para editar datos -->
      
    </v-container>
  </template>

  <script setup>
  import { ref, onMounted } from "vue";
  import axios from 'axios';
  

  //  ->  'valid' por referencia default = false
  const valid = ref(false);

  const imagen = ref(null);

  //  ->  Datos de Usuario cargados del Back-End
  const datos = ref([]);

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
      datos.value = [response.data];

      console.log('Datos obtenidos correctamente: ', response.data);

    } catch (error) {
      console.error('Error al obtener los datos:', error);
   
      // Manejar el error y mostrar un mensaje al usuario
    }
  };

  const enviarImagen = async () => {
    if (!imagen.value) {
    console.error("No se ha seleccionado ninguna imagen.");
    return;
    }

    const formData = new FormData();
    formData.append("avatar", imagen.value);

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
    }

  const submitForm = () => {
  enviarImagen();
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

img {
  border-radius: 50%;
  width: 70px; /* Tamaño del avatar */
  height: 64px;
}
</style>
