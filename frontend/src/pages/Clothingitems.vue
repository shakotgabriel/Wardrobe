<template>
  <v-container fluid class="pa-6 main-background">
    <v-card flat>
      <v-card-title class="text-h5 primary darken-1 white--text py-4">Filters</v-card-title>
      <v-card-text class="py-4">
        <v-text-field v-model="search" label="Search" dense outlined hide-details />
        <v-select v-model="selectedCategory" :items="categories" label="Category" dense outlined hide-details />
        <v-btn color="primary" block rounded @click="applyFilters">Apply Filters</v-btn>
      </v-card-text>
    </v-card>

    <v-data-table :headers="headers" :items="filteredItems" class="mt-6" dense>
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Items</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="refresh"><v-icon>mdi-refresh</v-icon></v-btn>
        </v-toolbar>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      search: '',
      selectedCategory: null,
      categories: ['Category 1', 'Category 2', 'Category 3'],
      headers: [
        { text: 'Name', value: 'name' },
        { text: 'Category', value: 'category' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      items: [
        { name: 'Item 1', category: 'Category 1' },
        { name: 'Item 2', category: 'Category 2' },
        { name: 'Item 3', category: 'Category 3' }
      ]
    };
  },
  computed: {
    filteredItems() {
      return this.items.filter(item => 
        (!this.search || item.name.toLowerCase().includes(this.search.toLowerCase())) &&
        (!this.selectedCategory || item.category === this.selectedCategory)
      );
    }
  },
  methods: {
    applyFilters() {
      console.log('Filters applied:', this.search, this.selectedCategory);
    },
    refresh() {
      console.log('Data refreshed');
    }
  }
};
</script>
