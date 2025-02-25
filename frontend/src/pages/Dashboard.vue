<template>
  <v-container fluid class="pa-0 main-background">
    
    <v-row no-gutters>
      <v-col cols="12">
        <v-card color="primary" class="mb-6 rounded-lg" elevation="3">
          <v-card-title class="text-h4 font-weight-light pa-4">
            <router-link to="/Dashboard" class="text-decoration-none">
              <v-icon large class="mr-3">mdi-wardrobe-outline</v-icon>
              My Wardrobe
            </router-link>
          </v-card-title>
          <v-card-subtitle class="text-subtitle-1 white--text pb-4 px-4">
            Your personal clothing collection, organized beautifully
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>

    
    <v-row class="px-2">
      <v-col cols="12" md="4">
        <v-card class="mb-6 rounded-lg" elevation="2">
          <v-card-title class="text-h6">
            <v-icon left color="primary">mdi-lightning-bolt</v-icon>
            Quick Actions
          </v-card-title>
          <v-card-text class="pa-4">
            <router-link to="/Add" class="text-decoration-none">
              <v-btn
                color="primary"
                block
                class="mb-3 py-6 rounded-lg text-subtitle-1"
                elevation="2"
              >
                <v-icon left>mdi-plus</v-icon>
                Add New Item
              </v-btn>
            </router-link>
            <router-link to="/Clothingitems" class="text-decoration-none">
              <v-btn
                color="secondary"
                block
                class="py-6 rounded-lg text-subtitle-1"
                elevation="2"
              >
                <v-icon left>mdi-hanger</v-icon>
                Browse Collection
              </v-btn>
            </router-link>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="8">
        <v-card class="mb-6 rounded-lg" elevation="2">
          <v-card-title class="text-h6">
            <v-icon left color="primary">mdi-chart-pie</v-icon>
            My Wardrobe at a Glance
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col v-for="category in categories" :key="category.name" cols="6" sm="4">
                <v-card 
                  color="blue-lighten-5" 
                  dark 
                  class="rounded-lg category-card text-center"
                  elevation="3"
                >
                  <v-card-text>
                    <v-icon large class="mb-2">{{ category.icon }}</v-icon>
                    <div class="text-h6 mb-1">{{ category.name }}</div>
                    <div class="text-h4 font-weight-bold">{{ category.count }}</div>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Recent Items Table with Improved Filtering -->
    <v-row class="px-2">
      <v-col cols="12">
        <v-card class="rounded-lg" elevation="2">
          <v-card-title class="text-h6">
            <v-icon left color="primary">mdi-tshirt-crew</v-icon>
            My Clothing Items
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search items..."
              single-line
              hide-details
              class="search-field rounded-lg"
              filled
              dense
            ></v-text-field>
          </v-card-title>
          
          <!-- Filters Section -->
          <v-card-text>
            <v-expand-transition>
              <div v-show="showFilters">
                <v-row class="mb-2">
                  <v-col cols="12" sm="6" md="3">
                    <v-select
                      v-model="selectedCategory"
                      :items="categoryOptions"
                      label="Category"
                      filled
                      rounded
                      dense
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-select
                      v-model="selectedColor"
                      :items="colorOptions"
                      label="Color"
                      filled
                      rounded
                      dense
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-select
                      v-model="selectedSeason"
                      :items="seasonOptions"
                      label="Season"
                      filled
                      rounded
                      dense
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-btn color="primary" block rounded @click="applyFilters">
                      <v-icon left>mdi-filter</v-icon>
                      Apply Filters
                    </v-btn>
                  </v-col>
                </v-row>
              </div>
            </v-expand-transition>
            
            <v-btn 
              text 
              color="primary" 
              @click="showFilters = !showFilters" 
              class="mb-3"
            >
              <v-icon left>{{ showFilters ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
              {{ showFilters ? 'Hide Filters' : 'Show Filters' }}
            </v-btn>
          </v-card-text>
          
          <!-- Data Table -->
          <v-data-table
            :headers="headers"
            :items="recentItems"
            :search="search"
            :items-per-page="5"
            class="elevation-0"
            :footer-props="{
              'items-per-page-options': [5, 10, 15],
              'items-per-page-text': 'Items per page:',
            }"
          >
            <template v-slot:item.image="{ item }">
              <v-avatar size="36" class="mr-2">
                <v-img :src="item.image || 'https://via.placeholder.com/36'" alt="item"></v-img>
              </v-avatar>
            </template>
            <template v-slot:item.category="{ item }">
              <v-chip 
                color="primary" 
                text-color="white" 
                small
              >
                {{ item.category }}
              </v-chip>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const search = ref('');
const selectedCategory = ref(null);
const selectedColor = ref(null);
const selectedSeason = ref(null);
const showFilters = ref(false);

// Enhanced categories with icons but consistent color
const categories = ref([
  { name: 'Tops', count: 15, icon: 'mdi-tshirt-crew' },
  { name: 'Bottoms', count: 10, icon: 'mdi-pants' },
  { name: 'Shoes', count: 8, icon: 'mdi-shoe-heel' },
  { name: 'Accessories', count: 20, icon: 'mdi-watch' },
  { name: 'Outerwear', count: 5, icon: 'mdi-jacket' },
  { name: 'Dresses', count: 7, icon: 'mdi-drama-masks' },
]);

// Headers with image added but no actions
const headers = [
  { title: '', key: 'image', sortable: false, width: '50px' },
  { title: 'Name', align: 'start', key: 'name' },
  { title: 'Category', key: 'category' },
  
];

// Enhanced items with more data
const recentItems = ref([
  { id: 1, name: 'Blue T-Shirt', category: 'Tops', lastWorn: '3 days ago', image: 'https://via.placeholder.com/36/2196F3' },
  { id: 2, name: 'Black Jeans', category: 'Bottoms', lastWorn: '1 week ago', image: 'https://via.placeholder.com/36/212121' },
  { id: 3, name: 'White Sneakers', category: 'Shoes', lastWorn: '2 days ago', image: 'https://via.placeholder.com/36/FFFFFF' },
  { id: 4, name: 'Silver Necklace', category: 'Accessories', lastWorn: '5 days ago', image: 'https://via.placeholder.com/36/C0C0C0' },
  { id: 5, name: 'Denim Jacket', category: 'Outerwear', lastWorn: '2 weeks ago', image: 'https://via.placeholder.com/36/1565C0' },
]);

const categoryOptions = ['All', 'Tops', 'Bottoms', 'Shoes', 'Accessories', 'Outerwear', 'Dresses'];
const colorOptions = ['All', 'Black', 'White', 'Blue', 'Red', 'Green', 'Yellow'];
const seasonOptions = ['All', 'Spring', 'Summer', 'Fall', 'Winter'];

const applyFilters = () => {
  console.log('Applying filters:', {
    category: selectedCategory.value,
    color: selectedColor.value,
    season: selectedSeason.value
  });
  // Implement filter logic here
};

const logout = async () => {
  // Implement logout logic here
  router.push('/login');
};
</script>

<style scoped>
.main-background {
  background-color: #f5f5f5;
  min-height: 100vh;
}

.category-card {
  transition: transform 0.3s;
}

.category-card:hover {
  transform: translateY(-5px);
}
</style>