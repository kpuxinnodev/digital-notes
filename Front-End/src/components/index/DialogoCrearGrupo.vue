<template>
  <v-dialog v-model="dialog" max-width="600">
    <v-form v-model="valid" @submit.prevent="crearGrupo">
      <v-card prepend-icon="mdi-creation" title="CREAR GRUPO">
        <v-card-text>
          <v-text-field 
          label="Nombre del equipo"
          required 
          v-model="nuevoGrupo.nombre" 
          :rules="nombreGrupoRules"
          ></v-text-field>

          <v-file-input
            label="Seleccionar logo de equipo"
            prepend-icon="mdi-account-multiple"
            variant="filled"
          ></v-file-input>

          <v-textarea
            label="Descripción del grupo..."
            v-model="nuevoGrupo.descripcion"
            :rules="contenidoRules"
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
          <!-- Botón de Crear Grupo -->
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
import axios from "axios";

const valid = ref(false);

//  ->  'defineExpose' exporta funciones

const nuevoGrupo = ref({
  nombre:"",
  descripcion: "",
});

const emit = defineEmits(['grupoCreado']);

//  ->  'dialog' por referencia default = false
const dialog = ref(false);


//  ->  Funciones para abrir y cerrar el dialogo
const abrirDialogoCrearGrupo = () => {
  dialog.value = true;
};
const cerrarDialogo = () => {
  dialog.value = false;
};

// -> Reglas

const nombreGrupoRules = [
(v) => !!v || "El contenido es requerido",
  (v) =>
    (v && v.length <= 45) ||
    "El Nombre del grupo debe contar con menos de 45 caracteres",
];

const contenidoRules = [
  (v) => !!v || "El contenido es requerido",
  (v) =>
    (v && v.length <= 200) ||
    "El contenido debe contar con menos de 120 caracteres",
];

const token = localStorage.getItem('auth-item');

const config = {
    headers: {
        'Content-Type':'application/json',
        'Authorization': `Bearer ${token}`
    }
};

const crearGrupo = async () => {
  if (!valid.value) return;

  try {
    const response = await axios.post('http://localhost:8000/api/grupos', nuevoGrupo.value, config);
    console.log('Grupo Creado:', response.data);
    // Redirigir o mostrar mensaje de éxito
    cerrarDialogo();
    emit('grupoCreado');
  }catch (error) {
    console.error('Error al crear el grupo:', error);
  }
};


//  ->  Exponer el método para que se pueda abrir desde fuera del componente.
defineExpose({ abrirDialogoCrearGrupo });
</script>
