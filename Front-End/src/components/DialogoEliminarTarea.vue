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
              @click="eliminarTarea"
            ></v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </template>
  
  <script setup>
  import { ref, defineExpose } from "vue";
  import axios from "axios";
  
  //  ->  'dialog' por referencia default = false
  const dialog = ref(false);
  
  //  ->  Funciones para abrir y cerrar el dialogo
  const abrirDialogoEliminarTarea = () => {
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

  const eliminarTarea = async () => {
    try {
      const response = await axios.delete('http://localhost:8000/api/users/{id}', {}, {
       headers: {
       'Content-Type': 'application/json',
       Authorization: `Bearer ${token}`,
      }
      })
      .then(function(respuesta) {
        localStorage.setItem('auth-item',respuesta.data.token)
      });
      console.log('Se ha eliminado correctamente el usuario:', response.data);
    }catch (error) {
        console.error('Hubo un error no se a podido elimiar al usuario:', error);
    }
  }

  </script>
  
  <style scoped>
  
  </style>
  