<template>
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