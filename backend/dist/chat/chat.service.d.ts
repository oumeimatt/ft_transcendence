import { roomRepository } from './room.repository';
import { RoomDto } from './dto/room-dto';
import { chatroom } from './room.entity';
import { membership } from './membership.entity';
import { Repository } from 'typeorm';
import { RoleStatus } from './dto/membership.model';
import { message } from './message.entity';
import { messageDto } from './dto/message-dto';
import { AuthService } from 'src/auth/auth.service';
import { PlayerRepository } from 'src/players/player.repository';
import { UsersService } from 'src/players/players.service';
import { Player } from 'src/players/player.entity';
export declare class ChatService {
    protected roomRepo: roomRepository;
    protected membershipRepo: Repository<membership>;
    protected messageRepo: Repository<message>;
    protected authService: AuthService;
    protected PlayerRepository: PlayerRepository;
    protected userService: UsersService;
    constructor(roomRepo: roomRepository, membershipRepo: Repository<membership>, messageRepo: Repository<message>, authService: AuthService, PlayerRepository: PlayerRepository, userService: UsersService);
    createRoom(RoomDto: RoomDto, creators: Player[]): Promise<chatroom>;
    getRoomById(id: number): Promise<chatroom>;
    getMembersByRoomId(roomid: number): Promise<Player[]>;
    getRoomsForUser(playerid: number): Promise<chatroom[]>;
    addMember(room: chatroom, creator: Player, role: RoleStatus): Promise<void>;
    createMessage(messageDto: messageDto, sender: Player): Promise<message>;
    getMessagesByroomId(roomid: number): Promise<message[]>;
    deleteMmebership(roomid: number, playrid: number): Promise<void>;
    isMember(roomid: number, playerid: number): Promise<membership>;
    getAllRooms(playerid: number): Promise<chatroom[]>;
    getRole(roomid: number, playerid: number): Promise<membership>;
}
