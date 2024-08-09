<template>
    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Filtrar y Seleccionar</span>
        </v-card-title>
        <v-card-subtitle>
          <v-select
            v-model="selectedCategory"
            :items="categories"
            item-text="name"
            item-value="id"
            label="Selecciona una categoría"
          ></v-select>
        </v-card-subtitle>
        <v-card-text>
          <v-checkbox-group v-model="selectedItems">
            <v-checkbox
              v-for="item in filteredItems"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></v-checkbox>
          </v-checkbox-group>
        </v-card-text>
        <v-card-actions>
          <v-btn text @click="closeDialog">Cerrar</v-btn>
          <v-btn color="primary" @click="applyFilters">Aplicar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script setup>
  import { ref, computed, defineExpose } from 'vue';
  
  // Estado del diálogo y datos
  const dialog = ref(false);
  const categories = ref([]);
  const items = ref([]);
  const selectedCategory = ref(null);
  const selectedItems = ref([]);
  
  // Computed property para filtrar los elementos según la categoría seleccionada
  const filteredItems = computed(() => {
    if (selectedCategory.value) {
      return items.value.filter(item => item.categoryId === selectedCategory.value);
    }
    return items.value;
  });
  
  // Métodos para controlar el diálogo
  const eliminarNota = () => {
    dialog.value = true;
  };
  
  const closeDialog = () => {
    dialog.value = false;
  };
  
  const applyFilters = () => {
    // Aquí puedes manejar los filtros aplicados
    console.log('Categoría seleccionada:', selectedCategory.value);
    console.log('Elementos seleccionados:', selectedItems.value);
    closeDialog();
  };
  
  // Exponer el método openDialog para que pueda ser usado desde fuera
  defineExpose({ eliminarNota });
  
  // Simulación de carga de datos (deberías reemplazar esto con tu API o fuente de datos)
  function fetchCategories() {
    return [
      { id: 1, name: 'Categoría 1' },
      { id: 2, name: 'Categoría 2' },
      { id: 3, name: 'Categoría 3' }
    ];
  }
  
  function fetchItems() {
    return [
      { id: 1, name: 'Elemento 1', categoryId: 1 },
      { id: 2, name: 'Elemento 2', categoryId: 1 },
      { id: 3, name: 'Elemento 3', categoryId: 2 },
      { id: 4, name: 'Elemento 4', categoryId: 3 }
    ];
  }
  
  // Cargar datos simulados
  categories.value = fetchCategories();
  items.value = fetchItems();
  </script>
  
  <style scoped>
  /* Estilos personalizados si es necesario */
  </style>
  