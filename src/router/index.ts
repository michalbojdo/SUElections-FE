import { createWebHistory, createRouter } from 'vue-router'

import Home from '@views/Home.vue'
import Votings from '@views/Votings.vue'
import Voters from '@views/Voters.vue'
import PageNotFound from '@views/PageNotFound.vue'
import VotersGroups from '@views/VotersGroups.vue'
import CreateVoting from '@views/CreateVoting.vue'

const routes = [
  { path: '/', component: Home, name: 'Home' }, 
  { path: '/votings', component: Votings, name: 'Votings' },
  { path: '/voters', component: Voters, name: 'Voters'},
  { path: '/voters-groups', component: VotersGroups, name: 'VotersGroups'},
  { path: '/:pathMatch(.*)*', component: PageNotFound, name: 'Page not found'},
  { path: '/votings/create', component: CreateVoting, name: 'Create voting'}
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

export default router