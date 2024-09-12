<template>
    <v-form @submit.prevent="submitForm">
      <v-file-input
        v-model="imageFile"
        label="Seleccionar nueva imagen de perfil"
        accept="image/*"
        @update:model-value="onFileChange"
      ></v-file-input>
      <v-img
        v-if="imagePreview"
        :src="imagePreview"
        max-width="300"
        contain
      ></v-img>
      <v-btn
        type="submit"
        color="primary"
        :disabled="!imageBase64"
        :loading="loading"
      >
        {{ existingImageBase64 ? 'Actualizar imagen de perfil' : 'Subir imagen de perfil' }}
      </v-btn>
    </v-form>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  
  const imageFile = ref(null);
  const imageBase64 = ref('');
  const imagePreview = ref(null);
  const existingImageBase64 = ref('');
  const loading = ref(false);
  
  const onFileChange = (file) => {
    if (file) {
      convertToBase64(file);
    } else {
      imageBase64.value = '';
      imagePreview.value = existingImageBase64.value;
    }
  };
  
  const convertToBase64 = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      imageBase64.value = e.target.result;
      imagePreview.value = e.target.result;
    };
    reader.readAsDataURL(file);
  };
  
  const submitForm = async () => {
    loading.value = true;
    try {
      const response = await axios.post('http://localhost:8000/api/user/upload-image', {
        image: imageBase64.value
      });
      console.log('Imagen de perfil guardada:', response.data);
      existingImageBase64.value = imageBase64.value;
      imageBase64.value = '';
      imageFile.value = null;
    } catch (error) {
      console.error('Error al guardar la imagen de perfil:', error);
    } finally {
      loading.value = false;
    }
  };
  
  const fetchExistingImage = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/user/get-image');
      existingImageBase64.value = response.data.image;
      imagePreview.value = existingImageBase64.value;
    } catch (error) {
      console.error('Error al obtener la imagen de perfil existente:', error);
    }
  };
  
  onMounted(fetchExistingImage);
  </script>