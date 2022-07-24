<template>
	<Header/>
	<div class="Container">
		<div v-for="gameroom in gameRooms" :key="gameroom.roomname" class="flex flex-col text-center items-center">
			<div class="mt-8 text-xl md:text-2xl font-bold text-gray-400">
					<span> {{ gameroom.player1 }} </span>  <span class="ml-4 mr-4 text-gray-100 text-2xl md:text-3xl"> X </span>  <span> {{ gameroom.player2 }} </span>
			</div>
			<div class="mt-8 text-xl md:text-2xl font-bold text-gray-400">
					<span> Mode: {{ gameroom.difficulty }} </span>
			</div>
			<router-link class="mt-4 mb-8 w-9/12 h-9/12 md:w-6/12 md:h-4/12" :to="{name: 'Stream', params: { difficulty: gameroom.difficulty, roomname: gameroom.roomname }}">
				<img src="../assets/bg1.jpg" alt="">
			</router-link>
		</div>
		<div v-if="gameRooms.length === 0">
        <div class="mt-24 text-center text-gray-200 text-2xl font-bold mb-2">
				<h1>No Games In Play Now</h1>
			</div>
			<div class="grid grid-rows-2 content-center gap-y-2 text-center "> 
				<router-link class="mt-4 cursor-pointer mx-auto bg-slate-400 w-4/12 pt-2 h-12 rounded text-xl font-bold hover:bg-slate-700 hover:ring-white ring-2  hover:text-gray-100" :to="{name: 'Home'}">
				Back Home
				</router-link>
			</div>
		</div>
		<div v-if="errors !== ''">{{ errors }}</div>
	</div>
</template>

<script lang="ts" setup>
import { inject, onMounted, onUnmounted, provide, ref} from 'vue';
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import chatnavbar from '../components/chatnavbar.vue'
import conversation from '../components/conversation.vue'
import { GameRoom } from '../interfaces';
import axios from 'axios';
	const store = inject('store')

	const n = ref([4])

	let gameRooms = ref([] as GameRoom[]);
	let errors = ref('' as string)
	let timer = ref(null as unknown);

onMounted(async ()=> {
	fetchGamesRooms();
	timer.value = setInterval(fetchGamesRooms, 5000);
});

onUnmounted(() => {
	clearInterval(timer.value as number);
});

async function fetchGamesRooms() {
	axios
	.get('http://localhost:3001/pong-game/games-rooms/')
	.then((data) => { 
			gameRooms.value = data.data.gamesRooms;
	})
	.catch(err => {
		errors.value = err.message ?? 'unknown';
	});
}

</script>
