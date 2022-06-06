<template>
  <div>
    <navbar /> 

    <!-- <div class=" ml-20 mr-20 mb-100"> -->
      <div id="container2" class="relative mb-11 text-white">
        <img class="w-16 md:w-32 lg:w-40 rounded-full absolute top-[264px] lg:top-52 left-11 md:top-56" src="../assets/oel-yous.jpeg" alt="">
       <!-- {{ props.nickname }} -->
      </div>
      <div class="ml-20 font-semibold text-3xl top-12 absolute top-[440px] text-gray-400 "> {{ store.state.nickname }} </div>
      
      <div class="flex  my-0 mx-auto w-3/5 bg-neutral-500 h-6 mb-6 relative">
        <div class="bg-neutral-800 h-6 " style="width: 25%"> </div>
        <p class="inline-block z-10 absolute left-2/4 -translate-x-2/4 text-slate-400" > level 25%  </p>
      </div>
      <div class="cent p-8 ">
        <div class="grid md:grid-cols-2 lg:grid-cols-2 gap-2 lg-gap-2 text-center ml-11 mr-11 mt-8" >
          <div class="p-4 bg-neutral-500 rounded-md " > 
            <div > 
              <p class="text-2xl font-semibold"> Achievements </p>
            </div>
          </div>
          <div class="p-4 bg-neutral-500 rounded-md " > 
            <div > 
              <p class="text-2xl font-semibold"> Games </p>
            </div>
          </div>
        </div>
        <div class="grid md:grid-cols-1 lg:grid-cols-1 gap-1 lg-gap-1  ml-11 mr-11 mt-8" >
          <div class="p-4 bg-neutral-500 rounded-md " > 
            <p class="text-2xl font-semibold"> friends </p>
          </div>
        </div>
      </div>
  
    <!-- </div> -->
  </div>
  <Footer />
</template>

<script lang="ts" setup>
import { defineComponent , ref, inject } from 'vue';
import Footer from '../components/Footer.vue';
import navbar from '../components/navbar.vue'
const store = inject('store')

</script>

<style>
  #container2 {
    background-image: url("../assets/cover.png");
    background-attachment: scroll;
    height: 300px;
    background-size: cover;
  }

</style>