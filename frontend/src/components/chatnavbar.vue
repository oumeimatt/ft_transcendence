<template>
		<div class="Container h-screen bg-myblue col-span-2 md:col-span-2 lg:col-span-1  scrollbar scrollbar-track-zinc-900 scrollbar-thumb-zinc-600 max-h-screen  rounded-lg ">
				<div class="pb-4">
					<button class="mt-8 flex justify-start items-center md:space-x-2" >
						<svg @click="createRoom" xmlns="http://www.w3.org/2000/svg" class="md:h-8 md:w-8 h-4 w-4 fill-slate-400" viewBox="0 0 20 20">
							<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
						</svg> 
						 <div @click="createRoom" class="text-slate-400 lg:text-xl md:text-xl  text-sm  font-bold hover:underline "> Create channel </div> 
					</button>
					<button @click="showRooms" class="mt-8 flex justify-start items-center md:space-x-2" >
						<svg xmlns="http://www.w3.org/2000/svg" class="md:h-8 md:w-8 h-4 w-4 fill-slate-400" fill="none" viewBox="0 0 24 24"  stroke-width="1">
							<path stroke-linecap="round" stroke-linejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
						</svg>
						<p  class="text-slate-400 lg:text-xl md:text-xl text-sm  font-bold hover:underline"> All channels </p>
					</button>
					<div class="h-5/6 scrollbar mt-4 scrollbar-track-zinc-900 scrollbar-thumb-zinc-600 max-h-2/5 ">
						<div v-if="showAllRooms" >
							<div v-for="ChatRoom in store.state.allRooms" :key="ChatRoom" >
								<div v-if="ChatRoom.ischannel == true"   class="flex justify-start items-center space-x-2 mt-4"> 
									<svg v-if="ChatRoom.ispublic == false" xmlns="http://www.w3.org/2000/svg" class=" lg:ml-8 h-8 w-8 fill-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
										<path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
									</svg>
									<img   v-if="ChatRoom.ispublic == true" src="../assets/public.png" class="lg:ml-7 h-8 w-10 fill-slate-300" fill="none" viewBox="0 0 24 24">
									<router-link  :to="{name:'ChatRoom', params: {name: ChatRoom.name}}" class="font-bold text-slate-400 hover:underline cursor-pointer pl-1 "> {{ ChatRoom.name }} </router-link>

									<!-- <router-link  :to="{name:'ChatRoom', params: {name: ChatRoom.name}}" class="font-semibold text-slate-400 lg:text-base md:text-sm text-2xl  hover:underline cursor-pointer pl-2 "> {{ ChatRoom.name }} </router-link>  -->
								<!-- </div> -->
								<!-- <div v-if="ChatRoom.ischannel == true" class="flex justify-start items-center space-x-2 mt-4">  -->
								</div>
							</div>
						</div>

					</div>
				</div>
				<div class=" mt-8  pb-8  ">
					<h1 class="text-slate-300 font-semibold text-xl  ">My channels</h1>
					<div class="h-5/6 scrollbar scrollbar-track-zinc-900 scrollbar-thumb-zinc-600 max-h-2/3 ">
						<div v-for="Room in store.state.rooms" :key="Room" >
							<div v-if="Room.ischannel == true"  class="flex justify-start items-center space-x-2 mt-4"> 
								<svg  v-if="Room.ispublic == false" xmlns="http://www.w3.org/2000/svg" class=" lg:ml-8 h-8 w-8 fill-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
									<path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
								</svg>
								<img  v-if="Room.ispublic == true" src="../assets/public.png" class="lg:ml-7 h-8 w-10 fill-slate-300" fill="none" viewBox="0 0 24 24">
								<router-link :to="{name:'ChatRoom', params: {name: Room.name}}" class="font-bold text-slate-400 hover:underline cursor-pointer pl-1 "> {{ Room.name }} </router-link>
								<!-- <router-link :to="{name:'ChatRoom', params: {name: Room.name}}" class="font-semibold text-slate-400 lg:text-base md:text-sm text-2xl  hover:underline cursor-pointer pl-2 "> {{ Room.name }} </router-link>  -->
							<!-- </div> -->
							<!-- <div  v-if="Room.ischannel == true" class="flex justify-start items-center space-x-2 mt-4">  -->
							</div>
						</div>
					</div>
				</div>
				<div class="  mt-8  pb-8  ">
					<h1 class="text-slate-300 font-semibold text-xl mb-6">Friends</h1>
					<div v-if="store.state.friends" class=" h-5/6 scrollbar scrollbar-track-zinc-900 scrollbar-thumb-zinc-600 max-h-2/3">
						<div v-for="friend in store.state.friends" :key="friend">
							<div @click="CreateDM(friend.id)" class="flex justify-start items-center space-x-2 mt-2"> 
									<img  :src="store.methods.playerAvatar(friend)" class=" lg:ml-8 h-8 w-8 rounded-full bg-white">  <span class="font-semibold text-slate-400 hover:underline cursor-pointer mt-4 pb-4 "> <router-link :to="{name:'Chat', params: {name: friend.username}}" > {{ friend.username }} </router-link>   </span> 
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
									 <input v-model="room.name" type="text" class="bg-neutral-200 border-b rounded h-8 pl-4" >
									 <label class="p-2 font-semibold text-gray-800">Private/Public</label>
									 <select v-model="room.privacy" class="bg-neutral-200 border-b rounded h-8 pl-4">
												<option value="Public">Public</option>
												<option value="Private">Private</option>
									 </select>
									 <label class="p-2 font-semibold text-gray-800">Password</label>
									 <input v-model="room.password" type="password" class="bg-neutral-200 border-b rounded h-8 pl-4">
									 <label class="p-2  font-semibold text-gray-800">Add user</label>
									 <input v-model="room.players" type="text" class="bg-neutral-200 border-b rounded h-8 pl-4">
									 

								</form>
								<div class="flex items-center justify-center space-x-8  p-6 border-t border-solid border-slate-200 rounded-b">
									<button @click="showCreate = false" class="text-gray-800 border border-solid white hover:bg-black hover:text-white  font-bold uppercase text-sm px-6 py-3 rounded outline-none    " type="button" >
										Close
									</button>
									<button @click="sendRoom" class="text-gray-800 font-bold hover:border hover:rounded hover:border-solid hover:white hover:text-white hover:bg-black uppercase px-6 py-3 text-sm outline-none    " type="button" >
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
	import axios from 'axios';
	import { chatRoom } from '../interfaces';
import { anyTypeAnnotation } from '@babel/types';
	const store = inject('store')

	//! called first time the chat is accessed
	store.state.connection = io('http://127.0.0.1:3001/chat',
	{
		query:{
			'token':localStorage.getItem('user'),
		}
	});//, {withCredentials:true});

	const room: chatRoom = {
  			name: "",
  			privacy: "",
			password: "",
			players:[],
	};

	const showCreate = ref(false)
	const showAllRooms = ref(false)
	function showRooms () { showAllRooms.value = !showAllRooms.value}
	function  createRoom () {
		showCreate.value = true
	}
	function  sendRoom() {
        // console.log('Message sent !')
		showCreate.value = false
        let roomdata={
          name: room.name,
		  privacy:room.privacy,
          password:room.password,
          players:room.players,
        }
        store.state.connection.emit("createRoom", roomdata);
       	console.log(roomdata);
        // this.room.players.splice(0);
        //I should sent a room
    }


	//function sendMessage(){
		//let messageDto={ id : , content : };
		//store.state.connection.emit("createMessage", messageDto);
	//}

	// function getMessage(id){
	// 	await axios.get('http://localhost:3001/chat/messages', {params:{roomid:id}, withCredentials:true})
	// 	.then(data=>{})
	// }

	// function getMembers(id){
	// 	await axios.get('http://localhost:3001/chat/members', {params:{roomid:id}, withCredentials:true})
	// 	.then(data=>{})
	// }
	function CreateDM(id: number){
		console.log("id: ", id)
		store.state.connection.emit("create-DM", id); //

	}

	function usersInfo(id: string){
        for (var user of store.state.friends) {
            if (user.id.toString() == id){
                return user.username
            }
        }
    }
	 onMounted(async () => {

		await axios
          .get('http://localhost:3001/profile' ,{ withCredentials: true })
          .then(data =>{
            store.state.player = data.data.profile;
            store.state.friends = data.data.friends;
            store.state.achievements = data.data.achievements
          } ) 
          .catch(err => console.log(err.message))
		  await axios.get('http://localhost:3001/chat/mychannels',{ params:{playerid: store.state.player.id}, withCredentials: true})
		  .then(data=> { console.log('axios mychannels ');store.state.rooms = data.data; console.log(data.data) })
		//  console.log(data.data);}
		await axios.get('http://localhost:3001/chat/allchannels',{ params:{playerid: store.state.player.id}, withCredentials: true})
		.then(data=> {console.log('axios all channels ');store.state.allRooms = data.data; })
		

		store.state.connection.on("message", (data) => {store.state.rooms = data;});

		store.state.connection.on("allrooms", (data) => {store.state.allRooms = data;});

		//update room names && allrooms
		// for (let i = 0; i < store.state.rooms.length; i++){
		// 	let splits = store.state.rooms[i].name.split(":");
		// 	if (splits.length === 2)
		// 	{
		// 		if (store.state.player.id == splits[0])
		// 			store.state.rooms[i].name = usersInfo(splits[1]);
		// 		else
		// 			store.state.rooms[i].name = usersInfo(splits[0]);
		// 	}
		// }

		// for (let i = 0; i < store.state.allRooms.length; i++){
		// 	let splits = store.state.allRooms[i].name.split(":");
		// 	if (splits.length === 2)
		// 	{
		// 		if (store.state.player.id == splits[0])
		// 			store.state.allRooms[i].name = usersInfo(splits[1]);
		// 		else
		// 			store.state.allRooms[i].name = usersInfo(splits[0]);
		// 	}
		// }

		//store.state.connection.on("sendMessage", (data) => {messages = data;});

		//store.state.connection.on("members", (data) => {members = data;});


	 })
	function getUserName(player: any){
      var result = store.state.users.find( x=> x.id.toString() === player.id)
      return result
    }

	// // 	store.state.connection.on("message", (data) => {store.state.rooms = data;
    // //   if (store.state.rooms.length !== 0){
    // //   store.state.messageDto.id = store.state.rooms[0].id;
    // //   store.state.roomName = store.state.rooms[0].name;}});
    // })

</script>