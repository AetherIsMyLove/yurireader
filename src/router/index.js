import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path:'/manga',
    name:'manga',
    component: () => import('../views/Manga.vue') 
  },
  {
    path:'/doctruyen',
    name:'doctruyen',
    component: () => import('../views/doctruyen.vue')
  },
  {
    path:'/search',
    name:'search',
    component: () => import('../views/Timkiem.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
