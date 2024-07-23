import { Request as ExpressRequest } from "express";
import { User } from "./user";

export interface RequestWithUser extends ExpressRequest {
     user?: User;
}

export interface RefreshToken {
     refreshToken?: string;
}
