<template>
  <div class="bg-black">
    <navbar/> 
    <div class="grid grid-cols-6 gap-px bg-black ">
      <chatnavbar/>
      <div class="col-span-4 bg-black">

      </div>
      <div class=" mt-20">

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