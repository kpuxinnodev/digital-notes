<template>
  <div class="principal">
    <v-card>
      <v-layout>
        <v-navigation-drawer app permanent absolute location="left" rail>
          <v-list>
            <img src="/img/nav/logoapp.png" alt="logo.png" />
          </v-list>

          <v-divider></v-divider>

          <div class="navegador">
            <v-list>
              <router-link
                v-for="(ruta, index) in rutas_uno"
                :key="index"
                :to="ruta.path"
                :class="{ 'active-link': activo(ruta.path) }"
              >
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon :class="claseIcono(ruta.path)">
                      {{ ruta.icon }}
                    </v-icon>
                  </v-list-item-icon>
                </v-list-item>
              </router-link>
            </v-list>

            <v-list>
              <router-link
                v-for="(rutas, index) in rutas_dos"
                :key="index"
                :to="rutas.path"
                :class="{ 'active-link': activo(rutas.path) }"
              >
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon :class="claseIcono(rutas.path)">
                      {{ rutas.icon }}
                    </v-icon>
                  </v-list-item-icon>
                </v-list-item>
              </router-link>
              <v-list-item
                v-for="(salir, index) in rutasalir"
                :key="index"
                @click="abrirDialogoSalirAplicacion"
              >
                <v-list-item-icon>
                  <v-icon>{{ salir.icon }}</v-icon>
                </v-list-item-icon>
              </v-list-item>
            </v-list>
          </div>
        </v-navigation-drawer>
        <!-- Componente: DialogoSalir.vue (position: absolute;) -->
        <DialogoSalir ref="salirAplicacion" style="position: absolute" />

        <v-main style="height: 100vh"></v-main>
      </v-layout>
    </v-card>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import DialogoSalir from "./DialogoSalir.vue";

//  ->  Rutas de Navegación
const route = useRoute();
const rutas_uno = ref([
  //  ->  Menús principales
  { path: "/", icon: "mdi-account" },
  { path: "/grupo", icon: "mdi-account-multiple" },
]);
const rutas_dos = ref([
  //  ->  Menús secundarios
  { path: "/notificaciones", icon: "mdi-bell" },
  { path: "/faq", icon: "mdi-frequently-asked-questions" },
  { path: "/guia", icon: "mdi-book" },
  { path: "/configuracion", icon: "mdi-cog" },
]);
const rutasalir = ref([{ path: "/salir", icon: "mdi-power-standby" }]);

//  ->  Detecta la ruta en la cual se encuentra el usuario.
const activo = (path) => {
  return route.path === path;
};
//  ->  Activa el ícono de la ruta en la cual se encuentra el usuario.
const claseIcono = (path) => {
  return activo(path) ? "active-icon" : "inactive-icon";
};

const salirAplicacion = ref(null);

//  ->  Método para abrir el diálogo de Salir de la Aplicación usando la referencia
const abrirDialogoSalirAplicacion = () => {
  if (salirAplicacion.value) {
    salirAplicacion.value.abrirDialogoSalirAplicacion();
  }
};
</script>

<style>
*,
::before,
::after {
  text-decoration: none;
}

img {
  height: 53px;
}

.navegador {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 88%;
}

.v-navigation-drawer__content {
  overflow-y: hidden !important;
}

.v-list {
  padding: 0;
}

.active-icon {
  color: #2196f3;
}

.inactive-icon {
  color: white;
}
</style>
