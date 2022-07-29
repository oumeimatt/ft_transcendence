import { PlayerInterface } from '../interfaces';
export declare class Player {
    private _id;
    private _name;
    private _avatar;
    constructor(id: number, name: string, avatar: string);
    get id(): number;
    get name(): string;
    get avatar(): string;
    getPlayerInterface(): PlayerInterface;
}
