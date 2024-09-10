<template>
  <DialogoCompletarTarea ref="completarTarea" style="position: absolute" />
  <DialogoEliminarTarea ref="eliminarTarea" style="position: absolute" />

  <v-card class="component">
    <!-- Barra de Categorías -->
    <div class="barra-de-categorias">
      <v-tabs v-model="tab" bg-color="primary">
        <v-tab value="all">
          <v-card-text>MIS GRUPOS</v-card-text>
        </v-tab>
      </v-tabs>
    </div>

    <div class="contenido">
      <!-- Contenido Desplazable -->
      <v-tabs-window v-model="tab" class="ventana">
        <!-- Notas en Grid -->
        <div class="grid-notas">
          <v-card v-for="(grupo, index) in grupos" :key="index" 
           max-width="400">
              <v-card color="#952175">
                <div class="d-flex flex-no-wrap justify-space-evenly">
                  <div>
                    <v-card-title class="text-h5"> {{ grupo.nombre }} </v-card-title>
                      <v-btn
                        class="boton mt-2"
                        color="white"
                        icon="mdi-arrow-right"
                        @click="grupo.ruta"
                      ></v-btn>
                  </div>

                  <v-avatar class="ma-3" rounded="0" size="125">
                    <v-img
                      :src="grupo.avatar"
                    ></v-img>
                  </v-avatar>
                </div>
              </v-card>
          </v-card>
        </div>
      </v-tabs-window>
    </div>
  </v-card>
</template>

<script setup>
import { ref } from "vue";
import { defineProps } from "vue";
import { useRouter } from "vue-router";
import DialogoCompletarTarea from "../DialogoCompletarTarea.vue";
import DialogoEliminarTarea from "../DialogoEliminarTarea.vue";

//  ->  Aplica a tab el valor predeterminado all (muestra todas las notas).
const tab = ref("all");

const router = useRouter();

//  ->  Propiedades de Mostar Botón.
const propiedadesBoton = defineProps({
  mostrarBoton: {
    type: Boolean,
    default: true,
  },
});

const eliminarTarea = ref(null);

//  Método para abrir el diálogo de Crear Nota usando la referencia
const abrirDialogoEliminarTarea = () => {
  if (eliminarTarea.value) {
    eliminarTarea.value.abrirDialogoEliminarTarea();
  }
};

const grupos = ref([
  {nombre: "Grupo 1", avatar: "https://cdn.vuetifyjs.com/images/cards/halcyon.png", ruta: () => { router.push("/login") }},
  {nombre: "Grupo 2", avatar: "https://cdn.vuetifyjs.com/images/cards/halcyon.png", ruta: ""},
  {nombre: "Grupo 3", avatar: "https://cdn.vuetifyjs.com/images/cards/halcyon.png", ruta: ""},
  {nombre: "Grupo 4", avatar: "https://cdn.vuetifyjs.com/images/cards/halcyon.png", ruta: ""}
])
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
  gap: 12px;
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

#eliminar {
  width: calc(var(--v-btn-height) + 2px) !important;
  height: calc(var(--v-btn-height) + 2px) !important;
}

.boton {
  display: flex;
  margin: auto;
}
</style>
