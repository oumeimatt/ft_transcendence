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
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const auth_service_1 = require("../auth/auth.service");
const players_service_1 = require("../players/players.service");
const player_status_enum_1 = require("../players/player_status.enum");
const chat_service_1 = require("./chat.service");
const join_channel_dto_1 = require("./dto/join-channel-dto");
const membership_dto_1 = require("./dto/membership-dto");
const membership_model_1 = require("./dto/membership.model");
const message_dto_1 = require("./dto/message-dto");
const mute_dto_1 = require("./dto/mute-dto");
const room_dto_1 = require("./dto/room-dto");
let ChatGateway = class ChatGateway {
    constructor(authService, chatService, userService) {
        this.authService = authService;
        this.chatService = chatService;
        this.userService = userService;
        this.user = [];
        this.players = [];
    }
    async definePlayer(client) {
        try {
            this.player = null;
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
            try {
                let decoded = user.handshake.query.token;
                decoded = await this.userService.verifyToken(decoded);
                if (decoded.id === id)
                    return user;
            }
            catch (_a) { }
        }
        return null;
    }
    async handleConnection(client) {
        await this.definePlayer(client);
        if (this.player) {
            client.data.player = this.player;
            this.user.push(client);
        }
    }
    disconnect(socket) {
        socket.disconnect();
    }
    handleDisconnect(client) {
        this.user = this.user.filter(us => us.id !== client.id);
    }
    async onCreateRoom(socket, roomdto) {
        await this.definePlayer(socket);
        if (this.player) {
            let found = await this.chatService.getRoomByName(roomdto.name);
            if (found) {
                this.server.to(socket.id).emit('room-exist', roomdto.name);
            }
            else {
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
                let members = await this.chatService.getMembersByRoomId(room.id, this.player.id);
                for (var x of this.user) {
                    try {
                        userid = await x.handshake.query.token;
                        userid = await this.userService.verifyToken(userid);
                        rooms = await this.chatService.getRoomsForUser(userid.id);
                        allrooms = await this.chatService.getAllRooms(userid.id);
                        this.server.to(x.id).emit('message', rooms);
                        this.server.to(x.id).emit('members', members);
                        this.server.to(x.id).emit('allrooms', allrooms);
                    }
                    catch (_a) { }
                }
            }
            this.players.splice(0);
        }
    }
    async onCreateMessage(socket, messageDto) {
        await this.definePlayer(socket);
        if (this.player) {
            let member = await this.chatService.isMember(messageDto.id, this.player.id);
            if (messageDto.content != '' && member && member.ismuted == false) {
                await this.chatService.createMessage(messageDto, this.player);
                let userid;
                let messages;
                for (var x of this.user) {
                    try {
                        userid = await x.handshake.query.token;
                        userid = await this.userService.verifyToken(userid);
                        if ((await this.chatService.isMember(messageDto.id, userid))) {
                            messages = await this.chatService.getMessagesByroomId(messageDto.id, userid.id);
                            this.server.to(x.id).emit('sendMessage', messages);
                        }
                    }
                    catch (_a) { }
                }
            }
        }
    }
    async leaveChannel(socket, roomid) {
        await this.definePlayer(socket);
        if (this.player) {
            if (await this.chatService.isMember(roomid, this.player.id)) {
                await this.chatService.deleteMmebership(roomid, this.decoded.id);
                const rooms = await this.chatService.getRoomsForUser(this.decoded.id);
                this.server.to(socket.id).emit('message', rooms);
                let allrooms = await this.chatService.getAllRooms(this.player.id);
                this.server.to(socket.id).emit('allrooms', allrooms);
                let messages = [];
                this.server.to(socket.id).emit('sendMessage', messages);
                let members = [];
                let userid;
                for (var x of this.user) {
                    try {
                        userid = await x.handshake.headers.query.token;
                        userid = await this.userService.verifyToken(userid);
                        members = await this.chatService.getMembersByRoomId(roomid, userid.id);
                        if ((await this.chatService.isMember(roomid, userid)))
                            this.server.to(x.id).emit('members', members);
                    }
                    catch (_a) { }
                }
            }
        }
    }
    async joinChannel(socket, JoinChanneldto) {
        await this.definePlayer(socket);
        if (this.player) {
            let room = await this.chatService.getRoomById(JoinChanneldto.roomid);
            if (await this.chatService.validatingRoomPwd(room, JoinChanneldto.password) == true) {
                await this.chatService.createMembership(this.player.id, JoinChanneldto.roomid);
                let rooms = await this.chatService.getRoomsForUser(this.player.id);
                this.server.to(socket.id).emit('message', rooms);
                let members = await this.chatService.getMembersByRoomId(JoinChanneldto.roomid, this.player.id);
                let messages = await this.chatService.getMessagesByroomId(JoinChanneldto.roomid, this.player.id);
                this.server.to(socket.id).emit('sendMessage', messages);
                for (var x of this.user) {
                    try {
                        let player = await x.handshake.headers.query.token;
                        player = await this.userService.verifyToken(player);
                        if ((await this.chatService.isMember(JoinChanneldto.roomid, player)))
                            this.server.to(x.id).emit('members', members);
                    }
                    catch (_a) { }
                }
            }
        }
    }
    async createDM(sender, receiverid) {
        await this.definePlayer(sender);
        if (this.player) {
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
                let messages = await this.chatService.getDMs(receiverid, this.player.id);
                this.server.to(this.decoded.id).emit("sendMessage", messages);
            }
        }
    }
    async sendDM(sender, messagedto) {
        if (messagedto.content != '') {
            await this.definePlayer(sender);
            if (this.player) {
                let receiverid = messagedto.id;
                let roomName = receiverid + ":" + this.player.id;
                let room = await this.chatService.getRoomByName(roomName);
                if (!room)
                    room = await this.chatService.getRoomByName(this.player.id + ":" + receiverid);
                messagedto.id = room.id;
                await this.chatService.createMessage(messagedto, this.player);
                let socketguest = await this.getSocketid(receiverid);
                let messages = await this.chatService.getDMs(receiverid, this.player.id);
                ;
                if (socketguest) {
                    this.server.to(socketguest.id).emit('sendMessage', messages);
                }
                this.server.to(sender.id).emit('sendMessage', messages);
            }
        }
    }
    async setAdmin(socket, membershipdto) {
        await this.definePlayer(socket);
        if (this.player) {
            this.chatService.updateMembership(membershipdto.userid, membershipdto.roomid, membership_model_1.RoleStatus.ADMIN);
            let members = await this.chatService.getMembersByRoomId(membershipdto.roomid, this.player.id);
            let userid;
            for (var x of this.user) {
                try {
                    userid = await x.handshake.query.token;
                    userid = await this.userService.verifyToken(userid);
                    if ((await this.chatService.isMember(membershipdto.roomid, userid)))
                        this.server.to(x.id).emit('members', members);
                }
                catch (_a) { }
            }
        }
    }
    async invitePlay(client, guest) {
        await this.definePlayer(client);
        if (this.player) {
            const status = await this.userService.getStatusByUserId(guest);
            let guestUsername = (await this.userService.getUserById(guest)).username;
            if (status == player_status_enum_1.UserStatus.PLAYING) {
                this.server.to(client.id).emit('player-playing', guestUsername);
            }
            else if (status == player_status_enum_1.UserStatus.OFFLINE)
                this.server.to(client.id).emit('player-offline', guestUsername);
            else {
                let socketguest = await this.getSocketid(guest);
                if (socketguest)
                    this.server.to(socketguest.id).emit('invitation', this.player.username);
            }
        }
    }
    async acceptInvitation(client, opponent) {
        await this.definePlayer(client);
        if (this.player) {
            let vs = await this.userService.getUserByUsername(opponent);
            let socket = await this.getSocketid(vs.id);
            if (socket)
                this.server.to(socket.id).emit('gotogame', client.data.player.username);
        }
    }
    async editPwd(client, JoinChanneldto) {
        await this.definePlayer(client);
        if (this.player)
            await this.chatService.updatePassword(JoinChanneldto.roomid, JoinChanneldto.password);
    }
    async removePwd(client, roomid) {
        await this.definePlayer(client);
        if (this.player)
            await this.chatService.updatePassword(roomid, '');
    }
    async kickUser(client, membershipdto) {
        await this.definePlayer(client);
        if (this.player) {
            await this.chatService.deleteMmebership(membershipdto.roomid, membershipdto.userid);
            let removedUser = await this.getSocketid(membershipdto.userid);
            if (removedUser) {
                let rooms = await this.chatService.getRoomsForUser(membershipdto.userid);
                let allrooms = await this.chatService.getAllRooms(membershipdto.userid);
                this.server.to(removedUser.id).emit('message', rooms);
                this.server.to(removedUser.id).emit('allrooms', allrooms);
            }
            let members = await this.chatService.getMembersByRoomId(membershipdto.roomid, this.player.id);
            for (var x of this.user) {
                try {
                    let userid = await x.handshake.query.token;
                    userid = await this.userService.verifyToken(userid);
                    if ((await this.chatService.isMember(membershipdto.roomid, userid.id)))
                        this.server.to(x.id).emit('members', members);
                }
                catch (_a) { }
            }
        }
    }
    async banUser(client, membershipdto) {
        await this.definePlayer(client);
        if (this.player) {
            await this.chatService.updateBanStatus(membershipdto.userid, membershipdto.roomid, true);
            let rooms = await this.chatService.getRoomsForUser(membershipdto.userid);
            let allrooms = await this.chatService.getAllRooms(membershipdto.userid);
            let bannedUser = await this.getSocketid(membershipdto.userid);
            if (bannedUser) {
                this.server.to(bannedUser.id).emit('message', rooms);
                this.server.to(bannedUser.id).emit('allrooms', allrooms);
            }
            let members = await this.chatService.getMembersByRoomId(membershipdto.roomid, this.player.id);
            for (var x of this.user) {
                try {
                    let userid = await x.handshake.query.token;
                    userid = await this.userService.verifyToken(userid);
                    if ((await this.chatService.isMember(membershipdto.roomid, userid.id)))
                        this.server.to(x.id).emit('members', members);
                }
                catch (_a) { }
            }
        }
    }
    async unbanUser(client, membershipdto) {
        await this.definePlayer(client);
        if (this.player) {
            await this.chatService.updateBanStatus(membershipdto.userid, membershipdto.roomid, false);
            let rooms = await this.chatService.getRoomsForUser(membershipdto.userid);
            let allrooms = await this.chatService.getAllRooms(membershipdto.userid);
            let unbannedUser = await this.getSocketid(membershipdto.userid);
            if (unbannedUser) {
                this.server.to(unbannedUser.id).emit('message', rooms);
                this.server.to(unbannedUser.id).emit('allrooms', allrooms);
            }
            let members = await this.chatService.getMembersByRoomId(membershipdto.roomid, this.player.id);
            for (var x of this.user) {
                try {
                    let userid = await x.handshake.query.token;
                    userid = await this.userService.verifyToken(userid);
                    if ((await this.chatService.isMember(membershipdto.roomid, userid.id)))
                        this.server.to(x.id).emit('members', members);
                }
                catch (_a) { }
            }
        }
    }
    async muteUser(client, mutedto) {
        await this.definePlayer(client);
        if (this.player) {
            await this.chatService.updateMuteStatus(mutedto.userid, mutedto.roomid, true);
            let mutedUser = await this.getSocketid(mutedto.userid);
            let members = await this.chatService.getMembersByRoomId(mutedto.roomid, this.player.id);
            for (var x of this.user) {
                try {
                    let userid = await x.handshake.query.token;
                    userid = await this.userService.verifyToken(userid);
                    if ((await this.chatService.isMember(mutedto.roomid, userid.id))) {
                        this.server.to(x.id).emit('members', members);
                        let membership = {
                            roomid: mutedto.roomid,
                            userid: mutedto.userid
                        };
                        setTimeout(() => {
                            this.server.to(x.id).emit('unmute-user', membership);
                        }, mutedto.duration * 60 * 1000);
                    }
                }
                catch (_a) { }
            }
        }
    }
    async unmuteUser(client, membershipdto) {
        await this.definePlayer(client);
        if (this.player) {
            await this.chatService.updateMuteStatus(membershipdto.userid, membershipdto.roomid, false);
            let unmutedUser = await this.getSocketid(membershipdto.userid);
            let members = await this.chatService.getMembersByRoomId(membershipdto.roomid, this.player.id);
            if (unmutedUser) {
                this.server.to(unmutedUser.id).emit('members', members);
            }
            for (var x of this.user) {
                try {
                    let userid = await x.handshake.query.token;
                    userid = await this.userService.verifyToken(userid);
                    if ((await this.chatService.isMember(membershipdto.roomid, userid.id)))
                        this.server.to(x.id).emit('members', members);
                }
                catch (_a) { }
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
    __metadata("design:paramtypes", [socket_io_1.Socket, join_channel_dto_1.JoinChannelDto]),
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
__decorate([
    (0, websockets_1.SubscribeMessage)('set-admin'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, membership_dto_1.membershipDto]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "setAdmin", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('invite-game'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Number]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "invitePlay", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('invitation-accepted'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "acceptInvitation", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('edit-pwd'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, join_channel_dto_1.JoinChannelDto]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "editPwd", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('remove-pwd'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Number]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "removePwd", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('remove-user'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, membership_dto_1.membershipDto]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "kickUser", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('ban-user'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, membership_dto_1.membershipDto]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "banUser", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('unban-user'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, membership_dto_1.membershipDto]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "unbanUser", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('mute-user'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, mute_dto_1.muteDto]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "muteUser", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('unmute-user'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, membership_dto_1.membershipDto]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "unmuteUser", null);
ChatGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ namespace: '/chat', cors: true }),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        chat_service_1.ChatService,
        players_service_1.UsersService])
], ChatGateway);
exports.ChatGateway = ChatGateway;
//# sourceMappingURL=chat.gateway.js.map