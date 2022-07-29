import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Chat from '../views/Chat.vue'
import Game from '../views/Game.vue'
import Profile from '../views/Profile.vue'
import User from '../views/User.vue'
import ChatRoom from '../views/ChatRoom.vue'
import Signin from '../views/Signin.vue'
import EmptyChat from '../views/EmptyChat.vue'
import Play from '../views/Play.vue'
import WatchGames from '../views/WatchGames.vue'
import Stream from '../views/Stream.vue'
import OneVOne from '../views/OneVOne.vue';
import twofactorauthentication from '../views/twofactorauthentication.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/auth/login',
    name: 'Signin',
    component: Signin
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    alias: '/home'
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
    path: '/Play',
    name: 'Play',
    component: Play,
    props: true
  },
  {
    path: '/watchgames',
    name: 'WatchGames',
    component: WatchGames
  },
  {
    path: '/chat',
    name: 'EmptyChat',
    component: EmptyChat
  },
  {
    path: '/twofactorauthentication',
    name: 'twofactorauthentication',
    component: twofactorauthentication
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
    path: '/chatRoom/:name',
    name: 'ChatRoom',
    component: ChatRoom,
    props: true
  },
  {
    path: '/stream',
    name: 'Stream',
    component: Stream,
    props: true
  },
  {
    path: '/onevone',
    name: 'OneVOne',
    component: OneVOne,
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
