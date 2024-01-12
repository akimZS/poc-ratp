import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import itineraryView from '../views/ItineraryView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/itinerary',
      name: 'itinerary',
      component: itineraryView
    }
  ]
})

export default router
