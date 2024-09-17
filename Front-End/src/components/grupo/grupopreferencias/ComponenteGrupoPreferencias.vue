<template>
  <v-card class="component">
    <v-toolbar color="primary">
      <v-icon icon="mdi-tools" id="toolbar-icon"></v-icon>
      <v-card-title>PREFERENCIAS DEL EQUIPO</v-card-title>
    </v-toolbar>

    <div class="d-flex flex-row">
      <!-- Pestañas principales -->
      <v-tabs
        v-model="mainTab"
        color="primary"
        class="mb-4 custom-tabs"
        direction="vertical"
        @change="cambioenTab"
      >
        <v-tab
          v-for="(opcion, index) in principales"
          :key="index"
          :value="opcion.value"
          :prepend-icon="opcion.icon"
        >
          {{ opcion.text }}
        </v-tab>
      </v-tabs>

      <!-- Ventanas de pestañas principales -->
      <v-tabs-window v-model="mainTab" class="custom-tabs-window w-100 mt-2">
        <!-- Ventana 1 (Preferencias del Equipo) -->
        <v-tabs-window-item value="main-1">
          <!-- ? Componente: FormularioPreferenciasEquipo.vue () -->
          <FormularioPreferenciasEquipo :grupoId="grupoId"/>
        </v-tabs-window-item>

        <!-- Ventana 2 (Administrar Miembros) -->
        <v-tabs-window-item value="main-2" class="window">
          <!-- ? Componente: ComponenteGrupoMiembros.vue () -->
          <ComponenteGrupoMiembros />
        </v-tabs-window-item>

        <!-- Fin de las ventanas -->
      </v-tabs-window>
    </div>
  </v-card>
</template>

<script setup>
import { ref } from "vue";
import { defineProps } from 'vue';
import FormularioPreferenciasEquipo from "./FormularioPreferenciasEquipo.vue";
import ComponenteGrupoMiembros from "./ComponenteGrupoMiembros.vue";


const props = defineProps({
  grupoId: {
    type: Number,
    required: true
  }
});

//  ->  Estado reactivo
const mainTab = ref("main-1");

//  ->  Opciones para las pestañas principales
const principales = ref([
  { value: "main-1", text: "Configuración", icon: "mdi-cog" },
  { value: "main-2", text: "Miembros", icon: "mdi-account-multiple" },
]);
</script>

<style scoped>
.component {
  display: flex;
  flex-direction: column;
  height: 90vh;
  width: 90%;
  overflow: hidden;
}

#toolbar-icon {
  margin-left: 15px;
}

.d-flex {
  flex: 1;
  display: flex;
  overflow: hidden;
}

.custom-tabs {
  flex: 0 0 200px;
  overflow: hidden;
  border-right: 1px solid #2b2b2b;
}

.custom-tabs-window {
  flex: 1;
  overflow-y: auto;
}

.window {
  max-height: calc(90vh - 64px);
}

.faq-active .v-list-item-subtitle {
  display: block;
  color: white;
  opacity: 100;
}

.faq-active .v-list-item-title {
  color: #2196f3;
}
</style>
