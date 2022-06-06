<template>
  <div>
    <navbar/> 
    <h1 class="text-gray-400"> Chat page</h1>
  </div>
  <footer />
</template>

<script lang="ts" setup>
import { defineComponent , inject} from 'vue';
import navbar from '../components/navbar.vue';
import Footer from '../components/Footer.vue';
const store = inject('store')

</script>