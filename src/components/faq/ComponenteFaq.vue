<template>
  <v-card class="component">
    <v-toolbar color="primary">
      <v-icon icon="mdi-frequently-asked-questions" id="toolbar-icon"></v-icon>
      <v-card-title>PREGUNTAS FRECUENTES</v-card-title>
    </v-toolbar>

    <div class="d-flex flex-row windowcolor">
      <!--  Pestañas principales -->
      <v-tabs
        v-model="mainTab"
        
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
      <v-tabs-window v-model="mainTab" class="custom-tabs-window w-100">

        <!-- Ventana 1 (Bienvenido) -->
        <v-tabs-window-item value="main-1" class="window">
          <!-- Contenido de la ventana 1 -->
          <v-card flat class="windowcolor">
            <v-card-title>Bienvenido al Sistema de FAQ</v-card-title>
            <v-card-text>
              <p class="mb-4 ">
                Aquí podrás consultar las preguntas frecuentes de la comunidad y
                encontrar una respuesta en base a una duda ya resuelta.
              </p>

              <p class="mb-4">
                Utiliza el menú de navegación de la izquierda para consultar los
                apartados 'Cuenta' y 'Seguridad'. En ellos encontrarás dudas de
                los usuarios con respecto a dichos temas y las respuestas
                brindadas de nuestra parte a dichas dudas.
              </p>

              <p class="mb-4">
                En caso de que tu duda no se relacione con ninguno de los
                apartados, o por otra parte, tu duda sea de otro tipo. Consulta
                el apartado 'Servicio Técnico' para saber cómo ponerte en
                contacto con nosotros.
              </p>
            </v-card-text>
          </v-card>
        </v-tabs-window-item>

        <!-- Ventana 2 (Cuenta) -->
        <v-tabs-window-item value="main-2" class="window">
          <!-- Contenido de la ventana 2 -->
          <v-list class="windowcolor">
            <v-list-item>
              Estas son las dudas más frecuentes de la comunidad vinculadas con
              la <b>cuenta de usuario:</b>
            </v-list-item>
            <v-list-item-group v-model="itemSelecto">
              <v-list-item>
                <v-list-item
                  v-for="(item, index) in faqsCuenta"
                  :key="index"
                  @click="cambiarItem(index)"
                  :class="{ 'faq-active': itemSelecto === index }"
                >
                  <v-list-item-content>
                    <v-list-item-title>{{ item.pregunta }}</v-list-item-title>
                    <v-list-item-subtitle v-if="itemSelecto === index">
                      {{ item.respuesta }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-tabs-window-item>

        <!-- Ventana 3 (Seguridad) -->
        <v-tabs-window-item value="main-3" class="window">
          <!-- Contenido de la ventana 3 -->
          <v-list class="windowcolor">
            <v-list-item>
              Aquí las preguntas más frecuentes de parte de la comunidad sobre
              la <b>seguridad:</b>
            </v-list-item>
            <v-list-item-group v-model="itemSelecto">
              <v-list-item>
                <v-list-item
                  v-for="(item, index) in faqsSeguridad"
                  :key="index"
                  @click="cambiarItem(index)"
                  :class="{ 'faq-active': itemSelecto === index }"
                >
                  <v-list-item-content>
                    <v-list-item-title>{{ item.pregunta }}</v-list-item-title>
                    <v-list-item-subtitle v-if="itemSelecto === index">
                      {{ item.respuesta }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-tabs-window-item>

        <!-- Ventana 4 (Servicio Técnico) -->
        <v-tabs-window-item value="main-4" class="window">
          <!-- Contenido de la ventana 4 -->
          <v-list class="windowcolor">
            <v-list-item>Si quieres comunicarte personalmente con nosotros, aquí están nuestros canales de contacto:</v-list-item>
            <v-list-item>
              <v-list-item>E-mail: digitalnotes@gmail.com</v-list-item>
              <v-list-item>Whatsapp: +598 12 345 678</v-list-item>
              <v-list-item>Teléfono: 4643 1234</v-list-item>
            </v-list-item>
          </v-list>
        </v-tabs-window-item>

        <!-- Fin de las ventanas -->
      </v-tabs-window>
    </div>
  </v-card>
</template>

<script setup>
import { ref, watch } from "vue";

//  ->  Estados reactivos
const mainTab = ref("main-1");
const itemSelecto = ref(null);

//  ->  Opciones para las pestañas principales
const principales = ref([
  //{ value: "main-1", text: "Bienvenido", icon: "mdi-creation" },
  { value: "main-2", text: "Cuenta", icon: "mdi-account" },
  { value: "main-3", text: "Seguridad", icon: "mdi-security" },
  { value: "main-4", text: "Servicio Técnico", icon: "mdi-tools" },
]);

//  ->  Preguntas y respuestas de la seccion Cuenta
const faqsCuenta = ref([
  {
    pregunta: "¿Qué datos personales pueden ver el resto de usuarios?",
    respuesta:
      "La información que otros usuarios pueden ver con respecto a tu cuenta es solamente: tu avatar, tu usuario y tu biografía.",
  },
  {
    pregunta: "¿Puedo cambiar mi dirección de correo electrónico?",
    respuesta:
      "De momento no puedes cambiar tu dirección de correo vinculada a tu cuenta.",
  },
  {
    pregunta: "¿Se puede hablar con un usuario por mensaje privado?",
    respuesta:
      "El chat es únicamente privado para el grupo del cual eres parte, y solamente puedes comunicarte con los miembros que lo confirman.",
  },
]);

//  ->  Preguntas y respuestas de la seccion Seguridad
const faqsSeguridad = ref([
  {
    pregunta:
      "¿Cómo protegen la información con la cuál se trabaja en los grupos?",
    respuesta:
      "La información de los grupos es almacenada en una base de datos la cual cuenta con sistemas de encriptación de datos, por ende, si alguien se apropiase ilegamente de ella aún así no podría acceder a esos datos.",
  },
  {
    pregunta:
      "¿Que garantías me brindan con respecto a la información de mi cuenta?",
    respuesta:
      "La información de tu cuenta se hashea y se almacena en la base de datos de la aplicación, esta unicamente e muestra a tí y solo se utiliza para comunicarte información relevante acerca de la aplicación.",
  },
]);

//  ->  Cambiar item seleccionado
function cambiarItem(index) {
  itemSelecto.value = itemSelecto.value === index ? null : index;
}

//  ->  Observador para detectar cambios en `mainTab`
watch(mainTab, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    cambioenTab();
  }
});

//  ->  Restablecer la selección al cambiar de pestaña
function cambioenTab() {
  itemSelecto.value = null;
}

</script>

<style scoped>
.component {
  display: flex;
  flex-direction: column;
  height: 100vh;
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
  flex: 0 0 200px;
  overflow: hidden;
  border-right: 1px solid white;
  border-top: 1px solid white;
  background-color: #3f7f9c;
}

.custom-tabs-window {
  flex: 1; 
  overflow-y: auto;
  background-color: #3f7f9c;
}

.window {
  max-height: calc(100vh - 64px); 
  overflow-y: auto;
  border-top: 1px solid white;
  background-color: #3f7f9c;
}

.faq-active .v-list-item-subtitle {
  display: block;
  color: white;
  opacity: 100;
}

.faq-active .v-list-item-title {
  color: #2196f3;
}

.windowcolor {
  background-color: #3f7f9c;
}
</style>