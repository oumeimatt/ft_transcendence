<template>
    <div class="Container bg-myblue col-span-2 md:col-span-1 rounded-lg lg:col-span-1 ">
       <div class=" h-screen">
          <div class="text-center items-center justify-center mx-auto">

                <!-- ********* chat room ********  -->
              <img src="../assets/group.png" class="mx-auto" >
              <div  class=" flex itmes-center justify-center text-center  -mt-[40px] "> 
                <p class="font-bold lg:text-2xl md:text-2xl text-gray-400"> {{ name }} </p> 
                <img  src="../assets/edit.png" class="h-4 w-4 ml-4  mt-2" alt="">
              </div>

              <!-- <div >
                    <div v-if="store.state.editRoom" class=" rounded-md mt-4">
                        <div @click="setPass = !setPass" v-if="store.methods.RoomInfo(name).type == 'public'" class="cursor-pointer block py-2 text-sm text-gray-300 hover:underline  ">Set Password
                        </div>
                        <div @click="changePass = !changePass" v-if="store.methods.RoomInfo(name).type == 'private'" class="cursor-pointer block py-2 text-sm text-gray-300 hover:underline  ">Change Password
                        </div>
                        <div v-if="store.methods.RoomInfo(name).type == 'private'" class="cursor-pointer block py-2 text-sm text-gray-300 hover:underline  ">Remove Password
                        </div>
                    </div>

              </div> -->
            <!-- <div v-if="setPass" class="fixed inset-60 z-50 ">
                <div class=" my-6 mx-auto max-w-sm text-center ">
  
                    <div class="border-0 rounded-lg shadow-lg w-full bg-white  ">
                        <div class=" p-5 border-b border-solid border-slate-200 rounded-t">
                            <h3 class=" m-auto font-semibold text-xl"> {{name}} </h3>
                        </div>
				        	<form class=" grid gap-3 grid-cols-1  p-6 border-t border-solid border-slate-200 rounded-b">
				        		 <input type="password" placeholder="Password" class="bg-neutral-200 border-b rounded h-8 pl-4">
				        	</form>
                        <div class="flex items-center justify-center space-x-8  p-6 border-t border-solid border-slate-200 rounded-b">
                            <button @click="setPass = !setPass" class="text-gray-800 border border-solid white hover:bg-slate-800 hover:text-white  font-bold uppercase text-sm px-6 py-3 rounded outline-none    " type="button" v-on:click="toggleModal()">
                              Cancel
                            </button>
                            <button @click="savePassowrd" class="text-gray-800 font-bold hover:border hover:rounded hover:border-solid hover:white hover:text-white hover:bg-slate-800 uppercase px-6 py-3 text-sm outline-none    " type="button" v-on:click="toggleModal()">
                              Save Password
                            </button>
                        </div>
                    </div>
                </div>
            </div> -->

            <!-- <div v-if="changePass" class="fixed inset-60 z-50 ">
                <div class=" my-6 mx-auto max-w-sm text-center ">
                  
                    <div class="border-0 rounded-lg shadow-lg w-full bg-white  ">

                        <div class=" p-5 border-b border-solid border-slate-200 rounded-t"> 
                            <h3 class=" m-auto font-semibold text-xl"> {{name}} </h3>
                        </div>
				        	<form class=" grid gap-3 grid-cols-1  p-6 border-t border-solid border-slate-200 rounded-b">
				        		 <input type="password" placeholder="Password" class="bg-neutral-200 border-b rounded h-8 pl-4">
                            </form>
                        <div class="flex items-center justify-center space-x-8  p-6 border-t border-solid border-slate-200 rounded-b">
                            <button @click="changePass = !changePass" class="text-gray-800 border border-solid white hover:bg-slate-800 hover:text-white  font-bold uppercase text-sm px-6 py-3 rounded outline-none    " type="button" v-on:click="toggleModal()">
                              Cancel
                            </button>
                            <button @click="savePassowrd" class="text-gray-800 font-bold hover:border hover:rounded hover:border-solid hover:white hover:text-white hover:bg-slate-800 uppercase px-6 py-3 text-sm outline-none    " type="button" v-on:click="toggleModal()">
                              Save Password
                            </button>
                        </div>
                    </div>
                </div>
            </div> -->

          </div> 
          <div class="mt-16 ">
            <h1 class="font-bold text-xl text-gray-300 mb-4"> Admins </h1>
             <div class=" h-5/6 scrollbar scrollbar-track-zinc-900 scrollbar-thumb-zinc-600 max-h-2/3">
                <!-- <div v-for="admin in store.methods.RoomInfo(name).admins">
                    <div  class="flex justify-start items-center space-x-2 mt-4"> 
                        <img v-if="store.methods.usersInfo(admin)" :src="store.methods.usersInfo(admin).pdp" class="lg:ml-8 h-8 w-8 rounded-full"> <span v-if="store.methods.usersInfo(admin)" class="font-semibold text-slate-400 hover:underline cursor-pointer "> {{ store.methods.usersInfo(admin).name }} </span> 
                    </div>
                </div> -->
             </div>
          </div>

          <!--  ******** MEMBERS ******** -->

          <div class="mt-16">
            <h1 class="font-bold text-xl text-gray-300 mb-4"> Members </h1>
             <div  class=" h-5/6 scrollbar scrollbar-track-zinc-900 scrollbar-thumb-zinc-600 max-h-2/3">
                <!-- <div v-for="member in store.methods.RoomInfo(name).members">
                    <div @click="showMemberOptions = !showMemberOptions" class="flex justify-start items-center space-x-2 mt-4"> 
                        <img v-if="store.methods.usersInfo(member)" :src="store.methods.usersInfo(member).pdp" class="lg:ml-8 h-8 w-8 rounded-full">
                        <span v-if="store.methods.usersInfo(member)" class="font-semibold text-slate-400 hover:underline cursor-pointer "> {{ store.methods.usersInfo(member).name }} </span> 
                    </div>

                </div> -->
                <!-- <div v-if="showMemberOptions" class="z-10 divide-y bg-slate-700 divide-gray-800 rounded shadow w-44 text-center">
				    <ul class="py-1 text-sm text-gray-700 dark:text-gray-200" >
				    <li>
				    	<div class="block px-4 py-2 hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-600 dark:hover:text-white">Set as admin </div>
				    </li>
				    <li>
				    	<a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Ban</a>
				    </li>
				    <li>
				    	<a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Mute</a>
				    </li>
				    </ul>
				</div> -->
              


          </div>
          </div>

          <!-- ******* ADMINS *******  -->


        </div>
    </div>
</template>

<script lang="ts" setup>
    import {inject, ref, onMounted, onUpdated} from 'vue';
    const store = inject('store')
    const props = defineProps({
        name: String,
        editRoom: Boolean
    })
    const owner = ref(false)
    const setPass = ref(false)
    const changePass = ref(false)
    const showMemberOptions = ref(false)
    // const edit= ref(false)
    // const showEdit = () => (props.editRoom = !props.editRoom)

</script>