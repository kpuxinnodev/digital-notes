<template>
  <div class="text-center pa-4">
    
    <!-- Diálogo -->
    <v-dialog v-model="dialog" width="auto">
      <v-card
        max-width="600"
        prepend-icon="mdi-delete-empty"
        text="¿Estas seguro que deseas eliminar la tarea?"
        title="ELIMINAR TAREA"
        class="colorfondo"
      >
        <v-card-actions>
          <v-spacer></v-spacer>

          <!-- Botón de cerrar diálogo -->
          <v-btn
            text="Cancelar" 
            variant="plain" 
            @click="cerrarDialogo"
          ></v-btn>

          <!-- Botón de eliminar tarea -->
          <v-btn
            color="#2196f3"
            rounded="xl"
            text="Eliminar"
            variant="flat"
            @click="eliminarTarea"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";


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
  console.log("Abriendo diálogo para eliminar nota con ID:", props.notaId);
  dialog.value = true;  // Esto debería abrir el diálogo
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
const eliminarTarea = async () => {
  if (!props.notaId || isNaN(props.notaId)) { // Verifica si notaId es válido y es un número
    console.error('No se ha proporcionado un ID de nota válido');
    return;
  }

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

.colorfondo {
  background-color: #263238;
}
</style>
    