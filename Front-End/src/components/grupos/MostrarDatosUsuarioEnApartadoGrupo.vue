<template>
    <div class="main">
      <!--Main-->
  
      <!-- Componente: Navegacion.vue (Barra de Navegación) -->
      <Navegacion />
  
      <div class="content">
          <div class="datos" v-if="datosCargados.name">
            <img src="/img/avatar/avatar1.png" alt="avatar.png" />
            <p>{{ datosCargados.name }}</p>
            <p>{{ datosCargados.nickname }}</p>
          </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();

const datosCargados = ref([]);


const token = localStorage.getItem('auth-item');

//  ->  Encabezado de la Autorización
const config = {
    headers: {
        'Content-Type':'application/json',
        'Authorization': `Bearer ${token}`
    }
};

const cargarDatos = async() => {
  try{
    const response = await axios.get('http://localhost:8000/api/grupos/datos', config);
    datosCargados.value = response.data;
    console.log("Datos catgados: ", datosCargados.value);
  }catch (error){
    console.error("Error al cargar los datos: ", error);
  }
}

onMounted( async() =>{
  await cargarDatos();
});
</script>