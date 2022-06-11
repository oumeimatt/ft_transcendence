<template>
  <div class="bg-black">
    <navbar/> 
    <div class="grid grid-cols-4 gap-px bg-black h-screen ">
      <chatnavbar/>
      <div class="col-span-2 bg-black">

      </div>
      <div class="bg-black">

      </div>
    </div>

  </div>
  <Footer />
</template>

<script lang="ts" setup>
import { inject, ref} from 'vue';
import navbar from '../components/navbar.vue';
import Footer from '../components/Footer.vue';
import chatnavbar from '../components/chatnavbar.vue'
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