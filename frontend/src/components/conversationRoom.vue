<template>
    <div id="folio" class="invisible md:visible lg:visible col-span-1 lg:col-span-4 md:col-span-4 h-screen ">
        <div class="relative h-small bg-myblue rounded-lg">
            <h1 class="absolute font-bold text-2xl left-6 text-gray-400 bottom-2/4 translate-y-2/4"> {{ name }} </h1>
            <button v-if="isMember == true"  @click.prevent="leave" class="bg-slate-900 rounded h-10 w-36 font-bold absolute text-red-700 right-6 bottom-2/4 translate-y-2/4 hover:bg-red-800 hover:text-slate-900" > Leave room </button>
            <button v-else @click.prevent="join"  class="bg-slate-300 rounded h-10 w-36 font-bold absolute text-gray-800 right-6 bottom-2/4 translate-y-2/4 hover:bg-slate-400" > Join Room </button>
        </div>
        <div v-if="joinRoom == true" class="fixed inset-60 z-50 ">
          <div class=" my-6 mx-auto max-w-sm text-center ">
            <div class="border-0 rounded-lg shadow-lg w-full bg-white  ">
              <div class=" p-5 border-b border-solid border-slate-200 rounded-t">
                <h3 class=" m-auto font-semibold text-xl"> {{name}} </h3>
              </div>
								<form class=" grid gap-3 grid-cols-1  p-6 border-t border-solid border-slate-200 rounded-b">
									 <input v-model="passwordToJoin" type="password" placeholder="Password" class="bg-neutral-200 border-b rounded h-8 pl-4">
								</form>
              <div class="flex items-center justify-center space-x-8  p-6 border-t border-solid border-slate-200 rounded-b">
                <button @click="cancelJoin" class="text-gray-800 border border-solid white hover:bg-slate-800 hover:text-white  font-bold uppercase text-sm px-6 py-3 rounded outline-none    " type="button">
                  Cancel
                </button>
                <button @click="sendPassTojoinRoom" class="text-gray-800 font-bold hover:border hover:rounded hover:border-solid hover:white hover:text-white hover:bg-slate-800 uppercase px-6 py-3 text-sm outline-none    " type="button">
                  Join Room
                </button>
              </div>
            </div>
          </div>
        </div>
				<div class="rounded-lg max-h-4/5 h-full scrollbar scrollbar-track-zinc-900 scrollbar-thumb-zinc-600 ">
					<div>
						<div class="w-full">
							<div class="relative w-full p-6 overflow-y-auto">
								<ul v-for="message in store.state.messages" :key="message" class="mb-2">
                   <li v-if="message.playerid == store.state.player.id" class="flex justify-end">
                       <div class="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-200 rounded-full shadow">
                               <span class="block"> {{ message.content }} </span>
                       </div>
                   </li>
                   <li v-else class="flex justify-start items-center space-x-4">
                           <img v-if="usersInfo(message.playerid)" :src="store.methods.playerAvatar(usersInfo(message.playerid))" class="h-10 w-10 rounded-full bg-white " alt="">
                           <div class="relative max-w-xl px-4 py-2 bg-slate-600 text-gray-300 rounded-full shadow">
                               <span class="block"> {{ message.content }}  </span>
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
              <button @click="sendMessage" type="submit">
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
    import {inject, onMounted, onUpdated,ref, computed, watch} from 'vue';
	  import axios from 'axios';
    import { identifier } from '@babel/types';
    const props = defineProps({
        name: String,
        id: String,
        isPublic: String,
    })
    const joinRoom = ref(false)
    const store = inject('store')
    const isMember = ref(false as boolean)
    const passwordToJoin = ref('' as string)

    // onMounted (async () => {
      
      
      
      
      
      
      onUpdated(async () => {
        store.state.spinn = true
        await axios
            .get('http://localhost:3001/chat/isMember' ,{ params: {roomid: props.id, playerid: store.state.player.id}, withCredentials: true })
            .then(data =>{ store.state.roominfo = data.data ;}) 
            .catch(err => { console.log(err)})

        if (store.state.roominfo.playerid != undefined) 
          isMember.value =  true 
        else
          isMember.value = false
        store.state.spinn = false
      // console.log("isMember = "+ isMember.value, store.state.roominfo.playerid +"roominfo")
      // watch(isMember, (currentValue, oldValue) => {
      //   console.log("curr",currentValue);
      //   console.log("old",oldValue);
      // })
		  // await axios
      //     .get('http://localhost:3001/chat/isMember' ,{ params: {roomid: props.id, playerid: store.state.player.id}, withCredentials: true })
      //     .then(data =>{ store.state.roominfo = data.data ; }) 
      //     .catch(err => { console.log(err)})
    

      //   if (store.state.roominfo.playerid != -1){
      //     isMember.value = true;
      //   } 

    })


    function join(){
      // if (props.isPublic == 'true'){
      //   // will join without any problems
      //   console.log(isMember.value)
      //   isMember.value = true
      // }
      
      joinRoom.value = true
      
    }

    function leave(){
      store.state.connection.emit('leave-channel', props.id);
      store.state.roomSelected = props.id;
    }

    function sendPassTojoinRoom() {
      // send the password of the channel to backend --- passwordToJoin ----
      let joinChannelDto ={
        roomid : props.id,
        password :passwordToJoin.value,
      }
      store.state.connection.emit('join-channel', joinChannelDto);
      store.state.roomSelected = props.id;

      passwordToJoin.value = ''
      joinRoom.value = false
      
      
    }

    function cancelJoin(){
      passwordToJoin.value = ''
      joinRoom.value = false
    }

    function sendMessage(){
		    let messageDto={ id : props.id , content : store.state.message};
		    // console.log("dto",messageDto);
		    store.state.connection.emit("createMessage", messageDto);
        store.state.message = ''
	  }


    // const enterPassowrd = () => (joinRoom.value = !joinRoom.value)


      function   usersInfo(id: number){
        console.log("id", id)
        for (var user of store.state.users) {
            if (user.id == id){
                return user
            }
        }
        return null
    }

</script>