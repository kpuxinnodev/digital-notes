<template>
  <div class="text-center pa-4">
    <v-dialog v-model="dialog" width="auto">
      <v-card
        max-width="600"
        prepend-icon="mdi-power-standby"
        text="¿Estas seguro que deseas cerrar sesión?"
        title="CERRAR SESIÓN"
      >
        <v-card-actions>
          <v-spacer></v-spacer>
          <!-- Botón de Cerrar diálogo -->
          <v-btn text="Cancelar" variant="plain" @click="cerrarDialogo"></v-btn>
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
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();
const dialog = ref(false);

//  ->  Función para abrir y cerrar dialogo
const abrirDialogoSalirAplicacion = () => {
  dialog.value = true;
};
const cerrarDialogo = () => {
  dialog.value = false;
};

//  ->  Token
const token = localStorage.getItem("auth-item");

//  ->  Encabezado de la Autorización
const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
};

const iniciarSesionUno = () => {
  router.push("/login")
};

//  ->  Logout
const cerrarSesion = async () => {
  try {
    //  ->  Llamada a la API
    await axios.post(
      "http://localhost:8000/api/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    //  ->  Eliminar el token
    localStorage.removeItem("auth-item");

    //  ->  Actualizar el estado del usuario
    this.$store.commit("setUser", null);

    //  ->  Redirigir al inicio de sesión
    salirAplicacion()

  } catch (error) {
    console.error("Error al cerrar sesión.", error);
  }
};

//  ->  Exponer el método para que se pueda abrir desde fuera del componente.
defineExpose({ abrirDialogoSalirAplicacion });
</script>

<style scoped></style>
