<template>
	<div>
		<navbar /> 

		<!-- <div class=" ml-20 mr-20 mb-100"> -->
		<div class="Container"> 
			<div id="container2" class=" relative mb-11 text-white">
			 <!-- {{ props.nickname }} -->
			 <div class="flex absolute top-48 left-5 items-center">

					<img class="w-36 md:w-40 lg:w-40 mr-7 rounded-full lg:top-52 left-11" :src="store.state.profile.pdp" alt="">
					<div class="  font-semibold text-3xl  text-gray-400 "> {{ store.state.profile.name }} </div>
			 </div>
			</div> 
			
			<div class="flex  my-0 mx-auto  md:w-3/5 lg:w-3/5 bg-slate-500 h-6 mb-6 relative">
				<div class="bg-slate-700 h-6 " style="width: 25%"> </div>
				<p class="inline-block z-10 absolute left-2/4 -translate-x-2/4 text-slate-400" > level 0 - 25%  </p>
			</div>
			<div class="cent pt-8 ">
				<div class="grid md:grid-cols-1 lg:grid-cols-1 gap-1 lg-gap-1  text-center   mt-8" >
					<div class="p-4 bg-slate-500 rounded-md " > 
						<p class="text-2xl font-semibold pb-4"> Friends </p>
						<div  class="pt-4 border-t border-neutral-800 flex items-scretch space-x-2">
                            <div v-for="friend in store.state.profile.friends" :key="friend">
							    <router-link  :to="{ name:'User', params: {username: friend}}"> <img v-if="usersInfo(friend)" :src="usersInfo(friend).pdp" class="w-10 h-10 rounded-full"> </router-link>
                            </div>
						</div>
					</div>
				</div>
				<div class="grid md:grid-cols-2 lg:grid-cols-2 gap-2 lg-gap-2 text-center  mt-8" >
					<div class="p-4 bg-slate-500 rounded-md " > 
						<p class="text-2xl font-semibold pb-4 border-b border-neutral-800"> Achievements </p>
						<div v-if="store.state.profile.achievements"> 
							<!-- acheivement -->
                            <div v-for="achievement in store.state.profile.achievements" :key="achievement">
							    <div v-if="achievement=='first'" class="grid grid-cols-8 justify-items-start bg-slate-500 pt-4">
							    	<div class="place-self-start" > <img src="../assets/medal.png" class="w-10 h-10"></div>
							    	<div class="col-span-7"> <span class="pr-6 text-xl  font-semibold text-slate-900"> First game</span>     <span class="text-s font-semibold text-neutral-900" > Congratulations ! You won your first Game! </span> </div>
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
							<!--  -->
						</div>
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
    import { defineComponent , ref, inject, onMounted } from 'vue';
    import Footer from '../components/Footer.vue';
    import navbar from '../components/navbar.vue'
    const store = inject('store')

    function usersInfo(name: string){
        for (var user of store.state.users) {
            if (user.name == name){
                return user
            }
        }
        return null
    }
</script>

<style>
	#container2 {
		background-image: url("../assets/cover.png");
		background-attachment: scroll;
		height: 300px;
		background-size: cover;
	}

		/* div */
	/* display: flex;
		align-items: center;
		position: absolute;
		bottom: -38px;
		left: 22px; */
	/* img
	mr-27px */

</style>