<template>
  <div>
    <Header /> 

    <!-- <div class=" ml-20 mr-20 mb-100"> -->
      <div v-if="store.state.player.status" class="Container">
        <div id="container2" class="relative mb-11 text-white">
          <div class="flex absolute top-48 left-5 items-center">

            <img v-if="store.methods.usersInfo(username)" class="w-36 md:w-40 lg:w-40  rounded-full lg:top-52 left-11" :src="store.methods.usersInfo(username).avatar" alt="">
            <div v-if="store.methods.usersInfo(username)" class="ml-6 font-semibold text-3xl  text-gray-400 "> {{ store.methods.usersInfo(username).username }} </div>
            <!-- <div class="h-4 w-4 bg-green-600 mt-2 rounded-full  ml-4">
              <p class="opacity-0 text-gray-400 hover:opacity-100 pl-6 -mt-1">
                 Online
              </p>
            </div> -->
            <!-- <div class="h-4 w-4 bg-blue-600 mt-2 rounded-full  ml-4"> 
              <p class="opacity-0 w-full text-gray-400 hover:opacity-100 pl-6 -mt-1">
                 Playing 
              </p>
            </div> -->
            <div class="h-2 w-2 ring-4 ring-gray-600 mt-2 rounded-full  ml-4"> 
              <p class="opacity-0 text-gray-400 hover:opacity-100 pl-6 -mt-2">
                 Offline
              </p>
            </div>
        </div>
        <button @click="addFriend = true" v-if="!addFriend" id='button' class='absolute bottom-3 right-3 justify-center focus:outline-none space-between bg-slate-900 font-medium py-2 px-4 rounded inline-flex items-center'>
  					<svg id='icon' class='w-4 h-4 mr-1' fill='#FFF' stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="white"><path d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path></svg>
 					<span id='text' class='text-white text-sm select-none'>Add friend</span>
				</button>
				<button v-else id='button' class='absolute bottom-3 right-3 justify-center focus:outline-none space-between bg-gray-900 hover:bg-slate-900 font-medium py-2 px-2 rounded inline-flex items-center'>
 					<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
					</svg>
					<span id='text' class='text-white text-sm select-none ml-2 '>Friends</span>
            <svg @click="frMenu = !frMenu" class="w-5 h-5 ml-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clip-rule="evenodd"></path></svg>
        </button>
          <div v-if="frMenu" class=" divide-y absolute bottom-16 right-3 divide-gray-100 rounded shadow w-36 bg-slate-800">
            <ul class="py-1 text-sm text-gray-700 dark:text-gray-200">
            <li @click="removeFriend" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Remove friend </li>
            <li class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Block </li>
            </ul>
          </div>
       <!-- {{ props.nickname }} -->
      </div>
      <div class="flex  my-0 mx-auto w-3/5 bg-slate-500 h-6 mb-6 relative">
        <div class="bg-slate-700 h-6 " style="width: 25%"> </div>
        <p class="inline-block z-10 absolute left-2/4 -translate-x-2/4 text-slate-400" > level 0 - 25%  </p>
      </div>
      <div class="cent pt-8 ">
        <div class="grid md:grid-cols-1 lg:grid-cols-1 gap-1 lg-gap-1  text-center  mt-8" >
          <div class="p-4  bg-slate-500 rounded-md " > 
            <p class="text-2xl font-semibold pb-4"> Friends </p>
            <div v-if="store.methods.usersInfo(username)" class="pt-4 border-t border-neutral-800 flex items-scretch space-x-2">
              <div v-for="friend in store.methods.usersInfo(username).recievers" :key="friend">
                <router-link  :to="{ name:'User', params: {username: friend.username}}"> <img v-if="store.methods.usersInfo(friend.username)" :src="store.methods.usersInfo(friend.username).avatar" class="w-10 h-10 rounded-full"> </router-link>
              </div>
            </div>
          </div>
        </div>
        <div class="grid md:grid-cols-2 lg:grid-cols-2 gap-2 lg-gap-2 text-center mt-8" >
          <div class="p-4  bg-slate-500 rounded-md " > 
            <p  class="text-2xl font-semibold pb-4 border-b border-neutral-800"> Achievements </p>
            <!-- <div v-if="store.methods.usersInfo(username)"> 

              <div v-for="achievement in store.methods.usersInfo(username).achievements" :key="achievement">
                <div v-if="achievement == 'first'" class="grid grid-cols-8 justify-items-start  bg-slate-500 pt-4">
                    <div class="place-self-start" > <img src="../assets/medal.png" class="w-10 h-10"></div>
                    <div class="col-span-7 pr-10"> <span class="text-xl  font-semibold text-slate-900">First game </span>     <span class="text-s font-semibold text-neutral-900" > Congratulations ! You won your first Game! </span> </div>
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
            </div> -->
          </div>
          <div class="p-4  bg-slate-500 rounded-md " > 
            <div > 
              <p class="text-2xl font-semibold pb-4 border-b border-neutral-800  "> Games </p>
              <!-- games  -->
              <!-- <div class="grid grid-cols-3 justify-itmes-center pt-4">
                <div class="text-neutral-900 font-semibold "> {{ username }} </div>
                <div class="text-gray-900 font-black "> 5 - 2  </div>
                <div class="text-neutral-900 font-semibold "> soepkdsds  </div>
              </div>
              <div class="grid grid-cols-3 justify-itmes-center pt-4">
                <div class="text-neutral-900 font-semibold "> {{ username }} </div>
                <div class="text-gray-900 font-black "> 5 - 2  </div>
                <div class="text-neutral-900 font-semibold "> iidzim  </div>
              </div>
              <div class="grid grid-cols-3 justify-itmes-center pt-4">
                <div class="text-neutral-900 font-semibold "> {{ username }} </div>
                <div class="text-gray-900 font-black "> 5 - 2  </div>
                <div class="text-neutral-900 font-semibold "> framdani  </div>
              </div>
              <div class="grid grid-cols-3 justify-itmes-center pt-4">
                <div class="text-neutral-900 font-semibold "> {{ username }} </div>
                <div class="text-gray-900 font-black "> 5 - 2  </div>
                <div class="text-neutral-900 font-semibold "> dkkdkksm  </div>
              </div>
              <div class="grid grid-cols-3 justify-itmes-center pt-4">
                <div class="text-neutral-900 font-semibold "> {{ username }} </div>
                <div class="text-gray-900 font-black "> 5 - 2  </div>
                <div class="text-neutral-900 font-semibold "> ndjbjdjds  </div>
              </div> -->
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
import Header from '../components/Header.vue'
const store = inject('store')
const addFriend = ref(false)
const frMenu = ref(false)
const removeFriend = () => (
  addFriend.value = false,
  frMenu.value = false)
const props = defineProps({
  username: String
})


</script>

<style>
  #container2 {
    background-image: url("../assets/cover.png");
    background-attachment: scroll;
    height: 300px;
    background-size: cover;
  }

</style>