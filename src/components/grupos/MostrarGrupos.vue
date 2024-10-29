<template>
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
  <v-card v-for="(grupo, index) in grupos"
    :key="index"
    :image="grupo.logo"
    max-width="400"
    height="120"
    class="d-flex flex-column justify-center align-center"
  >
      <div class="titulo-fondo">
        <span class="titulo-texto">{{ grupo.nombre }}</span>
      </div>
      <v-btn
        append-icon="mdi-chevron-right"
        color="white"
        text="Ir a grupo"
        variant="outlined"
        class="mt-auto"
        @click="iraGrupo(grupo.id)"
      ></v-btn>
  </v-card>
          </div>
      </v-tabs-window>
    </div>
  </v-card>
  <DialogoCrearGrupo 
  ref="crearGrupo" 
  @grupo-creado="actualizarGrupos" 
  />
</template>

<script setup>
import { ref, onMounted } from "vue";
import { defineProps } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

//  ->  Aplica a tab el valor predeterminado all (muestra todas las notas).
const tab = ref("all");

const grupo = ref(null);

const router = useRouter();

//  ->  Propiedades de Mostar Botón.
const propiedadesBoton = defineProps({
  mostrarBoton: {
    type: Boolean,
    default: true,
  },
});

const grupos = ref([
])

const token = localStorage.getItem('auth-item');

//  ->  Encabezado de la Autorización
const config = {
    headers: {
        'Content-Type':'application/json',
        'Authorization': `Bearer ${token}`
    }
};

const cargarGrupos = async() => {
  try{
      const response = await axios.get('http://localhost:8000/api/grupos/ver', config);
      grupos.value = response.data;
      console.log("Grupos Cargados: ", grupos.value);
  } catch (error) {
    console.error("Error al cargar los Grupos: ", error);
  }
}

onMounted(async () => {
  await cargarGrupos();
});

const iraGrupo = (id) => {
  if (id) {
    router.push(`/grupo/${id}`);
  } else {
    console.error('ID del grupo no definido.');
  }
};


const actualizarGrupos = async () => {
  await cargarGrupos();
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
  grid-template-columns: repeat(4, 1fr);
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

.titulo-fondo {
  background-color: rgba(0, 0, 0, 0.5); /* Fondo semi-transparente */
  padding: 8px 16px;
  border-radius: 8px;
  position: absolute;
  top: 10px;                             /* Posición en la parte superior del card */
  left: 30px;
  right: 30px;
  text-align: center;
}

.titulo-texto {
  color: white;
  font-weight: bold;
  font-size: 1.2em;
}
</style>
