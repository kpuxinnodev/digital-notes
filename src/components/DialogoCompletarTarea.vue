<template>
  <!-- Componente importado: completar tarea -->
  <CompletarTareaexito ref="completartarea" style="position: absolute; z-index: 1000; top: 40%;"/>
  <ErrorCompletarTarea ref="errorCompletarTarea" style="position: absolute; z-index: 1000; top: 40%;"/>
    <div class="text-center pa-4">

      <!-- Diálogo -->
      <v-dialog v-model="dialog" width="auto">
        <v-card
          max-width="600"
          prepend-icon="mdi-check-decagram"
          text="¿Estas seguro que deseas completar la tarea?"
          title="COMPLETAR TAREA"
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
              text="Completar"
              variant="flat"
              @click="completarTarea"
            ></v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </template>
  
  <script setup>
  import { ref, defineExpose } from "vue";
  import { defineProps } from "vue";
  import axios from "axios";
  import CompletarTareaexito from "./exito/CompletarTareaexito.vue";
  import ErrorCompletarTarea from "./errores/ErrorCompletarTarea.vue";
  
const props = defineProps({
  notaId: {
    type: Number,
    required: true
  }
});

const emit = defineEmits(['notaCompletada']);
  
  //  ->  'dialog' por referencia default = false
  const dialog = ref(false);
  
  //  ->  Funciones para abrir y cerrar el dialogo
  const abrirDialogoCompletarTarea = () => {
    dialog.value = true;
  };
  const cerrarDialogo = () => {
    dialog.value = false;
  };

const token = localStorage.getItem('auth-item');

  //  ->  Añadir backend para abandonar el grupo.
  const completarTarea = async () => {
  if (!props.notaId || isNaN(props.notaId)) {
    console.error('No se ha proporcionado un ID de nota válido');
    return;
  }

  try {
    const token = localStorage.getItem('auth-item');
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`  // Asegúrate de que el token esté correctamente almacenado
      }
    };

    const data = { estado: 'Completada'};

    // Si no necesitas pasar datos en el cuerpo de la solicitud, envía un objeto vacío {}
    const response = await axios.put(`http://localhost:8000/api/notas/${props.notaId}/completar`, data, config);
    emit('notaCompletada');
    console.log('Se ha completado correctamente la nota:', response.data);
    abrirMostrarExito();
    cerrarDialogo();
  } catch (error) {
    console.error('Hubo un error, no se ha podido completar la nota:', error);
    cerrarDialogo();
    abrirMostrarError();
  }
};
  
  const completartarea = ref(null);

  
const abrirMostrarExito = () => {
  if (completartarea.value) {
    completartarea.value.abrirMostrarExito();
  }
}

const errorCompletarTarea = ref(null);

const abrirMostrarError = () => {
  if (errorCompletarTarea) {
    errorCompletarTarea.value.abrirMostrarError();
  }
}

  //  ->  Exponer el método para que se pueda abrir desde fuera del componente.
  defineExpose({ abrirDialogoCompletarTarea });

  </script>
  
  <style scoped>

.colorfondo {
  background-color: #263238;
}
  
  </style>
  