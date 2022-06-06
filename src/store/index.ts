import { reactive } from "vue";

const state = reactive ({
    nickname: 'oel-yous'
})

const methods = reactive({
    changeNickname(newnickname){
        if (newnickname.length > 0 && newnickname.length <= 10){
            state.nickname = newnickname ;
        }
    }
})
export default {
    state,
    methods,
}