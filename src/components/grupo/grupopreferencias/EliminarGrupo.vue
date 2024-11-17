<template>
  <ErrorEliminarGrupo ref="errorEliminarGrupo" style="position: absolute; z-index: 1000; top: 40%;" />
  <EliminarGrupoexitoso ref="grupoEliminado" style="position: absolute; z-index: 1000; top: 40%;" />
    <v-container class="container">
      <v-form ref="form" v-model="valid" v-if="esAdmin" class="mt-6 carta-1">
        
        <v-card flat class="carta">
        <v-card-title>Eliminar equipo</v-card-title>
        <v-card-text>¿Quieres eliminar el equipo?</v-card-text>
        <v-btn color="red-darken-1" class="boton" @click="eliminarGrupo">ELIMINAR GRUPO</v-btn>
    </v-card>
  </v-form>
    </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { defineProps } from 'vue';
import ErrorEliminarGrupo from '@/components/errores/ErrorEliminarGrupo.vue';
import EliminarGrupoexitoso from '@/components/exito/EliminarGrupoexitoso.vue';


  const props = defineProps({
    grupoId: {
      type: Number,
      required: true
    },
  });

  const esAdmin = ref(false);
  
  const dialog = ref(false);
  
  const token = localStorage.getItem('auth-item');
  
  //  ->  Encabezado de la Autorización
  const config = {
      headers: {
          'Content-Type':'application/json',
          'Authorization': `Bearer ${token}`
      }
  };
  
  
  const abrirDialogoEliminarGrupo = () => {
    dialog.value = true;
  };
  
  const cerrarDialogo = () => {
    dialog.value = false;
  };

  const cargarAdmin = async () => {
  try {
    const response = await axios.get(`http://localhost:8000/api/grupos/${props.grupoId}/cargarAdmin`, config);
    
    if (response && response.data) {
      esAdmin.value = response.data.esAdmin; // El backend debe devolver este campo
    }
  } catch (error) {
    console.error("Error al cargar admin:",error);
  }
};
  
// Llamar a la función de carga de datos al montar el componente
onMounted(() => {
  cargarAdmin();
});

  const eliminarGrupo = async () => {
    if (!props.grupoId || isNaN(props.grupoId)) {
      console.error('No se ha proporcionado un ID de grupo válido');
      return;
    }
  
    try {
      await axios.delete(`http://localhost:8000/api/grupos/${props.grupoId}`, config);
      console.log("Se ha eliminado correctamente el grupo.");
      cerrarDialogo();
      abrirMostrarExito();
    } catch (error) {
      console.error("Error al eliminar grupo: ", error);
      cerrarDialogo();
      abrirMostrarError();
    }
  };
  
  const errorEliminarGrupo = ref(null);

  const abrirMostrarError = () => {
    if (errorEliminarGrupo.value) {
      errorEliminarGrupo.value.abrirMostrarError();
    };
  }

  const grupoEliminado = ref(null);

  const abrirMostrarExito = () => {
    if (grupoEliminado.value) {
      grupoEliminado.value.abrirMostrarExito();
    };
  }

  defineExpose({ abrirDialogoEliminarGrupo });

</script>

<style scoped>
.container {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #3f7f9c;
  }

  .carta {
    width: 80%;
    justify-self: center;
    align-self: center;
    background-color: #3f7f9c;
    text-align: center;
    left: 10%;
  }

  
  
</style>