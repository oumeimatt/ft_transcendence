<template>
    <Header /> 
  <div v-if="store.state.player.status == 'online'" class="Container">
    <div class="grid grid-cols-6 gap-px ">
      <chatnavbar/>
      <conversationRoom :name="name"/>
      <membersBar :name="name" :editRoom="false"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { inject, ref} from 'vue';
import Header  from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import chatnavbar from '../components/chatnavbar.vue'
import membersBar from '../components/membersBar.vue'
import conversationRoom from '../components/conversationRoom.vue'

const props = defineProps({
    name: String,
    editRoom: Boolean
})
const store = inject('store')
const channelName = ref('')

</script>
