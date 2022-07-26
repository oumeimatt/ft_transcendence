import { Header, UnauthorizedException } from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Console } from 'console';
import { SocketAddress } from 'net';
// import { NotFoundError } from 'rxjs';
import { Socket, Server } from 'socket.io';
import { AuthService } from 'src/auth/auth.service';
import { Player } from 'src/players/player.entity';

import { UsersService } from 'src/players/players.service';
import { UserStatus } from 'src/players/player_status.enum';
import { EntityColumnNotFound } from 'typeorm';
import { ChatService } from './chat.service';
import { JoinChannelDto } from './dto/join-channel-dto';
import { membershipDto } from './dto/membership-dto';
import { RoleStatus } from './dto/membership.model';
import { messageDto } from './dto/message-dto';
import { RoomDto } from './dto/room-dto';
import { membership } from './membership.entity';
import { chatroom } from './room.entity';


//enable the client to communicate with the server
@WebSocketGateway({namespace:'/chat', cors: true})  //'https://hoppscotch.io', 
export class ChatGateway implements  OnGatewayConnection, OnGatewayDisconnect{

  // create a server instance from the WebSocketServer decorators.
  @WebSocketServer() server: Server;
  
    user : any [] = []; //connected users
    decoded :any; //store the access token without bearer
    title:any[]=[];
    player:Player; //get the user by the access token
    players:Player[]=[]; ///store the members of the new created channel

    //! add function to getUserFromSocket 

    constructor(private authService:AuthService,
              private chatService:ChatService,
              private userService:UsersService){}
  
    private async definePlayer(client:Socket)
    {
      try{
        this.decoded = client.handshake.query.token;
        this.decoded = await this.userService.verifyToken(this.decoded);
        this.player = await this.userService.getUserById(this.decoded.id);

        if (!this.player){return this.disconnect(client)};
      }
      catch{return this.disconnect(client);}
    }

    private async getSocketid(id:number):Promise<Socket>{

      for (var user of this.user){
        let decoded = user.handshake.query.token;
        decoded = await this.userService.verifyToken(decoded);
        if (decoded.id === id)
            return user;
      }
      return null;
    }

    //after a client has connected 
    //  afterInit(server: any) {    }

    //when a client joins the connection
      async handleConnection(client:Socket)
      {
          //console.log('Connected: ' + client.id);
          await this.definePlayer(client);
          client.data.player = this.player;
          this.user.push(client);
      }

  
      private disconnect(socket: Socket)
      {
        socket.emit('Error', new UnauthorizedException());
        socket.disconnect();
      }
  
      handleDisconnect(client: any)
      {
        //remove this client form the connected users
        this.user = this.user.filter(us => us.id !== client.id);
       // this.user.splice(this.user.indexOf(`${client}`),1)
      //  console.log(`On Disconnet ... ! ${client.id}`)
      }

      @SubscribeMessage('createRoom')
      async onCreateRoom(socket: Socket, roomdto: RoomDto)
      {
        let found = await this.chatService.getRoomByName(roomdto.name);
        if (found)
        {
           // throw new UnauthorizedException('Room already exist with this name');
           this.server.to(socket.id).emit('room-exist', roomdto.name);
        }
          else{
        const usernames = roomdto.players;
        for (var username of usernames)
        {
          const user:Player = await this.userService.getUserByUsername(username);
          if (user) // user not found protected in frontend
            this.players.push(user);
        }
      //  console.log('players => '+this.players);
        // this.players.push(socket.data.player); 

        const room =  await this.chatService.createRoom(roomdto,this.players); //! users
        await this.chatService.addMember(room, socket.data.player, RoleStatus.OWNER); //! Owner

        let userid:any;
        let rooms:any;
        let allrooms:any;
        let members=await this.chatService.getMembersByRoomId(room.id, this.player.id); //banned and muted users
        for (var x of this.user)
        {
          userid = await x.handshake.query.token;
          userid =  await this.userService.verifyToken(userid);
          rooms = await this.chatService.getRoomsForUser(userid.id);
          allrooms = await this.chatService.getAllRooms(userid.id);
              //console.log('userid => '+userid.username);
          this.server.to(x.id).emit('message', rooms);

          this.server.to(x.id).emit('members', members); //only if the channel is selected

          this.server.to(x.id).emit('allrooms', allrooms);
          //No need the send the messages => there is none
        }
      }
        this.players.splice(0);
      }

      @SubscribeMessage('createMessage')
      async onCreateMessage(socket:Socket, messageDto:messageDto)
      {
        await this.definePlayer(socket);
        if (messageDto.content != '' && await this.chatService.isMember(messageDto.id, this.player.id))
        {
           await this.chatService.createMessage(messageDto,this.player);
 
        //I should send the messages only to the members

          let userid:any;
          let messages:any;
          for (var x of this.user)
          {
              // console.log(`the connected users  ${x.id}`);
            userid = await x.handshake.query.token;
            userid = await this.userService.verifyToken(userid);
            messages = await this.chatService.getMessagesByroomId(messageDto.id, this.player.id);
              // getMessagesByroomId(messageDtoid, userid.id) no need to check if it's a member
            if ((await this.chatService.isMember(messageDto.id, userid)))
                this.server.to(x.id).emit('sendMessage', messages);
          } 
        }
      }

      @SubscribeMessage('leave-channel')
      async leaveChannel(socket:Socket, roomid:number)
      {
        //I should update rooms && members to the concerned users
        //send rooms(mychannels to the player) && send members to the members

        // ==== check if the player is a member be3da
        await this.definePlayer(socket);
        await this.chatService.deleteMmebership(roomid, this.decoded.id);
        const rooms = await this.chatService.getRoomsForUser(this.decoded.id);
        this.server.to(socket.id).emit('message', rooms);//rooms

        let messages = [];
        this.server.to(socket.id).emit('sendMessage', messages);

   
 
        let members = [];
        let userid:any;
        for (var x of this.user)
        {
          if (x.handshake.headers.query)
          {
            userid = await x.handshake.headers.query.token;
            userid = await this.userService.verifyToken(userid);
            members = await this.chatService.getMembersByRoomId(roomid, userid.id);
                if ((await this.chatService.isMember(roomid, userid)))
                  this.server.to(x.id).emit('members', members);
          }
        }
      }

      @SubscribeMessage('join-channel')
      async joinChannel(socket:Socket, JoinChanneldto:JoinChannelDto){
        await this.definePlayer(socket);
        let room = await this.chatService.getRoomById(JoinChanneldto.roomid);
        if (room.password == JoinChanneldto.password)
        {
          await this.chatService.createMembership(this.player.id, JoinChanneldto.roomid);
          //send messages && mychannels to the client
      
          let rooms = await this.chatService.getRoomsForUser(this.player.id);
          this.server.to(socket.id).emit('message', rooms);//rooms
          let members = await this.chatService.getMembersByRoomId(JoinChanneldto.roomid, this.player.id);
          /// this.server.to(socket.id).emit('members', members); => already included in the loop

          //send members => to concerned users
          let messages = await this.chatService.getMessagesByroomId(JoinChanneldto.roomid, this.player.id);
          this.server.to(socket.id).emit('sendMessage', messages);
          for (var x of this.user){
          if(x.handshake.headers.query){
            let player = await x.handshake.headers.query.token;
            player = await this.userService.verifyToken(player);
            if ((await this.chatService.isMember(JoinChanneldto.roomid, player)))
              this.server.to(x.id).emit('members', members);
          }
      }
    }
    //else send password error

    }

    @SubscribeMessage('create-DM')
    async createDM(sender:Socket, receiverid:number ){
      await this.definePlayer(sender);
      //before create
      //check if this channel exist
      //by name sender:receiverid || receiverid:sender
     // let roomName = receiverid+":"+this.player.id;
      let room = await this.chatService.DMexist(this.player.id, receiverid);
      if (!room)
      {
        const DM = await this.chatService.createDM(this.player.id, receiverid);

        let allrooms = await this.chatService.getAllRooms(this.player.id);
        let rooms = await this.chatService.getRoomsForUser(this.player.id);

        this.server.to(sender.id).emit('allrooms', allrooms);
        this.server.to(sender.id).emit('message', rooms);

        let decoded = await this.getSocketid(receiverid);
        if (decoded != null)
        {
          allrooms = await this.chatService.getAllRooms(receiverid);
          rooms = await this.chatService.getRoomsForUser(receiverid);

          this.server.to(decoded.id).emit('allrooms', allrooms);
          this.server.to(decoded.id).emit('message', rooms);
         // this.server.to(decoded.id).emit('roomid', )
        }
      }
      else
      {
       // let messages = await this.chatService.getMessagesByroomId(room.id, this.player.id);
        let messages = await this.chatService.getDMs(receiverid, this.player.id);
        this.server.to(this.decoded.id).emit("sendMessage", messages);
      }

     }

    @SubscribeMessage('send-DM')
    async sendDM(sender:Socket, messagedto : messageDto){
     // console.log(messagedto);
      if (messagedto.content != '')
      {
      await this.definePlayer(sender);
      let receiverid = messagedto.id;
      let roomName = receiverid+":"+this.player.id;
      let room = await this.chatService.getRoomByName(roomName);
      if (!room)
        room = await this.chatService.getRoomByName(this.player.id+":"+receiverid);
      messagedto.id =  room.id;
      await this.chatService.createMessage(messagedto, this.player);
      let socketguest = await this.getSocketid(receiverid);
      //let  messages = await this.chatService.getMessagesByroomId(messagedto.id, this.player.id);
      let messages =  await this.chatService.getDMs(receiverid, this.player.id);;
      if (socketguest)
      {
         // console.log(socketguest.id);
          this.server.to(socketguest.id).emit('sendMessage', messages);
      }
      this.server.to(sender.id).emit('sendMessage', messages);
      // for (var x of this.user)
      // {
      //   let  userid = await x.handshake.query.token;
      //   userid = await this.userService.verifyToken(userid);
      //   let  messages = await this.chatService.getMessagesByroomId(messagedto.id);
      //   // console.log(messages);
      //   //check if it's a member before sending the messages
      //   if (await this.chatService.isMember(messagedto.id, userid))
      //   {
      //    // console.log("userid username"+userid.username);
      //     console.log('send message to ', userid.username);
      //     this.server.to(x.id).emit('sendMessage', messages);
      //   }
      // }

      //check the valid name of the channel => get the right id and add it to the message dto
      //create message
      //send to the members
    }
    }

      @SubscribeMessage('set-admin')
      async setAdmin(socket:Socket,membershipdto:membershipDto){
          this.chatService.updateMembership(membershipdto.userid, membershipdto.roomid, RoleStatus.ADMIN);
          //send members to the concerned users
          let members = await this.chatService.getMembersByRoomId(membershipdto.roomid, this.player.id);
          let userid:any;
          for (var x of this.user){
            userid = await x.handshake.query.token;
            userid =await this.userService.verifyToken(userid);
            if ((await this.chatService.isMember(membershipdto.roomid, userid)))
              this.server.to(x.id).emit('members', members);
          }
      }

      /* 
      @SubscribeMessage('remove-admin') 
      async removeAdmin(socket:Socket,membershipdto:membershipDto){
          this.chatService.updateMembership(membershipdto.userid, membershipdto.roomid, RoleStatus.USER);
          //send members to the concerned users
          let members = await this.chatService.getMembersByRoomId(membershipdto.roomid, this.player.id);
          let userid:any;
          for (var x of this.user){
            userid = await x.handshake.query.token;
            userid =await this.userService.verifyToken(userid);
            if (await this.chatService.isMember(membershipdto.roomid, userid))
              this.server.to(x.id).emit('members', members);
          }
      } */


    //ban-User => isbanned true => emit rooms => to the banned user
    //Mute-User
    //set-admin => change role
    //remove admin => change role

    //change password=> remove all the membership


    @SubscribeMessage('invite-game')
    async invitePlay(client:Socket, guest:number){
      //define player
      //console.log('event invite called !')
      await this.definePlayer(client);
      //guest

      //check if the guest is playing
      const status = await this.userService.getStatusByUserId(guest);
      let guestUsername = (await this.userService.getUserById(guest)).username;
      if (status == UserStatus.PLAYING)
      {
          console.log('The User is already playing')
          this.server.to(client.id).emit('player-playing', guestUsername);
      }
      else{
      let socketguest = await this.getSocketid(guest);
      console.log(socketguest + "Exist");
      if (socketguest)
        this.server.to(socketguest.id).emit('invitation', this.player.username);
      else
        {
          this.server.to(client.id).emit('player-offline', guestUsername);
        }
      }

    }

    @SubscribeMessage('invitation-accepted')
    async acceptInvitation(client:Socket, opponent : string){
      //send an event to redirect this user too      
     // console.log(client.id);
      await this.definePlayer(client);
      //console.log('invitation accepted !! abckend '+ opponent);
      //console.log(client.id);

      //this.server.to(client.id).emit('gotogame', this.player.username);

      let vs:Player = await this.userService.getUserByUsername(opponent);
      // console.log(vs);
       let socket = await this.getSocketid(vs.id);
       if (socket)
          this.server.to(socket.id).emit('gotogame', client.data.player.username);
    }

    //ban user => update rooms && all rooms && members

    @SubscribeMessage('edit-pwd')
    async editPwd(client:Socket, JoinChanneldto:JoinChannelDto){

      await this.definePlayer(client);

      await this.chatService.updatePassword(JoinChanneldto.roomid, JoinChanneldto.password);
    }

    @SubscribeMessage('remove-pwd')
    async removePwd(client:Socket, roomid:number){
      await this.definePlayer(client);

      await this.chatService.updatePassword(roomid, '');
    }

    //remove a user => {for this user {send my channnels} for all the concerned users send members
    //}

    @SubscribeMessage('remove-user')
    async kickUser(client : Socket, membershipdto: membershipDto ){

      await this.definePlayer(client);
      await this.chatService.deleteMmebership(membershipdto.roomid, membershipdto.userid);

      let removedUser = await this.getSocketid(membershipdto.userid);
      if (removedUser)
      {
          let rooms = await this.chatService.getRoomsForUser(membershipdto.userid);
          let allrooms = await this.chatService.getAllRooms(membershipdto.userid);
          this.server.to(removedUser.id).emit('message', rooms);//
          this.server.to(removedUser.id).emit('allrooms', allrooms);
      }
      let members = await this.chatService.getMembersByRoomId(membershipdto.roomid, this.player.id);
      for (var x of this.user){
        let userid = await x.handshake.query.token;
            userid = await this.userService.verifyToken(userid);
            if ((await this.chatService.isMember(membershipdto.roomid, userid.id)))
                this.server.to(x.id).emit('members', members);
      }

   
    }

    @SubscribeMessage('ban-user')
    async banUser(client:Socket, membershipdto:membershipDto){

      await this.definePlayer(client);
      await this.chatService.updateBanStatus(membershipdto.userid, membershipdto.roomid, true);

      //send all channels + My channels to this user 
      let rooms = await this.chatService.getRoomsForUser(membershipdto.userid);
      let allrooms = await this.chatService.getAllRooms(membershipdto.userid);

      let bannedUser = await this.getSocketid(membershipdto.userid);
      this.server.to(bannedUser.id).emit('message', rooms);//
      this.server.to(bannedUser.id).emit('allrooms', allrooms);

      //send members to all the concerned users(members not banned) => {only if isbanned is returned}
      let members = await this.chatService.getMembersByRoomId(membershipdto.roomid, this.player.id);
      for (var x of this.user){
        let userid = await x.handshake.query.token;
            userid = await this.userService.verifyToken(userid);
            if ((await this.chatService.isMember(membershipdto.roomid, userid.id))) //member and not banned
                this.server.to(x.id).emit('members', members);
      }

    }

    @SubscribeMessage('unban-user')
    async unbanUser(client:Socket, membershipdto:membershipDto){
      await this.definePlayer(client);
      await this.chatService.updateBanStatus(membershipdto.userid, membershipdto.roomid, false);

      //send all channels + My channels to this user 

      //send members to all the concerned users => {only if isbanned is returned}

      let rooms = await this.chatService.getRoomsForUser(membershipdto.userid);
      let allrooms = await this.chatService.getAllRooms(membershipdto.userid);

      let unbannedUser = await this.getSocketid(membershipdto.userid);
      this.server.to(unbannedUser.id).emit('message', rooms);//
      this.server.to(unbannedUser.id).emit('allrooms', allrooms);

      //send members to all the concerned users(members not banned) => {only if isbanned is returned}
      let members = await this.chatService.getMembersByRoomId(membershipdto.roomid, this.player.id);
      for (var x of this.user){
        let userid = await x.handshake.query.token;
            userid = await this.userService.verifyToken(userid);
            if ((await this.chatService.isMember(membershipdto.roomid, userid.id))) //member and not banned
                this.server.to(x.id).emit('members', members);
      }

    }
}
