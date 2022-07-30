
<template>
  <router-view/>
</template>
<script lang="ts" setup>
  import { defineComponent, inject, onMounted, provide, ref } from "vue";
  import store from './store'
  import { io, Socket } from 'socket.io-client';

  let socketUsers = ref(null as unknown);

  provide('store', store);
  onMounted(() => {
    socketUsers.value = io('http://10.11.1.2:3001/connect', {
      path: '/user/connected',
      query: {
        'accessToken': localStorage.getItem('user'),
      },
    });

    (socketUsers.value as Socket).on("connected", (data) => {
      store.state.connectedUsers = data.connectedUsers;
    });

    (socketUsers.value as Socket).on("disconnected", (data) => {
      store.state.connectedUsers = data.connectedUsers;
    });
  });


</script>

<style lang="sass">
@import "./Styles/container.sass"
</style>
