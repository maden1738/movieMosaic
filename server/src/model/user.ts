import { User } from "../interface/user";
import loggerWithNameSpace from "../utils/logger";
import { BaseModel } from "./base";

const logger = loggerWithNameSpace("UserModel");

export class UserModel extends BaseModel {
     static async create(user: User) {
          logger.info("createUser");

          await this.queryBuilder().table("user").insert(user);
     }

     static async update(
          id: number,
          user: Pick<User, "name" | "email" | "bio" | "avatarUrl">
     ) {
          logger.info("update");
          const userToUpdate = {
               name: user.name,
               email: user.email,
               bio: user.bio,
               avatarUrl: user.avatarUrl,
          };

          await this.queryBuilder()
               .update(userToUpdate)
               .table("user")
               .where({ id });
     }

     static async updateAvatar(id: number, avatarUrl: string) {
          logger.info("update avatar");

          await this.queryBuilder()
               .table("user")
               .update({ avatarUrl })
               .where({ id });
     }

     static async updatePassword(
          id: number,
          user: Pick<User, "currentPassword" | "newPassword">
     ) {
          await this.queryBuilder()
               .update("password", user.newPassword!)
               .table("user")
               .where({ id });
     }

     static async getUserByEmail(email: string) {
          const data = await this.queryBuilder()
               .select("id", "email", "password")
               .table("user")
               .where({ email });

          if (data.length > 0) {
               return data[0];
          }
     }

     static async getById(id: number) {
          logger.info("getUserById");
          const data = await this.queryBuilder()
               .select("id", "email", "name", "bio")
               .table("user")
               .where({ id });

          if (data.length > 0) {
               return data[0];
          }
     }
}
