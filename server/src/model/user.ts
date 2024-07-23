import { User } from "../interface/user";
import loggerWithNameSpace from "../utils/logger";
import { BaseModel } from "./base";

const logger = loggerWithNameSpace("UserModel");

export class UserModel extends BaseModel {
     static async create(user: User) {
          logger.info("createUser");

          await this.queryBuilder().table("user").insert(user);
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
          const data = await this.queryBuilder()
               .select("id", "email", "name")
               .table("user")
               .where({ id });

          if (data.length > 0) {
               return data[0];
          }
     }
}
