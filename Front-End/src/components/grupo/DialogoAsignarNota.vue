<template>
  <v-dialog v-model="dialog" max-width="600">
    <v-form fast-fail v-model="valid" @submit.prevent="asignarNota">
      <v-card prepend-icon="mdi-creation" title="ASIGNAR UNA TAREA">
      <v-card-text>
        <!-- Textbox -->
        <v-textarea
          label="Contenido de la nota..."
          rows="5"
          v-model="notaGrupal.descripcion"
          :rules="contenidoRules"
          required
        ></v-textarea>

        <!-- Sistema de cuadrículas -->
        <v-row>
          <v-col cols="6">
            <!-- Seleccionar miembro -->
            <v-select
              :items="asignacion"
              label="Miembro"
              :rules="usuarioRules"
              v-model="notaGrupal.asignacion"
              required
            ></v-select>
          </v-col>
          <v-col cols="6">
            <!-- Seleccionar prioridad -->
            <v-select
              :items="prioridad"
              label="Prioridad"
              :rules="prioridadRules"
              v-model="notaGrupal.prioridad"
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
          text="Asignar"
          variant="flat"
          rounded="xl"
          @click="asignarNota"
        ></v-btn>
      </v-card-actions>
    </v-card>
    </v-form>
  </v-dialog>
</template>

<script setup>
import { ref, defineExpose, onMounted } from "vue";
import axios from "axios";
import { defineProps } from "vue";
//  ->  'defineExpose' exporta funciones para ejecturalas desde otros componentes.

const props = defineProps({
  grupoId: {
    type: Number,
    required: true
  }
});

const emit = defineEmits(['notaAsignada']);

const notaGrupal = ref({
  descripcion:"",
  asignacion: "",
  prioridad: "",
});

//  ->  Importar miembros del Back-End
const asignacion = ["Miembro1", "Miembro2", "Miembro3", "Miembro4"];

//  ->  Prioridades de las notas
const prioridad = ["Alta", "Media", "Baja"];

//  ->  'dialog' por referencia default = false
const dialog = ref(false);

const valid = ref(false);


//  ->  Funciones para abrir y cerrar el dialogo
const abrirDialogoAsignarNota = () => {
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

const usuarioRules = [(v) => !!v || "Debes elegir un usuario"];

const prioridadRules = [(v) => !!v || "La prioridad es requerida"];

//  ->  Añadir backend para asignar la nota.


const token = localStorage.getItem('auth-item');

//  ->  Encabezado de la Autorización
const config = {
    headers: {
        'Content-Type':'application/json',
        'Authorization': `Bearer ${token}`
    }
};



const asignarNota = async () => {
  if (!valid.value) return; // Verifica si el formulario es válido
   notaGrupal.value.asignacion = true;

   if (!props.grupoId || isNaN(props.grupoId)) {
    console.error('No se ha proporcionado un ID de grupo válido');
    return;
  }
  try {
    // Esperar la respuesta de la API
    const response = await axios.post(`http://localhost:8000/api/notas/${props.grupoId}/grupo`, notaGrupal.value, config);
    
    console.log('Nota asignada:', response.data);
    emit('notaAsignada');
    cerrarDialogo(); // Cerrar el diálogo después de guardar la nota
    
    // Aquí podrías agregar una redirección o mostrar un mensaje de éxito

  } catch (error) {
    console.error('Error al guardar nota:', error);
    // Manejar el error y mostrar un mensaje al usuario
  }
};

onMounted( async() => {
  await asignarNota();
})

//  ->  Exponer el método para que se pueda abrir desde fuera del componente.
defineExpose({ abrirDialogoAsignarNota });
</script>
