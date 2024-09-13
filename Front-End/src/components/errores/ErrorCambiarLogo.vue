<template>
  <v-sheet
    class="pa-4 text-center mx-auto"
    elevation="12"
    max-width="600"
    rounded="lg"
    width="100%"
  >
    <v-icon
      class="mb-5"
      color="red"
      icon="mdi-close-circle"
      size="112"
    ></v-icon>

    <h2 class="text-h5 mb-6">¡Ha ocurrido un error!</h2>

    <p class="mb-4 text-medium-emphasis text-body-2">
      No se ha podido <span class="raya">cambiar el logo</span>.

      <br>

      Intentelo nuevamente.
    </p>

    <v-divider class="mb-4"></v-divider>

    <div class="text-end">
      <v-btn
        class="text-none"
        color="red"
        variant="flat"
        width="90"
        rounded
      >
        Ok
      </v-btn>
    </div>
  </v-sheet>
</template>

<script setup>

</script>

<style scoped>
.raya{
  text-decoration: underline;
  font-weight: bold;
}
</style>
