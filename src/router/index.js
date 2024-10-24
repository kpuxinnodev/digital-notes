
/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router/auto'
import login from '@/pages/login.vue';
import Index from '@/pages/index.vue';
import Register from '@/pages/register.vue';
import Grupos from '@/pages/grupos.vue';
import Configuracion from '@/pages/configuracion.vue';
import Faq from '@/pages/faq.vue';
import Grupopreferencias from '@/pages/grupopreferencias.vue';
import Guia from '@/pages/guia.vue';
import Imagen from '@/pages/imagen.vue';
import Grupo from '@/pages/grupo.vue';
import ComponenteGrupoPreferencias from '@/components/grupo/grupopreferencias/ComponenteGrupoPreferencias.vue';
import FormularioPreferenciasEquipo from '@/components/grupo/grupopreferencias/FormularioPreferenciasEquipo.vue';

const routes = [
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/login',
    name: 'login',
    component: login // Asegúrate de tener el componente LoginPage importado
  },
  {
    path: '/',
    name: 'home',
    component: Index,
    meta: { requiresAuth: true },
  },
  {
    path: '/grupos',
    name: 'grupos',
    component: Grupos,
  },
  {
    path: '/grupo/:id',
    name: 'grupo',
    component: Grupo,
    props: true // Pasar el ID del grupo como prop al componente
  },
  {
    path: '/grupopreferencias/:id',
    name: 'grupopreferencias',
    component: Grupopreferencias,
    props: true // Pasar el ID del grupo como prop al componente
  },
  {
    path: '/configuracion',
    name: 'configuracion',
    component: Configuracion,
  },
  {
    path: '/faq',
    name: 'faq',
    component: Faq,
  },
  {
    path: '/grupopreferencias/:id',
    name: 'grupopreferencias',
    component: Grupopreferencias,
    props: true
  },
  {
    path: '/guia',
    name: 'guia',
    component: Guia,
  },
  {
    path: '/imagen',
    name: 'imagen',
    component: Imagen,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('auth-item'); // Verificamos si el token está presente

  if (to.matched.some((record) => record.meta.requiresAuth) && !isAuthenticated) {
    // Si la ruta requiere autenticación y el usuario no está autenticado, redirigimos al login
    next({ name: 'login' });
  } else {
    // Si no se requiere autenticación o el usuario está autenticado, permitimos el acceso
    next();
  }
});
<<<<<<< HEAD
//Nuevas cosas
=======
>>>>>>> master

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router
