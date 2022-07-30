import { IsNotEmpty, IsOptional } from "class-validator";


export class RoomDto{

   // @IsNotEmpty()
   // id:number;
    name:string;
    
    // isChannel:boolean;
    // isPublic:boolean;
    privacy:string;
    password:string;

    players:any[];
    created_at:Date;
    updated_at:Date;


    
   // @IsNotEmpty()
  //   isChannel:boolean;

  //  // @IsNotEmpty()
  //   isPublic:boolean;

  // //  @IsOptional()
  //   password:string;
}