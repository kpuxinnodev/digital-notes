<template>
  <div class="main">
    <NavBar />
    <div class="content">
      <FaqComponent />
    </div>
  </div>
</template>

<script setup>
import NavBar from "@/components/NavBar.vue";
import FaqComponent from "@/components/FaqComponent.vue";
</script>

<style scoped>
.main {
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: row;
}

.content {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  max-height: 100vh;

  background-color: skyblue;
}
</style>
