<template>
    <div class="container bg-slate-800  ">
       <div class=" h-screen">
          <div class="text-center items-center justify-center mx-auto">
                <!--  ****** private msg ********* -->
              <img src="../assets/framdani.jpeg" class="mx-auto w-24 h-24 mt-8 rounded-full" >
              <div class="font-bold text-2xl text-gray-400 mt-4 "> framdani </div>
          </div> 
          <!--   ******* private msg ******** -->
          <div class="flex mt-16 flex justify-start items-center text-gray-400 font-bold">
            <img src="../assets/viewProfile.png" class="cursor-pointer rounded-full h-24 -ml-4 w-24" alt="">
            <p class="-ml-4 cursor-pointer"> View profile</p>
          </div>
          <div class=" flex justify-start items-center text-gray-400 font-bold">
            <img src="../assets/invite.png" class="-ml-4 h-24 cursor-pointer" alt="">
            <p class="-ml-4 cursor-pointer"> Invite to play game</p>
          </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import {inject, ref} from 'vue';
const store = inject('store')

</script>