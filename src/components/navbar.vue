<template>

<nav class="border-gray-200 px-2 sm:px-4 py-2.5 rounded  bg-neutral-700 ">
  <div class="container flex flex-wrap justify-between items-center mx-auto">
<!-- logo -->
    <a class="flex items-center"> 
      <router-link :to="{name:'Home'}">
        <img src="../assets/pong.png" class="mr-3 h-6 sm:h-9" alt="" />
      </router-link>
      <router-link :to="{name:'Home'}">
        <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-gray-400"> <span class="logo">YDA PONG </span></span>
      </router-link>
    </a>
<!--  -->
<!-- search navbar -->
    <div class="flex md:order-1">
      <button type="button" data-collapse-toggle="mobile-menu-3" aria-controls="mobile-menu-3" aria-expanded="false" class="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 mr-1" >
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
      </button>
      <div class="hidden relative md:block w-80">
        <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <svg class="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
        </div>
        <input type="text" id="search-navbar" class="block p-2 pl-10 w-full text-gray-900 bg-gray-50 rounded-xl border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500 bg-neutral-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search...">
      </div>
      <button data-collapse-toggle="mobile-menu-3" type="button" class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-3" aria-expanded="false">
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
        <svg class="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
      </button>
    </div>
<!--  -->
<!-- home chat game user -->
    <div class="hidden justify-between items-center w-full md:flex md:w-auto md:order-1 relative" id="mobile-menu-3">
      <div class="relative mt-3 md:hidden">
        <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <svg class="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
        </div>
        <input type="text" id="search-navbar" class="block p-2 pl-10 w-11/12 text-gray-900 rounded-lg border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search...">
      </div>
      <ul class="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
        <li>
          <router-link :to="{name:'Home'}">
            <a class="block py-2 pr-4 pl-3 mt-1 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700" aria-current="page"> Home</a>
          </router-link>
        </li>
        <li>
          <router-link :to="{name :'Game'}">
            <a class="block py-2 pr-4 pl-3 mt-1 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Game</a>
          </router-link>
        </li>
        <li>
          <router-link :to="{name:'Chat'}">
            <a  class="block py-2 pr-4 pl-3 mt-1 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Chat</a>
          </router-link>
        </li>
        <li>
            <button v-on:click="show = !show" type="button" class="flex mr-3 text-sm bg-neutral-500 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false"  data-dropdown-toggle="dropdown">
            <img class="w-8 h-8 rounded-full" src="../assets/user.png" alt="">
            <div v-if="show" class=" z-10 bg-neutral-500 rounded-md shadow-xl lg:absolute top-11 right-0 w-44 absolute">
              <router-link  to="/Profile" class="block px-4 py-2 text-sm text-indigo-100 hover:bg-neutral-700 hover:text-indigo-100 border-b border-neutral-600">Profile </router-link> 
              <button type="button" v-on:click="toggleModal()" class="w-44 block px-4 py-2 text-sm text-indigo-100 hover:bg-neutral-700 hover:text-indigo-100  border-b border-neutral-600">Settings
              </button>
              <router-link to="/" class=" block px-4 py-2 text-sm text-indigo-100 hover:bg-neutral-700 hover:text-indigo-100">Log Out</router-link>
            </div>
          </button>
        </li>
      </ul>
    </div>
  <!--  -->
  </div>
  <div v-if="showModal" class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center ">
    <div class="relative w-auto my-6 mx-auto max-w-sm text-center">
          <!--content-->
      <div class="border-0 rounded-lg shadow-lg  relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <!--header-->
        <div class=" p-5 border-b border-solid border-slate-200 rounded-t">
          <h3 class=" m-auto absolute font-semibold">Settings </h3>
        </div>
        <div class="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
          <button class="text-red-500 bg-transparent border border-solid border-red-500 hover:bg-red-500 hover:text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" v-on:click="toggleModal()">
            Close
          </button>
          <button class="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" v-on:click="toggleModal()">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  </div>
</nav>

</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Settings from './Settings.vue'
export default defineComponent({
  name: 'navbar',
  components: {
    Settings
  },
  data() {
    return {
      showModal: false
    }
  },
  methods: {
    toggleModal: function(){
      this.showModal = !this.showModal;
    }
  },
  setup(){
      let showMenu = ref(false);
      let show = ref(false);
      const toggleNav = () => (showMenu.value = !showMenu.value);
      return { showMenu, show, toggleNav };
  },
});
</script>