<template>
    <DialogoEliminarGrupo ref="eliminarGrupo" />
    <v-container class="container">
        
        <v-card flat class="carta">
        <v-card-title>Eliminar equipo</v-card-title>
        <v-card-text>¿Quieres eliminar el equipo?</v-card-text>
        <v-btn
    color="red-darken-1"
    class="boton"
    >ELIMINAR GRUPO</v-btn>
    </v-card>
    </v-container>
</template>

<script setup>
import DialogoEliminarGrupo from './DialogoEliminarGrupo.vue';

const eliminarGrupo = ref(null);

//  Método para abrir el diálogo de Crear Nota usando la referencia
const aceptarEliminar = () => {
  if (eliminarGrupo.value) {
    eliminarGrupo.value.aceptarEliminar();
  }
};
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
  }

  .boton{
    margin-left: 40%;
  }
</style>