<template>
  <v-dialog v-model="dialog" max-width="600">
    <v-form v-model="valid" @submit.prevent="agregarMiembro">
      <v-card
        prepend-icon="mdi-account-plus"
        title="AGREGAR MIEMBRO"
        class="windowcolor"
      >
        <v-card-text>
          <v-text-field label="Usuario"
          v-model="nickname"
          required></v-text-field>

          <!-- Sistema de cuadrículas -->
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <!-- Botón de Cerrar diálogo -->
          <v-btn text="Cancelar" variant="plain" @click="cerrarDialogo"></v-btn>
          <!-- Botón de Guardar nota -->
          <v-btn
            color="primary"
            text="Agregar"
            variant="flat"
            rounded="xl"
            type="submit"
          >Agregar</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script setup>
import { ref, defineExpose } from "vue";
import axios from "axios";
import { defineProps } from 'vue';

const props = defineProps({
  grupoId: {
    type: Number,
    required: true
  }
});

//  ->  'dialog' por referencia default = false
const dialog = ref(false);
const valid = ref(true);
const nickname = ref("");

//  ->  Funciones para abrir y cerrar el dialogo
const abrirDialogoAgregarMiembro = () => {
  dialog.value = true;
};
const cerrarDialogo = () => {
  dialog.value = false;
};

const token = localStorage.getItem('auth-item');

//  ->  Encabezado de la Autorización
const config = {
    headers: {
        'Content-Type':'application/json',
        'Authorization': `Bearer ${token}`
    }
};

//  ->  Añadir backend para agregar el miembro
// Función para agregar el miembro
const agregarMiembro = async () => {
  if (!nickname.value) return; // Validar que haya un nombre de usuario
  if (!props.grupoId || isNaN(props.grupoId)) {
    console.error('No se ha proporcionado un ID de grupo válido');
    return;
  }
  const body = {
    nickname: nickname.value
  };
  try {
    const response = await axios.post(`http://localhost:8000/api/notificacion/${props.grupoId}/enviar`, body, config, );

    // Manejar la respuesta del backend
    console.log("Respuesta del servidor:", response.data);

    // Cerrar el diálogo al completar la operación
    cerrarDialogo();
  } catch (error) {
    console.error("Error al agregar el miembro:", error);
  }
};

//  ->  Exponer el método para que se pueda abrir desde fuera del componente.
defineExpose({ abrirDialogoAgregarMiembro });
</script>

<style scoped>
.windowcolor {
  background-color: #263238;
}</style>
