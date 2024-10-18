<template>
    <div class="main">
      <!--Main-->
  
      <!-- Componente: Navegacion.vue (Barra de Navegación) -->
      <Navegacion />
  
      <div class="content">
          <div class="datos" v-if="datos">
            <img 
            v-if="datos.avatar"
            class="ml-4 mr-4"
            :src="datos.avatar"
            :alt="datos.nickname"
             />
            <p>{{ datos.name }}</p>
            <p>{{ datos.nickname }}</p>
          </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();

const datos = ref([null]);


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
    datos.value = response.data;
    console.log("Datos cargados: ", datos.value);
  }catch (error){
    console.error("Error al cargar los datos: ", error);
  }
}

onMounted( async() =>{
  await cargarDatos();
});
</script>