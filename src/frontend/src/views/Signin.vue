<template >
  <div v-if="store.state.player.status == 'offline'"> 
    <div id="notlogged" class=" flex justify-center items-center text-center h-screen"> 
      <div class=" container w-3/5 h-44 bg-slate-300 rounded-lg translate-y-1/4">
        <h1 class="text-slate-600 font-bold lg:text-4xl  md:text-3xl text-xl pt-4 pb-4 translate-y-1/4" > Welcome to YDA Pong Game site </h1>
        <button  class="translate-y-2/4 inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
           <a href="http://10.11.1.2:3001/auth/login" class=" px-5 py-2.5 transition-all ease-in duration-75 bg-slate-200 dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Sign in with 42
           </a >
        </button>
      </div>
    </div>
  </div>
  </template>

<script lang="ts" setup>
    import { inject } from 'vue';
    import axios from 'axios';
    import { useRoute} from 'vue-router';
    const store = inject('store')

</script>

<style scoped>
  #notlogged {
    background-image: url("../assets/bg1.jpg");
    width: 100vw;
    height: 100vh;
    background-size: cover;
  }
</style>