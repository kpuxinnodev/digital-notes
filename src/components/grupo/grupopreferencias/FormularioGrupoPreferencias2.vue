<template>
    <v-container class="container cartas">
        <v-form ref="form" v-model="valid" v-if="esAdmin" class="mt-6 carta-1">

          <v-card-title class="mb-6">Modificar datos del equipo</v-card-title>
          <!-- Fila para Nombre y Usuario -->
              <v-text-field
                v-model="grupoProfile.nombre"
                :rules="nombreRules"
                label="Nombre"
                required
                class="inputs"
              ></v-text-field>
  
          <!-- Biografía -->
            <v-textarea
            v-model="grupoProfile.descripcion"
            :rules="descripcionRules"
            label="Descripción"
            rows="4"
            class="inputs"
          ></v-textarea>

          <v-col class="d-flex justify-center">
            <v-btn color="primary" @click="enviarFormulario"
            >Guardar</v-btn>
          </v-col>
        </v-form>
    </v-container>
  </template>
  
  <script setup>
  import { ref, defineProps, onMounted } from "vue";
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

  const esAdmin = ref(false);
  
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

  const cargarDatosGrupo = async () => {
  try {
    const response = await axios.get(`http://localhost:8000/api/grupos/${props.grupoId}/admin`, config);
    
    if (response && response.data) {
      grupoProfile.value = response.data;
      esAdmin.value = response.data.esAdmin; // El backend debe devolver este campo
    }
  } catch (error) {
    console.error("Error al cargar los datos del grupo:", error.response ? error.response.data : error);
  }
};

// Llamar a la función de carga de datos al montar el componente
onMounted(() => {
  cargarDatosGrupo();
});



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

  .inputs{
    width: 100%;
  }

  .cartas {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .carta-1 {
  width: 70%;
  background-color: #3f7f9c;
}
  </style>
  