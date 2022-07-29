<template>
  <div>
    <div v-if="store.state.player.id == id">
        <Profile />
    </div>
    <div v-else>
      <div>
        <div v-if="store.state.spinn == true">
          <LoadingBar :start="store.state.spinn" />
        </div>
        <Header /> 
        <div v-if="store.state.player.status != 'offline'" class="Container">
          <div id="container2" class="relative mb-11 text-white">
            <div class="flex absolute top-48 left-5 items-center">
  
              <img class="w-36 md:w-40 lg:w-40 bg-white   rounded-full
               lg:top-52 left-11" :src="store.methods.playerAvatar(store.state.user)" alt="">
              <div class="ml-6 font-semibold text-3xl  text-gray-400 "> 
                {{ store.state.user.username }}
              </div>
              <div v-if="isConnected() && store.state.user.status != 'playing'"
               class="h-4 w-4 bg-green-600 mt-2 rounded-full  ml-4">
                <p class="opacity-0 text-gray-400 hover:opacity-100 
                  pl-6 -mt-1">
                   Online
                </p>
              </div>
              <div v-if="store.state.user.status == 'playing'"
               class="h-4 w-4 bg-blue-600 mt-2 rounded-full  ml-4"> 
                <p class="opacity-0 w-full text-gray-400 hover:opacity-100 pl-6 -mt-1">
                   Playing 
                </p>
              </div>
              <div v-if="!isConnected() && store.state.user.status != 'playing'" 
              class="h-2 w-2 ring-4 ring-gray-600 mt-2 rounded-full  ml-4"> 
                <p class="opacity-0 text-gray-400 hover:opacity-100 pl-6 -mt-2">
                   Offline
                </p>
              </div>
          </div>
          <!---------------------- ADD FRIEND --------------------->

          <button v-if="!store.state.userInfo.isFriend &&
           !store.state.userInfo.userIsBlocked && 
           !store.state.userInfo.isFriend.amIBlocked"
            @click="addFriend" id='button' 
            class='absolute bottom-3 right-3 justify-center focus:outline-none
             space-between bg-slate-900 font-medium py-2 px-4 rounded inline-flex 
             items-center'>
              <svg id='icon' class='w-4 h-4 mr-1' fill='#FFF' stroke-linecap="round"
               stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" 
               stroke="white"><path d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4
                4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path></svg>
              <span id='text' class='text-white text-sm select-none'>Add friend</span>
          </button>

          <!----------------------  FRIENDS  --------------------->

          <button v-if="store.state.userInfo.isFriend && 
          !store.state.userInfo.userIsBlocked && !store.state.userInfo.isFriend.amIBlocked"
           id='button' class='absolute bottom-3 right-3 justify-center 
           focus:outline-none space-between bg-gray-900 hover:bg-slate-900 
           font-medium py-2 px-2 rounded inline-flex items-center'>
             <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="" 
             viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span id='text' class='text-white text-sm select-none ml-2 '>Friends</span>
              <svg @click="frMenu = !frMenu" class="w-5 h-5 ml-4" fill="currentColor"
               viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path 
               fill-rule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 
               3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" 
               clip-rule="evenodd"></path></svg>
          </button>

            <div v-if="frMenu" class=" divide-y absolute bottom-16 right-3 
            divide-gray-100 rounded shadow w-36 bg-slate-800">
              <ul class="py-1 text-sm text-gray-700 text-gray-200">
                          <!---------------------- REMOVE FRIEND --------------------->

              <li @click="removeFriend" class="block px-4 py-2 hover:bg-gray-100
               hover:bg-gray-600 hover:text-white">Remove friend </li>
                          <!---------------------- BLOCK FRIEND --------------------->

              <li @click="blockFriend" class="block px-4 py-2 hover:bg-gray-100
               hover:bg-gray-600 hover:text-white">Block </li>
              </ul>
            </div>

          <!---------------------- UNBLOCK --------------------->
          
          <button v-if="!store.state.userInfo.isFriend &&
           store.state.userInfo.userIsBlocked
          && !store.state.userInfo.isFriend.amIBlocked"
           @click="unblockFriend" id='button' class='absolute bottom-3 right-3
            justify-center focus:outline-none space-between bg-gray-900 
            hover:bg-slate-900 font-medium py-2 px-2 rounded inline-flex
             items-center'>
            <span id='text' class='ml-2 mr-2 text-white text-sm 
            select-none ml-2 '>Unblock</span>
          </button>


          <!---------------------- BLOCKED  --------------------->
          <button v-if="!store.state.userInfo.isFriend && 
           !store.state.userInfo.userIsBlocked 
          && store.state.userInfo.amIBlocked"  id='button'
           class='absolute bottom-3 right-3 justify-center focus:outline-none 
           space-between bg-gray-900 hover:bg-slate-900 font-medium py-2 px-2 
           rounded inline-flex items-center'>
            <span id='text' class='ml-2 mr-2 text-white text-sm select-none ml-2 '>
              You are Blocked
            </span>
          </button>
  
         <!-- {{ props.nickname }} -->
        </div>
        <div class="flex my-0 mx-auto w-3/5 bg-slate-500 h-6 mb-6 relative">
          <div class="bg-slate-700 h-6 " :style="'width:'+ store.state.user.level * 10 +'%;'"> </div>
          <p class="inline-block z-10 absolute left-2/4 
          -translate-x-2/4 text-slate-400" > level  {{ store.state.user.level }}%  </p>
        </div>
        <div class="cent pt-8 ">
          <div class="grid md:grid-cols-1 lg:grid-cols-1 gap-1 
          lg-gap-1  text-center  mt-8" >
            <div class="p-4  bg-slate-500 rounded-md " > 
              <p class="text-2xl font-semibold pb-4  border-b
               border-neutral-800"> Friends </p>
               <div  class="pt-4 flex items-scretch space-x-2">
                <div v-for="friend in store.state.userFriends" :key="friend" class="flex ">
                    <router-link @click="getInfos(friend.id)" :to="{ name:'User', params: {id: friend.id}}">
                     <img :src="store.methods.playerAvatar(friend)" 
                     class="rounded-full bg-white w-10 h-10 "> </router-link>
                </div>
              </div>
            </div>
          </div>
          <div class="grid md:grid-cols-2 lg:grid-cols-2 gap-2 lg-gap-2 text-center mt-8" >
            <div class="p-4  bg-slate-500 rounded-md " > 
              <p  class="text-2xl font-semibold pb-4 border-b border-neutral-800"> Achievements </p>
  
                <div v-for="achievement in store.state.userAchievements" :key="achievement">
                  <div v-if="achievement == 'first'" class="grid grid-cols-8 
                  justify-items-start  bg-slate-500 pt-4">
                      <div class="place-self-start" > 
                        <img src="../assets/medal.png" class="w-10 h-10">
                      </div>
                      <div class="col-span-7 pr-10"> <span class="text-xl 
                       font-semibold text-slate-900">First game </span>  
                          <span class="text-s font-semibold text-neutral-900" >
                             Congratulations ! You won your first Game! </span>
                       </div>
                  </div>
                  <div v-if="achievement == 'bronze'" 
                  class="grid grid-cols-8 justify-items-start  bg-slate-500 pt-4">
                      <div class="place-self-start" >
                         <img src="../assets/bronze.png" class="w-10 h-10">
                      </div>
                      <div class="col-span-7">
                        <span class="text-xl  font-semibold text-slate-900"> Bronze medal </span> 
                        <span class="text-s font-semibold text-neutral-900" > Congratulations ! You won 5 GAMES! </span> 
                      </div>
                  </div>
                  <div v-if="achievement == 'silver'" 
                  class="grid grid-cols-8 justify-items-start  bg-slate-500 pt-4">
                      <div class="place-self-start" >
                         <img src="../assets/silver.png" class="w-10 h-10">
                      </div>
                      <div class="col-span-7"> 
                        <span class="text-xl  font-semibold text-slate-900"> Silver medal </span>
                        <span class="text-s font-semibold text-neutral-900" >  Congratulations ! You won 10 GAMES! </span>
                       </div>
                  </div>
                  <div v-if="achievement == 'gold'"
                   class="grid grid-cols-8 justify-items-start  bg-slate-500 pt-4">
                      <div class="place-self-start" >
                         <img src="../assets/gold.png" class="w-10 h-10">
                      </div>
                      <div class="col-span-7"> 
                        <span class="text-xl  font-semibold text-slate-900"> Gold medal </span >
                        <span class="text-s font-semibold text-neutral-900" > Congratulations ! You won 20 GAMES! </span> 
                      </div>
                  </div>
                
                
                
                </div>
              </div>
            <div class="p-4  bg-slate-500 rounded-md " > 
              <div > 
                <p class="text-2xl font-semibold pb-4 border-b border-neutral-800  "> Games </p>
                <!-- games  -->
                <div class="scrollbar scrollbar-track-slate-900 scrollbar-thumb-slate-600 max-h-2/3">
                  <div  v-for="game in store.state.usergamesHistory" :key="game" 
                  class="grid grid-cols-3 justify-itmes-center mt-4">
                    <div class="text-neutral-900 font-semibold "> {{ game.winner.username }} </div>
                    <div class="text-gray-900 font-black ">
                       <span> {{ game.winnerScore }} </span> - <span>  {{ game.loserScore }}</span> 
                     </div>
                    <div class="text-neutral-900 font-semibold "> {{ game.loser.username }}  </div>
                  </div>
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
    </div>

      </div>
</template>

<script lang="ts" setup>
import { is } from '@babel/types';
import axios from 'axios';
import { defineComponent , ref, inject, onMounted,nextTick,  computed} from 'vue';
import Footer from '../components/Footer.vue';
import Header from '../components/Header.vue';
import Profile from './Profile.vue';
import LoadingBar from '../components/LoadingBar.vue';
import { UserInfo } from '../interfaces';
const store = inject('store')
const frMenu = ref(false as boolean)
let errors = ref('' as string)

const props = defineProps<{
  id: string,
}>()


  onMounted( async () => {
      // store.state.spinn = true
      //   await axios
      //     .get('http://localhost:3001/profile' ,{ withCredentials: true })
      //     .then(data =>{
      //       store.state.player = data.data.profile;
      //       store.state.friends = data.data.friends;
      //       store.state.achievements = data.data.achievements;
      //       store.state.blockedUsers = data.data.blockedUsers;
      //     } )

        getInfos(parseInt(props.id, 10))
        store.state.spinn = false

    })

      async function getInfos(playerid: number){
          // console.log("playerid::",playerid)
          store.state.spinn = true
          await axios
                .get('http://localhost:3001/profile/' + playerid ,{ withCredentials: true })
                .then(data =>{ store.state.user = data.data.profile;
                  store.state.userFriends = data.data.friends;
                  store.state.userAchievements = data.data.achievements;
                  store.state.userBlockedUsers = data.data.blockedUsers})
                .catch(err => console.log(err.message))

          getGamesHistory(playerid);

          store.state.userInfo.isFriend = false
          store.state.userInfo.userIsBlocked = false
          store.state.userInfo.amIBlocked = false

          var user = store.state.userFriends.find( x => x.id === store.state.player.id)
          if (user != null){
            store.state.userInfo.isFriend = true
            store.state.userInfo.userIsBlocked = false
            store.state.userInfo.amIBlocked = false
            store.state.spinn = false
            return;
          }

          let iamblocked =  store.state.userBlockedUsers.find( x => x.id === store.state.player.id)
          if (iamblocked != null){
            store.state.userInfo.isFriend = false
            store.state.userInfo.userIsBlocked = false
            store.state.userInfo.amIBlocked = true
            store.state.spinn = false
            return;
          }
          let userIsBlocked = store.state.blockedUsers.find( x => x.id === playerid)
          if (userIsBlocked  != null){
            store.state.userInfo.isFriend = false
            store.state.userInfo.userIsBlocked = true
            store.state.userInfo.amIBlocked = false
          }
          store.state.spinn = false

        }



    function removeFriend(){
      store.state.userInfo.isFriend = false
      store.state.userInfo.userIsBlocked = false
      store.state.userInfo.amIBlocked = false
      frMenu.value = false
        axios
            .delete("http://localhost:3001/relation/unfollow/" + props.id , { withCredentials: true } )
            .then(data => { })
            .catch(error =>  console.error( error));
    }


    function addFriend (){

        store.state.userInfo.isFriend = true
        store.state.userInfo.userIsBlocked = false
        store.state.userInfo.amIBlocked = false
            axios.post("http://localhost:3001/relation/add/" + props.id , {} , { withCredentials: true } ) 
            .then(data => { })
            .catch(error =>  console.error( error));
    }



    function blockFriend () {
        store.state.userInfo.isFriend = false
        store.state.userInfo.userIsBlocked = true
        store.state.userInfo.amIBlocked = false
        frMenu.value = false
        axios.post("http://localhost:3001/relation/block/" + props.id, {}, { withCredentials: true } ) 
            .then(data => {})
            .catch(error =>  console.error( error));
    }



    function unblockFriend (){
        store.state.userInfo.isFriend = false
        store.state.userInfo.userIsBlocked = false
        store.state.userInfo.amIBlocked = false
        frMenu.value = false
        axios.delete("http://localhost:3001/relation/unblock/" + props.id ,{ withCredentials: true } )
            .then(data => {})
            .catch(error =>  console.error( error));
    }



    function getUserAvatar(id: number){
      var result = store.state.users.find( x=> x.id === id)
      return result.avatar
    }



    // function to get history of a player
    async function getGamesHistory() {
		  await axios
		      .get('http://localhost:3001/pong-game/games-history/' + props.id)
		      .then((data) => {
		      	  store.state.usergamesHistory = data.data.gamesHistory;
		      })
		      .catch(err => {
		      	  errors.value = err.message ?? 'unknown';
		      });
	  }


    function isConnected(): boolean {
      const found: number =  store.state.connectedUsers.find(user => user.playerId === store.state.user.id );
      if (found)
        return true;
      else
        return false;
    }

</script>

<style>
  #container2 {
    background-image: url("../assets/cover.png");
    background-attachment: scroll;
    height: 300px;
    background-size: cover;
  }

  #bg {
    /* background: url("../assets/bg.jpg") no-repeat; */
    background-image: url("../assets/bg1.jpg");
    width: 100vw;
    height: 80vh;
    /* background-size: contain; */
    background-size: cover;
  }
</style>