<template>

	<Header /> 
	<div v-if="store.state.logged" class="Container">
	    <div class="grid grid-cols-6 gap-px  ">
	    	<chatnavbar />
	    	<conversation :name="name" />
	    </div>
	</div>
</template>

<script lang="ts" setup>
    import { inject, provide, ref} from 'vue';
    import Header from '../components/Header.vue';
    import Footer from '../components/Footer.vue';
    import chatnavbar from '../components/chatnavbar.vue'
    import conversation from '../components/conversation.vue'
    const props = defineProps({
            name: String
    })
    const store = inject('store')
    const channelName = ref('')

</script>
