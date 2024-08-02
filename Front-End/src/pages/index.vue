<template>
  <div class="main">
    <!--Main-->
    <NavBar/>

    <div class="content">
      <!--Page Content-->
      <div class="notes-options">
        <!--Opciones de Notas-->
        <div class="botones">
          <!--Botones-->
          <div class="botones-g1">
          <v-btn
            prepend-icon="mdi-plus"
            color="green">
            crear nota
          </v-btn>
          <v-btn
            prepend-icon="mdi-plus-box"
            color="amber">
            crear grupo
          </v-btn>
        </div>
        <div class="botones-g2">
          <v-btn
            icon="mdi-delete"
            color="red">
          </v-btn>
        </div>
        </div>

        <div class="completadas">
          <h3>Tareas completadas</h3>

          <v-card class="nota-completada"
          prepend-icon="mdi-account"
          >
          <v-card-text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
          </v-card-text>
        </v-card>
        </div>
      </div>

      <div class="notes-show">
        <!--Mostrar las Notas-->

      </div>
    </div>
    
  </div>
</template>
<script setup>
import NavBar from '@/components/NavBar.vue';

</script>
<style scoped>

*{
  font-family: "Poppins", sans-serif;
}

/**----div.main----*/
.main {
  height: 100%;
  width: 100%;
  
  display: flex;
  flex-direction: row;
}

/**----div.nav-bar----*/
.nav-bar {
  height: 100%;
  width: 60px;

  background-color: goldenrod;
}

/**----div.content----*/
.content {
  height: 100%;
  width: 100%;

  background-color: skyblue;
}

/**----div.notes-options----*/
.content > .notes-options {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;

  height: 18%;
  width: 100%;

  background-color: bisque;
}

.botones {
  display: flex;
  flex-direction: row;
  width: 40%;
  padding-left: 5%;
}

.botones-g1 {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: auto;
  margin-left: 20%;
  justify-content: space-evenly;
  align-items: center;
}

.botones-g2 {
  display: flex;
  align-items: center;
  margin-left: 5%;
}

.completadas {
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.completadas > h3{
  color: black;
}

.nota-completada {
  display: flex;
  flex-direction: row;
  margin-right: 20%;
}

::v-deep .v-card-item__prepend {
  grid-area: prepend;
  padding-inline-end:0 !important;
}

.v-card-text {
  padding: 10px 10px 10px 10px;
  margin: 0;
}

/**----div.notes-show----*/
.content > .notes-show {
  height: 82%;
  width: 100%;

  background-color: aquamarine;
}

</style>