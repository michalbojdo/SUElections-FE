import { createWebHistory, createRouter } from 'vue-router'

import Home from '../views/Home.vue'
import Polls from '../views/Polls.vue'
import PageNotFound from '../views/PageNotFound.vue'

const routes = [
  { path: '/', component: Home, name: 'Home' }, 
  { path: '/polls', component: Polls, name: 'Polls' },
  { path: '/:pathMatch(.*)*', component: PageNotFound, name: 'Page not found'}
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