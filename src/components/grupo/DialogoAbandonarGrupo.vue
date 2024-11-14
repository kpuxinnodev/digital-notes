<template>
  <ErrorAbandonarGrupo ref="errorAbandonarGrupo" style="position: absolute; z-index: 1000; top: 40%;" />
    <div class="text-center pa-4">
      <v-dialog v-model="dialog" width="auto">
        <v-card
          max-width="600"
          prepend-icon="mdi-exit-run"
          text="¿Estas seguro que deseas abandonar el grupo?"
          title="ABANDONAR GRUPO"
          class="colorfondo"
        >
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              text="Cancelar" 
              variant="plain" 
              @click="cerrarDialogo"
            ></v-btn>
            <v-btn
              color="#2196f3"
              rounded="xl"
              text="Abandonar"
              variant="flat"
              @click="abandonarGrupo"
            ></v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </template>
  
  <script setup>
  import { ref, defineExpose } from "vue";
  import axios from "axios";
  import { defineProps } from "vue";
  import { useRouter } from "vue-router";
  import ErrorAbandonarGrupo from "../errores/ErrorAbandonarGrupo.vue";
  
  
  const router = useRouter();

  const props = defineProps({
  grupoId: {
    type: Number,
    required: true
    },
  });
  
  //  ->  'dialog' por referencia default = false
  const dialog = ref(false);
  
  //  ->  Funciones para abrir y cerrar el dialogo
  const abrirDialogoAbandonarGrupo = () => {
    dialog.value = true;
  };
  const cerrarDialogo = () => {
    dialog.value = false;
  };

  function salirGrupo() {
  router.push('/grupos')
}

  const token = localStorage.getItem('auth-item');

//  ->  Encabezado de la Autorización
const config = {
    headers: {
        'Content-Type':'application/json',
        'Authorization': `Bearer ${token}`
    }
};

function salirGrupo() {
  router.push('/grupos')
}
  
  //  ->  Añadir backend para abandonar el grupo.
  const abandonarGrupo = async () => {
  try {
    // Envía la solicitud DELETE al backend para abandonar el grupo
    const response = await axios.delete(`http://localhost:8000/api/grupos/${props.grupoId}/abandonar`, config);
    console.log("Has abandonado el grupo:", response.data);
    cerrarDialogo();
    salirGrupo();
  } catch (error) {
    console.error("Error al intentar abandonar el grupo:", error);
    cerrarDialogo();
    abrirMostrarError();
  }
};
  
  const errorAbandonarGrupo = ref(null);

  const abrirMostrarError = () => {
    if (errorAbandonarGrupo.value) {
      errorAbandonarGrupo.value.abrirMostrarError();
    };
  }
  //  ->  Exponer el método para que se pueda abrir desde fuera del componente.
  defineExpose({ abrirDialogoAbandonarGrupo });
  </script>
  
  <style scoped>
  .colorfondo {
  background-color: #263238;
}
  </style>
  