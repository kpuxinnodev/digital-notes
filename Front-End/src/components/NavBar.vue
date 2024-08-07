<template>
  <div class="principal">
    <v-card>
      <v-layout>
        <v-navigation-drawer app permanent absolute location="left" rail>
          <v-list>
            <img src="/img/nav/user.png" alt="logo.png" />
          </v-list>

          <v-divider></v-divider>

          <div class="navegador">
            <v-list>
              <router-link
                v-for="(ruta, index) in rutas_uno"
                :key="index"
                :to="ruta.path"
                :class="{ 'active-link': isActive(ruta.path) }"
              >
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon :class="iconClass(ruta.path)">
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
                :class="{ 'active-link': isActive(rutas.path) }"
              >
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon :class="iconClass(rutas.path)">
                      {{ rutas.icon }}
                    </v-icon>
                  </v-list-item-icon>
                </v-list-item>
              </router-link>
            </v-list>
          </div>
        </v-navigation-drawer>

        <v-main style="height: 100vh"></v-main>
      </v-layout>
    </v-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const rutas_uno = ref([ // Menús principales
  { path: '/miespacio', icon: 'mdi-account' },
  { path: '/grupo', icon: 'mdi-account-multiple' },
])
const rutas_dos = ref([ // Menús secundarios
  { path: '/notificaciones', icon: 'mdi-bell' },
  { path: '/faq', icon: 'mdi-frequently-asked-questions' },
  { path: '/guia', icon: 'mdi-book' },
  { path: '/configuracion', icon: 'mdi-cog' },
  { path: '/salir', icon: 'mdi-exit-run' }
])

const isActive = (path) => {
  return route.path === path
}

const iconClass = (path) => {
  return isActive(path) ? 'active-icon' : 'inactive-icon'
}
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
  color: #2196f3; /* Cambia esto al color azul que desees para el ícono activo */
}

.inactive-icon {
  color: white; /* Cambia esto al color blanco que desees para los íconos inactivos */
}
</style>
