<template>
	<Header/>
	<div v-if="store.state.player.status == 'online'" class="Container">
        <div class="flex flex-col text-center items-center">
            <div class="mt-8 text-xl md:text-2xl font-bold text-gray-400">
                <span> oel-yous </span>  <span class="ml-4 mr-4 text-gray-100 text-2xl md:text-3xl"> X </span>  <span> mlachheb </span> 
            </div>  
            <div class="mt-4 mb-8 w-9/12 h-9/12 md:w-8/12 md:h-6/12" > 
                <img src="../assets/bg1.jpg" alt="">
            </div>
        </div>
	</div>
</template>

<script lang="ts" setup>
    import { inject, provide, ref} from 'vue';
    import Header from '../components/Header.vue';
    import Footer from '../components/Footer.vue';
    import chatnavbar from '../components/chatnavbar.vue'
    import conversation from '../components/conversation.vue'
    const store = inject('store')

    const n = ref([4])

</script>
