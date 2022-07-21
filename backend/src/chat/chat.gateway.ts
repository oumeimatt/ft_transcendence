import { Header, UnauthorizedException } from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Console } from 'console';
// import { NotFoundError } from 'rxjs';
import { Socket, Server } from 'socket.io';
import { AuthService } from 'src/auth/auth.service';
import { Player } from 'src/players/player.entity';

import { UsersService } from 'src/players/players.service';
import { EntityColumnNotFound } from 'typeorm';
import { ChatService } from './chat.service';
import { membershipDto } from './dto/membership-dto';
import { RoleStatus } from './dto/membership.model';
import { messageDto } from './dto/message-dto';
import { RoomDto } from './dto/room-dto';
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
     // return null;

    }

    //after a client has connected 
    //  afterInit(server: any) {    }

    //when a client joins the connection
      async handleConnection(client:Socket)
      {
        await this.definePlayer(client);
        //  console.log(this.player);
        client.data.player = this.player;
        // const rooms = await this.chatService.getRoomsForUser(this.decoded.id);
        // const allrooms = await this.chatService.getAllRooms(this.decoded.id);
         this.user.push(client);
        // this.title.push(`${client.id}`);
          console.log(`On Connnect ... !${client.id} ${this.player.username}`)
     
        // this.server.to(client.id).emit('message', rooms);//rooms
        // let messages = [];
        // let members = [];
        // if (rooms.length != 0)
        // {
        //   messages = await this.chatService.getMessagesByroomId(rooms[0].id);
        //   members = await this.chatService.getMembersByRoomId(rooms[0].id);
        // }
        // this.server.to(client.id).emit('sendMessage', messages);
        // this.server.to(client.id).emit('members', members);
        // this.server.to(client.id).emit('allrooms', allrooms);
      }

  
      private disconnect(socket: Socket)
      {
        socket.emit('Error', new UnauthorizedException());
        socket.disconnect();
      }
  
      handleDisconnect(client: any)
      {
        //remove this client form the connected users
        this.user.splice(this.user.indexOf(`${client}`),1);
        console.log(`On Disconnet ... ! ${client.id}`)
      }

      @SubscribeMessage('createRoom')
      async onCreateRoom(socket: Socket, roomdto: RoomDto)
      {
        
        const usernames = roomdto.players;
        for (var username of usernames)
        {
          const user:Player = await this.userService.getUserByUsername(username);
          if (user)
            this.players.push(user);
          //throw exception if user not found
        }
      //  console.log('players => '+this.players);
        // this.players.push(socket.data.player); 

        const room =  await this.chatService.createRoom(roomdto,this.players); //! users
        await this.chatService.addMember(room, socket.data.player, RoleStatus.OWNER); //! Owner

        let userid:any;
        let rooms:any;
        let allrooms:any;
        let members=await this.chatService.getMembersByRoomId(room.id);
        for (var x of this.user)
        {
          userid = await x.handshake.query.token;
          userid =  await this.userService.verifyToken(userid);//await this.authService.verifyJwt(userid);
          rooms = await this.chatService.getRoomsForUser(userid.id);
          allrooms = await this.chatService.getAllRooms(userid.id);
      //    console.log('userid => '+userid.username);
          this.server.to(x.id).emit('message', rooms);

          this.server.to(x.id).emit('members', members);

          this.server.to(x.id).emit('allrooms', allrooms);
          //No need the send the messages => there is none
        }
        this.players.splice(0);
      }

      @SubscribeMessage('createMessage')
      async onCreateMessage(socket:Socket, messageDto:messageDto)
      {
        //id of the room
        //content of the message
        // this.decoded = socket.handshake.headers.authorization.split(" ")[1];
        // this.decoded = await this.userService.verifyToken(this.decoded);
        // this.player = await this.userService.getUserById(this.decoded.id);
        await this.definePlayer(socket);
        await this.chatService.createMessage(messageDto,this.player);
 
        //I should send the messages only to the members

        let userid:any;
        let messages:any;
        for (var x of this.user)
        {
         // console.log(`the connected users  ${x.id}`);
          userid = await x.handshake.query.token;
          userid = await this.userService.verifyToken(userid);
          messages = await this.chatService.getMessagesByroomId(messageDto.id);
         // console.log(messages);
        //check if it's a member before sending the messages
          if (await this.chatService.isMember(messageDto.id, userid))
            this.server.to(x.id).emit('sendMessage', messages);
        } 
      }

    @SubscribeMessage('leave-channel')
    async leaveChannel(socket:Socket, roomid:number)
    {
      // this.decoded = socket.handshake.headers.authorization.split(" ")[1];
      // this.decoded = await this.userService.verifyToken(this.decoded);
      await this.definePlayer(socket);
      await this.chatService.deleteMmebership(roomid, this.decoded.id);
      const rooms = await this.chatService.getRoomsForUser(this.decoded.id);
      this.server.to(socket.id).emit('message', rooms);//rooms

   
 
       let messages = [];
       if (rooms.length != 0)
           messages = await this.chatService.getMessagesByroomId(rooms[0].id);
       //  console.log(`the connected users  ${x.id}`);
         this.server.to(socket.id).emit('sendMessage', messages);
      let members = [];
      members = await this.chatService.getMembersByRoomId(roomid);
      let userid:any;
      for (var x of this.user)
      {
        userid = await x.handshake.headers.query.token;
        userid = await this.userService.verifyToken(userid);
        if (await this.chatService.isMember(roomid, userid))
          this.server.to(x.id).emit('members', members);
      }
    }

    @SubscribeMessage('join-channel')
    async joinChannel(socket:Socket, roomid:number){
      await this.definePlayer(socket);
      await this.chatService.createMembership(this.player.id, roomid);
      //Send new members to the members=> and connected  => don't send messages

      //get the membership of roomid, playerid => 
      //call add member to roomid =>c onnected user id=> role=> normal member
    }

    //
    @SubscribeMessage('create-DM')
    async createDM(sender:Socket, receiverid:number ){
      await this.definePlayer(sender);
      //before create
      //check if this channel exist
      //by name sender:receiverid || receiverid:sender
      const room = await this.chatService.DMexist(this.player.id, receiverid);
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
        }
      }
      else
      {
        let messages = await this.chatService.getMessagesByroomId(room.id);
        this.server.to(this.decoded.id).emit("sendMessage", messages);
      }

     }

    @SubscribeMessage('send-DM')
    async sendDM(sender:Socket, messagedto : messageDto){
      console.log(messagedto);
      await this.definePlayer(sender);
      let receiverid = messagedto.id;
      let roomName = receiverid+":"+this.player.id;
      let room = await this.chatService.getRoomByName(roomName);
      if (!room)
        room = await this.chatService.getRoomByName(this.player.id+":"+receiverid);
      messagedto.id =  room.id;
      console.log("===="+room.id);
      await this.chatService.createMessage(messagedto, this.player);
      for (var x of this.user)
      {
        let  userid = await x.handshake.query.token;
        userid = await this.userService.verifyToken(userid);
        let  messages = await this.chatService.getMessagesByroomId(messagedto.id);
       // console.log(messages);
      //check if it's a member before sending the messages
        if (await this.chatService.isMember(messagedto.id, userid))
          this.server.to(x.id).emit('sendMessage', messages);
      }

      //check the valid name of the channel => get the right id and add it to the message dto
      //create message
      //send to the members
    }

    // @SubscribeMessage('set-admin')
    // async setAdmin(socket:Socket, userid:number){
          //update role
          //
    // }

    //ban-User
    //Mute-User
    //set-admin => change role
    //remove admin => change role

    //change password=> remove all the membership


}