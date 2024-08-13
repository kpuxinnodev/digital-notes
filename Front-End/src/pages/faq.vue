<template>
  <div class="main">
    <Navegacion />
    <div class="content">
      <ComponenteFaq />
    </div>
  </div>
</template>

<script setup>
import Navegacion from "@/components/Navegacion.vue";
import ComponenteFaq from "@/components/ComponenteFaq.vue";
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

  background-color: #959595;
  background-image:  linear-gradient(135deg, #080067 25%, transparent 25%), linear-gradient(225deg, #080067 25%, transparent 25%), linear-gradient(45deg, #080067 25%, transparent 25%), linear-gradient(315deg, #080067 25%, #959595 25%);
  background-position:  21px 0, 21px 0, 0 0, 0 0;
  background-size: 42px 42px;
  background-repeat: repeat;
}
</style>
