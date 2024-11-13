<template>
  <div class="text-center pa-4">

    <!-- Diálogo -->
    <v-dialog v-model="dialog" width="auto">
      <v-card
        max-width="600"
        prepend-icon="mdi-power-standby"
        text="¿Estas seguro que deseas cerrar sesión?"
        title="CERRAR SESIÓN"
        class="colorfondo"
      >
        <v-card-actions>
          <v-spacer></v-spacer>
          <!-- Botón de Cerrar diálogo -->
          <v-btn
            text="Cancelar" 
            variant="plain"
            @click="cerrarDialogo"
          ></v-btn>
          <!-- Botón de Salir de la aplicación -->
          <v-btn
            color="#2196f3"
            text="Cerrar sesión"
            variant="flat"
            rounded="xl"
            @click="cerrarSesion"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
 
</template>

<script setup>
import { ref, defineExpose } from "vue";
import { useRouter } from 'vue-router';
import axios from "axios";
import { onMounted } from 'vue';
import ErrorSalir from "./errores/ErrorSalir.vue";

const router = useRouter();
//  ->  'dialog' por referencia default = false
const dialog = ref(false);

//  ->  Función para abrir y cerrar dialogo
const abrirDialogoSalirAplicacion = () => {
  dialog.value = true;
};
const cerrarDialogo = () => {
  dialog.value = false;
};

//  ->  Enviar al inicio de sesión.
function salirAplicacion() {
  router.push('/login')
}

//  ->  Token
const token = localStorage.getItem('auth-item');

const removeToken = () => {
  localStorage.removeItem('auth.item');
};

//  ->  Logout
const cerrarSesion = async () =>  {
  try {
    //  ->  Llamada a la API
    await axios.post('http://localhost:8000/api/logout',
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
    }
    }
      
    ).then(
      function (response) {response.data.sesiones_cerradas>=1});

    //  ->  Eliminar el token
    localStorage.removeItem('auth-item')

    //  ->  Actualizar el estado del usuario
    onMounted(() => {
      removeToken();
    });

    //  ->  Redirigir al inicio de sesión
    salirAplicacion()
  } catch (error) {
    console.error('Error al cerrar sesión.', error)
    cerrarDialogo();
    abrirMostrarError();
  }
}

const errorSalir = ref(null);

const abrirMostrarError = () => {
  if (errorSalir.value) {
    errorSalir.value.abrirMostrarError();
  }
}

//  ->  Exponer el método para que se pueda abrir desde fuera del componente.
defineExpose({ abrirDialogoSalirAplicacion });
</script>

<style scoped>
.colorfondo {
  background-color: #263238;
}

.color {
  background-color: #2196f3;
}
</style>
