import { NextFunction, Response } from "express";
import { RequestWithUser } from "../interface/auth";
import { getFilmStatus as getStatus } from "../service/me";
import HttpStatusCodes from "http-status-codes";

export async function getFilmStatus(
     req: RequestWithUser,
     res: Response,
     next: NextFunction
) {
     const { filmId } = req.params;

     const userId = req.user?.id!;

     try {
          const data = await getStatus(filmId, String(userId));
          res.status(HttpStatusCodes.OK).json({ data });
     } catch (error) {
          next(error);
     }
}
