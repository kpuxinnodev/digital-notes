<template>
  <DialogoCompletarTarea ref="completarTareaGrupo" style="position: absolute;" />
  <DialogoEliminarTarea ref="eliminarTareaGrupo" style="position: absolute;" />

  <v-card class="component">
    <!-- Barra de Categorías -->
    <div class="barra-de-categorias">
      <v-tabs v-model="tab" bg-color="primary">
        <v-tab value="all">
          <v-card-text>TODAS</v-card-text>
        </v-tab>
        
        <v-tab value="completadas">
          <v-card-text>COMPLETADAS</v-card-text>
        </v-tab>
      </v-tabs>
    </div>

    <div class="contenido">
      <!-- Contenido Desplazable -->
      <v-tabs-window v-model="tab" class="ventana" >
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
              :class="getColorClass(nota.prioridad)"
            >

              <div class="avatar-container">
              <img :src="nota.avatar" alt="Avatar" class="avatar" />
              </div>
              <div class="nota-contenido">
                <v-card-text>{{ nota.descripcion }}</v-card-text>
              </div>
      
              <div class="botones d-flex flex-row align-end justify-end">
                <v-btn
                  flat class="mb-2"
                  id="eliminar"
                  v-if="mostrarBoton && nota.estado === 'Pendiente'"
                  icon="mdi-delete"
                  @click="abrirDialogoEliminarTareaGrupo(nota.id)"
                ></v-btn>
                <v-btn
                  flat class="mb-2 mr-2"
                  id="completar"
                   v-if="mostrarBoton && nota.estado === 'Pendiente'"
                  icon="mdi-check-bold"
                  @click="abrirDialogoCompletarTareaGrupo(nota.id)"
                ></v-btn>
              </div>
            </v-card>
          </div>
        </v-tabs-window-item>
      </v-tabs-window>
    </div>
  </v-card>
  <DialogoEliminarTareaGrupo 
  ref="eliminarTareaGrupo" 
  :nota-id="selecionarNotasID"
  @nota-eliminada="actualizarNotas" 
  :grupo-id="grupoId"
/>
<DialogoCompletarTareaGrupo
ref="completarTareaGrupo"
:nota-id="selecionarNotasID"
@nota-completada="actualizarNotas"
:grupo-id="grupoId"
/>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";
import { defineProps } from "vue";
import axios from "axios";
import DialogoCompletarTareaGrupo from "./DialogoCompletarTareaGrupo.vue";
import DialogoEliminarTareaGrupo from "./DialogoEliminarTareaGrupo.vue";


//  ->  Aplica a tab el valor predeterminado all (muestra todas las notas).
const tab = ref("all");

const props = defineProps({
  mostrarBoton: {
    type: Boolean,
    default: true,
  },
  grupoId: {
    type: Number,
    required: true,
  },
  idusuario: {
    type: Number,
    required: true,
  },
});

const grupoId = ref(props.grupoId); 

const categoriasYVentanas = ref([
  { value: "all", icono: "mdi-view-dashboard", },
  { value: "completadas", icono: "mdi-check-circle" },
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
    const responsePendiente = await axios.get(`http://localhost:8000/api/notas/shownotagrupo/${props.grupoId}`, config);
    const responseCompletada = await axios.get(`http://localhost:8000/api/notas/shownotagrupocompletadas/${props.grupoId}`, config);
    notasCargadas.value = [...responsePendiente.data, ...responseCompletada.data];
    console.log("Notas cargadas: ", notasCargadas.value);
  } catch (error) {
    console.error('Error al cargar las notas: ', error);
  }
}

onMounted(async () => {
  await cargarNotas();
});


function filtrarNotas(value) {
  let filtradas;

  if (value === "all") {
    // Mostrar solo las notas pendientes en la pestaña "TODAS"
    filtradas = notasCargadas.value.filter(nota => nota.estado === "Pendiente");
  } else if (value === "completadas") {
    // Mostrar solo las notas completadas en la pestaña "COMPLETADAS"
    filtradas = notasCargadas.value.filter(nota => nota.estado === "Completada");
  } else {
    // Filtrar por categoría
    filtradas = notasCargadas.value.filter(nota => nota.categoria === value);
  }

  // Si hay notas, ordenarlas por prioridad
  return filtradas.sort((a, b) => prioridadOrden[a.prioridad] - prioridadOrden[b.prioridad]);
}

//  ->  Obtener el ícono de una categoría.
function getCategoriaIcono(categoriaValue) {
  const categoria = categoriasYVentanas.value.find((c) => c.value === categoriaValue);
  return categoria ? categoria.icono : "";
}

//  ->  Propiedades de "mostrarBotón".


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

const completarTareaGrupo = ref(null);

const eliminarTareaGrupo = ref(null);

//  ->  Método para abrir el diálogo de Eliminar Tarea
const abrirDialogoEliminarTareaGrupo = async (notaId) => {
  console.log("ID de nota seleccionada para eliminar:", notaId);
  selecionarNotasID.value = notaId;  // Asegura que el ID se asigna correctamente
  await nextTick();  // Espera a que el DOM y el estado se actualicen
  if (eliminarTareaGrupo.value) {
    eliminarTareaGrupo.value.abrirDialogoEliminarTareaGrupo();
  }
};

const abrirDialogoCompletarTareaGrupo = async (notaId) => {
  console.log("ID de nota seleccionada para completar:", notaId);
  selecionarNotasID.value = notaId;  // Asegura que el ID se asigna correctamente
  await nextTick();  // Espera a que el DOM y el estado se actualicen
  if (completarTareaGrupo.value) {
    completarTareaGrupo.value.abrirDialogoCompletarTareaGrupo();
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

.botones {
  height: 100%;
  position: absolute;
  right: 0;
  z-index: 100;
}

.prioridad {
  position: absolute;
  top: 0;
}

/* Estilo para los botones de completar y eliminar nota. */
#completar {
  width: calc(var(--v-btn-height) + 2px) !important;
  height: calc(var(--v-btn-height) + 2px) !important;
}

#eliminar {
  width: calc(var(--v-btn-height) + 2px) !important;
  height: calc(var(--v-btn-height) + 2px) !important;
}

/* Colores asignados a los bordes según la prioridad */
.prioridad-Alta {
  border: 3px outset #ff0000;
}
.prioridad-Media {
  border: 3px outset #ffff00;
}
.prioridad-Baja {
  border: 3px outset #00ff00;
}


.avatar-container {
  display: flex;
  align-items: center;
  margin-top: 10px; /* Ajusta según sea necesario */
}

.avatar {
  width: 40px; /* Tamaño del avatar */
  height: 40px; /* Tamaño del avatar */
  border-radius: 50%; /* Para que sea circular */
}
</style>