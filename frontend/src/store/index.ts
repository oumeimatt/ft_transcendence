

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

interface chatRoom {
    id: number,
    name: string,
    isPublic: boolean,
    ischannel: boolean
}

const state = reactive<{player: Profile, user: Profile, friends: Profile[], achievements: string[],userFriends: Profile[], userAchievements:string[], users: Profile[], rooms:chatRoom[], allRooms:chatRoom[], imageUrl: string, owner:boolean, editRoom: boolean, connection: string}> ({
    player :{id:-1, username:'',avatar:'' ,level:-1, status:'offline',two_fa:false, recievers: [], senders: [] },
    user : {id:-1, username:'',avatar:'' ,level:-1, status:'offline',two_fa:false, recievers: [], senders: [] },
    friends: [],
    achievements: [],
    userFriends:[],
    userAchievements: [],
    users: [],
    rooms: [],
    allRooms: [],
    imageUrl: '',
    owner: false,
    editRoom: false,
    connection: '',
    // messageDto:{
    //     id:null,
    //     content:"",
    // },
    // membershipdtp:{
    //     roomid:null,
    //     userid:null,
    //   }
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
    playerAvatar(player:Profile ){
        if (player.avatar.startsWith("https://avatars.dicebear.com") || player.avatar.startsWith("public/assets")){
            return player.avatar
        }
        return ("../public/assets/" + player.avatar )
    },
    usersInfo(name: string){
        for (var user of state.users) {
            if (user.username == name){
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