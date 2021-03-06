

import { Script } from "vm";
import { reactive } from "vue";
import { io, Socket } from 'socket.io-client';
import { PlayerProfile } from '../interfaces/PlayerProfile'
import { UserInfos } from '../interfaces'

interface chatRoom {
    id: number,
    name: string,
    isPublic: boolean,
    ischannel: boolean
}

interface roomRole {
    id_membership:number,
    role:string,
    playerid:number,
    roomid:number

}


interface messageDto {
    id: number, // sender
    content:string
}

interface roomMember {
    member: PlayerProfile,
    role: string
}


const state = reactive<{
        player: PlayerProfile,
        user: PlayerProfile,
        friends: PlayerProfile[],
        achievements: string[],
        blockedUsers: PlayerProfile[],
        userFriends: PlayerProfile[],
        userAchievements:string[],
        userbBlockedUsers: PlayerProfile[],
        userInfo : UserInfos,
        users: PlayerProfile[],
        rooms:chatRoom[],
        allRooms:chatRoom[],
        imageUrl: string,
        owner:boolean,
        editRoom: boolean,
        connection: Socket,
        roominfo: roomRole,
        message: string,
        messages: messageDto[],
        roomSelected:number,
        roomMembs: roomMember[],
        spinn: boolean,
        usergamesHistory: unknown,
        connectedUsers: number[]
    }> ({
    player :{id:-1, username:'',avatar:'' ,level:-1, status:'offline',two_fa:false, recievers: [], senders: [] },
    user : {id:-1, username:'',avatar:'' ,level:-1, status:'offline',two_fa:false, recievers: [], senders: [] },
    friends: [],
    achievements: [],
    blockedUsers: [],
    userFriends:[],
    userAchievements: [],
    userBlockedUsers: [],
    userInfo: {isFriend: false, userIsBlocked: false, amIBlocked: false},
    users: [],
    rooms: [],
    allRooms: [],
    imageUrl: '',
    owner: false,
    editRoom: false,
    connection: null,
    roominfo:{id_membership:-1, role:'', playerid:-1, roomid:-1},
    message:"",
    messages: [],
    roomSelected:0,
    roomMembs: [],
    spinn: false,
    usergamesHistory: [],
    connectedUsers: [],

    // membershipdtp:{
    //     roomid:null,
    //     userid:null,
    //   }
})



const methods = reactive({

    playerAvatar(player:PlayerProfile ){
        if (player.avatar.startsWith("https://avatars.dicebear.com") || player.avatar.startsWith("http://10.11.1.2:3001")){
            return player.avatar
        }
        return ("http://10.11.1.2:3001/" + player.avatar )
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