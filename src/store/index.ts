import { reactive } from "vue";

const state = reactive ({
    nickname: 'oel-yous',
    users: []
})

const methods = reactive({
    changeNickname(newnickname: string){
        if (newnickname.length > 0 && newnickname.length <= 10){
            state.nickname = newnickname ;
        }
    }
})
export default {
    state,
    methods,
}