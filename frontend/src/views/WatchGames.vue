<template>

	<Header /> 
	<div v-if="store.state.player.status == 'online'" class="Container">
        <div class="flex space-between-x-2">
            <div class="mt-12 bg-white w-5/12 h-5/12" > 
                <img src="../assets/bg.jpg" alt="">
            </div>
            <div class="mt-12  bg-white w-5/12 h-5/12" > 
                <img src="../assets/bg.jpg" alt="">
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
