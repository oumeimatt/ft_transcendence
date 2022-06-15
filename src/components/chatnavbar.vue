<template>
    <div class="bg-neutral-500 border-t border-neutral-900 grid grid-flow-row auto-rows-max gap-px ">
        <div class="border-b w-4/5 border-black ml-8 pb-8">
          <button class="mt-12 flex justify-start items-center space-x-2" >
            <svg @click="createRoom" xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
            </svg> 
             <div @click="createRoom" class=" text-xl font-bold hover:underline "> Create new Room </div> 
          </button>
          <button class="mt-4 flex justify-start items-center space-x-2" >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            <span class="text-xl font-bold hover:underline"> All rooms </span> 
          </button>
        </div>
        <div class="ml-8 mt-4 h-screen-4 border-b w-4/5 border-black  pb-8 ">
          <h1 class="font-semibold text-xl mb-6 ">Rooms</h1>
          <div class="h-5/6 scrollbar scrollbar-track-zinc-900 scrollbar-thumb-zinc-600 ">

              <div class="flex justify-start items-center space-x-2 mt-2"> 
                <img src="../assets/Public.png" class="ml-8 h-8 w-8"> <span class="font-semibold text-neutral-900 ">Public room 1 </span> 
              </div>
              <div class="flex justify-start items-center space-x-4 mt-2"> 
                <img src="../assets/Private.png" class="ml-8 h-6 w-6"> <span class="font-semibold text-neutral-900">Private room 1 </span>
              </div>
              <div class="flex justify-start items-center space-x-2 mt-2"> 
                <img src="../assets/Public.png" class="ml-8 h-8 w-8"> <span class="font-semibold text-neutral-900">Public room 2 </span>
              </div>
              <div class="flex justify-start items-center space-x-4 mt-2"> 
                <img src="../assets/Private.png" class="ml-8 h-6 w-6"> <span class="font-semibold text-neutral-900">Private room 2 </span>
              </div>
              <div class="flex justify-start items-center space-x-4 mt-2"> 
                <img src="../assets/Private.png" class="ml-8 h-6 w-6"> <span class="font-semibold text-neutral-900">Private room 3 </span>
              </div>
              <div class="flex justify-start items-center space-x-4 mt-2"> 
                <img src="../assets/Private.png" class="ml-8 h-6 w-6"> <span class="font-semibold text-neutral-900">Private room 1 </span>
              </div>
              <div class="flex justify-start items-center space-x-2 mt-2"> 
                <img src="../assets/Public.png" class="ml-8 h-8 w-8"> <span class="font-semibold text-neutral-900">Public room 2 </span>
              </div>
              <div class="flex justify-start items-center space-x-2 mt-2"> 
                <img src="../assets/Public.png" class="ml-8 h-8 w-8"> <span class="font-semibold text-neutral-900">Public room 2 </span>
              </div>
              <div class="flex justify-start items-center space-x-4 mt-2"> 
                <img src="../assets/Private.png" class="ml-8 h-6 w-6"> <span class="font-semibold text-neutral-900">Private room 1 </span>
              </div>
              <div class="flex justify-start items-center space-x-4 mt-2"> 
                <img src="../assets/Private.png" class="ml-8 h-6 w-6"> <span class="font-semibold text-neutral-900">Private room 1 </span>
              </div>
              <div class="flex justify-start items-center space-x-4 mt-2"> 
                <img src="../assets/Private.png" class="ml-8 h-6 w-6"> <span class="font-semibold text-neutral-900">Private room 1 </span>
              </div>
              <div class="flex justify-start items-center space-x-4 mt-2"> 
                <img src="../assets/Private.png" class="ml-8 h-6 w-6"> <span class="font-semibold text-neutral-900">Private room 1 </span>
              </div>
          </div>
        </div>
        <div class="ml-8 h-screen-4 mt-4 w-4/5 border-black  pb-8  ">
          <h1 class="font-semibold text-xl mb-6">Friends</h1>
          <div class=" h-5/6 scrollbar scrollbar-track-zinc-900 scrollbar-thumb-zinc-600">
              <div class="flex justify-start items-center space-x-2 mt-2"> 
                <img src="../assets/oel-yous.jpeg" class="ml-8 h-8 w-8 rounded-full"> <span class="font-semibold text-neutral-900 ">oumixa </span> 
              </div>
              <div class="flex justify-start items-center space-x-2 mt-2"> 
                <img src="../assets/oel-yous.jpeg" class="ml-8 h-8 w-8 rounded-full"> <span class="font-semibold text-neutral-900 ">oumixa </span> 
              </div>
              <div class="flex justify-start items-center space-x-2 mt-2"> 
                <img src="../assets/iidzim.jpeg" class="ml-8 h-8 w-8 rounded-full"> <span class="font-semibold text-neutral-900 ">ikram </span> 
              </div>
              <div class="flex justify-start items-center space-x-2 mt-2"> 
                <img src="../assets/framdani.jpeg" class="ml-8 h-8 w-8 rounded-full"> <span class="font-semibold text-neutral-900 ">fatima zahra </span> 
              </div>
              <div class="flex justify-start items-center space-x-2 mt-2"> 
                <img src="../assets/mlachheb.jpeg" class="ml-8 h-8 w-8 rounded-full"> <span class="font-semibold text-neutral-900 ">mlachheb </span> 
              </div>
              <div class="flex justify-start items-center space-x-2 mt-2"> 
                <img src="../assets/mlachheb.jpeg" class="ml-8 h-8 w-8 rounded-full"> <span class="font-semibold text-neutral-900 ">mlachheb </span> 
              </div>
              <div class="flex justify-start items-center space-x-2 mt-2"> 
                <img src="../assets/mlachheb.jpeg" class="ml-8 h-8 w-8 rounded-full"> <span class="font-semibold text-neutral-900 ">mlachheb </span> 
              </div>
              <div class="flex justify-start items-center space-x-2 mt-2"> 
                <img src="../assets/mlachheb.jpeg" class="ml-8 h-8 w-8 rounded-full"> <span class="font-semibold text-neutral-900 ">mlachheb </span> 
              </div>
              <div class="flex justify-start items-center space-x-2 mt-2"> 
                <img src="../assets/mlachheb.jpeg" class="ml-8 h-8 w-8 rounded-full"> <span class="font-semibold text-neutral-900 ">mlachheb </span> 
              </div>
              <div class="flex justify-start items-center space-x-2 mt-2"> 
                <img src="../assets/mlachheb.jpeg" class="ml-8 h-8 w-8 rounded-full"> <span class="font-semibold text-neutral-900 ">mlachheb </span> 
              </div>
              <div class="flex justify-start items-center space-x-2 mt-2"> 
                <img src="../assets/mlachheb.jpeg" class="ml-8 h-8 w-8 rounded-full"> <span class="font-semibold text-neutral-900 ">mlachheb </span> 
              </div>
              <div class="flex justify-start items-center space-x-2 mt-2"> 
                <img src="../assets/mlachheb.jpeg" class="ml-8 h-8 w-8 rounded-full"> <span class="font-semibold text-neutral-900 ">mlachheb </span> 
              </div>
              <div class="flex justify-start items-center space-x-2 mt-2"> 
                <img src="../assets/mlachheb.jpeg" class="ml-8 h-8 w-8 rounded-full"> <span class="font-semibold text-neutral-900 ">mlachheb </span> 
              </div>
              <div class="flex justify-start items-center space-x-2 mt-2"> 
                <img src="../assets/mlachheb.jpeg" class="ml-8 h-8 w-8 rounded-full"> <span class="font-semibold text-neutral-900 ">mlachheb </span> 
              </div>
              <div class="flex justify-start items-center space-x-2 mt-2"> 
                <img src="../assets/mlachheb.jpeg" class="ml-8 h-8 w-8 rounded-full"> <span class="font-semibold text-neutral-900 ">mlachheb </span> 
              </div>
              <div class="flex justify-start items-center space-x-2 mt-2"> 
                <img src="../assets/mlachheb.jpeg" class="ml-8 h-8 w-8 rounded-full"> <span class="font-semibold text-neutral-900 ">mlachheb </span> 
              </div>


          </div>
          
        </div>
        <div v-if="showCreate" class="fixed inset-36 z-50 ">
            <div class=" my-6 mx-auto max-w-sm  ">
                  <!--content-->
              <div class="border-0 rounded-lg shadow-lg w-full bg-neutral-100  ">
                    <!--header-->
                <div class=" p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 class=" font-semibold text-xl">Create new channel (chat room) </h3>
                </div>
                <form class=" grid gap-3 grid-cols-1  p-6 border-t border-solid border-slate-200 rounded-b">
                   <label class=" text-gray-800 font-semibold" >Name</label> 
                   <input type="text" class="bg-neutral-200 border-b rounded h-8 pl-4" >
                   <label class="p-2 font-semibold text-gray-800">Private/Public</label>
                   <select class="bg-neutral-200 border-b rounded h-8 pl-4">
                        <option value="Public">Public</option>
                        <option value="Private">Private</option>
                   </select>
                   <label class="p-2 font-semibold text-gray-800">Password</label>
                   <input type="password" class="bg-neutral-200 border-b rounded h-8 pl-4">
                   <label class="p-2  font-semibold text-gray-800">Add user</label>
                   <input type="text" class="bg-neutral-200 border-b rounded h-8 pl-4">
                   

                </form>
                <div class="flex items-center justify-center space-x-8  p-6 border-t border-solid border-slate-200 rounded-b">
                  <button @click="showCreate = false" class="text-gray-800 border border-solid white hover:bg-black hover:text-white  font-bold uppercase text-sm px-6 py-3 rounded outline-none    " type="button" v-on:click="toggleModal()">
                    Close
                  </button>
                  <button class="text-gray-800 font-bold hover:border hover:rounded hover:border-solid hover:white hover:text-white hover:bg-black uppercase px-6 py-3 text-sm outline-none    " type="button" v-on:click="toggleModal()">
                    Create channel
                  </button>
                </div>
              </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import {inject, ref} from 'vue';
const store = inject('store')
const showCreate = ref(false)
const createRoom = () => (showCreate.value = true)
</script>