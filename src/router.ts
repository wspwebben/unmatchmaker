import { createRouter, createWebHistory } from 'vue-router'
import ViewHome from './views/ViewHome.vue'
import ViewDraft from './views/ViewDraft.vue'
import ViewTeamDraft from './views/ViewTeamDraft.vue'
import ViewTeamMatch from './views/ViewTeamMatch.vue'

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
    },
    {
      path: '/team-draft',
      name: 'team-draft',
      component: ViewTeamDraft
    },
    {
      path: '/team-match',
      name: 'team-match',
      component: ViewTeamMatch
    }
  ]
})

export default router
