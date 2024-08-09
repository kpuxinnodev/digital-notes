<template>
    <v-dialog v-model="dialog" max-width="600" >
    
    <v-card prepend-icon="mdi-creation" title="ELIMINAR UNA NOTA">
  <v-card-text>
    
    <!-- Sistema de cuadrículas -->
    <v-checkbox-group v-model="selectedItems">
      <v-checkbox
        v-for="item in items"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      ></v-checkbox>
    </v-checkbox-group>
  
  </v-card-text>
  
  <v-divider></v-divider>
  
  <v-card-actions>
    <v-spacer></v-spacer>
    <v-btn text="Cancelar" variant="plain" @click="cerrarDialogo"></v-btn>
    <v-btn color="primary" text="Eliminar" variant="tonal" @click="eliminarNota"></v-btn>
  </v-card-actions>
  </v-card>
  </v-dialog>
  </template>
  
  <script setup>
  import { ref, defineExpose, onMounted } from 'vue';
  
  const selectedItems = ref([]);
const items = ref([]);

onMounted(async () => {
  items.value = await fetchItems();
});

async function fetchItems() {
  // Simula una llamada a una API para obtener los elementos
  return [
    { id: 1, name: 'Elemento 1' },
    { id: 2, name: 'Elemento 2' },
    { id: 3, name: 'Elemento 3' }
  ];
}
  
  const dialog = ref(false);
  
  const abrirDialogoEliminarNota = () => {
    dialog.value = true;
  };
  
  const cerrarDialogo = () => {
    dialog.value = false;
  };
  
  //  ->  Añadir backend para guardar la nota.
  const eliminarNota = () => {
    console.log('Nota guardada');
    cerrarDialogo();
  };
  
  // Exponer el método para que se pueda abrir desde fuera del componente.
  defineExpose({ abrirDialogoEliminarNota });
  </script>
  