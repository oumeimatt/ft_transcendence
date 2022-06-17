import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Chat from '../views/Chat.vue'
import Game from '../views/Game.vue'
import Profile from '../views/Profile.vue'
import User from '../views/User.vue'
import ChatGroup from '../views/ChatGroup.vue'


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/chat/:name',
    name: 'Chat',
    component: Chat,
    props: true
  },
  {
    path: '/game',
    name: 'Game',
    component: Game
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile
  },
  {
    path: '/users/:username',
    name: 'User',
    component: User,
    props: true
  },
  {
    path: '/chatgroup/:name',
    name: 'ChatGroup',
    component: ChatGroup,
    props: true
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   // component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})
 
export default router
