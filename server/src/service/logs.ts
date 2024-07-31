import { LogsModel } from "../model/logs";

export async function createLog(
     filmId: number,
     userId: number,
     reviewId: number,
     likeStatus: boolean
) {
     await LogsModel.create(filmId, userId, reviewId, likeStatus);
}

export async function getLogs(userId: number) {}
