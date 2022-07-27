<template>
    <div class="Container bg-myblue col-span-2 md:col-span-1 rounded-lg lg:col-span-1 ">
       <div class=" h-screen">
          <div class="text-center items-center justify-center mx-auto">

                <!-- ********* chat room ********  -->
              <img src="../assets/group.png" class="mx-auto" >
              <div  class=" flex itmes-center justify-center text-center  -mt-[40px] "> 
                <p class="font-bold lg:text-2xl md:text-2xl text-gray-400"> {{ name }} </p> 
                <img @click="getMmebership(store.state.player.id)" src="../assets/edit.png" class="h-4 w-4 ml-4  mt-2" alt="">
              </div>

              <div v-if="membership && showEdit == true" >
                    <div v-if="membership.role == 'ADMIN' || membership.role == 'OWNER'" class=" rounded-md mt-4">
                        <div v-if="isPublic == 'true'" @click="changePass = !changePass"  class="cursor-pointer block py-2 text-sm text-gray-300 hover:underline  ">Change Password
                        </div>
                        <div v-if="isPublic == 'true'" @click="removePassword" class="cursor-pointer block py-2 text-sm text-gray-300 hover:underline  ">Remove Password
                        </div>
                    </div>
              </div>
            <div v-if="changePass == true" class="fixed inset-60 z-50 ">
                <div class=" my-6 mx-auto max-w-sm text-center ">
                  
                    <div class="border-0 rounded-lg shadow-lg w-full bg-white  ">

                        <div class=" p-5 border-b border-solid border-slate-200 rounded-t"> 
                            <h3 class=" m-auto font-semibold text-xl"> {{name}} </h3>
                        </div>
				        	<form class=" grid gap-3 grid-cols-1  p-6 border-t border-solid border-slate-200 rounded-b">
				        		 <input v-model="changedPassword" type="password" placeholder="Password" class="bg-neutral-200 border-b rounded h-8 pl-4">
                            </form>
                        <div class="flex items-center justify-center space-x-8  p-6 border-t border-solid border-slate-200 rounded-b">
                            <button @click="CancelChangePass" class="text-gray-800 border border-solid white hover:bg-slate-800 hover:text-white  font-bold uppercase text-sm px-6 py-3 rounded outline-none ">
                              Cancel
                            </button>
                            <button @click="saveChangedPass" class="text-gray-800 font-bold hover:border hover:rounded hover:border-solid hover:white hover:text-white hover:bg-slate-800 uppercase px-6 py-3 text-sm outline-none ">
                              Save Password
                            </button>
                        </div>
                    </div>
                </div>
            </div>

          </div> 
          <div class="mt-16 ">
            <h1 class="font-bold text-xl text-gray-300 mb-4"> Admins </h1>
             <div class=" h-5/6 scrollbar scrollbar-track-zinc-900 scrollbar-thumb-zinc-600 max-h-2/3">
                <div v-for="member in store.state.roomMembs">
                    <div v-if="member.role == 'ADMIN'" class="flex justify-start items-center space-x-2 mt-4"> 
                        <img  :src="store.methods.playerAvatar(member.member)" class="bg-white lg:ml-8 h-8 w-8 rounded-full"> <span  class="font-semibold text-slate-400 hover:underline cursor-pointer "> {{ member.member.username }} </span> 
                    </div>
                    <div v-if="member.role == 'OWNER'" class="flex justify-start items-center space-x-2 mt-4"> 
                        <img  :src="store.methods.playerAvatar(member.member)" class="bg-white lg:ml-8 h-8 w-8 rounded-full"> <span  class="font-semibold text-slate-400 hover:underline cursor-pointer "> {{ member.member.username }} </span> 
                    </div>
                </div>
             </div>
          </div>

          <!--  ******** MEMBERS ******** -->

          <div class="mt-16">
            <h1 class="font-bold text-xl text-gray-300 mb-4"> Members </h1>
             <div  class=" h-5/6 scrollbar scrollbar-track-zinc-900 scrollbar-thumb-zinc-600 max-h-2/3">
                <div v-for="member in store.state.roomMembs">
                    <div v-if="member.role != 'OWNER'" @click="showOptions(member.member.id)" class="flex justify-start items-center space-x-2 mt-4"> 
                        <img  :src="store.methods.playerAvatar(member.member)" class="bg-white lg:ml-8 h-8 w-8 rounded-full">
                        <span  class="font-semibold text-slate-400 hover:underline cursor-pointer "> {{ member.member.username }} </span> 
                    </div>
                </div>
                    <div v-if="showMemberOptions && membership" class="z-10 divide-y bg-slate-700 divide-gray-800 rounded shadow w-44 text-center">
                        <div v-if="userId != store.state.player.id">
                            <ul v-if="membership.role == 'ADMIN' || membership.role == 'OWNER'" class="py-1 text-sm text-gray-700 text-gray-200" >
                            
                            <li v-if="isAlreadyAdmin == false && isBanned == false && isMuted == false" @click="setAdmin">
                                <span class="block px-4 py-2 hover:bg-gray-100 cursor-pointer hover:bg-gray-600 hover:text-white">Set as admin </span>
                            </li>
                            <li @click="unBan" v-if="(membership.role == 'ADMIN' || membership.role == 'OWNER') && isBanned == true && isMuted == false">
                                <span class="block px-4 py-2 hover:bg-gray-100 cursor-pointer hover:bg-gray-600 hover:text-white"> Unban </span>
                            </li>
                            <li v-if="isBanned == false && isMuted == false" @click="Ban">
                                <span  class="block px-4 py-2 hover:bg-gray-100 cursor-pointer hover:bg-gray-600 hover:text-white">Ban</span>
                            </li>
                            <li v-if="isBanned == false && isMuted == false" @click="MuteClick">
                                <span  class="block px-4 py-2 hover:bg-gray-100  cursor-pointer hover:bg-gray-600 hover:text-white">Mute</span>
                            </li>
                            <li v-if="isBanned == false && isMuted == true" @click="Unmute">
                                <span  class="block px-4 py-2 hover:bg-gray-100  cursor-pointer hover:bg-gray-600 hover:text-white">Unmute</span>
                            </li>
                            <li class="block px-4 py-2 hover:bg-gray-200 text-white hover:text-black space-x-2 space-y-2" v-if="mute == true">
                                <label for=""> mute for 
                                    <input v-model="muteDuration" class="rounded bg-slate-300 text-slate-800 font-semibold" type="number" min="0" max="120">
                                    mins
                                </label>
                                <div class="flex ">
                                    <button @click="CancelMute" class="block px-2 my-2 py-2 bg-gray-300 text-slate-800 font-semibold rounded  hover:text-slate-100  hover:bg-slate-900 mx-auto space-x-2" > Cancel </button>
                                    <button @click="Mute" class="block px-2 my-2 py-2 bg-gray-300 text-slate-800 rounded font-semibold hover:text-slate-100  hover:bg-slate-900 mx-auto space-x-2" > Save </button>

                                </div>
                            </li>
                            <li v-if="isBanned== false && isMuted == false" @click="Remove">
                                <span  class="block px-4 py-2 hover:bg-gray-100  cursor-pointer hover:bg-gray-600 hover:text-white">Remove</span>
                            </li>
                            </ul>

                        </div>
                    </div>
              


          </div>
          </div>

          <!-- ******* ADMINS *******  -->


        </div>
    </div>
</template>

<script lang="ts" setup>
    import axios from 'axios';
    import {inject, ref, onMounted, onUpdated} from 'vue';
    const store = inject('store')
    const props = defineProps({
        name: String,
        id: String,
        isPublic: String,

    })

        const owner = ref(false)
        const setPass = ref(false)
        const changePass = ref(false)
        const showMemberOptions = ref(false)
        const settedPassword = ref('' as string)
        const changedPassword = ref('' as string)
        const userId = ref(-1 as number)
        const roomId = ref(-1 as number)
        const showEdit = ref(false as boolean)
        const isBanned = ref(false as boolean)
        const mute = ref(false)
        const muteDuration = ref(0 as number)
        const isMuted = ref(false as boolean)


    function showOptions(userid: number){
        showMemberOptions.value = !showMemberOptions.value
        userId.value = userid
        roomId.value = parseInt(props.id, 10)
        console.log(userId.value, roomId.value)
        getMmebership(store.state.player.id)
        showEdit.value = !showEdit.value
        checkIfAlreadyAdmin(userid)
    }

    const isAlreadyAdmin = ref(false as boolean ) 
    async function checkIfAlreadyAdmin(userId: number){
        let member = {} as member
        await axios
            .get('http://localhost:3001/chat/isMember', {params:{ roomid : props.id, playerid: userId}, withCredentials: true })
            .then((data) => {member = data.data;})
            .catch(err => console.log(err.message))
        if (member.role == 'ADMIN' || member.role == 'OWNER')
            isAlreadyAdmin.value = true;
        else
            isAlreadyAdmin.value = false
        // if (member.isbanned == true)
        isBanned.value = member.isbanned
        isMuted.value = member.ismuted
        console.log("isbanned === " + member.isbanned,"|| is admin"+ isAlreadyAdmin.value )
    }

    function setAdmin(){
        // user to set as admin id == userId.value
        // room id ==== roomId.value
        let membershipDto ={
            userid:userId.value,
            roomid:roomId.value
        }

        store.state.connection.emit('set-admin', membershipDto );
    }

    function Ban(){
        // user to ban id == userId.value
        // room id ==== roomId.value

        let membershipDto ={
            userid:userId.value,
            roomid:roomId.value
        }

        store.state.connection.emit('ban-user', membershipDto );
        isBanned.value = true
        showMemberOptions.value = false
    }

    function unBan(){
         let membershipDto ={
            userid:userId.value,
            roomid:roomId.value
        }
        store.state.connection.emit('unban-user', membershipDto );
        isBanned.value = false
        showMemberOptions.value = false
    }

    function Mute(){
        // mute for : ----muteDuration.value ----
        // user to mute id == userId.value
        // room id ==== roomId.value 
        let mutedto={
            roomid:roomId.value,
            userid:userId.value,
            duration:muteDuration.value,
        }
        store.state.connection.emit('mute-user', mutedto);
        // after send duration to backend 
        muteDuration.value = 0
        mute.value = false
        showMemberOptions.value = false
        isMuted.value = true
    }

    function CancelMute(){
        muteDuration.value = 0
        mute.value = false
        showMemberOptions.value = false
    }

    function MuteClick(){
        mute.value = !mute.value
        
        
    }

    function   Unmute (){
        muteDuration.value = 0
        mute.value = false
        showMemberOptions.value = false
        isMuted.value = false
    }

    function Remove(){
        // user to remove from channel id == userId.value
        // room id ==== roomId.value 
        let membershipdto ={
            roomid:roomId.value,
            userid : userId.value
        }
        store.state.connection.emit('remove-user', membershipdto);
        showMemberOptions.value = false
    }

    function CancelChangePass(){
        changedPassword.value = ''
        changePass.value = false
    }


    function saveChangedPass(){

        // send the new password to backend ---- changedPassword  ------
        let upadtePwdDto={
            roomid:props.id,
            password:changedPassword.value
        }
        store.state.connection.emit('edit-pwd',upadtePwdDto);
        changedPassword.value = ''
        changePass.value = false  
    }

    // function cancelSettingPass (){
    //     settedPassword.value = ''
    //     setPass.value = false
    // }

    
    // function saveSettedPassowrd() {

    //     // send the password to backend ----settedPassword.value------
    //     settedPassword.value = ''
    //     setPass.value = false
    // }

    function removePassword(){
        // remove password 
        // change the privacy from private to public => la ma3ndha ta3ala9a b private ola public 
        store.state.connection.emit('remove-pwd', props.id);
    }


 
    interface member {
        id_membership:number,
        role:string,
        playerid:number,
        roomid:number
    }


    const membership = ref({} as member)


    async function getMmebership(playerid: number){
            if (playerid == store.state.player.id)
                showEdit.value = ! showEdit.value
            await axios
            .get('http://localhost:3001/chat/isMember', {params:{ roomid : props.id, playerid: playerid}, withCredentials: true })
            .then((data) => {membership.value = data.data;})
            .catch(err => console.log(err.message))
        // if (membership.value == null){
        //     return false;
        // }
        // return true;
    }


    onMounted(async () => {
       

    })
    onUpdated(async  () => {
		await axios
			.get('http://localhost:3001/chat/members' ,{params:{ roomid : props.id, playerid: store.state.player.id}, withCredentials: true })
			.then((data) => {store.state.roomMembs = data.data;})
			.catch(err => console.log(err.message))

       
        // await axios
        //     .get('http://localhost:3001/chat/isMember', {params:{ roomid : props.id, playerid: store.state.player.id}, withCredentials: true })
        //     .then((data) => {membership.value = data.data;})
        //     .catch(err => console.log(err.message))
	})
    // const edit= ref(false)
    // const showEdit = () => (props.editRoom = !props.editRoom)

</script>