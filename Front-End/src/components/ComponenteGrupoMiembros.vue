<template>
  <v-container class="container">
    <v-card flat>
      <v-card-title>Integrantes del equipo:</v-card-title>
      <v-card-text>

        <div class="grid-miembros">
        <!-- Container de los miembros -->
          <v-card
            flat
            class="miembro"
            v-for="(miembro, index) in miembros"
            :key="index"
          >
            <img :src="miembro.avatar" alt="avatar.png" />
            <v-card-text>{{ "@" + miembro.username }}</v-card-text>
          </v-card>
        </div>
        <div class="botones mt-8">
          <v-btn prepend-icon="mdi-plus" color="green"> Agregar miembro </v-btn>
          <v-btn prepend-icon="mdi-minus" color="red"> Eliminar miembro </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from "vue";

//  ->  Cargar miembros desde el Back-End
let miembros = ref([
  { avatar: "/img/nav/user.png", username: "miembro1" },
  { avatar: "/img/nav/user.png", username: "miembro2" },
  { avatar: "/img/nav/user.png", username: "miembro3" },
  { avatar: "/img/nav/user.png", username: "miembro4" },
  { avatar: "/img/nav/user.png", username: "miembro5" },
  { avatar: "/img/nav/user.png", username: "miembro6" },
  { avatar: "/img/nav/user.png", username: "miembro7" },
  { avatar: "/img/nav/user.png", username: "miembro8" },
  { avatar: "/img/nav/user.png", username: "miembro9" },
  { avatar: "/img/nav/user.png", username: "miembro10" },
  { avatar: "/img/nav/user.png", username: "miembro11" },
  { avatar: "/img/nav/user.png", username: "miembro12" },
]);
</script>

<style scoped>
.v-card {
  padding: 20px;
  overflow: visible;
}

.container {
  width: 100%;
  height: auto;
  overflow-y: visible;
}

.grid-miembros {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  width: 90%;
  margin: auto;
  height: 42vh;
  overflow-y: auto;
  border: 1px solid white;
}

.miembro {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.botones {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}
</style>
