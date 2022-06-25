<template>
  <div>
    <Header /> 
    <div class="mt-24 text-center text-gray-200 text-2xl font-bold mb-2">
      <h1> Select difficulty</h1>
    </div>
    <div class="grid grid-rows-3 gap-y-2 text-center ">
      <div class="mt-4"> 
        <button class="bg-slate-300 w-4/12 h-small rounded text-xl font-bold hover:bg-slate-700 hover:ring-white ring-2  hover:text-gray-100">
          Easy
        </button>
      </div>
      <div class="mt-4"> 
        <button class="bg-slate-400 w-4/12 h-small rounded text-xl font-bold hover:bg-slate-700 hover:ring-white ring-2  hover:text-gray-100">
          Medium
        </button>
      </div>
      <div class="mt-4"> 
        <button class="bg-slate-500 w-4/12 h-small rounded text-xl font-bold hover:bg-slate-700 hover:ring-white ring-2  hover:text-gray-100">
          Hard
        </button>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script lang="ts" setup>
// import { defineComponent} from 'vue';
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';


</script>