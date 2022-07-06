<template>
		<div class="Container h-screen bg-myblue col-span-2 md:col-span-2 lg:col-span-1  scrollbar scrollbar-track-zinc-900 scrollbar-thumb-zinc-600 max-h-screen  rounded-lg ">
				<div class="pb-4">
					<button class="mt-8 flex justify-start items-center space-x-2" >
						<svg @click="createRoom" xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 fill-slate-400" viewBox="0 0 20 20">
							<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
						</svg> 
						 <div @click="createRoom" class="text-slate-400 lg:text-xl md:text-base text-sm  font-bold hover:underline "> Create channel </div> 
					</button>
					<button @click="showRooms" class="mt-8 flex justify-start items-center space-x-2" >
						<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 fill-slate-400" fill="none" viewBox="0 0 24 24"  stroke-width="1">
							<path stroke-linecap="round" stroke-linejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
						</svg>
						<p class="text-slate-400 lg:text-xl md:text-base text-sm  font-bold hover:underline"> All channels </p>
					</button>
					<div class="h-5/6 scrollbar mt-4 scrollbar-track-zinc-900 scrollbar-thumb-zinc-600 max-h-2/5 ">
						<!--<div v-if="showAllRooms" >
							<div v-for="room in store.state.allRooms" :key="room" >
								<div   v-if="room.type == 'private'" class="flex justify-start items-center space-x-2 mt-4"> 
									<svg xmlns="http://www.w3.org/2000/svg" class=" lg:ml-8 h-8 w-8 fill-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
										<path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
									</svg>
									<router-link :to="{name:'ChatRoom', params: {name: room.name}}" class="font-semibold text-slate-400 lg:text-base md:text-sm text-2xl  hover:underline cursor-pointer pl-2 "> {{ room.name }} </router-link> 
								</div>
								<div v-if="room.type == 'public'" class="flex justify-start items-center space-x-2 mt-4"> 
									<img src="../assets/public.png" class="lg:ml-7 h-8 w-10 fill-slate-300" fill="none" viewBox="0 0 24 24">
									<router-link :to="{name:'ChatRoom', params: {name: room.name}}" class="font-bold text-slate-400 hover:underline cursor-pointer pl-1 "> {{ room.name }} </router-link>
								</div>
							</div>
						</div> -->

					</div>
				</div>
				<div class=" mt-8  pb-8  ">
					<h1 class="text-slate-300 font-semibold text-xl  ">My channels</h1>/
					<div class="h-5/6 scrollbar scrollbar-track-zinc-900 scrollbar-thumb-zinc-600 max-h-2/3 ">
						<div v-for="room in store.state.rooms" :key="room" >
							<div @click="store.methods.roomOwner(store.methods.RoomInfo(room.name).owner)" v-if="room.type == 'private'" class="flex justify-start items-center space-x-2 mt-4"> 
								<svg xmlns="http://www.w3.org/2000/svg" class=" lg:ml-8 h-8 w-8 fill-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
									<path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
								</svg>
								<router-link :to="{name:'ChatRoom', params: {name: room.name}}" class="font-semibold text-slate-400 lg:text-base md:text-sm text-2xl  hover:underline cursor-pointer pl-2 "> {{ room.name }} </router-link> 
							</div>
							<div @click="store.methods.roomOwner(store.methods.RoomInfo(room.name).owner)"  v-if="room.type == 'public'" class="flex justify-start items-center space-x-2 mt-4"> 
								<img src="../assets/public.png" class="lg:ml-7 h-8 w-10 fill-slate-300" fill="none" viewBox="0 0 24 24">
								<router-link :to="{name:'ChatRoom', params: {name: room.name}}" class="font-bold text-slate-400 hover:underline cursor-pointer pl-1 "> {{ room.name }} </router-link>
							</div>
						</div>
					</div>
				</div>
				<div class="  mt-8  pb-8  ">
					<h1 class="text-slate-300 font-semibold text-xl mb-6">Friends</h1>
					<div v-if="store.state.player.senders" class=" h-5/6 scrollbar scrollbar-track-zinc-900 scrollbar-thumb-zinc-600 max-h-2/3">
						<div v-for="friend in store.state.player.senders" :key="friend">
							<div v-if="store.methods.usersInfo(friend)" class="flex justify-start items-center space-x-2 mt-2"> 
									<img  :src="store.methods.usersInfo(friend).avatar" class="lg:ml-8 h-8 w-8 rounded-full">  <router-link :to="{name:'Chat', params: {name: store.methods.usersInfo(friend).username}}" class="font-semibold text-slate-400 hover:underline cursor-pointer mt-4 "> {{ store.methods.usersInfo(friend).username }} </router-link> 
							</div>
						</div>

					</div>
					
				</div>
				<div v-if="showCreate" class="fixed inset-36 z-50 ">
						<div class=" my-6 mx-auto max-w-sm  ">
									<!--content-->
							<div class="border-0 rounded-lg shadow-lg w-full bg-neutral-100  ">
										<!--header-->
								<div class=" p-5 border-b border-solid border-slate-200 rounded-t">
									<h3 class=" font-semibold text-xl">Create new channel (chat room) </h3>
								</div>
								<form class=" grid gap-3 grid-cols-1  p-6 border-t border-solid border-slate-200 rounded-b">
									 <label class=" text-gray-800 font-semibold" >Name</label> 
									 <input type="text" class="bg-neutral-200 border-b rounded h-8 pl-4" >
									 <label class="p-2 font-semibold text-gray-800">Private/Public</label>
									 <select class="bg-neutral-200 border-b rounded h-8 pl-4">
												<option value="Public">Public</option>
												<option value="Private">Private</option>
									 </select>
									 <label class="p-2 font-semibold text-gray-800">Password</label>
									 <input type="password" class="bg-neutral-200 border-b rounded h-8 pl-4">
									 <label class="p-2  font-semibold text-gray-800">Add user</label>
									 <input type="text" class="bg-neutral-200 border-b rounded h-8 pl-4">
									 

								</form>
								<div class="flex items-center justify-center space-x-8  p-6 border-t border-solid border-slate-200 rounded-b">
									<button @click="showCreate = false" class="text-gray-800 border border-solid white hover:bg-black hover:text-white  font-bold uppercase text-sm px-6 py-3 rounded outline-none    " type="button" v-on:click="toggleModal()">
										Close
									</button>
									<button class="text-gray-800 font-bold hover:border hover:rounded hover:border-solid hover:white hover:text-white hover:bg-black uppercase px-6 py-3 text-sm outline-none    " type="button" v-on:click="toggleModal()">
										Create channel
									</button>
								</div>
							</div>
						</div>
				</div>
		</div>
</template>

<script lang="ts" setup>
	import {inject, ref, onMounted} from 'vue';
	import io from "socket.io-client";
	const store = inject('store')
	store.state.connection = io('http://127.0.0.1:3001')
	const showCreate = ref(false)
	const showAllRooms = ref(false)
	const showRooms = () => (showAllRooms.value = !showAllRooms.value)
	const createRoom = () => (showCreate.value = true)

	 onMounted(() => {
	// 	store.state.connection.on("message", (data) => {store.state.rooms = data;
    //   if (store.state.rooms.length !== 0){
    //   store.state.messageDto.id = store.state.rooms[0].id;
    //   store.state.roomName = store.state.rooms[0].name;}});
    })

</script>