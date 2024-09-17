<template>
    <v-container class="container">
        <v-form ref="form" v-model="valid" class="mt-6">
          <!-- Fila para Nombre y Usuario -->
          <v-row>
            <v-col cols="12" sm="12">
              <v-text-field
                v-model="grupoProfile.nombre"
                :rules="nombreRules"
                label="Nombre"
                required
              ></v-text-field>
            </v-col>
          </v-row>
  
          <!-- Biografía -->
            <v-textarea
            v-model="grupoProfile.descripcion"
            :rules="descripcionRules"
            label="Descripción"
            rows="4"
          ></v-textarea>

          <v-col class="d-flex justify-center">
            <v-btn color="primary" @click="enviarFormulario"
            >Guardar</v-btn>
          </v-col>
        </v-form>
    </v-container>
  </template>
  
  <script setup>
  import { ref, defineProps } from "vue";
  import axios from "axios";

  const props = defineProps({
  grupoId: {
    type: Number,
    required: true
  }
});

  //  ->  Perfil del grupo cargado desde el Back-End.

  const grupoProfile = ref({
    nombre: "",
    descripcion: "",
  });
  
  //  ->  'valid' por default = false
  const valid = ref(false);
  
  //  ->  Reglas de nombre y descripción del grupo
  const nombreRules = [
    (v) => !!v || "El nombre es requerido",
    (v) => (v && v.length <= 30) || "El nombre debe ser menor de 30 caracteres",
  ];
  
  const descripcionRules = [
    (v) =>
      (v && v.length <= 120) || "La biografía debe ser menor de 120 caracteres",
  ];
  
  const token = localStorage.getItem('auth-item');

//  ->  Encabezado de la Autorización
  const config = {
    headers: {
        'Content-Type':'application/json',
        'Authorization': `Bearer ${token}`
    }
  };

  //  ->  Función para enviar el formulario
  const enviarFormulario = async () => {
  if (!valid.value) return;
  if (!props.grupoId || isNaN(props.grupoId)) {
    console.error('El ID del grupo no está definido o no es válido');
    return;
  }
  try {
    const response = await axios.put(`http://localhost:8000/api/grupos/${props.grupoId}/actualizar`, grupoProfile.value, config);
  
    // Verifica si response está definido antes de acceder a response.data
    if (response && response.data) {
      localStorage.setItem('auth-item', response.data.token);
      console.log("Perfil actualizado:", response.data);
    }
  } catch (error) {
    // Asegúrate de que error.response esté presente antes de acceder a él
    if (error.response) {
      console.error('Error en la respuesta:', error.response.data);
    } else {
      console.error('Error desconocido:', error);
    }
  }
}
  </script>
  
  <style scoped>
  .container {
    width: 100%;
  }

  </style>
  