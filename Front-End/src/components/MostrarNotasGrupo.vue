<template>
  <v-card class="component">
    <!-- Barra de Categorías -->
    <div class="barra-de-categorias">
      <v-tabs v-model="tab" bg-color="primary">
        <v-tab value="all">
          <v-card-text>TODAS</v-card-text>
        </v-tab>

        <v-tab
          v-for="(categoria, index) in categorias"
          :key="index"
          :value="categoria.value"
        >
        <v-icon :icon="categoria.icono"></v-icon>
        </v-tab>
      </v-tabs>
    </div>

    <div class="contenido">
      <!-- Contenido Desplazable -->
      <v-tabs-window v-model="tab" class="ventana" >
        <v-tabs-window-item
          v-for="(ventana, index) in ventanas"
          :key="index"
          :value="ventana.value"
        >
          <!-- Notas en Grid -->
          <div class="grid-notas">
            <v-card
              class="nota"
              v-for="(nota, index) in filtrarNotas(tab)"
              :key="index"
              :class="getColorClass(nota.prioridad)"
            >
              <v-icon :icon="getCategoriaIcono(nota.categoria)"></v-icon>
              <v-card-text>{{ nota.texto }}</v-card-text>
              <div class="botones d-flex flex-row align-end justify-end">
                <v-btn
                  flat
                  id="eliminar"
                  v-if="mostrarBoton"
                  icon="mdi-delete"
                ></v-btn>
                <v-btn
                  flat
                  id="completar"
                  v-if="mostrarBoton"
                  icon="mdi-check-bold"
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
import { ref } from "vue";
import { defineProps } from "vue";

//  ->  Aplica a tab el valor predeterminado all (muestra todas las notas).
const tab = ref("all");

//  ->  Categorias (Miembros) importar desde el Back-End
const categorias = ref([
  { value: "uno", icono: "mdi-briefcase" },
  { value: "dos", icono: "mdi-book-open-page-variant" },
  { value: "tres", icono: "mdi-dumbbell" },
  { value: "cuatro", icono: "mdi-food-apple" },
  { value: "cinco", icono: "mdi-glass-cocktail" },
  { value: "seis", icono: "mdi-airplane" },
  { value: "siete", icono: "mdi-archive" },
]);

//  ->  Ventanas correspondientes a cada miembro (Enlazar nº miembros con nº ventanas).
const ventanas = ref([
  { value: "all", contenido: "categorias-todas" },
  { value: "uno", contenido: "categoria-1" },
  { value: "dos", contenido: "categoria-2" },
  { value: "tres", contenido: "categoria-3" },
  { value: "cuatro", contenido: "categoria-4" },
  { value: "cinco", contenido: "categoria-5" },
  { value: "seis", contenido: "categoria-6" },
  { value: "siete", contenido: "categoria-7" },
]);

//  ->  Importar notas desde el Back-End aquí.
let notas = ref([
  { categoria: "cinco", texto: "Quedada el Sabado 18/07", prioridad: "baja" },
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

//  ->  Obtener el color de la prioridad mediante un switch y asignarlo a una clase de css.
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

//  ->  Filtra notas según el filtro seleccionado.
function filtrarNotas(value) {
  let filtradas;
  if (value === "all") {
    filtradas = notas.value;
  } else {
    filtradas = notas.value.filter((nota) => nota.categoria === value);
  }

  //    ->  Ordena las notas según la prioridad
  return filtradas.sort(
    (a, b) => prioridadOrden[a.prioridad] - prioridadOrden[b.prioridad]
  );
}

//  ->  Obtener el ícono de una categoría.
function getCategoriaIcono(categoriaValue) {
  const categoria = categorias.value.find((c) => c.value === categoriaValue);
  return categoria ? categoria.icono : "";
}

//  ->  Propiedades de Mostar Botón.
const propiedadesBoton = defineProps({
  mostrarBoton: {
    type: Boolean,
    default: true,
  },
});

//    ->  Establece el orden según la prioridad.
const prioridadOrden = {
  alta: 1,
  media: 2,
  baja: 3,
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
