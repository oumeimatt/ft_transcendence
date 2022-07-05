import { createParamDecorator, Req } from "@nestjs/common";
import { Player } from "./player.entity";
import { Request } from "express";

export const GetPlayer = createParamDecorator((data, Req: Request): any => {
	console.log(Req);
});