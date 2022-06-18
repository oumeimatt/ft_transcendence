<template>
	<div >
		<navbar/> 
		<div class="grid grid-cols-6 gap-px bg-gray-900 ">
			<chatnavbar />
			<conversation :name="name" />
			<rightBar :name="name" />
		</div>
	</div>
</template>

<script lang="ts" setup>
    import { inject,provide, ref} from 'vue';
    import navbar from '../components/navbar.vue';
    import Footer from '../components/Footer.vue';
    import chatnavbar from '../components/chatnavbar.vue'
    import rightBar from '../components/rightBar.vue'
    import conversation from '../components/conversation.vue'
    const props = defineProps({
            name: String
    })
    const store = inject('store')
    const channelName = ref('')

</script>
