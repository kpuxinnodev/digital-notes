<template>
  <ErrorAsignarAdmin ref="errorAsignarAdmin" style="position: absolute; z-index: 1000; top: 40%;" />
  <AsignarAdminexitosamente ref="adminAsignadoExitosamente" style="position: absolute; z-index: 1000; top: 40%;" />
    <v-dialog v-model="dialog" max-width="600">
      <v-card 
      class="windowcolor"
      prepend-icon="mdi-account-tie"
      title="ASIGNAR ADMINISTRADOR">
        <v-card-text>
          <v-select
            v-if="miembros && miembros.length > 0"
            v-model="miembroSeleccionado"
            :items="nuevo_miembros"
            label="Selecciona un miembro"
            required
          ></v-select>
        </v-card-text>
  
        <v-divider></v-divider>
  
        <v-card-actions>
          <v-btn text="Cancelar" @click="cerrarDialogo">Cancelar</v-btn>
          <v-btn color="primary" flat @click="asignarAdmin">Asignar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script setup>
  import { ref, defineExpose, onMounted } from "vue";
  import axios from "axios";
  import { defineProps } from "vue";
  import ErrorAsignarAdmin from "@/components/errores/ErrorAsignarAdmin.vue";
  import AsignarAdminexitosamente from "@/components/exito/AsignarAdminexitosamente.vue";
  
  const props = defineProps({
    grupoId: {
      type: Number,
      required: true
    },
  });
  
  const dialog = ref(false);
  
  const miembroSeleccionado = ref(null); // Guardar el ID del miembro seleccionado
  const miembros = ref([]); // Lista de miembros cargados
  const nuevo_miembros = ref([]);
  const token = localStorage.getItem('auth-item');
  
  //  ->  Encabezado de la Autorización
  const config = {
      headers: {
          'Content-Type':'application/json',
          'Authorization': `Bearer ${token}`
      }
  };
  
  // Cargar los miembros del grupo al montar el componente
  const cargarMiembros = async () => {
    if (!props.grupoId || isNaN(props.grupoId)) {
      console.error('No se ha proporcionado un ID de grupo válido');
      return;
    }
    await axios.get(`http://localhost:8000/api/grupos/${props.grupoId}/showmiembrosnotas`, config)
    .then(response => {
      miembros.value = response.data; // Acceder a 'response.data' que es donde están los datos reales
      nuevo_miembros.value = miembros.value.map(respuesta => respuesta.nickname); // Solo el nickname
      console.log("Los datos son: ", miembros.value);
      console.log("Número de miembros: " + miembros.value.length); // Muestra la longitud del array
    })
    .catch(error => console.error("Error al cargar los miembros: ", error));
  };
  
  const abrirDialogoAsignarAdmin = () => {
    dialog.value = true;
    cargarMiembros(); // Cargar los miembros al abrir el diálogo
  };
  
  const cerrarDialogo = () => {
    dialog.value = false;
  };
  
  const asignarAdmin = async () => {
    if (!miembroSeleccionado.value) {
      console.warn("Selecciona un miembro para ser administrador.");
      return;
    }
    if (!props.grupoId || isNaN(props.grupoId)) {
      console.error('No se ha proporcionado un ID de grupo válido');
      return;
    }
  
    const miembroASerAdmin = miembros.value.find(m => m.nickname === miembroSeleccionado.value);
    
    // Asegúrate de que estás obteniendo el ID correcto
    console.log("ID del miembro que va a ser administrador:", miembroASerAdmin.idusuario);
  
    try {
      await axios.put(`http://localhost:8000/api/grupos/${props.grupoId}/miembros/${miembroASerAdmin.idusuario}/asignarAdmin`,null, config);
      console.log("El miembro a sido asignado como Administrador, y has abandonado el grupo.");
      
      // Filtrar el miembro eliminado de la lista local para actualizar la vista
      miembros.value = miembros.value.filter(m => m.idusuario !== miembroASerAdmin.idusuario);
      nuevo_miembros.value = nuevo_miembros.value.filter(m => m !== miembroSeleccionado.value); // Actualizar la lista del select
      cerrarDialogo();
      abrirMostrarExito();
    } catch (error) {
      console.error("Error al asignar nuevo administrador: ", error);
      cerrarDialogo();
      abrirMostrarError();
    }
  };

  const errorAsignarAdmin = ref(null);

  
const abrirMostrarError = () => {
  if (errorAsignarAdmin.value) {
    errorAsignarAdmin.value.abrirMostrarError();
  };
}

const adminAsignadoExitosamente = ref(null);


const abrirMostrarExito = () => {
  if (adminAsignadoExitosamente.value) {
    adminAsignadoExitosamente.value.abrirMostrarExito();
  };
}
  
  defineExpose({ abrirDialogoAsignarAdmin });
  </script>

  <style scoped>
  .windowcolor {
  background-color: #263238;
}
</style>