
<template>
  <router-view/>
</template>
<script lang="ts" setup>
  import { defineComponent, onMounted, provide, ref } from "vue";
  import store from './store'
  import { io, Socket } from 'socket.io-client';

  let socket = ref(null as unknown);

  provide('store', store);
  onMounted(() => {
    socket.value = io('http://localhost' + ':3001/connect', {
      path: '/user/connected',
      query: {
        'accessToken': localStorage.getItem('user'),
      },
    });

    (socket.value as Socket).on("connected", (data) => {
      console.log('connectedUsers: ', data.connectedUsers);
    });

  });


</script>

<style lang="sass">
@import "./Styles/container.sass"
</style>
