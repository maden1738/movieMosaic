import { func } from "joi";
import { BadRequestError } from "../errors/BadRequestError";
import { User } from "../interface/user";
import { UserModel } from "../model/user";
import loggerWithNameSpace from "../utils/logger";
import bcrypt from "bcrypt";

const logger = loggerWithNameSpace("UserService");

export async function createUser(user: User) {
     logger.info("createUser");
     const data = await UserModel.getUserByEmail(user.email);

     if (data) {
          throw new BadRequestError("email already in use");
     }

     const password = await bcrypt.hash(user.password, 10);

     await UserModel.createUser({ ...user, password });
}

export async function getUserByEmail(email: string) {
     return await UserModel.getUserByEmail(email);
}
