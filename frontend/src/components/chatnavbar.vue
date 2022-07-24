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
									<router-link  :to="{name:'ChatRoom', params: {name: ChatRoom.name, id: ChatRoom.id }}" class="font-bold text-slate-400 hover:underline cursor-pointer pl-1 "> {{ ChatRoom.name }} </router-link>
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
								<router-link :to="{name:'ChatRoom', params: {name: Room.name , id: Room.id}}" class="font-bold text-slate-400 hover:underline cursor-pointer pl-1 "> {{ Room.name }} </router-link>
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
							<div @click="createAndGetDm(friend.id)" class="flex justify-start items-center space-x-2 mt-2"> 
									<img  :src="store.methods.playerAvatar(friend)" class=" lg:ml-8 h-8 w-8 rounded-full bg-white">  <span class="font-semibold text-slate-400 hover:underline cursor-pointer mt-4 pb-4 "> <router-link :to="{name:'Chat', params: {name: friend.username }}" > {{ friend.username }} </router-link>   </span> 
							</div>
						</div>
					</div>
				</div>
				<div v-if="showCreate" class="fixed inset-36 z-50 ">
						<div class=" my-6 mx-auto max-w-lg  ">
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
									 <!-- <input v-model="room.players" type="text" class="bg-neutral-200 border-b rounded h-8 pl-4"> -->
									 <input v-model="RoomMember" type="text" class="bg-neutral-200 border-b rounded h-8 pl-4">
									<div v-for="user in matchingNames" :key="user" class="">
										<div @click="addToMembers(user)" v-if="user != store.state.player.username">  {{ user }}</div>
									</div>
									<div class="flex scrollbar scrollbar-track-slate-300 scrollbar-thumb-slate-600">
										<div v-for="player in room.players" :key="player" class="bg-slate-300 text-slate-700 w-fit h-fit p-2 mb-2 rounded mr-2"> {{ player }} </div>
									</div>
								</form>
								<div class="flex items-center justify-center space-x-8  p-6 border-t border-solid border-slate-200 rounded-b">
									<button @click="CancelCreate" class="text-gray-800 border border-solid white hover:bg-black hover:text-white  font-bold uppercase text-sm px-6 py-3 rounded outline-none    " type="button" >
										Close
									</button>
									<button @click="sendRoom" class="text-gray-800 font-bold hover:border hover:rounded hover:border-solid hover:white hover:text-white hover:bg-black uppercase px-6 py-3 text-sm outline-none  " type="button" >
										Create channel
									</button>
								</div>
							</div>
						</div>
				</div>
				<!-- <p v-if=""></p> -->
		</div>
		<div v-if="invited === true" class="fixed inset-60 z-50 ">
      		<div class=" my-6 mx-auto max-w-sm text-center ">
        		<div class="border-0 rounded-lg shadow-lg w-full bg-white  ">
        			<div class=" p-5 border-b border-solid border-slate-200 rounded-t">
            			<h3 class=" m-auto font-semibold text-xl">{{ invitationBy }}</h3>
          			</div>
          			<div class="flex items-center justify-center space-x-8  p-6 border-t border-solid border-slate-200 rounded-b">
            			<router-link @click.prevent="store.state.connection.emit('invitation-accepted', opponent);"  class="text-gray-800 border 
						border-solid white hover:bg-slate-800 hover:text-white  
						font-bold uppercase text-sm px-6 py-3 rounded outline-none  " 
						:to="{ name: 'OneVOne', params: { opponent: opponent , difficulty: 'oneVone' } }" >
              				Accept
            			</router-link>
            			<button @click.prevent="invited = false ; opponent = ''" class="text-gray-800 font-bold hover:border hover:rounded hover:border-solid hover:white hover:text-white hover:bg-slate-800 uppercase px-6 py-3 text-sm outline-none    ">
              				Refuse
            			</button>
         			</div>
        		</div>
      		</div>
    	</div>
</template>

<script lang="ts" setup>
	import {inject, ref, onMounted, onUnmounted,computed, customRef} from 'vue';
	import io from "socket.io-client";
	import axios from 'axios';
	import { chatRoom } from '../interfaces';
	import { anyTypeAnnotation } from '@babel/types';
	import { useRouter, useRoute } from 'vue-router';
import { connect } from 'http2';
	//import {alert} from alertmessage;
	const store = inject('store')
	const router = useRouter()
    const route = useRoute()

	let invited = ref(false as boolean);
	let invitationBy = ref('' as String)
	let opponent = ref('' as String);
	const RoomMember = ref('' as string)
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


	function CancelCreate(){
		room.name = ''
		room.privacy = ''
		room.members = []
		RoomMember.value = ''
		showCreate.value = false
	}
	const showCreate = ref(false)
	const showAllRooms = ref(false)
	function showRooms () { showAllRooms.value = !showAllRooms.value}
	function  createRoom () {
		showCreate.value = true
	}



	function addToMembers(user: string){
		if (room.players.includes(user) == false)
			room.players.push(user)
		RoomMember.value = ''
		console.log(room.players)
	}


	function  sendRoom() {
        // console.log('Message sent !')
		// showCreate.value = false
        let roomdata={
          name: room.name,
		  privacy:room.privacy,
          password:room.password,
          players:room.players,
        }
		console.log(roomdata)
        store.state.connection.emit("createRoom", roomdata);
       	// console.log(roomdata);
        // this.room.players.splice(0);
        //I should sent a room
		CancelCreate()
    }



	// async function getMessage(roomid : number){
	// 	await axios.get('http://localhost:3001/chat/messages', {params:{roomid:roomid}, withCredentials:true})
	// 	.then(data=>{})
	// }

	// function getMembers(id){
	// 	await axios.get('http://localhost:3001/chat/members', {params:{roomid:id}, withCredentials:true})
	// 	.then(data=>{})
	// }
	function CreateDM(id: number){
		store.state.connection.emit("create-DM", id); //id of friend
	}

	async function getRoomId(friendid:number){
		let RoomName = friendid+":"+store.state.player.id;
		let reverse = store.state.player.id+":"+friendid;
		for (var room of store.state.rooms)
		{
			if (room.name == RoomName || room.name == reverse)
				return room.id;
		}
	}
	async function createAndGetDm(friendid: number ){
		CreateDM(friendid);
		store.state.roomSelected = await getRoomId(friendid);
		console.log("Room selected  " + store.state.roomSelected);
		await axios.get('http://localhost:3001/chat/DM', {params:{userid:store.state.player.id, receiverid:friendid}, withCredentials:true})
		.then(data=>{store.state.messages = data.data;})
		//store.state.roomSelected = getRoomId(friendid);
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
		  .then(data=> { store.state.rooms = data.data;  })
		//  console.log(data.data);}
		await axios.get('http://localhost:3001/chat/allchannels',{ params:{playerid: store.state.player.id}, withCredentials: true})
		.then(data=> {store.state.allRooms = data.data; })
		

		store.state.connection.on("message", (data) => {store.state.rooms = data;});

		store.state.connection.on("allrooms", (data) => {store.state.allRooms = data;});


		store.state.connection.on("sendMessage", (data) => {
			//listen to this event if and only if the roomid selected is the one we get messages from
			console.log('listening to event message '+ store.state.roomSelected);
			if (data && data[0].roomid == store.state.roomSelected)
			{
				console.log(data[0].roomid);
				console.log(store.state.roomSelected);
				store.state.messages = data;
			}
	 });
	
		

		
		//store.state.connection.on("members", (data) => {members = data;});

		store.state.connection.on('invitation', (data) => {
			opponent.value = data;
			invited.value = true;
			invitationBy.value = 'Invited To Game From ' + data;
			console.log('invited to game' + data);
			// alert(`You are invited by ${data} to play a game`);
			//a pop up {to accept or refuse} => {if accept => redirect this user to OnetoOne}
			//send an event to framdani that user accept the invition and redirect him to onetoone
			//store.state.connection.emit('invitation-accepted');
		});

		store.state.connection.on('gotogame', (data) => {
			console.log('opponent: ' + data);
			router.push({
			name: 'OneVOne',
			params: {
				opponent: data,
				difficulty: 'oneVone'
			},
		})
		//let val = new VueSimpleAlert("Alert Message.");
		//a pop up {to accept or refuse} => {if accept => redirect this user to OnetoOne}
		//send an event to framdani that user accept the invition and redirect him to onetoone
		});

	 })
	function getUserName(player: any){
      var result = store.state.users.find( x=> x.id.toString() === player.id)
      return result
    }

	onUnmounted(async () => {
	if (store.state.connection != null) {
			store.state.connection.disconnect();
	}
});

	const matchingNames = computed(() => {
	  const a=[]
	  if (RoomMember.value.length == 0)
	  	return ('')
	  store.state.users.forEach(user => {
		a.push(user.username)
	  });
	  return a.filter((name) => name.startsWith(RoomMember.value))
	})
	// // 	store.state.connection.on("message", (data) => {store.state.rooms = data;
    // //   if (store.state.rooms.length !== 0){
    // //   store.state.messageDto.id = store.state.rooms[0].id;
    // //   store.state.roomName = store.state.rooms[0].name;}});
    // })

</script>