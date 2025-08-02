import { createRouter, createWebHistory } from 'vue-router'
import ViewHome from './views/ViewHome.vue'
import ViewDraft from './views/ViewDraft.vue'
import ViewTeamDraft from './views/ViewTeamDraft.vue'
import ViewMatch from './views/ViewMatch.vue'
import ViewRandomHeroes from './views/ViewRandomHeroes.vue'
import ViewRandomMaps from './views/ViewRandomMaps.vue'

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
      path: '/match',
      name: 'match',
      component: ViewMatch
    },
    {
      path: '/random-heroes',
      name: 'random-heroes',
      component: ViewRandomHeroes
    },
    {
      path: '/random-maps',
      name: 'random-maps',
      component: ViewRandomMaps
    }
  ]
})

export default router
