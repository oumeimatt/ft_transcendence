"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatGateway = void 0;
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const auth_service_1 = require("../auth/auth.service");
const players_service_1 = require("../players/players.service");
const chat_service_1 = require("./chat.service");
const membership_model_1 = require("./dto/membership.model");
const message_dto_1 = require("./dto/message-dto");
const room_dto_1 = require("./dto/room-dto");
let ChatGateway = class ChatGateway {
    constructor(authService, chatService, userService) {
        this.authService = authService;
        this.chatService = chatService;
        this.userService = userService;
        this.user = [];
        this.title = [];
        this.players = [];
    }
    async definePlayer(client) {
        try {
            this.decoded = client.handshake.query.token;
            this.decoded = await this.userService.verifyToken(this.decoded);
            this.player = await this.userService.getUserById(this.decoded.id);
            if (!this.player) {
                return this.disconnect(client);
            }
            ;
        }
        catch (_a) {
            return this.disconnect(client);
        }
    }
    async getSocketid(id) {
        for (var user of this.user) {
            let decoded = user.handshake.query.token;
            decoded = await this.userService.verifyToken(decoded);
            if (decoded.id === id)
                return user;
        }
    }
    async handleConnection(client) {
        await this.definePlayer(client);
        client.data.player = this.player;
        this.user.push(client);
<<<<<<< HEAD
        console.log(`On Connnect ... !${client.id} ${this.player.username}`);
=======
>>>>>>> ca64583a49be4640eacba5eaf6dfc5e49605b64d
    }
    disconnect(socket) {
        socket.emit('Error', new common_1.UnauthorizedException());
        socket.disconnect();
    }
    handleDisconnect(client) {
        this.user.splice(this.user.indexOf(`${client}`), 1);
        console.log(`On Disconnet ... ! ${client.id}`);
    }
    async onCreateRoom(socket, roomdto) {
        const usernames = roomdto.players;
        for (var username of usernames) {
            const user = await this.userService.getUserByUsername(username);
            if (user)
                this.players.push(user);
        }
        const room = await this.chatService.createRoom(roomdto, this.players);
        await this.chatService.addMember(room, socket.data.player, membership_model_1.RoleStatus.OWNER);
        let userid;
        let rooms;
        let allrooms;
        let members = await this.chatService.getMembersByRoomId(room.id);
        for (var x of this.user) {
            userid = await x.handshake.query.token;
            userid = await this.userService.verifyToken(userid);
            rooms = await this.chatService.getRoomsForUser(userid.id);
            allrooms = await this.chatService.getAllRooms(userid.id);
            this.server.to(x.id).emit('message', rooms);
            this.server.to(x.id).emit('members', members);
            this.server.to(x.id).emit('allrooms', allrooms);
        }
        this.players.splice(0);
    }
    async onCreateMessage(socket, messageDto) {
        await this.definePlayer(socket);
        await this.chatService.createMessage(messageDto, this.player);
        let userid;
        let messages;
        for (var x of this.user) {
            userid = await x.handshake.query.token;
            userid = await this.userService.verifyToken(userid);
            messages = await this.chatService.getMessagesByroomId(messageDto.id);
            if (await this.chatService.isMember(messageDto.id, userid))
                this.server.to(x.id).emit('sendMessage', messages);
        }
    }
    async leaveChannel(socket, roomid) {
        await this.definePlayer(socket);
        await this.chatService.deleteMmebership(roomid, this.decoded.id);
        const rooms = await this.chatService.getRoomsForUser(this.decoded.id);
        this.server.to(socket.id).emit('message', rooms);
        let messages = [];
        if (rooms.length != 0)
            messages = await this.chatService.getMessagesByroomId(rooms[0].id);
        this.server.to(socket.id).emit('sendMessage', messages);
        let members = [];
        members = await this.chatService.getMembersByRoomId(roomid);
        let userid;
        for (var x of this.user) {
            userid = await x.handshake.headers.query.token;
            userid = await this.userService.verifyToken(userid);
            if (await this.chatService.isMember(roomid, userid))
                this.server.to(x.id).emit('members', members);
        }
    }
    async joinChannel(socket, roomid) {
        await this.definePlayer(socket);
        await this.chatService.createMembership(this.player.id, roomid);
    }
    async createDM(sender, receiverid) {
        await this.definePlayer(sender);
        let room = await this.chatService.DMexist(this.player.id, receiverid);
        if (!room) {
            const DM = await this.chatService.createDM(this.player.id, receiverid);
            let allrooms = await this.chatService.getAllRooms(this.player.id);
            let rooms = await this.chatService.getRoomsForUser(this.player.id);
            this.server.to(sender.id).emit('allrooms', allrooms);
            this.server.to(sender.id).emit('message', rooms);
            let decoded = await this.getSocketid(receiverid);
            if (decoded != null) {
                allrooms = await this.chatService.getAllRooms(receiverid);
                rooms = await this.chatService.getRoomsForUser(receiverid);
                this.server.to(decoded.id).emit('allrooms', allrooms);
                this.server.to(decoded.id).emit('message', rooms);
            }
        }
        else {
            let messages = await this.chatService.getMessagesByroomId(room.id);
            this.server.to(this.decoded.id).emit("sendMessage", messages);
        }
    }
    async sendDM(sender, messagedto) {
        await this.definePlayer(sender);
        let receiverid = messagedto.id;
        let roomName = receiverid + ":" + this.player.id;
        let room = await this.chatService.getRoomByName(roomName);
        if (!room)
            room = await this.chatService.getRoomByName(this.player.id + ":" + receiverid);
        messagedto.id = room.id;
        await this.chatService.createMessage(messagedto, this.player);
        for (var x of this.user) {
            let userid = await x.handshake.query.token;
            userid = await this.userService.verifyToken(userid);
            let messages = await this.chatService.getMessagesByroomId(messagedto.id);
            if (await this.chatService.isMember(messagedto.id, userid)) {
                console.log("userid username" + userid.username);
                this.server.to(x.id).emit('sendMessage', messages);
            }
        }
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], ChatGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('createRoom'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, room_dto_1.RoomDto]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "onCreateRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('createMessage'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, message_dto_1.messageDto]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "onCreateMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('leave-channel'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Number]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "leaveChannel", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('join-channel'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Number]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "joinChannel", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('create-DM'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Number]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "createDM", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('send-DM'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, message_dto_1.messageDto]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "sendDM", null);
ChatGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ namespace: '/chat', cors: true }),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        chat_service_1.ChatService,
        players_service_1.UsersService])
], ChatGateway);
exports.ChatGateway = ChatGateway;
//# sourceMappingURL=chat.gateway.js.map