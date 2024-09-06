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
              v-for="(nota, index) in filtrarNotas(tab)"
              :key="index"
              :class="getColorClass(nota.prioridad)"
            >
              <!-- Notas -->
              <v-icon :icon="getCategoriaIcono(nota.categoria)"></v-icon>
              <v-card-text>{{ nota.texto }}</v-card-text>
              <div class="botones d-flex flex-row align-end justify-end">
                <v-btn
                  flat class="mb-2"
                  id="eliminar"
                  v-if="mostrarBoton"
                  icon="mdi-delete"
                  @click="abrirDialogoEliminarTarea"
                ></v-btn>
                <v-btn
                  flat class="mb-2 mr-2"
                  id="completar"
                  v-if="mostrarBoton"
                  icon="mdi-check-bold"
                  @click="abrirDialogoCompletarTarea"
                ></v-btn>
              </div>
            </v-card>
          </div>
        </v-tabs-window-item>
      </v-tabs-window>
    </div>
  </v-card>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { defineProps } from "vue";
import axios from "axios";
import DialogoCompletarTarea from "../DialogoCompletarTarea.vue";
import DialogoEliminarTarea from "../DialogoEliminarTarea.vue";

//  ->  Aplica a tab el valor predeterminado all (muestra todas las notas).
const tab = ref("all");

//  ->  Categorías de las Notas y Ventanas.
const categoriasYVentanas = ref([
  { value: "all", icono: "mdi-view-dashboard" },
  { value: "uno", icono: "mdi-briefcase" },
  { value: "dos", icono: "mdi-book-open-page-variant" },
  { value: "tres", icono: "mdi-dumbbell" },
  { value: "cuatro", icono: "mdi-food-apple" },
  { value: "cinco", icono: "mdi-glass-cocktail" },
  { value: "seis", icono: "mdi-airplane" },
  { value: "siete", icono: "mdi-archive" },
]);

//  ->  Importar notas desde el Back-End aquí.
let notas = ref([
  { categoria: "cinco", texto: "Quedada el Domingo 18/07", prioridad: "baja" },
  { categoria: "uno", texto: "Presentar currículum en BPS", prioridad: "alta" },
  {
    categoria: "dos",
    texto: "Escrito de Matemáticas 12/09",
    prioridad: "alta",
  },
  { categoria: "cuatro", texto: "Bajar los carbohidratos", prioridad: "media" },
  {
    categoria: "tres",
    texto: "Empezar rutina de hipertrofia",
    prioridad: "media",
  },
  {
    categoria: "dos",
    texto: "Presentación de Formación 24/09",
    prioridad: "alta",
  },
  {
    categoria: "cinco",
    texto: "Cumpleaños de Noelia 17/10",
    prioridad: "media",
  },
  { categoria: "seis", texto: "Montevideo 28/10", prioridad: "media" },
  { categoria: "siete", texto: "Otro", prioridad: "media" },
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
    console.log('Datos de la API:', response.data);  // Agrega esto para depurar
    notasCargadas.value = response.data;
  } catch (error) {
    console.error('Error al cargar las notas: ', error);
  }
  
  try {
    const response = await axios.get('http://localhost:8000/api/notas/ver', {
      headers: {
        'Content-Type':'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    notasCargadas.value = response.data;
  } catch (error) {
    console.error('Error al cargar las notas: ', error);
  }
}

onMounted(() => {
  cargarNotas();
});

//  ->  Filtra las notas, teninendo en cuenta la categoría.
function filtrarNotas(value) {
  let filtradas;
  if (value === "all") {
    filtradas = notasCargadas.value;
  } else {
    filtradas = notasCargadas.value.filter((nota) => nota.categoria === value);
  }

  //  ->  Ordena las notas según la prioridad
  return filtradas.sort[
    (a, b) => prioridadOrden[a.prioridad] - prioridadOrden[b.prioridad]
];
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
  alta: 1,
  media: 2,
  baja: 3,
};

//  ->  Se le asigna una clase de css según la prioridad.
const getColorClass = (prioridad) => {
  switch (prioridad) {
    case "alta":
      return "prioridad-alta";
    case "media":
      return "prioridad-media";
    case "baja":
      return "prioridad-baja";
    default:
      return "";
  }
};

const completarTarea = ref(null);

//  ->  Método para abrir el diálogo de Completar Tarea
const abrirDialogoCompletarTarea = () => {
  if (completarTarea.value) {
    completarTarea.value.abrirDialogoCompletarTarea();
  }
};

const eliminarTarea = ref(null);

//  ->  Método para abrir el diálogo de Eliminar Tarea
const abrirDialogoEliminarTarea = () => {
  if (eliminarTarea.value) {
    eliminarTarea.value.abrirDialogoEliminarTarea();
  }
};
</script>


<style scoped>
.component {
  display: flex;
  flex-direction: column;
  height: 90%;
  width: 90%;
}

.barra-de-categorias {
  position: sticky;
  top: 0;
  z-index: 1;
}

.category-tabs {
  width: 100%;
}

.contenido {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
}

.ventana {
  width: 100%;
}

.grid-notas {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.nota {
  display: flex;
  align-items: center;
  padding: 16px;
  border-radius: 8px;
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
  width: calc(var(--v-btn-height) + 2px) !important;
  height: calc(var(--v-btn-height) + 2px) !important;
}

#eliminar {
  width: calc(var(--v-btn-height) + 2px) !important;
  height: calc(var(--v-btn-height) + 2px) !important;
}

/* Colores asignados a los bordes según la prioridad */
.prioridad-alta {
  border: 3px outset #ff0000;
}
.prioridad-media {
  border: 3px outset #ffff00;
}
.prioridad-baja {
  border: 3px outset #00ff00;
}
</style>
