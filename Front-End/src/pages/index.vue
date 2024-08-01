<template>
  <div class="main">
    <!--Main-->
    <NavBar/>

    <div class="content">
      <!--Page Content-->
      <div class="notes-options">
        <!--Opciones de Notas-->
        
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
  height: 15%;
  width: 100%;

  background-color: bisque;
}

/**----div.notes-show----*/
.content > .notes-show {
  height: 85%;
  width: 100%;

  background-color: aquamarine;
}

</style>