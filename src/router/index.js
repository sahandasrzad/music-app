import { createRouter, createWebHistory } from 'vue-router'
const Home = () => import('@/views/Home.vue')
const About = () => import('@/views/About.vue')
const Manage = () => import('@/views/Manage.vue')
const Song = () => import('@/views/Song.vue')
import useUserStore from '@/stores/user'
const routes = [
  {
    name: 'home',
    path: '/',
    component: Home
  },
  {
    name: 'about',
    path: '/about',
    component: About
  },
  {
    name: 'song',
    path: '/song/:id',
    component: Song
  },
  {
    name: 'manage',
    path: '/manage-music',
    component: Manage,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/manage',
    redirect: { name: 'manage' }
  },
  {
    path: '/:catchAll(.*)*',
    redirect: { name: 'home' }
  }
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkExactActiveClass: 'text-yellow-500'
})
router.beforeEach((to, from, next) => {
  // console.log(to, from)
  // console.log(to.meta)
  if (!to.meta.requiresAuth) {
    next()
    return
  }
  const store = useUserStore()
  if (store.userLoggedIn) {
    next()
  } else {
    next({ name: 'home' })
  }
})
export default router
