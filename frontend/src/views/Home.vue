<template >
  <div class="bg-black ">
    <Header />
    <div v-if="store.state.player.status == 'online'">
      <div id="bg" class="flex flex-col space-y-96" >
          <div id="opacity" class="h-screen w-screen pt-40">
            <h1 class="text-7xl font-bold text-center text-gray-300">ENJOY PONG GAME </h1>
            <!-- <p class="pl-40 pr-40 pt-10 text-1xl font-bold text-center text-gray-300"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua </p> -->
              <div class='flex items-center justify-center h-56 content-center space-x-10'>
                  <router-link :to="{name:'Game'}"  class="text-sky-900 bg-white hover:bg-sky-900 hover:ring-white hover:text-white ring-2 ring-sky-400	 focus:ring-4 focus:outline-none focus:ring-blue-500 focus:ring-whitefont-medium rounded-lg text-xl px-5 py-2.5 text-center ">Play Online </router-link>
                  <router-link :to="{name:'WatchGames'}" class="text-gray-100 bg-sky-900 hover:bg-white hover:ring-sky-400 hover:text-sky-900 ring-2 ring-white	 focus:ring-4 focus:outline-none focus:ring-blue-500 focus:ring-whitefont-medium rounded-lg text-xl px-5 py-2.5 text-center ">Watch Games</router-link>
              </div>
          </div>
      </div>
      <div class="Container flex flex-col justify-center items-center  lg:ml-20 lg:mr-20 md:ml-10 md:mr-10" >
        <div>
          <h1 class="text-slate-300	 text-2xl">About </h1>

           <p class="text-slate-300	 text-m" > Pong is one of the first computer games that ever created, this simple "tennis like" game features two paddles and a ball, the goal is to defeat your opponent by being the first one to gain points, a player gets a point once the opponent misses a ball. The game can be played with two human players. The game was originally developed by Allan Alcorn and released in 1972 by Atari corporations. Soon, Pong became a huge success, and became the first commercially successful game, on 1975, Atari release a home edition of Pong (the first version was played on Arcade machines) which sold 150,000 units. Today, the Pong Game is considered to be the game which started the video games industry, as it proved that the video games market can produce significant revenues. </p>
        </div>
        <div class="cent p-8 ">
          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-4 lg-gap-4 text-center ml-20 mr-20" >
            <div class="p-4 bg-gray-600 rounded-md " > 
              <div > 
                <img src="../assets/oel-yous.jpeg" class="flex jusitfy-center rounded-full mb-4 md:ml-0 h-10 w-10 md:h-16 md:w-16 ">
                <p class="font-semibold text-neutral-900">Oumaima El youssefi</p>
                <p class="font-semibold text-neutral-900 "> Frontend & UI/UX design </p>
                <a href="http://github.com/oumeimatt" > 
                  <img src="../assets/github.png" class="rounded-full mt-4  ml-3 md:ml-0 h-5 w-5 md:h-5 md:w-5  ">
                </a>
              </div>
            </div>
            <div class="p-4 bg-gray-600 rounded-md " > 
            <img src="../assets/iidzim.jpeg" class="rounded-full mb-4  ml-3 md:ml-0 h-10 w-10 md:h-16 md:w-16  ">
            <p class="font-semibold text-neutral-900 ">Ikram Idzim</p>
            <p class="font-semibold text-neutral-900"> Backend & UI/UX design </p>
            <a href="http://github.com/iidzim" > 
              <img src="../assets/github.png" class="rounded-full mt-4  ml-3 md:ml-0 h-5 w-5 md:h-5 md:w-5  ">
            </a>
          </div>
          <div class="p-4 bg-gray-600 rounded-md " > 
            <img src="../assets/framdani.jpeg" class="rounded-full mb-4  ml-3 md:ml-0 h-10 w-10 md:h-16 md:w-16  ">
            <p class="font-semibold text-neutral-900">Fatima Zahra Ramdani</p>
            <p class="font-semibold text-neutral-900 "> Chat</p>
            <a href="http://github.com/framdani" > 
              <img src="../assets/github.png" class="rounded-full mt-4  ml-3 md:ml-0 h-5 w-5 md:h-5 md:w-5  ">
            </a>
          </div>
          <div class="p-4 bg-gray-600 rounded-md " > 
            <img src="../assets/mlachheb.jpeg" class="rounded-full  mb-4 ml-3 md:ml-0 h-10 w-10 md:h-16 md:w-16  ">
            <p class="font-semibold text-neutral-900">Mohamed amine Lachheb</p>
            <p class="font-semibold text-neutral-900"> Pong game </p>
            <a href="http://github.com/mohamedamine456" > 
              <img src="../assets/github.png" class="rounded-full mt-4  ml-3 md:ml-0 h-5 w-5 md:h-5 md:w-5  ">
            </a>
          </div>
        </div>
        </div>
      </div>

  </div>
  <Footer />
  </div>
</template>

<script lang="ts" setup>
import { defineComponent ,ref, inject, onMounted } from 'vue';
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import Game from '../components/Game.vue'
import WatchGames from './WatchGames.vue'
const store = inject('store')


</script>

<style scoped>

  #opacity {
    background-color: rgba(0, 0, 0, 0.3);
  }
  #bg {
    /* background: url("../assets/bg.jpg") no-repeat; */
    background-image: url("../assets/bg1.jpg");
    width: 100vw;
    height: 80vh;
    /* background-size: contain; */
    background-size: cover;
  }

  .cent img {
    margin-left: 50% !important;
    transform: translateX(-50%);
  }
</style>