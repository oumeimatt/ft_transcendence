import { reactive } from "vue";

const state = reactive ({
    profile: {},
    users: [],
    rooms: [],
    allRooms: [],
    imageUrl: '',
    logged: false,
    owner: false

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
        if (state.profile.name == owner)
            state.owner = true
        else
            state.owner = false
    }
})
export default {
    state,
    methods,
}