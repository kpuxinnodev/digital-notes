<template>
    <div class="text-center pa-4">
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
              @click="eliminarTareaGrupo"
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
  },
  grupoId: {
    type: Number,
    required: true
  }
});
  
  const emit = defineEmits(['notaEliminada']);
  
  
  // Estado del diálogo de eliminación
  const dialog = ref(false);
  
  // Funciones para abrir y cerrar el diálogo
  
  const abrirDialogoEliminarTareaGrupo = () => {
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
  const eliminarTareaGrupo = async () => {
    if (!props.notaId || isNaN(props.notaId)) {
      console.error('No se ha proporcionado un ID de nota válido');
      return;
    }
    if (!props.grupoId || isNaN(props.grupoId)) {
    console.error('El ID del grupo no está definido o no es válido');
    return;
    }
  
    try {
      const response = await axios.delete(`http://localhost:8000/api/notas/${props.notaId}/${props.grupoId}/eliminarnotagrupo`, config);
      console.log('Se ha eliminado correctamente la nota:', response.data);
      cerrarDialogo();
      emit('notaEliminada');
    } catch (error) {
      console.error('Hubo un error, no se ha podido eliminar la nota:', error);
    }
  };
  
  defineExpose({ abrirDialogoEliminarTareaGrupo });
  
  </script>
  
  <style scoped>
  .colorfondo {
  background-color: #263238;
}
  </style>