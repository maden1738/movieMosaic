import { Request as ExpressRequest } from "express";
import { User } from "./user";

export interface RequesWithUser extends ExpressRequest {
     user?: User;
}

export interface RefreshToken {
     refreshToken?: string;
}
