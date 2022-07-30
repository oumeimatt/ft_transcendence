import { PlayerInterface } from '../interfaces';

export class Player {
  private _id: number;
  private _name: string;
  private _avatar: string;

  constructor(id: number, name: string, avatar: string) {
    this._id = id;
    this._name = name;
    this._avatar = avatar;
  }

  public get id(): number {
    return this._id;
  }
  public get name(): string {
    return this._name;
  }
  public get avatar(): string {
    return this._avatar;
  }

  public getPlayerInterface(): PlayerInterface {
    return {
      id: this._id,
      name: this._name,
      avatar: this.avatar,
    };
  }
}
