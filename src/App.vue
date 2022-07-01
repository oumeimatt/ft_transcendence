
<template>
  <router-view/>
</template>
<script lang="ts">
  import { defineComponent, provide } from "vue";
  import store from './store'

  export default defineComponent({
    name: 'App',
    setup () {
      provide('store', store)
    }
  });
</script>
