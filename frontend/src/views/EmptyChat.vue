<template>

	<Header />
	<div v-if="store.state.player.status == 'online'" class="Container">
	    <div class="grid grid-cols-6 gap-px  ">
	    	<chatnavbar />
			<div id="bg">

			</div>
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
 <style scoped>
   #bg {
    background: url("../assets/") no-repeat;
    /* background-image: url("../assets/bg1.jpg"); */
    width: 80vw;
    height: 80vh;
    /* background-size: contain; */
    background-size: cover;
  }
 </style>