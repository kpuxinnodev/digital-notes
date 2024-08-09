<template>
  <v-card class="component">
    <v-toolbar color="primary">
      <v-icon icon="mdi-book" id="toolbar-icon"></v-icon>
      <v-card-title>GUÍA DE USUARIO</v-card-title>
    </v-toolbar>

    <div class="d-flex flex-row">
      <!-- Pestañas principales -->
      <v-tabs
        v-model="mainTab"
        color="primary"
        class="mb-4 custom-tabs scrollable-window"
        direction="vertical"
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

      <!-- Ventana de pestañas principales -->
      <v-tabs-window v-model="mainTab" class="custom-tabs-window w-100 mt-1">
        <!-- Ventana 1 (Bienvenido) -->
        <v-tabs-window-item value="main-1">
          <!-- Contenido de la ventana 1 -->
          <v-card flat>
            <v-card-title>Bienvenido a la Guía de Usuario</v-card-title>
            <v-card-text>
              <p>
                En la Guía de Usuario podrás encontrar la ayuda necesaria para
                entender el funcionamiento de Digital Notes. En la misma
                aprenderás a navegar entre los diferentes menús y comprender las
                tareas que puedes realizar en los mismos, por ejemplo:
                administrar tareas y grupos, configurar tu cuenta y consultar
                dudas sobre la herramienta con nuestro sistema de FAQ.
              </p>
              <br />
              <p>
                Utiliza el menú lateral de la ventana para navegar entre las
                guías específicas de cada elemento de la herramienta.
              </p>
            </v-card-text>
          </v-card>
        </v-tabs-window-item>

        <!-- Ventana 2 (Navegación) -->
        <v-tabs-window-item value="main-2" class="scrollable-window">
          <!-- Contenido de la ventana 2 -->
          <v-card flat>
            <v-card-title>Barra de Navegación</v-card-title>
            <v-card-text>
              <p>
                La <b>barra de navegación</b> está ubicada en la parte izquierda
                de la aplicación y la principal función que posee es el permitir
                al usuario <b>navegar entre los distintos menús</b> de la
                aplicación.
              </p>
              <v-list>
                <v-subheader>Los cuales son:</v-subheader>
                <v-list-item
                  v-for="(item, index) in listaNavegacion"
                  :key="index"
                  class="espaciado-lista"
                  >{{ item.text }}</v-list-item
                >
              </v-list>
              <p class="mt-4 mb-4">
                Cada uno de los íconos que se muestran en la
                <b>barra de navegación</b> te llevará a su respectivo menú.
                Adelante, ¡continúa explorando los distintos elementos de la
                guía para seguir aprendiendo!
              </p>
            </v-card-text>
          </v-card>
        </v-tabs-window-item>

        <!-- Ventana 3 (Mi Espacio) -->
        <v-tabs-window-item value="main-3" class="scrollable-window">
          <!-- Contenido de la ventana 3 -->
          <v-card flat>
            <v-card-title>Mi Espacio</v-card-title>
            <v-card-text>
              <p>
                En este menú puedes gestionar notas personales las cuales solo
                tu puedes ver, como dicta su título, es tu espacio personal.
                Aquí podrás gestionar tus notas; creándolas, eliminándolas y
                visualizarlas.
              </p>
              <br />
              <p>
                El menú se divide en tres secciones; dos de ellas en la parte
                superior y la otra el resto de la ventana. En la estructura
                superior, a la izquierda, se encuentran botones los cuales te
                permitirán: crear una nota, eliminar una nota y crear un grupo.
              </p>
            </v-card-text>
          </v-card>
        </v-tabs-window-item>

        <!-- Ventana 4 (Grupo) -->
        <v-tabs-window-item value="main-4" class="scrollable-window">
          <!-- Contenido de la ventana 4 -->
          <v-card flat>
            <v-card-title>Grupo</v-card-title>
            <v-card-text>
              <p>
                En el apartado de Grupo puedes trabajar en conjunto con otros
                integrantes a tu elección para llevar acabo un trabajo de media
                magnitud, como el desarrollo de un proyecto o un trabajo que
                requiera la participación de más personas.
              </p>
              <br />
            </v-card-text>
          </v-card>
        </v-tabs-window-item>

        <!-- Ventana 5 (Notificaciones) -->
        <v-tabs-window-item value="main-5" class="scrollable-window">
          <!-- Contenido de la ventana 5 -->
          <v-card flat>
            <v-card-title>Notificaciones</v-card-title>
            <v-card-text>
              <p>
                Las Notificaciones son una ventana desplegable que se puede
                activar encontrandose en cualquiera de los menús de la
                aplicación. En ella puedes ver las notificaciones vinculadas a
                tu grupo de trabajo, como pueden ser; la asignación de una
                tarea, ser notificado de la realización de una tarea de parte de
                un miembro (solo si eres administrador), y ver quién abandona, y
                quién se une al grupo.
              </p>
            </v-card-text>
          </v-card>
        </v-tabs-window-item>

        <!-- Ventana 6 (FAQ) -->
        <v-tabs-window-item value="main-6" class="scrollable-window">
          <!-- Contenido de la ventana 6 -->
          <v-card flat>
            <v-card-title>FAQ (Preguntas Frecuentes)</v-card-title>
            <v-card-text>
              <p>
                La sección de FAQ es para que puedas consultar preguntas al
                servicio técnico en base a respuestas ya brindadas a dudas de la
                comunidad, en caso de que tu duda no se encuentre entre las más
                frecuentes, puedes consultar directamente con un integrante del
                servicio técnico.
              </p>
            </v-card-text>
          </v-card>
        </v-tabs-window-item>

        <!-- Ventana 7 (Configuración) -->
        <v-tabs-window-item value="main-7" class="scrollable-window">
          <!-- Contenido de la ventana 7 -->
          <v-card flat>
            <v-card-title>Configuración de la Cuenta</v-card-title>
            <v-card-text>
              <p>
                En el menú de Configuración de la Cuenta puedes consultar tus
                datos y modificarlos en caso de que así lo desees. En él se
                mostrará tu nombre, nombre de usuario y una breve biografía en
                caso de que quieras compartir algo de información con otros
                usuarios.
              </p>
            </v-card-text>
          </v-card>
        </v-tabs-window-item>

        <!-- Fin de las ventanas -->
      </v-tabs-window>
    </div>
  </v-card>
</template>

<script setup>
import { ref } from "vue";

// Definir estado reactivo usando `ref`
const mainTab = ref("main-1");

// Opciones para las pestañas principales
const principales = ref([
  { value: "main-1", text: "Bienvenido", icon: "mdi-creation" },
  { value: "main-2", text: "Navegación", icon: "mdi-navigation" },
  { value: "main-3", text: "Mi Espacio", icon: "mdi-account" },
  { value: "main-4", text: "Grupo", icon: "mdi-account-multiple" },
  { value: "main-5", text: "Notificaciones", icon: "mdi-bell" },
  { value: "main-6", text: "FAQ", icon: "mdi-frequently-asked-questions" },
  { value: "main-7", text: "Configuración", icon: "mdi-cog" },
]);

const listaNavegacion = ref([
  { text: "Mi Espacio" },
  { text: "Grupo" },
  { text: "Notificaciones" },
  { text: "FAQ" },
  { text: "Guía" },
  { text: "Configuración" },
  { text: "Salir" },
]);
</script>

<style scoped>
.component {
  display: flex;
  flex-direction: column;
  height: 90%; /* Usa vh para un ajuste de altura relativa a la ventana */
  width: 90%;
}

#toolbar-icon {
  margin-left: 15px;
}

.custom-tabs {
  overflow: hidden !important; /* Oculta las barras de desplazamiento en las pestañas */
  border-right: 1px solid #2b2b2b;
}

.custom-tabs-window {
  overflow: hidden !important; /* Oculta las barras de desplazamiento en la ventana de pestañas */
  height: 100vh;
}

.scrollable-window {
  max-height: calc(
    90vh - 64px
  ); /* Ajusta según la altura de tu barra de herramientas y otros elementos */
  overflow-y: auto; /* Permite el desplazamiento vertical */
}

.titulo-lista {
  font-weight: 500;
  font-size: 1.3em;
}

.v-list-item {
  position: relative;
  padding-left: 2.5em; /* Ajusta el padding para dejar espacio para el punto */
  margin-left: 2.5em;
}

.v-list-item::before {
  content: "";
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 6px; /* Tamaño del punto */
  height: 6px; /* Tamaño del punto */
  background-color: white; /* Color del punto */
  border-radius: 50%; /* Hace que el punto sea redondo */
}

.espaciado-lista {
  min-height: 32px;
}
</style>
