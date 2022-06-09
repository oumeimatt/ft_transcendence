<template>
  <div v-if="store.state.logged == false"> 
    <!-- <console class="log"> {{ logged }}  </console> -->
    <div id="container" class="flex justify-center items-center text-center h-screen"> 
      <div class="w-3/5 lg:h-40 h-60 md:h-56 bg-slate-300 rounded-lg">
        <h1 class="text-slate-600 font-bold text-4xl pt-4 pb-4" > Welcome to YDA Pong Game site </h1>
        <button @click="islogged()" class="inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
          <span class="px-5 py-2.5 transition-all ease-in duration-75 bg-slate-200 dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Sign in with 42
           </span>
        </button>
      </div>
    </div>
  </div>
  <div v-else class="bg-black">
    <navbar /> 
      <div id="container" >
        <div class="pt-40">
          <h1 class="text-7xl font-bold text-center text-white">ENJOY PONG GAME </h1>
          <p class="pl-40 pr-40 pt-10 text-1xl font-bold text-center text-white"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua </p>
            <div class='flex items-center justify-center h-56 content-center space-x-10'>
              <button type="button" class="text-white bg-cyan-600 hover:bg-sky-300	 focus:ring-4 focus:outline-none focus:ring-blue-300 focus:ring-whitefont-medium rounded-lg text-2xl px-5 py-2.5 text-center ">Play Online</button>
              <button type="button" class="text-white bg-cyan-600 hover:bg-sky-300	 focus:ring-4 focus:outline-none focus:ring-blue-300 focus:ring-whitefont-medium rounded-lg text-2xl px-5 py-2.5 text-center ">Watch Games</button>
            </div>
        </div>
      </div>
      <div class="mt-10 ml-20 mr-20" >
        <h1 class="text-slate-400	 text-2xl">About </h1>
        <p class="text-slate-400	 text-m" > Pong is one of the first computer games that ever created, this simple "tennis like" game features two paddles and a ball, the goal is to defeat your opponent by being the first one to gain points, a player gets a point once the opponent misses a ball. The game can be played with two human players. The game was originally developed by Allan Alcorn and released in 1972 by Atari corporations. Soon, Pong became a huge success, and became the first commercially successful game, on 1975, Atari release a home edition of Pong (the first version was played on Arcade machines) which sold 150,000 units. Today, the Pong Game is considered to be the game which started the video games industry, as it proved that the video games market can produce significant revenues. </p>
      </div>
      <div class="cent p-8 ">
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-4 lg-gap-4 text-center ml-20 mr-20" >
          <div class="p-4 bg-neutral-700 rounded-md " > 
            <div > 
              <img src="../assets/oel-yous.jpeg" class="flex jusitfy-center rounded-full  md:ml-0 h-10 w-10 md:h-16 md:w-16 ">
              <p>Oumaima El youssefi</p>
              <p> Lorem ipsum dolor sit amet consectetur</p>
              <a href="http://github.com/oumeimatt" > 
                <img src="../assets/github.png" class="rounded-full   ml-3 md:ml-0 h-5 w-5 md:h-5 md:w-5  ">
              </a>
            </div>
          </div>
          <div class="p-4 bg-neutral-700 rounded-md " > 
            <img src="../assets/iidzim.jpeg" class="rounded-full   ml-3 md:ml-0 h-10 w-10 md:h-16 md:w-16  ">
            <p>Ikram Idzim</p>
            <p> Lorem ipsum dolor sit amet consectetur</p>
            <a href="http://github.com/iidzim" > 
              <img src="../assets/github.png" class="rounded-full   ml-3 md:ml-0 h-5 w-5 md:h-5 md:w-5  ">
            </a>
          </div>
          <div class="p-4 bg-neutral-700 rounded-md " > 
            <img src="../assets/framdani.jpeg" class="rounded-full   ml-3 md:ml-0 h-10 w-10 md:h-16 md:w-16  ">
            <p>Fatima Zahra Ramdani</p>
            <p> Lorem ipsum dolor sit amet consectetur</p>
            <a href="http://github.com/framdani" > 
              <img src="../assets/github.png" class="rounded-full   ml-3 md:ml-0 h-5 w-5 md:h-5 md:w-5  ">
            </a>
          </div>
          <div class="p-4 bg-neutral-700 rounded-md " > 
            <img src="../assets/mlachheb.jpeg" class="rounded-full   ml-3 md:ml-0 h-10 w-10 md:h-16 md:w-16  ">
            <p>Mohamed amine Lachheb</p>
            <p> Lorem ipsum dolor sit amet consectetur</p>
            <a href="http://github.com/mohamedamine456" > 
              <img src="../assets/github.png" class="rounded-full   ml-3 md:ml-0 h-5 w-5 md:h-5 md:w-5  ">
            </a>
          </div>

        </div>
      </div>
  </div>

  <Footer />

</template>

<script lang="ts" setup>
import { defineComponent ,ref, inject, onMounted } from 'vue';
import navbar from '../components/navbar.vue';
import Footer from '../components/Footer.vue';
const store = inject('store')

function islogged(){
  store.state.logged = true
  console.log(store.state.logged)
}
</script>

<style scoped>

  #container {
    /* background: url("../assets/bg.jpg") no-repeat; */
    background-image: url("../assets/bg1.jpg");
    width: 100vw;
    height: 100vh;
    /* background-size: contain; */
    background-size: cover;
  }
  .cent img {
    margin-left: 50% !important;
    transform: translateX(-50%);
  }
</style>