<template>
  <!-- Componentes importados (crear nota: éxito y error) -->
  <ErrorCrearNota ref="erroralcrearnota" style="position: absolute;" />
  <CrearNotaexitosa ref="crearnotaexitosa" style="position: absolute;" />

  <!-- Diálogo: Formulario -->
  <v-dialog v-model="dialog" max-width="600">
    <v-form fast-fail v-model="valid" @submit.prevent="guardarNota">
      <v-card prepend-icon="mdi-creation" title="CREAR UNA NOTA" class="colorfondo">
        <v-card-text>

          <!-- Input: Contenido -->
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
              <!-- Input: Categoría -->
              <v-select
                :items="categoria"
                label="Categoría"
                :rules="categoriaRules"
                v-model="notaPersonal.categoria"
                required
              ></v-select>
            </v-col>

            <v-col cols="6">
              <!-- Input: Prioridad -->
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
          <v-btn
            text="Cancelar"
            variant="plain"
            @click="cerrarDialogo"
          ></v-btn>

          <!-- Botón de Guardar nota -->
          <v-btn
            class="color"
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
//  ->  Imports
import { ref, defineExpose } from "vue";
import axios from "axios";
import { io } from "socket.io-client";
import ErrorCrearNota from "../errores/ErrorCrearNota.vue";
import CrearNotaexitosa from "../exito/CrearNotaexitosa.vue";

//  ->  Formulario por referencia
const valid = ref(false);

const emit = defineEmits(['notaCreada']);

//  ->  Objeto donde se guarda la información de los imputs para luego enviarla
const notaPersonal = ref({
  descripcion:"",
  categoria: "",
  prioridad: "",
});

//  ->  Categorías a elegir
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

//  ->  Funciones de crear y cerrar diálogo
const dialog = ref(false);
const abrirDialogoCrearNota = () => {
  dialog.value = true;
};
const cerrarDialogo = () => {
  dialog.value = false;
};

//  ->  Reglas de los inputs
const contenidoRules = [
  (v) => !!v || "El contenido es requerido",
  (v) =>
    (v && v.length <= 120) ||
    "El contenido debe contar con menos de 120 caracteres",
];
const categoriaRules = [(v) => !!v || "La categoría es requerida"];
const prioridadRules = [(v) => !!v || "La prioridad es requerida"];

//  ->  Token a enviar
const token = localStorage.getItem('auth-item');

//  ->  Objeto config con headers
const config = {
    headers: {
        'Content-Type':'application/json',
        'Authorization': `Bearer ${token}`
    }
};

//  ->  Función para enviar el formulario
const guardarNota = async () => {
  if (!valid.value) return; // Verifica si el formulario es válido
  
  try {
    // Esperar la respuesta de la API
    const response = await axios.post('http://localhost:8000/api/notas', notaPersonal.value, config, 
    /** {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
    } */
    );
    
    console.log('Nota Guardada:', response.data);
    cerrarDialogo(); // Cerrar el diálogo después de guardar la nota
    abrirMostrarExito();

  } catch (error) {
    console.error('Error al guardar nota:', error);
    cerrarDialogo();
    abrirMostrarError();  
    // Manejar el error y mostrar un mensaje al usuario
  }
};

//  ->  Función de Mostrar Éxito
const crearnotaexitosa = ref(null);
const abrirMostrarExito = () => {
  if (crearnotaexitosa.value) {
    crearnotaexitosa.value.abrirMostrarExito();
  };
}

//  ->  Función de Mostrar Error
const erroralcrearnota = ref(null);
const abrirMostrarError = () => {
  if (erroralcrearnota.value) {
    erroralcrearnota.value.abrirMostrarError();
  };
}


//  ->  Exponer el método para que se pueda abrir desde fuera del componente.
defineExpose({ abrirDialogoCrearNota });
</script>

<style scoped>
.colorfondo {
  background-color: #263238;
}

.color {
  background-color: #2196f3;
}
</style>
