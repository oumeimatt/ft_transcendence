<template>

<div v-if="store.state.player.status == 'offline'">
    <Signin />
  </div>
<div v-else>
  <nav class="sticky top-0 z-50 border-gray-200 px-2 sm:px-4 py-2.5 rounded  bg-slate-900 ">
    <div class="container flex justify-between items-center mx-auto">
  <!-- logo -->
      <a class="flex items-center"> 
        <router-link :to="{name:'Home'}">
          <img src="../assets/pong.png" class="mr-3 h-6 sm:h-9 " alt="" />
        </router-link>
        <router-link :to="{name:'Home'}">
          <span class="self-center text-xl font-semibold md:whitespace-nowrap text-gray-300"> <span class="logo">YDA PONG </span></span>
        </router-link>
      </a>
  <!--  -->
  <!-- search navbar -->
      <div class="flex md:order-1">
        <div class="hidden relative md:block w-80">
          <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <svg class="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
          </div>
          <input type="text" onfocus="this.value=''" id="search-navbar" class=" block p-2 pl-10 w-full bg-slate-700 rounded-xl border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500 border-gray-600 placeholder-gray-400 text-gray-300  focus:ring-blue-500 focus:border-blue-500" placeholder="Search..." v-model="search">
            <div v-if="showSugg() == true"> 
              <div v-for="user in matchingNames" :key="user" class=" z-10 bg-slate-700 rounded-md shadow-xl lg:absolute top-11  w-full absolute">
                <div v-if="user != store.state.player.username">
                  <router-link  :to="{ name:'User', params: {id: store.methods.usersInfo()}}"> 
                    <div class="block px-4 py-2 text-sm text-indigo-100 hover:bg-slate-500 hover:text-indigo-100 border-b border-neutral-600">
                      {{ user }} </div>
                  </router-link>
                </div>
                <div v-else>
                  <router-link :to="{name:'profile'}">
                  <div class="block px-4 py-2 text-sm text-indigo-100 hover:bg-slate-500 hover:text-indigo-100 border-b border-neutral-600">
                    {{ user }} </div>
                </router-link>

                </div>
                
              </div>
            </div>
        </div>        

      </div>
      
  <!--  -->
  <!-- home chat game user -->
      <div class="justify-between items-center w-full flex  w-auto order-1 relative">
        <ul class="flex mt-4 flex-nowrap flex-row  mt-0 space-x-4 text-sm font-medium">
          <li>
            <router-link :to="{name:'Home'}">
              <a class="block py-2  pl-3 mt-1 border-0 p-0 hover:text-white text-gray-300  hover:bg-transparent border-gray-700" aria-current="page"> Home</a>
            </router-link>
          </li>
          <li>
            <router-link :to="{name :'Game'}">
              <a class="block py-2  pl-3 mt-1 border-0 p-0 hover:text-white text-gray-300  hover:bg-transparent border-gray-700">Game</a>
            </router-link>
          </li>
          <li>
            <router-link :to="{name:'Chat' , params: {name: 'framdani'}}">
              <a  class="block py-2  pl-3 mt-1 pr-4  border-0 p-0 text-gray-300 hover:text-white hover:bg-transparent border-gray-700">Chat</a>
            </router-link>
          </li>
          <li>
              <button @click="show = !show" type="button" class="translate-y-1/4 bottom-2/4  flex mr-3 text-sm rounded-full md:mr-0 focus:ring-2 focus:ring-gray-300 focus:ring-gray-600"   data-dropdown-toggle="dropdown">
              <img class="w-8 h-8 rounded-full bg-white " :src="store.state.player.avatar" alt="">
              <div v-if="show" class=" z-10 bg-slate-700 rounded-md shadow-xl lg:absolute top-11 right-0 w-44 absolute">
                <router-link  to="/Profile" class="block px-4 py-2 text-sm text-indigo-100 hover:bg-slate-500 hover:text-indigo-100 border-b border-slate-800">
                  Profile </router-link> 
                <button type="button" @click="toggleModal()" class="w-44 block px-4 py-2 text-sm text-indigo-100 hover:bg-slate-500 hover:text-indigo-100  border-b border-slate-800">Settings
                </button>
                <button @click="store.methods.logout" type="button" class=" w-44 block px-4 py-2 text-sm text-indigo-100 hover:bg-slate-500 hover:text-indigo-100  ">Logout</button>
              </div>
            </button>
          </li>
        </ul>
      </div>
    <!--  -->
    </div>
    <div v-if="showModal" class="fixed inset-60 z-50 ">
      <div class=" my-6 mx-auto max-w-sm text-center ">
        <div class="border-0 rounded-lg shadow-lg w-full bg-white  ">
          <div class=" p-5 border-b border-solid border-slate-200 rounded-t">
            <h3 class=" m-auto font-semibold text-xl">Settings </h3>
          </div>
          <div class=" grid gap-3 grid-cols-1  p-6 border-t border-solid border-slate-200 rounded-b">
            <button v-on:click="showChangeName = !showChangeName" class="pb-4 border-b text-gray-800 font-semibold" >Change Username</button> 
                <div v-if="showChangeName" class="border-b p-2 pb-4 space-x-4">
                  <span class="text-s "> Username :</span>
                  <input v-model="nickname" placeholder="max 10 letters" class=" border border-solid rounded" > 
                </div>
            <button v-on:click="showChangeAv = !showChangeAv" class="p-2 pb-4 border-b font-semibold text-gray-800">Change Avatar</button>
              <div v-if="showChangeAv" class="border-b p-2 pb-4 space-x-4 w-full">
                <input type="file" accept="image/*" @change="onChange" class=" border border-solid rounded" > 
              </div>
              <button v-on:click="show2f = !show2f" class="pt-2 font-semibold text-gray-800">2FA Authentication</button>
                <div v-if="show2f" class="border-t p-2 space-x-4">
                  You have not activated 2FA. <a  class="text-xs text-teal-700" href="https://authy.com/what-is-2fa/" target="_blank"> What is 2FA Authentication ? </a>
                  <button class="bg-neutral-300 rounded p-2 hover:bg-black hover:text-white"> Activate 2FA Authentication </button>              
                </div>
          </div>
          <div class="flex items-center justify-center space-x-8  p-6 border-t border-solid border-slate-200 rounded-b">
            <button class="text-gray-800 border border-solid white hover:bg-slate-800 hover:text-white  font-bold uppercase text-sm px-6 py-3 rounded outline-none    " type="button" v-on:click="toggleModal()">
              Close
            </button>
            <button @click="store.methods.changeNickname(nickname)" class="text-gray-800 font-bold hover:border hover:rounded hover:border-solid hover:white hover:text-white hover:bg-slate-800 uppercase px-6 py-3 text-sm outline-none    " type="button" v-on:click="toggleModal()">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>

</div>
</template>

<script lang="ts" setup>
    import axios from 'axios';
import { defineComponent ,  computed, ref, inject, onMounted } from 'vue';
    import Signin from '../views/Signin.vue'
    const store = inject('store')

    const showMenu = ref(false);
    const show = ref(false);
    const showModal = ref(false)
    const showChangeName= ref(false)
    const showChangeAv = ref(false)
    const show2f = ref(false)
    const showSearch = ref(false)
    const toggleNav = () => (showMenu.value = !showMenu.value);
    const toggleModal = () => (showModal.value = !showModal.value)
    const search = ref('search...')
    function showSugg(){
      if (this.search == '' || this.search == "search...")
        return false
      return true
    }
    onMounted(async  () => {
      await axios
          .get('http://localhost:3001/profile' ,{ withCredentials: true })
          .then(data =>{ store.state.player = data.data.profile} ) 
          .catch(err => console.log(err.message))
      await axios
          .get('http://localhost:3001/users' ,{ withCredentials: true })
          .then(data =>{ store.state.users = data.data.users} ) 
          .catch(err => console.log(err.message))

      // await fetch('http://localhost:3001/profile') 
			//     .then(res => res.json())
			//     .then(data => store.state.player = data)
			//     .catch(err => console.log(err.message))
      // await fetch('http://localhost:3001/users') 
			//     .then(res => res.json())
			//     .then(data => store.state.users = data)
			//     .catch(err => console.log(err.message)) 
    })

    const image = ref(null)

    function onChange(e){
      const file = e.target.files[0]
      image.value = file
      store.state.imageUrl = URL.createObjectURL(file)
      console.log(store.state.imageUrl)
    }


    const matchingNames = computed(() => {
      const a=[]
      store.state.users.forEach(user => {
        a.push(user.username)
      });
      return a.filter((name) => name.startsWith(search.value))
    })




</script>
