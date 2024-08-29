<template>
  <v-dialog v-model="dialog" max-width="600">
    <v-form v-model="valid" @submit.prevent="crearGrupo">
      <v-card prepend-icon="mdi-creation" title="CREAR GRUPO">
        <v-card-text>
          <v-text-field label="Nombre del equipo" required></v-text-field>

          <v-file-input
            label="Seleccionar logo de equipo"
            prepend-icon="mdi-account-multiple"
            variant="filled"
          ></v-file-input>

          <v-textarea
            label="Descripción del grupo..."
            rows="5"
            required
          ></v-textarea>

          <!-- Sistema de cuadrículas -->
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <!-- Botón de Cerrar diálogo -->
          <v-btn text="Cancelar" variant="plain" @click="cerrarDialogo"></v-btn>
          <!-- Botón de Guardar nota -->
          <v-btn
            color="primary"
            text="Crear grupo"
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
//  ->  'defineExpose' exporta funciones

//  ->  'dialog' por referencia default = false
const dialog = ref(false);

//  ->  Funciones para abrir y cerrar el dialogo
const abrirDialogoCrearGrupo = () => {
  dialog.value = true;
};
const cerrarDialogo = () => {
  dialog.value = false;
};

//  ->  Añadir backend para guardar la nota.
const crearGrupo = () => {
  console.log("Grupo creado.");
  cerrarDialogo();
};

//  ->  Exponer el método para que se pueda abrir desde fuera del componente.
defineExpose({ abrirDialogoCrearGrupo });
</script>
