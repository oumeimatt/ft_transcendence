<template>
	<div>
		<Header /> 
		<div  v-if="store.state.player.status == 'online'" class="Container"> 
			<div id="bg" class=" relative mb-11 text-white">
			 	<div class="flex absolute top-48 left-5 items-center">
					<img class="w-36 h-36 md:w-40 md:h-40 bg-white  lg:h-40 lg:w-40 mr-7 rounded-full lg:top-52 left-11" :src="store.methods.playerAvatar(store.state.player)" alt="">
					<div class="  font-semibold text-3xl  text-gray-400 "> {{ store.state.player.username }} </div>
			 	</div>
			</div> 
			<div class="flex  my-0 mx-auto  md:w-3/5 lg:w-3/5 bg-slate-500 h-6 mb-6 relative">
				<div class="bg-slate-700 h-6 " style="width: 0"> </div>
				<p class="inline-block z-10 absolute left-2/4 -translate-x-2/4 text-slate-400" > level {{ store.state.player.level}} %  </p>
			</div>
			<div class="cent pt-8 ">
				<div class="grid md:grid-cols-1 lg:grid-cols-1 gap-1 lg-gap-1  text-center   mt-8" >
					<div class="p-4 bg-slate-500 rounded-md " > 
						<p class="text-2xl font-semibold pb-4 border-b border-neutral-800 "> Friends </p>
						<div  class="pt-4 flex items-scretch space-x-2">
                            <div v-for="friend in store.state.friends" :key="friend">
							    <router-link  :to="{ name:'User', params: {id: friend.id}}"> <img :src="store.methods.playerAvatar(friend)" class="w-10 h-10 rounded-full bg-white"> </router-link>
                            </div>
						</div>
					</div>
				</div>
				<div class="grid md:grid-cols-2 lg:grid-cols-2 gap-2 lg-gap-2 text-center  mt-8" >
					<div class="p-4 bg-slate-500 rounded-md " > 
						<p class="text-2xl font-semibold pb-4 border-b border-neutral-800"> Achievements </p>
							<!-- acheivement -->
						<div v-if="store.state.achievements"> 
                            <div v-for="achievement in store.state.achievements" :key="achievement">
							    <div v-if="achievement=='first'" class="grid grid-cols-8 justify-items-start bg-slate-500 pt-4">
                    				<div class="place-self-start" > <img src="../assets/medal.png" class="w-10 h-10"></div>
                    				<div class="col-span-7 pr-10"> <span class="text-xl  font-semibold text-slate-900"> First game </span>     <span class="text-s font-semibold text-neutral-900" > Congratulations ! You won your first Game! </span> </div>
							    </div>
							    <div v-if="achievement=='bronze'" class="grid grid-cols-8 justify-items-start bg-slate-500 pt-4">
							    	<div class="place-self-start" > <img src="../assets/bronze.png" class="w-10 h-10"></div>
							    	<div class="col-span-7"> <span class="text-xl  font-semibold text-slate-900"> Bronze medal </span>     <span class="text-s font-semibold text-neutral-900" > Congratulations ! You won 5 GAMES! </span> </div>
							    </div>
							    <div  v-if="achievement=='silver'" class="grid grid-cols-8 justify-items-start bg-slate-500 pt-4">
							    	<div class="place-self-start" > <img src="../assets/silver.png" class="w-10 h-10"></div>
							    	<div class="col-span-7"> <span class="text-xl  font-semibold text-slate-900"> Silver medal </span>   <span class="text-s font-semibold text-neutral-900" >  Congratulations ! You won 10 GAMES! </span> </div>
							    </div>
							    <div  v-if="achievement=='gold'" class="grid grid-cols-8 justify-items-start bg-slate-500 pt-4">
							    	<div class="place-self-start" > <img src="../assets/gold.png" class="w-10 h-10"></div>
							    	<div class="col-span-7"> <span class="text-xl  font-semibold text-slate-900"> Gold medal </span >  <span class="text-s font-semibold text-neutral-900" > Congratulations ! You won 20 GAMES! </span> </div>
							    </div>
                            </div>
						</div>
							<!--  -->
					</div>
					<div class="p-4 bg-slate-500 rounded-md " > 
						<div > 
							<p class="text-2xl font-semibold pb-4 border-b border-neutral-800  "> Games </p>
							<!-- games  -->
							<div class="grid grid-cols-3 justify-itmes-center pt-4">
								<div class="text-neutral-900 font-semibold "> oel-yous</div>
								<div class="text-gray-900 font-black "> 5 - 2  </div>
								<div class="text-neutral-900 font-semibold "> soepkdsds  </div>
							</div>
							<div class="grid grid-cols-3 justify-itmes-center pt-4">
								<div class="text-neutral-900 font-semibold "> oel-yous</div>
								<div class="text-gray-900 font-black "> 5 - 2  </div>
								<div class="text-neutral-900 font-semibold "> iidzim  </div>
							</div>
							<div class="grid grid-cols-3 justify-itmes-center pt-4">
								<div class="text-neutral-900 font-semibold "> oel-yous</div>
								<div class="text-gray-900 font-black "> 5 - 2  </div>
								<div class="text-neutral-900 font-semibold "> framdani  </div>
							</div>
							<div class="grid grid-cols-3 justify-itmes-center pt-4">
								<div class="text-neutral-900 font-semibold "> oel-yous</div>
								<div class="text-gray-900 font-black "> 5 - 2  </div>
								<div class="text-neutral-900 font-semibold "> dkkdkksm  </div>
							</div>
							<div class="grid grid-cols-3 justify-itmes-center pt-4">
								<div class="text-neutral-900 font-semibold "> oel-yous</div>
								<div class="text-gray-900 font-black "> 5 - 2  </div>
								<div class="text-neutral-900 font-semibold "> ndjbjdjds  </div>
							</div>
							<!--  -->
						</div>
					</div>
				</div>

			</div>
	
		<!-- </div> -->
	</div> 
	</div>
	<Footer />
</template>

<script lang="ts" setup>
    import axios from 'axios';
import { defineComponent , ref, inject, onMounted, onUpdated } from 'vue';
    import Footer from '../components/Footer.vue';
    import Header from '../components/Header.vue'
    const store = inject('store')
	const addFriend = ref(false)
	let gamesHistory = ref([] as unknown);
	let errors = ref('' as string)

    onMounted(() => {
        getGamesHistory(store.state.player.id);
    })

	function getUserAvatar(id: number){
      var result = store.state.users.find( x=> x.id === id)
      return store.methods.playerAvatar(result)
    }

	// function to get history of a player
	async function getGamesHistory(id: number) {
		axios
		.get('http://localhost:3001/pong-game/games-history/' + id)
		.then((data) => {
			gamesHistory.value = data.data.gamesHistory;
		})
		.catch(err => {
			errors.value = err.message ?? 'unknown';
		});
	}

</script>

<style scoped>
	#bg {
		background-image: url("../assets/cover.png");
		background-attachment: scroll;
		height: 300px;
		background-size: cover;
	}

</style>