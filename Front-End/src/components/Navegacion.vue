<template>
  <div class="principal">
    <v-card>
      <v-layout>
        <v-navigation-drawer color="white" app permanent absolute location="left" rail class="drawer">
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
              <!-- Menú de notificaciones -->
              <v-menu
                v-model="menuNotificaciones"
                :close-on-content-click="false"
                location="right"
                offset="5"
              >
                <template v-slot:activator="{ props }">
                  <v-list-item v-bind="props">
                    <v-list-item-icon>
                      <v-badge
                        :content="notificacionesCount"
                        :value="notificacionesCount"
                        color="error"
                        :class="claseIcono('')"
                      >
                        <v-icon class="notificacionesicono">mdi-bell</v-icon>
                      </v-badge>
                    </v-list-item-icon>
                  </v-list-item>
                </template>

                <!-- Panel de notificaciones -->
                <v-card flat min-width="300" max-width="400" max-height="200" class="notificaciones-panel">
                  <v-list class="notificaciones-fondo">
                    <div class="titulonotificaciones">
                      <v-list-header class="notificaciones-titulo">Notificaciones</v-list-header>
                    </div>

                    <div class="cuerponotificaciones">
                      <v-list-item
                      v-for="(notification, index) in notificaciones"
                      :key="index"
                      :class="{ 'unread': !notification.read }"
                    >
                      <v-list-item-title>{{ notification.title }}</v-list-item-title>
                      <v-list-item-subtitle>{{ notification.message }}</v-list-item-subtitle>

                      <template v-slot:append>
                        <v-btn
                          icon="mdi-close"
                          variant="text"
                          size="small"
                          @click="eliminarNotificacion(index)"
                        ></v-btn>
                      </template>
                    </v-list-item>
                    </div>

                    <v-divider></v-divider>

                    <v-list-item v-if="notificaciones.length === 0">
                      <v-list-item-title class="text-center">
                        No hay notificaciones nuevas
                      </v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-card>
              </v-menu>

              <router-link
                v-for="(rutas, index) in rutasRestantes"
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
                <v-list-item-icon class="colorsalir">
                  <v-icon>{{ salir.icon }}</v-icon>
                </v-list-item-icon>
              </v-list-item>
            </v-list>
          </div>
        </v-navigation-drawer>
        <DialogoSalir ref="salirAplicacion" style="position: absolute" />
        <v-main style="height: 100vh"></v-main>
      </v-layout>
    </v-card>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import DialogoSalir from "./DialogoSalir.vue";

// Estado del menú de notificaciones
const menuNotificaciones = ref(false);

// Importar las notificaciones aquí
const notificaciones = ref([
  {
    title: 'Nueva actualización',
    message: 'Se ha publicado una nueva versión',
    read: false
  },
  {
    title: 'Mensaje nuevo',
    message: 'Tienes un mensaje de Juan',
    read: false
  },
  {
    title: 'Mensaje nuevo',
    message: 'Tienes un mensaje de Juan',
    read: false
  },
  {
    title: 'Mensaje nuevo',
    message: 'Tienes un mensaje de Juan',
    read: false
  },
  {
    title: 'Mensaje nuevo',
    message: 'Tienes un mensaje de Juan',
    read: false
  },
  {
    title: 'Mensaje nuevo',
    message: 'Tienes un mensaje de Juan',
    read: false
  },
  {
    title: 'Mensaje nuevo',
    message: 'Tienes un mensaje de Juan',
    read: false
  },
  {
    title: 'Mensaje nuevo',
    message: 'Tienes un mensaje de Juan',
    read: false
  },
  {
    title: 'Mensaje nuevo',
    message: 'Tienes un mensaje de Juan',
    read: false
  },
  {
    title: 'Mensaje nuevo',
    message: 'Tienes un mensaje de Juan',
    read: false
  },
]);

// Computed para contar notificaciones no leídas
const notificacionesCount = computed(() => {
  return notificaciones.value.filter(n => !n.read).length
});

// Métodos para manejar notificaciones
const eliminarNotificacion = (index) => {
  notificaciones.value.splice(index, 1);
};

// Rutas de Navegación
const route = useRoute();
const rutas_uno = ref([
  { path: "/", icon: "mdi-account" },
]);

// Separamos las rutas para manejar las notificaciones
const rutasRestantes = ref([
  { path: "/faq", icon: "mdi-frequently-asked-questions" },
  { path: "/guia", icon: "mdi-book" },
  { path: "/configuracion", icon: "mdi-cog" },
]);

const rutasalir = ref([{ path: "/salir", icon: "mdi-power-standby" }]);

// Detecta la ruta activa
const activo = (path) => {
  return route.path === path;
};

// Activa el ícono de la ruta actual
const claseIcono = (path) => {
  return activo(path) ? "active-icon" : "inactive-icon";
};

const salirAplicacion = ref(null);

// Método para abrir el diálogo de Salir
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
  color: #5B5B5B;
}

.colorsalir {
  color: #5B5B5B;
}

.notificaciones-panel {
  margin-left: 10px;
}

.notificaciones-fondo {
  background-color: white !important;
  color: black !important;
}

.notificaciones-titulo {
  color: white !important;
  font-weight: bold;
}

.titulonotificaciones {
  background-color: #2196f3 !important;
  z-index: 100;
  height: 42px;
  display: flex;
  padding-left: 12px;
  align-items: center;

}

.cuerponotificaciones {
  background-color: white !important;
}

.unread {
  background-color: rgb(var(--v-theme-primary), 0.1);
}

.v-icon {
  height: 0.2rem !important;
}

.v-list-item--density-default.v-list-item--one-line {
  min-width: 70px;
}
</style>