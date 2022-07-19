<template>
  <div>
    <Header /> 
    <div v-if="store.state.player.status == 'online'">
      <div class="mt-24 text-center text-gray-200 text-2xl font-bold mb-2">
        <h1> Select difficulty</h1>
      </div>
      <div class="grid grid-rows-3 gap-y-2 text-center ">
        <div class="mt-4 cursor-pointer  mx-auto pt-6 bg-slate-300 w-4/12 h-small rounded text-xl font-bold hover:bg-slate-700 hover:ring-white ring-2  hover:text-gray-100"> 
          <router-link :to="{name: 'Play', params: { difficulty: 'default' } }">
            Default
          </router-link>
        </div>
        <div class="mt-4 cursor-pointer mx-auto pt-6 bg-slate-400 w-4/12 h-small rounded text-xl font-bold hover:bg-slate-700 hover:ring-white ring-2  hover:text-gray-100"> 
          <router-link :to="{name: 'Play', params: { difficulty: 'difficult' } }">
            Difficult
          </router-link>
        </div>
      </div>
    </div>
    <Footer />

    </div>
</template>

<script lang="ts" setup>
import { inject } from 'vue';
const store = inject('store')
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import Play from './Play.vue';

</script>