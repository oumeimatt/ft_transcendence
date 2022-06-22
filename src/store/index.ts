import { reactive } from "vue";

const state = reactive ({
    profile: {},
    users: [],
    rooms: [],
    allRooms: [],
    imageUrl: '',
    logged: false,
    owner: false,
    editRoom: false

})



const methods = reactive({
    changeNickname(newnickname: string){
        if (newnickname.length > 0 && newnickname.length <= 10){
            state.profile.name = newnickname ;
        }
        // 
    },
    changeAvatar(){
        state.profile.pdp = state.imageUrl
    },
    roomOwner(owner: string){
        if (state.profile.name == owner){
            state.owner = true
        }
        else
            state.owner = false
    },
    RoomInfo(name: string){
		for (var room of state.rooms) {
			if (room.name == name){
				return room
			}
		}
		return null
	},
    allRoomInfo(name: string){
		for (var room of state.allRooms) {
			if (room.name == name){
				return room
			}
		}
		return null
	},
    usersInfo(name: string){
        for (var user of state.users) {
            if (user.name == name){
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
