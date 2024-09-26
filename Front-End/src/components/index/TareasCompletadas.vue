<template>
    <v-card
      class="fixed-card"
    >
      <v-list v-model:opened="open">

        <v-list-group value="Tareas Completadas">
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              prepend-icon="mdi-check-decagram"
              title="Tareas Completadas"
              color="primary"
            ></v-list-item>
          </template>

          <v-list-item 
          v-for="(carta, index) in notasCompletadas"
          :key="index" 
          class="scrolleable">


            <v-card class="cartas">
              <v-icon :icon="getCategoriaIcono(carta.categoria)" class="cartas-icono"></v-icon>
              <v-card-text class="d-flex flex-row justify-space-between cartas-texto">
                {{ carta.descripcion }} 
                <span class="fecha">{{ carta.finalizacion }}</span> 
              </v-card-text>
            </v-card>
          </v-list-item>
          <completar-tarea @notaCompletada="recargarNotasCompletadas" />
        </v-list-group>
      </v-list>
    </v-card>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import DialogoCompletarTarea from '../DialogoCompletarTarea.vue';

  //  ->  'open' por referencia default = null
  const open = ref(null);


  const categoriasYVentanas = ref([
  { value: "all", icono: "mdi-view-dashboard", },
  { value: "Trabajo", icono: "mdi-briefcase" },
  { value: "Estudios", icono: "mdi-book-open-page-variant" },
  { value: "Gimnasio", icono: "mdi-dumbbell" },
  { value: "Dieta", icono: "mdi-food-apple" },
  { value: "Ocio", icono: "mdi-glass-cocktail" },
  { value: "Viajes", icono: "mdi-airplane" },
  { value: "Otro", icono: "mdi-archive" },
]);

  function getCategoriaIcono(categoriaValue) {
  const categoria = categoriasYVentanas.value.find((c) => c.value === categoriaValue);
  return categoria ? categoria.icono : "mdi-alert";
}

  const notasCompletadas = ref([]);

const token = localStorage.getItem('auth-item');

//  ->  Encabezado de la Autorización
const config = {
    headers: {
        'Content-Type':'application/json',
        'Authorization': `Bearer ${token}`
    }
};

  const mostrarTareasCompletadas = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/notas/vercompletadas', config);
      const ordenadasPorFecha = response.data.sort((a, b) => new Date(b.finalizacion) - new Date(a.finalizacion));
      notasCompletadas.value = ordenadasPorFecha.slice(0, 5); 
      console.log("Ultimas 5 tareas completadas: ", notasCompletadas.value);
    }catch (error) {
      console.error("Error al cargar las Tareas Completadas: ", error);
    }
  }

  const recargarNotasCompletadas = () => {
  mostrarTareasCompletadas();
};

// Montar el componente y cargar las notas completadas inicialmente
onMounted(() => {
  mostrarTareasCompletadas();
});

  </script>
  
  <style scoped>

  .fixed-card {
    width: 40%;
    position: fixed;
    top: 4%;
    z-index: 1000;
    background: white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    max-height: 300px;
    overflow-y: auto;
  }

  .cartas {
    display: flex;
    flex-direction: row;
  }

  .cartas-icono {
    align-self: center;
    padding-left: 28px;
  }

  .cartas-texto {
    padding-left: 28px;
    padding-right: 28px;
  }

  .v-list-group__items .v-list-item {
    padding-inline-start: 0 !important;
  }

  #icono-icono-completadas {
    margin-left: 15px !important;
  }

  .fecha {
    position: absolute;
    top: 4px;
    right: 0;
    font-size: 10px;
    color: #2196f3;
  }
  </style>
  