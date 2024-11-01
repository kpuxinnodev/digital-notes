<template>
  <v-card class="component">
    <v-toolbar color="primary">
      <v-icon icon="mdi-book" id="toolbar-icon"></v-icon>
      <v-card-title>GUÍA DE USUARIO</v-card-title>
    </v-toolbar>

    <div class="d-flex flex-row windowcolor">
      <!-- Pestañas principales -->
      <v-tabs
        v-model="mainTab"
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
      <v-tabs-window v-model="mainTab" class="custom-tabs-window w-100">
        <!-- Ventana 1 (Bienvenido) -->
        <v-tabs-window-item value="main-1" class="window">
          <!-- Contenido de la ventana 1 -->
          <v-card flat class="windowcolor">
            <v-card-title>Bienvenido a la Guía de Usuario</v-card-title>
            <v-card-text>
              <p>
                En la <b>Guía de Usuario</b> podrás encontrar la
                <b>ayuda necesaria</b> para entender el funcionamiento de
                Digital Notes. En la misma aprenderás a navegar entre los
                diferentes menús y comprender las tareas que puedes realizar en
                los mismos, por ejemplo: administrar tareas y grupos, configurar
                tu cuenta y consultar dudas sobre la herramienta con nuestro
                sistema de FAQ.
              </p>
              <br />
              <p>
                Utiliza el <b>menú lateral</b> de la ventana para navegar entre
                las guías específicas de cada elemento de la herramienta.
              </p>
            </v-card-text>
          </v-card>
        </v-tabs-window-item>

        <!-- Ventana 2 (Navegación) -->
        <v-tabs-window-item value="main-2" class="scrollable-window window">
          <!-- Contenido de la ventana 2 -->
          <v-card flat class="windowcolor">
            <v-card-title>Barra de Navegación</v-card-title>
            <v-card-text>
              <p>
                La <b>barra de navegación</b> está ubicada en la parte izquierda
                de la aplicación y la principal función que posee es el permitir
                al usuario <b>navegar entre los distintos menús</b> de la
                aplicación.
              </p>
              <v-list class="windowcolor">
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
        <v-tabs-window-item value="main-3" class="scrollable-window window">
          <!-- Contenido de la ventana 3 -->
          <v-card flat class="windowcolor contenidoguia">
            <v-card-title class="titulo mt-4 mb-2">Mi Espacio</v-card-title>
            <v-card-text>
              <p>
                En este menú puedes <b>gestionar notas personales</b> las cuales
                solo tu puedes ver, como dicta su título, es tu
                <b>espacio personal</b>. Aquí podrás gestionar tus notas;
                creándolas, eliminándolas y visualizarlas.
              </p>
              <br />
              <p>
                El menú se divide en tres secciones; dos de ellas en la parte
                superior y la otra el resto de la ventana. En la estructura
                superior, a la izquierda, se encuentran botones los cuales te
                permitirán: <b>crear una nota</b> y
                <b>administrar tus notas</b>.
              </p>
              <br />
            </v-card-text>

            <img
              id="inicio-png"
              src="/img/guia/inicio.png"
              alt="/img/guia/inicio.png"
            />

            <v-divider class="divisor mt-8 mb-8"></v-divider>

            <v-card-title class="subtitulo mb-4"
              >Botones de Crear Nota y Administrar</v-card-title
            >

            <img
              id="inicio-botones-png"
              src="/img/guia/inicio-botones.png"
              alt="/img/guia/inicio-botones.png"
            />

            <v-card-text class="mt-2">
              Los botones que se encuentran en la parte superior del menú de
              inicio permite al usuario crear una nota o administrar las notas
              creadas.
            </v-card-text>

            <v-divider class="divisor mt-8 mb-8"></v-divider>

            <v-card-title class="subtitulo mb-4">Crear una nota</v-card-title>

            <img
              id="inicio-crearnota-png"
              src="/img/guia/inicio-crearnota.png"
              alt="inicio-crearnota.png"
            />

            <v-card-text class="mt-2">
              <p>
                Para crear una nota solo basta con dar click en dicho botón y se
                abrirá un formulario con campos a rellenar.
              </p>
              <br />
              <p>
                El formulario para crear una nota cuenta con
                <b>tres espacios a rellenar</b>, los cuales son
                <b>obligatorios</b> para crear una nota.
              </p>
              <br />
              <p>
                El <b>primer espacio</b> a rellenar el es
                <b>contenido de la nota</b>, en él se coloca la
                <b>información a almacenar</b>, dicha nota tiene un máximo de
                120 caracteres y de sobrepasar los mismos no se dejará crear la
                nota.
              </p>
              <br />
              <p>
                Debajo estará <b>la categoría y la prioridad</b>; la categoría
                sirve para determinar a que grupo de tareas pertenecerá dicha
                nota, y la prioridad que tan prioritaria es la nota.
              </p>
            </v-card-text>

            <v-divider class="divisor mt-8 mb-8"></v-divider>

            <v-card-title class="subtitulo mb-4"
              >Visualizador de notas del usuario</v-card-title
            >

            <img
              id="inicio-mostarnotas-png"
              src="/img/guia/inicio-mostarnotas.png"
              alt="inicio-mostarnotas.png"
            />

            <v-card-text class="mt-2">
              El <b>visualizador de notas</b> del usuario
              <b>cargará las notas creadas</b> para que el usuario pueda verlas,
              este cuenta con una barra superior la cual
              <b>representa las categorías</b>, estas son:
              <b
                >todas, trabajo, estudios, gimnasio, dieta, ocio, viajes y
                otros.</b
              >
              Dependiendo la categoría elegida por el usuario en el momento de
              crear la nota esta se mostrará en la categoría “todas” y en la
              categoría específica elegida por el usuario.
            </v-card-text>

            <v-divider class="divisor mt-8 mb-8"></v-divider>

            <v-card-title class="subtitulo mb-4"
              >Notas cargadas en el Visualizador de notas</v-card-title
            >

            <img
              id="inicio-mostarnotas-notas-png"
              src="/img/guia/inicio-mostarnotas-notas.png"
              alt="inicio-mostarnotas-notas.png"
            />

            <v-card-text class="mt-2">
              Al crearse las notas se representarán como se vé en la imagen,
              <b>el ícono representa la categoría</b> y
              <b>el color la prioridad</b>.
            </v-card-text>

            <v-divider class="divisor mt-8 mb-8"></v-divider>

            <v-card-title class="subtitulo mb-4"
              >Botón de Administrar activado</v-card-title
            >

            <img
              id="inicio-mostarnotas-notas-administrar-png"
              src="/img/guia/inicio-mostarnotas-notas(administrar).png"
              alt="inicio-mostarnotas-notas(administrar).png"
            />

            <v-card-text class="mt-2">
              Como ya se mencionó el <b>botón de administrar</b> sirve para
              <b>administrar las notas creadas</b>, al darle click encontrándose
              notas en el visualizador de notas del usuario, se
              <b>activará el modo de administración</b> en el visualizador de
              notas, mostrando en cada nota creada las
              <b>opciones de eliminar y completar</b>.
            </v-card-text>

            <v-divider class="divisor mt-8 mb-8"></v-divider>

            <v-card-title class="subtitulo mb-4"
              >Eliminar una nota</v-card-title
            >

            <img
              id="inicio-mostarnotas-notas-administrar-eliminar-png"
              src="/img/guia/inicio-mostarnotas-notas(administrar-eliminar).png"
              alt="inicio-mostarnotas-notas(administrar-eliminar).png"
            />

            <v-card-text class="mt-2">
              Al dar click al <b>botón de eliminar</b> visible al estar en modo
              administrador se desplegará un <b>mensaje emergente</b> el cual
              pedirá una confirmación en caso de querer eliminar dicha nota, de
              confirmar dando click en &lt;&lt;<b>Eliminar</b>&gt;&gt; la nota
              <b
                >desaparecerá del visualizador de notas y ya no se podrá acceder
                a su información</b
              >.
            </v-card-text>

            <v-divider class="divisor mt-8 mb-8"></v-divider>

            <v-card-title class="subtitulo mb-4"
              >Completar una nota</v-card-title
            >

            <img
              id="inicio-mostarnotas-notas-administrar-completar-png"
              src="/img/guia/inicio-mostarnotas-notas(administrar-completar).png"
              alt="inicio-mostarnotas-notas(administrar-completar).png"
            />

            <v-card-text class="mt-2">
              Al dar click al <b>botón de completar</b> el
              <b>mensaje emergente</b> desplegado pedirá una
              <b>confirmación para completar la tarea</b>, en caso de conceder
              dicha confirmación
              <b
                >la tarea desaparecerá del visualizador de notas, pero se
                cargará en la lista de tareas completadas</b
              >.
            </v-card-text>

            <v-divider class="divisor mt-8 mb-8"></v-divider>

            <v-card-title class="subtitulo mb-4"
              >Tarea completadas</v-card-title
            >

            <img
              id="inicio-tareascompletadas-notas-png"
              src="/img/guia/inicio-tareascompletadas(notas).png"
              alt="inicio-tareascompletadas(notas).png"
            />

            <v-card-text class="mt-2">
              Al dar click en la lista de <b>Tareas Completadas</b> se
              desplegarán las notas a las cuales
              <b>se ha cedido confirmación de completar</b>, en ella
              <b
                >se mostrará su categoría, el contenido y la fecha y hora en la
                cual se completó la tarea</b
              >. Esta lista <b>sólo cargará las últimas cinco tareas</b> que el
              usuario ha completado.
            </v-card-text>
            <v-divider class="divisor mt-8 mb-8"></v-divider>
          </v-card>
        </v-tabs-window-item>

        <!-- Ventana 4 (Grupo) 
         <v-tabs-window-item value="main-4" class="scrollable-window window">
          <v-card flat class="windowcolor">
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
        -->

        <!-- Ventana 5 (Notificaciones) 
         <v-tabs-window-item value="main-5" class="scrollable-window window">
          <v-card flat class="windowcolor">
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
        -->

        <!-- Ventana 6 (FAQ) -->
        <v-tabs-window-item value="main-6" class="scrollable-window window">
          <!-- Contenido de la ventana 6 -->
          <v-card flat class="windowcolor contenidoguia">
            <v-card-title class="titulo mt-4 mb-2"
              >FAQ (Preguntas Frecuentes)</v-card-title
            >
            <v-card-text class="mt-2">
              <p>
                El sistema de FAQ es un añadido que <b>busca proporcionar
                respuestas a dudas que los usuarios tienen </b> frecuentemente con el
                uso de la aplicación, son preguntas ya respondidas por el equipo
                de desarrollo y busca despejar las dudas de los usuarios con
                respecto a <b>cuestiones de seguridad y privacidad</b>.
              </p>
            </v-card-text>

            <img id="faq-png" src="/img/guia/faq.png" alt="faq.png" />

            <v-card-text class="mt-2">
              <p>
                El menú de FAQ cuenta con un <b>submenú el cual los puntos de
                cuenta y seguridad</b> responde preguntas sobre dichos temas.
              </p>
              <br />
              <p>
                Por último el punto de <b>servicio técnico</b> proporciona al usuario
                <b>contacto directo con el soporte</b>.
              </p>
            </v-card-text>

            <v-divider class="divisor mt-8 mb-8"></v-divider>

            <v-card-title class="subtitulo mb-4"
              >Interacción con las preguntas</v-card-title
            >

            <img
              id="interacciones-png"
              src="/img/guia/interaccion.png"
              alt="interacciones.png"
            />

            <v-card-text class="mt-2">
              Para <b>ver la respuesta a una pregunta</b> proporcionada por el equipo
              de desarrollo, el usuario debe dar <b>click en la pregunta y se
              desplegará la respuesta</b>.
            </v-card-text>

            <v-divider class="divisor mt-8 mb-8"></v-divider>
          </v-card>
        </v-tabs-window-item>

        <!-- Ventana 7 (Configuración) -->
        <v-tabs-window-item value="main-7" class="scrollable-window window">
          <!-- Contenido de la ventana 7 -->
          <v-card flat class="windowcolor contenidoguia">
            <v-card-title class="titulo mt-4 mb-2"
              >Configuración de la Cuenta</v-card-title
            >
            <v-card-text class="mt-2">
              <p>
                La aplicación cuenta con un <b>menú de configuración del usuario</b>,
                en donde el usuario puede <b>ver y modificar sus datos</b>.
              </p>
            </v-card-text>

            <v-divider class="divisor mt-8 mb-8"></v-divider>

            <v-card-title class="subtitulo mb-4"
              >Perfil de usuario</v-card-title
            >

            <img
              id="configuracion-perfil-png"
              src="/img/guia/configuracion-perfil.png"
              alt="configuracion-perfil.png"
            />

            <v-card-text class="mt-2">
              <p>
                En el apartado de <b>perfil de usuario</b> del menú de configuración el
                usuario puede <b>consultar sus datos</b>, los cuales son el <b>nombre</b>, el
                <b>usuario</b> indicado con un &lt;&lt;@&gt;&gt; y una <b>biografía</b>.
              </p>
            </v-card-text>

            <v-divider class="divisor mt-8 mb-8"></v-divider>

            <v-card-title class="subtitulo mb-4">Modificar datos</v-card-title>

            <img
              id="configdatos-png"
              src="/img/guia/configdatos.png"
              alt="configdatos.png"
            />

            <v-card-text class="mt-2">
              <p>
                El apartado de <b>modificar datos</b> proporciona al usuario la posibilidad de
                <b>cambiar los datos mostrados en el perfil; nombre, usuario y
                biografía</b>.
              </p>
            </v-card-text>

            <v-divider class="divisor mt-8 mb-8"></v-divider>

            <v-card-title class="subtitulo mb-4"
              >Seguridad de la cuenta</v-card-title
            >

            <img
              id="configseguridad-png"
              src="/img/guia/configseguridad.png"
              alt="configseguridad.png"
            />

            <v-card-text class="mt-2">
              <p>
                Por último en el menú de configuración se le proporciona al
                usuario la posibilidad de <b>cambiar su contraseña</b> en caso de que
                su cuenta pueda verse comprometida, <b>deberá ingresar la
                contraseña actual y la nueva</b>, confirmando a su vez la nueva y
                estando seguro de lo que desea hacer marcando así la
                correspondiente casilla.
              </p>
            </v-card-text>

            <v-divider class="divisor mt-8 mb-8"></v-divider>
          </v-card>
        </v-tabs-window-item>

        <!-- Fin de las ventanas -->
      </v-tabs-window>
    </div>
  </v-card>
</template>

<script setup>
import { ref } from "vue";

//  ->  Estado reactivo
const mainTab = ref("main-1");

//  ->  Opciones para las pestañas principales
const principales = ref([
  //{ value: "main-1", text: "Bienvenido", icon: "mdi-creation" },
  { value: "main-2", text: "Navegación", icon: "mdi-navigation" },
  { value: "main-3", text: "Mi Espacio", icon: "mdi-account" },
  { value: "main-4", text: "Grupo", icon: "mdi-account-multiple" },
  { value: "main-5", text: "Notificaciones", icon: "mdi-bell" },
  { value: "main-6", text: "FAQ", icon: "mdi-frequently-asked-questions" },
  { value: "main-7", text: "Configuración", icon: "mdi-cog" },
]);

//  ->  Opciones de la lista de Navegación (Ventana: 2)
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
  height: 100%;
  width: 100%;
}

#toolbar-icon {
  margin-left: 15px;
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
  max-height: calc(100vh - 64px);
  overflow-y: auto;
}

.titulo-lista {
  font-weight: 500;
  font-size: 1.3em;
}

.v-list-item {
  position: relative;
  padding-left: 2.5em;
  margin-left: 2.5em;
}

.v-list-item::before {
  content: "";
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 6px;
  height: 6px;
  background-color: white;
  border-radius: 50%;
}

.espaciado-lista {
  min-height: 32px;
}

/** Estilo de imágenes */

#inicio-png {
  height: 400px;
  width: 800px;
  align-self: center;
  border: 1px solid #81d4fa;
}

#inicio-botones-png {
  height: 100px;
  width: 600px;
  align-self: center;
  border: 1px solid #81d4fa;
}

#inicio-crearnota-png {
  height: 280px;
  width: 400px;
  align-self: center;
  border: 1px solid #81d4fa;
}

#inicio-mostarnotas-png {
  height: 300px;
  width: 600px;
  align-self: center;
  border: 1px solid #81d4fa;
}

#inicio-mostarnotas-notas-png {
  height: 100px;
  width: 700px;
  align-self: center;
  border: 1px solid #81d4fa;
}

#inicio-mostarnotas-notas-administrar-png {
  height: 100px;
  width: 700px;
  align-self: center;
  border: 1px solid #81d4fa;
}

#inicio-mostarnotas-notas-administrar-eliminar-png {
  height: 150px;
  width: 300px;
  align-self: center;
  border: 1px solid #81d4fa;
}

#inicio-mostarnotas-notas-administrar-completar-png {
  height: 150px;
  width: 300px;
  align-self: center;
  border: 1px solid #81d4fa;
}

#inicio-tareascompletadas-notas-png {
  height: 200px;
  width: 450px;
  align-self: center;
  border: 1px solid #81d4fa;
}

/** FAQ */

#faq-png {
  height: 400px;
  width: 800px;
  align-self: center;
  border: 1px solid #81d4fa;
}

#interacciones-png {
  height: 160px;
  width: 600px;
  align-self: center;
  border: 1px solid #81d4fa;
}

/** Configuración */

#configuracion-perfil-png {
  height: 400px;
  width: 800px;
  align-self: center;
  border: 1px solid #81d4fa;
}

#configdatos-png {
  height: 360px;
  width: 800px;
  align-self: center;
  border: 1px solid #81d4fa;
}

#configseguridad-png {
  height: 360px;
  width: 800px;
  align-self: center;
  border: 1px solid #81d4fa;
}

/** Fin de estilo de imágenes */

.window {
  border-top: 1px solid white;
  background-color: #3f7f9c;
}

.windowcolor {
  background-color: #3f7f9c;
}

.divisor {
  color: white;
}

.titulo {
  font-size: 24px;
  font-weight: 600;
  padding-left: 5%;
}

.subtitulo {
  font-size: 18px;
  font-weight: 600;
  padding-left: 5%;
}

.contenidoguia {
  display: flex;
  flex-direction: column;
  padding-left: 5%;
  padding-right: 5%;
}
</style>