<template>
  <v-dialog v-model="dialog" max-width="600" >
  
  <v-card prepend-icon="mdi-creation" title="CREAR UNA NOTA">
<v-card-text>
  <v-textarea label="Contenido de la nota..." rows="5" required></v-textarea>
  
  <!-- Sistema de cuadrículas -->
  <v-row>
    <v-col cols="6">
        <v-select
            :items="categoria"
            label="Categoría"
            required
          ></v-select>
    </v-col>
    <v-col cols="6">
        <v-select
            :items="prioridad"
            label="Prioridad"
            required
          ></v-select>
    </v-col>
  </v-row>

</v-card-text>

<v-divider></v-divider>

<v-card-actions>
  <v-spacer></v-spacer>
  <v-btn text="Cancelar" variant="plain" @click="cerrarDialogo"></v-btn>
  <v-btn color="primary" text="Guardar" variant="tonal" @click="guardarNota"></v-btn>
</v-card-actions>
</v-card>
</v-dialog>
</template>

<script setup>
import { ref, defineExpose } from 'vue';

const categoria = [
    'Trabajo', 'Estudios', 'Gimnasio', 'Dieta', 'Ocio', 'Viajes', 'Otro'
]

const prioridad = [
    'Alta', 'Media', 'Baja'
]

const dialog = ref(false);

const abrirDialogoCrearNota = () => {
  dialog.value = true;
};

const cerrarDialogo = () => {
  dialog.value = false;
};

//  ->  Añadir backend para guardar la nota.
const guardarNota = () => {
  console.log('Nota guardada');
  cerrarDialogo();
};

// Exponer el método para que se pueda abrir desde fuera del componente.
defineExpose({ abrirDialogoCrearNota });
</script>
