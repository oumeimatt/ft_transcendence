<template>
    <div v-if="store.state.spinn == true">
          <LoadingBar :start="store.state.spinn" />
    </div>
	<Header /> 
	<div v-if="store.state.player.status != 'offline'" class="Container">
	    <div class="grid grid-cols-6 gap-px  ">
	    	<chatnavbar />
            <!-- <div class="bg-white text-black font-bold"> {{name }} {{ id }}</div> -->

	    	<conversation v-if="name" :name="name" />
	    </div>
	</div>
</template>

<script lang="ts" setup>
    import { inject, provide, ref} from 'vue';
    import Header from '../components/Header.vue';
    import Footer from '../components/Footer.vue';
    import chatnavbar from '../components/chatnavbar.vue'
    import conversation from '../components/conversation.vue'
    import LoadingBar from '../components/LoadingBar.vue'
    const props = defineProps <{
            name: string,
			// id: string
	}>()
    const store = inject('store')
    const channelName = ref('')

    
    
</script>
