<template>
  <div>
    <navbar />
    <h1 class="text-gray-400"> game page</h1>
  </div>
  <footer />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import navbar from '../components/navbar.vue';
import Footer from '../components/Footer.vue';
export default defineComponent({
  name: 'Game',
  components: {
    navbar,
    Footer
  }
});
</script>