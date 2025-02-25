<template>
  <v-container>
    <v-card>
      <v-card-title class="text-h5 mb-2">
        Edit Clothing Item
      </v-card-title>
      <v-card-text>
        <v-form @submit.prevent="submitForm" v-model="isFormValid">
          <v-text-field
            v-model="item.name"
            label="Item Name"
            :rules="[v => !!v || 'Name is required']"
            required
          ></v-text-field>
          
          <v-select
            v-model="item.category"
            :items="categories"
            label="Category"
            :rules="[v => !!v || 'Category is required']"
            required
          ></v-select>
          
          <v-text-field
            v-model="item.color"
            label="Color"
          ></v-text-field>
          
          <v-text-field
            v-model="item.brand"
            label="Brand"
          ></v-text-field>
          
          <v-textarea
            v-model="item.description"
            label="Description"
            rows="3"
          ></v-textarea>
          
     
          <v-btn
            type="submit"
            color="primary"
            :disabled="!isFormValid"
            class="mt-4"
          >
            Update Item
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const isFormValid = ref(false);

const categories = [
  'Tops',
  'Bottoms',
  'Shoes',
  'Accessories',
  'Outerwear',
  'Dresses'
];

const item = ref({
  id: '',
  name: '',
  category: '',
  color: '',
  brand: '',
  description: '',
  image: '',
  newImage: null
});

onMounted(async () => {
  const itemId = route.params.id;
  // Fetch item data from API
  try {
    // Simulating API call
    await new Promise(resolve => setTimeout(resolve, 500));
    // Mock data - replace with actual API call
    item.value = {
      id: itemId,
      name: 'Blue T-Shirt',
      category: 'Tops',
      color: 'Blue',
      brand: 'Brand X',
      description: 'Comfortable cotton t-shirt',
      image: 'path/to/image.jpg'
    };
  } catch (error) {
    console.error('Error fetching item:', error);
    // Handle error (e.g., show error message, redirect)
  }
});

const submitForm = async () => {
  try {
    // Here you would typically make an API call to update the item
    console.log('Updating item:', item.value);
    // Simulating API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    // On success, navigate back to the clothing items list
    router.push('/clothing-items');
  } catch (error) {
    console.error('Error updating item:', error);
    // Handle error (e.g., show error message to user)
  }
};
</script>