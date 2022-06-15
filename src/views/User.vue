<template>
  <div>
    <navbar /> 

    <!-- <div class=" ml-20 mr-20 mb-100"> -->
      <div class="container">
      <div id="container2" class="relative mb-11 text-white">
        <div class="flex absolute top-48 left-5 items-center">

            <img v-if="usersInfo(username)" class="w-36 md:w-40 lg:w-40 mr-7 rounded-full lg:top-52 left-11" :src="usersInfo(username).pdp" alt="">
            <div v-if="usersInfo(username)" class="font-semibold text-3xl  text-gray-400 "> {{ usersInfo(username).name }} </div>
            <!-- <div class=' rounded  ml-7'>
                <button id='button' class=' mr-10 justify-center focus:outline-none space-between  bg-slate-500 hover:bg-gray-800 font-small py-2 px-4 rounded inline-flex items-center'> -->
                  <!-- // add friend -->
                  <!-- <svg id='icon' class='w-4 h-4 mr-1' fill='#FFF' stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="white"><path d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path></svg>
                  <span id='text' class='text-white text-sm '>Add friend</span> -->
                  <!-- // friends -->
                  <!-- <svg xmlns="http://www.w3.org/2000/svg" class='w-4 h-4 mr-1' fill="none" viewBox="0 0 24 24" stroke="white" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>
                  <span id='text' class='text-white text-sm '> Friends</span>
                </button>
              </div> -->
        </div>
       <!-- {{ props.nickname }} -->
      </div>
      <div class="flex  my-0 mx-auto w-3/5 bg-slate-500 h-6 mb-6 relative">
        <div class="bg-slate-700 h-6 " style="width: 25%"> </div>
        <p class="inline-block z-10 absolute left-2/4 -translate-x-2/4 text-slate-400" > level 0 - 25%  </p>
      </div>
      <div class="cent p-8 ">
        <div class="grid md:grid-cols-1 lg:grid-cols-1 gap-1 lg-gap-1  text-center  ml-11 mr-11 mt-8" >
          <div class="p-4  bg-slate-500 rounded-md " > 
            <p class="text-2xl font-semibold pb-4"> Friends </p>
            <div v-if="usersInfo(username)" class="pt-4 border-t border-neutral-800 flex items-scretch space-x-2">
              <div v-for="friend in usersInfo(username).friends" :key="friend">
                <router-link :to="{ name:'User', params: {username: friend}}"> <img  :src="usersInfo(friend).pdp" class="w-10 h-10 rounded-full"> </router-link>
              </div>
            </div>
          </div>
        </div>
        <div class="grid md:grid-cols-2 lg:grid-cols-2 gap-2 lg-gap-2 text-center ml-11 mr-11 mt-8" >
          <div class="p-4  bg-slate-500 rounded-md " > 
            <div v-if="usersInfo(username)"> 
              <p  class="text-2xl font-semibold pb-4 border-b border-neutral-800"> Achievements </p>
              <!-- acheivement -->
              <div v-for="achievement in usersInfo(username).achievements" :key="achievement">
                <div v-if="achievement == 'first'" class="grid grid-cols-8 justify-items-start  bg-slate-500 pt-4">
                    <div class="place-self-start" > <img src="../assets/medal.png" class="w-10 h-10"></div>
                    <div class="col-span-7"> <span class="text-xl  font-semibold text-slate-900"> </span>     <span class="text-s font-semibold text-neutral-900" > Congratulations ! You won your first Game! </span> </div>
                </div>
                <div v-if="achievement == 'bronze'" class="grid grid-cols-8 justify-items-start  bg-slate-500 pt-4">
                    <div class="place-self-start" > <img src="../assets/bronze.png" class="w-10 h-10"></div>
                    <div class="col-span-7"> <span class="text-xl  font-semibold text-slate-900"> Bronze medal </span>     <span class="text-s font-semibold text-neutral-900" > Congratulations ! You won 5 GAMES! </span> </div>
                </div>
                <div v-if="achievement == 'silver'" class="grid grid-cols-8 justify-items-start  bg-slate-500 pt-4">
                    <div class="place-self-start" > <img src="../assets/silver.png" class="w-10 h-10"></div>
                    <div class="col-span-7"> <span class="text-xl  font-semibold text-slate-900"> Silver medal </span>   <span class="text-s font-semibold text-neutral-900" >  Congratulations ! You won 10 GAMES! </span> </div>
                </div>
                <div v-if="achievement == 'gold'" class="grid grid-cols-8 justify-items-start  bg-slate-500 pt-4">
                    <div class="place-self-start" > <img src="../assets/gold.png" class="w-10 h-10"></div>
                    <div class="col-span-7"> <span class="text-xl  font-semibold text-slate-900"> Gold medal </span >  <span class="text-s font-semibold text-neutral-900" > Congratulations ! You won 20 GAMES! </span> </div>
                </div>
              
              
              
              </div>
              <!--  -->
            </div>
          </div>
          <div class="p-4  bg-slate-500 rounded-md " > 
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
  </div>
  <Footer />
</template>

<script lang="ts" setup>
import { defineComponent , ref, inject } from 'vue';
import Footer from '../components/Footer.vue';
import navbar from '../components/navbar.vue'
const store = inject('store')
const props = defineProps({
  username: String
})

function usersInfo(name: string){
    for (var user of store.state.users) {
        if (user.name == name){
            return user
        }
    }
    return null
}

</script>

<style>
  #container2 {
    background-image: url("../assets/cover.png");
    background-attachment: scroll;
    height: 300px;
    background-size: cover;
  }

</style>