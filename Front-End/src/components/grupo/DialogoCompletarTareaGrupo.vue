<template>
    <div class="text-center pa-4">
      <v-dialog v-model="dialog" width="auto">
        <v-card
          max-width="600"
          prepend-icon="mdi-check-decagram"
          text="¿Estas seguro que deseas completar la tarea?"
          title="COMPLETAR TAREA"
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
              @click="completarTareaGrupo"
            >Completar Tarea</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </template>
  
  <script setup>
  import { ref, defineExpose } from "vue";
  import { defineProps } from "vue";
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

const emit = defineEmits(['notaCompletada']);
  
  //  ->  'dialog' por referencia default = false
  const dialog = ref(false);
  
  //  ->  Funciones para abrir y cerrar el dialogo
  const abrirDialogoCompletarTareaGrupo = () => {
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

  //  ->  Añadir backend para abandonar el grupo.
 
  const completarTareaGrupo = async () => {
    if (!props.notaId || isNaN(props.notaId)) {
      console.error('No se ha proporcionado un ID de nota válido');
      return;
    }
    if (!props.grupoId || isNaN(props.grupoId)) {
    console.error('El ID del grupo no está definido o no es válido');
    return;
    }
  
    try {
     
      const data = { estado: 'Completada'};
  
      // Si no necesitas pasar datos en el cuerpo de la solicitud, envía un objeto vacío {}
      const response = await axios.put(`http://localhost:8000/api/notas/${props.notaId}/${props.grupoId}/completarnotagrupo`, data, config);
      emit('notaCompletada');
      console.log('Se ha completado correctamente la nota:', response.data);
      cerrarDialogo();
    } catch (error) {
      console.error('Hubo un error, no se ha podido completar la nota:', error);
    }
  };
  
  //  ->  Exponer el método para que se pueda abrir desde fuera del componente.
  defineExpose({ abrirDialogoCompletarTareaGrupo });

  </script>
  
  <style scoped>
  
  </style>
  