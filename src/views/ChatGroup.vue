<template>
  <div >
    <navbar/> 
    <div class="grid grid-cols-6 gap-px bg-gray-900 ">
      <chatnavbar/>
      <conversationGroup :name="name"/>
      <rightbarGroup :name="name" :editRoom="false"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { inject, ref} from 'vue';
import navbar from '../components/navbar.vue';
import Footer from '../components/Footer.vue';
import chatnavbar from '../components/chatnavbar.vue'
import rightbarGroup from '../components/rightbarGroup.vue'
import conversationGroup from '../components/conversationGroup.vue'

const props = defineProps({
    name: String,
    editRoom: Boolean
})
const store = inject('store')
const channelName = ref('')

</script>
