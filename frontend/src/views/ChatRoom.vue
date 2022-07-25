<template>
    <Header /> 
  <div v-if="store.state.player.status != 'offline'" class="Container">
    <div class="grid grid-cols-6 gap-px ">
      <chatnavbar/>
      <!-- <div> {{ isMember }}}</div> -->
      <conversationRoom v-if="name && id && isPublic" :name="name" :id="id" :isPublic="isPublic" />
      <membersBar v-if="name && id && isPublic " :name="name" :id="id" :isPublic="isPublic" />
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
    id: String,
    isPublic: String,
})
const store = inject('store')
const channelName = ref('')

</script>
