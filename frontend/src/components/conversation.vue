<template>
		<div id="folio" class="col-span-4 md:col-span-4 lg:col-span-5 h-screen rounded border-r border-myblue border-r ">
				<div v-if="store.methods.usersInfo(name)" class="relative h-small bg-myblue rounded space-x-12">
					<img :src="store.methods.playerAvatar(store.methods.usersInfo(name))" class=" absolute bg-white rounded-full left-4 h-12 w-12 bottom-2/4 translate-y-2/4 " alt="">
					<h1  class="absolute font-bold text-2xl left-6 text-gray-400 bottom-2/4 translate-y-2/4"> {{ store.methods.usersInfo(name).username}}  </h1>
					<svg @click="showMenu = !showMenu" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 cursor-pointer absolute right-2 top-1/4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  						<path stroke-linecap="round" stroke-linejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
					</svg>
					<div v-if="showMenu" id="dropdownLeft" class="z-10 absolute right-8 top-2 divide-y divide-gray-100 rounded shadow w-44 bg-slate-800">
						<ul class="py-1 text-sm text-gray-700 text-gray-200" aria-labelledby="dropdownLeftButton">
						<li>
							<router-link :to="{ name:'User', params: {id: store.methods.usersInfo(name).id}}" class="block px-4 py-2 hover:bg-gray-100 cursor-pointer hover:bg-gray-600 hover:text-white">Profile </router-link>
						</li>
						<li>
							<a href="#" @click="inviteFriend(store.methods.usersInfo(name).id)" class="block px-4 py-2 hover:bg-gray-100 hover:bg-gray-600 hover:text-white">Invite to play game</a>
						</li>
						<li>
							<a href="#" class="block px-4 py-2 hover:bg-gray-100 hover:bg-gray-600 hover:text-white">Block</a>
						</li>
						</ul>
					</div>
				</div>
				<div class="rounded-lg max-h-4/5 h-full scrollbar scrollbar-track-zinc-900 scrollbar-thumb-zinc-600 ">
					<div>
						<div class="w-full">
							<div class="relative w-full p-6 overflow-y-auto">
								<ul v-for="message in store.state.messages" :key="message" class="space-y-2">
                                    <li v-if="message.playerid == store.methods.usersInfo(name).id" class="flex justify-start items-center space-x-4">
                                            <img :src="store.methods.playerAvatar(store.methods.usersInfo(name))" class="h-10 w-10 rounded-full bg-white " alt="">
                                            <div class="relative max-w-xl px-4 py-2 bg-slate-600 text-gray-300 rounded-full shadow">
                                                <span class="block"> {{ message.content }} </span>
                                            </div>
                                    </li>
                                    <li v-else-if="message.playerid == store.state.player.id" class="flex justify-end">
                                        <div class="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-200 rounded-full shadow">
                                                <span class="block"> {{ message.content }} </span>
                                        </div>
                                    </li>
                                </ul>
							</div>
						</div>
					</div>
				</div>
				<div class=" h-small rounded relative mt-12">
					<div class="flex items-center justify-between  w-full p-3 border-t border-gray-800 ">
						<input v-model="store.state.message" type="text" placeholder="Message"
							class="block h-3/6 w-full bottom-2/4 translate-y-2/4 py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
							name="message" required />
							<button @click="sendMessage(store.methods.usersInfo(name).id)" type="submit">
								<svg class="w-6 h-6 text-gray-500 bottom-2/4 translate-y-3/4 origin-center transform rotate-90" xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20" fill="currentColor">
									<path
										d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
								</svg>
							</button>
					</div>
				</div>
		</div>
</template>

<script lang="ts" setup>
	import {inject, onMounted, ref} from 'vue';
	const store = inject('store')
	import axios from 'axios';
    const props = defineProps <{
            name: string,
			// id: string
	}>()

	function sendMessage(Id: any){
		let messageDto={ id : Id , content : store.state.message};
		console.log("dto",messageDto);
		store.state.connection.emit("send-DM", messageDto);
	}
	const showMenu = ref(false)
	const rightClick = () => (
		showMenu.value = true
	);

	function inviteFriend(friendid:number){
		console.log('Invite friend called ' + friendid);
		//check if the user is online or offline
		store.state.connection.emit('invite-game', friendid);
	}

	
	// store.state.connection.on("sendMessage", (data) => {messages = data;});
	//  onMounted(async () => {
	// 	await axios
    //       .get('http://localhost:3001/users' ,{ withCredentials: true })
    //       .then(data =>{ store.state.users = data.data ; console.log(store.state.users)})
    //       .catch(err => console.log(err.message))
	// 	id.value = store.methods.usersInfo(props.name).id
	// 	console.log(" [ value] "+id.value)
	// // 	function CreateDM(){
	// // 	store.state.connection.emit("create-DM", id.value); //

	// // }
	// })

</script>

<style>
	#folio {
		background-image: radial-gradient(#1c579b 0.5px, transparent 0.5px);
		background-size: 39px 39px;
		background-color:#0f172a;
	}
</style>