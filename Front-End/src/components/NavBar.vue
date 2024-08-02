<template>
    <div>
        <v-card>
        <v-layout>
          <v-navigation-drawer app
            permanent
            absolute
            location="left"
            rail
          >
            <v-list>
                <img src="/home/kpuxinno/Escritorio/vuetify-project/src/assets/user.png" alt="logo.png">
            </v-list>

            <v-divider></v-divider>

            <div class="navegador">
                <v-list>
                    <router-link v-for="ruta in rutas_uno" :key="ruta.name" :to="ruta.path">
                        <v-list-item :prepend-icon="ruta.icon" :title="ruta.title" :value="ruta.value"></v-list-item>
                    </router-link>
                </v-list>

                <v-list>
                    <router-link v-for="rutas in rutas_dos" :key="rutas.name" :to="rutas.path">
                        <v-list-item :prepend-icon="rutas.icon" :title="rutas.title" :value="rutas.value"></v-list-item>
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
import { useRouter } from 'vue-router'

const router = useRouter()
const rutas_uno = [ //Menús principales
  { path: '/miespacio', title: 'Mi Espacio', value: 'miespacio', icon: 'mdi-account'},
  { path: '/grupo', title: 'Grupo', value: 'grupo', icon: 'mdi-account-multiple'},
]
const rutas_dos = [ //Menús secundarios
  { path: '/notificaciones', title: 'Notificaciones', value: 'notificaciones', icon: 'mdi-bell'},
  { path: '/faq', title: 'FAQ', value: 'faq', icon: 'mdi-frequently-asked-questions'},
  { path: '/guia', title: 'Guía', value: 'guia', icon: 'mdi-book'},
  { path: '/configuracion', title: 'Configuración', value: 'configuracion', icon: 'mdi-cog'},
  { path: '/salir', title: 'Salir', value: 'salir', icon: 'mdi-exit-run'}
]
</script>

<style>

*, ::before, ::after {
  color: white;
  text-decoration: none;
}

img{
  height: 53px;
}

.navegador {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 88%;
}

.v-list {
    padding: 0;
}
</style>