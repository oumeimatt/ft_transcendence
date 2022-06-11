<template>
  <div class="bg-black">
    <navbar/> 
    <div class="grid grid-cols-4 gap-px bg-black h-screen ">
      <div class="bg-neutral-800 grid grid-flow-row auto-rows-max gap-px ">
        <div class="border-b w-4/5 border-black ml-8 pb-8">
          <div class="mt-12 flex justify-start items-center space-x-2" >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
            </svg> 
             <span class=" text-xl font-bold "> Create new Room </span> 
          </div>
          <div class="mt-4 flex justify-start items-center space-x-2" >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            <span class="text-xl font-bold"> All rooms </span> 
          </div>
        </div>
        <div class="ml-8 mt-4 border-b w-4/5 border-black  pb-8 ">
          <h1 class="font-semibold text-xl mb-6 ">Rooms</h1>
          <div class="h-96 scrollbar scrollbar-track-zinc-900 scrollbar-thumb-zinc-600 ">

              <div class="flex justify-start items-center space-x-2 mt-2"> 
                <img src="../assets/Public.png" class="ml-8 h-8 w-8"> <span>Public room 1 </span> 
              </div>
              <div class="flex justify-start items-center space-x-4 mt-2"> 
                <img src="../assets/Private.png" class="ml-8 h-6 w-6"> <span>Private room 1 </span>
              </div>
              <div class="flex justify-start items-center space-x-2 mt-2"> 
                <img src="../assets/Public.png" class="ml-8 h-8 w-8"> <span>Public room 2 </span>
              </div>
              <div class="flex justify-start items-center space-x-4 mt-2"> 
                <img src="../assets/Private.png" class="ml-8 h-6 w-6"> <span>Private room 2 </span>
              </div>
              <div class="flex justify-start items-center space-x-4 mt-2"> 
                <img src="../assets/Private.png" class="ml-8 h-6 w-6"> <span>Private room 3 </span>
              </div>
              <div class="flex justify-start items-center space-x-4 mt-2"> 
                <img src="../assets/Private.png" class="ml-8 h-6 w-6"> <span>Private room 1 </span>
              </div>
              <div class="flex justify-start items-center space-x-2 mt-2"> 
                <img src="../assets/Public.png" class="ml-8 h-8 w-8"> <span>Public room 2 </span>
              </div>
              <div class="flex justify-start items-center space-x-2 mt-2"> 
                <img src="../assets/Public.png" class="ml-8 h-8 w-8"> <span>Public room 2 </span>
              </div>
              <div class="flex justify-start items-center space-x-4 mt-2"> 
                <img src="../assets/Private.png" class="ml-8 h-6 w-6"> <span>Private room 1 </span>
              </div>
              <div class="flex justify-start items-center space-x-4 mt-2"> 
                <img src="../assets/Private.png" class="ml-8 h-6 w-6"> <span>Private room 1 </span>
              </div>
              <div class="flex justify-start items-center space-x-4 mt-2"> 
                <img src="../assets/Private.png" class="ml-8 h-6 w-6"> <span>Private room 1 </span>
              </div>
              <div class="flex justify-start items-center space-x-4 mt-2"> 
                <img src="../assets/Private.png" class="ml-8 h-6 w-6"> <span>Private room 1 </span>
              </div>
          </div>
        </div>
        <div class="ml-8 mt-4 border-b w-4/5 border-black  pb-8  ">
          <h1 class="font-semibold text-xl mb-6">Friends</h1>
          <div class="h-96 scrollbar scrollbar-track-zinc-900 scrollbar-thumb-zinc-600">
              <div class="flex justify-start items-center space-x-2 mt-2"> 
                <img src="../assets/oel-yous.jpeg" class="ml-8 h-8 w-8 rounded-full"> <span>oumixa </span> 
              </div>
              <div class="flex justify-start items-center space-x-2 mt-2"> 
                <img src="../assets/iidzim.jpeg" class="ml-8 h-8 w-8 rounded-full"> <span>ikram </span> 
              </div>
              <div class="flex justify-start items-center space-x-2 mt-2"> 
                <img src="../assets/framdani.jpeg" class="ml-8 h-8 w-8 rounded-full"> <span>fatima zahra </span> 
              </div>
              <div class="flex justify-start items-center space-x-2 mt-2"> 
                <img src="../assets/mlachheb.jpeg" class="ml-8 h-8 w-8 rounded-full"> <span>mlachheb </span> 
              </div>
              <div class="flex justify-start items-center space-x-2 mt-2"> 
                <img src="../assets/mlachheb.jpeg" class="ml-8 h-8 w-8 rounded-full"> <span>mlachheb </span> 
              </div>
              <div class="flex justify-start items-center space-x-2 mt-2"> 
                <img src="../assets/mlachheb.jpeg" class="ml-8 h-8 w-8 rounded-full"> <span>mlachheb </span> 
              </div>
              <div class="flex justify-start items-center space-x-2 mt-2"> 
                <img src="../assets/mlachheb.jpeg" class="ml-8 h-8 w-8 rounded-full"> <span>mlachheb </span> 
              </div>
              <div class="flex justify-start items-center space-x-2 mt-2"> 
                <img src="../assets/mlachheb.jpeg" class="ml-8 h-8 w-8 rounded-full"> <span>mlachheb </span> 
              </div>
              <div class="flex justify-start items-center space-x-2 mt-2"> 
                <img src="../assets/mlachheb.jpeg" class="ml-8 h-8 w-8 rounded-full"> <span>mlachheb </span> 
              </div>
              <div class="flex justify-start items-center space-x-2 mt-2"> 
                <img src="../assets/mlachheb.jpeg" class="ml-8 h-8 w-8 rounded-full"> <span>mlachheb </span> 
              </div>

          </div>
          
        </div>
      </div>
      <div class="col-span-2 bg-black">

      </div>
      <div class="bg-black">

      </div>
    </div>

  </div>
  <Footer />
</template>

<script lang="ts" setup>
import { defineComponent , inject, ref} from 'vue';
import navbar from '../components/navbar.vue';
import Footer from '../components/Footer.vue';
const store = inject('store')
const channelName = ref('')
const Select = ref(false)
 const showSelect = () => (Select.value = !Select.value);

</script>

<style>
.scrollable-element {
  scrollbar-color: red yellow; /* red is for the thumb and yellow is for the track */
}
  
</style>