<template>
  <v-card class="component">
    <v-toolbar color="primary">
      <v-icon icon="mdi-tools" id="toolbar-icon"></v-icon>
      <v-card-title>PREFERENCIAS DEL EQUIPO</v-card-title>
    </v-toolbar>

    <div class="d-flex flex-row windowcolor">
      <!-- Pestañas principales -->
      <v-tabs
        v-model="mainTab"
        class="mb-4 custom-tabs scrollable-window"
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
      <v-tabs-window v-model="mainTab" class="custom-tabs-window w-100">
        <!-- Ventana 1 (Preferencias del Equipo) -->
        <v-tabs-window-item value="main-1" class="window scrollable-window">
          <!-- ? Componente: FormularioPreferenciasEquipo.vue () -->
          <FormularioPreferenciasEquipo :grupoId="grupoId"/>
        </v-tabs-window-item>

        <!-- Ventana 2 (Administrar Miembros) -->
        <v-tabs-window-item value="main-2" class="scrollable-window window">
          <!-- ? Componente: ComponenteGrupoMiembros.vue () -->
          <ComponenteGrupoMiembros :grupoId="grupoId" />
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
  height: 100%;
  width: 100%;
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
  overflow: hidden !important;
  border-right: 1px solid white;
  border-top: 1px solid white;
}

.custom-tabs-window {
  overflow: hidden !important;
  height: 100vh;
}

.scrollable-window {
  max-height: calc(
    100vh - 64px
  );
  overflow-y: auto;
}

.window {
  border-top: 1px solid white;
  background-color: #3f7f9c;
}

.windowcolor {
  background-color: #3f7f9c;
}
</style>
