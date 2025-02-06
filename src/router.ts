import { createRouter, createWebHistory } from 'vue-router'
import ViewHome from './views/ViewHome.vue'
import ViewDraft from './views/ViewDraft.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ViewHome
    },
    {
      path: '/draft',
      name: 'draft',
      component: ViewDraft
    }
  ]
})

export default router
