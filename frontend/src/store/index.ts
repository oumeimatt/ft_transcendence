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

const state = reactive<{player: Profile, users: Profile[], rooms:string[], allRooms:string[], imageUrl: string, owner:boolean, editRoom: boolean}> ({
    player :{id:-1, username:'',avatar:'' ,level:-1, status:'offline',two_fa:false, recievers: [], senders: [] },
    users: [],
    rooms: [],
    allRooms: [],
    imageUrl: '',
    owner: false,
    editRoom: false

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
    usersInfo(id: number){
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
