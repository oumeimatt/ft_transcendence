<template>

	<Header /> 
	<div v-if="store.state.player.status == 'online'" class="Container">
	    <div class="grid grid-cols-6 gap-px  ">
	    	<chatnavbar />
	    </div>
	</div>
</template>

<script lang="ts" setup>
    import { inject, provide, ref} from 'vue';
    import Header from '../components/Header.vue';
    import Footer from '../components/Footer.vue';
    import chatnavbar from '../components/chatnavbar.vue'
    const store = inject('store')

</script>
