<template>
  <v-dialog v-model="dialog" max-width="600">
    <v-form fast-fail v-model="valid" @submit.prevent="guardarNota">
      <v-card prepend-icon="mdi-creation" title="CREAR UNA NOTA">
        <v-card-text>
          <v-textarea
            label="Contenido de la nota..."
            v-model="notaPersonal.descripcion"
            :rules="contenidoRules"
            rows="5"
            required
          ></v-textarea>

          <!-- Sistema de cuadrículas -->
          <v-row>
            <v-col cols="6">
              <!-- Seleccionar categoría -->
              <v-select
                :items="categoria"
                label="Categoría"
                :rules="categoriaRules"
                v-model="notaPersonal.categoria"
                required
              ></v-select>
            </v-col>
            <v-col cols="6">
              <!-- Seleccionar prioridad -->
              <v-select
                :items="prioridad"
                label="Prioridad"
                :rules="prioridadRules"
                v-model="notaPersonal.prioridad"
                required
              ></v-select>
            </v-col>
          </v-row>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <!-- Botón de Cerrar diálogo -->
          <v-btn text="Cancelar" variant="plain" @click="cerrarDialogo"></v-btn>
          <!-- Botón de Guardar nota -->
          <v-btn
            color="primary"
            text="Crear"
            variant="flat"
            rounded="xl"
            type="submit"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script setup>
import { ref, defineExpose } from "vue";
import axios from "axios";
import { io } from "socket.io-client";

//  ->  'defineExpose' exporta funciones

const valid = ref(false);

const emit = defineEmits(['notaCreada']);

const notaPersonal = ref({
  descripcion:"",
  categoria: "",
  prioridad: "",
});

//  ->  Categorías, ¿importar del backend?
const categoria = [
  "Trabajo",
  "Estudios",
  "Gimnasio",
  "Dieta",
  "Ocio",
  "Viajes",
  "Otro",
];

//  ->  Prioridades de las tareas
const prioridad = ["Alta", "Media", "Baja"];

//  ->  'dialog' por referencia default = false
const dialog = ref(false);

//  ->  Funciones para abrir y cerrar el dialogo
const abrirDialogoCrearNota = () => {
  dialog.value = true;
};
const cerrarDialogo = () => {
  dialog.value = false;
};

//  ->  Reglas
const contenidoRules = [
  (v) => !!v || "El contenido es requerido",
  (v) =>
    (v && v.length <= 120) ||
    "El contenido debe contar con menos de 120 caracteres",
];

const categoriaRules = [(v) => !!v || "La categoría es requerida"];

const prioridadRules = [(v) => !!v || "La prioridad es requerida"];


const token = localStorage.getItem('auth-item');

//  ->  Encabezado de la Autorización
const config = {
    headers: {
        'Content-Type':'application/json',
        'Authorization': `Bearer ${token}`
    }
};



const guardarNota = async () => {
  if (!valid.value) return; // Verifica si el formulario es válido
  
  try {
    // Esperar la respuesta de la API
    const response = await axios.post('http://localhost:8000/api/notas', notaPersonal.value, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    
    console.log('Nota Guardada:', response.data);
    cerrarDialogo(); // Cerrar el diálogo después de guardar la nota
    emit('notaCreada');
    // Aquí podrías agregar una redirección o mostrar un mensaje de éxito

  } catch (error) {
    console.error('Error al guardar nota:', error);
    // Manejar el error y mostrar un mensaje al usuario
  }
};


//  ->  Exponer el método para que se pueda abrir desde fuera del componente.
defineExpose({ abrirDialogoCrearNota });
</script>
