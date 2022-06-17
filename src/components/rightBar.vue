<template>
    <div class="Container bg-slate-800  ">
       <div class=" h-screen">
          <div class="text-center items-center justify-center mx-auto">
                <!--  ****** private msg ********* -->
              <img  v-if="usersInfo(name)" :src="usersInfo(name).pdp" class="mx-auto w-24 h-24 mt-8 rounded-full" >
              <div v-if="usersInfo(name)" class="font-bold text-2xl text-gray-400 mt-4 "> {{ name }} </div>
          </div> 
          <!--   ******* private msg ******** -->
          <div class="flex mt-16 flex justify-start items-center text-gray-400 font-bold">
            <img src="../assets/viewProfile.png" class="cursor-pointer rounded-full h-24 -ml-4 w-24" alt="">
            <router-link :to="{ name:'User', params: {username: name}}"> 
                <p class="-ml-4 cursor-pointer hover:underline"> View profile</p>
            </router-link>
          </div>
          <div class="-mt-8 flex justify-start items-center text-gray-400 font-bold">
            <img src="../assets/invite.png" class="-ml-4 h-24 cursor-pointer" alt="">
            <p class="-ml-4 cursor-pointer hover:underline"> Invite to play game</p>
          </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import {inject, ref} from 'vue';
    const store = inject('store')
    const props = defineProps({
        name: String
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