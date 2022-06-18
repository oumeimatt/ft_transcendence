<template>
    <div class="Container bg-slate-800  ">
       <div class=" h-screen">
          <div class="text-center items-center justify-center mx-auto">

                <!-- ********* chat room ********  -->
              <img src="../assets/group.png" class="mx-auto" >
              <div  class=" flex itmes-center justify-center text-center  -mt-[40px] "> 
                <p class="font-bold lg:text-2xl md:text-2xl text-gray-400"> {{ name }} </p> 
                <!-- <img @click="showEdit" v-if="store.state.owner" src="../assets/edit.png" class="h-4 w-4 ml-4  mt-2" alt=""> -->
              </div>

              <!-- <div v-if="store.state.owner">
                    <div v-if="editRoom" class=" rounded-md mt-4">
                        <div v-if="RoomInfo(name).type == 'public'" class=" block py-2 text-sm text-gray-300 hover:underline  ">Set Password
                        </div>
                        <div v-if="RoomInfo(name).type == 'private'" class=" block py-2 text-sm text-gray-300 hover:underline  ">Change Password
                        </div>
                        <div v-if="RoomInfo(name).type == 'private'" class=" block py-2 text-sm text-gray-300 hover:underline  ">Remove Password
                        </div>
                    </div>

              </div> -->

          </div> 
          <div class="mt-16 ">
            <h1 class="font-bold text-xl text-gray-300 mb-4"> Admins </h1>
             <div v-if="RoomInfo(name)" class=" h-5/6 scrollbar scrollbar-track-zinc-900 scrollbar-thumb-zinc-600 max-h-2/3">
                <div v-for="admin in RoomInfo(name).admins">
                    <div  class="flex justify-start items-center space-x-2 mt-4"> 
                        <img v-if="usersInfo(admin)" :src="usersInfo(admin).pdp" class="lg:ml-8 h-8 w-8 rounded-full"> <span v-if="usersInfo(admin)" class="font-semibold text-slate-400 hover:underline cursor-pointer "> {{ usersInfo(admin).name }} </span> 
                    </div>
                </div>
             </div>
          </div>

          <!--  ******** MEMBERS ******** -->

          <div class="mt-16">
            <h1 class="font-bold text-xl text-gray-300 mb-4"> Members </h1>
             <div v-if="RoomInfo(name)" class=" h-5/6 scrollbar scrollbar-track-zinc-900 scrollbar-thumb-zinc-600 max-h-2/3">
                <div v-for="member in RoomInfo(name).members">
                    <div class="flex justify-start items-center space-x-2 mt-4"> 
                        <img v-if="usersInfo(member)" :src="usersInfo(member).pdp" class="lg:ml-8 h-8 w-8 rounded-full"> <span v-if="usersInfo(member)" class="font-semibold text-slate-400 hover:underline cursor-pointer "> {{ usersInfo(member).name }} </span> 
                    </div>
                </div>
              


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
    // const edit= ref(false)
    // const showEdit = () => (props.editRoom = !props.editRoom)
    function usersInfo(name: string){
        for (var user of store.state.users) {
            if (user.name == name){
                return user
            }
        }
        return null
    }
    function RoomInfo(name: string){
		for (var room of store.state.rooms) {
			if (room.name == name){
				return room
			}
		}
		return null
	}

</script>