<template>
  <div >
    <navbar/> 
    <div class="grid grid-cols-6 gap-px bg-gray-900 ">
      <chatnavbar/>
      <conversationGroup />
      <rightbarGroup />
    </div>
  </div>
  <Footer />
</template>

<script lang="ts" setup>
import { inject, ref} from 'vue';
import navbar from '../components/navbar.vue';
import Footer from '../components/Footer.vue';
import chatnavbar from '../components/chatnavbar.vue'
import rightbarGroup from '../components/rightbarGroup.vue'
import conversationGroup from '../components/conversationGroup.vue'

const store = inject('store')
const channelName = ref('')

</script>
