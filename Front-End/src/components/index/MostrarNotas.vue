<template>
  <DialogoCompletarTarea ref="completarTarea" style="position: absolute;" />
  <DialogoEliminarTarea ref="eliminarTarea" style="position: absolute;" />

  <v-card class="component">
    <!-- Barra de Categorías -->
    <div class="barra-de-categorias">
      <v-tabs v-model="tab" bg-color="primary">

        <v-tab
          v-for="(categoria, index) in categoriasYVentanas"
          :key="index"
          :value="categoria.value"
        >
          <v-icon :icon="categoria.icono"></v-icon>
        </v-tab>
      </v-tabs>
    </div>

    <div class="contenido">
      <!-- Contenido Desplazable -->
      <v-tabs-window v-model="tab" class="ventana">
        <v-tabs-window-item
          v-for="(categoria, index) in categoriasYVentanas"
          :key="index"
          :value="categoria.value"
        >
          <!-- Notas en Grid -->
          <div class="grid-notas">
            <v-card
              class="nota"
              v-for="nota in filtrarNotas(tab)"
              :key="nota.id"
            >
              <!-- Notas -->
              <v-icon class="icono" :icon="getCategoriaIcono(nota.categoria)"></v-icon>
              <div class="prioridad" :class="getColorClass(nota.prioridad)"></div>
              <v-card-text class="notas-descripcion">{{ nota.descripcion }}</v-card-text>
              <div class="botones d-flex flex-row align-end justify-end">
                <v-btn
                  flat class="mb-2 mr-2"
                  id="eliminar"
                  v-if="mostrarBoton"
                  icon="mdi-delete"
                  @click="abrirDialogoEliminarTarea(nota.id)"
                ></v-btn>
                <v-btn
                  flat class="mb-2 mr-2"
                  id="completar"
                  v-if="mostrarBoton"
                  icon="mdi-check-bold"
                  @click="abrirDialogoCompletarTarea(nota.id)"
                ></v-btn>
              </div>
            </v-card>
          </div>
        </v-tabs-window-item>
      </v-tabs-window>
    </div>
  </v-card>
  <DialogoEliminarTarea 
  ref="eliminarTarea" 
  :nota-id="selecionarNotasID"
  @nota-eliminada="actualizarNotas" 
/>
<DialogoCompletarTarea
ref="completarTarea"
:nota-id="selecionarNotasID"
@nota-completada="actualizarNotas"
/>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";
import { defineProps } from "vue";
import axios from "axios";
import DialogoCompletarTarea from "../DialogoCompletarTarea.vue";
import DialogoEliminarTarea from "../DialogoEliminarTarea.vue";

//  ->  Aplica a tab el valor predeterminado all (muestra todas las notas).
const tab = ref("all");

//  ->  Categorías de las Notas y Ventanas.
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

//  ->  Cargar Notas desde el Back-End
const notasCargadas = ref([]);

const token = localStorage.getItem('auth-item');

//  ->  Encabezado de la Autorización
const config = {
    headers: {
        'Content-Type':'application/json',
        'Authorization': `Bearer ${token}`
    }
};

const cargarNotas = async () => {  
  try {
    const response = await axios.get('http://localhost:8000/api/notas/ver', config);
    notasCargadas.value = response.data;
    console.log("Notas cargadas: ", notasCargadas.value);
  } catch (error) {
    console.error('Error al cargar las notas: ', error);
  }
}

onMounted(async () => {
  await cargarNotas();
});



//  ->  Filtra las notas, teninendo en cuenta la categoría.

function filtrarNotas(value) {
  let filtradas = value === "all" 
    ? notasCargadas.value 
    : notasCargadas.value.filter(nota => nota.categoria === value);

  // Si hay notas, ordenarlas por prioridad
  return filtradas.sort((a, b) => prioridadOrden[a.prioridad] - prioridadOrden[b.prioridad]);
}

//  ->  Obtener el ícono de una categoría.
function getCategoriaIcono(categoriaValue) {
  const categoria = categoriasYVentanas.value.find((c) => c.value === categoriaValue);
  return categoria ? categoria.icono : "";
}

//  ->  Propiedades de "mostrarBotón".
const propiedadesBoton = defineProps({
  mostrarBoton: {
    type: Boolean,
    default: true,
  },
});

//  ->  Se definen el orden según la prioridad.
const prioridadOrden = {
  Alta: 1,
  Media: 2,
  Baja: 3,
};

//  ->  Se le asigna una clase de css según la prioridad.
const getColorClass = (prioridad) => {
  switch (prioridad) {
    case "Alta":
      return "prioridad-Alta";
    case "Media":
      return "prioridad-Media";
    case "Baja":
      return "prioridad-Baja";
    default:
      return "";
  }
};



//  ->  Método para abrir el diálogo de Completar Tarea

const selecionarNotasID = ref(null);

const completarTarea = ref(null);

const eliminarTarea = ref(null);

//  ->  Método para abrir el diálogo de Eliminar Tarea
const abrirDialogoEliminarTarea = async (notaId) => {
  console.log("ID de nota seleccionada para eliminar:", notaId);
  selecionarNotasID.value = notaId;  // Asegura que el ID se asigna correctamente
  await nextTick();  // Espera a que el DOM y el estado se actualicen
  if (eliminarTarea.value) {
    eliminarTarea.value.abrirDialogoEliminarTarea();
  }
};

const abrirDialogoCompletarTarea = async (notaId) => {
  console.log("ID de nota seleccionada para completar:", notaId);
  selecionarNotasID.value = notaId;  // Asegura que el ID se asigna correctamente
  await nextTick();  // Espera a que el DOM y el estado se actualicen
  if (completarTarea.value) {
    completarTarea.value.abrirDialogoCompletarTarea();
  }
};

const actualizarNotas = async () => {
  selecionarNotasID.value = null;
  await cargarNotas();
};

</script>


<style scoped>
.component {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}

.barra-de-categorias {
  position: sticky;
  display: flex;
  background-color:#2196f3;
  top: 0;
  z-index: 1;
  align-items: center;
  justify-content: center;
}

.category-tabs {
  width: 100%;
}

.contenido {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  background-color: #3f7f9c;
}

.ventana {
  width: 100%;
}

.grid-notas {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.nota {
  display: flex;
  align-items: center;
  padding: 16px;
  border-radius: 8px;
  border: 2px solid white;
  background-color: #6894ac;
}

.nota-icono {
  margin-right: 8px;
}

.botones {
  height: 100%;
  position: absolute;
  right: 0;
  z-index: 100;
}

/* Botones de completar y eliminar notas */
#completar {
  width: calc(var(--v-btn-height) + 1px) !important;
  height: calc(var(--v-btn-height) + 1px) !important;
  color: #6894ac;
  background-color: white;
}

#eliminar {
  width: calc(var(--v-btn-height) + 1px) !important;
  height: calc(var(--v-btn-height) + 1px) !important;
  color: #6894ac;
  background-color: white;
}

/* Colores asignados a los bordes según la prioridad */
.prioridad-Alta {
  border-left: 2px solid white;
  border-right: 2px solid white;
  background-color: #EF5350;
}
.prioridad-Media {
  border-left: 2px solid white;
  border-right: 2px solid white;
  background-color: #FFEE58;
}
.prioridad-Baja {
  border-left: 2px solid white;
  border-right: 2px solid white;
  background-color: #66BB6A;
}

.prioridad {
  height: 100%;
  width: 30px;
  position: absolute;
  z-index: 39;
}
.icono {
  z-index: 40;
  margin-left: 3px;
}
</style>
