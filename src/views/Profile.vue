<template>
  <div>
    <navbar /> 

    <!-- <div class=" ml-20 mr-20 mb-100"> -->
      <div id="container2" class="relative mb-11 text-white">
        <img class="w-16 md:w-32 lg:w-40 rounded-full absolute top-[264px] lg:top-52 left-11 md:top-56" src="../assets/oel-yous.jpeg" alt="">
       <!-- {{ props.nickname }} -->
      </div>
      <div class="ml-20 font-semibold text-3xl top-12 absolute top-[440px] text-gray-400 "> {{ store.state.nickname }} </div>
      
      <div class="flex  my-0 mx-auto w-3/5 bg-gray-500 h-6 mb-6 relative">
        <div class="bg-gray-800 h-6 " style="width: 25%"> </div>
        <p class="inline-block z-10 absolute left-2/4 -translate-x-2/4 text-slate-400" > level 0 - 25%  </p>
      </div>
      <div class="cent p-8 ">
        <div class="grid md:grid-cols-1 lg:grid-cols-1 gap-1 lg-gap-1  text-center  ml-11 mr-11 mt-8" >
          <div class="p-4 bg-gray-600 rounded-md " > 
            <p class="text-2xl font-semibold pb-4"> Friends </p>
            <div class="pt-4 border-t border-neutral-800 flex items-scretch space-x-2">
              <div>
                <img src="../assets/iidzim.jpeg" class="w-10 h-10 rounded-full">
              </div>
              <div> 
                <img src="../assets/mlachheb.jpeg" class="w-10 h-10 rounded-full">
              </div>
              <div>
                <img src="../assets/framdani.jpeg" class="w-10 h-10 rounded-full">
              </div>
              
            </div>
          </div>
        </div>
        <div class="grid md:grid-cols-2 lg:grid-cols-2 gap-2 lg-gap-2 text-center ml-11 mr-11 mt-8" >
          <div class="p-4 bg-gray-600 rounded-md " > 
            <div > 
              <p class="text-2xl font-semibold pb-4 border-b border-neutral-800"> Achievements </p>
              <!-- acheivement -->
              <div class="grid grid-cols-8 justify-items-start bg-gray-600 pt-4">
                <div class="place-self-start" > <img src="../assets/medal.png" class="w-10 h-10"></div>
                <div class="col-span-7"> <span class="text-xl  font-semibold text-slate-900"> </span>     <span class="text-s font-semibold text-neutral-900" > Congratulations ! You won your first Game! </span> </div>
              </div>
              <div class="grid grid-cols-8 justify-items-start bg-gray-600 pt-4">
                <div class="place-self-start" > <img src="../assets/bronze.png" class="w-10 h-10"></div>
                <div class="col-span-7"> <span class="text-xl  font-semibold text-slate-900"> Bronze medal </span>     <span class="text-s font-semibold text-neutral-900" > Congratulations ! You won 5 GAMES! </span> </div>
              </div>
              <div class="grid grid-cols-8 justify-items-start bg-gray-600 pt-4">
                <div class="place-self-start" > <img src="../assets/silver.png" class="w-10 h-10"></div>
                <div class="col-span-7"> <span class="text-xl  font-semibold text-slate-900"> Silver medal </span>   <span class="text-s font-semibold text-neutral-900" >  Congratulations ! You won 10 GAMES! </span> </div>
              </div>
              <div class="grid grid-cols-8 justify-items-start bg-gray-600 pt-4">
                <div class="place-self-start" > <img src="../assets/gold.png" class="w-10 h-10"></div>
                <div class="col-span-7"> <span class="text-xl  font-semibold text-slate-900"> Gold medal </span >  <span class="text-s font-semibold text-neutral-900" > Congratulations ! You won 20 GAMES! </span> </div>
              </div>
              <!--  -->
            </div>
          </div>
          <div class="p-4 bg-gray-600 rounded-md " > 
            <div > 
              <p class="text-2xl font-semibold pb-4 border-b border-neutral-800  "> Games </p>
              <!-- games  -->
              <div class="grid grid-cols-3 justify-itmes-center pt-4">
                <div class="text-neutral-900 font-semibold "> oel-yous</div>
                <div class="text-gray-900 font-black "> 5 - 2  </div>
                <div class="text-neutral-900 font-semibold "> soepkdsds  </div>
              </div>
              <div class="grid grid-cols-3 justify-itmes-center pt-4">
                <div class="text-neutral-900 font-semibold "> oel-yous</div>
                <div class="text-gray-900 font-black "> 5 - 2  </div>
                <div class="text-neutral-900 font-semibold "> iidzim  </div>
              </div>
              <div class="grid grid-cols-3 justify-itmes-center pt-4">
                <div class="text-neutral-900 font-semibold "> oel-yous</div>
                <div class="text-gray-900 font-black "> 5 - 2  </div>
                <div class="text-neutral-900 font-semibold "> framdani  </div>
              </div>
              <div class="grid grid-cols-3 justify-itmes-center pt-4">
                <div class="text-neutral-900 font-semibold "> oel-yous</div>
                <div class="text-gray-900 font-black "> 5 - 2  </div>
                <div class="text-neutral-900 font-semibold "> dkkdkksm  </div>
              </div>
              <div class="grid grid-cols-3 justify-itmes-center pt-4">
                <div class="text-neutral-900 font-semibold "> oel-yous</div>
                <div class="text-gray-900 font-black "> 5 - 2  </div>
                <div class="text-neutral-900 font-semibold "> ndjbjdjds  </div>
              </div>
              <!--  -->
            </div>
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