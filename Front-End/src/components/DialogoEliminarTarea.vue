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
import MostrarNotas from "./index/MostrarNotas.vue";


const props = defineProps({
  notaId: {
    type: Number,
    required: true
  }
});

const emit = defineEmits(['notaEliminada']);


// Estado del diálogo de eliminación
const dialog = ref(false);

// Funciones para abrir y cerrar el diálogo
const abrirDialogoEliminarTarea = () => {
  dialog.value = true;
};

const cerrarDialogo = () => {
  dialog.value = false;
};

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
    const response = await axios.delete(`http://localhost:8000/api/notas/${props.notaId}`, config);
    console.log('Se ha eliminado correctamente la nota:', response.data);
    cerrarDialogo();
    emit('notaEliminada');
  } catch (error) {
    console.error('Hubo un error, no se ha podido eliminar la nota:', error);
  }
};

defineExpose({ abrirDialogoEliminarTarea });
</script>

<style scoped>
</style>
    