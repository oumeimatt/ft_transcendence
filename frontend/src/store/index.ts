

import { Script } from "vm";
import { reactive } from "vue";

interface Profile {
    id: number,
    username: string
    avatar: string,
    level: number,
    status: string,
    two_fa: boolean,
    recievers: Profile[],
    senders: Profile[]
}

const state = reactive<{player: Profile, users: Profile[], rooms:string[], allRooms:string[], imageUrl: string, owner:boolean, editRoom: boolean}, {user : Profile, users: Profile[], rooms:string[], allRooms:string[], imageUrl: string, owner:boolean, editRoom: boolean}> ({
    player :{id:-1, username:'',avatar:'' ,level:-1, status:'offline',two_fa:false, recievers: [], senders: [] },
    user : {id:-1, username:'',avatar:'' ,level:-1, status:'offline',two_fa:false, recievers: [], senders: [] },
    friends: [],
    achievements: [],
    users: [],
    rooms: [],
    allRooms: [],
    imageUrl: '',
    owner: false,
    editRoom: false,
    connection: '',
    messageDto:{
        id:null,
        content:"",
    },
    membershipdtp:{
        roomid:null,
        userid:null,
      }
})



const methods = reactive({
    changeNickname(newnickname: string){
        if (newnickname.length > 0 && newnickname.length <= 10){
            state.player.username = newnickname ;
            
        }
        // 
    },
    changeAvatar(){
        state.player.avatar = state.imageUrl
    },
    logout(){

    },
    // roomOwner(owner: string){
    //     if (state.player.username == owner){
    //         state.owner = true
    //     }
    //     else
    //         state.owner = false
    // },
    // RoomInfo(name: string){
	// 	for (var room of state.rooms) {
	// 		if (room.name == name){
	// 			return room
	// 		}
	// 	}
	// 	return null
	// },
    // allRoomInfo(name: string){
	// 	for (var room of state.allRooms) {
	// 		if (room.name == name){
	// 			return room
	// 		}
	// 	}
	// 	return null
	// },
    usersInfo(username: string){
        for (var user of state.users) {
            if (user.id == id){
                return user
            }
        }
        return null
    }
})
export default {
    state,
    methods,
}