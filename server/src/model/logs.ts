import { BaseModel } from "./base";

export class LogsModel extends BaseModel {
     static async create(
          filmId: number,
          userId: number,
          reviewId: number,
          likeStatus: boolean
     ) {
          const dataToBeInserted = {
               filmId,
               userId,
               reviewId,
               likeStatus,
          };
          await this.queryBuilder().table("logs").insert(dataToBeInserted);
     }
}
