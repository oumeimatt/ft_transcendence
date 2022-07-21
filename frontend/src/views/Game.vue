<template>
  <div>
    <Header /> 
    <div v-if="store.state.player.status != 'offline'">
      <div class="mt-24 text-center text-gray-200 text-2xl font-bold mb-2">
        <h1> Select difficulty</h1>
      </div>
      <div class="grid grid-rows-2 content-center gap-y-2 text-center ">
        <router-link class="mt-4 cursor-pointer mx-auto bg-slate-300 w-4/12 h-12 pt-2 rounded text-xl font-bold hover:bg-slate-700 hover:ring-white ring-2  hover:text-gray-100" :to="{name: 'Play', params: { difficulty: 'default' } }">
          Default
        </router-link>
        <router-link class="mt-4 cursor-pointer mx-auto bg-slate-400 w-4/12 pt-2 h-12 rounded text-xl font-bold hover:bg-slate-700 hover:ring-white ring-2  hover:text-gray-100" :to="{name: 'Play', params: { difficulty: 'difficult' } }">
          Difficult
        </router-link>
      </div>
    </div>
    <div v-else>
      <div class="mt-24 text-center text-gray-200 text-2xl font-bold mb-2">
        <h1>You Are Already in a Game</h1>
      </div>
      <div class="grid grid-rows-2 content-center gap-y-2 text-center "> 
        <router-link class="mt-4 cursor-pointer mx-auto bg-slate-400 w-4/12 pt-2 h-12 rounded text-xl font-bold hover:bg-slate-700 hover:ring-white ring-2  hover:text-gray-100" :to="{name: 'Home'}">
          Back Home
        </router-link>
      </div>
    </div>
      
    </div>
    <Footer />
</template>

<script lang="ts" setup>
import { inject } from 'vue';
const store = inject('store')
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import Play from './Play.vue';

</script>