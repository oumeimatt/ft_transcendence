
<template>
  <router-view/>
</template>
<script lang="ts" setup>
  import { defineComponent, onMounted, provide, ref } from "vue";
  import store from './store'
  import { io, Socket } from 'socket.io-client';

  let socket = ref(null as unknown);

  // export default defineComponent({
  //   name: 'App',
  //   setup () {
      provide('store', store);
  //   },
  // });
  onMounted(() => {
    socket.value = io('http://localhost' + ':3001/connect', {
    query: {
        'accessToken': localStorage.getItem('user'),
      },
    });
  });
</script>
