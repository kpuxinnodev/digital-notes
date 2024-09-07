<template>
    <div class="text-center pa-4">
      <v-dialog v-model="dialog" width="auto">
        <v-card
          max-width="600"
          prepend-icon="mdi-delete-empty"
          text="¿Estas seguro que deseas eliminar la tarea?"
          title="ELIMINAR TAREA"
        >
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              text="Cancelar" 
              variant="plain" 
              @click="cerrarDialogo"
            ></v-btn>
            <v-btn
              color="#2196f3"
              rounded="xl"
              text="Eliminar"
              variant="flat"
              @click="eliminarTarea(nota.id)"
            ></v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
import axios from "axios";

// Estado del diálogo de eliminación
const dialog = ref(false);

// Funciones para abrir y cerrar el diálogo
const abrirDialogoEliminarTarea = () => {
  dialog.value = true;
};

const cerrarDialogo = () => {
  dialog.value = false;
};

const eliminarNota = ref([]);

const token = localStorage.getItem('auth-item');

// Encabezado de la Autorización
const config = {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  },
};

// Función para eliminar una tarea
const eliminarTarea = async (notaId) => {
  try {
    const response = await axios.delete(`http://localhost:8000/api/notas/${notaId}`, config);
    eliminarNota.value = response.data;
    console.log('Se ha eliminado correctamente la nota:', eliminarNota.value);
  } catch (error) {
    console.error('Hubo un error, no se ha podido eliminar la nota:', error);
  }
};
  

  </script>
  
  <style scoped>
  
  </style>
  