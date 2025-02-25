<template>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title class="text-h5">Delete Clothing Item</v-card-title>
        <v-card-text>
          Are you sure you want to delete this item?
          <v-alert v-if="item" type="info" class="mt-4">
            <strong>{{ item.name }}</strong>
            <br>
            Category: {{ item.category }}
          </v-alert>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="closeDialog">Cancel</v-btn>
          <v-btn color="red-darken-1" variant="text" @click="confirmDelete">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script setup>
  import { ref, defineProps, defineEmits } from 'vue';
  
  const props = defineProps({
    item: {
      type: Object,
      required: true
    }
  });
  
  const emit = defineEmits(['close', 'delete']);
  
  const dialog = ref(true);
  
  const closeDialog = () => {
    dialog.value = false;
    emit('close');
  };
  
  const confirmDelete = async () => {
    try {
      // Here you would typically make an API call to delete the item
      console.log('Deleting item:', props.item);
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      emit('delete', props.item.id);
      closeDialog();
    } catch (error) {
      console.error('Error deleting item:', error);
      // Handle error (e.g., show error message to user)
    }
  };
  </script>