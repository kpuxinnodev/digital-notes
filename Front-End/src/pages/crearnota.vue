<template>
    <div class="pa-4 text-center">
    <v-dialog v-model="dialog" max-width="600" >
  
      <v-card prepend-icon="mdi-creation" title="CREAR UNA NOTA">
    <v-card-text>
      <v-textarea label="Contenido de la nota..." rows="5" required></v-textarea>
      
      <!-- Usando sistema de cuadrículas -->
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
      <v-btn text="Cancelar" variant="plain" @click="closeDialog"></v-btn>
      <v-btn color="primary" text="Aceptar" variant="tonal" @click="saveNote"></v-btn>
    </v-card-actions>
  </v-card>
    </v-dialog>
</div>
  </template>
  
  <script setup>
import { ref } from 'vue';

const dialog = ref(false);

function openDialog() {
  dialog.value = true;
}

function closeDialog() {
  dialog.value = false;
}

function saveNote() {
  // Aquí va la lógica para guardar la nota
  closeDialog();
}

const categoria = [
    'Trabajo', 'Estudios', 'Gimnasio', 'Dieta', 'Ocio', 'Viajes'
]

const prioridad = [
    'Alta', 'Media', 'Baja'
]

</script>

<style scoped>
/* Ajustes opcionales si necesitas personalizar el estilo */
.v-card-text {
  display: flex;
  flex-direction: column;
}
</style>