// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Login from '../pages/Login.vue'
import Signup from '../pages/Signup.vue'
import Dashboard from '../pages/Dashboard.vue'
import Clothingitems from '../pages/Clothingitems.vue'
import Add from '../components/Clothingitems/Add.vue'
import Delete from '../components/Clothingitems/delete.vue'
import Edit from '../components/Clothingitems/edit.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/signup', component: Signup },
  { path: '/dashboard', component: Dashboard },
  { path: '/clothingitems', component: Clothingitems },
  { path: '/add', component: Add },
  { path: '/edit', component: Edit },
  { path: '/delete', component: Delete }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
