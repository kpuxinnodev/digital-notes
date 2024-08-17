<template>
  <v-dialog v-model="dialog" max-width="600">
    <v-card prepend-icon="mdi-creation" title="ASIGNAR UNA TAREA">
      <v-card-text>
        <!-- Textbox -->
        <v-textarea
          label="Contenido de la nota..."
          rows="5"
          :rules="contenidoRules"
          required
        ></v-textarea>

        <!-- Sistema de cuadrículas -->
        <v-row>
          <v-col cols="6">
            <!-- Seleccionar miembro -->
            <v-select
              :items="miembro"
              label="Miembro"
              :rules="usuarioRules"
              required
            ></v-select>
          </v-col>
          <v-col cols="6">
            <!-- Seleccionar prioridad -->
            <v-select
              :items="prioridad"
              label="Prioridad"
              :rules="prioridadRules"
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
          text="Guardar"
          variant="flat"
          rounded="xl"
          @click="asignarNota"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, defineExpose } from "vue";
//  ->  'defineExpose' exporta funciones para ejecturalas desde otros componentes.

//  ->  Importar miembros del Back-End
const miembro = ["Miembro1", "Miembro2", "Miembro3", "Miembro4"];

//  ->  Prioridades de las notas
const prioridad = ["Alta", "Media", "Baja"];

//  ->  'dialog' por referencia default = false
const dialog = ref(false);

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
const asignarNota = () => {
  console.log("Nota asignada.");
  cerrarDialogo();
};

//  ->  Exponer el método para que se pueda abrir desde fuera del componente.
defineExpose({ abrirDialogoAsignarNota });
</script>
