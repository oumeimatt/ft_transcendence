<template>
  <div >
    <navbar/> 
    <div class="grid grid-cols-6 gap-px bg-gray-900 ">
      <chatnavbar/>
      <conversation />

      <rightBar />
    </div>
  </div>
  <Footer />
</template>

<script lang="ts" setup>
import { inject, ref} from 'vue';
import navbar from '../components/navbar.vue';
import Footer from '../components/Footer.vue';
import chatnavbar from '../components/chatnavbar.vue'
import rightBar from '../components/rightBar.vue'
import conversation from '../components/conversation.vue'

const store = inject('store')
const channelName = ref('')
const Select = ref(false)
 const showSelect = () => (Select.value = !Select.value);

</script>

<style>
.scrollable-element {
  scrollbar-color: red yellow; /* red is for the thumb and yellow is for the track */
}
  
</style>